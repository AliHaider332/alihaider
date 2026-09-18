// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Ali Haider — Full Stack Developer';
export const size = { width: 1200, height: 630 };
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
          padding: 80,
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #1a0f05 60%, #3a1e08 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 20,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#fb923c',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: '#fb923c',
            }}
          />
          Portfolio
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05 }}>
            Ali Haider
          </div>
          <div style={{ fontSize: 36, color: '#d4d4d8' }}>
            Full Stack Developer
          </div>
          <div style={{ fontSize: 22, color: '#a1a1aa', maxWidth: 900 }}>
            React · Next.js · Node.js · FastAPI · AWS · Generative AI
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            color: '#71717a',
          }}
        >
          <span>alihaider.dev</span>
          <span>Available for work</span>
        </div>
      </div>
    ),
    { ...size },
  );
}