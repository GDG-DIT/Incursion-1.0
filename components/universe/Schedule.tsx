'use client';

import { useState } from 'react';
import { TIMELINE } from '../../lib/content';

const DAY_1_SCHEDULE = [
  { time: '08:00', title: 'Registration & Check-In', desc: 'Badge pickup, kit distribution, and finalist security clearance.' },
  { time: '09:00', title: 'Location Distribution', desc: 'Teams settle into designated hacking zones and hardware stations.' },
  { time: '10:00', title: 'Opening Ceremony', desc: 'Welcome address by GDG on Campus, leadership, and keynote speakers.' },
  { time: '10:30', title: 'Challenge Reveal', desc: 'Detailed problem statements and track rubrics officially unveiled.' },
  { time: '11:00', title: 'Hackathon Begins', desc: 'Sprint timer starts. Hacking is officially live.' },
  { time: '13:00', title: 'Lunch', desc: 'Networking lunch served on-site for all participating teams.' },
  { time: '16:00', title: 'Mentor Checkpoint', desc: 'First round of technical reviews with domain experts and advisors.' },
  { time: '19:30', title: 'Dinner', desc: 'Fuel up for the overnight push.' },
  { time: '22:00', title: 'Progress Checkpoint', desc: 'Mid-hack architecture validation and milestone check-ins.' },
  { time: '00:00', title: 'Midnight Community Activity', desc: 'Recharge with interactive activities, games, and midnight snacks.' },
];

const DAY_2_SCHEDULE = [
  { time: '01:00', title: 'Late-Night Mentor Round', desc: 'One-on-one debugging, cloud deployments, and pitch guidance.' },
  { time: '04:00', title: 'Wellness & Rest Checkpoint', desc: 'Designated rest areas and recovery zone check-ins.' },
  { time: '07:00', title: 'Breakfast', desc: 'Morning coffee and breakfast served to power the home stretch.' },
  { time: '09:00', title: 'Final Development', desc: 'Code freeze preparations, demo video recording, and pitch deck polish.' },
  { time: '10:30', title: 'Submission Closes', desc: 'Hard stop on all code commits and portal submissions.' },
  { time: '10:30–11:30', title: 'Demos & Initial Judging', desc: 'Teams present live prototypes to preliminary evaluation panels.' },
  { time: '12:00', title: 'Finalists Announced', desc: 'Top standout teams selected for mainstage presentations.' },
  { time: '12:30', title: 'Final Presentations', desc: 'Mainstage pitches and demos in front of the grand jury.' },
  { time: '14:00', title: 'Jury Deliberation', desc: 'Closed-door evaluation and scoring calculation.' },
  { time: '15:00', title: 'Awards & Closing Ceremony', desc: 'Prize distribution, felicitation of winners, and closing remarks.' },
  { time: '16:00', title: 'Event Close', desc: 'Official conclusion of INCURSION 2027.' },
];

export default function Schedule() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [finaleDay, setFinaleDay] = useState(1);

  return (
    <section id="schedule" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Timeline & Schedule</div>
          <h2 className="universe-section-title">The Convergence Roadmap</h2>
          <p className="universe-section-desc">
            From the opening national registration to the offline finale on campus at DYPIT Pune.
          </p>

          {/* Schedule Mode Switcher */}
          <div style={{ display: 'inline-flex', gap: '8px', marginTop: '24px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === 'roadmap' ? 'var(--accent)' : 'transparent',
                color: activeTab === 'roadmap' ? '#000' : 'var(--text)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Key Dates Roadmap
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('finale')}
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === 'finale' ? 'var(--accent)' : 'transparent',
                color: activeTab === 'finale' ? '#000' : 'var(--text)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
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
                    <div className="universe-timeline-phase">Phase 0{index + 1}</div>
                    <h3 className="universe-timeline-title">{item.t}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--accent)', marginBottom: '8px', fontWeight: 600 }}>
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
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
              <button
                type="button"
                onClick={() => setFinaleDay(1)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '24px',
                  border: finaleDay === 1 ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.15)',
                  background: finaleDay === 1 ? 'rgba(74, 222, 128, 0.12)' : 'rgba(8, 12, 10, 0.6)',
                  color: finaleDay === 1 ? 'var(--accent)' : 'var(--mute)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Day 1 • 30 January 2027
              </button>
              <button
                type="button"
                onClick={() => setFinaleDay(2)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '24px',
                  border: finaleDay === 2 ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.15)',
                  background: finaleDay === 2 ? 'rgba(74, 222, 128, 0.12)' : 'rgba(8, 12, 10, 0.6)',
                  color: finaleDay === 2 ? 'var(--accent)' : 'var(--mute)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Day 2 • 31 January 2027
              </button>
            </div>

            {/* Hour-by-hour timeline grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(finaleDay === 1 ? DAY_1_SCHEDULE : DAY_2_SCHEDULE).map((slot) => (
                <div
                  key={slot.time + slot.title}
                  className="universe-card"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    padding: '16px 20px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      minWidth: '85px',
                      paddingTop: '2px',
                    }}
                  >
                    {slot.time}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                      {slot.title}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--mute)', margin: 0, lineHeight: 1.5 }}>
                      {slot.desc}
                    </p>
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
