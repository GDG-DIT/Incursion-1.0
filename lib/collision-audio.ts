// @ts-nocheck

/** One-shot cues rearm after rewinding, without stacking on large scroll jumps. */
export function advanceCollisionCues(progress, fired) {
  const thresholds = [0.37, 0.63, 0.89];
  let cue = -1;
  thresholds.forEach((threshold, index) => {
    if (progress < threshold - 0.1) fired[index] = false;
    if (progress >= threshold && !fired[index]) {
      fired[index] = true;
      cue = index;
    }
  });
  return cue;
}

/** Procedural sound uses the existing master gain, so mute affects every layer. */
export function createCollisionSound(audio) {
  let graph = null;
  let lastProgress = 0;
  let lastMovement = 0;
  let lastImpact = -Infinity;
  let lastAudioUpdate = -Infinity;
  let lastActive = false;
  const fired = [false, false, false];

  function initialize() {
    const context = audio.ctx;
    if (graph || !context || context.state === 'closed') return;
    const gain = context.createGain();
    gain.gain.value = 0;
    gain.connect(audio.master);

    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 120;
    filter.Q.value = 0.5;
    const noise = context.createBufferSource();
    noise.buffer = audio.noise(4);
    noise.loop = true;
    const air = context.createGain();
    air.gain.value = 0.22;
    noise.connect(filter);filter.connect(air);air.connect(gain);
    const bass = context.createOscillator();
    bass.type = 'sine';bass.frequency.value = 38;
    const bassGain = context.createGain();
    bassGain.gain.value = 0.14;
    bass.connect(bassGain);bassGain.connect(gain);
    noise.start();bass.start();
    graph = { context, gain, filter, noise, bass, air, bassGain };
  }

  return {
    update(progress, active) {
      if (active) initialize();
      if (!graph) return;
      const { context, gain, filter, bass } = graph;
      if (context.state !== 'running') return;
      const time = context.currentTime;
      const p = Math.max(0, Math.min(1, progress));
      const progressChanged = Math.abs(p - lastProgress) > 0.002;
      const activityChanged = active !== lastActive;
      // Web Audio ramps are not free. Keep the envelope alive at 4 Hz while
      // stationary, but do not enqueue three new ramps on every RAF.
      if (!progressChanged && !activityChanged && time - lastAudioUpdate < 0.25) return;
      if (progressChanged) lastMovement = time;
      const moving = time - lastMovement < 0.3;
      const intensity = active ? (moving ? 0.22 + 0.38 * p : 0.09) : 0;
      gain.gain.setTargetAtTime(intensity, time, active ? 0.18 : 0.45);
      filter.frequency.setTargetAtTime(100 + 620 * p * p, time, 0.18);
      bass.frequency.setTargetAtTime(38 + 21 * p, time, 0.25);

      const cue = advanceCollisionCues(p, fired);
      if (active && audio.on && cue >= 0 && time - lastImpact > 0.65) {
        audio.impact([0.5, 0.7, 0.9][cue]);
        lastImpact = time;
      }
      lastProgress = p;
      lastActive = active;
      lastAudioUpdate = time;
    },
    dispose() {
      if (!graph) return;
      graph.noise.stop();graph.bass.stop();
      for (const key of ['noise', 'bass', 'filter', 'gain', 'air', 'bassGain']) graph[key].disconnect();
      graph = null;
    },
  };
}
