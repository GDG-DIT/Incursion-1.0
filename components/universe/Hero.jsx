'use client';

import { useState, useEffect } from 'react';
import { REGISTER_URL } from '../../lib/content';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: 30 January 2027, 08:00 IST (Finale Check-in)
    const target = new Date('2027-01-30T08:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="universe-hero">
      <div className="universe-container">
        {/* Eyebrow badge */}
        <div className="universe-hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <img src="/gdg-logo.svg" alt="GDG on Campus Logo" style={{ height: '16px', width: 'auto', display: 'block' }} />
          <span>GDG on Campus, DYPIT Pune Presents • 30–31 January 2027</span>
        </div>

        {/* Main Title */}
        <h1 className="universe-hero-title">
          INCURSION 2027 <br />
          <span className="universe-hero-title-accent">Doomsday Times Run Out</span>
        </h1>

        {/* Cinematic Description */}
        <p className="universe-hero-subtitle">
          Two worlds have collided. The timeline is fractured. An online national idea challenge
          followed by an offline 24-hour build-and-demo finale at DYPIT campus, Pune.
        </p>

        {/* Call to Actions */}
        <div className="universe-hero-cta">
          <a
            href={REGISTER_URL || ''}
            target={REGISTER_URL ? '_blank' : undefined}
            rel={REGISTER_URL ? 'noopener noreferrer' : undefined}
            onClick={(e) => {
              if (!REGISTER_URL) e.preventDefault();
            }}
            className="universe-btn-primary"
            title={REGISTER_URL ? 'Register Now' : 'Registration opening soon on Unstop'}
          >
            <span>Claim Your Spot</span>
            <svg viewBox="0 0 18 8" fill="none" stroke="currentColor" width="16" height="8">
              <path d="M0 4h17M13 1l4 3-4 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#tracks" className="universe-btn-secondary">
            Explore Tracks
          </a>
        </div>

        {/* Countdown Box */}
        <div className="universe-countdown-box">
          <div className="universe-countdown-col">
            <span className="universe-countdown-num">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="universe-countdown-lbl">Days</span>
          </div>
          <div className="universe-countdown-col">
            <span className="universe-countdown-num">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="universe-countdown-lbl">Hours</span>
          </div>
          <div className="universe-countdown-col">
            <span className="universe-countdown-num">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="universe-countdown-lbl">Mins</span>
          </div>
          <div className="universe-countdown-col">
            <span className="universe-countdown-num accent">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="universe-countdown-lbl">Secs</span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="universe-stats-row">
          <div>
            <div className="universe-stat-num">24 Hours</div>
            <div className="universe-stat-lbl">Offline Build Sprint</div>
          </div>
          <div>
            <div className="universe-stat-num accent">₹2 Lakh</div>
            <div className="universe-stat-lbl">Total Prize Pool</div>
          </div>
          <div>
            <div className="universe-stat-num">Open to All</div>
            <div className="universe-stat-lbl">Round 1 (Unlimited Teams)</div>
          </div>
          <div>
            <div className="universe-stat-num accent">Top 50 Teams</div>
            <div className="universe-stat-lbl">Round 2 Finale (DYPIT Pune)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
