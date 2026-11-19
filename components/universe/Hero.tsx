'use client';

import { REGISTER_URL } from '../../lib/content';

export default function Hero() {
  return (
    <section className="universe-hero" aria-labelledby="universe-hero-heading">
      <div className="universe-container">
        {/* Eyebrow badge */}
        <div className="universe-hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <img
            src="/gdg-logo.svg"
            alt="GDG on Campus Dr. D. Y. Patil Institute of Technology Pune Logo"
            style={{ height: '16px', width: 'auto', display: 'block' }}
          />
          <span>GDG on Campus // DYPIT Pune presents</span>
        </div>

        {/* Main Title */}
        <h1 id="universe-hero-heading" className="universe-hero-title">
          INCURSION 2027 <br />
          <span className="universe-hero-title-accent">24-Hour National Level Hackathon</span>
        </h1>

        {/* Cinematic Description with High-Intent Natural Keywords */}
        <p className="universe-hero-subtitle">
          Two universes collide. The timeline fractures. India&apos;s premier 24-hour national level student hackathon
          summoning top squads nationwide for an online idea challenge leading to the high-stakes offline build finale at
          Dr. D. Y. Patil Institute of Technology (DYPIT) campus, Pune. Compete for a ₹2,00,000 (₹2 Lakh) cash prize pool across
          5 specialized technology domains: AI &amp; Agentic AI, Cybersecurity &amp; FinTech, Open Innovation, GovTech, and Smart Cities.
        </p>

        {/* Call to Actions */}
        <div className="universe-hero-cta">
          <a
            href={REGISTER_URL || '#schedule'}
            target={REGISTER_URL ? '_blank' : undefined}
            rel={REGISTER_URL ? 'noopener noreferrer' : undefined}
            className="universe-btn-primary"
            title={REGISTER_URL ? 'Register Now on Unstop' : 'Registrations opening soon'}
          >
            <span>Claim Your Spot</span>
            <svg viewBox="0 0 18 8" fill="none" stroke="currentColor" width="16" height="8" aria-hidden="true">
              <path d="M0 4h17M13 1l4 3-4 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#tracks" className="universe-btn-secondary">
            Explore Battlegrounds
          </a>
          <a href="#schedule" className="universe-btn-secondary">
            Milestones Roadmap
          </a>
        </div>

        {/* Stats Strip */}
        <div className="universe-stats-row">
          <div>
            <div className="universe-stat-num">24 Hours</div>
            <div className="universe-stat-lbl">Non-Stop Offline Sprint</div>
          </div>
          <div>
            <div className="universe-stat-num accent">₹2,00,000</div>
            <div className="universe-stat-lbl">Total Cash Prize Pool</div>
          </div>
          <div>
            <div className="universe-stat-num">Top 50 Teams</div>
            <div className="universe-stat-lbl">Round 2 Finale (DYPIT Pune)</div>
          </div>
          <div>
            <div className="universe-stat-num accent">5 Domains</div>
            <div className="universe-stat-lbl">Dedicated ₹5K Track Bounties</div>
          </div>
        </div>
      </div>
    </section>
  );
}
