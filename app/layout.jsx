import './globals.css';

export const metadata = {
  title: 'Incursion — a GDG hackathon, 2026–27',
  description: 'Two worlds. One final stand. Explore Incursion, a GDG on Campus hackathon running November 2026 through January 2027.',
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#040605' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
