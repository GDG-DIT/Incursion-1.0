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
            <div className="universe-footer-brand-lockup">
              <div className="universe-footer-logo-pair">
                <img
                  className="universe-footer-incursion-logo-slot"
                  src="/media/incursion_logo.svg"
                  alt="Incursion logo"
                />
                <span className="universe-footer-logo-divider" aria-hidden="true" />
                <img className="universe-footer-gdg-logo" src="/gdg-logo.svg" alt="GDG on Campus logo" />
              </div>
              <Link href="/universe" className="universe-footer-brand-title">
                INCURSION 2027
              </Link>
            </div>
            <p className="universe-footer-desc">
              National-level student hackathon organized by GDG on Campus,
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
                <a href="https://www.instagram.com/gdg.dit" target="_blank" rel="noopener noreferrer">
                  Instagram: @gdg.dit
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/gdg-dit/" target="_blank" rel="noopener noreferrer">
                  LinkedIn: GDG DIT
                </a>
              </li>
              <li>
                <a href="mailto:gdg.dit@dypvp.edu.in">
                  Email: gdg.dit@dypvp.edu.in
                </a>
              </li>
              <li className="universe-footer-contact">
                <div className="universe-footer-contact-person">
                  <strong>Tejas Nalawade</strong>
                  <span>Event Director</span>
                </div>
                <a className="universe-footer-call" href="tel:+919970940311">
                  <span>+91 99709 40311</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li className="universe-footer-contact">
                <div className="universe-footer-contact-person">
                  <strong>Parth Kharat</strong>
                  <span>Tech Lead</span>
                </div>
                <a className="universe-footer-call" href="tel:+917972932522">
                  <span>+91 79729 32522</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Campus Map */}
          <div className="universe-footer-map-column">
            <div className="universe-footer-col-title">Campus Location</div>
            <div className="universe-footer-map">
              <iframe
                title="Dr. D. Y. Patil Institute of Technology campus map"
                src="https://www.google.com/maps?q=Dr.+D.+Y.+Patil+Institute+of+Technology,+Pimpri,+Pune&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              className="universe-footer-map-link"
              href="https://www.google.com/maps/search/?api=1&query=Dr.+D.+Y.+Patil+Institute+of+Technology,+Pimpri,+Pune"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="universe-footer-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/gdg-logo.svg" alt="GDG Logo" style={{ height: '16px', width: 'auto' }} />
            <span>© 2027 INCURSION • GDG on Campus, Dr. D. Y. Patil Institute of Technology, Pimpri, Pune.</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>24 Hours National Level Hackathon</span>
            <span>DYPIT Pune</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="universe-floating-top"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M9 16V2M3.5 7.5 9 2l5.5 5.5" />
        </svg>
      </button>
    </footer>
  );
}
