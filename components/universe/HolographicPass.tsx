'use client';

import React, { useState, useRef, useEffect } from 'react';

const TRACKS_LIST = [
  'Rogue Protocol // AI & Agents',
  'Firewall Zero // Cybersecurity & FinTech',
  'Final Hour // Open Innovation',
  'Glass Wall // GovTech & Governance',
  'Survival City // Smart Cities & Civic Tech',
];

export default function HolographicPass() {
  const [name, setName] = useState('Tony Stark');
  const [squad, setSquad] = useState('Earth-616 Strike Team');
  const [track, setTrack] = useState(TRACKS_LIST[0]);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate deterministic clearance ID based on name
  const clearanceId = `INC-2027-${Math.abs(
    (name + squad).split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0) % 9000 + 1000
  )}`;

  // 3D Card Tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * 12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotX(rX);
    setRotY(rY);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlareX(50);
    setGlareY(50);
  };

  // High-res Canvas export for download
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 630;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
    bgGrad.addColorStop(0, '#040905');
    bgGrad.addColorStop(0.5, '#08140c');
    bgGrad.addColorStop(1, '#020503');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 630);

    // Border
    ctx.strokeStyle = 'rgba(63, 224, 142, 0.45)';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1120, 550);

    // Inner Corner accents
    ctx.fillStyle = '#3fe08e';
    const corners = [
      [36, 36], [1156, 36], [36, 586], [1156, 586]
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillRect(cx, cy, 8, 8);
    });

    // Watermark Avengers "A" in background
    ctx.save();
    ctx.fillStyle = 'rgba(63, 224, 142, 0.04)';
    ctx.font = 'bold 380px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('A', 1100, 460);
    ctx.restore();

    // Event Header
    ctx.fillStyle = '#3fe08e';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('INCURSION 2027 // OPERATIVE CLEARANCE CARD', 80, 100);

    ctx.fillStyle = '#a4c4af';
    ctx.font = '16px sans-serif';
    ctx.fillText('GDG ON CAMPUS · DR. D. Y. PATIL INSTITUTE OF TECHNOLOGY, PIMPRI, PUNE', 80, 130);

    // Divider
    ctx.strokeStyle = 'rgba(63, 224, 142, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 155);
    ctx.lineTo(1120, 155);
    ctx.stroke();

    // Operative Name
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px monospace';
    ctx.fillText('OPERATIVE NAME', 80, 210);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(name.toUpperCase() || 'OPERATIVE', 80, 260);

    // Squad Name
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px monospace';
    ctx.fillText('SQUAD / AFFILIATION', 80, 320);
    ctx.fillStyle = '#e2b764';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(squad.toUpperCase() || 'SOLO CONTENDER', 80, 360);

    // Battleground Track
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px monospace';
    ctx.fillText('ASSIGNED BATTLEGROUND', 80, 420);
    ctx.fillStyle = '#3fe08e';
    ctx.font = 'bold 22px monospace';
    ctx.fillText(track, 80, 455);

    // Footer info
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('30–31 JANUARY 2027 · DYPIT PUNE', 80, 530);

    // Right Column: Clearance ID & Barcode
    ctx.textAlign = 'right';
    ctx.fillStyle = '#3fe08e';
    ctx.font = 'bold 28px monospace';
    ctx.fillText(clearanceId, 1120, 220);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px monospace';
    ctx.fillText('STATUS: LEVEL 5 CLEARANCE', 1120, 250);

    // Draw faux high-tech barcode
    for (let i = 0; i < 40; i++) {
      const barW = (i % 3 === 0) ? 4 : (i % 2 === 0) ? 2 : 1;
      ctx.fillStyle = (i % 5 === 0) ? '#3fe08e' : 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(940 + i * 4.5, 470, barW, 60);
    }

    // Trigger download
    const link = document.createElement('a');
    link.download = `incursion-pass-${name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'operative'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shareText = encodeURIComponent(
    `I just answered the call for Earth's final stand at INCURSION 2027 by GDG on Campus, DYPIT Pune! 50 squads. 24 hours. Are you ready for Doomsday? 💥\n\nGenerate your operative pass at incursion.tech #Incursion2027 #AvengersDoomsday #Hackathon`
  );

  return (
    <section id="operative-pass" className="universe-section">
      <div className="universe-container">
        <div className="universe-section-header">
          <div className="universe-eyebrow">Hacker Identity</div>
          <h2 className="universe-section-title">Claim Your Operative Pass</h2>
          <p className="universe-section-desc">
            Assemble your credentials for Earth-616&apos;s final stand. Generate your personalized metallic holographic
            clearance card to share with your network across LinkedIn and X/Twitter.
          </p>
        </div>

        <div className="universe-pass-wrapper">
          {/* Controls Form */}
          <div className="universe-card universe-pass-form">
            <h3 className="universe-pass-form-title">
              <span className="universe-dot-ping" aria-hidden="true" />
              Operative Configuration
            </h3>

            <div className="universe-form-group">
              <label htmlFor="pass-name">Your Codename / Name</label>
              <input
                id="pass-name"
                type="text"
                value={name}
                maxLength={32}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tony Stark"
                className="universe-input"
              />
            </div>

            <div className="universe-form-group">
              <label htmlFor="pass-squad">Squad Name / University</label>
              <input
                id="pass-squad"
                type="text"
                value={squad}
                maxLength={40}
                onChange={(e) => setSquad(e.target.value)}
                placeholder="e.g. Earth-616 Strike Team"
                className="universe-input"
              />
            </div>

            <div className="universe-form-group">
              <label htmlFor="pass-track">Select Battleground</label>
              <select
                id="pass-track"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="universe-input universe-select"
              >
                {TRACKS_LIST.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="universe-pass-actions">
              <button
                type="button"
                onClick={handleDownload}
                className="universe-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Download Holographic Pass (PNG)</span>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
              </button>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=https%3A%2F%2Fincursion.tech`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="universe-btn-secondary"
                  style={{ flex: 1, textAlign: 'center', justifyContent: 'center', fontSize: '12px' }}
                >
                  Share on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fincursion.tech`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="universe-btn-secondary"
                  style={{ flex: 1, textAlign: 'center', justifyContent: 'center', fontSize: '12px' }}
                >
                  Share on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Interactive 3D Holographic Card Display */}
          <div className="universe-pass-display-container">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="universe-holographic-card"
              style={{
                transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                '--glare-x': `${glareX}%`,
                '--glare-y': `${glareY}%`,
              } as React.CSSProperties}
            >
              <div className="card-glare" />
              <div className="card-inner">
                {/* Top Bar */}
                <div className="card-header">
                  <div>
                    <div className="card-event-title">INCURSION 2027</div>
                    <div className="card-sub-brand">GDG ON CAMPUS · DYPIT PUNE</div>
                  </div>
                  <div className="card-chip">
                    <span className="card-dot" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="card-body">
                  <div className="card-field">
                    <span className="card-label">OPERATIVE</span>
                    <strong className="card-value name-val">{name || 'TONY STARK'}</strong>
                  </div>

                  <div className="card-row-2">
                    <div className="card-field">
                      <span className="card-label">SQUAD AFFILIATION</span>
                      <strong className="card-value squad-val">{squad || 'EARTH-616'}</strong>
                    </div>
                    <div className="card-field text-right">
                      <span className="card-label">CLEARANCE ID</span>
                      <strong className="card-value id-val">{clearanceId}</strong>
                    </div>
                  </div>

                  <div className="card-field">
                    <span className="card-label">ASSIGNED BATTLEGROUND</span>
                    <strong className="card-value track-val">{track}</strong>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="card-footer">
                  <div className="card-venue">
                    <span>30–31 JANUARY 2027</span>
                    <small>DYPIT CAMPUS, PUNE</small>
                  </div>
                  <div className="card-barcode" aria-hidden="true">
                    {[...Array(24)].map((_, i) => (
                      <span key={i} style={{ width: (i % 3 === 0) ? '3px' : '1px' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Canvas used for high-res PNG generation */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </section>
  );
}
