'use client';

const CRITERIA = [
  {
    title: 'Technical Implementation',
    weight: '25%',
    desc: 'Code quality, technical complexity, architectural soundness, and clean integration of technologies.',
    icon: '⚡',
  },
  {
    title: 'Innovation & Creativity',
    weight: '20%',
    desc: 'Originality of the concept, novel approach to the problem, and unique differentiator against existing solutions.',
    icon: '💡',
  },
  {
    title: 'Problem Relevance',
    weight: '15%',
    desc: 'Real-world significance, clarity of problem statement, and depth of understanding demonstrated by the team.',
    icon: '🎯',
  },
  {
    title: 'Impact & Feasibility',
    weight: '15%',
    desc: 'Potential for real-world adoption, social or commercial value, and viability of implementation.',
    icon: '🌍',
  },
  {
    title: 'UX & Product Design',
    weight: '10%',
    desc: 'Intuitive user workflows, aesthetic polish, accessibility, responsiveness, and thoughtful interaction design.',
    icon: '✨',
  },
  {
    title: 'Scalability & Resilience',
    weight: '10%',
    desc: 'System throughput, database design, fault tolerance, security readiness, and future roadmap.',
    icon: '🛡️',
  },
  {
    title: 'Pitch & Live Demo',
    weight: '5%',
    desc: 'Clarity of the live presentation, effective demonstration of working software, and response to jury grilling.',
    icon: '🎤',
  },
];

export default function Judging() {
  return (
    <section id="judging" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Evaluation Framework</div>
          <h2 className="universe-section-title">Judging Criteria &amp; Weights</h2>
          <p className="universe-section-desc">
            Projects are evaluated holistically across seven transparent dimensions by a panel of 5–7 senior industry
            leaders, founders, and researchers, supported by 15–30 specialized technical mentors.
          </p>
        </div>

        {/* Criteria Grid */}
        <div className="universe-grid-3">
          {CRITERIA.map((item, idx) => (
            <div key={item.title} className="universe-card universe-judging-card">
              <div className="universe-judging-top">
                <span className="universe-judging-icon" aria-hidden="true">{item.icon}</span>
                <span className="universe-judging-weight">{item.weight}</span>
              </div>
              <h3 className="universe-judging-title">{item.title}</h3>
              <p className="universe-judging-desc">{item.desc}</p>
              <div className="universe-judging-bar">
                <div
                  className="universe-judging-fill"
                  style={{ width: item.weight }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Jury & Mentor Telemetry Strip */}
        <div className="universe-jury-strip">
          <div className="universe-jury-cell">
            <span className="universe-jury-num">5–7</span>
            <span className="universe-jury-lbl">Senior Industry Jury (Founders, Tech Leads &amp; Academia)</span>
          </div>
          <div className="universe-jury-divider" aria-hidden="true" />
          <div className="universe-jury-cell">
            <span className="universe-jury-num">15–30</span>
            <span className="universe-jury-lbl">Domain Mentors (AI/ML, Full Stack, Cloud, DevOps &amp; Cyber)</span>
          </div>
          <div className="universe-jury-divider" aria-hidden="true" />
          <div className="universe-jury-cell">
            <span className="universe-jury-num">100%</span>
            <span className="universe-jury-lbl">Transparent, Milestone-Based Evaluation Matrix</span>
          </div>
        </div>
      </div>
    </section>
  );
}
