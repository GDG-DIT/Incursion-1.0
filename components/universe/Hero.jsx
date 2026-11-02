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
    // Target: 22 January 2027 (hackathon kickoff)
    const target = new Date('2027-01-22T10:00:00Z').getTime();

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
        <div className="universe-hero-badge">
          <span className="universe-hero-badge-dot" />
          <span>GDG on Campus Presents • January 2027</span>
        </div>

        {/* Main Title */}
        <h1 className="universe-hero-title">
          INCURSION <br />
          <span className="universe-hero-title-accent"></span>
        </h1>

        {/* Cinematic Description */}
        <p className="universe-hero-subtitle">
          Two worlds have collided. The timeline is fractured. You have 24 hours to forge
          solutions, defend humanity, and claim your place in the multiverse.
        </p>

        {/* Call to Actions */}
        <div className="universe-hero-cta">
          <a
            href={REGISTER_URL || '#schedule'}
            target={REGISTER_URL ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="universe-btn-primary"
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
            <div className="universe-stat-lbl">Intense Hacking</div>
          </div>
          <div>
            <div className="universe-stat-num accent">₹5,00,000+</div>
            <div className="universe-stat-lbl">Prize Pool & Perks</div>
          </div>
          <div>
            <div className="universe-stat-num">500+</div>
            <div className="universe-stat-lbl">Hackers & Builders</div>
          </div>
          <div>
            <div className="universe-stat-num accent">2 Worlds</div>
            <div className="universe-stat-lbl">One Final Stand</div>
          </div>
        </div>
      </div>
    </section>
  );
}
