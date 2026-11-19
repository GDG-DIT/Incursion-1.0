export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://incursion.tech';

export function getOrganizationSchema(siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'GDG on Campus, Dr. D. Y. Patil Institute of Technology, Pune',
    alternateName: [
      'GDG on Campus DYPIT Pune',
      'Google Developer Groups on Campus DYPIT',
      'GDG DIT',
    ],
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/gdg-logo.svg`,
      caption: 'GDG on Campus DYPIT Pune Logo',
    },
    sameAs: [
      'https://www.instagram.com/gdg.dit',
      'https://www.linkedin.com/company/gdg-dit/',
      'https://discord.gg/QYQZBEmgQ',
      'https://gdg.community.dev/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'gdg.dit@dypvp.edu.in',
      contactType: 'Hackathon Organizer Support',
      availableLanguage: ['English', 'Hindi', 'Marathi'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sant Tukaram Nagar, Pimpri',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411018',
      addressCountry: 'IN',
    },
  };
}

export function getWebSiteSchema(siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'INCURSION 2027',
    alternateName: 'INCURSION 2027 Official Hackathon Portal',
    url: siteUrl,
    description:
      'Official website for INCURSION 2027 — 24-Hour National Level Student Hackathon organized by GDG on Campus, Dr. D. Y. Patil Institute of Technology, Pune. ₹2,00,000 prize pool across 5 tracks.',
    inLanguage: 'en-IN',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };
}

export function getEventSchema(siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${siteUrl}/#event`,
    name: 'INCURSION 2027 - 24-Hour National Level Hackathon',
    alternateName: 'INCURSION 2027',
    description:
      'INCURSION 2027 is India’s premier 24-hour national level student hackathon organized by GDG on Campus at Dr. D. Y. Patil Institute of Technology (DYPIT), Pimpri, Pune. Compete for a ₹2,00,000 cash prize pool across 5 tracks: AI & Agentic AI, Cybersecurity & FinTech, Open Innovation, GovTech, and Smart Cities. Features free online initial registration and idea screening, followed by an intensive 24-hour offline build finale on January 30–31, 2027.',
    startDate: '2027-01-30T08:00:00+05:30',
    endDate: '2027-01-31T16:00:00+05:30',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Dr. D. Y. Patil Institute of Technology (DYPIT)',
      sameAs: 'https://engg.dypvp.edu.in/',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sant Tukaram Nagar, Pimpri Colony',
        addressLocality: 'Pune',
        addressRegion: 'Maharashtra',
        postalCode: '411018',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 18.6229,
        longitude: 73.8164,
      },
    },
    image: [
      `${siteUrl}/opengraph-image`,
      `${siteUrl}/media/doom-closeup4.webp`,
      `${siteUrl}/incursion-logo.webp`,
    ],
    url: `${siteUrl}/universe`,
    organizer: {
      '@id': `${siteUrl}/#organization`,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Round 1: Online Idea Challenge & Registration',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-11-08T00:00:00+05:30',
        validThrough: '2026-12-05T23:59:59+05:30',
        url: siteUrl,
        description:
          'Free national online registration and idea submission on hackathon platform for student teams of 2 to 4 members.',
      },
      {
        '@type': 'Offer',
        name: 'Round 2: Grand Finale Confirmation Fee (Top 50 Finalist Teams)',
        price: '899',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        validFrom: '2027-01-06T00:00:00+05:30',
        validThrough: '2027-01-20T23:59:59+05:30',
        url: `${siteUrl}/universe#about`,
        description:
          'Confirmation fee of ₹899 per team for the top 50 shortlisted squads attending the 24-hour on-campus finale at DYPIT Pune.',
      },
    ],
    keywords: [
      'INCURSION 2027',
      'National Level Hackathon 2027',
      '24 Hour Hackathon India',
      'Hackathon in Pune',
      'Student Hackathon India',
      'AI and Agentic AI Hackathon',
      'Cybersecurity Hackathon',
      'Hackathon with ₹2 Lakh Prize Pool',
      'GovTech Hackathon',
      'Smart Cities Hackathon',
      'GDG on Campus DYPIT',
      'Doctor Doom Hackathon',
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
