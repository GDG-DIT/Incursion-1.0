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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img src="/gdg-logo.svg" alt="GDG on Campus Logo" style={{ height: '26px', width: 'auto' }} />
              <Link href="/universe" className="universe-footer-brand-title" style={{ margin: 0 }}>
                INCURSION 2027
              </Link>
            </div>
            <p className="universe-footer-desc">
              National-level 24-hour student hackathon organized by GDG on Campus,
              Dr. D. Y. Patil Institute of Technology, Pimpri, Pune.
            </p>
            <div className="universe-footer-tagline">
              30–31 January 2027 • Theme: &ldquo;Doomsday Times Run Out&rdquo;
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <div className="universe-footer-col-title">Navigation</div>
            <ul className="universe-footer-links">
              <li><a href="#about">About Event</a></li>
              <li><a href="#tracks">Hackathon Tracks</a></li>
              <li><a href="#schedule">Timeline & Schedule</a></li>
              <li><a href="#prizes">Prize Pool & Perks</a></li>
              <li><a href="#sponsors">Partners & Sponsors</a></li>
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
                <a
                  href={REGISTER_URL || ''}
                  target={REGISTER_URL ? '_blank' : undefined}
                  rel={REGISTER_URL ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (!REGISTER_URL) e.preventDefault();
                  }}
                  title={REGISTER_URL ? 'Unstop Registration' : 'Registration opening soon on Unstop'}
                >
                  Registration Portal (Unstop)
                </a>
              </li>
              <li>
                <a href="https://instagram.com/gdg.dit" target="_blank" rel="noopener noreferrer">
                  Instagram: @gdg.dit
                </a>
              </li>
              <li style={{ color: 'var(--mute)', fontSize: '13px' }}>
                Other Channels: TBD
              </li>
              <li>
                <button type="button" onClick={scrollToTop} style={{ color: 'var(--em)', marginTop: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  ↑ Back to Top
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="universe-footer-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/gdg-logo.svg" alt="GDG Logo" style={{ height: '16px', width: 'auto' }} />
            <span>© 2027 INCURSION • GDG on Campus, Dr. D. Y. Patil Institute of Technology, Pimpri, Pune.</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>National Level Hackathon</span>
            <span>DYPIT Pune</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
