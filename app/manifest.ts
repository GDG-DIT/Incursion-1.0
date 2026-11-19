import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'INCURSION 2027 | 24-Hour National Level Hackathon',
    short_name: 'INCURSION 2027',
    description:
      'INCURSION 2027 is a 24-hour national level student hackathon in Pune organized by GDG on Campus, Dr. D. Y. Patil Institute of Technology. ₹2,00,000 prize pool across 5 tracks: AI, Cybersecurity, GovTech, Smart Cities, Open Innovation.',
    start_url: '/',
    id: '/',
    display: 'standalone',
    background_color: '#040605',
    theme_color: '#040605',
    orientation: 'any',
    categories: ['education', 'technology', 'hackathon'],
    lang: 'en-IN',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
