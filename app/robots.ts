import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://incursion.tech';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/enter-the-universe', '/finale'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/enter-the-universe', '/finale'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
