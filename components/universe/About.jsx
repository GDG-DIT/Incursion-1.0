'use client';

export default function About() {
  return (
    <section id="about" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <img src="/gdg-logo.svg" alt="GDG Logo" style={{ height: '18px', width: 'auto' }} />
            <div className="universe-eyebrow" style={{ margin: 0 }}>The Lore & Mission</div>
          </div>
          <h2 className="universe-section-title">Doomsday Times Run Out</h2>
          <p className="universe-section-desc">
            INCURSION 2027 is a national-level 24-hour student hackathon organized by GDG on Campus,
            Dr. D. Y. Patil Institute of Technology, Pimpri, Pune. Designed around a two-round format—an
            online idea challenge followed by an offline build-and-demo sprint at the DYPIT campus—INCURSION
            summons builders, engineers, and creators to engineer critical solutions before the clock hits zero.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="universe-grid-3">
          <div className="universe-card">
            <div className="universe-card-num">01 // Round 1: Online Idea Challenge</div>
            <h3 className="universe-card-title">National Screening</h3>
            <p className="universe-card-desc">
              Open nationwide to unlimited student teams of 2–4 members with free registration.
              Submit your ideas and proposed technical blueprints on the hackathon platform for structured jury evaluation.
            </p>
          </div>

          <div className="universe-card">
            <div className="universe-card-num">02 // Round 2: 24-Hour Finale</div>
            <h3 className="universe-card-title">Offline Build Sprint</h3>
            <p className="universe-card-desc">
              The top 50 shortlisted teams assemble on 30–31 January 2027 at DYPIT Pune.
              Experience challenge reveals, 24-hour non-stop prototyping with mentor checkpoints, and live jury demos.
            </p>
          </div>

          <div className="universe-card">
            <div className="universe-card-num">03 // The Bounties</div>
            <h3 className="universe-card-title">₹2 Lakh Pool & Beyond</h3>
            <p className="universe-card-desc">
              Compete for ₹2 Lakh in cash awards, grand trophies, official project showcases,
              sponsor and alumni introductions, personalized mentorship, and potential internship discussions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
