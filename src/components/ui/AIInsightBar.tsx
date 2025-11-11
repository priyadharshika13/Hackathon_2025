import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function AIInsightBar() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-sm border-t border-neon-blue/20 p-4 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-3 h-3 bg-neon-blue rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-neon-blue font-semibold">AI Insights Active</span>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-neon-green rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span>Real-time Analysis</span>
          </div>

          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-neon-purple rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Predictive Models</span>
          </div>

          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-neon-pink rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span>Strategic Recommendations</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
