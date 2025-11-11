import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  variant?: 'cyan' | 'purple' | 'pink' | 'lime' | 'amber';
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const variantStyles = {
  cyan: 'hover:shadow-glow-cyan hover:border-neon-cyan/30',
  purple: 'hover:shadow-glow-purple hover:border-neon-purple/30',
  pink: 'hover:shadow-glow-pink hover:border-neon-pink/30',
  lime: 'hover:shadow-glow-lime hover:border-neon-lime/30',
  amber: 'hover:shadow-glow-amber hover:border-neon-amber/30',
};

export default function GlowCard({
  children,
  variant = 'cyan',
  className = '',
  hover = true,
  onClick,
}: GlowCardProps) {
  const hoverAnimation = hover
    ? {
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' },
      }
    : {};

  return (
    <motion.div
      className={`glass rounded-2xl p-6 transition-all duration-300 ${
        variantStyles[variant]
      } ${className}`}
      whileHover={hoverAnimation}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}
