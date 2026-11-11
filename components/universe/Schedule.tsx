'use client';

import { useState, useRef, useEffect } from 'react';
import { TIMELINE } from '../../lib/content';
import {
  Sparkles,
  Trophy,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'finale'>('roadmap');
  const [finaleDay, setFinaleDay] = useState<1 | 2>(1);
  const [activeStage, setActiveStage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const scrollToStage = (index: number) => {
    if (trackRef.current) {
      const cards = trackRef.current.querySelectorAll('.h-milestone-card');
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
    setActiveStage(index);
  };

  // Sync active stage on scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollPos = el.scrollLeft;
      const cardWidth = 360;
      const index = Math.round(scrollPos / cardWidth);
      setActiveStage(Math.max(0, Math.min(TIMELINE.length - 1, index)));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="schedule" className="universe-section relative">
      <div className="universe-container">
        {/* Section Header */}
        <div className="universe-section-header">
          <div className="universe-eyebrow">Timeline & Operational Schedule</div>
          <h2 className="universe-section-title">The Convergence Roadmap</h2>
          <p className="universe-section-desc">
            Seven continuous mission milestones spanning national online registration to the 24-hour offline build finale at DYPIT Pune.
          </p>

          {/* Mode Switcher */}
          <div className="universe-tab-switch">
            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              className={`universe-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            >
              Continuous Expedition Rail
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

        {activeTab === 'roadmap' ? (
          <div className="horizontal-timeline-container">
            {/* Top Stepper Indicator */}
            <div className="h-stepper-bar">
              {TIMELINE.map((item, idx) => {
                const isActive = activeStage === idx;
                const isGrandFinale = idx === 6;
                const isLive = idx === 0;

                return (
                  <button
                    key={item.t}
                    type="button"
                    onClick={() => scrollToStage(idx)}
                    className={`h-stepper-step ${isActive ? 'active' : ''} ${isGrandFinale ? 'step-finale' : ''} ${
                      isLive ? 'step-live' : ''
                    }`}
                  >
                    <span className="step-bullet">
                      {isGrandFinale ? '★' : isLive ? '●' : `0${idx + 1}`}
                    </span>
                    <span className="step-name">{item.t}</span>
                  </button>
                );
              })}
            </div>

            {/* Continuous Horizontal Conduit Viewport */}
            <div className="h-viewport-wrapper">
              {/* Left/Right Smooth Navigation Arrows */}
              <button
                type="button"
                onClick={scrollPrev}
                className="h-nav-arrow h-nav-left"
                aria-label="Previous Milestone"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={scrollNext}
                className="h-nav-arrow h-nav-right"
                aria-label="Next Milestone"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Continuous Illuminated Horizontal Conduit Line */}
              <div className="h-conduit-rail" aria-hidden="true">
                <div className="h-conduit-pulse" />
              </div>

              {/* Horizontal Scroll Track */}
              <div ref={trackRef} className="h-milestones-track">
                {TIMELINE.map((item, index) => {
                  const img = MILESTONE_IMAGES[index] || MILESTONE_IMAGES[0];
                  const isLive = index === 0;
                  const isGrandFinale = index === 6;
                  const isFocused = activeStage === index;

                  return (
                    <div
                      key={item.t}
                      onClick={() => setActiveStage(index)}
                      className={`h-milestone-card ${isGrandFinale ? 'card-finale' : ''} ${
                        isLive ? 'card-live' : ''
                      } ${isFocused ? 'card-focused' : ''}`}
                    >
                      <div className="tactical-corner tl" />
                      <div className="tactical-corner tr" />
                      <div className="tactical-corner bl" />
                      <div className="tactical-corner br" />

                      {/* Checkpoint Node Anchored to Continuous Rail */}
                      <div className="h-milestone-node">
                        <div className={`h-node-core ${isLive ? 'node-live' : ''} ${isGrandFinale ? 'node-finale' : ''}`}>
                          {isGrandFinale ? (
                            <Trophy className="w-5 h-5 text-amber-300" />
                          ) : isLive ? (
                            <Sparkles className="w-5 h-5 text-emerald-300" />
                          ) : (
                            <span className="h-node-num">0{index + 1}</span>
                          )}
                        </div>

                        {/* Status Chip */}
                        <div className="h-node-badge">
                          {isGrandFinale ? (
                            <span className="badge-gold">GRAND FINALE</span>
                          ) : isLive ? (
                            <span className="badge-emerald">LIVE NOW</span>
                          ) : (
                            <span>STAGE 0{index + 1}</span>
                          )}
                        </div>
                      </div>

                      {/* Visual Thumbnail */}
                      <div
                        className="h-card-thumb"
                        style={{ backgroundImage: `url(${img})` }}
                        aria-hidden="true"
                      >
                        <div className="h-thumb-overlay" />
                        <div className="h-thumb-scanlines" />
                      </div>

                      {/* Card Content Body */}
                      <div className="h-card-content">
                        <div className="h-card-meta">
                          <span className="universe-timeline-phase">{item.phase || `Stage 0${index + 1}`}</span>
                          {item.tag && <span className="universe-meta-pill conduit-tag">{item.tag}</span>}
                        </div>

                        <h3 className="h-card-title">{item.t}</h3>

                        <div className="h-card-date">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{item.d}</span>
                        </div>

                        <p className="h-card-desc">{item.x}</p>

                        {/* Action Footer */}
                        <div className="h-card-footer">
                          {isLive ? (
                            <a
                              href={REGISTER_URL || '#tracks'}
                              target={REGISTER_URL ? '_blank' : undefined}
                              rel={REGISTER_URL ? 'noopener noreferrer' : undefined}
                              className="h-card-action-btn"
                            >
                              <span>Claim Squad Spot</span>
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          ) : isGrandFinale ? (
                            <div className="h-card-finale-tag">
                              <MapPin className="w-3.5 h-3.5 text-amber-400" />
                              <span>24H Offline • DYPIT Pune</span>
                            </div>
                          ) : (
                            <div className="h-card-status-text">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70" />
                              <span>Milestone Phase 0{index + 1}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="h-controls-bar">
              <button type="button" onClick={scrollPrev} className="h-ctrl-btn">
                <ChevronLeft className="w-4 h-4 mr-1 inline" />
                Previous Milestone
              </button>

              <div className="h-dots-group">
                {TIMELINE.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToStage(i)}
                    className={`h-dot ${activeStage === i ? 'active' : ''}`}
                    aria-label={`Jump to stage 0${i + 1}`}
                  />
                ))}
              </div>

              <button type="button" onClick={scrollNext} className="h-ctrl-btn">
                Next Milestone
                <ChevronRight className="w-4 h-4 ml-1 inline" />
              </button>
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
