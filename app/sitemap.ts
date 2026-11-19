import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://incursion.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-11-19T00:00:00.000Z');

  return [
    {
      url: `${siteUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/universe`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/countdown`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
