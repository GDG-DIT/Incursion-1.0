import type { ReactNode } from 'react';
import { SITE_URL } from '../../lib/structured-data';

export const metadata = {
  title: 'Tracks, Schedule, ₹2 Lakh Prize Pool & Rules',
  description:
    'Explore INCURSION 2027 hackathon tracks (AI & Agentic AI, Cybersecurity & FinTech, GovTech, Smart Cities, Open Innovation), ₹2,00,000 prize pool, 24-hour schedule, and eligibility at DYPIT Pune.',
  alternates: {
    canonical: '/universe',
  },
  openGraph: {
    title: 'INCURSION 2027 Hackathon | Tracks, Schedule & ₹2 Lakh Prize Pool',
    description:
      'Explore the 5 battleground tracks, timeline roadmap, cash prizes, and eligibility for the 24-hour national hackathon at DYPIT Pune.',
    url: `${SITE_URL}/universe`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'INCURSION 2027 Hackathon Details, Tracks & Prizes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INCURSION 2027 | Tracks, Schedule & ₹2 Lakh Prize Pool',
    description:
      'Explore tracks, schedule, prizes, and registration for the 24-hour national hackathon at DYPIT Pune.',
    images: ['/opengraph-image'],
  },
};

export default function UniverseLayout({ children }: { children: ReactNode }) {
  return children;
}
