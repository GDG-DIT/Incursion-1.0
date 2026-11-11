'use client';

interface TrackItem {
  id: string;
  name: string;
  tag: string;
  bounty: string;
  focusAreas: string[];
  icon: React.ReactNode;
}

const TRACKS: TrackItem[] = [
  {
    id: 'SECTOR 01',
    name: 'Rogue Protocol',
    tag: 'AI & Agentic Systems',
    bounty: '₹5,000 Bounty',
    focusAreas: ['AI Agents', 'Multilingual Assistants', 'Automation', 'Intelligent Assistants'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
  {
    id: 'SECTOR 02',
    name: 'Firewall Zero',
    tag: 'Cybersecurity & FinTech',
    bounty: '₹5,000 Bounty',
    focusAreas: ['Threat Detection', 'Fraud & Scams', 'Privacy & Identity', 'Payments & Financial Inclusion'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    id: 'SECTOR 03',
    name: 'Final Hour',
    tag: 'Open Innovation',
    bounty: '₹5,000 Bounty',
    focusAreas: ['Climate', 'Health & MedTech', 'Disaster & Safety', 'Agriculture & Space'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 9 9M12 3v9l6 3" />
        <path d="M3 12a9 9 0 0 1 9-9" />
      </svg>
    ),
  },
  {
    id: 'SECTOR 04',
    name: 'Glass Wall',
    tag: 'GovTech & Transparent Governance',
    bounty: '₹5,000 Bounty',
    focusAreas: ['Transparency', 'Public Services', 'Grievances', 'Accountability'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3l9 7H3l9-7z" />
      </svg>
    ),
  },
  {
    id: 'SECTOR 05',
    name: 'Survival City',
    tag: 'Smart Cities & Civic Services',
    bounty: '₹5,000 Bounty',
    focusAreas: ['Transport', 'Traffic Management', 'Water Systems', 'Civic Technology'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M13 11l6-3v13" />
        <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01M17 12v.01M17 15v.01M17 18v.01" />
      </svg>
    ),
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="universe-section">
      <div className="universe-container">
        {/* Section Header */}
        <div className="universe-section-header">
          <div className="universe-eyebrow">Battleground Domains</div>
          <h2 className="universe-section-title">The 5 Incursion Chambers</h2>
          <div className="universe-tracks-notice">
            <span className="notice-beacon" />
            <span>Broad tracks published now • Detailed problem statements revealed at kickoff</span>
          </div>
        </div>

        {/* 5 Equal Problem Statement Track Cards */}
        <div className="universe-tracks-equal-grid">
          {TRACKS.map((track) => (
            <div key={track.id} className="universe-equal-track-card">
              {/* Tactical Corner Accents */}
              <div className="tactical-corner tl" />
              <div className="tactical-corner tr" />
              <div className="tactical-corner bl" />
              <div className="tactical-corner br" />

              {/* Card Top Meta Bar */}
              <div className="track-card-top-bar">
                <div className="track-card-sector">
                  <span className="track-live-beacon" />
                  <span className="track-sector-code">{track.id}</span>
                </div>
                <div className="track-card-bounty">
                  <span className="bounty-spark" aria-hidden="true">✦</span>
                  <span>{track.bounty}</span>
                </div>
              </div>

              {/* Card Header with Domain Glyph & Titles */}
              <div className="track-card-header">
                <div className="track-card-icon-wrap" aria-hidden="true">
                  {track.icon}
                </div>
                <div className="track-card-title-group">
                  <h3 className="track-card-title">{track.name}</h3>
                  <span className="track-card-domain-badge">{track.tag}</span>
                </div>
              </div>

              {/* High-tech divider */}
              <div className="track-card-divider" />

              {/* Focus Areas Section */}
              <div className="track-card-vectors">
                <div className="track-vectors-label">
                  <span>CORE FOCUS AREAS</span>
                  <span className="vectors-accent-line" />
                </div>
                <div className="track-vectors-list">
                  {track.focusAreas.map((area) => (
                    <span key={area} className="universe-focus-tag">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Tactical Footer */}
              <div className="track-card-footer">
                <div className="track-footer-left">
                  <span className="track-footer-dot" />
                  <span>KICKOFF REVEAL • 30 JAN</span>
                </div>
                <span className="track-footer-status">SECTOR ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
