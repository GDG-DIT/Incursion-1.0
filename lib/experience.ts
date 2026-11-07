// @ts-nocheck

import { createCollisionSound } from "./collision-audio";
import { REGISTER_URL } from "./content";

/** Attach the scroll animation to a mounted React tree. Returns full teardown. */
export function createExperience(root) {
  let disposed = false;
  const controller = new AbortController();
  const timeouts = new Set(),
    intervals = new Set();
  let animationFrame = 0;
  const oldRestoration = history.scrollRestoration;
  const wasLocked = document.documentElement.classList.contains("lock");
  const snapshots = [...root.querySelectorAll("*")].map((element) => ({
    element, style: element.getAttribute("style"), className: element.getAttribute("class"), inert: element.inert,
  }));
  const listen = (target, event, handler, options = {}) =>
    target.addEventListener(event, handler, {
      ...options,
      signal: controller.signal,
    });
  const later = (callback, delay) => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      if (!disposed) callback();
    }, delay);
    timeouts.add(id);
    return id;
  };
  const cancelLater = (id) => {
    clearTimeout(id);
    timeouts.delete(id);
  };
  const every = (callback, delay) => {
    const id = window.setInterval(() => {
      if (!disposed) callback();
    }, delay);
    intervals.add(id);
    return id;
  };
  const cancelEvery = (id) => {
    clearInterval(id);
    intervals.delete(id);
  };
  const scheduleFrame = (callback) => {
    if (!disposed) animationFrame = requestAnimationFrame(callback);
  };

  // Schedule data is maintained in lib/content.js.

  const AUDIO_TRACK = "/media/soundtrack.mp3";
  /* ------------------------------------------------------------------------------------------------------ */
  const $ = (s) => root.querySelector(s),
    $$ = (s) => [...root.querySelectorAll(s)],
    clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)),
    lerp = (a, b, t) => a + (b - a) * t;
  const ss = (a, b, x) => {
    const t = clamp((x - a) / (b - a));
    return t * t * (3 - 2 * t);
  },
    vis = (el, o) => {
      el.style.opacity = o;
      el.style.visibility = o > 0.002 ? "visible" : "hidden";
    };
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const STORY_END = 25.0;
  let lastTick = 0,
    scenePosition = 0,
    introStarted = false,
    allowDirectJump = false;
  const scrollRange = () =>
    Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const readPosition = () => (scrollY / scrollRange()) * STORY_END;
  function goScene(position, allowJump = false) {
    if (allowJump) allowDirectJump = true;
    scrollTo({
      top: (clamp(position, 0, STORY_END) / STORY_END) * scrollRange(),
      behavior: "instant",
    });
  }
  history.scrollRestoration = "manual";
  scrollTo(0, 0);
  document.documentElement.classList.add("lock");
  const tcol = $("#tcol");
  let colH = 0;
  const rows = $$(".row");
  let rowCY = [];
  function lay() {
    colH = tcol.offsetHeight;
    rowCY = rows.map((r) => {
      const st = r.querySelector(".strip");
      return r.offsetTop + st.offsetTop + st.offsetHeight / 2;
    });
    dirty = true;
  }
  listen(window, "resize", lay);
  listen(window, "load", lay);
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(() => {
      if (!disposed) lay();
    });
  /* ---- audio controller ---- */
  const AC = {
    ctx: null,
    on: false,
    trk: null,
    hasTrk: true,
    want: false,
    init() {
      if (this.ctx || this.trk) return;
      try {
        const C = window.AudioContext || window.webkitAudioContext;
        this.ctx = new C();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.on ? 1 : 0;
        this.master.connect(this.ctx.destination);
      } catch (e) {
        this.ctx = null;
      }
      const t = new Audio(AUDIO_TRACK);
      t.preload = "auto";
      t.volume = 0;
      t.muted = !this.on;
      listen(t, "error", () => {
        this.hasTrk = false;
        upd();
      });
      this.trk = t;
    },
    noise(d) {
      const c = this.ctx,
        b = c.createBuffer(1, c.sampleRate * d, c.sampleRate),
        a = b.getChannelData(0);
      for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1;
      return b;
    },
    drone() {
      const c = this.ctx;
      if (!c || this.dr) return;
      const g = c.createGain(),
        f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = 170;
      g.gain.value = 0;
      [49, 49.6, 98.2].forEach((hz, i) => {
        const o = c.createOscillator();
        o.type = i < 2 ? "sine" : "triangle";
        o.frequency.value = hz;
        const og = c.createGain();
        og.gain.value = i < 2 ? 1 : 0.25;
        o.connect(og);
        og.connect(f);
        o.start();
      });
      f.connect(g);
      g.connect(this.master);
      g.gain.linearRampToValueAtTime(0.07, c.currentTime + 5);
      this.dr = g;
    },
    duck(x, s) {
      if (this.dr)
        this.dr.gain.setTargetAtTime(x, this.ctx.currentTime, s || 0.8);
    },
    glitch() {
      const c = this.ctx;
      if (!c || RM) return;
      const t = c.currentTime,
        s = c.createBufferSource();
      s.buffer = this.noise(0.3);
      const f = c.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = 2600;
      f.Q.value = 0.7;
      const g = c.createGain();
      [
        [0, 0.1],
        [0.09, 0],
        [0.14, 0.07],
        [0.2, 0],
      ].forEach((a) => g.gain.setValueAtTime(a[1], t + a[0]));
      s.connect(f);
      f.connect(g);
      g.connect(this.master);
      s.start(t);
      s.stop(t + 0.3);
    },
    impact(k) {
      const c = this.ctx;
      if (!c) return;
      k = k || 1;
      const t = c.currentTime,
        o = c.createOscillator(),
        g = c.createGain();
      o.frequency.setValueAtTime(95, t);
      o.frequency.exponentialRampToValueAtTime(30, t + 1.4);
      g.gain.setValueAtTime(0.5 * k, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
      o.connect(g);
      g.connect(this.master);
      o.start(t);
      o.stop(t + 1.9);
      const s = c.createBufferSource();
      s.buffer = this.noise(1.2);
      const f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = 380;
      const n = c.createGain();
      n.gain.setValueAtTime(0.22 * k, t);
      n.gain.exponentialRampToValueAtTime(0.001, t + 1.1);
      s.connect(f);
      f.connect(n);
      n.connect(this.master);
      s.start(t);
    },
    swell() {
      const c = this.ctx;
      if (!c) return;
      const t = c.currentTime,
        s = c.createBufferSource();
      s.buffer = this.noise(1.4);
      const f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(200, t);
      f.frequency.exponentialRampToValueAtTime(1400, t + 1);
      const g = c.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.045, t + 0.6);
      g.gain.linearRampToValueAtTime(0, t + 1.3);
      s.connect(f);
      f.connect(g);
      g.connect(this.master);
      s.start(t);
    },
    fade(to, ms, then) {
      const t = this.trk;
      if (!t) return;
      cancelEvery(this._f);
      const from = t.volume,
        st = performance.now();
      this._f = every(() => {
        const k = Math.min(1, (performance.now() - st) / ms);
        t.volume = clamp(from + (to - from) * k);
        if (k >= 1) {
          cancelEvery(this._f);
          if (then) then();
        }
      }, 50);
    },
    play(from, vol, ms) {
      const t = this.trk;
      if (!t || !this.hasTrk) return;
      if (from != null) {
        try {
          t.currentTime = from;
        } catch (e) { }
      }
      this.want = true;
      const p = t.play();
      if (p && p.catch) p.catch(() => { });
      this.fade(vol, ms);
    },
    stop(ms) {
      this.want = false;
      this.fade(0, ms, () => {
        if (this.trk) this.trk.pause();
      });
    },
    set(b) {
      this.on = b;
      if (this.master)
        this.master.gain.setTargetAtTime(b ? 1 : 0, this.ctx.currentTime, 0.05);
      if (this.trk) this.trk.muted = !b;
      if (b && this.ctx?.state === "suspended") this.ctx.resume().catch(() => {});
      iv.muted = !b;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("incursion_audio_enabled", b ? "true" : "false");
        window.dispatchEvent(new CustomEvent("incursion:audio-state", {
          detail: { enabled: b },
        }));
      }
      upd();
    },
  };
  const collisionSound = createCollisionSound(AC);
  let trk = 0;
  function upd() {
    if (disposed) return;
    const b = $("#snd");
    const enabled = AC.on;
    b.dataset.soundState = enabled ? "on" : "off";
    b.setAttribute("aria-label", enabled ? "Turn sound off" : "Turn sound on");
    b.setAttribute("aria-pressed", enabled);
    b.title = AC.hasTrk
      ? ""
      : "The music track failed to load, so only the synthesised cues will play";
  }
  upd();
  listen($("#snd"), "click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    AC.init();
    const enabled = !AC.on;
    AC.set(enabled);
    if (enabled) {
      AC.play(AC.trk?.currentTime || 0, 1.0, 250);
    } else {
      AC.stop(250);
    }
  });
  const topButton = $("#top");
  listen(topButton, "click", () =>
    window.scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" }),
  );
  listen(document, "visibilitychange", () => {
    if (document.hidden) {
      iv.pause();
      AC.ctx && AC.ctx.suspend();
      AC.trk && AC.trk.pause();
    } else {
      if (introStarted && !done) iv.play().catch(finish);
      AC.ctx && AC.ctx.resume();
      if (AC.want && AC.trk) AC.trk.play().catch(() => { });
    }
  });
  /* ---- intro video ---- */
  const iv = $("#iv");
  let done = false,
    ready = false;
  function triggerFlash() {
    const stage = $("#stage") || document.body;
    const fl = document.createElement("div");
    fl.className = "intro-flash";
    stage.appendChild(fl);
    AC.glitch();
    AC.impact(1.2);
    later(() => {
      fl.remove();
    }, 900);
  }
  function finish() {
    if (disposed || done) return;
    done = true;
    ready = true;
    iv.pause();
    $("#skip").style.display = "none";
    document.documentElement.classList.remove("lock");
    iv.style.transition = "opacity 0.6s";
    iv.style.opacity = 0;
    $("#term").classList.add("out");
    $("#term").inert = true;
    triggerFlash();
    AC.drone();
    if (AC.on && AC.trk && trk === 0) {
      trk = 1;
      AC.play(0, 1.0, 400);
    }
    $("#snd").focus({ preventScroll: true });
    dirty = true;
  }
  function enter(snd) {
    introStarted = true;
    iv.muted = !snd;
    iv.volume = snd ? 1 : 0;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("incursion_audio_enabled", snd ? "true" : "false");
    }
    AC.init();
    AC.set(snd);
    if (snd && AC.ctx?.state === "suspended") {
      AC.ctx.resume().catch(() => {});
    }
    if (snd && AC.trk && trk === 0) {
      trk = 1;
      AC.play(0, 1.0, 400);
    }
    const p = iv.play();
    if (p && p.catch) {
      p.catch(() => {
        if (disposed || done) return;
        iv.muted = true;
        iv.play().catch(() => {});
        const resumeExperienceAudio = () => {
          if (disposed || done || !AC.on) return;
          if (AC.ctx?.state === "suspended") {
            AC.ctx.resume().catch(() => {});
          }
          if (AC.trk) {
            AC.play(AC.trk.currentTime || 0, 1.0, 400);
          }
          iv.muted = false;
          iv.volume = 1;
          iv.play().catch(() => {});
        };
        listen(window, "pointerdown", resumeExperienceAudio, { once: true });
        listen(window, "keydown", resumeExperienceAudio, { once: true });
      });
    }
  }

  listen(iv, "ended", finish);
  listen(iv, "error", finish);
  $("#skip").style.display = "block";
  listen($("#skip"), "click", finish);
  enter(true);
  /* ---- registration / schedule buttons ---- */
  $$("a[href*='/universe']").forEach((link) => {
    listen(link, "click", () => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("incursion_audio_enabled", AC.on ? "true" : "false");
        sessionStorage.setItem("incursion_audio_time", String(AC.trk?.currentTime || 0));
      }
    });
  });
  $$(".reg").forEach((a) => {
    if (a.getAttribute("href")?.startsWith("/universe")) return;
    if (REGISTER_URL) {
      a.href = REGISTER_URL;
      a.target = "_blank";
      a.rel = "noopener";
      if (a.closest("#c5")) a.textContent = "Register";
    } else
      listen(a, "click", (e) => {
        e.preventDefault();
        goScene(15.4, true);
      });
  });
  $$('[data-scene-target]').forEach((link) => {
    listen(link, "click", (event) => {
      event.preventDefault();
      const position = Number(link.dataset.sceneTarget);
      goScene(Number.isFinite(position) ? position : 13.9, true);
    });
  });
  let H = innerHeight,
    dirty = true,
    lv = -1;
  function resize() {
    H = innerHeight;
    lay();
    dirty = true;
  }
  listen(window, "resize", resize);
  resize();
  /* ---- scene tick ---- */
  const THR = $("#throne"),
    tw2 = $("#tw2"),
    tc = $("#tc"),
    vg = $("#vg"),
    scrim = $("#scrim"),
    stageTease = $("#stage-tease"),
    stageEndTease = $("#stage-end-tease"),
    tl = $$("[data-w]").map((e) => ({
      e,
      w: e.dataset.w.split(",").map(Number),
    }));
  const hdr = $("#hdr"),
    heroStage = $("#hero");
  let heroSceneActive = false;
  let heroTimers = [];
  function setHeroSceneActive(active) {
    if (active === heroSceneActive) return;
    heroSceneActive = active;
    if (active) {
      heroTimers = [
        later(() => heroSceneActive && AC.glitch(), 700),
        later(() => heroSceneActive && AC.impact(0.8), 1420),
      ];
    } else {
      heroTimers.forEach(cancelLater);
      heroTimers = [];
    }
    window.dispatchEvent(
      new CustomEvent("incursion:hero-active", { detail: { active } }),
    );
  }
  const CH = [
    [$("#tlv"), 13.8, 22.6],
  ].map((a) => ({ el: a[0], s: a[1], e: a[2], seen: false }));
  const scrollCue = $("#hero-scroll-cue");
  const updateScrollCue = () => {
    scrollCue?.classList.toggle("is-hidden", scrollY > 50);
  };
  listen(window, "scroll", updateScrollCue, { passive: true });
  updateScrollCue();
  let reveal = 0,
    redirected = false,
    firstScrollReveal = false,
    timelineVisited = false;
  listen(window, "wheel", (event) => {
    if (!ready || firstScrollReveal || event.deltaY <= 0 || readPosition() >= 10.3) return;
    event.preventDefault();
    firstScrollReveal = true;
    goScene(10.9);
  }, { passive: false });
  function tick() {
    scheduleFrame(tick);
    const now = performance.now(),
      dt = Math.min(0.05, (now - (lastTick || now)) / 1000);
    lastTick = now;
    let targetPosition = readPosition();
    if (!allowDirectJump && Math.abs(targetPosition - scenePosition) > 2.2) {
      targetPosition = clamp(
        scenePosition + Math.sign(targetPosition - scenePosition) * 1.8,
        0,
        STORY_END,
      );
      goScene(targetPosition);
    } else {
      allowDirectJump = false;
    }
    scenePosition = RM
      ? targetPosition
      : lerp(scenePosition, targetPosition, 1 - Math.exp(-dt * 9));
    if (Math.abs(targetPosition - scenePosition) < 0.002)
      scenePosition = targetPosition;
    else dirty = true;
    const raw = scenePosition,
      v = raw;
    window.dispatchEvent(new CustomEvent("incursion:scroll", { detail: { v } }));
    collisionSound.update(0, false);
    if (raw === lv && !dirty) return;
    lv = raw;
    dirty = false;
    /* chrome */
    if (hdr) hdr.style.opacity = ready ? 1 : 0;
    topButton.classList.toggle("on", ready && raw > 0.7);
    /* throne room: push-in toward the figure, timed dissolve to the close-up */
    const em = ss(0.2, 1.8, v),
      pu = ss(1.8, 4.8, v),
      S = 1 + 0.8 * pu;
    const co = ss(3.8, 5.3, v),
      tO = 1 - ss(10.0, 10.8, v);
    if (!ready) {
      THR.style.opacity = "0";
      THR.style.visibility = "hidden";
      if (stageTease) {
        stageTease.style.opacity = "0";
        stageTease.style.visibility = "hidden";
      }
      if (stageEndTease) {
        stageEndTease.style.opacity = "0";
        stageEndTease.style.visibility = "hidden";
      }
    } else if (stageTease) {
      const teaseOpacity = 1 - ss(0.8, 3.2, v);
      stageTease.style.opacity = teaseOpacity;
      stageTease.style.visibility = teaseOpacity > 0.002 ? "visible" : "hidden";
    }
    if (ready && stageEndTease) {
      const endTeaseOpacity = ss(22.7, 24.2, v);
      stageEndTease.style.opacity = endTeaseOpacity;
      stageEndTease.style.visibility = endTeaseOpacity > 0.002 ? "visible" : "hidden";
    }
    if (ready) vis(THR, tO);
    if (co > 0.5 && !reveal) {
      reveal = now;
      AC.duck(0.025, 0.9);
      AC.impact(0.35);
    } else if (co < 0.1 && reveal) {
      reveal = 0;
      AC.duck(0.07, 0.8);
    }
    const rt = reveal ? (now - reveal) / 1000 : 0;
    if (tO > 0) {
      const j = RM ? 0 : 0.15 + 0.25 * pu,
        jx = (Math.sin(v * 11) + Math.sin(v * 6.3)) * j,
        jy = Math.cos(v * 8.7) * j;
      tw2.style.transform = `translate(${jx}px,${jy}px) scale(${S})`;
      tw2.style.filter = `brightness(${0.5 + 0.5 * em})${RM ? "" : ` blur(${0.25 * pu * pu}px)`}`;
      tw2.style.visibility = co < 0.999 ? "visible" : "hidden";
      tc.style.opacity = co;
      tc.style.transform = `scale(${1 + 0.07 * ss(5.6, 6.8, v)})`;
      tc.style.filter = `brightness(${1 - 0.28 * ss(6.8, 7.4, v) * (1 - ss(9.6, 10.0, v))})`;
      const r = lerp(lerp(30, 74, em) * (1 - 0.5 * pu), 34, co);
      vg.style.setProperty("--r", r + "%");
      vg.style.setProperty("--fx", lerp(55, 52, co) + "%");
      vg.style.setProperty("--fy", lerp(58, 36, co) + "%");
      scrim.style.opacity = ss(6.6, 7.2, v) * (1 - ss(9.4, 9.9, v));
    }
    /* the warning text fades in and out between the throne close-up and the hero reveal */
    tl.forEach((o) => {
      const w = o.w,
        t = ss(w[0], w[1], v) * (1 - ss(w[2], w[3], v));
      o.e.style.opacity = t;
      o.e.style.visibility = t > 0.002 ? "visible" : "hidden";
    });
    /* The 3D Doctor Doom mask is only active while the timeline is visible. */
    setHeroSceneActive(ready && v >= 13.8 && v <= 22.6);
    if (v >= 13.8 && v < 22.7) timelineVisited = true;

    /* The opening hero text and CTA appear, then yield to the timeline */
    const heroOpacity = ss(10.3, 10.9, v) * (1 - ss(13.4, 14.0, v));
    if (heroStage) {
      vis(heroStage, heroOpacity);
      heroStage.style.transform = "none";
    }
    /* timeline (scroll-linked reveals over a star field) + closing scene */
    CH.forEach((k, i) => {
      const o =
        ss(k.s - 0.25, k.s + 0.25, v) *
        (i < 1 ? 1 - ss(k.e - 0.25, k.e + 0.25, v) : 1),
        u = clamp((v - k.s) / (k.e - k.s));
      vis(k.el, o);
      if (o > 0.5 && !k.seen) {
        k.seen = true;
        AC.swell();
      } else if (v < k.s - 0.6) k.seen = false;
      if (i === 0 && o > 0) {
        if (!colH) lay();
        const ty = lerp(innerHeight * 0.66, -(colH - innerHeight * 0.55), u);
        tcol.style.transform = `translateY(${ty}px)`;
        rows.forEach((r, j) => {
          const y = rowCY[j] + ty,
            e = RM ? 1 : ss(H * 0.98, H * 0.58, y),
            f = RM ? 0.5 : 1 - clamp(Math.abs(y - H * 0.5) / (H * 0.5)),
            st = (a, m) => clamp((e - a) * m).toFixed(3);
          r.style.setProperty("--e", e.toFixed(3));
          r.style.setProperty("--f", f.toFixed(3));
          r.style.setProperty("--e1", st(0.2, 2.2));
          r.style.setProperty("--e2", st(0.3, 2.2));
          r.style.setProperty("--e3", st(0.4, 2.6));
          r.style.setProperty("--e4", st(0.52, 2.6));
          r.style.setProperty("--e5", st(0.62, 2.8));
          r.classList.toggle("is-visible", RM || e > 0.035);
        });
      }
    });
    /*
     * Stage 1 ends on the timeline.
     * The transition to /universe is intentionally disabled until Stage 2.
     *
     * if (v >= 22.7 && timelineVisited && !redirected) {
     *   redirected = true;
     *   sessionStorage.setItem("incursion_audio_enabled", AC.on ? "true" : "false");
     *   sessionStorage.setItem("incursion_audio_time", String(AC.trk?.currentTime || 0));
     *   window.location.href = "/universe";
     * }
     */
      if (v < 0.05 && trk >= 1) {
        trk = 0;
        reveal = 0;
        AC.stop(400);
      }
      if (trk >= 1 && reveal && AC.trk && AC.trk.volume > 0) {
        const q = 1.0;
        if (AC._q !== q && rt > 4.5) {
          AC._q = q;
          AC.fade(q, 1000);
        }
      }
    }
    scheduleFrame(tick);

    return () => {
      disposed = true;
      controller.abort();
      cancelAnimationFrame(animationFrame);
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      collisionSound.dispose();
      if (iv && typeof iv.pause === "function") iv.pause();
      if (AC.trk) {
        AC.trk.pause();
        AC.trk.removeAttribute("src");
        AC.trk.load();
      }
      if (AC.ctx && AC.ctx.state !== "closed") AC.ctx.close().catch(() => { });
      history.scrollRestoration = oldRestoration;
      document.documentElement.classList.toggle("lock", wasLocked);
      for (const { element, style, className, inert } of snapshots) {
        if (style === null) element.removeAttribute("style");
        else element.setAttribute("style", style);
        if (className === null) element.removeAttribute("class");
        else element.setAttribute("class", className);
        element.inert = inert;
      }
    };
  }
