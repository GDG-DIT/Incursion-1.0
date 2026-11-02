'use client';

export default function About() {
  return (
    <section id="about" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">The Lore & Mission</div>
          <h2 className="universe-section-title">When Timelines Collide</h2>
          <p className="universe-section-desc">
            Incursion is GDG on Campus’s flagship 24-hour national hackathon. Inspired by the
            multiversal event where parallel dimensions threaten to destroy one another, we summon
            the brightest developers, designers, and innovators to solve critical real-world
            challenges before time runs out.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="universe-grid-3">
          <div className="universe-card">
            <div className="universe-card-num">01 // The Signal</div>
            <h3 className="universe-card-title">The Multiverse Threat</h3>
            <p className="universe-card-desc">
              Parallel realities are bleeding into our realm. From synthetic intelligence to
              quantum cryptography, our digital defenses must withstand cosmic interference.
            </p>
          </div>

          <div className="universe-card">
            <div className="universe-card-num">02 // The Build</div>
            <h3 className="universe-card-title">24-Hour Crucible</h3>
            <p className="universe-card-desc">
              Teams of 2-4 builders assemble on-site to prototype, iterate, and deploy production-grade
              defenses under continuous mentor guidance and industry workshops.
            </p>
          </div>

          <div className="universe-card">
            <div className="universe-card-num">03 // The Legacy</div>
            <h3 className="universe-card-title">Real-World Impact</h3>
            <p className="universe-card-desc">
              Top solutions receive grants, mentorship from Google Developer Experts, direct interview
              pipelines, and incubation opportunities to turn hackathon projects into startups.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
