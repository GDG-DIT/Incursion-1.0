import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'INCURSION 2027 - 24-Hour National Level Hackathon in Pune | GDG on Campus DYPIT';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#040605',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(63, 224, 142, 0.22) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(255, 215, 0, 0.14) 0%, transparent 45%)',
          padding: '48px 56px',
          color: '#e9e7e0',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          border: '12px solid #0d1410',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 20px',
              borderRadius: '999px',
              backgroundColor: 'rgba(63, 224, 142, 0.1)',
              border: '1px solid rgba(63, 224, 142, 0.35)',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#3fe08e',
              }}
            />
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#3fe08e',
                textTransform: 'uppercase',
              }}
            >
              GDG on Campus • DYPIT Pune Presents
            </span>
          </div>

          <div
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#8d928b',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            30–31 January 2027 // Pune, India
          </div>
        </div>

        {/* Center Hero Block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '12px',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '0.25em',
              color: '#ffd700',
              textTransform: 'uppercase',
            }}
          >
            24-Hour National Level Hackathon
          </div>

          <div
            style={{
              fontSize: '82px',
              fontWeight: 900,
              letterSpacing: '0.04em',
              lineHeight: 1.0,
              color: '#ffffff',
              textShadow: '0 0 40px rgba(63, 224, 142, 0.35)',
            }}
          >
            INCURSION 2027
          </div>

          <div
            style={{
              fontSize: '20px',
              fontWeight: 500,
              color: '#3fe08e',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: '4px',
            }}
          >
            Doomsday Times Run Out • Online Challenge to 24H Offline Finale
          </div>
        </div>

        {/* 3 Metric Badges Strip */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 215, 0, 0.08)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
            }}
          >
            <span style={{ fontSize: '12px', color: '#8d928b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Prize Pool
            </span>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffd700' }}>
              ₹2,00,000 Cash
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: 'rgba(63, 224, 142, 0.08)',
              border: '1px solid rgba(63, 224, 142, 0.3)',
            }}
          >
            <span style={{ fontSize: '12px', color: '#8d928b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Event Format
            </span>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#3fe08e' }}>
              24-Hour Non-Stop
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <span style={{ fontSize: '12px', color: '#8d928b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Offline Finale
            </span>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
              Top 50 Squads
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <span style={{ fontSize: '12px', color: '#8d928b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Round 1
            </span>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
              Free Online Entry
            </span>
          </div>
        </div>

        {/* Bottom Tracks Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '18px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#8d928b',
              letterSpacing: '0.05em',
            }}
          >
            <span style={{ color: '#3fe08e' }}>AI & Agentic AI</span>
            <span>•</span>
            <span style={{ color: '#3fe08e' }}>Cybersecurity & FinTech</span>
            <span>•</span>
            <span style={{ color: '#3fe08e' }}>Open Innovation</span>
            <span>•</span>
            <span style={{ color: '#3fe08e' }}>GovTech</span>
            <span>•</span>
            <span style={{ color: '#3fe08e' }}>Smart Cities</span>
          </div>

          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffd700',
              letterSpacing: '0.05em',
            }}
          >
            https://incursion.tech
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
