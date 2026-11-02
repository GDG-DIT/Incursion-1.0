'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ArrivalScroll() {
  const section = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;

    let isSeeking = false;
    let targetTime = 0;
    let rafId = null;
    let seekTimeout = null;

    const requestSeek = () => {
      rafId = null;
      if (!v || isSeeking) return;

      if (Math.abs(v.currentTime - targetTime) < 0.015) return;

      isSeeking = true;

      // Timeout watchdog to guarantee isSeeking never deadlocks
      clearTimeout(seekTimeout);
      seekTimeout = setTimeout(() => {
        isSeeking = false;
      }, 150);

      try {
        if ('fastSeek' in v) {
          v.fastSeek(targetTime);
        } else {
          v.currentTime = targetTime;
        }
      } catch (err) {
        isSeeking = false;
      }
    };

    const onSeeked = () => {
      clearTimeout(seekTimeout);
      isSeeking = false;
      if (Math.abs(v.currentTime - targetTime) >= 0.02) {
        if (!rafId) rafId = requestAnimationFrame(requestSeek);
      }
    };

    v.addEventListener('seeked', onSeeked);

    // Calculate scroll distance matching experience.js timeline
    // In experience.js, arrival finishes at raw = 5.04 out of STORY_END = 28.8
    const getEndDistance = () => {
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      return Math.round(scrollRange * (5.04 / 28.8));
    };

    const st = ScrollTrigger.create({
      trigger: '#scroll',
      start: 'top top',
      end: () => `+=${getEndDistance()}`,
      scrub: 0.15,
      onUpdate: (self) => {
        if (v.duration) {
          const progress = Math.min(1, Math.max(0, self.progress));
          targetTime = Math.min(v.duration - 0.02, progress * v.duration);
          if (!rafId && !isSeeking && Math.abs(v.currentTime - targetTime) >= 0.015) {
            rafId = requestAnimationFrame(requestSeek);
          }
        }
      },
    });

    const onMeta = () => {
      ScrollTrigger.refresh();
      if (v.duration && v.currentTime === 0) {
        targetTime = 0.01;
        requestSeek();
      }
    };

    v.addEventListener('loadedmetadata', onMeta);
    if (v.readyState >= 1) onMeta();

    return () => {
      st.kill();
      clearTimeout(seekTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      v.removeEventListener('seeked', onSeeked);
      v.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  return (
    <section ref={section} id="arrival-section">
      <video
        ref={video}
        id="arrivalVideo"
        src="/arrival_scrub.mp4"
        muted
        playsInline
        preload="auto"
      />
    </section>
  );
}
