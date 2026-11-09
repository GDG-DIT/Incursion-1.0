'use client';

import { useState } from 'react';
import { TIMELINE } from '../../lib/content';

const DAY_1_SCHEDULE = [
  { time: '08:00', title: 'Registration & Check-In', desc: 'Badge pickup, kit distribution, and finalist security clearance.' },
  { time: '09:00', title: 'Location Distribution', desc: 'Teams settle into designated hacking bays and workstation zones.' },
  { time: '10:00', title: 'Opening Ceremony', desc: 'Welcome address by GDG on Campus, leadership, and keynote speakers.' },
  { time: '10:30', title: 'Challenge Reveal', desc: 'Detailed problem statements and track rubrics officially unveiled.' },
  { time: '11:00', title: 'Hackathon Begins', desc: '24-hour sprint clock starts. Hacking is officially live.' },
  { time: '13:00', title: 'Lunch', desc: 'High-protein networking lunch served on-site for all participating teams.' },
  { time: '16:00', title: 'Mentor Checkpoint', desc: 'First round of technical reviews with domain experts and architecture advisors.' },
  { time: '19:30', title: 'Dinner', desc: 'Dinner served on campus to fuel up for the overnight build.' },
  { time: '22:00', title: 'Progress Checkpoint', desc: 'Mid-hack architecture validation and milestone progress check-ins.' },
  { time: '00:00', title: 'Midnight Community Activity', desc: 'Recharge with interactive activities, multiplayer games, and midnight snacks.' },
];

const DAY_2_SCHEDULE = [
  { time: '01:00', title: 'Late-Night Mentor Round', desc: 'One-on-one debugging, cloud deployments, and pitch guidance.' },
  { time: '04:00', title: 'Wellness & Rest Checkpoint', desc: 'Designated quiet rest areas and recovery zone check-ins.' },
  { time: '07:00', title: 'Breakfast', desc: 'Morning coffee and breakfast served to power the final stretch.' },
  { time: '09:00', title: 'Final Development Sprint', desc: 'Code freeze preparations, demo recording, and pitch deck polish.' },
  { time: '10:30', title: 'Submission Closes (Hard Stop)', desc: '24-hour timer reaches zero. Code commits and portal submissions lock.' },
  { time: '10:30–11:30', title: 'Demos & Preliminary Judging', desc: 'All 50 teams present live working prototypes to domain evaluation panels.' },
  { time: '12:00', title: 'Top Finalists Announced', desc: 'Standout teams selected for mainstage grand presentations.' },
  { time: '12:30', title: 'Mainstage Presentations', desc: 'Finalist pitches and live demos before the grand industry jury.' },
  { time: '14:00', title: 'Jury Deliberation', desc: 'Closed-door evaluation, rubric tallying, and scoring calculation.' },
  { time: '15:00', title: 'Awards & Closing Ceremony', desc: 'Prize distribution, felicitation of champions, and closing remarks.' },
  { time: '16:00', title: 'Event Close', desc: 'Official conclusion of INCURSION 2027.' },
];

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'finale'>('roadmap');
  const [finaleDay, setFinaleDay] = useState<1 | 2>(1);

  return (
    <section id="schedule" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Timeline & Operational Schedule</div>
          <h2 className="universe-section-title">The Convergence Roadmap</h2>
          <p className="universe-section-desc">
            Seven mission milestones leading from national registration to the 24-hour offline showdown at DYPIT Pune.
          </p>

          {/* Schedule Mode Switcher */}
          <div className="universe-tab-switch">
            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              className={`universe-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            >
              Key Milestones Roadmap
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
          <div className="universe-container-narrow" style={{ margin: '0 auto' }}>
            <div className="universe-timeline">
              {TIMELINE.map((item, index) => (
                <div key={item.t} className="universe-timeline-item">
                  <div className="universe-timeline-marker" />
                  <div className="universe-timeline-date">{item.d.split('·')[0].trim()}</div>
                  <div className="universe-timeline-card">
                    <div className="tactical-corner tl" />
                    <div className="tactical-corner tr" />
                    <div className="tactical-corner bl" />
                    <div className="tactical-corner br" />

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <div className="universe-timeline-phase">{item.phase || `Phase 0${index + 1}`}</div>
                      {item.tag && (
                        <span
                          className="universe-meta-pill"
                          style={{
                            color: '#3fe08e',
                            borderColor: 'rgba(63, 224, 142, 0.35)',
                            background: 'rgba(63, 224, 142, 0.08)',
                            textTransform: 'uppercase',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                          }}
                        >
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="universe-timeline-title">{item.t}</h3>
                    <div className="universe-timeline-highlight">
                      {item.d}
                    </div>
                    <p className="universe-timeline-desc">{item.x}</p>
                  </div>
                </div>
              ))}
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
                <small>Kickoff &amp; Overnight Build</small>
              </button>
              <button
                type="button"
                onClick={() => setFinaleDay(2)}
                className={`universe-day-btn ${finaleDay === 2 ? 'active' : ''}`}
              >
                <span>Day 2 • 31 January 2027</span>
                <small>Code Freeze, Demos &amp; Awards</small>
              </button>
            </div>

            {/* Hour-by-hour timeline grid */}
            <div className="universe-agenda-list">
              {(finaleDay === 1 ? DAY_1_SCHEDULE : DAY_2_SCHEDULE).map((slot) => (
                <div key={slot.time + slot.title} className="universe-card universe-agenda-item">
                  <div className="universe-agenda-time">{slot.time}</div>
                  <div className="universe-agenda-details">
                    <h4 className="universe-agenda-title">{slot.title}</h4>
                    <p className="universe-agenda-desc">{slot.desc}</p>
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
