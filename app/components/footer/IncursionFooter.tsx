"use client";

import { useEffect, useRef } from "react";

export default function IncursionFooter() {
  const footer = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = footer.current;
    if (!element) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const progress = motion.matches
        ? 1
        : Math.max(0, Math.min(1, (bounds.height - bounds.top) / bounds.height));
      element.style.setProperty("--footer-entry", progress.toFixed(4));
      element.style.setProperty(
        "--footer-title-mask",
        `${(1 - progress) * 100}%`,
      );
      element.style.setProperty(
        "--footer-title-sweep",
        `${-125 + progress * 250}%`,
      );
      element.style.setProperty(
        "--footer-far-lift",
        `${(1 - progress) * 34}px`,
      );
      element.style.setProperty(
        "--footer-near-lift",
        `${(1 - progress) * 54}px`,
      );
      element.style.setProperty(
        "--footer-scale",
        `${0.72 + progress * 0.28}`,
      );
      element.style.setProperty(
        "--footer-horizon-opacity",
        `${0.45 + progress * 0.55}`,
      );
      element.style.setProperty(
        "--footer-glow-alpha",
        `${0.12 + progress * 0.12}`,
      );
      element.style.setProperty(
        "--footer-far-opacity",
        `${progress * 0.58}`,
      );
      element.style.setProperty(
        "--footer-near-opacity",
        `${progress * 0.96}`,
      );
      element.style.setProperty(
        "--footer-content-opacity",
        `${progress}`,
      );
      element.style.setProperty(
        "--footer-content-lift",
        `${(1 - progress) * 46}px`,
      );
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      motion.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <footer
      ref={footer}
      className="incursion-footer"
      aria-labelledby="incursion-footer-title"
    >
      <div className="incursion-footer__landscape" aria-hidden="true">
        <div className="incursion-footer__horizon" />
        <div className="incursion-footer__moon" />
        <div className="incursion-footer__skyline incursion-footer__skyline--far" />
        <div className="incursion-footer__skyline incursion-footer__skyline--near" />
        <span className="incursion-footer__debris incursion-footer__debris--one" />
        <span className="incursion-footer__debris incursion-footer__debris--two" />
        <span className="incursion-footer__debris incursion-footer__debris--three" />
        <div className="incursion-footer__ground" />
      </div>

      <div className="incursion-footer__content">
        <p className="incursion-footer__eyebrow">AFTER THE COLLISION</p>
        <h2 id="incursion-footer-title">INCURSION</h2>
        <p className="incursion-footer__tagline">WHERE UNIVERSES COLLIDE.</p>
      </div>

      <div className="incursion-footer__base">
        <a className="incursion-footer__organizer" href="#chapters" aria-label="Incurssion Doomsday Hackathon, return to the journey">
          <span>INCURSION 1.0</span>
          <small>DOOMSDAY HACKATHON</small>
        </a>
        <p className="incursion-footer__notice">Community channels &amp; contact details coming soon.</p>
        <p className="incursion-footer__copyright">© INCURSION 1.0</p>
      </div>
    </footer>
  );
}
