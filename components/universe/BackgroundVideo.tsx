'use client';

export default function BackgroundVideo() {
  return (
    <div className="universe-bg">
      <video
        id="timeline-bg-fixed"
        src="/media/timeline-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="universe-bg-video"
        aria-hidden="true"
      />
      {/* Cinematic radial vignette overlay */}
      <div className="universe-bg-vignette" />
      {/* Subtle scanline / film grain */}
      <div className="universe-bg-grain" />
    </div>
  );
}
