import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  // Show "dark" state when theme is dark; otherwise show "light" state
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-7 w-14 items-center rounded-full
                 bg-forest-800 dark:bg-honey-600 surprise:bg-[#8B4513]
                 transition-colors duration-500
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                 focus-visible:ring-forest-600 dark:focus-visible:ring-honey-400"
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md
                    flex items-center justify-center
                    ${isDark ? 'right-0.5' : 'left-0.5'}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{    rotate:  90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-honey-600">
              <Moon size={13} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span key="sun"
              initial={{ rotate: 90,  opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{    rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-forest-800">
              <Sun size={13} strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
