'use client';

export default function About() {
  return (
    <section id="about" className="universe-section" aria-labelledby="about-section-heading">
      <div className="universe-container">
        <div className="universe-section-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            <img
              src="/gdg-logo.svg"
              alt="GDG on Campus DYPIT Pune Logo"
              style={{ height: '18px', width: 'auto' }}
            />
            <div className="universe-eyebrow" style={{ margin: 0 }}>Classified Mission Briefing</div>
          </div>
          <h2 id="about-section-heading" className="universe-section-title">
            National Level Hackathon in Pune // INCURSION 2027
          </h2>
          <p className="universe-section-desc">
            INCURSION 2027 is a premier national-level 24-hour student hackathon organized by GDG on Campus,
            Dr. D. Y. Patil Institute of Technology (DYPIT), Pimpri, Pune under the overarching theme &ldquo;Doomsday Times Run Out&rdquo;.
            Structured as an elite two-round gauntlet—free nationwide online registration and idea evaluation, followed by an offline
            24-hour build sprint on 30–31 January 2027 at the DYPIT campus for the top 50 finalist teams (confirmation fee: ₹899 per team)—INCURSION
            summons India&apos;s most cracked developers, AI researchers, and cybersecurity engineers to build battle-ready solutions for a ₹2,00,000 prize pool.
          </p>
        </div>

        {/* Dossier Key Metrics Bar */}
        <div className="universe-dossier-metrics">
          <div className="dossier-metric">
            <span className="dossier-val">₹2,00,000</span>
            <span className="dossier-lbl">Total Cash Pool</span>
          </div>
          <div className="dossier-divider" aria-hidden="true" />
          <div className="dossier-metric">
            <span className="dossier-val">50 SQUADS</span>
            <span className="dossier-lbl">Grand Finalists (DYPIT Pune)</span>
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
