import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import PerformanceDashboard from '../components/dashboards/PerformanceDashboard';
import CinematicBG from '../components/ui/CinematicBG';

export default function PerformancePage() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <CinematicBG />

      {/* Header */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 p-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center justify-center">
          <AnimatedLogo
            size={100}
            text="Performance Analytics"
            subtitle="Department Performance & Insights"
            centered
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 h-full pt-32 pb-6 overflow-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <PerformanceDashboard />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 bg-neon-pink/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-10 w-16 h-16 bg-neon-purple/20 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
