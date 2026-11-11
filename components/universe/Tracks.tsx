'use client';

import {
  Cpu,
  ShieldAlert,
  Radio,
  Landmark,
  Network,
  Award,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Zap,
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
  accentColor: 'emerald' | 'gold';
}

const TRACKS: TrackItem[] = [
  {
    id: 'SECTOR 01',
    number: '01',
    name: 'ROGUE PROTOCOL',
    tag: 'AI & AGENTIC SYSTEMS',
    bounty: '₹5,000 BOUNTY',
    accentColor: 'emerald',
    brief:
      'Deploy autonomous synthetic agents and multi-modal cognitive pipelines engineered for high-volatility decision making.',
    focusVectors: ['AI Agents', 'Multilingual AI', 'Process Automation', 'Cognitive Reasoning'],
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'SECTOR 02',
    number: '02',
    name: 'FIREWALL ZERO',
    tag: 'CYBERSECURITY & FINTECH',
    bounty: '₹5,000 BOUNTY',
    accentColor: 'emerald',
    brief:
      'Fortify zero-trust financial rails, neutralize real-time threat vectors, and secure digital identity at national scale.',
    focusVectors: ['Threat Detection', 'Fraud Mitigation', 'Zero-Knowledge ID', 'Resilient Payments'],
    icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'SECTOR 03',
    number: '03',
    name: 'FINAL HOUR',
    tag: 'OPEN INNOVATION',
    bounty: '₹5,000 BOUNTY',
    accentColor: 'emerald',
    brief:
      'Engineer breakthrough survival and resilience systems across climate, emergency response, medtech, and orbital tech.',
    focusVectors: ['Climate Tech', 'Health & MedTech', 'Disaster Triage', 'Space & Hardware'],
    icon: <Radio className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'SECTOR 04',
    number: '04',
    name: 'GLASS WALL',
    tag: 'GOVTECH & GOVERNANCE',
    bounty: '₹5,000 BOUNTY',
    accentColor: 'emerald',
    brief:
      'Build tamper-proof civic infrastructure for radical public transparency, automated grievance redressal, and institutional trust.',
    focusVectors: ['Public Transparency', 'Automated Redressal', 'Immutable Audit', 'Open Civic APIs'],
    icon: <Landmark className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'SECTOR 05',
    number: '05',
    name: 'SURVIVAL CITY',
    tag: 'SMART CITIES & CIVIC TECH',
    bounty: '₹5,000 BOUNTY',
    accentColor: 'emerald',
    brief:
      'Optimize urban lifelines—intelligent traffic grids, water telemetry, distributed sensor networks, and emergency civic response.',
    focusVectors: ['Smart Transport', 'Traffic Telemetry', 'Water Grid Sensors', 'Civic Logistics'],
    icon: <Network className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'SECTOR 06',
    number: '06',
    name: 'OMEGA PROTOCOL',
    tag: 'ROOKIE & SPECIAL VAULT',
    bounty: '₹5,000 ROOKIE BOUNTY',
    isSpecial: true,
    accentColor: 'gold',
    brief:
      'Exclusive recognition tier for first-time national hackathon squads competing across all problem domains.',
    focusVectors: ['Best First-Time Squad', 'Multi-Track Eligibility', 'Keynote Showcase', 'Direct Mentorship'],
    icon: <Award className="w-6 h-6 text-amber-300" />,
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="universe-section relative">
      <div className="universe-container">
        {/* Section Header */}
        <div className="doom-tracks-header">
          <div className="universe-eyebrow">
            <Sparkles className="inline-block w-3.5 h-3.5 mr-1 text-emerald-400" />
            Battleground Domains // Latverian Incursion Deck
          </div>

          <h2 className="universe-section-title">The 5 Incursion Chambers</h2>

          <p className="universe-section-desc">
            Five operational battlegrounds plus the Omega Rookie Vault. Each chamber features an independent{' '}
            <span className="text-gold-highlight">₹5,000 Track Bounty</span> alongside eligibility for the{' '}
            <span className="text-gold-highlight">₹1,00,000 Grand Championship</span>.
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

                {/* Ambient Aura Background */}
                <div className="doom-card-glow" />

                {/* Card Top: Sector ID + Metallic Bounty */}
                <div className="doom-card-top">
                  <div className="doom-sector-badge">
                    <span className="doom-dot" />
                    <span>{track.id}</span>
                  </div>

                  <div className="doom-bounty-badge">
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>{track.bounty}</span>
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

                {/* Card Action Link */}
                <div className="doom-card-footer">
                  <a
                    href={REGISTER_URL || '#schedule'}
                    target={REGISTER_URL ? '_blank' : undefined}
                    rel={REGISTER_URL ? 'noopener noreferrer' : undefined}
                    className="doom-register-cta"
                  >
                    <span>Register Squad in {track.name}</span>
                    <ArrowUpRight className="w-4 h-4 ml-1 inline transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
