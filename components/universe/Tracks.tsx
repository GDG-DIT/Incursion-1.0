'use client';

import {
  Cpu,
  ShieldAlert,
  Radio,
  Landmark,
  Network,
  Sparkles,
} from 'lucide-react';

export interface TrackItem {
  id: string;
  number: string;
  name: string;
  tag: string;
  brief: string;
  focusVectors: string[];
  icon: React.ReactNode;
  accentColor: 'emerald' | 'gold';
}

const TRACKS: TrackItem[] = [
  {
    id: 'SECTOR 01',
    number: '01',
    name: 'ROGUE PROTOCOL',
    tag: 'AI & AGENTIC AI HACKATHON TRACK',
    accentColor: 'emerald',
    brief:
      'Deploy autonomous synthetic AI agents, multi-modal LLM reasoning pipelines, and intelligent cognitive automation engineered for high-volatility decision making.',
    focusVectors: ['AI Agents', 'Agentic AI Systems', 'Multilingual AI', 'Cognitive Automation'],
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'SECTOR 02',
    number: '02',
    name: 'FIREWALL ZERO',
    tag: 'CYBERSECURITY & FINTECH HACKATHON TRACK',
    accentColor: 'emerald',
    brief:
      'Fortify zero-trust financial rails, neutralize real-time threat vectors, mitigate financial fraud, and secure decentralized digital identity at national scale.',
    focusVectors: ['Threat Detection', 'Fraud Mitigation', 'Zero-Knowledge ID', 'Resilient Payments'],
    icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'SECTOR 03',
    number: '03',
    name: 'FINAL HOUR',
    tag: 'OPEN INNOVATION HACKATHON TRACK',
    accentColor: 'emerald',
    brief:
      'Engineer breakthrough survival and resilience systems across climate tech, disaster triage, healthcare devices, and orbital technology frontiers.',
    focusVectors: ['Climate Tech', 'Health & MedTech', 'Disaster Triage', 'Space & Hardware'],
    icon: <Radio className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'SECTOR 04',
    number: '04',
    name: 'GLASS WALL',
    tag: 'GOVTECH & GOVERNANCE HACKATHON TRACK',
    accentColor: 'emerald',
    brief:
      'Build tamper-proof civic infrastructure for radical public transparency, automated citizen grievance redressal, and institutional trust.',
    focusVectors: ['Public Transparency', 'Automated Redressal', 'Immutable Audit', 'Open Civic APIs'],
    icon: <Landmark className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'SECTOR 05',
    number: '05',
    name: 'SURVIVAL CITY',
    tag: 'SMART CITIES & CIVIC TECH HACKATHON TRACK',
    accentColor: 'emerald',
    brief:
      'Optimize urban lifelines—intelligent traffic grids, municipal water telemetry, distributed IoT sensor networks, and emergency civic response.',
    focusVectors: ['Smart Transport', 'Traffic Telemetry', 'Water Grid Sensors', 'Civic Logistics'],
    icon: <Network className="w-6 h-6 text-emerald-400" />,
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="universe-section relative" aria-labelledby="tracks-section-heading">
      <div className="universe-container">
        {/* Section Header */}
        <div className="doom-tracks-header">
          <div className="universe-eyebrow">
            <Sparkles className="inline-block w-3.5 h-3.5 mr-1 text-emerald-400" />
            Battleground Domains // Latverian Incursion Deck
          </div>

          <h2 id="tracks-section-heading" className="universe-section-title">
            The 5 Incursion Chambers // Hackathon Tracks
          </h2>

          <p className="universe-section-desc">
            Five specialized operational battlegrounds engineered for high-impact innovation across agentic artificial intelligence, zero-trust cybersecurity, open frontiers, transparent governance, and smart civic infrastructure.
          </p>
        </div>

        {/* 3x2 Tactical Bento Matrix - Bespoke Green + Gold Doctor Doom Theme */}
        <div className="doom-cards-grid">
          {TRACKS.map((track) => {
            const isGold = track.accentColor === 'gold';

            return (
              <div
                key={track.id}
                className={`doom-card ${isGold ? 'doom-card-gold' : ''}`}
              >
                {/* Tactical Bevel Corners */}
                <span className="doom-corner tc-tl" />
                <span className="doom-corner tc-tr" />
                <span className="doom-corner tc-bl" />
                <span className="doom-corner tc-br" />

                {/* Card Top: Sector ID */}
                <div className="doom-card-top">
                  <div className="doom-sector-badge">
                    <span className="doom-dot" />
                    <span>{track.id}</span>
                  </div>
                </div>

                {/* Card Identity */}
                <div className="doom-card-identity">
                  <div className="doom-card-icon">{track.icon}</div>
                  <div>
                    <h3 className="doom-card-title">{track.name}</h3>
                    <div className="doom-card-tag">{track.tag}</div>
                  </div>
                </div>

                {/* Mission Brief */}
                <p className="doom-card-brief">{track.brief}</p>

                {/* Focus Vector Badges */}
                <div className="doom-vectors-wrap">
                  {track.focusVectors.map((v) => (
                    <span key={v} className="doom-vector-pill">
                      <span className="pill-dot" />
                      <span>{v}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
