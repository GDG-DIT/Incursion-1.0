// @ts-nocheck

// Edit the schedule and registration destination here.
// Source of truth: incursion-2027-content.md
export const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL || '';
export const TIMELINE = [
  {
    t: 'Registration',
    d: '11 November – 5 December 2026',
    x: 'National registration and team formation on the official platform.',
    img: { f: 0 },
    ic: { f: 0, z: '420%', p: '4% 45%' },
  },
  {
    t: 'Idea Submission',
    d: '6 December – 25 December 2026',
    x: 'Registered teams submit their proposed solutions and architecture across the five tracks.',
    img: { f: 1 },
    ic: { f: 1, z: '420%', p: '56% 46%' },
  },
  {
    t: 'Jury Evaluation & Screening',
    d: '26 December 2026 – 5 January 2027',
    x: 'Eligibility screening and structured jury evaluation of all submitted solutions.',
    img: { f: 2 },
    ic: { f: 2, z: '420%', p: '50% 50%' },
  },
  {
    t: 'Top 50 Finalists Announced',
    d: '6 January 2027',
    x: 'Top 50 teams shortlisted, plus waitlist, for the offline finale.',
    img: { f: 3 },
    ic: { f: 3, z: '420%', p: '50% 52%' },
  },
  {
    t: 'Grand Finale',
    d: '30–31 January 2027 · DYPIT Campus, Pune',
    x: 'Build sprint, mentor checkpoints, demos, jury review, and awards ceremony.',
    img: { url: '/media/doom-throne.webp', z: '190%', p: '50% 58%' },
    ic: { url: '/media/doom-closeup.webp', z: '390%', p: '52% 38%' },
  },
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
