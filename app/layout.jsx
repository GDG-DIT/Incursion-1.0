import './globals.css';

export const metadata = {
  title: 'INCURSION 2027 — National-Level 24-Hour Hackathon | GDG on Campus DYPIT Pune',
  description: 'National-level 24-hour student hackathon organized by GDG on Campus, Dr. D. Y. Patil Institute of Technology, Pimpri, Pune. Theme: "Doomsday Times Run Out". Dates: 30–31 January 2027.',
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#040605' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
