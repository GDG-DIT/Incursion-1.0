'use client';

import Link from 'next/link';
import { REGISTER_URL } from '../../lib/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="universe-footer">
      <div className="universe-container">
        <div className="universe-footer-grid">
          {/* Column 1: Brand & Theme */}
          <div>
            <Link href="/universe" className="universe-footer-brand-title">
              INCURSION
            </Link>
            <p className="universe-footer-desc">
              A 24-hour national hackathon presented by GDG on Campus. When two realities collide,
              the ultimate defense is forged in code.
            </p>
            <div className="universe-footer-tagline">
              January 2027 • Two Worlds. One Final Stand.
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <div className="universe-footer-col-title">Navigation</div>
            <ul className="universe-footer-links">
              <li><a href="#about">About Event</a></li>
              <li><a href="#tracks">Hackathon Tracks</a></li>
              <li><a href="#schedule">Event Schedule</a></li>
              <li><a href="#prizes">Prize Pools</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li>
                <Link href="/" style={{ color: 'var(--em)' }}>
                  ← Replay Film Experience
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Transmission */}
          <div>
            <div className="universe-footer-col-title">Transmission</div>
            <ul className="universe-footer-links">
              <li>
                <a href={REGISTER_URL || '#schedule'} target="_blank" rel="noopener noreferrer">
                  Registration Portal
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                  Discord Server
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  GitHub Organization
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  X / Twitter Broadcast
                </a>
              </li>
              <li>
                <button type="button" onClick={scrollToTop} style={{ color: 'var(--em)', marginTop: '8px' }}>
                  ↑ Back to Summit
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="universe-footer-bottom">
          <div>© 2027 Incursion Hackathon • Organized with ❤️ by GDG on Campus.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Code of Conduct</span>
            <span>Privacy Directive</span>
            <span>Multiverse Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
