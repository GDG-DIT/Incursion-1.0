'use client';

import { TIMELINE } from '../../lib/content';

export default function Schedule() {
  return (
    <section id="schedule" className="universe-section">
      <div className="universe-container-narrow">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Timeline of Events</div>
          <h2 className="universe-section-title">The Convergence Roadmap</h2>
          <p className="universe-section-desc">
            Follow the trajectory of Incursion 2027 from the opening signal to final judgment.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="universe-timeline">
          {TIMELINE.map((item, index) => (
            <div key={item.t} className="universe-timeline-item">
              {/* Glowing Timeline Marker */}
              <div className="universe-timeline-marker" />

              {/* Date */}
              <div className="universe-timeline-date">{item.d}</div>

              {/* Content Card */}
              <div className="universe-timeline-card">
                <div className="universe-timeline-phase">Phase 0{index + 1}</div>
                <h3 className="universe-timeline-title">{item.t}</h3>
                <p className="universe-timeline-desc">{item.x}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
