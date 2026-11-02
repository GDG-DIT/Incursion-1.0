'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Who is eligible to participate in Incursion?',
    a: 'Incursion is open to all university students, recent graduates, and self-taught developers across all disciplines and skill levels. Beginners are warmly welcomed with dedicated tracks and workshops!',
  },
  {
    q: 'What is the permitted team size?',
    a: 'Teams can consist of 2 to 4 members. If you do not have a team yet, you can join our Discord to find teammates during the matchmaking phase.',
  },
  {
    q: 'Is there any registration fee?',
    a: 'Zero. Incursion is completely free to enter, courtesy of GDG on Campus and our generous sponsors. Meals, snacks, coffee, and hackathon swag are fully provided for on-site hackers.',
  },
  {
    q: 'Will the hackathon be conducted online or in-person?',
    a: 'The convergence takes place on-site at our campus venue with 24/7 access to hacking spaces, hardware labs, and sleeping pods. Virtual check-ins will be supported for preliminary rounds.',
  },
  {
    q: 'What are the primary evaluation criteria?',
    a: 'Submissions are assessed on Innovation (originality of approach), Technical Execution (depth, complexity, functionality), UI/UX Polish, and Multiversal Impact (practical real-world viability).',
  },
  {
    q: 'Can I start coding before the hackathon begins?',
    a: 'No. All code and assets must be authored during the 24-hour build window. You are encouraged to formulate ideas, review problem statements, and organize your team beforehand.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="universe-section">
      <div className="universe-container-narrow">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Frequently Asked Questions</div>
          <h2 className="universe-section-title">Multiverse Field Manual</h2>
          <p className="universe-section-desc">
            Everything you need to know about preparing for Incursion 2027.
          </p>
        </div>

        <div className="universe-faq-list">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="universe-faq-card">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="universe-faq-btn"
                  aria-expanded={isOpen}
                >
                  <span className="universe-faq-q">{item.q}</span>
                  <span className={`universe-faq-icon ${isOpen ? 'open' : ''}`}>+</span>
                </button>
                {isOpen && <div className="universe-faq-a">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
