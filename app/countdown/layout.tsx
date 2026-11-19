import type { ReactNode } from 'react';
import { SITE_URL } from '../../lib/structured-data';

export const metadata = {
  title: 'Doomsday Clock & Countdown',
  description:
    'Live countdown to INCURSION 2027 — 24-Hour National Level Hackathon in Pune organized by GDG on Campus, Dr. D. Y. Patil Institute of Technology on 30–31 January 2027.',
  alternates: {
    canonical: '/countdown',
  },
  openGraph: {
    title: 'Doomsday Clock | INCURSION 2027 Hackathon Countdown',
    description:
      'Countdown to INCURSION 2027 on 30 January 2027. Watch the timeline convergence for the 24-hour national hackathon at DYPIT Pune.',
    url: `${SITE_URL}/countdown`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'INCURSION 2027 Doomsday Clock Countdown',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doomsday Clock | INCURSION 2027 Hackathon Countdown',
    description:
      'Countdown to INCURSION 2027 on 30 January 2027 at DYPIT Pune. Something big is here.',
    images: ['/opengraph-image'],
  },
};

export default function CountdownLayout({ children }: { children: ReactNode }) {
  return children;
}
