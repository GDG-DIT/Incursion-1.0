'use client';

const TRACKS = [
  {
    id: 'SECTOR 01',
    code: 'AI-616',
    name: 'Rogue Protocol',
    tag: 'AI & Agentic Systems',
    bounty: '₹5,000 Bounty',
    image: '/media/track-ai.webp',
    mission:
      'Engineer self-directing synthetic agents and cognitive intelligence pipelines capable of autonomous real-time decision making under high operational volatility.',
    summary:
      'Architect autonomous multi-agent swarms, multimodal vision-language systems, automated reasoning engines, and edge inference models capable of solving mission-critical real-world bottlenecks.',
    focusAreas: [
      'Autonomous Agent Swarms',
      'Multimodal Foundation Models',
      'Adaptive Cognitive Reasoning',
      'Edge & Local Intelligence',
    ],
  },
  {
    id: 'SECTOR 02',
    code: 'SEC-404',
    name: 'Firewall Zero',
    tag: 'Cybersecurity & FinTech',
    bounty: '₹5,000 Bounty',
    image: '/media/track-cyber.webp',
    mission:
      'Architect impenetrable defensive bastions against modern attack vectors, synthetic identity spoofing, and catastrophic financial exploitation.',
    summary:
      'Engineer next-generation threat telemetry shields, real-time scam and fraud detection engines, zero-knowledge privacy identities, and resilient, tamper-proof financial payment rails.',
    focusAreas: [
      'Threat & Anomaly Detection',
      'Zero-Knowledge Cryptography',
      'AI Fraud & Scam Mitigation',
      'Resilient Payment Rails',
    ],
  },
  {
    id: 'SECTOR 03',
    code: 'RIFT-001',
    name: 'Final Hour',
    tag: 'Open Innovation',
    bounty: '₹5,000 Bounty',
    image: '/media/track-open.webp',
    mission:
      'Tackle existential human frontiers—from rapid emergency crisis triage and climate catastrophe resilience to deep telemetry for next-generation survival.',
    summary:
      'Build breakthrough solutions across open frontiers—predictive disaster response systems, precision telemetry diagnostics, climate resilience tools, and frontier space/hardware tech.',
    focusAreas: [
      'Disaster & Emergency Telemetry',
      'Precision Health Intelligence',
      'Climate & Eco Restoration',
      'Frontier Space & Hardware',
    ],
  },
  {
    id: 'SECTOR 04',
    code: 'CIVIC-77',
    name: 'Glass Wall',
    tag: 'GovTech & Transparent Governance',
    bounty: '₹5,000 Bounty',
    image: '/media/track-gov.webp',
    mission:
      'Dismantle opaque bureaucratic barriers with transparent public utility platforms, immutable audit logs, and direct-action citizen grievance resolution.',
    summary:
      'Create high-accountability public service platforms, transparent citizen grievance escalation workflows, verifiable algorithmic auditing, and immutable open governance ledgers.',
    focusAreas: [
      'Transparent Public Utilities',
      'Citizen Grievance Automation',
      'Immutable Audit Ledgers',
      'Open Civic Governance',
    ],
  },
  {
    id: 'SECTOR 05',
    code: 'METRO-99',
    name: 'Survival City',
    tag: 'Smart Cities & Civic Tech',
    bounty: '₹5,000 Bounty',
    image: '/media/track-city.webp',
    mission:
      'Rebuild collapsing urban ecosystems into hyper-resilient, automated smart cities powered by real-time sensor intelligence and predictive civic logistics.',
    summary:
      'Reinvent urban living with intelligent dynamic traffic routing, predictive resource and water grid telemetry, automated municipal logistics, and resilient emergency civic infrastructure.',
    focusAreas: [
      'Intelligent Traffic & Transit',
      'Grid & Water Telemetry',
      'Smart Municipal Logistics',
      'Automated Civic Response',
    ],
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
          <p className="universe-section-desc">
            Explore the five operational battlegrounds. Each sector presents a distinct challenge frontier with its
            own dedicated ₹5,000 Track Bounty alongside eligibility for the ₹1,00,000 Grand Championship.
          </p>
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
                  <span className="track-sector-divider">//</span>
                  <span className="track-sector-subcode">{track.code}</span>
                </div>
                <div className="track-card-bounty">
                  <span className="bounty-spark" aria-hidden="true">✦</span>
                  <span>{track.bounty}</span>
                </div>
              </div>

              {/* Cinematic Visual Window */}
              <div className="track-card-visual-window">
                <img
                  src={track.image}
                  alt={`${track.name} - ${track.tag}`}
                  className="track-card-img"
                  loading="lazy"
                />
                <div className="track-card-img-overlay" />
                <div className="track-card-domain-badge">
                  <span>{track.tag}</span>
                </div>
                <div className="track-card-hud-coords" aria-hidden="true">
                  INCURSION // 2027
                </div>
              </div>

              {/* Card Body */}
              <div className="track-card-body">
                <h3 className="track-card-title">{track.name}</h3>
                <p className="track-card-mission">&ldquo;{track.mission}&rdquo;</p>
                <p className="track-card-desc">{track.summary}</p>
              </div>

              {/* Core Focus Vectors */}
              <div className="track-card-vectors">
                <div className="track-vectors-label">
                  <span>CORE FOCUS VECTORS</span>
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
                  <span>24H OFFLINE FINALE</span>
                </div>
                <span className="track-footer-status">CHALLENGE READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
