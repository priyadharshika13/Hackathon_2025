import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { prefersReducedMotion } from './../../lib/theme';

interface SectionHeaderProps {
  title: string | ReactNode;
  subtitle?: string;
  accent?: 'cyan' | 'purple' | 'pink' | 'lime' | 'amber';
  className?: string;
}

const accentColors = {
  cyan: 'from-neon-cyan to-neon-purple',
  purple: 'from-neon-purple to-neon-pink',
  pink: 'from-neon-pink to-neon-cyan',
  lime: 'from-neon-lime to-neon-cyan',
  amber: 'from-neon-amber to-neon-lime',
};

export default function SectionHeader({
  title,
  subtitle,
  accent = 'cyan',
  className = '',
}: SectionHeaderProps) {
  const reducedMotion = prefersReducedMotion();

  return (
    <div className={`mb-8 ${className}`}>
      <motion.h2
        className="text-4xl md:text-5xl font-display font-bold mb-2"
        initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      <motion.div
        className={`h-1 w-24 bg-gradient-to-r ${accentColors[accent]} rounded-full mb-4`}
        initial={reducedMotion ? {} : { width: 0 }}
        animate={{ width: 96 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      
      {subtitle && (
        <motion.p
          className="text-lg text-slate-400"
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
