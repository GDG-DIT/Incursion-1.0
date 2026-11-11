'use client';

import { useState } from 'react';
import { TIMELINE } from '../../lib/content';
import {
  Trophy,
  Sparkles,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Star,
  CheckCircle,
} from 'lucide-react';
import { REGISTER_URL } from '../../lib/content';

const MILESTONE_IMAGES = [
  '/media/doom-closeup.webp',
  '/media/timeline-1.webp',
  '/media/timeline-2.webp',
  '/media/timeline-3.webp',
  '/media/timeline-4.webp',
  '/media/doom-closeup4.webp',
  '/media/doom-throne.webp',
];

const DAY_1_SCHEDULE = [
  { time: '08:00', title: 'Registration & Check-In', desc: 'Badge pickup, kit distribution, and security clearance.' },
  { time: '09:00', title: 'Location Distribution', desc: 'Teams settle into designated hacking bays.' },
  { time: '10:00', title: 'Opening Ceremony', desc: 'Welcome address by GDG on Campus leadership.' },
  { time: '10:30', title: 'Challenge Reveal', desc: 'Detailed problem statements officially unveiled.' },
  { time: '11:00', title: 'Hackathon Begins', desc: '24-hour non-stop build clock starts.' },
  { time: '13:00', title: 'Lunch', desc: 'High-energy lunch served on-site for all squads.' },
  { time: '16:00', title: 'Mentor Checkpoint', desc: 'First round of technical mentor reviews.' },
  { time: '19:30', title: 'Dinner', desc: 'Dinner served on campus to fuel the overnight build.' },
  { time: '22:00', title: 'Progress Checkpoint', desc: 'Mid-hack architecture validation.' },
  { time: '00:00', title: 'Midnight Community Activity', desc: 'Interactive games and midnight recharge snacks.' },
];

const DAY_2_SCHEDULE = [
  { time: '01:00', title: 'Late-Night Mentor Round', desc: 'One-on-one debugging, cloud deployments & pitch prep.' },
  { time: '04:00', title: 'Wellness & Rest Checkpoint', desc: 'Designated quiet rest areas & recovery zones.' },
  { time: '07:00', title: 'Breakfast', desc: 'Morning coffee & breakfast served.' },
  { time: '09:00', title: 'Final Development Sprint', desc: 'Code freeze preparations and pitch deck polish.' },
  { time: '10:30', title: 'Submission Closes (Hard Stop)', desc: '24-hour timer reaches zero. Submissions lock.' },
  { time: '10:30–11:30', title: 'Demos & Preliminary Judging', desc: 'All 50 teams present live working prototypes.' },
  { time: '12:00', title: 'Top Finalists Announced', desc: 'Top squads selected for mainstage presentations.' },
  { time: '12:30', title: 'Mainstage Presentations', desc: 'Finalist pitches before the grand industry jury.' },
  { time: '14:00', title: 'Jury Deliberation', desc: 'Closed-door evaluation & scoring calculation.' },
  { time: '15:00', title: 'Awards & Closing Ceremony', desc: 'Prize distribution & felicitation of champions.' },
  { time: '16:00', title: 'Event Close', desc: 'Official conclusion of INCURSION 2027.' },
];

// Coordinates on the 1200x480 horizontal candy curve
const STAGE_COORDS = [
  { x: 140, y: 380, labelPos: 'top' },    // Level 01: Registrations Window
  { x: 420, y: 400, labelPos: 'top' },    // Level 02: PPT Submission Round
  { x: 700, y: 375, labelPos: 'top' },    // Level 03: PPT Evaluation
  { x: 970, y: 340, labelPos: 'left' },   // Level 04: Video Prototype Submission
  { x: 750, y: 140, labelPos: 'bottom' }, // Level 05: Prototype Evaluation
  { x: 470, y: 120, labelPos: 'bottom' }, // Level 06: Result Announcement
  { x: 180, y: 140, labelPos: 'right' },  // Level 07: Grand Finale @ DYPIT Pune
];

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<'candy-map' | 'finale'>('candy-map');
  const [finaleDay, setFinaleDay] = useState<1 | 2>(1);
  const [activeLevel, setActiveLevel] = useState<number>(0);

  const activeMilestone = TIMELINE[activeLevel] || TIMELINE[0];
  const activeImg = MILESTONE_IMAGES[activeLevel] || MILESTONE_IMAGES[0];

  const prevLevel = () => {
    setActiveLevel((prev) => (prev > 0 ? prev - 1 : TIMELINE.length - 1));
  };

  const nextLevel = () => {
    setActiveLevel((prev) => (prev < TIMELINE.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="schedule" className="universe-section relative">
      <div className="universe-container">
        {/* Section Header */}
        <div className="universe-section-header">
          <div className="universe-eyebrow">
            <Sparkles className="inline-block w-3.5 h-3.5 mr-1 text-emerald-400" />
            Milestones Roadmap // Latverian Expedition
          </div>
          <h2 className="universe-section-title">The Convergence Roadmap</h2>
          <p className="universe-section-desc">
            Navigate the 7 expedition levels from nationwide registration to the 24-hour showdown at DYPIT Pune.
          </p>

          {/* Mode Switcher */}
          <div className="universe-tab-switch">
            <button
              type="button"
              onClick={() => setActiveTab('candy-map')}
              className={`universe-tab-btn ${activeTab === 'candy-map' ? 'active' : ''}`}
            >
              Curved Expedition Map
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('finale')}
              className={`universe-tab-btn ${activeTab === 'finale' ? 'active' : ''}`}
            >
              24-Hour Finale Agenda
            </button>
          </div>
        </div>

        {activeTab === 'candy-map' ? (
          <div className="candy-map-wrapper">
            {/* The Horizontal Candy-Crush Curved Board */}
            <div className="candy-board-container">
              {/* SVG Candy Conduit Road */}
              <svg
                viewBox="0 0 1200 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                className="candy-board-svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="candyRoadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#064e3b" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#047857" stopOpacity="1" />
                    <stop offset="100%" stopColor="#78590c" stopOpacity="0.9" />
                  </linearGradient>

                  <linearGradient id="candyLaserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ff88" />
                    <stop offset="50%" stopColor="#3fe08e" />
                    <stop offset="100%" stopColor="#ffd700" />
                  </linearGradient>

                  <filter id="candyGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Wide Glowing Aura Road */}
                <path
                  d="M 140 380 
                     C 250 395, 330 405, 420 400 
                     C 510 395, 610 375, 700 375 
                     C 790 370, 890 345, 970 340 
                     C 1140 330, 1140 150, 960 145 
                     C 890 140, 830 140, 750 140 
                     C 670 135, 560 125, 470 120 
                     C 370 115, 270 130, 180 140"
                  stroke="rgba(63, 224, 142, 0.16)"
                  strokeWidth="36"
                  strokeLinecap="round"
                />

                {/* Main Candy Crush Style Striped Conduit Road */}
                <path
                  d="M 140 380 
                     C 250 395, 330 405, 420 400 
                     C 510 395, 610 375, 700 375 
                     C 790 370, 890 345, 970 340 
                     C 1140 330, 1140 150, 960 145 
                     C 890 140, 830 140, 750 140 
                     C 670 135, 560 125, 470 120 
                     C 370 115, 270 130, 180 140"
                  stroke="url(#candyRoadGrad)"
                  strokeWidth="18"
                  strokeLinecap="round"
                />

                {/* Dashed High-Tech Candy-Cane Rail */}
                <path
                  d="M 140 380 
                     C 250 395, 330 405, 420 400 
                     C 510 395, 610 375, 700 375 
                     C 790 370, 890 345, 970 340 
                     C 1140 330, 1140 150, 960 145 
                     C 890 140, 830 140, 750 140 
                     C 670 135, 560 125, 470 120 
                     C 370 115, 270 130, 180 140"
                  stroke="rgba(255, 215, 0, 0.65)"
                  strokeWidth="4"
                  strokeDasharray="10 14"
                  strokeLinecap="round"
                />

                {/* Animated Flowing Laser Pulse */}
                <path
                  d="M 140 380 
                     C 250 395, 330 405, 420 400 
                     C 510 395, 610 375, 700 375 
                     C 790 370, 890 345, 970 340 
                     C 1140 330, 1140 150, 960 145 
                     C 890 140, 830 140, 750 140 
                     C 670 135, 560 125, 470 120 
                     C 370 115, 270 130, 180 140"
                  stroke="url(#candyLaserGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="candy-laser-flow"
                />
              </svg>

              {/* 3D Candy Crush Level Checkpoint Buttons */}
              <div className="candy-buttons-layer">
                {TIMELINE.map((item, idx) => {
                  const coord = STAGE_COORDS[idx];
                  const isSelected = activeLevel === idx;
                  const isGrandFinale = idx === 6;
                  const isLevelOne = idx === 0;

                  const leftPct = (coord.x / 1200) * 100;
                  const topPct = (coord.y / 480) * 100;

                  return (
                    <div
                      key={item.t}
                      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                      className={`candy-level-point ${isSelected ? 'is-selected' : ''} ${
                        isGrandFinale ? 'is-finale' : ''
                      } ${isLevelOne ? 'is-level-one' : ''}`}
                    >
                      {/* Active Beacon Pulse on Level 01 */}
                      {isLevelOne && <span className="candy-beacon-aura" />}

                      {/* 3D Circular Candy Crush Button */}
                      <button
                        type="button"
                        onClick={() => setActiveLevel(idx)}
                        className={`candy-3d-button ${isGrandFinale ? 'btn-gold' : 'btn-emerald'}`}
                        aria-label={`Select level 0${idx + 1}: ${item.t}`}
                      >
                        <span className="candy-btn-bevel" />
                        <span className="candy-btn-face">
                          {isGrandFinale ? (
                            <Trophy className="w-6 h-6 text-amber-200" />
                          ) : (
                            <span className="candy-level-num">0{idx + 1}</span>
                          )}
                        </span>
                      </button>

                      {/* Candy Crush 3 Stars Underneath */}
                      <div className="candy-stars-row">
                        <Star className={`candy-star ${isSelected ? 'star-lit' : ''}`} />
                        <Star className={`candy-star star-center ${isSelected ? 'star-lit' : ''}`} />
                        <Star className={`candy-star ${isSelected ? 'star-lit' : ''}`} />
                      </div>

                      {/* Milestone Short Tag */}
                      <div className={`candy-node-label label-${coord.labelPos}`}>
                        <span className="node-label-title">{item.t}</span>
                        <span className="node-label-date">{item.d.split('–')[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Level Inspection Card & Controls */}
            <div className="candy-inspection-wrap">
              <div className="candy-nav-controls">
                <button
                  type="button"
                  onClick={prevLevel}
                  className="candy-nav-arrow"
                  aria-label="Previous Milestone"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  <span>Prev Stage</span>
                </button>

                {/* Level Stepper Dots */}
                <div className="candy-dots">
                  {TIMELINE.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveLevel(i)}
                      className={`candy-dot ${activeLevel === i ? 'active' : ''}`}
                      aria-label={`Go to stage 0${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextLevel}
                  className="candy-nav-arrow"
                  aria-label="Next Milestone"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>

              {/* Active Milestone Card (Green + Gold Doom Theme) */}
              <div className={`candy-milestone-card ${activeLevel === 6 ? 'card-gold-finale' : ''}`}>
                <span className="doom-corner tc-tl" />
                <span className="doom-corner tc-tr" />
                <span className="doom-corner tc-bl" />
                <span className="doom-corner tc-br" />

                <div className="candy-card-grid">
                  {/* Thumbnail Art */}
                  <div
                    className="candy-card-thumb"
                    style={{ backgroundImage: `url(${activeImg})` }}
                  >
                    <div className="candy-thumb-overlay" />
                    <div className="candy-thumb-badge">
                      {activeLevel === 6 ? (
                        <span>★ GRAND FINALE</span>
                      ) : activeLevel === 0 ? (
                        <span>● LEVEL 01 • LIVE</span>
                      ) : (
                        <span>STAGE 0{activeLevel + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="candy-card-body">
                    <div className="candy-card-phase">
                      <span>{activeMilestone.phase || `Stage 0${activeLevel + 1}`}</span>
                      {activeMilestone.tag && <span className="candy-tag-pill">{activeMilestone.tag}</span>}
                    </div>

                    <h3 className="candy-card-title">{activeMilestone.t}</h3>

                    <div className="candy-card-date">
                      <Calendar className="w-4 h-4 text-amber-300" />
                      <span>{activeMilestone.d}</span>
                    </div>

                    <p className="candy-card-desc">{activeMilestone.x}</p>

                    <div className="candy-card-actions">
                      {activeLevel === 0 ? (
                        <a
                          href={REGISTER_URL || '#schedule'}
                          target={REGISTER_URL ? '_blank' : undefined}
                          rel={REGISTER_URL ? 'noopener noreferrer' : undefined}
                          className="doom-register-cta"
                        >
                          <span>Claim Squad Spot on Unstop</span>
                          <ArrowRight className="w-4 h-4 ml-1 inline" />
                        </a>
                      ) : activeLevel === 6 ? (
                        <div className="candy-finale-callout">
                          <MapPin className="w-4 h-4 text-amber-300" />
                          <span>24-Hour Non-Stop Build @ DYPIT Pune • ₹2,05,000 Prize Pool</span>
                        </div>
                      ) : (
                        <div className="candy-step-status">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span>Milestone Stage 0{activeLevel + 1} of 07</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            {/* Day 1 / Day 2 Selector */}
            <div className="universe-day-selector">
              <button
                type="button"
                onClick={() => setFinaleDay(1)}
                className={`universe-day-btn ${finaleDay === 1 ? 'active' : ''}`}
              >
                <span>Day 1 • 30 January 2027</span>
                <span className="day-sub">Opening Ceremony &amp; 24H Build Kickoff</span>
              </button>
              <button
                type="button"
                onClick={() => setFinaleDay(2)}
                className={`universe-day-btn ${finaleDay === 2 ? 'active' : ''}`}
              >
                <span>Day 2 • 31 January 2027</span>
                <span className="day-sub">Code Freeze, Pitch Demos &amp; Awards</span>
              </button>
            </div>

            {/* Schedule Items List */}
            <div className="universe-schedule-agenda">
              {(finaleDay === 1 ? DAY_1_SCHEDULE : DAY_2_SCHEDULE).map((slot) => (
                <div key={slot.time} className="universe-agenda-row">
                  <div className="agenda-time-col">
                    <span className="agenda-time">{slot.time}</span>
                    <span className="agenda-time-dot" />
                  </div>
                  <div className="universe-card agenda-card">
                    <h4 className="agenda-title">{slot.title}</h4>
                    <p className="agenda-desc">{slot.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
