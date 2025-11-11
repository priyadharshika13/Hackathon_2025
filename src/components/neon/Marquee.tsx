import { ReactNode, useState } from 'react';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  speed = 50,
  className = '',
  pauseOnHover = true,
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex gap-8 justify-center items-center py-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="flex gap-8 items-center"
        style={{
          animation: isPaused ? 'none' : `marquee ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
