'use client';

export default function About() {
  return (
    <section id="about" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            <img src="/gdg-logo.svg" alt="GDG Logo" style={{ height: '18px', width: 'auto' }} />
            <div className="universe-eyebrow" style={{ margin: 0 }}>Classified Mission Briefing</div>
          </div>
          <h2 className="universe-section-title">Doomsday Times Run Out</h2>
          <p className="universe-section-desc">
            INCURSION 2027 is a premier national-level 24-hour student hackathon organized by GDG on Campus,
            Dr. D. Y. Patil Institute of Technology, Pimpri, Pune. Engineered as a high-intensity two-round gauntlet—an
            online nationwide ideation and prototype screening followed by a 24-hour offline build sprint on campus—INCURSION
            summons India&apos;s most ambitious developers, engineers, and researchers to engineer critical solutions before the clock hits zero.
          </p>
        </div>

        {/* Two-Round Tournament Architecture Graphic */}
        <div className="universe-tournament-grid">
          {/* Round 1 Card */}
          <div className="universe-card universe-tournament-card">
            <div className="tactical-corner tl" />
            <div className="tactical-corner tr" />
            <div className="tactical-corner bl" />
            <div className="tactical-corner br" />

            <div className="tournament-badge round-1">ROUND 1 • ONLINE CHALLENGE</div>
            <h3 className="tournament-title">National Screening &amp; Prototype Audit</h3>
            <p className="tournament-desc">
              Open nationwide to student squads of 2–4 members with 100% free registration.
              Teams submit their solution proposal deck followed by a 3–5 min video prototype and GitHub repository.
              Every submission undergoes rigorous scoring by a panel of industry and faculty judges.
            </p>
            <div className="tournament-perks">
              <span className="universe-meta-pill">Free Registration</span>
              <span className="universe-meta-pill">Open Nationwide</span>
              <span className="universe-meta-pill">2 to 4 Members</span>
              <span className="universe-meta-pill">Inter-College Permitted</span>
            </div>
          </div>

          {/* Central Conduit Indicator */}
          <div className="tournament-filter-hub">
            <div className="filter-line" />
            <div className="filter-badge">
              <span className="filter-pulse" />
              <span className="filter-num">TOP 50 SQUADS</span>
              <span className="filter-sub">Shortlisted Finalists</span>
            </div>
            <div className="filter-line" />
          </div>

          {/* Round 2 Card */}
          <div className="universe-card universe-tournament-card round-2-card">
            <div className="tactical-corner tl" />
            <div className="tactical-corner tr" />
            <div className="tactical-corner bl" />
            <div className="tactical-corner br" />

            <div className="tournament-badge round-2">ROUND 2 • OFFLINE FINALE</div>
            <h3 className="tournament-title">24-Hour Non-Stop Build Sprint</h3>
            <p className="tournament-desc">
              Top 50 finalist squads (~175–200 hackers) assemble on 30–31 January 2027 at DYPIT campus in Pune.
              A nominal confirmation fee (₹899/team) covers complete 24-hour venue access, high-speed Wi-Fi, all meals,
              midnight snacks, rest areas, mentor check-ins, and the official finalist welcome kit.
            </p>
            <div className="tournament-perks">
              <span className="universe-meta-pill" style={{ color: '#3fe08e', borderColor: 'rgba(63,224,142,0.3)' }}>DYPIT Pune Campus</span>
              <span className="universe-meta-pill" style={{ color: '#3fe08e', borderColor: 'rgba(63,224,142,0.3)' }}>24 Hours Non-Stop</span>
              <span className="universe-meta-pill" style={{ color: '#3fe08e', borderColor: 'rgba(63,224,142,0.3)' }}>Full Catering &amp; Kit</span>
            </div>
          </div>
        </div>

        {/* Dossier Key Metrics Bar */}
        <div className="universe-dossier-metrics">
          <div className="dossier-metric">
            <span className="dossier-val">₹2,05,000</span>
            <span className="dossier-lbl">Total Cash Pool</span>
          </div>
          <div className="dossier-divider" aria-hidden="true" />
          <div className="dossier-metric">
            <span className="dossier-val">50 SQUADS</span>
            <span className="dossier-lbl">Campus Finalists</span>
          </div>
          <div className="dossier-divider" aria-hidden="true" />
          <div className="dossier-metric">
            <span className="dossier-val">24 HOURS</span>
            <span className="dossier-lbl">Non-Stop Sprint</span>
          </div>
          <div className="dossier-divider" aria-hidden="true" />
          <div className="dossier-metric">
            <span className="dossier-val">5 + 1</span>
            <span className="dossier-lbl">Bounty Categories</span>
          </div>
        </div>
      </div>
    </section>
  );
}
