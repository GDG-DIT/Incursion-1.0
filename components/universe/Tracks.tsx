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
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
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
    icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
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
    icon: <Radio className="w-6 h-6 text-emerald-400" />,
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
    icon: <Landmark className="w-6 h-6 text-emerald-400" />,
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
    icon: <Network className="w-6 h-6 text-emerald-400" />,
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
    icon: <Award className="w-6 h-6 text-amber-400" />,
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
  const [selectedTrack, setSelectedTrack] = useState<TrackItem | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTrack(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse move spotlight handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="tracks" className="universe-section relative overflow-hidden">
      {/* Background radial gradient & subtle grid */}
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
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Battleground Domains // Latverian Multiverse HUD</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-4 font-serif">
            The 5 Incursion Chambers
          </h2>

          <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6 font-sans">
            Five specialized operational sectors. Each chamber features an independent{' '}
            <span className="text-emerald-400 font-semibold">₹5,000 Track Bounty</span> alongside full eligibility for
            the <span className="text-amber-400 font-semibold">₹1,00,000 Grand Championship</span>.
          </p>

          {/* Broad Tracks Live Notice Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/25 text-xs font-mono text-emerald-300 tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>BROAD TRACKS PUBLISHED NOW // DETAILED PROBLEM STATEMENTS REVEALED AT KICKOFF</span>
          </div>
        </div>

        {/* 3x2 Tactical Bento Grid (6 Cells Symmetrical) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRACKS.map((track) => {
            const isAmber = track.accentColor === 'amber';

            return (
              <div
                key={track.id}
                onMouseMove={handleMouseMove}
                onClick={() => setSelectedTrack(track)}
                className={`group relative rounded-xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isAmber
                    ? 'bg-gradient-to-b from-[#14120a]/90 via-[#0e0d08]/95 to-[#080704]/98 border border-amber-500/30 hover:border-amber-400/80 shadow-[0_10px_30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(245,158,11,0.15)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.25)]'
                    : 'bg-gradient-to-b from-[#0e1612]/90 via-[#0a100d]/95 to-[#060a08]/98 border border-emerald-500/25 hover:border-emerald-400/70 shadow-[0_10px_30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(16,185,129,0.1)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.2)]'
                }`}
                style={{
                  minHeight: '380px',
                }}
              >
                {/* Mouse-tracking radial spotlight */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: isAmber
                      ? 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(245, 158, 11, 0.15), transparent 70%)'
                      : 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(16, 185, 129, 0.14), transparent 70%)',
                  }}
                />

                {/* Tactical Corner Brackets (Expanding on hover) */}
                <div
                  className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-all duration-300 ${
                    isAmber
                      ? 'border-amber-400/60 group-hover:border-amber-300 group-hover:w-4 group-hover:h-4'
                      : 'border-emerald-400/60 group-hover:border-emerald-300 group-hover:w-4 group-hover:h-4'
                  }`}
                />
                <div
                  className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-all duration-300 ${
                    isAmber
                      ? 'border-amber-400/60 group-hover:border-amber-300 group-hover:w-4 group-hover:h-4'
                      : 'border-emerald-400/60 group-hover:border-emerald-300 group-hover:w-4 group-hover:h-4'
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-all duration-300 ${
                    isAmber
                      ? 'border-amber-400/60 group-hover:border-amber-300 group-hover:w-4 group-hover:h-4'
                      : 'border-emerald-400/60 group-hover:border-emerald-300 group-hover:w-4 group-hover:h-4'
                  }`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-all duration-300 ${
                    isAmber
                      ? 'border-amber-400/60 group-hover:border-amber-300 group-hover:w-4 group-hover:h-4'
                      : 'border-emerald-400/60 group-hover:border-emerald-300 group-hover:w-4 group-hover:h-4'
                  }`}
                />

                {/* Giant Background Watermark (01–06) */}
                <div
                  aria-hidden="true"
                  className={`absolute top-2 right-4 text-7xl font-black font-mono select-none pointer-events-none transition-colors duration-300 ${
                    isAmber
                      ? 'text-amber-500/[0.05] group-hover:text-amber-400/[0.12]'
                      : 'text-emerald-500/[0.05] group-hover:text-emerald-400/[0.12]'
                  }`}
                >
                  {track.number}
                </div>

                {/* Card Top: Telemetry Bar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isAmber ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-emerald-400 shadow-[0_0_8px_#10b981]'
                        } animate-pulse`}
                      />
                      <span
                        className={`text-xs font-mono font-bold tracking-widest ${
                          isAmber ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {track.id}
                      </span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider ${
                        isAmber
                          ? 'bg-amber-950/50 border border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                          : 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{track.bounty}</span>
                    </div>
                  </div>

                  {/* Track Identity Block */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                        isAmber
                          ? 'bg-amber-950/60 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                          : 'bg-emerald-950/60 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      }`}
                    >
                      {track.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-xl sm:text-2xl font-bold font-serif italic tracking-wide text-white transition-colors duration-200 ${
                          isAmber ? 'group-hover:text-amber-300' : 'group-hover:text-emerald-300'
                        }`}
                      >
                        {track.name}
                      </h3>
                      <div
                        className={`text-xs font-mono tracking-wider font-semibold uppercase mt-0.5 ${
                          isAmber ? 'text-amber-400/90' : 'text-emerald-400/90'
                        }`}
                      >
                        {track.tag}
                      </div>
                    </div>
                  </div>

                  {/* Tactical Mission Brief */}
                  <div
                    className={`my-3 pl-3 text-sm text-neutral-300 border-l-2 leading-relaxed ${
                      isAmber ? 'border-amber-500/40' : 'border-emerald-500/40'
                    }`}
                  >
                    {track.brief}
                  </div>
                </div>

                {/* Special Card Decryption Terminal Box (Cell 6) */}
                {track.isSpecial && (
                  <div className="my-3 p-3 rounded-lg bg-black/60 border border-amber-500/25 font-mono text-xs">
                    <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>ENCRYPTED PROBLEM STATEMENTS</span>
                    </div>
                    <div className="text-neutral-400 text-[11px] leading-tight space-y-1">
                      <p className="text-amber-300/80">&gt; DECRYPTING: 30 JAN 2027 // 10:30 IST</p>
                      <p>&gt; UNLOCKS LIVE ON CAMPUS AT DYPIT</p>
                      <p className="text-emerald-400/80">&gt; ROOKIE PRIZE: ELIGIBLE FOR ALL 1ST-TIME SQUADS</p>
                    </div>
                  </div>
                )}

                {/* Core Focus Vectors (Upgraded Telemetry Chips) */}
                <div className="mt-2 mb-4">
                  <div className="text-[10px] font-mono tracking-widest text-emerald-400/70 mb-2 uppercase flex items-center gap-1.5">
                    <span>CORE FOCUS VECTORS</span>
                    <span className="flex-1 h-px bg-emerald-500/20" />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {track.focusVectors.map((vector) => (
                      <span
                        key={vector}
                        className={`text-xs px-2.5 py-1 rounded font-sans flex items-center gap-1 transition-colors duration-200 ${
                          isAmber
                            ? 'bg-amber-950/30 border border-amber-500/20 text-neutral-200 group-hover:border-amber-400/50'
                            : 'bg-emerald-950/30 border border-emerald-500/20 text-neutral-200 group-hover:border-emerald-400/50'
                        }`}
                      >
                        <span className={isAmber ? 'text-amber-400' : 'text-emerald-400'}>›</span>
                        <span>{vector}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Locked Dossier Footer Bar */}
                <div
                  className={`pt-3 mt-auto border-t border-dashed flex items-center justify-between text-xs font-mono ${
                    isAmber ? 'border-amber-500/25 text-amber-300/80' : 'border-emerald-500/20 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-emerald-400/80" />
                    <span>DOSSIER LOCKED • REVEAL 30 JAN</span>
                  </div>

                  <div
                    className={`flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform duration-200 ${
                      isAmber ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    <span>BREACH CHAMBER</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
