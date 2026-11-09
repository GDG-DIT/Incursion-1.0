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
            INCURSION 2027 is a national-level 24-hour student hackathon organized by GDG on Campus,
            Dr. D. Y. Patil Institute of Technology, Pimpri, Pune. Engineered as a high-intensity two-round gauntlet—an
            online nationwide idea challenge followed by a 24-hour offline build sprint on campus—INCURSION
            summons builders, engineers, and creators to engineer critical solutions before the clock hits zero.
          </p>
        </div>

        {/* Feature Cards Grid (Two-Round Architecture + Bounty Vault) */}
        <div className="universe-grid-3">
          <div className="universe-card universe-tactical-card">
            <div className="tactical-corner tl" />
            <div className="tactical-corner tr" />
            <div className="tactical-corner bl" />
            <div className="tactical-corner br" />
            <div className="universe-card-num">01 // Round 1: Online Idea Challenge</div>
            <h3 className="universe-card-title">National Screening</h3>
            <p className="universe-card-desc">
              Open nationwide to student squads of 2–4 members with 100% free registration.
              Submit your proposed technical blueprints and architecture on the platform. All submissions undergo
              structured screening and jury evaluation.
            </p>
            <div className="universe-card-meta">
              <span className="universe-meta-pill">Free Entry</span>
              <span className="universe-meta-pill">Inter-College Teams Allowed</span>
            </div>
          </div>

          <div className="universe-card universe-tactical-card">
            <div className="tactical-corner tl" />
            <div className="tactical-corner tr" />
            <div className="tactical-corner bl" />
            <div className="tactical-corner br" />
            <div className="universe-card-num">02 // Round 2: Offline Finale</div>
            <h3 className="universe-card-title">24-Hour Build Sprint</h3>
            <p className="universe-card-desc">
              Top 50 shortlisted teams (~175–200 hackers) assemble on 30–31 January 2027 at the DYPIT campus in Pune.
              A nominal confirmation fee (₹899/team) covers full 24-hour access, meals, snacks, rest areas, mentor reviews,
              and exclusive finalist kits.
            </p>
            <div className="universe-card-meta">
              <span className="universe-meta-pill">DYPIT Pune</span>
              <span className="universe-meta-pill">50 Finalist Squads</span>
            </div>
          </div>

          <div className="universe-card universe-tactical-card">
            <div className="tactical-corner tl" />
            <div className="tactical-corner tr" />
            <div className="tactical-corner bl" />
            <div className="tactical-corner br" />
            <div className="universe-card-num">03 // The Rewards</div>
            <h3 className="universe-card-title">₹2,05,000 Cash Pool & Beyond</h3>
            <p className="universe-card-desc">
              Compete for ₹2.05 Lakh in cash awards, winner trophies, official project showcases across GDG on Campus,
              industry sponsor introductions, one-on-one mentorship sessions, and potential internship opportunities.
            </p>
            <div className="universe-card-meta">
              <span className="universe-meta-pill">₹2,05,000 Cash</span>
              <span className="universe-meta-pill">Grand Trophies</span>
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
