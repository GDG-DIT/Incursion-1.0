'use client';

import { useState, useEffect } from 'react';
import {
  Cpu,
  ShieldAlert,
  Radio,
  Landmark,
  Network,
  Award,
  Lock,
  ChevronRight,
  X,
  Terminal,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Layers,
  Crosshair,
  Sliders,
} from 'lucide-react';
import { REGISTER_URL } from '../../lib/content';

export interface TrackItem {
  id: string;
  number: string;
  name: string;
  tag: string;
  bounty: string;
  isSpecial?: boolean;
  brief: string;
  focusVectors: string[];
  icon: React.ReactNode;
  accentColor: 'emerald' | 'amber';
  dossierIntel: {
    status: string;
    clearance: string;
    protocolLead: string;
    targetArchitecture: string;
  };
}

const TRACKS: TrackItem[] = [
  {
    id: 'SECTOR 01',
    number: '01',
    name: 'ROGUE PROTOCOL',
    tag: 'AI & AGENTIC SYSTEMS',
    bounty: '₹5,000 Bounty',
    accentColor: 'emerald',
    brief:
      'Deploy autonomous synthetic agents and multi-modal cognitive pipelines engineered for high-volatility decision making.',
    focusVectors: ['AI Agents', 'Multilingual Assistants', 'Process Automation', 'Intelligent Assistants'],
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    dossierIntel: {
      status: 'ACTIVE TELEMETRY',
      clearance: 'OMEGA-LEVEL CLEARANCE',
      protocolLead: 'Latverian Cognitive Directorate',
      targetArchitecture: 'Multi-Agent Swarms, Local Inference, Autonomous Tool-Use Engines',
    },
  },
  {
    id: 'SECTOR 02',
    number: '02',
    name: 'FIREWALL ZERO',
    tag: 'CYBERSECURITY & FINTECH',
    bounty: '₹5,000 Bounty',
    accentColor: 'emerald',
    brief:
      'Fortify zero-trust financial rails, neutralize real-time threat vectors, and secure digital identity at national scale.',
    focusVectors: ['Threat Detection', 'Fraud & Scams', 'Privacy & Identity', 'Payments & Financial Inclusion'],
    icon: <ShieldAlert className="w-5 h-5 text-emerald-400" />,
    dossierIntel: {
      status: 'ACTIVE DEFENSE',
      clearance: 'DEFCON 1 PROTOCOL',
      protocolLead: 'Castle Latveria Cyber Shield Matrix',
      targetArchitecture: 'Zero-Knowledge Proofs, Real-Time Fraud Telemetry, Resilient Financial Rails',
    },
  },
  {
    id: 'SECTOR 03',
    number: '03',
    name: 'FINAL HOUR',
    tag: 'OPEN INNOVATION',
    bounty: '₹5,000 Bounty',
    accentColor: 'emerald',
    brief:
      'Engineer breakthrough survival and resilience systems across climate, emergency response, medtech, and orbital tech.',
    focusVectors: ['Climate Tech', 'Health & MedTech', 'Disaster & Safety', 'Agriculture & Space'],
    icon: <Radio className="w-5 h-5 text-emerald-400" />,
    dossierIntel: {
      status: 'PLANETARY SURVEILLANCE',
      clearance: 'MULTIVERSAL RIFT OPS',
      protocolLead: 'Dimensional Triage Division',
      targetArchitecture: 'Predictive Disaster Telemetry, Rapid Crisis Response, Bio-Augmentation Tech',
    },
  },
  {
    id: 'SECTOR 04',
    number: '04',
    name: 'GLASS WALL',
    tag: 'GOVTECH & TRANSPARENT GOVERNANCE',
    bounty: '₹5,000 Bounty',
    accentColor: 'emerald',
    brief:
      'Build tamper-proof civic infrastructure for radical public transparency, automated grievance redressal, and institutional accountability.',
    focusVectors: ['Transparency', 'Public Services', 'Grievance Redressal', 'Accountability'],
    icon: <Landmark className="w-5 h-5 text-emerald-400" />,
    dossierIntel: {
      status: 'CIVIC CITADEL ONLINE',
      clearance: 'PUBLIC AUDIT MANDATE',
      protocolLead: 'Sovereign Transparent Council',
      targetArchitecture: 'Immutable Public Audit Trails, Citizen Redressal Automation, Open Public APIs',
    },
  },
  {
    id: 'SECTOR 05',
    number: '05',
    name: 'SURVIVAL CITY',
    tag: 'SMART CITIES & CIVIC SERVICES',
    bounty: '₹5,000 Bounty',
    accentColor: 'emerald',
    brief:
      'Optimize urban lifelines—intelligent traffic grids, water telemetry, and rapid-response civic infrastructure.',
    focusVectors: ['Smart Transport', 'Traffic Management', 'Water Systems', 'Civic Technology'],
    icon: <Network className="w-5 h-5 text-emerald-400" />,
    dossierIntel: {
      status: 'METROPOLIS GRID SYNCED',
      clearance: 'URBAN LIFELINE DIRECTIVE',
      protocolLead: 'Doomstadt Municipal Telemetry',
      targetArchitecture: 'Autonomous Traffic Dispatch, Distributed Sensor Networks, Water Grid Telemetry',
    },
  },
  {
    id: 'SECTOR 06',
    number: '06',
    name: 'OMEGA VAULT',
    tag: 'ROOKIE BOUNTY & LIVE DROP',
    bounty: '₹5,000 Rookie Bounty',
    isSpecial: true,
    accentColor: 'amber',
    brief:
      'Dedicated recognition tier for first-time national contenders alongside encrypted live mission drops.',
    focusVectors: ['Best First-Time Team', 'Encrypted Challenge Pack', 'Multi-Track Eligibility', 'Campus Keynote Drop'],
    icon: <Award className="w-5 h-5 text-amber-400" />,
    dossierIntel: {
      status: 'CIPHER-LOCKED',
      clearance: 'ALL REGISTERED SQUADS',
      protocolLead: 'GDG on Campus Adjudication Core',
      targetArchitecture: 'Direct First-Time Team Elevation, ₹5,000 Standalone Cash Trophy, Mentorship Pass',
    },
  },
];

const JUDGING_CRITERIA = [
  { name: 'Technical Implementation', weight: '25%', desc: 'Code architecture, technical depth & execution' },
  { name: 'Innovation & Creativity', weight: '20%', desc: 'Novel approach & unique differentiators' },
  { name: 'Problem Relevance', weight: '15%', desc: 'Real-world significance & problem clarity' },
  { name: 'Impact & Feasibility', weight: '15%', desc: 'Scalable adoption & commercial/social viability' },
  { name: 'UX & Product Design', weight: '10%', desc: 'Tactile interaction, polish & accessibility' },
  { name: 'Scalability & Resilience', weight: '10%', desc: 'System throughput, security & error handling' },
  { name: 'Pitch & Live Demo', weight: '5%', desc: 'Clear prototype demo & defense before judges' },
];

export default function Tracks() {
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<TrackItem | null>(null);
  const [viewMode, setViewMode] = useState<'matrix' | 'console'>('matrix');

  const activeTrack = TRACKS[activeSectorIndex];
  const isAmber = activeTrack.accentColor === 'amber';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTrack(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="tracks" className="universe-section relative">
      <div className="universe-container">
        {/* Section Header */}
        <div className="incursion-section-header">
          <div className="universe-eyebrow">
            <Crosshair className="inline-block w-3.5 h-3.5 mr-1 text-emerald-400" />
            Battleground Domains // Tactical Incursion Deck
          </div>

          <h2 className="universe-section-title">The 5 Incursion Chambers</h2>

          <p className="universe-section-desc">
            Five operational battlegrounds plus the Omega Vault. Each chamber features an independent{' '}
            <strong className="text-emerald-400">₹5,000 Track Bounty</strong> alongside eligibility for the{' '}
            <strong className="text-amber-400">₹1,00,000 Grand Championship</strong>.
          </p>

          {/* Broad Tracks Notice + Mode Switcher */}
          <div className="incursion-header-actions">
            <div className="incursion-broad-tag">
              <span className="broad-dot" />
              <span>BROAD TRACKS ACTIVE • DETAILED CHALLENGES UNVEILED AT KICKOFF</span>
            </div>

            <div className="incursion-mode-switch">
              <button
                type="button"
                onClick={() => setViewMode('matrix')}
                className={`incursion-mode-btn ${viewMode === 'matrix' ? 'active' : ''}`}
              >
                6-Sector Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('console')}
                className={`incursion-mode-btn ${viewMode === 'console' ? 'active' : ''}`}
              >
                War Room Console
              </button>
            </div>
          </div>
        </div>

        {/* VIEW 1: 3x2 SYMMETRICAL TACTICAL BENTO MATRIX (DEFAULT) */}
        {viewMode === 'matrix' && (
          <div className="incursion-matrix-grid">
            {TRACKS.map((t) => {
              const itemIsAmber = t.accentColor === 'amber';

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTrack(t)}
                  className={`incursion-chamber-card ${itemIsAmber ? 'card-amber' : ''}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedTrack(t);
                  }}
                >
                  {/* Tactical Corner Brackets */}
                  <div className="tactical-corner tl" />
                  <div className="tactical-corner tr" />
                  <div className="tactical-corner bl" />
                  <div className="tactical-corner br" />

                  {/* Giant Background Watermark */}
                  <div className="chamber-watermark" aria-hidden="true">
                    {t.number}
                  </div>

                  {/* Top Telemetry Bar */}
                  <div className="chamber-top-telemetry">
                    <div className="chamber-sector-id">
                      <span className="sector-status-dot" />
                      <span>{t.id}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-400 text-[10px]">{t.dossierIntel.status}</span>
                    </div>

                    <div className="chamber-bounty-badge">
                      <span>⚡ {t.bounty}</span>
                    </div>
                  </div>

                  {/* Track Identity Block */}
                  <div className="chamber-identity">
                    <div className="chamber-icon-box">{t.icon}</div>
                    <div className="chamber-title-block">
                      <h3 className="chamber-title">{t.name}</h3>
                      <div className="chamber-subtitle">{t.tag}</div>
                    </div>
                  </div>

                  {/* Mission Brief */}
                  <p className="chamber-brief">{t.brief}</p>

                  {/* Core Focus Vectors */}
                  <div className="chamber-vectors-block">
                    <div className="chamber-vectors-label">CORE FOCUS VECTORS //</div>
                    <div className="chamber-vectors-list">
                      {t.focusVectors.map((v) => (
                        <span key={v} className="chamber-vector-chip">
                          <span className="text-emerald-400 font-bold">›</span>
                          <span>{v}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Locked Dossier Footer Bar */}
                  <div className="chamber-footer">
                    <div className="chamber-lock-tag">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>DOSSIER LOCKED • REVEAL 30 JAN</span>
                    </div>

                    <button
                      type="button"
                      className="chamber-breach-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTrack(t);
                      }}
                    >
                      <span>INSPECT DOSSIER</span>
                      <ChevronRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: THE TACTICAL COMMAND CONSOLE (INTERACTIVE THEATER) */}
        {viewMode === 'console' && (
          <div className="incursion-console-wrapper">
            {/* Top Tactical Sector Selector Strip */}
            <div className="console-tabs-strip">
              {TRACKS.map((t, idx) => {
                const isActive = activeSectorIndex === idx;
                const isItemAmber = t.accentColor === 'amber';

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveSectorIndex(idx)}
                    className={`console-tab-btn ${isActive ? 'active' : ''} ${isItemAmber ? 'amber' : ''}`}
                  >
                    {isActive && <div className="console-tab-active-line" />}

                    <div className="console-tab-meta">
                      <span className="console-tab-id">{t.id}</span>
                      <span className="console-tab-bounty">₹5K</span>
                    </div>

                    <div className="console-tab-body">
                      <span className="console-tab-icon">{t.icon}</span>
                      <span className="console-tab-name">{t.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Holographic Theater Display */}
            <div className={`console-theater ${isAmber ? 'theater-amber' : ''}`}>
              <div className="tactical-corner tl" />
              <div className="tactical-corner tr" />
              <div className="tactical-corner bl" />
              <div className="tactical-corner br" />

              <div className="chamber-watermark" aria-hidden="true">
                {activeTrack.number}
              </div>

              {/* Theater Columns */}
              <div className="console-theater-grid">
                {/* Left Wing: Dossier & Mission Telemetry */}
                <div className="console-left-wing">
                  <div>
                    <div className="console-meta-pills">
                      <span className="console-telemetry-badge">
                        <span className="sector-status-dot" />
                        {activeTrack.id} // {activeTrack.dossierIntel.status}
                      </span>
                      <span className="chamber-bounty-badge">⚡ {activeTrack.bounty}</span>
                      <span className="console-clearance-badge">{activeTrack.dossierIntel.clearance}</span>
                    </div>

                    <h3 className="console-track-title">{activeTrack.name}</h3>
                    <div className="console-track-subtitle">{activeTrack.tag}</div>

                    <p className="console-track-brief">{activeTrack.brief}</p>

                    <div className="console-stats-grid">
                      <div className="console-stat-box">
                        <span className="console-stat-label">Sector Bounty</span>
                        <span className="console-stat-value text-emerald-400">₹5,000 Cash</span>
                      </div>
                      <div className="console-stat-box">
                        <span className="console-stat-label">Grand Pool</span>
                        <span className="console-stat-value text-amber-400">₹2.05L Total</span>
                      </div>
                      <div className="console-stat-box">
                        <span className="console-stat-label">Team Size</span>
                        <span className="console-stat-value">2 to 4 Squad</span>
                      </div>
                      <div className="console-stat-box">
                        <span className="console-stat-label">Offline Finale</span>
                        <span className="console-stat-value">30–31 Jan</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Focus Vectors */}
                  <div className="console-focus-section">
                    <div className="chamber-vectors-label">CORE FOCUS VECTORS //</div>
                    <div className="chamber-vectors-list">
                      {activeTrack.focusVectors.map((v) => (
                        <span key={v} className="chamber-vector-chip">
                          <span className="text-emerald-400 font-bold">›</span>
                          <span>{v}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Wing: Encrypted Problem Statement Terminal */}
                <div className="console-right-wing">
                  <div className="console-terminal-box">
                    <div className="console-terminal-header">
                      <div className="terminal-dots">
                        <span className="dot dot-red" />
                        <span className="dot dot-amber" />
                        <span className="dot dot-green" />
                      </div>
                      <span className="terminal-title">CIPHER-LOCKED PROBLEM STATEMENT</span>
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    </div>

                    <div className="console-terminal-body">
                      <div className="terminal-line text-emerald-400 font-bold">
                        {'>'} CHALLENGE DIRECTIVE: LOCKED
                      </div>
                      <div className="terminal-line text-neutral-400">
                        {'>'} Target Architecture: {activeTrack.dossierIntel.targetArchitecture}
                      </div>
                      <div className="terminal-line text-neutral-400">
                        {'>'} Protocol Lead: {activeTrack.dossierIntel.protocolLead}
                      </div>
                      <div className="terminal-line text-amber-400">
                        {'>'} 256-BIT CIPHER: ACTIVE
                      </div>
                      <div className="terminal-line text-neutral-300">
                        {'>'} STATUS: Broad track active. Detailed problem statements drop at kickoff.
                      </div>
                      <div className="terminal-line text-emerald-300 font-bold">
                        {'>'} DECRYPTING: 30 Jan 2027 // 10:30 AM IST
                      </div>
                      <div className="terminal-line text-neutral-400">
                        {'>'} LOCATION: DYPIT Campus, Pimpri, Pune
                      </div>
                    </div>

                    <div className="console-terminal-footer">
                      <button
                        type="button"
                        onClick={() => setSelectedTrack(activeTrack)}
                        className="console-inspect-btn"
                      >
                        <span>Breach Sector // Inspect Dossier</span>
                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTrack(activeTrack)}
                        className="console-eval-btn"
                      >
                        Evaluation Matrix
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE CLASSIFIED DOSSIER MODAL */}
        {selectedTrack && (
          <div className="dossier-modal-backdrop" onClick={() => setSelectedTrack(null)}>
            <div
              className={`dossier-modal-window ${selectedTrack.accentColor === 'amber' ? 'modal-amber' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="tactical-corner tl" />
              <div className="tactical-corner tr" />
              <div className="tactical-corner bl" />
              <div className="tactical-corner br" />

              {/* Modal Top Bar */}
              <div className="dossier-modal-top">
                <div className="dossier-modal-meta">
                  <span className="sector-status-dot" />
                  <span className="font-mono text-emerald-400 font-bold">{selectedTrack.id}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="chamber-bounty-badge">⚡ {selectedTrack.bounty}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="font-mono text-xs text-neutral-400">{selectedTrack.dossierIntel.clearance}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTrack(null)}
                  className="dossier-close-btn"
                  aria-label="Close dossier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Header */}
              <div className="dossier-modal-header">
                <div className="dossier-modal-icon">{selectedTrack.icon}</div>
                <div>
                  <h3 className="dossier-modal-title">{selectedTrack.name}</h3>
                  <div className="dossier-modal-subtitle">{selectedTrack.tag}</div>
                </div>
              </div>

              {/* Mission Brief */}
              <p className="dossier-modal-brief">{selectedTrack.brief}</p>

              {/* Dossier Intel Specifications */}
              <div className="dossier-specs-grid">
                <div className="dossier-spec-card">
                  <div className="spec-label">PROTOCOL DIRECTIVE</div>
                  <div className="spec-value text-emerald-300">{selectedTrack.dossierIntel.protocolLead}</div>
                </div>
                <div className="dossier-spec-card">
                  <div className="spec-label">TARGET ARCHITECTURE</div>
                  <div className="spec-value text-neutral-200">{selectedTrack.dossierIntel.targetArchitecture}</div>
                </div>
              </div>

              {/* Core Focus Vectors */}
              <div className="dossier-modal-vectors">
                <div className="chamber-vectors-label">CORE FOCUS VECTORS //</div>
                <div className="chamber-vectors-list">
                  {selectedTrack.focusVectors.map((v) => (
                    <span key={v} className="chamber-vector-chip">
                      <span className="text-emerald-400 font-bold">›</span>
                      <span>{v}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* 100% Evaluation & Scoring Framework */}
              <div className="dossier-eval-framework">
                <div className="eval-framework-title">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>EVALUATION RUBRIC & SCORING WEIGHTS (100% TOTAL)</span>
                </div>

                <div className="eval-rubric-list">
                  {JUDGING_CRITERIA.map((crit) => (
                    <div key={crit.name} className="eval-rubric-row">
                      <div className="eval-rubric-info">
                        <span className="eval-rubric-name">{crit.name}</span>
                        <span className="eval-rubric-desc">{crit.desc}</span>
                      </div>
                      <span className="eval-rubric-weight">{crit.weight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTAs */}
              <div className="dossier-modal-footer">
                <a
                  href={REGISTER_URL || '#schedule'}
                  target={REGISTER_URL ? '_blank' : undefined}
                  rel={REGISTER_URL ? 'noopener noreferrer' : undefined}
                  className="universe-btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Register Squad in {selectedTrack.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedTrack(null)}
                  className="universe-btn-secondary"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
