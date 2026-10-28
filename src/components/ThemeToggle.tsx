import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import type { Theme } from '../hooks/useTheme';

// The three everyday themes as swatches. Hivetz (the main theme) shows the logo's molecules.
const OPTIONS: { id: Theme; label: string; swatch: string }[] = [
  {
    id: 'brand',
    label: 'Hivetz colours',
    swatch: 'conic-gradient(from 200deg, #F49B0F, #E6413A, #D9258B, #641BA2, #005698, #80C7DD, #6DCE6B, #F49B0F)',
  },
  { id: 'light', label: 'Green', swatch: 'radial-gradient(circle at 35% 30%, #4ADE80, #166534 70%)' },
  { id: 'dark', label: 'Blue', swatch: 'radial-gradient(circle at 35% 30%, #99B6FF, #2A4FD8 70%)' },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="relative inline-flex items-center gap-1 rounded-full p-1
                 bg-forest-900/8 dark:bg-honey-500/12 border border-forest-900/10 dark:border-honey-500/20"
    >
      {OPTIONS.map((o) => {
        const active = theme === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.label}
            title={o.label}
            onClick={() => setTheme(o.id)}
            className="relative h-6 w-6 rounded-full focus:outline-none focus-visible:ring-2
                       focus-visible:ring-forest-600 dark:focus-visible:ring-honey-400"
          >
            {active && (
              <motion.span
                layoutId="theme-ring"
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                className="absolute -inset-[3px] rounded-full bg-white shadow-md"
              />
            )}
            <motion.span
              whileHover={{ scale: 1.12 }}
              className="absolute inset-[3px] rounded-full"
              style={{ background: o.swatch }}
            />
          </button>
        );
      })}
    </div>
  );
}
