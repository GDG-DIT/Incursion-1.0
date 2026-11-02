'use client';

import { useEffect, useRef } from 'react';
import { createExperience } from '../lib/experience';
import { TIMELINE, REGISTER_URL, imageStyle, jag } from '../lib/content';
import ArrivalScroll from './ArrivalScroll';

function Arrow() {
  return <svg viewBox="0 0 18 8" fill="none" stroke="currentColor" aria-hidden="true"><path d="M0 4h17M13 1l4 3-4 3" /></svg>;
}

function IntroGate() {
  return (
    <section id="term" aria-label="Welcome to Incursion">
      <video id="iv" playsInline preload="auto" src="/media/intro.mp4" aria-label="Incursion introduction" />
      <div id="gate">
        <h1>Two worlds</h1>
        <h1>One final stand</h1>
        <button className="btn" id="enter" type="button">Explore with sound<Arrow /></button>
        <button className="btn q" id="enterq" type="button">Explore without sound</button>
      </div>
      <button id="skip" type="button">Skip intro</button>
    </section>
  );
}

function Timeline() {
  return (
    <section className="ch" id="tlv" aria-label="Schedule">
      <video
        id="timeline-bg"
        className="timeline-bg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="/media/timeline-bg.mp4"
        aria-hidden="true"
      />
      <div className="tlh"><div className="k">Schedule</div><h2>The Fractured Timeline</h2></div>
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

function TitleReveal() {
  return (
    <>
      <div id="aurw" aria-hidden="true"><div id="aur">
        <img id="aimg" src="/media/aurora.webp" alt="" decoding="async" />
        <i className="gl" /><div className="vn" />
        <div className="pt" id="pt">
          {Array.from({ length: 18 }, (_, index) => (
            <i key={index} style={{
              left: `${(index * 37.7) % 100}%`, width: `${1 + index % 3 * .6}px`, height: `${1 + index % 3 * .6}px`,
              '--dx': `${(index % 7 - 3) * 13}px`, animationDuration: `${18 + index % 16}s`, animationDelay: `${-index * 1.7}s`,
            }} />
          ))}
        </div>
      </div></div>
      <div id="title"><div>
        <h1 id="tw"><span id="tm">Incursion</span>
          {Array.from({ length: 7 }, (_, index) => <span className="b" aria-hidden="true" key={index} style={{ clipPath: `inset(${index * 100 / 7}% 0 ${100 - (index + 1) * 100 / 7}% 0)` }}>Incursion</span>)}
        </h1>
        <p id="sub">A National Hackathon By GDG DIT </p>
      </div></div>
    </>
  );
}

export default function IncursionExperience() {
  const root = useRef(null);
  useEffect(() => createExperience(root.current), []);

  return (
    <main ref={root}>
      <div id="scroll"><div id="stage">
        <ArrivalScroll /><div id="burn" />
        <section id="throne" aria-label="Doctor Doom on his throne">
          <img id="tw2" className="pic" src="/media/doom-throne.webp" alt="" decoding="async" />
          <img id="tc" className="pic" src="/media/doom-closeup6.png" alt="Doctor Doom, hooded, eyes glowing green" decoding="async" />
          <div className="vg" id="vg" /><div className="scrim" id="scrim" />
        </section>
        <TitleReveal />
        <div className="t warn" data-w="14.0,14.6,16.4,16.9"><h2>Something's coming, Something we may not be able to&nbsp;deter.</h2></div>
        <Timeline />
        <section className="ch" id="c5"><div>
          <h2>Doom isn&apos;t waiting.</h2><p>Incursion, January 2027</p>
          {/* <a className="btn reg" href="/universe">Enter the Universe<Arrow /></a> */}
        </div><div className="k">A GDG on Campus hackathon</div></section>
        <header id="hdr"><div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><button id="snd" aria-pressed="true" type="button">Sound on</button></div></header>
        <header id="hdr"><b>Incursion</b><div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><button id="snd" aria-pressed="true" type="button">Sound on</button></div></header>
        <div id="hint">Scroll to explore</div><div className="grain" aria-hidden="true" />
        <IntroGate />
      </div></div>
      <video id="collision-source" className="collision-source" muted playsInline aria-hidden="true" tabIndex={-1} />
      <button id="top" type="button" aria-label="Go to top">
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" aria-hidden="true"><path d="M9 16V2M3.5 7.5 9 2l5.5 5.5" /></svg>
      </button>
      <noscript><p>This experience uses JavaScript. Incursion is a GDG on Campus hackathon in January 2027.</p></noscript>
    </main>
  );
}
