import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import WorkforceDashboard from '../components/dashboards/WorkforceDashboard';
import CinematicBG from '../components/ui/CinematicBG';

export default function WorkforcePage() {
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
            text="Workforce Overview"
            subtitle="Saudization Metrics & Regional Insights"
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
        <WorkforceDashboard />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/3 left-10 w-24 h-24 bg-neon-purple/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-10 w-18 h-18 bg-neon-cyan/20 rounded-full blur-xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
