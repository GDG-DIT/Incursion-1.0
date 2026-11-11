'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Clock,
  Layers,
  Crosshair,
  Sliders,
  ChevronLeft,
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
  const [viewMode, setViewMode] = useState<'console' | 'matrix'>('console');

  const activeTrack = TRACKS[activeSectorIndex];
  const isAmber = activeTrack.accentColor === 'amber';

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTrack(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="tracks" className="universe-section relative overflow-hidden">
      {/* Background radial gradient & tactical grid */}
      <div className="absolute inset-0 bg-[#050806] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16, 185, 129, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="universe-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <Crosshair className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Latverian War Room // Tactical Incursion Deck</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-4 font-serif">
            The 5 Incursion Chambers
          </h2>

          <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6 font-sans">
            Five operational battlegrounds plus the Omega Vault. Each chamber features an independent{' '}
            <span className="text-emerald-400 font-semibold">₹5,000 Track Bounty</span> alongside eligibility for the{' '}
            <span className="text-amber-400 font-semibold">₹1,00,000 Grand Championship</span>.
          </p>

          {/* Broad Tracks Notice + Mode Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/25 text-xs font-mono text-emerald-300 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BROAD TRACKS ACTIVE • DETAILED CHALLENGES UNVEILED AT KICKOFF</span>
            </div>

            <div className="inline-flex items-center bg-black/60 p-1 rounded-lg border border-emerald-500/25">
              <button
                type="button"
                onClick={() => setViewMode('console')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  viewMode === 'console'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Command Console
              </button>
              <button
                type="button"
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  viewMode === 'matrix'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                6-Sector Grid
              </button>
            </div>
          </div>
        </div>

        {/* VIEW 1: THE TACTICAL COMMAND CONSOLE (INTERACTIVE THEATER) */}
        {viewMode === 'console' && (
          <div className="space-y-6">
            {/* Top Tactical Sector Selector Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {TRACKS.map((t, idx) => {
                const isActive = activeSectorIndex === idx;
                const isItemAmber = t.accentColor === 'amber';

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveSectorIndex(idx)}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-200 overflow-hidden ${
                      isActive
                        ? isItemAmber
                          ? 'bg-gradient-to-b from-amber-950/70 to-black/90 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                          : 'bg-gradient-to-b from-emerald-950/70 to-black/90 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'bg-black/50 border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-950/20'
                    }`}
                  >
                    {/* Active Sector Accent Line */}
                    {isActive && (
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 ${
                          isItemAmber ? 'bg-amber-400' : 'bg-emerald-400'
                        } shadow-[0_0_8px_currentColor]`}
                      />
                    )}

                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={isActive ? (isItemAmber ? 'text-amber-400' : 'text-emerald-400') : 'text-neutral-400'}>
                        {t.id}
                      </span>
                      <span className="text-[10px] text-amber-300 font-bold">₹5K</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">{t.icon}</div>
                      <div className="font-serif italic font-bold text-sm text-white truncate">{t.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Holographic Theater Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-2xl p-6 sm:p-8 border overflow-hidden ${
                  isAmber
                    ? 'bg-gradient-to-b from-[#14120a]/95 via-[#0d0c07]/98 to-[#060503] border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.15)]'
                    : 'bg-gradient-to-b from-[#0e1813]/95 via-[#08100c]/98 to-[#040806] border-emerald-500/35 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.15)]'
                }`}
              >
                {/* Tactical Corner Brackets */}
                <div
                  className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${
                    isAmber ? 'border-amber-400' : 'border-emerald-400'
                  }`}
                />
                <div
                  className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${
                    isAmber ? 'border-amber-400' : 'border-emerald-400'
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${
                    isAmber ? 'border-amber-400' : 'border-emerald-400'
                  }`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${
                    isAmber ? 'border-amber-400' : 'border-emerald-400'
                  }`}
                />

                {/* Giant Background Watermark */}
                <div
                  aria-hidden="true"
                  className={`absolute top-4 right-8 text-9xl font-black font-mono select-none pointer-events-none opacity-[0.04] ${
                    isAmber ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {activeTrack.number}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                  {/* Left Wing: Dossier & Mission Telemetry */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Meta Pills */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest ${
                            isAmber
                              ? 'bg-amber-950/70 border border-amber-500/40 text-amber-300'
                              : 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300'
                          }`}
                        >
                          {activeTrack.id} // {activeTrack.dossierIntel.status}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>{activeTrack.bounty}</span>
                        </span>

                        <span className="text-xs font-mono text-neutral-400 tracking-wider">
                          {activeTrack.dossierIntel.clearance}
                        </span>
                      </div>

                      {/* Title & Domain */}
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif italic text-white tracking-wide mb-2">
                        {activeTrack.name}
                      </h3>
                      <div
                        className={`text-sm font-mono tracking-widest uppercase font-bold mb-5 ${
                          isAmber ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {activeTrack.tag}
                      </div>

                      {/* Mission Brief Quote */}
                      <div
                        className={`p-4 rounded-xl mb-6 border-l-4 ${
                          isAmber
                            ? 'bg-amber-950/20 border-amber-400 text-neutral-200'
                            : 'bg-emerald-950/20 border-emerald-400 text-neutral-200'
                        }`}
                      >
                        <p className="text-sm sm:text-base leading-relaxed italic">&ldquo;{activeTrack.brief}&rdquo;</p>
                      </div>
                    </div>

                    {/* Telemetry Metric Dials */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-dashed border-emerald-500/20 font-mono text-xs">
                      <div className="p-2.5 rounded-lg bg-black/50 border border-emerald-500/15">
                        <span className="text-neutral-400 text-[10px] block uppercase">Sector Bounty</span>
                        <span className="text-amber-400 font-bold text-sm">₹5,000 Cash</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/50 border border-emerald-500/15">
                        <span className="text-neutral-400 text-[10px] block uppercase">Grand Pool</span>
                        <span className="text-emerald-400 font-bold text-sm">₹2.05L Total</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/50 border border-emerald-500/15">
                        <span className="text-neutral-400 text-[10px] block uppercase">Team Size</span>
                        <span className="text-white font-bold text-sm">2 to 4 Squad</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/50 border border-emerald-500/15">
                        <span className="text-neutral-400 text-[10px] block uppercase">Offline Finale</span>
                        <span className="text-emerald-300 font-bold text-sm">30–31 Jan</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Wing: Core Focus Vectors & Terminal */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    {/* Core Focus Vectors */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase mb-3">
                        <Layers className="w-4 h-4" />
                        <span>CORE FOCUS VECTORS</span>
                        <span className="flex-1 h-px bg-emerald-500/20" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeTrack.focusVectors.map((vector) => (
                          <div
                            key={vector}
                            className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs transition-colors ${
                              isAmber
                                ? 'bg-amber-950/20 border-amber-500/25 text-neutral-100'
                                : 'bg-emerald-950/20 border-emerald-500/25 text-neutral-100'
                            }`}
                          >
                            <span className={isAmber ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                              ›
                            </span>
                            <span className="font-sans font-medium">{vector}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Live Decryption Status Terminal Box */}
                    <div className="p-4 rounded-xl bg-black/80 border border-emerald-500/30 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>CHALLENGE DIRECTIVE: LOCKED</span>
                        </div>
                        <span className="text-[10px] text-amber-300 font-bold">256-BIT CIPHER</span>
                      </div>

                      <div className="text-[11px] text-neutral-400 space-y-1">
                        <p>&gt; STATUS: Broad track active. Problem statements drop at kickoff.</p>
                        <p className="text-amber-300/90">&gt; DECRYPTING: 30 Jan 2027 // 10:30 AM IST</p>
                        <p className="text-emerald-400/90">&gt; LOCATION: DYPIT Campus, Pimpri, Pune</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <a
                        href={REGISTER_URL || '#schedule'}
                        target={REGISTER_URL ? '_blank' : undefined}
                        rel={REGISTER_URL ? 'noopener noreferrer' : undefined}
                        className={`w-full sm:flex-1 py-3 px-5 rounded-xl text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                          isAmber
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                            : 'bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        }`}
                      >
                        <span>Breach Sector // Register</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedTrack(activeTrack)}
                        className="w-full sm:w-auto py-3 px-5 rounded-xl bg-black/60 border border-emerald-500/30 text-neutral-200 hover:text-white hover:border-emerald-400 text-xs font-mono tracking-wider transition-colors"
                      >
                        Evaluation Matrix
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* VIEW 2: THE 6-SECTOR GRID MATRIX */}
        {viewMode === 'matrix' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRACKS.map((track) => {
              const isCardAmber = track.accentColor === 'amber';

              return (
                <div
                  key={track.id}
                  onClick={() => setSelectedTrack(track)}
                  className={`group relative rounded-xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                    isCardAmber
                      ? 'bg-gradient-to-b from-[#14120a]/90 via-[#0e0d08]/95 to-[#080704]/98 border border-amber-500/30 hover:border-amber-400/80 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.25)]'
                      : 'bg-gradient-to-b from-[#0e1612]/90 via-[#0a100d]/95 to-[#060a08]/98 border border-emerald-500/25 hover:border-emerald-400/70 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.2)]'
                  }`}
                  style={{ minHeight: '380px' }}
                >
                  {/* Corner Brackets */}
                  <div
                    className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${
                      isCardAmber ? 'border-amber-400/60' : 'border-emerald-400/60'
                    }`}
                  />
                  <div
                    className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${
                      isCardAmber ? 'border-amber-400/60' : 'border-emerald-400/60'
                    }`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${
                      isCardAmber ? 'border-amber-400/60' : 'border-emerald-400/60'
                    }`}
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${
                      isCardAmber ? 'border-amber-400/60' : 'border-emerald-400/60'
                    }`}
                  />

                  {/* Watermark */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-2 right-4 text-7xl font-black font-mono select-none pointer-events-none opacity-[0.05] group-hover:opacity-[0.12] transition-opacity ${
                      isCardAmber ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {track.number}
                  </div>

                  {/* Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isCardAmber ? 'bg-amber-400' : 'bg-emerald-400'
                          } animate-pulse`}
                        />
                        <span
                          className={`text-xs font-mono font-bold tracking-widest ${
                            isCardAmber ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {track.id}
                        </span>
                      </div>

                      <div
                        className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-mono font-bold ${
                          isCardAmber
                            ? 'bg-amber-950/60 border border-amber-500/40 text-amber-300'
                            : 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{track.bounty}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isCardAmber
                            ? 'bg-amber-950/60 border border-amber-500/30'
                            : 'bg-emerald-950/60 border border-emerald-500/30'
                        }`}
                      >
                        {track.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-serif italic text-white tracking-wide">{track.name}</h3>
                        <div
                          className={`text-xs font-mono font-semibold uppercase ${
                            isCardAmber ? 'text-amber-400/90' : 'text-emerald-400/90'
                          }`}
                        >
                          {track.tag}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`my-3 pl-3 text-xs text-neutral-300 border-l-2 leading-relaxed ${
                        isCardAmber ? 'border-amber-500/40' : 'border-emerald-500/40'
                      }`}
                    >
                      {track.brief}
                    </div>
                  </div>

                  {/* Focus Vectors */}
                  <div className="my-3">
                    <div className="text-[10px] font-mono tracking-widest text-emerald-400/70 mb-2 uppercase">
                      CORE FOCUS VECTORS
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {track.focusVectors.map((vector) => (
                        <span
                          key={vector}
                          className="text-xs px-2.5 py-1 rounded bg-black/40 border border-emerald-500/20 text-neutral-200"
                        >
                          <span className={isCardAmber ? 'text-amber-400' : 'text-emerald-400'}>›</span> {vector}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-dashed border-emerald-500/20 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-emerald-400/80" />
                      <span>DOSSIER LOCKED</span>
                    </div>
                    <div
                      className={`flex items-center gap-1 font-semibold ${
                        isCardAmber ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      <span>INSPECT MATRIX</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Classified Sector Modal / Drawer (Framer Motion) */}
      <AnimatePresence>
        {selectedTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrack(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#090f0c] border border-emerald-500/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.2)] p-6 sm:p-8 z-10 overflow-hidden my-auto"
            >
              {/* Tactical Corner Decals */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedTrack(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-neutral-400 hover:text-white hover:border-emerald-400 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-widest">
                  {selectedTrack.id}
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider">
                  {selectedTrack.bounty}
                </span>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider ml-auto pr-8">
                  {selectedTrack.dossierIntel.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-serif italic text-white tracking-wide mb-1">
                {selectedTrack.name}
              </h3>
              <div className="text-xs font-mono tracking-widest uppercase text-emerald-400 font-semibold mb-4">
                {selectedTrack.tag}
              </div>

              {/* Mission Brief Quote */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 mb-6">
                <p className="text-sm text-neutral-200 leading-relaxed italic border-l-2 border-emerald-400 pl-3">
                  &ldquo;{selectedTrack.brief}&rdquo;
                </p>
              </div>

              {/* Evaluation Rubrics & Weights (Judging Framework) */}
              <div className="mb-6">
                <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>NATIONAL EVALUATION MATRIX (100% WEIGHTED)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {JUDGING_CRITERIA.map((criterion) => (
                    <div
                      key={criterion.name}
                      className="p-2.5 rounded-lg bg-black/40 border border-emerald-500/15 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-medium text-neutral-200">{criterion.name}</div>
                        <div className="text-[10px] text-neutral-400">{criterion.desc}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 ml-2">
                        {criterion.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decryption Status Notification */}
              <div className="p-3.5 rounded-xl bg-black/70 border border-amber-500/30 flex items-center gap-3 mb-6 font-mono text-xs text-amber-200">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-amber-300">DETAILED PROBLEM STATEMENT LOCKED</div>
                  <div className="text-[11px] text-neutral-400">
                    Full challenge specifications, testing rubrics, and submission APIs unlock live during the Grand
                    Kickoff on 30 January 2027 at 10:30 AM IST.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={REGISTER_URL || '#schedule'}
                  target={REGISTER_URL ? '_blank' : undefined}
                  rel={REGISTER_URL ? 'noopener noreferrer' : undefined}
                  className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-sm tracking-wide text-center uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
                >
                  <span>Register Squad in This Sector</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedTrack(null)}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-neutral-300 hover:text-white hover:border-emerald-400 text-sm font-mono tracking-wider transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
