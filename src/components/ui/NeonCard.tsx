import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'pink' | 'purple' | 'green' | 'orange' | 'red' |'cyan';
  hover?: boolean;
}

export default function NeonCard({
  children,
  className = '',
  glowColor = 'blue',
  hover = true
}: NeonCardProps) {
  const glowClasses = {
  blue: 'shadow-[0_0_25px_rgba(0,255,255,0.4)] border-cyan-400/40',
  green: 'shadow-[0_0_25px_rgba(57,255,20,0.4)] border-lime-400/40',
  pink: 'shadow-[0_0_25px_rgba(255,20,147,0.4)] border-pink-400/40',
  purple: 'shadow-[0_0_25px_rgba(138,43,226,0.4)] border-purple-400/40',
  orange: 'shadow-[0_0_25px_rgba(255,165,0,0.45)] border-orange-400/50',
  red: 'shadow-[0_0_25px_rgba(255,0,0,0.4)] border-red-400/50',
  cyan: 'shadow-[0_0_25px_rgba(0,255,255,0.45)] border-cyan-300/60',
} ;

// 🔥 This will ALWAYS match the keys of glowClasses

  return (
    <motion.div
      className={`glass-effect rounded-lg p-6 ${glowClasses[glowColor]} ${className}`}
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: `0 0 20px rgba(${glowColor === 'blue' ? '0,255,255' : glowColor === 'pink' ? '255,20,147' : glowColor === 'purple' ? '138,43,226' : '57,255,20'}, 0.6)`,
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
