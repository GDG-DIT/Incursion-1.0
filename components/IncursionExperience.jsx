'use client';

import { useEffect, useRef } from 'react';
import { createExperience } from '../lib/experience';
import { TIMELINE, REGISTER_URL, imageStyle, jag } from '../lib/content';
import DoomMaskHero from './DoomMaskHero';

function Arrow() {
  return <svg viewBox="0 0 18 8" fill="none" stroke="currentColor" aria-hidden="true"><path d="M0 4h17M13 1l4 3-4 3" /></svg>;
}

function IntroGate() {
  return (
    <section id="term" aria-label="Welcome to Incursion">
      <video id="iv" playsInline preload="auto" src="/media/intro.mp4" aria-label="Incursion introduction" />
      <div id="gate">
        <div className="k">GDG on Campus presents</div>
        <h1>Incursion</h1>
        <button className="btn" id="enter" type="button">Explore with sound<Arrow /></button>
        <button className="btn q" id="enterq" type="button">Explore without sound</button>
        <p className="gate-note">Two worlds. One final stand.<br />A GDG on Campus hackathon. January 2027.</p>
      </div>
      <button id="skip" type="button">Skip intro</button>
    </section>
  );
}

function Timeline() {
  return (
    <section className="timeline-section" id="tlv" aria-label="Schedule">
      <video
        id="timeline-bg"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/media/timeline-1.webp"
        src="/media/timeline-bg.mp4"
        aria-hidden="true"
      />
      <div className="tlh">
        <div className="k">Schedule</div>
        <h2>The Fractured Timeline</h2>
        <p>Five milestones. One universe-changing finale.</p>
      </div>
      <div id="tmask">
        <ol id="tcol">
          {TIMELINE.map((event, index) => (
            <li className={`row ${index % 2 ? 'R' : 'L'}`} key={event.t}>
              <div className="strip" aria-hidden="true">
                <i className="pp" style={{ clipPath: jag(index * 13 + 3) }} />
                <i className="im" style={{ clipPath: jag(index * 13 + 9) }}><b className="ii" style={imageStyle(event.img)} /></i>
              </div>
              <div className="txt">
                <i className="ic" aria-hidden="true" style={imageStyle(event.ic)} />
                <h3>{event.t}</h3><span className="ln" aria-hidden="true" />
                <div className="date">{event.d}</div><p>{event.x}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function IncursionExperience() {
  const root = useRef(null);
  useEffect(() => createExperience(root.current), []);

  const registerHref = REGISTER_URL || '#tlv';

  return (
    <main className="incursion-site" ref={root}>
      <header className="site-header" id="hdr">
        <a className="wordmark" href="#hero" aria-label="Incursion home">Incursion</a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#tlv">Timeline</a>
          <a href="#closing">Finale</a>
        </nav>
        <div className="header-actions">
          <a className="header-register" href={registerHref}>Register <Arrow /></a>
          <button id="snd" type="button" aria-pressed="true">Sound on</button>
        </div>
      </header>

      <section className="hero" id="hero" aria-labelledby="hero-title">
        <img className="hero-backdrop" src="/media/doom-throne.webp" alt="" fetchPriority="high" />
        <div className="hero-shade" aria-hidden="true" />
        <DoomMaskHero />
        <div className="hero-copy">
          <p className="hero-eyebrow">GDG on Campus presents</p>
          <h1 id="hero-title">Incursion</h1>
          <p className="hero-deck">Two worlds. One final stand.<br />Build what comes next.</p>
          <div className="hero-meta">
            <span>November 2026 – January 2027</span>
            <i aria-hidden="true" />
            <span>On campus finale</span>
          </div>
          <div className="hero-actions">
            <a className="btn hero-primary" href={registerHref}>Register now<Arrow /></a>
            <a className="btn hero-secondary" href="#tlv">View timeline</a>
          </div>
        </div>
        <a className="hero-scroll" href="#tlv"><span>Scroll to explore</span><i aria-hidden="true" /></a>
        <p className="model-credit">“Doctor Doom’s Mask” by <a href="https://sketchfab.com/3d-models/doctor-dooms-mask-8db5464072f341a994ad1c729d9080f7" target="_blank" rel="noreferrer">Nicolas_Laube</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a></p>
      </section>

      <Timeline />

      <section className="closing" id="closing" aria-labelledby="closing-title">
        <div className="k">The convergence awaits</div>
        <h2 id="closing-title">Your universe is next.</h2>
        <p>Bring your team. Build your answer. Meet us at the finale.</p>
        <a className="btn hero-primary" href={registerHref}>Register now<Arrow /></a>
        <span className="closing-mark">A GDG on Campus hackathon</span>
      </section>

      <footer className="site-footer" aria-label="Incursion site footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-wordmark" href="#hero">Incursion</a>
            <p>Two worlds. One final stand.</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#hero">Home</a>
            <a href="#tlv">Timeline</a>
            <a href={registerHref}>Register</a>
          </nav>
          <div className="footer-event">
            <span>GDG on Campus · Incursion 2026</span>
            <strong>Grand finale · 30–31 January 2027</strong>
            <span className="footer-location">On campus</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Incursion · GDG on Campus</span>
          <a href="#hero">Back to top ↑</a>
        </div>
      </footer>
      <button id="top" type="button" aria-label="Go to top">
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" aria-hidden="true"><path d="M9 16V2M3.5 7.5 9 2l5.5 5.5" /></svg>
      </button>
      <IntroGate />
      <noscript><p className="noscript">Incursion is a GDG on Campus hackathon running November 2026 through January 2027.</p></noscript>
    </main>
  );
}
