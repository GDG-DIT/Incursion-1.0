import './globals.css';
import type { ReactNode } from 'react';
import ImageProtection from '../components/ImageProtection';
import GlobalSoundtrack from '../components/GlobalSoundtrack';
import { Analytics } from '@vercel/analytics/next';
import { getOrganizationSchema, getWebSiteSchema } from '../lib/structured-data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://incursion.tech';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'INCURSION 2027 | 24-Hour National Level Hackathon in Pune',
    template: '%s | INCURSION 2027',
  },
  description:
    'INCURSION 2027 is a 24-hour national level hackathon in Pune organized by GDG on Campus, Dr. D. Y. Patil Institute of Technology. ₹2,00,000 prize pool, 5 tracks: AI & Agentic AI, Cybersecurity & FinTech, GovTech, Smart Cities, and Open Innovation. Register now.',
  keywords: [
    'INCURSION 2027',
    'National Level Hackathon 2027',
    '24 Hour Hackathon India',
    'Hackathon in Pune',
    'Student Hackathon India',
    'AI and Agentic AI Hackathon',
    'Cybersecurity Hackathon',
    'Hackathon with ₹2 Lakh Prize Pool',
    'GDG on Campus DYPIT',
    'Dr. D. Y. Patil Institute of Technology Hackathon',
    'GovTech Hackathon',
    'Smart Cities Hackathon',
    'Doomsday Times Run Out',
    'DYPIT Pune Hackathon',
  ],
  applicationName: 'INCURSION 2027',
  category: 'technology',
  creator: 'GDG on Campus, Dr. D. Y. Patil Institute of Technology, Pune',
  publisher: 'GDG on Campus, Dr. D. Y. Patil Institute of Technology, Pune',
  authors: [{ name: 'GDG on Campus DYPIT Pune', url: siteUrl }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'INCURSION 2027',
    title: 'INCURSION 2027 | 24-Hour National Level Hackathon in Pune',
    description:
      'Join India’s premier 24-hour student hackathon on 30–31 January 2027 at DYPIT Pune. ₹2,00,000 prize pool, 5 tracks: AI & Agentic AI, CyberSecurity, GovTech, Smart Cities, Open Innovation.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'INCURSION 2027 - 24-Hour National Level Hackathon at DYPIT Pune',
        type: 'image/png',
      },
      {
        url: '/media/doom-closeup4.webp',
        width: 1920,
        height: 1080,
        alt: 'INCURSION 2027 Doctor Doom Theme Visual',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INCURSION 2027 | 24-Hour National Level Hackathon in Pune',
    description:
      '24-hour national hackathon by GDG on Campus, DYPIT Pune on 30–31 Jan 2027. ₹2 Lakh prize pool across AI, CyberSecurity, GovTech, Smart Cities & Open Innovation.',
    images: ['/opengraph-image'],
    creator: '@gdg.dit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#040605',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const orgSchema = getOrganizationSchema(siteUrl);
  const webSiteSchema = getWebSiteSchema(siteUrl);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body>
        <ImageProtection />
        <GlobalSoundtrack />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
