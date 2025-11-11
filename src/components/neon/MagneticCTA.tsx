import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, MouseEvent } from 'react';
import { prefersReducedMotion } from '../theme/ThemeProvider';

interface MagneticCTAProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  magneticRadius?: number;
  variant?: 'primary' | 'secondary' | 'outline';
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-neon-cyan to-neon-purple text-slate-950 shadow-glow-cyan',
  secondary: 'bg-gradient-to-r from-neon-purple to-neon-pink text-slate-950 shadow-glow-purple',
  outline: 'border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-slate-950',
};

export default function MagneticCTA({
  children,
  className = '',
  onClick,
  magneticRadius = 120,
  variant = 'primary',
}: MagneticCTAProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const reducedMotion = prefersReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < magneticRadius) {
      const strength = 0.3;
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    }
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`px-8 py-4 rounded-lg font-display font-semibold text-lg
        transition-all duration-200 hover:scale-105 focus-visible:ring-2 
        focus-visible:ring-neon-cyan/70 ${variantStyles[variant]} ${className}`}
      style={reducedMotion ? {} : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
