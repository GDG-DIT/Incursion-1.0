import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceCollisionCues, createCollisionSound } from '../lib/collision-audio.js';

test('scrubbing fires once, ignores small reversals, and rearms after rewinding', () => {
  const fired = [false, false, false];
  assert.equal(advanceCollisionCues(.2, fired), -1);
  assert.equal(advanceCollisionCues(.4, fired), 0);
  assert.equal(advanceCollisionCues(.4, fired), -1);
  assert.equal(advanceCollisionCues(.35, fired), -1);
  assert.equal(advanceCollisionCues(.4, fired), -1);
  advanceCollisionCues(.1, fired);
  assert.equal(advanceCollisionCues(.4, fired), 0);
});

test('a large jump plays one cue instead of overlapping three impacts', () => {
  const fired = [false, false, false];
  assert.equal(advanceCollisionCues(.95, fired), 2);
  assert.deepEqual(fired, [true, true, true]);
  assert.equal(advanceCollisionCues(.95, fired), -1);
});

test('audio respects mute, fades out outside the collision, and releases its nodes', () => {
  const nodes = [], impacts = [];
  const parameter = () => ({ value: 0, target: 0, setTargetAtTime(value) { this.target = value; } });
  const node = () => {
    const value = { gain: parameter(), frequency: parameter(), Q: parameter(),
      connect(destination) { this.destination = destination; },
      disconnect() { this.disconnected = true; },
      start() { this.started = true; }, stop() { this.stopped = true; } };
    nodes.push(value); return value;
  };
  const context = { currentTime: 1, state: 'running', createGain: node,
    createBiquadFilter: node, createBufferSource: node, createOscillator: node };
  const audio = { ctx: context, master: {}, on: false, noise: () => ({}), impact: value => impacts.push(value) };
  const sound = createCollisionSound(audio);
  sound.update(0, false);
  assert.equal(nodes.length, 0);
  sound.update(.4, true);
  assert.equal(impacts.length, 0);
  assert.equal(nodes[0].destination, audio.master);
  audio.on = true;
  context.currentTime = 2;
  sound.update(.1, true);
  context.currentTime = 3;
  sound.update(.4, true);
  assert.deepEqual(impacts, [.5]);
  sound.update(.5, false);
  assert.equal(nodes[0].gain.target, 0);
  sound.dispose();
  assert.ok(nodes.every(value => value.disconnected));
  assert.equal(nodes.filter(value => value.stopped).length, 2);
});
