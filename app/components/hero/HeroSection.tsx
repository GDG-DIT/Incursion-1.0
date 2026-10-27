"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Room } from "./Hall";
const Hall = dynamic(() => import("./Hall"), { ssr: false });
const chapters = [
  { name: "Sanctuary", at: 0 },
  { name: "Ruins", at: 0.56 },
  { name: "Incursion", at: 1 },
];
function Registration({ close }: { close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      className="registration"
      onCancel={close}
      aria-labelledby="register-title"
    >
      <button className="back" onClick={close}>
        ← Back to reality
      </button>
      <p className="eyebrow">INCURSSION · DOOMSDAY</p>
      <h2 id="register-title">Build what survives.</h2>
      <p>Gather your team. Registration is coming soon.</p>
      <a
        className="primary"
        href="https://example.com/register"
        target="_blank"
        rel="noopener noreferrer"
      >
        Preview registration ↗
      </a>
      <small>
        Demo destination. Applications are not open. No information is
        collected.
      </small>
    </dialog>
  );
}
export default function HeroSection() {
  const [room, setRoom] = useState<Room>("hall"),
    [reduced, setReduced] = useState(false),
    [mobile, setMobile] = useState(false),
    [register, setRegister] = useState(false),
    [chapter, setChapter] = useState(0),
    [ready, setReady] = useState(false);
  const progress = useRef(0),
    bar = useRef<HTMLDivElement>(null),
    tween = useRef<gsap.core.Tween | null>(null),
    registerButton = useRef<HTMLButtonElement>(null);
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)"),
      size = matchMedia("(max-width:760px)");
    const sync = () => {
      setReduced(motion.matches);
      setMobile(size.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    size.addEventListener("change", sync);
    const scroll = () => {
      progress.current = Math.min(
        1,
        window.scrollY /
          Math.max(1, document.documentElement.scrollHeight - innerHeight),
      );
      if (bar.current)
        bar.current.style.transform = `scaleX(${progress.current})`;
      setChapter(progress.current < 0.4 ? 0 : progress.current < 0.8 ? 1 : 2);
    };
    const cancel = () => tween.current?.kill();
    const key = (e: KeyboardEvent) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
        ].includes(e.key)
      )
        cancel();
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", key);
    scroll();
    return () => {
      motion.removeEventListener("change", sync);
      size.removeEventListener("change", sync);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", key);
      cancel();
    };
  }, []);
  function travel(at: number) {
    tween.current?.kill();
    setRoom("hall");
    const target = at * (document.documentElement.scrollHeight - innerHeight);
    if (reduced) {
      window.scrollTo(0, target);
      return;
    }
    const proxy = { y: window.scrollY };
    tween.current = gsap.to(proxy, {
      y: target,
      duration: Math.abs(progress.current - at) > 0.3 ? 5 : 2,
      ease: "power2.inOut",
      onUpdate: () => window.scrollTo(0, proxy.y),
    });
  }
  const go = useCallback((r: Room) => setRoom(r), []);
  return (
    <main
      className={`journey-page hall-entered ${reduced ? "motion-reduced" : ""}`}
    >
      <div
        className="world"
        aria-label="Three dimensional journey through a throne hall, ruined city and colliding realities"
      >
        <Hall
          room={room}
          onRoom={go}
          reduced={reduced}
          mobile={mobile}
          entered
          onReady={onReady}
          replayKey={0}
          progress={progress}
        />
      </div>
      <div className="vignette" />
      <div className="journey-progress" ref={bar} />
      <div className="hall-interface">
        <a href="#chapters" className="skip">
          Skip to chapter navigation
        </a>
        <header>
          <button
            className="brand"
            onClick={() => travel(0)}
            aria-label="Incurssion home"
          >
            <span className="sigil">⟐</span>
            <span>
              INCURSSION<small>DOOMSDAY · HACKATHON</small>
            </span>
          </button>
          <nav id="chapters" tabIndex={-1} aria-label="Journey chapters">
            {chapters.map((c, i) => (
              <button
                key={c.name}
                aria-current={chapter === i ? "step" : undefined}
                onClick={() => travel(c.at)}
              >
                {c.name}
              </button>
            ))}
          </nav>
          <button
            ref={registerButton}
            className="nav-register"
            onClick={() => setRegister(true)}
          >
            Register ↗
          </button>
        </header>
        <h1 className="sr-only">Incurssion — when realities collide</h1>
        <aside className="chapter-caption" aria-live="polite">
          <span>
            0{chapter + 1} / 03 ·{" "}
            {chapter === 0
              ? "REALITY STABLE"
              : chapter === 1
                ? "BARRIER FAILING"
                : "COLLISION IMMINENT"}
          </span>
          {chapter > 0 && (
            <>
              <h2>
                {chapter === 1
                  ? "The sky belongs to another world."
                  : "Two realities. One last chance."}
              </h2>
              <p>
                {chapter === 1
                  ? "An abandoned city. An impossible skyline. The barrier is breaking."
                  : "Universes collide. Build what survives."}
              </p>
            </>
          )}
        </aside>
        <div className="chapter-rail">
          {chapters.map((c, i) => (
            <button
              key={i}
              aria-label={`Go to ${c.name}`}
              aria-current={chapter === i ? "step" : undefined}
              onClick={() => travel(c.at)}
            >
              <i />
              <span>0{i + 1}</span>
            </button>
          ))}
        </div>
        <div className="explore-controls">
          <button className="text-button" onClick={() => travel(0)}>
            ↶ Hall
          </button>
          <button
            className="rift-button"
            onClick={() => travel(chapter === 0 ? 0.56 : chapter === 1 ? 1 : 0)}
          >
            <span className="rift-dot" />
            {chapter === 0
              ? "Awaken the rift"
              : chapter === 1
                ? "Witness the incursion"
                : "Return to reality"}{" "}
            ↓
          </button>
        </div>
        <footer>
          <span className="scroll-cue">
            {ready ? "SCROLL TO CROSS REALITIES ↓" : "Rendering the world…"}
          </span>
          <button onClick={() => setReduced((v) => !v)} aria-pressed={reduced}>
            {reduced ? "Motion off" : "Motion on"} ◉
          </button>
        </footer>
      </div>
      <div className="scroll-space" aria-hidden="true" />
      {register && (
        <Registration
          close={() => {
            setRegister(false);
            requestAnimationFrame(() => registerButton.current?.focus());
          }}
        />
      )}
    </main>
  );
}
