'use client';

const PODIUM_PRIZES = [
  {
    rank: '01',
    title: 'Overall Winner',
    award: '₹1,00,000',
    perks: [
      'Winner Grand Trophy & Certificates',
      'Official Project Showcase',
      'Sponsor & Alumni Introductions',
      'Dedicated Mentorship & Incubation',
      'Potential Internship Discussions',
    ],
    highlight: true,
  },
  {
    rank: '02',
    title: '1st Runner-Up',
    award: '₹50,000',
    perks: [
      '1st Runner-Up Trophy & Certificates',
      'Official Project Showcase',
      'Mentorship Sessions',
      'Sponsor Swag Kit & Introductions',
    ],
    highlight: false,
  },
  {
    rank: '03',
    title: '2nd Runner-Up',
    award: '₹25,000',
    perks: [
      '2nd Runner-Up Trophy & Certificates',
      'Official Project Showcase',
      'Mentorship Sessions',
      'Sponsor Swag Kit',
    ],
    highlight: false,
  },
];

const TRACK_PRIZES = [
  { name: 'Rogue Protocol (AI & Agents)', award: '₹5,000' },
  { name: 'Firewall Zero (Cyber & FinTech)', award: '₹5,000' },
  { name: 'Final Hour (Open Innovation)', award: '₹5,000' },
  { name: 'Glass Wall (GovTech)', award: '₹5,000' },
  { name: 'Survival City (Smart Cities)', award: '₹5,000' },
];

export default function Prizes() {
  return (
    <section id="prizes" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Rewards of Victory</div>
          <h2 className="universe-section-title">Prize Pool: ₹2 Lakh</h2>
          <p className="universe-section-desc">
            A combined ₹2 Lakh prize pool awarded to the most outstanding technical achievements,
            plus specialized track bounties and career-defining mentorship opportunities.
          </p>
        </div>

        {/* Podium Grid */}
        <div className="universe-grid-3" style={{ marginBottom: '40px' }}>
          {PODIUM_PRIZES.map((prize) => (
            <div
              key={prize.rank}
              className={`universe-prize-card ${prize.highlight ? 'highlight' : ''}`}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="universe-prize-rank">Rank {prize.rank}</span>
                  {prize.highlight && <span className="universe-prize-badge">Overall Winner</span>}
                </div>
                <h3 className="universe-prize-title">{prize.title}</h3>
                <div className="universe-prize-val">{prize.award}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--mute)', marginBottom: '8px' }}>
                  Included Recognition:
                </div>
                <ul className="universe-prize-list">
                  {prize.perks.map((p) => (
                    <li key={p} className="universe-prize-item">
                      <span className="universe-prize-item-bullet">✦</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Track Winners Strip */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div className="universe-eyebrow">Track Bounties</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)' }}>
              Best Track Winners • ₹5,000 Each
            </h3>
          </div>
          <div className="universe-grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {TRACK_PRIZES.map((t) => (
              <div key={t.name} className="universe-card" style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--mute)', marginBottom: '6px' }}>Track Bounty</div>
                <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '6px' }}>{t.name}</div>
                <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '18px' }}>{t.award}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond Cash & Participant Kit */}
        <div className="universe-grid-2">
          <div className="universe-card">
            <div className="universe-eyebrow">Beyond Cash Rewards</div>
            <h3 className="universe-card-title">Career & Network Elevation</h3>
            <ul className="universe-prize-list" style={{ marginTop: '12px' }}>
              <li className="universe-prize-item"><span className="universe-prize-item-bullet">✦</span><span>Trophies and physical achievement certificates</span></li>
              <li className="universe-prize-item"><span className="universe-prize-item-bullet">✦</span><span>Official project showcase across GDG on Campus channels</span></li>
              <li className="universe-prize-item"><span className="universe-prize-item-bullet">✦</span><span>Introductions to industry sponsors, founders, and alumni</span></li>
              <li className="universe-prize-item"><span className="universe-prize-item-bullet">✦</span><span>Ongoing technical mentorship & potential internship discussions</span></li>
              <li className="universe-prize-item"><span className="universe-prize-item-bullet">✦</span><span>Official participation certificates for all shortlisted finalists</span></li>
            </ul>
          </div>

          <div className="universe-card">
            <div className="universe-eyebrow">Finalist Kit</div>
            <h3 className="universe-card-title">Participant Welcome Bag</h3>
            <p className="universe-card-desc" style={{ marginBottom: '12px' }}>
              Every team checking in for the offline finale receives an exclusive kit:
            </p>
            <ul className="universe-prize-list">
              <li className="universe-prize-item"><span className="universe-prize-item-bullet">✦</span><span>Developer notebook, pen & exclusive sticker packs</span></li>
              <li className="universe-prize-item"><span className="universe-prize-item-bullet">✦</span><span>Event guide, mentor contact booklet & schedule planner</span></li>
              <li className="universe-prize-item"><span className="universe-prize-item-bullet">✦</span><span>Sponsor merchandise and tech swag</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
