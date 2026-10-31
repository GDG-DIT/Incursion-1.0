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

  const KEYS = [
    [0, 0],
    [0.03, 0],
    [0.12, 70],
    [0.22, 150],
    [0.29, 205],
    [0.33, 226],
    [0.36, 239],
    [1, 239],
  ];
  // Schedule data is maintained in lib/content.js.

  const AUDIO_TRACK = "/media/soundtrack.mp3";

  const STILLS = [
    "/media/timeline-1.webp",
    "/media/timeline-2.webp",
    "/media/timeline-3.webp",
    "/media/timeline-4.webp",
  ];
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
        }).catch(() => {});
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
        } catch (e) {}
      }
      this.want = true;
      const p = t.play();
      if (p && p.catch) p.catch(() => {});
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
      if (AC.want && AC.trk) AC.trk.play().catch(() => {});
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
  $$(".reg").forEach((a) => {
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
  /* ---- collision: scroll-scrubbed video (all frames kept close together so seeking is instant) ---- */
  const c = $("#c"),
    ctx = c.getContext("2d");
  let W,
    H,
    dpr = 1,
    cur = 0,
    dirty = true,
    lv = -1;
  const vid = $("#collision-source");
  vid.muted = true;
  vid.src = "/media/collision.mp4";
  const FPS = 30;
  let vReady = false,
    seeking = false,
    wantT = -1,
    shown = -1,
    DUR = 7.8;
  function drawVid() {
    if (!vReady || !vid.videoWidth) return;
    const w = vid.videoWidth,
      h = vid.videoHeight,
      cw = c.width,
      ch = c.height,
      cover = Math.max(cw / w, ch / h),
      fit = Math.min(cw / w, ch / h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.fillStyle = "#020403";
    ctx.fillRect(0, 0, cw, ch);
    // Preserve the entire widescreen action on tall viewports; its ambient light fills the edges.
    if (cw / ch < 1.45) {
      ctx.save();
      ctx.filter = `blur(${24 * dpr}px) brightness(.32) saturate(.8)`;
      const bg = cover * 1.12;
      ctx.drawImage(vid, (cw - w * bg) / 2, (ch - h * bg) / 2, w * bg, h * bg);
      ctx.restore();
      const y = (ch - h * fit) / 2;
      ctx.drawImage(vid, 0, y, cw, h * fit);
      const edge = Math.min(40 * dpr, h * fit * 0.12);
      const top = ctx.createLinearGradient(0, y, 0, y + edge);
      top.addColorStop(0, "#02040399");
      top.addColorStop(1, "#02040300");
      ctx.fillStyle = top;
      ctx.fillRect(0, y, cw, edge);
      const bottom = ctx.createLinearGradient(
        0,
        y + h * fit - edge,
        0,
        y + h * fit,
      );
      bottom.addColorStop(0, "#02040300");
      bottom.addColorStop(1, "#02040399");
      ctx.fillStyle = bottom;
      ctx.fillRect(0, y + h * fit - edge, cw, edge);
    } else {
      ctx.drawImage(
        vid,
        (cw - w * cover) / 2,
        (ch - h * cover) / 2,
        w * cover,
        h * cover,
      );
    }
    const shade = ctx.createRadialGradient(
      cw * 0.5,
      ch * 0.5,
      Math.min(cw, ch) * 0.26,
      cw * 0.5,
      ch * 0.5,
      Math.max(cw, ch) * 0.74,
    );
    shade.addColorStop(0, "#0000");
    shade.addColorStop(1, "#0005");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, cw, ch);
  }
  function seekTo(t) {
    if (seeking) {
      wantT = t;
      return;
    }
    if (Math.abs(vid.currentTime - t) < 0.001) {
      shown = vid.currentTime;
      drawVid();
      return;
    }
    seeking = true;
    try {
      vid.currentTime = t;
    } catch (e) {
      seeking = false;
    }
  }
  listen(vid, "loadeddata", () => {
    vReady = true;
    DUR = vid.duration || DUR;
    seekTo(0.001);
  });
  listen(vid, "seeked", () => {
    seeking = false;
    shown = vid.currentTime;
    drawVid();
    if (wantT >= 0 && Math.abs(wantT - shown) > 0.5 / FPS) {
      const t = wantT;
      wantT = -1;
      seekTo(t);
    } else wantT = -1;
    dirty = true;
  });
  const fallbackFrame = new Image();
  fallbackFrame.src = STILLS[0];
  listen(vid, "error", () => {
    vReady = false;
    const paint = () => {
      const scale = Math.min(
        c.width / fallbackFrame.width,
        c.height / fallbackFrame.height,
      );
      ctx.drawImage(
        fallbackFrame,
        (c.width - fallbackFrame.width * scale) / 2,
        (c.height - fallbackFrame.height * scale) / 2,
        fallbackFrame.width * scale,
        fallbackFrame.height * scale,
      );
    };
    if (fallbackFrame.complete) paint();
    else fallbackFrame.onload = paint;
  });
  vid.load();
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    c.width = Math.round(W * dpr);
    c.height = Math.round(H * dpr);
    drawVid();
    lay();
    dirty = true;
  }
  function frameFor(p) {
    for (let i = 1; i < KEYS.length; i++) {
      if (p <= KEYS[i][0]) {
        const a = KEYS[i - 1],
          b = KEYS[i];
        return a[1] + ((b[1] - a[1]) * (p - a[0])) / (b[0] - a[0]);
      }
    }
    return KEYS[KEYS.length - 1][1];
  }
  listen(window, "resize", resize);
  resize();
  /* ---- title sequence (one-shot, timed) ---- */
  const tw = $("#tw"),
    tm = $("#tm"),
    sub = $("#sub"),
    sl = $$("#tw .b");
  let tt = [],
    played = false;
  const show = (ix, x, o) =>
      ix.forEach((i) => {
        sl[i].style.opacity = o;
        sl[i].style.transform = `translateX(${x}px)`;
      }),
    clr = () =>
      sl.forEach((b) => {
        b.style.opacity = 0;
        b.style.transform = "none";
      });
  function titleSeq() {
    const S = (ms, f) => tt.push(later(f, ms));
    if (RM) {
      S(300, () => {
        $("#aur").classList.add("on");
        tm.style.transition = "opacity 1.4s,filter 1.4s";
        tm.style.opacity = 1;
        tm.style.filter = "none";
      });
      S(1800, () => sub.classList.add("on"));
      return;
    }
    S(700, () => {
      show([2, 4], 16, 0.5);
      AC.glitch();
    });
    S(790, clr);
    S(960, () => show([0, 1, 5], -26, 0.6));
    S(1060, clr);
    S(1180, () => show([3], 10, 0.7));
    S(1240, () => {
      clr();
      tm.style.opacity = 0.5;
    });
    S(1320, () => {
      tm.style.opacity = 0;
    });
    S(1420, () => {
      tm.style.opacity = 1;
      tm.style.filter = "none";
      $("#aur").classList.add("on");
      AC.impact(0.8);
    });
    S(1600, () => show([4], -6, 0.5));
    S(1660, clr);
    S(2900, () => sub.classList.add("on"));
  }
  function titleReset() {
    tt.forEach(cancelLater);
    tt = [];
    clr();
    tm.style.transition = "none";
    tm.style.opacity = 0;
    tm.style.filter = "blur(3px)";
    sub.classList.remove("on");
    $("#aur").classList.remove("on");
    played = false;
  }
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
  const burn = $("#burn"),
    hint = $("#hint");
  const CH = [
    [$("#tlv"), 17.6, 26.4],
    [$("#c5"), 26.4, 27.8],
  ].map((a) => ({ el: a[0], s: a[1], e: a[2], seen: false }));
  let reveal = 0,
    trk = 0;
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
      v = raw <= 5.04 ? raw : raw <= 6.04 ? 5.04 : raw - 1;
    collisionSound.update(
      shown < 0 ? 0 : shown / DUR,
      ready && v < 5.8 && !document.hidden,
    );
    if (raw === lv && !dirty) return;
    lv = raw;
    dirty = false;
    /* chrome */
    $("#hdr").style.opacity = ready ? 1 : 0;
    hint.style.opacity = ready ? 1 - ss(0.06, 0.6, raw) : 0;
    topButton.classList.toggle("on", ready && raw > 0.7);
    /* collision video, scrubbed by scroll */
    const tgt = frameFor(clamp(v / 14, 0, 1));
    cur = RM ? tgt : lerp(cur, tgt, 1 - Math.exp(-dt * 12));
    if (Math.abs(tgt - cur) < 0.02) cur = tgt;
    else dirty = true;
    const cO = 1 - ss(6.9, 7.4, v);
    vis(c, cO);
    if (cO > 0 && vReady) {
      const t = Math.min(DUR - 0.02, (cur / 239) * (DUR - 1 / FPS) + 0.5 / FPS);
      if (shown < 0 || Math.abs(t - shown) > 0.5 / FPS) seekTo(t);
    }
    if (seeking) dirty = true;
    burn.style.opacity = ss(4.95, 5.8, raw);
    /* title: the flash burns out to black, then the one-shot reveal */
    if (raw >= 5.8 && !played) {
      played = true;
      titleSeq();
    } else if (raw < 5.3 && played) titleReset();
    $("#title").style.opacity = 1 - ss(6.6, 7.1, v);
    vis($("#aurw"), 1 - ss(6.6, 7.1, v));
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
        });
      }
    });
    /* music state */
    if (v >= 7.2 && trk === 0 && AC.trk) {
      trk = 1;
      AC.play(0, 0.7, 6000);
    } else if (v < 6.8 && trk >= 1) {
      trk = 0;
      reveal = 0;
      AC.stop(700);
    }
    if (trk >= 1 && reveal && AC.trk && AC.trk.volume > 0) {
      const q = v >= 26.5 ? 0.2 : v >= 17.4 ? 0.32 : 0.65;
      if (AC._q !== q && rt > 4.5) {
        AC._q = q;
        AC.fade(q, 2500);
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
    fallbackFrame.onload = null;
    collisionSound.dispose();
    iv.pause();
    vid.pause();
    if (AC.trk) {
      AC.trk.pause();
      AC.trk.removeAttribute("src");
      AC.trk.load();
    }
    if (AC.ctx && AC.ctx.state !== "closed") AC.ctx.close().catch(() => {});
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
