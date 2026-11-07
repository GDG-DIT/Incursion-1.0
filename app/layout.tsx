import './globals.css';
import type { ReactNode } from 'react';
import ImageProtection from '../components/ImageProtection';
import { Analytics } from '@vercel/analytics/next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'INCURSION 2027 | National 24-Hour Hackathon in Pune',
    template: '%s | INCURSION 2027',
  },
  description: 'INCURSION 2027 is a national-level student hackathon by GDG on Campus, DYPIT Pune, featuring an online idea challenge and an offline finale on 30–31 January 2027.',
  keywords: [
    'INCURSION 2027',
    'hackathon Pune',
    'student hackathon India',
    'student hackathon',
    'GDG on Campus DYPIT',
    'Doomsday Times Run Out',
  ],
  applicationName: 'INCURSION 2027',
  category: 'technology',
  creator: 'GDG on Campus, DYPIT Pune',
  publisher: 'GDG on Campus, DYPIT Pune',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'INCURSION 2027',
    title: 'INCURSION 2027 | National Student Hackathon in Pune',
    description: 'Join the national student hackathon by GDG on Campus, DYPIT Pune. Build, demo, and compete in the offline finale.',
    images: [
      {
        url: '/media/doom-closeup4.png',
        width: 1920,
        height: 1080,
        alt: 'INCURSION 2027 hackathon hero artwork',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INCURSION 2027 | National 24-Hour Hackathon in Pune',
    description: 'A national student hackathon by GDG on Campus, DYPIT Pune.',
    images: ['/media/doom-closeup4.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#040605' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><ImageProtection />{children}<Analytics /></body></html>;
}
