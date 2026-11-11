'use client';

import DoomsdayCountdown from '../DoomsdayCountdown';

export const DISCORD_INVITE_URL = 'https://discord.gg/QYQZBEmgQ';

export default function FinaleSection() {
  return (
    <section id="finale" className="universe-finale-section" aria-label="Countdown to Incursion 2027">
      {/* Atmospheric Avengers Doomsday Backdrop */}
      <div className="finale-bg" aria-hidden="true">
        <img
          className="finale-img"
          src="/media/avengers-countdown-bg.webp"
          alt="Avengers Doomsday Backdrop"
          decoding="async"
        />
        <div className="finale-top-gradient" />
        <div className="finale-beams" />
        <div className="finale-vignette" />
      </div>

      {/* Centerpiece HUD */}
      <div className="finale-hud">
        <span className="finale-eyebrow">STAY TUNED</span>
        <h2 className="finale-title">SOMETHING BIG IS HERE</h2>

        <DoomsdayCountdown />

        <div className="finale-actions">
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="finale-discord-btn"
            title="Join the Official Incursion 2027 Discord Community"
          >
            <span>JOIN THE DISCORD</span>
            <span className="finale-btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
