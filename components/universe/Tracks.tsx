'use client';

import { useState } from 'react';

const TRACKS = [
  {
    id: 'SECTOR 01',
    name: 'Rogue Protocol',
    tag: 'AI & Agentic Systems',
    bounty: '₹5,000 Bounty',
    image: '/media/doom-throne.webp',
    summary:
      'Architect autonomous AI agents, multi-modal intelligent assistants, automated reasoning pipelines, and cognitive models designed to tackle complex decision-making systems.',
    mission:
      'Engineer self-directing synthetic agents and cognitive intelligence pipelines capable of autonomous real-time decision making under high operational volatility.',
    focusAreas: ['Autonomous AI Agents', 'Multi-Modal Models', 'Process Automation', 'Cognitive Reasoning'],
    techStack: ['PyTorch', 'LangChain', 'LlamaIndex', 'Edge AI', 'Ollama', 'Computer Vision'],
  },
  {
    id: 'SECTOR 02',
    name: 'Firewall Zero',
    tag: 'Cybersecurity & FinTech',
    bounty: '₹5,000 Bounty',
    image: '/media/timeline-1.webp',
    summary:
      'Engineer robust threat detection engines, scam and fraud mitigation shields, privacy-preserving identities, modern payment layers, and resilient financial tooling.',
    mission:
      'Architect impenetrable defensive bastions against modern attack vectors, synthetic identity spoofing, and catastrophic financial exploitation.',
    focusAreas: ['Threat Detection', 'Fraud Mitigation', 'Zero-Knowledge Privacy', 'Modern Payments'],
    techStack: ['Rust', 'Solidity', 'Web3.js', 'Zero-Knowledge Proofs', 'eBPF', 'SIEM Telemetry'],
  },
  {
    id: 'SECTOR 03',
    name: 'Final Hour',
    tag: 'Open Innovation',
    bounty: '₹5,000 Bounty',
    image: '/media/timeline-2.webp',
    summary:
      'Tackle pressing existential and humanitarian frontiers spanning climate resilience, healthcare diagnostics, emergency disaster management, sustainable agriculture, and space tech.',
    mission:
      'Tackle existential human frontiers—from rapid emergency crisis triage and climate catastrophe resilience to deep telemetry for next-generation survival.',
    focusAreas: ['Climate Intelligence', 'Health & MedTech', 'Disaster Response', 'Agri & Space Tech'],
    techStack: ['IoT', 'WebSockets', 'Embedded Telemetry', 'OpenCV', 'FastAPI', 'Flutter'],
  },
  {
    id: 'SECTOR 04',
    name: 'Glass Wall',
    tag: 'GovTech & Transparent Governance',
    bounty: '₹5,000 Bounty',
    image: '/media/timeline-3.webp',
    summary:
      'Create high-accountability public service platforms, transparent civic workflows, citizen grievance redressal mechanisms, and tamper-evident audit trails for open governance.',
    mission:
      'Dismantle opaque bureaucratic barriers with transparent public utility platforms, immutable audit logs, and direct-action citizen grievance resolution.',
    focusAreas: ['Public Services', 'Grievance Redressal', 'Civic Transparency', 'Tamper-Proof Audits'],
    techStack: ['Distributed Ledgers', 'Next.js', 'FastAPI', 'IPFS', 'PostgreSQL', 'GraphQL'],
  },
  {
    id: 'SECTOR 05',
    name: 'Survival City',
    tag: 'Smart Cities & Civic Tech',
    bounty: '₹5,000 Bounty',
    image: '/media/timeline-4.webp',
    summary:
      'Reimagine modern urban infrastructure with smart mobility networks, intelligent traffic routing, water conservation telemetry, waste logistics, and responsive civic utilities.',
    mission:
      'Rebuild collapsing urban ecosystems into hyper-resilient, automated smart cities powered by real-time sensor intelligence and predictive civic logistics.',
    focusAreas: ['Smart Mobility', 'Traffic Intelligence', 'Water Management', 'Civic Telemetry'],
    techStack: ['MQTT', 'Docker', 'Redis', 'Kubernetes', 'GIS Mapping', 'WebRTC'],
  },
];

export default function Tracks() {
  const [activeSector, setActiveSector] = useState(0);
  const current = TRACKS[activeSector];

  return (
    <section id="tracks" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Battleground Domains</div>
          <h2 className="universe-section-title">The 5 Incursion Chambers</h2>
          <p className="universe-section-desc">
            Explore the five operational battlegrounds. Select a sector to inspect its tactical mission dossier,
            suggested technology stacks, and dedicated ₹5,000 Track Bounty.
          </p>
        </div>

        {/* Tactical Chamber Switcher Navigation Tabs */}
        <div className="universe-chamber-tabs">
          {TRACKS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveSector(idx)}
              className={`chamber-tab-btn ${activeSector === idx ? 'active' : ''}`}
            >
              <span className="chamber-tab-id">{t.id}</span>
              <span className="chamber-tab-name">{t.name}</span>
              <span className="chamber-tab-bounty">₹5,000</span>
            </button>
          ))}
        </div>

        {/* Active Cinematic Chamber Spotlight Card */}
        <div className="universe-chamber-spotlight">
          <div className="tactical-corner tl" />
          <div className="tactical-corner tr" />
          <div className="tactical-corner bl" />
          <div className="tactical-corner br" />

          {/* Background Cinematic Art with vignette */}
          <div
            className="spotlight-bg"
            style={{
              backgroundImage: `url(${current.image})`,
            }}
          />
          <div className="spotlight-gradient-overlay" />

          {/* Spotlight Content Overlay */}
          <div className="spotlight-content">
            <div className="spotlight-header">
              <div className="spotlight-meta">
                <span className="universe-tag">{current.tag}</span>
                <span className="spotlight-sector-id">{current.id}</span>
              </div>
              <div className="universe-track-bounty-badge">
                <span className="bounty-spark" aria-hidden="true">✦</span>
                <span>{current.bounty}</span>
              </div>
            </div>

            <h3 className="spotlight-title">{current.name}</h3>
            <p className="spotlight-mission">&ldquo;{current.mission}&rdquo;</p>
            <p className="spotlight-desc">{current.summary}</p>

            <div className="spotlight-columns">
              <div className="spotlight-col">
                <span className="spotlight-label">CORE FOCUS VECTORS</span>
                <div className="universe-focus-tags">
                  {current.focusAreas.map((area) => (
                    <span key={area} className="universe-focus-tag">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="spotlight-col">
                <span className="spotlight-label">RECOMMENDED TECH ARSENAL</span>
                <div className="universe-focus-tags">
                  {current.techStack.map((tech) => (
                    <span key={tech} className="universe-focus-tag spotlight-tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Chamber Mini-Cards Grid for Quick Overview */}
        <div className="universe-chamber-grid">
          {TRACKS.map((track, idx) => (
            <div
              key={track.id}
              onClick={() => setActiveSector(idx)}
              className={`universe-card universe-mini-chamber-card ${activeSector === idx ? 'active' : ''}`}
            >
              <div className="mini-card-thumb" style={{ backgroundImage: `url(${track.image})` }} />
              <div className="mini-card-body">
                <div className="mini-card-top">
                  <span className="mini-card-id">{track.id}</span>
                  <span className="mini-card-bounty">₹5K</span>
                </div>
                <h4 className="mini-card-title">{track.name}</h4>
                <p className="mini-card-tag">{track.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
