'use client';

import { useState, useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;

    // Check if audio was explicitly turned off by the user
    const savedEnabled = sessionStorage.getItem('incursion_audio_enabled');
    const shouldPlay = savedEnabled !== 'false';

    // Check if there was a saved playback time
    const savedTime = sessionStorage.getItem('incursion_audio_time');
    if (savedTime && !isNaN(parseFloat(savedTime))) {
      try {
        audio.currentTime = parseFloat(savedTime);
      } catch (e) {}
    }

    if (shouldPlay) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            sessionStorage.setItem('incursion_audio_enabled', 'true');
          })
          .catch(() => {
            // Autoplay blocked by browser policy: play on first user interaction
            setIsPlaying(false);
            const enableAudioOnInteraction = () => {
              audio
                .play()
                .then(() => {
                  setIsPlaying(true);
                  sessionStorage.setItem('incursion_audio_enabled', 'true');
                })
                .catch(() => {});
              window.removeEventListener('click', enableAudioOnInteraction);
              window.removeEventListener('scroll', enableAudioOnInteraction);
              window.removeEventListener('keydown', enableAudioOnInteraction);
            };

            window.addEventListener('click', enableAudioOnInteraction, { once: true });
            window.addEventListener('scroll', enableAudioOnInteraction, { once: true });
            window.addEventListener('keydown', enableAudioOnInteraction, { once: true });
          });
      }
    } else {
      setIsPlaying(false);
    }

    // Save timestamp before leaving page
    const handleBeforeUnload = () => {
      if (audio) {
        sessionStorage.setItem('incursion_audio_time', String(audio.currentTime || 0));
        sessionStorage.setItem('incursion_audio_enabled', audio.paused ? 'false' : 'true');
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      sessionStorage.setItem('incursion_audio_enabled', 'false');
      sessionStorage.setItem('incursion_audio_time', String(audio.currentTime || 0));
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          sessionStorage.setItem('incursion_audio_enabled', 'true');
        })
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/media/soundtrack.mp3" loop preload="auto" />
      {/* Sound Toggle Button */}
      <button
        type="button"
        onClick={toggleSound}
        className="universe-sound-btn"
        aria-label={isPlaying ? 'Mute Soundtrack' : 'Play Soundtrack'}
        title={isPlaying ? 'Mute Soundtrack' : 'Play Soundtrack'}
      >
        <span className={`universe-sound-icon ${isPlaying ? 'playing' : ''}`}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          )}
        </span>
        <span className="universe-sound-text">{isPlaying ? 'Sound on' : 'Sound off'}</span>
      </button>
    </>
  );
}

