import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg glass hover:neon-glow-blue transition-all duration-200 focus-neon"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-neon-blue" />
        ) : (
          <Sun className="w-5 h-5 text-neon-purple" />
        )}
      </motion.div>
    </motion.button>
  );
}
