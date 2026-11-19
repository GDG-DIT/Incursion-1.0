import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getEventSchema,
  getOrganizationSchema,
  getWebSiteSchema,
  getBreadcrumbSchema,
  SITE_URL,
} from '../lib/structured-data.ts';
import robots from '../app/robots.ts';
import sitemap from '../app/sitemap.ts';

test('Event Schema has all required Schema.org fields and event details', () => {
  const schema = getEventSchema(SITE_URL);

  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'Event');
  assert.match(schema.name, /INCURSION 2027/);
  assert.match(schema.name, /24-Hour National Level Hackathon/);
  assert.equal(schema.startDate, '2027-01-30T08:00:00+05:30');
  assert.equal(schema.endDate, '2027-01-31T16:00:00+05:30');
  assert.equal(schema.eventStatus, 'https://schema.org/EventScheduled');
  assert.equal(schema.eventAttendanceMode, 'https://schema.org/MixedEventAttendanceMode');

  // Location
  assert.equal(schema.location['@type'], 'Place');
  assert.match(schema.location.name, /Dr\. D\. Y\. Patil Institute of Technology/);
  assert.equal(schema.location.address.addressLocality, 'Pune');
  assert.equal(schema.location.address.addressRegion, 'Maharashtra');
  assert.equal(schema.location.address.addressCountry, 'IN');

  // Organizer
  assert.ok(schema.organizer);

  // Offers
  assert.ok(Array.isArray(schema.offers));
  assert.equal(schema.offers.length, 2);
  assert.equal(schema.offers[0].price, '0'); // Free round 1
  assert.equal(schema.offers[1].price, '899'); // Top 50 finalists confirmation

  // Keywords
  assert.ok(schema.keywords.includes('INCURSION 2027'));
  assert.ok(schema.keywords.includes('National Level Hackathon 2027'));
  assert.ok(schema.keywords.includes('24 Hour Hackathon India'));
  assert.ok(schema.keywords.includes('Hackathon in Pune'));
  assert.ok(schema.keywords.includes('AI and Agentic AI Hackathon'));
  assert.ok(schema.keywords.includes('Cybersecurity Hackathon'));
  assert.ok(schema.keywords.includes('Hackathon with ₹2 Lakh Prize Pool'));
});

test('Organization and WebSite schemas have correct properties', () => {
  const org = getOrganizationSchema(SITE_URL);
  assert.equal(org['@type'], 'Organization');
  assert.match(org.name, /GDG on Campus/);
  assert.match(org.name, /Dr\. D\. Y\. Patil Institute of Technology/);
  assert.ok(org.logo.url.startsWith('https://'));
  assert.ok(org.sameAs.length >= 3);

  const website = getWebSiteSchema(SITE_URL);
  assert.equal(website['@type'], 'WebSite');
  assert.equal(website.name, 'INCURSION 2027');
  assert.match(website.url, /https:\/\/incursion\.tech/);
});

test('BreadcrumbList schema formats correctly', () => {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: 'https://incursion.tech' },
    { name: 'Tracks', url: 'https://incursion.tech/universe' },
  ]);

  assert.equal(breadcrumb['@type'], 'BreadcrumbList');
  assert.equal(breadcrumb.itemListElement.length, 2);
  assert.equal(breadcrumb.itemListElement[0].position, 1);
  assert.equal(breadcrumb.itemListElement[0].name, 'Home');
  assert.equal(breadcrumb.itemListElement[1].position, 2);
  assert.equal(breadcrumb.itemListElement[1].name, 'Tracks');
});

test('robots.ts produces valid search engine crawl rules and sitemap reference', () => {
  const res = robots();
  assert.ok(res.rules);
  assert.equal(res.host, 'https://incursion.tech');
  assert.equal(res.sitemap, 'https://incursion.tech/sitemap.xml');
});

test('sitemap.ts produces clean URLs with https://incursion.tech domain', () => {
  const map = sitemap();
  assert.ok(Array.isArray(map));
  assert.equal(map.length, 3);

  const urls = map.map((entry) => entry.url);
  assert.ok(urls.includes('https://incursion.tech'));
  assert.ok(urls.includes('https://incursion.tech/universe'));
  assert.ok(urls.includes('https://incursion.tech/countdown'));

  // Ensure priorities are correctly tiered
  const home = map.find((e) => e.url === 'https://incursion.tech');
  assert.equal(home.priority, 1.0);
  assert.equal(home.changeFrequency, 'daily');
});
