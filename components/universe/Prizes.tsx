'use client';

const PODIUM_PRIZES = [
  {
    rank: '01',
    title: 'Overall Champion',
    award: '₹1,00,000',
    subtitle: 'Vibranium Grand Champion',
    perks: [
      'Winner Grand Trophy & Certificates of Excellence',
      'Official Project Showcase across GDG on Campus Channels',
      'Direct Introductions to Sponsors, Founders & Alumni',
      'Dedicated Technical Mentorship & Incubation Sessions',
      'Potential Internship & Hiring Discussions',
    ],
    highlight: true,
  },
  {
    rank: '02',
    title: '1st Runner-Up',
    award: '₹50,000',
    subtitle: 'Multiverse Contender',
    perks: [
      '1st Runner-Up Trophy & Certificates of Excellence',
      'Official Project Showcase across GDG Channels',
      'Dedicated Mentor Follow-ups & Code Reviews',
      'Sponsor Merchandise & Tech Swag Kit',
    ],
    highlight: false,
  },
  {
    rank: '03',
    title: '2nd Runner-Up',
    award: '₹25,000',
    subtitle: 'Multiverse Contender',
    perks: [
      '2nd Runner-Up Trophy & Certificates of Excellence',
      'Official Project Showcase across GDG Channels',
      'Mentorship & Product Feedback Sessions',
      'Sponsor Merchandise & Tech Swag Kit',
    ],
    highlight: false,
  },
];

const TRACK_PRIZES = [
  { name: 'Rogue Protocol', tag: 'AI & Agents', award: '₹5,000' },
  { name: 'Firewall Zero', tag: 'Cyber & FinTech', award: '₹5,000' },
  { name: 'Final Hour', tag: 'Open Innovation', award: '₹5,000' },
  { name: 'Glass Wall', tag: 'GovTech', award: '₹5,000' },
  { name: 'Survival City', tag: 'Smart Cities', award: '₹5,000' },
];

export default function Prizes() {
  return (
    <section id="prizes" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">The Vibranium Vault</div>
          <h2 className="universe-section-title">Prize Pool: ₹2,05,000</h2>
          <p className="universe-section-desc">
            A combined ₹2,05,000 direct cash prize pool distributed across top podium finishes, specialized track bounties,
            and dedicated recognition for first-time contenders.
          </p>
        </div>

        {/* Podium Grid */}
        <div className="universe-podium-grid">
          {PODIUM_PRIZES.map((prize) => (
            <div
              key={prize.rank}
              className={`universe-prize-card ${prize.highlight ? 'highlight' : ''}`}
            >
              <div className="tactical-corner tl" />
              <div className="tactical-corner tr" />
              <div className="tactical-corner bl" />
              <div className="tactical-corner br" />

              <div>
                <div className="universe-prize-header">
                  <span className="universe-prize-rank">Rank {prize.rank}</span>
                  {prize.highlight && (
                    <span className="universe-prize-badge" style={{ background: '#ffd700', color: '#040605' }}>
                      <span className="bounty-spark" aria-hidden="true" style={{ color: '#040605' }}>★</span>
                      GRAND CHAMPION
                    </span>
                  )}
                </div>
                <h3 className="universe-prize-title">
                  {prize.highlight && <span style={{ marginRight: '8px' }}>🏆</span>}
                  {prize.title}
                </h3>
                <div className="universe-prize-val">{prize.award}</div>
                <div className="universe-prize-sub">{prize.subtitle}</div>
              </div>

              <div>
                <div className="universe-prize-perks-title">
                  Included Recognition &amp; Perks:
                </div>
                <ul className="universe-prize-list">
                  {prize.perks.map((p) => (
                    <li key={p} className="universe-prize-item">
                      <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Track Winners & Special Category */}
        <div className="universe-bounties-wrapper">
          <div className="universe-bounties-header">
            <div className="universe-eyebrow">Dedicated Track Bounties &amp; Special Category</div>
            <h3 className="universe-bounties-title">
              5x Track Winners (₹5,000 Each) + Best First-Time Team (₹5,000)
            </h3>
          </div>

          <div className="universe-bounties-grid">
            {TRACK_PRIZES.map((t) => (
              <div key={t.name} className="universe-card universe-bounty-card">
                <div className="bounty-badge-tag">{t.tag}</div>
                <h4 className="bounty-name">{t.name}</h4>
                <div className="bounty-amount">{t.award}</div>
                <small className="bounty-perk">Trophy + Certificate</small>
              </div>
            ))}

            {/* Special Category Best First-Time Team */}
            <div className="universe-card universe-bounty-card special-bounty">
              <div className="bounty-badge-tag special">Special Category</div>
              <h4 className="bounty-name">Best First-Time Team</h4>
              <div className="bounty-amount">₹5,000</div>
              <small className="bounty-perk">Trophy + Certificate</small>
            </div>
          </div>
        </div>

        {/* Beyond Cash & Participant Kit */}
        <div className="universe-grid-2">
          <div className="universe-card universe-tactical-card">
            <div className="tactical-corner tl" />
            <div className="tactical-corner tr" />
            <div className="tactical-corner bl" />
            <div className="tactical-corner br" />
            <div className="universe-eyebrow">Beyond Direct Cash</div>
            <h3 className="universe-card-title">Career &amp; Network Elevation</h3>
            <ul className="universe-prize-list" style={{ marginTop: '16px' }}>
              <li className="universe-prize-item">
                <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                <span>Custom fabricated trophies and physical achievement certificates</span>
              </li>
              <li className="universe-prize-item">
                <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                <span>Official project showcase across GDG on Campus social channels &amp; website</span>
              </li>
              <li className="universe-prize-item">
                <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                <span>Curated introductions to industry tech sponsors, founders, and alumni</span>
              </li>
              <li className="universe-prize-item">
                <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                <span>Ongoing technical mentorship sessions &amp; potential internship discussions</span>
              </li>
              <li className="universe-prize-item">
                <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                <span>Official participation certificates for all 50 shortlisted campus finalists</span>
              </li>
            </ul>
          </div>

          <div className="universe-card universe-tactical-card">
            <div className="tactical-corner tl" />
            <div className="tactical-corner tr" />
            <div className="tactical-corner bl" />
            <div className="tactical-corner br" />
            <div className="universe-eyebrow">Finalist Kit</div>
            <h3 className="universe-card-title">Participant Welcome Bag</h3>
            <p className="universe-card-desc" style={{ marginBottom: '14px' }}>
              Every team checking in at the DYPIT Pune campus for the 24-hour sprint receives an official kit:
            </p>
            <ul className="universe-prize-list">
              <li className="universe-prize-item">
                <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                <span>Developer notebook, ballpoint pen &amp; exclusive holographic sticker packs</span>
              </li>
              <li className="universe-prize-item">
                <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                <span>Event operational guide, mentor roster booklet &amp; schedule planner</span>
              </li>
              <li className="universe-prize-item">
                <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                <span>Sponsor tech merchandise, lanyard, and clearance credentials</span>
              </li>
              <li className="universe-prize-item">
                <span className="universe-prize-item-bullet" aria-hidden="true">✦</span>
                <span>24-hour access to meals, high-speed Wi-Fi, snacks, and recovery zones</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
