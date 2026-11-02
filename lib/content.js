// Edit the schedule and registration destination here.
// Dates are retained from the supplied HTML and were marked as proposed there.
export const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL || '';
export const TIMELINE = [
  { t: 'The Signal', d: '8 November 2026-5 December 2026', x: 'Registrations open. Form your team and get in before the breach widens.', img: { f: 0 }, ic: { f: 0, z: '420%', p: '4% 45%' } },
  { t: 'The Briefing', d: '1 December 2026', x: 'Problem statements are released. Choose the universe you will defend.', img: { s: 'w', z: '190%', p: '50% 20%' }, ic: { s: 'c', z: '520%', p: '58% 17%' } },
  { t: 'The Breach', d: '6 December-12 December 2026', x: 'Idea submissions. Two worlds begin to overlap.', img: { f: 1 }, ic: { f: 1, z: '420%', p: '56% 46%' } },
  { t: 'Video Prototype Submission', d: '20 December-25 December 2026', x: 'Video submissions. Two worlds begin to overlap.', img: { f: 1 }, ic: { f: 1, z: '420%', p: '56% 46%' } },
  { t: 'The Collapse', d: '6 January 2027', x: 'Shortlisted teams are announced. The other timelines fracture.', img: { f: 2 }, ic: { f: 2, z: '420%', p: '50% 50%' } },
  { t: 'The Convergence', d: '30-31 January 2027', x: 'Incursion begins. The worlds collide and the build starts.', img: { f: 3 }, ic: { f: 3, z: '420%', p: '50% 52%' } },
];
export const STILLS = ["/media/timeline-1.webp", "/media/timeline-2.webp", "/media/timeline-3.webp", "/media/timeline-4.webp"];
export function imageStyle(image) {
  const sources = { w: '/media/doom-throne.webp', c: '/media/doom-closeup.webp' };
  return {
    backgroundImage: `url(${image.url || (image.f != null ? STILLS[image.f] : sources[image.s])})`,
    backgroundSize: image.z || (image.f != null ? '125%' : 'cover'),
    backgroundPosition: image.p || (image.f != null ? '0% 35%' : '50% 50%'),
  };
}

export function jag(seed) {
  let r = seed * 9301 + 49297; const R = () => (r = (r * 9301 + 49297) % 233280) / 233280, P = [];
  for (let i = 0; i <= 14; i++)P.push(`${(R() * 3).toFixed(1)}% ${(i * 100 / 14).toFixed(1)}%`);
  for (let i = 1; i <= 9; i++)P.push(`${(i * 100 / 9).toFixed(1)}% ${(100 - R() * 3).toFixed(1)}%`);
  for (let i = 13; i >= 0; i--)P.push(`${(100 - R() * 3).toFixed(1)}% ${(i * 100 / 14).toFixed(1)}%`);
  for (let i = 8; i >= 1; i--)P.push(`${(i * 100 / 9).toFixed(1)}% ${(R() * 3).toFixed(1)}%`);
  return `polygon(${P.join(',')})`
}
