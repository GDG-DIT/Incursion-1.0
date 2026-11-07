'use client';

const TRACKS = [
  {
    id: 'TRACK 01',
    name: 'Rogue Protocol',
    tag: 'AI & Agentic Systems',
    description:
      'Architect autonomous AI agents, intelligent multilingual assistants, process automation pipelines, and cognitive models designed to tackle complex decision-making systems.',
    focusAreas: ['AI Agents', 'Multilingual Assistants', 'Automation', 'Intelligent Assistants'],
  },
  {
    id: 'TRACK 02',
    name: 'Firewall Zero',
    tag: 'Cybersecurity & FinTech',
    description:
      'Engineer robust threat detection engines, scam and fraud mitigation shields, privacy-preserving identities, modern payment layers, and inclusive financial tooling.',
    focusAreas: ['Threat Detection', 'Fraud & Scams', 'Privacy & Identity', 'Payments', 'Financial Inclusion'],
  },
  {
    id: 'TRACK 03',
    name: 'Final Hour',
    tag: 'Open Innovation',
    description:
      'Tackle pressing existential and humanitarian frontiers spanning climate resilience, healthcare, emergency response, disaster management, agriculture, and space exploration.',
    focusAreas: ['Climate Intelligence', 'Health & MedTech', 'Disaster & Safety', 'Agriculture & Space'],
  },
  {
    id: 'TRACK 04',
    name: 'Glass Wall',
    tag: 'GovTech & Transparent Governance',
    description:
      'Create high-accountability public service platforms, transparent civic workflows, citizen grievance redressal mechanisms, and integrity audits for open governance.',
    focusAreas: ['Transparency', 'Public Services', 'Grievances Redressal', 'Accountability'],
  },
  {
    id: 'TRACK 05',
    name: 'Survival City',
    tag: 'Smart Cities & Civic Services',
    description:
      'Reimagine modern urban infrastructure with smart mobility networks, traffic intelligence, water conservation solutions, and responsive civic utilities.',
    focusAreas: ['Transport & Mobility', 'Traffic Intelligence', 'Water Management', 'Civic Technology'],
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Domains & Tracks</div>
          <h2 className="universe-section-title">Choose Your Battleground</h2>
          <p className="universe-section-desc">
            Broad tracks are published now. Detailed problem statements will be revealed at kickoff on
            30 January 2027. Each track carries a dedicated ₹5,000 Best Track Winner award.
          </p>
        </div>

        <div className="universe-grid-2">
          {TRACKS.map((track) => (
            <div key={track.id} className="universe-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="universe-tag">{track.tag}</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--mute)', fontSize: '13px' }}>
                  {track.id}
                </span>
              </div>
              <h3 className="universe-card-title">{track.name}</h3>
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
