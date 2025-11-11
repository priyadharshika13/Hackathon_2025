import { useEffect, useRef } from 'react';

export default function CinematicBG() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if video fails to load
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg_cinematic.mp4" type="video/mp4" />
      </video>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      {/* Pulse glow edges */}
      <div className="absolute inset-0 border-4 border-neon-blue/20 animate-pulse" />
    </div>
  );
}
