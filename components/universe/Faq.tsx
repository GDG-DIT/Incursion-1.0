// @ts-nocheck
'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Who is eligible to participate in INCURSION 2027?',
    a: 'INCURSION 2027 is a national-level student hackathon open to university students across India. Beginners and first-time hackathon participants are strongly encouraged to participate—there is a dedicated Best First-Time Team award (₹5,000) and mentors to guide you.',
  },
  {
    q: 'What is the required team size?',
    a: 'Teams must consist of 2 to 4 members. Solo participation is not permitted.',
  },
  {
    q: 'Is there any registration fee?',
    a: 'Round 1 (online registration and idea submission) is 100% free with no cap on the number of participating teams nationwide. For the top 50 shortlisted teams attending the offline finale, a confirmation fee of ₹899 per team applies. Travel and accommodation are the participants’ responsibility unless sponsored.',
  },
  {
    q: 'How does the two-round format work?',
    a: 'Round 1 (8 Nov 2026 – 5 Dec 2026) is an online idea challenge conducted on the hackathon platform. Teams submit proposed solutions across the five tracks. Following structured jury evaluation, the top 50 teams (plus waitlist) advance to Round 2: an offline build-and-demo sprint at the DYPIT campus in Pune on 30–31 January 2027.',
  },
  {
    q: 'Where will the offline finale take place?',
    a: 'The offline finale will be held on-campus at Dr. D. Y. Patil Institute of Technology (DYPIT), Pimpri, Pune, Maharashtra on 30–31 January 2027.',
  },
  {
    q: 'What facilities are provided to finalists during the sprint?',
    a: 'Finalists are fully accommodated with on-site meals, continuous water stations, high-speed enterprise-grade Wi-Fi with backup links, power outlets with charging stations, designated rest and recovery areas, first-aid and medical support, security, and an official participant welcome kit.',
  },
  {
    q: 'What are the judging criteria and weights?',
    a: 'Projects are evaluated holistically across 7 criteria: Technical Implementation (25%), Innovation (20%), Problem Relevance (15%), Impact (15%), UX / Design (10%), Scalability (10%), and Pitch / Demo (5%). A panel of 5–7 senior industry experts, founders, engineers, and researchers will serve as the final jury.',
  },
  {
    q: 'When are problem statements released, and can we start early?',
    a: 'Broad tracks are published now. Specific, detailed challenge statements will be unveiled at the kickoff ceremony on 30 January 2027 (10:30 AM). All project code and prototypes must be created during the hackathon window.',
  },
  {
    q: 'Where do we register?',
    a: 'Registrations will be hosted on Unstop. The link will be activated right here on the website as soon as the portal opens.',
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
            Everything you need to know about eligibility, rounds, facilities, and evaluation for INCURSION 2027.
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
