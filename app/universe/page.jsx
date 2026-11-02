'use client';

import { useEffect } from 'react';
import './universe.css';
import BackgroundVideo from '../../components/universe/BackgroundVideo';
import Navbar from '../../components/universe/Navbar';
import Hero from '../../components/universe/Hero';
import About from '../../components/universe/About';
import Tracks from '../../components/universe/Tracks';
import Schedule from '../../components/universe/Schedule';
import Prizes from '../../components/universe/Prizes';
import Faq from '../../components/universe/Faq';
import Footer from '../../components/universe/Footer';

export default function UniversePage() {
  useEffect(() => {
    // Ensure document scrolling is unlocked on the portal page
    document.documentElement.classList.remove('lock');
  }, []);

  return (
    <div className="universe-page">
      {/* Fixed Looping Cinematic Background */}
      <BackgroundVideo />

      {/* Top Navbar */}
      <Navbar />

      {/* Content Sections */}
      <main className="universe-content">
        <Hero />
        <About />
        <Tracks />
        <Schedule />
        <Prizes />
        <Faq />
        <Footer />
      </main>
    </div>
  );
}
