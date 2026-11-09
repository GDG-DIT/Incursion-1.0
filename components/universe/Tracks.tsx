'use client';

const TRACKS = [
  {
    id: 'TRACK 01',
    name: 'Rogue Protocol',
    tag: 'AI & Agentic Systems',
    bounty: '₹5,000 Bounty',
    description:
      'Architect autonomous AI agents, intelligent multilingual assistants, automated reasoning pipelines, and cognitive models designed to tackle complex decision-making systems.',
    focusAreas: ['AI Agents', 'Multilingual Models', 'Process Automation', 'Cognitive Assistants'],
  },
  {
    id: 'TRACK 02',
    name: 'Firewall Zero',
    tag: 'Cybersecurity & FinTech',
    bounty: '₹5,000 Bounty',
    description:
      'Engineer robust threat detection engines, scam and fraud mitigation shields, privacy-preserving identities, modern payment layers, and resilient financial tooling.',
    focusAreas: ['Threat Detection', 'Fraud Mitigation', 'Zero-Knowledge Identity', 'Modern Payments'],
  },
  {
    id: 'TRACK 03',
    name: 'Final Hour',
    tag: 'Open Innovation',
    bounty: '₹5,000 Bounty',
    description:
      'Tackle pressing existential and humanitarian frontiers spanning climate resilience, healthcare diagnostics, emergency disaster management, sustainable agriculture, and space tech.',
    focusAreas: ['Climate Intelligence', 'Health & MedTech', 'Disaster Response', 'Agri & Space Tech'],
  },
  {
    id: 'TRACK 04',
    name: 'Glass Wall',
    tag: 'GovTech & Transparent Governance',
    bounty: '₹5,000 Bounty',
    description:
      'Create high-accountability public service platforms, transparent civic workflows, citizen grievance redressal mechanisms, and tamper-evident audit trails for open governance.',
    focusAreas: ['Public Services', 'Grievance Redressal', 'Civic Transparency', 'Tamper-Proof Audits'],
  },
  {
    id: 'TRACK 05',
    name: 'Survival City',
    tag: 'Smart Cities & Civic Tech',
    bounty: '₹5,000 Bounty',
    description:
      'Reimagine modern urban infrastructure with smart mobility networks, intelligent traffic routing, water conservation telemetry, waste logistics, and responsive civic utilities.',
    focusAreas: ['Smart Mobility', 'Traffic Intelligence', 'Water Management', 'Civic Telemetry'],
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Battleground Domains</div>
          <h2 className="universe-section-title">Choose Your Battleground</h2>
          <p className="universe-section-desc">
            Broad tracks are published now for Round 1 idea submissions. Detailed, specific challenge statements will
            be unveiled at the offline kickoff on 30 January 2027. Each track carries a dedicated ₹5,000 Track Winner bounty.
          </p>
        </div>

        <div className="universe-grid-2">
          {TRACKS.map((track) => (
            <div key={track.id} className="universe-card universe-track-card">
              <div className="tactical-corner tl" />
              <div className="tactical-corner tr" />
              <div className="tactical-corner bl" />
              <div className="tactical-corner br" />

              <div className="universe-track-header">
                <div className="universe-track-left">
                  <span className="universe-tag">{track.tag}</span>
                  <span className="universe-track-id">{track.id}</span>
                </div>
                <div className="universe-track-bounty-badge">
                  <span className="bounty-spark" aria-hidden="true">✦</span>
                  <span>{track.bounty}</span>
                </div>
              </div>

              <h3 className="universe-card-title universe-track-title">{track.name}</h3>
              <p className="universe-card-desc">{track.description}</p>

              <div className="universe-focus-tags">
                {track.focusAreas.map((area) => (
                  <span key={area} className="universe-focus-tag">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
