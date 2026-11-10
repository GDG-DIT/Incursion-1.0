'use client';

import { useState, useEffect } from 'react';
// Target: 11 November 2026, 08:00 PM IST (Finale Check-in)
const TARGET_TIME = new Date('2026-11-11T20:00:00+05:30').getTime();

function calculateTimeLeft() {
  const diff = TARGET_TIME - Date.now();
  if (diff <= 0) {
    return { months: '00', days: '00', hours: '00', minutes: '00', seconds: '00' };
  }

  const totalSecs = Math.floor(diff / 1000);
  const totalMins = Math.floor(totalSecs / 60);
  const totalHours = Math.floor(totalMins / 60);
  const totalDays = Math.floor(totalHours / 24);

  // Standard cinematic countdown unit breakdown
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  const hours = totalHours % 24;
  const minutes = totalMins % 60;
  const seconds = totalSecs % 60;

  return {
    months: String(months).padStart(2, '0'),
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export default function DoomsdayCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    months: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="avengers-countdown" aria-label="Countdown to Incursion on 11 November 2026, 08:00 PM IST">
      <div className="avengers-digits-row" suppressHydrationWarning>
        <div className="avengers-unit">
          <span className="avengers-num">{timeLeft.months}</span>
          <span className="avengers-label">Months</span>
        </div>
        <span className="avengers-sep" aria-hidden="true">:</span>
        <div className="avengers-unit">
          <span className="avengers-num">{timeLeft.days}</span>
          <span className="avengers-label">Days</span>
        </div>
        <span className="avengers-sep" aria-hidden="true">:</span>
        <div className="avengers-unit">
          <span className="avengers-num">{timeLeft.hours}</span>
          <span className="avengers-label">Hours</span>
        </div>
        <span className="avengers-sep" aria-hidden="true">:</span>
        <div className="avengers-unit">
          <span className="avengers-num">{timeLeft.minutes}</span>
          <span className="avengers-label">Minutes</span>
        </div>
        <span className="avengers-sep" aria-hidden="true">:</span>
        <div className="avengers-unit">
          <span className="avengers-num">{timeLeft.seconds}</span>
          <span className="avengers-label">Seconds</span>
        </div>
      </div>

      <div className="countdown-footer">
        <span>11 November 2026 · 08:00 PM IST</span>
      </div>

      <a
        className="btn countdown-discord-link"
        href="https://discord.gg/QYQZBEmgQ"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join the Discord
        <svg viewBox="0 0 18 8" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M0 4h17M13 1l4 3-4 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
