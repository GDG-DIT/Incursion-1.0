'use client';

const TRACKS = [
  {
    id: 'T1',
    name: 'Quantum AI & Neural Defense',
    tag: 'Artificial Intelligence',
    description:
      'Build generative agents, autonomous triage pipelines, multimodal perception models, or anomaly detectors that anticipate multiversal fractures.',
    examples: ['Autonomous Threat Agents', 'Multimodal LLM Diagnostics', 'Neural Synthetics'],
  },
  {
    id: 'T2',
    name: 'Decentralized Realities & Web3',
    tag: 'Blockchain & Security',
    description:
      'Engineer trustless protocols, zero-knowledge temporal verification, smart contracts, and decentralized data storage resilient to censorship and corruption.',
    examples: ['ZK Identity Bridges', 'Multichain State Syncer', 'Resilient DAOs'],
  },
  {
    id: 'T3',
    name: 'Cloud Resilience & Edge Scale',
    tag: 'Cloud & Infrastructure',
    description:
      'Architect hyper-scale distributed backends, real-time crisis response webs, serverless edge compute, and high-concurrency event telemetry.',
    examples: ['Edge Compute Mesh', 'Zero-Downtime Failover', 'Real-time Telemetry'],
  },
  {
    id: 'T4',
    name: 'The Open Dimension',
    tag: 'Open Innovation',
    description:
      'Unleash unconventional solutions across healthcare, accessibility, education, and sustainability. Break existing molds to save our shared future.',
    examples: ['Assistive Tech', 'Climate Intelligence', 'Accessible Education'],
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Battlegrounds</div>
          <h2 className="universe-section-title">Choose Your Realm</h2>
          <p className="universe-section-desc">
            Select the track where your team will stage its intervention. Each track features
            specialized sponsor challenges and tailored prize pools.
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
                {track.examples.map((ex) => (
                  <span key={ex} className="universe-focus-tag">
                    {ex}
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
