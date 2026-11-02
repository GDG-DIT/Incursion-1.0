// Set NEXT_PUBLIC_REGISTER_URL when the registration form is ready.
export const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL || '';

export const TIMELINE = [
  {
    t: 'Registration',
    d: '8 November – 5 December 2026',
    x: 'Register your team and secure your place in the Incursion.',
    img: { f: 0 },
    ic: { f: 0, z: '420%', p: '4% 45%' },
  },
  {
    t: 'PPT Submission',
    d: '6–12 December 2026',
    x: 'Share your idea, the problem it solves, and how your team will bring it to life.',
    img: { f: 1 },
    ic: { f: 1, z: '420%', p: '56% 46%' },
  },
  {
    t: 'Video Prototype Submission',
    d: '20–25 December 2026',
    x: 'Show your prototype in action with a short walkthrough video.',
    img: { f: 2 },
    ic: { f: 2, z: '420%', p: '50% 50%' },
  },
  {
    t: 'Results Analysis',
    d: '6 January 2027',
    x: 'Submissions are reviewed and the teams moving forward are announced.',
    img: { f: 3 },
    ic: { f: 3, z: '420%', p: '50% 52%' },
  },
  {
    t: 'Grand Finale',
    d: '30–31 January 2027 · On campus',
    x: 'Meet on campus for the final build, demos, and awards.',
    img: { url: '/media/doom-throne.webp', z: '190%', p: '50% 58%' },
    ic: { url: '/media/doom-closeup.webp', z: '390%', p: '52% 38%' },
  },
];

export const STILLS = [
  '/media/timeline-1.webp',
  '/media/timeline-2.webp',
  '/media/timeline-3.webp',
  '/media/timeline-4.webp',
];

export function imageStyle(image) {
  const sources = { w: '/media/doom-throne.webp', c: '/media/doom-closeup.webp' };
  return {
    backgroundImage: `url(${image.url || (image.f != null ? STILLS[image.f] : sources[image.s])})`,
    backgroundSize: image.z || (image.f != null ? '125%' : 'cover'),
    backgroundPosition: image.p || (image.f != null ? '0% 35%' : '50% 50%'),
  };
}

export function jag(seed) {
  let r = seed * 9301 + 49297;
  const random = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const points = [];
  for (let i = 0; i <= 14; i++) points.push(`${(random() * 3).toFixed(1)}% ${(i * 100 / 14).toFixed(1)}%`);
  for (let i = 1; i <= 9; i++) points.push(`${(i * 100 / 9).toFixed(1)}% ${(100 - random() * 3).toFixed(1)}%`);
  for (let i = 13; i >= 0; i--) points.push(`${(100 - random() * 3).toFixed(1)}% ${(i * 100 / 14).toFixed(1)}%`);
  for (let i = 8; i >= 1; i--) points.push(`${(i * 100 / 9).toFixed(1)}% ${(random() * 3).toFixed(1)}%`);
  return `polygon(${points.join(',')})`;
}
