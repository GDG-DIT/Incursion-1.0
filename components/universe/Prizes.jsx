'use client';

const PRIZES = [
  {
    rank: '01',
    title: 'Universal Champion',
    award: '₹2,00,000',
    perks: ['Grand Trophy', 'Direct VC Incubation Pitch', 'Cloud Credits ($5,000)', 'Exclusive GDG Swag'],
    highlight: true,
  },
  {
    rank: '02',
    title: 'Timeline Defender',
    award: '₹1,25,000',
    perks: ['Silver Anomaly Trophy', 'Mentorship Sessions', 'Cloud Credits ($2,500)', 'Exclusive GDG Swag'],
    highlight: false,
  },
  {
    rank: '03',
    title: 'Quantum Vanguard',
    award: '₹75,000',
    perks: ['Bronze Anomaly Trophy', 'Cloud Credits ($1,000)', 'GDG Community Badges', 'Swag Kit'],
    highlight: false,
  },
];

export default function Prizes() {
  return (
    <section id="prizes" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Rewards of Victory</div>
          <h2 className="universe-section-title">Bounties & Recognition</h2>
          <p className="universe-section-desc">
            The multiverse rewards those who defend it. Stand victorious and claim your share of the
            ₹5,00,000+ bounty pool.
          </p>
        </div>

        {/* Podium Grid */}
        <div className="universe-grid-3" style={{ marginBottom: '40px' }}>
          {PRIZES.map((prize) => (
            <div
              key={prize.rank}
              className={`universe-prize-card ${prize.highlight ? 'highlight' : ''}`}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="universe-prize-rank">Rank {prize.rank}</span>
                  {prize.highlight && <span className="universe-prize-badge">Grand Prize</span>}
                </div>
                <h3 className="universe-prize-title">{prize.title}</h3>
                <div className="universe-prize-val">{prize.award}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--mute)', marginBottom: '8px' }}>
                  Included Bounties:
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

        {/* Special Categories Strip */}
        <div className="universe-grid-3">
          <div className="universe-card" style={{ textAlign: 'center' }}>
            <div className="universe-eyebrow">Category Award</div>
            <h3 className="universe-card-title">Best All-Women Team</h3>
            <p className="universe-card-desc" style={{ color: 'var(--em)' }}>₹35,000 + Mentorship</p>
          </div>
          <div className="universe-card" style={{ textAlign: 'center' }}>
            <div className="universe-eyebrow">Category Award</div>
            <h3 className="universe-card-title">Best Beginner Hack</h3>
            <p className="universe-card-desc" style={{ color: 'var(--em)' }}>₹35,000 + Learning Kits</p>
          </div>
          <div className="universe-card" style={{ textAlign: 'center' }}>
            <div className="universe-eyebrow">Category Award</div>
            <h3 className="universe-card-title">Most Creative UI/UX</h3>
            <p className="universe-card-desc" style={{ color: 'var(--em)' }}>₹30,000 + Design Licenses</p>
          </div>
        </div>
      </div>
    </section>
  );
}
