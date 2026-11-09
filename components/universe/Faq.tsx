'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
  cat: 'eligibility' | 'schedule' | 'prizes' | 'facilities';
}

const FAQS: FaqItem[] = [
  {
    q: 'Who is eligible to participate in INCURSION 2027?',
    a: 'INCURSION 2027 is a national-level student hackathon open to all undergraduate and postgraduate students across India in engineering, technology, and science disciplines. Inter-college and inter-branch teams are completely allowed. First-time hackathon contenders are strongly encouraged to apply—there is a dedicated Best First-Time Team award (₹5,000) and 15–30 technical mentors to guide you.',
    cat: 'eligibility',
  },
  {
    q: 'What is the required team size?',
    a: 'Teams must consist of 2 to 4 members. Solo participation is not permitted to encourage collaborative multi-disciplinary engineering.',
    cat: 'eligibility',
  },
  {
    q: 'Is there any registration fee?',
    a: 'Round 1 (online registration and idea submission) is 100% free with no cap on the number of participating teams nationwide. For the top 50 shortlisted teams attending the offline 24-hour sprint, a nominal confirmation fee of ₹899 per team applies. This fee covers full 24-hour venue access, all meals and snacks, mentor access, Wi-Fi infrastructure, and the official finalist welcome kit.',
    cat: 'eligibility',
  },
  {
    q: 'How does the two-round format and timeline work?',
    a: 'Phase 01 begins with Online Registration (10 Nov – 5 Dec 2026), followed by Idea Submission (6 Dec – 25 Dec 2026) where teams submit their technical blueprint across the 5 battleground tracks. Following structured jury evaluation (26 Dec 2026 – 5 Jan 2027), the top 50 finalist teams are announced on 6 January 2027. Shortlisted squads assemble on 30–31 January 2027 at DYPIT campus in Pune for the 24-hour offline build and demo sprint.',
    cat: 'schedule',
  },
  {
    q: 'Where will the 24-hour offline sprint take place?',
    a: 'The offline finale will be held at Dr. D. Y. Patil Institute of Technology (DYPIT), Pimpri, Pune, Maharashtra on 30–31 January 2027.',
    cat: 'facilities',
  },
  {
    q: 'What facilities are provided to finalists during the 24-hour sprint?',
    a: 'Finalists are provided full-spectrum campus support: enterprise-grade Wi-Fi with redundant backup links, continuous power points at every hacking workstation, all meals (lunch, dinner, breakfast, midnight refreshments), quiet rest and recovery rooms, 24/7 security, first-aid medical response, and an official participant kit.',
    cat: 'facilities',
  },
  {
    q: 'What are the judging criteria and evaluation weights?',
    a: 'Projects are evaluated holistically across 7 transparent dimensions: Technical Implementation (25%), Innovation & Creativity (20%), Problem Relevance (15%), Impact & Feasibility (15%), UX & Product Design (10%), Scalability & Resilience (10%), and Pitch & Live Demo (5%). A panel of 5–7 senior industry leaders, tech founders, and researchers will conduct preliminary reviews and the final stage deliberation.',
    cat: 'prizes',
  },
  {
    q: 'When are problem statements released, and can we start building early?',
    a: 'Broad battleground tracks are published now so teams can plan architectures. Specific, detailed challenge statements will be unveiled at the opening ceremony on 30 January 2027 (10:30 AM). To ensure absolute competitive fairness, all project code and prototypes must be created during the 24-hour sprint window. Pre-built projects are strictly prohibited.',
    cat: 'schedule',
  },
  {
    q: 'What are the prize awards and cash distributions?',
    a: 'The cash prize pool totals ₹2,05,000: Overall Winner receives ₹1,00,000; 1st Runner-Up receives ₹50,000; 2nd Runner-Up receives ₹25,000. Additionally, each of the 5 battleground tracks awards a ₹5,000 Best Track Winner bounty (₹25,000 total), plus a ₹5,000 Best First-Time Team award. All winners receive grand trophies, certificates of excellence, and sponsor introductions.',
    cat: 'prizes',
  },
  {
    q: 'Where do we register and submit our project?',
    a: 'Registrations and Round 1 idea submissions are hosted on the official platform. The link is accessible via the "Register Now" buttons on this portal.',
    cat: 'eligibility',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'eligibility' | 'schedule' | 'prizes' | 'facilities'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = FAQS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.cat === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq" className="universe-section">
      <div className="universe-container-narrow">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Frequently Asked Questions</div>
          <h2 className="universe-section-title">Multiverse Field Manual</h2>
          <p className="universe-section-desc">
            Everything you need to know about eligibility, rounds, facilities, judging, and prizes for INCURSION 2027.
          </p>

          {/* Search bar */}
          <div className="universe-faq-search-wrap">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" className="search-icon">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by keyword (e.g. fee, team, tracks, prize)..."
              className="universe-faq-search"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="faq-clear-btn"
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="universe-faq-categories">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'eligibility', label: 'Eligibility & Teams' },
              { id: 'schedule', label: 'Rounds & Dates' },
              { id: 'prizes', label: 'Prizes & Scoring' },
              { id: 'facilities', label: 'Campus & Facilities' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`faq-cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="universe-faq-list">
          {filteredFaqs.length === 0 ? (
            <div className="universe-card" style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--mute)' }}>
              No questions found matching &ldquo;{searchQuery}&rdquo;. Try another search term.
            </div>
          ) : (
            filteredFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.q} className="universe-faq-card">
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
            })
          )}
        </div>
      </div>
    </section>
  );
}
