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
  const STORY_END = 28.8;
  let lastTick = 0,
    scenePosition = 0,
    introStarted = false;
  const scrollRange = () =>
    Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const readPosition = () => (scrollY / scrollRange()) * STORY_END;
  function goScene(position) {
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
    on: true,
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
      const p = t.play();
      if (p && p.then)
        p.then(() => {
          if (!disposed) {
            t.pause();
            t.currentTime = 0;
          }
        }).catch(() => { });
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
      iv.muted = !b;
      upd();
    },
  };
  const collisionSound = createCollisionSound(AC);
  function upd() {
    if (disposed) return;
    const b = $("#snd");
    b.textContent = AC.on ? "Sound on" : "Sound off";
    b.setAttribute("aria-pressed", AC.on);
    b.title = AC.hasTrk
      ? ""
      : "The music track failed to load, so only the synthesised cues will play";
  }
  listen($("#snd"), "click", () => {
    AC.init();
    AC.set(!AC.on);
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
  function finish() {
    if (disposed || done) return;
    done = true;
    ready = true;
    iv.pause();
    $("#skip").style.display = "none";
    $("#gate").classList.add("go");
    $("#gate").inert = true;
    document.documentElement.classList.remove("lock");
    iv.style.transition = "opacity 1.4s";
    iv.style.opacity = 0;
    $("#term").classList.add("out");
    $("#term").inert = true;
    AC.drone();
    $("#snd").focus({ preventScroll: true });
    dirty = true;
  }
  function enter(snd) {
    introStarted = true;
    AC.on = snd;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("incursion_audio_enabled", snd ? "true" : "false");
    }
    AC.init();
    AC.set(snd);
    $("#gate").classList.add("go");
    $("#gate").inert = true;
    $("#skip").style.display = "block";
    $("#skip").focus({ preventScroll: true });
    const p = iv.play();
    if (p && p.catch) p.catch(finish);
  }

  listen($("#enter"), "click", () => enter(true));
  listen($("#enterq"), "click", () => enter(false));
  listen(iv, "ended", finish);
  listen(iv, "error", finish);
  listen($("#skip"), "click", finish);
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
        goScene(19.2);
      });
  });
  $$('[data-scene-target]').forEach((link) => {
    listen(link, "click", (event) => {
      event.preventDefault();
      const position = Number(link.dataset.sceneTarget);
      goScene(Number.isFinite(position) ? position : 17.7);
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
    [$("#tlv"), 17.6, 26.4],
    [$("#c5"), 26.4, 27.8],
  ].map((a) => ({ el: a[0], s: a[1], e: a[2], seen: false }));
  let reveal = 0,
    trk = 0,
    redirected = false;
  function tick() {
    scheduleFrame(tick);
    const now = performance.now(),
      dt = Math.min(0.05, (now - (lastTick || now)) / 1000);
    lastTick = now;
    const targetPosition = readPosition();
    scenePosition = RM
      ? targetPosition
      : lerp(scenePosition, targetPosition, 1 - Math.exp(-dt * 9));
    if (Math.abs(targetPosition - scenePosition) < 0.002)
      scenePosition = targetPosition;
    else dirty = true;
    const raw = scenePosition,
      v = raw;
    collisionSound.update(
      clamp(v / 7.1),
      ready && v < 7.1 && !document.hidden,
    );
    if (raw === lv && !dirty) return;
    lv = raw;
    dirty = false;
    /* chrome */
    if (hdr) hdr.style.opacity = ready ? 1 : 0;
    topButton.classList.toggle("on", ready && raw > 0.7);
    /* The 3D hero opens the experience, then yields to the throne scene. */
    const heroOpacity = 1 - ss(6.6, 7.1, v);
    if (heroStage) vis(heroStage, heroOpacity);
    setHeroSceneActive(ready && heroOpacity > 0.002);
    /* throne room: push-in toward the figure, timed dissolve to the close-up */
    const em = ss(7.2, 8.8, v),
      pu = ss(8.8, 11.8, v),
      S = 1 + 0.8 * pu;
    const co = ss(10.8, 12.3, v),
      tO = ss(7.1, 8.0, v) * (1 - ss(17.0, 17.8, v));
    vis(THR, tO);
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
      tw2.style.filter = `brightness(${0.1 + 0.9 * em})${RM ? "" : ` blur(${0.25 * pu * pu}px)`}`;
      tw2.style.visibility = co < 0.999 ? "visible" : "hidden";
      tc.style.opacity = co;
      tc.style.transform = `scale(${1 + 0.07 * ss(12.6, 13.8, v)})`;
      tc.style.filter = `brightness(${1 - 0.28 * ss(13.8, 14.4, v) * (1 - ss(16.6, 17, v))})`;
      const r = lerp(lerp(10, 74, em) * (1 - 0.5 * pu), 34, co);
      vg.style.setProperty("--r", r + "%");
      vg.style.setProperty("--fx", lerp(55, 52, co) + "%");
      vg.style.setProperty("--fy", lerp(58, 36, co) + "%");
      scrim.style.opacity = ss(13.6, 14.2, v) * (1 - ss(16.4, 16.9, v));
    }
    /* the single line of text */
    tl.forEach((o) => {
      const w = o.w,
        t = ss(w[0], w[1], v) * (1 - ss(w[2], w[3], v));
      o.e.style.opacity = t;
      o.e.style.visibility = t > 0.002 ? "visible" : "hidden";
    });
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
    /* timeline finished -> redirect to /universe ("Enter the Universe") */
    if (v >= 26.5 && !redirected) {
      redirected = true;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("incursion_audio_enabled", AC.on ? "true" : "false");
        sessionStorage.setItem("incursion_audio_time", String(AC.trk?.currentTime || 0));
      }
      const overlay = document.createElement("div");
      overlay.style.cssText =
        "position:fixed;inset:0;z-index:9999;background:#000;opacity:0;transition:opacity 0.8s ease;pointer-events:none;";
      document.body.appendChild(overlay);
      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        setTimeout(() => {
          window.location.href = "/universe";
        }, 850);
      });
    }
    /* Start the soundtrack as the 3D hero opens after the intro gate. */
    if (v >= 0.15 && trk === 0 && AC.trk) {
      trk = 1;
      AC.play(0, 1.0, 400);
    } else if (v < 0.05 && trk >= 1) {
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
