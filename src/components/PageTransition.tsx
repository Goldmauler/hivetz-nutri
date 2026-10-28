import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function PageTransition() {
  const location = useLocation();
  const [stage, setStage] = useState<'idle' | 'covering' | 'revealing'>('idle');
  const { theme } = useTheme();

  useEffect(() => {
    setStage('covering');
    const t1 = setTimeout(() => setStage('revealing'), 520);
    const t2 = setTimeout(() => setStage('idle'), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  const accent =
    theme === 'surprise' ? '#8B4513' :
    theme === 'dark'     ? '#142A75' :
    theme === 'brand'    ? '#005698' :
                           '#14532D';

  return (
    <AnimatePresence>
      {stage !== 'idle' && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          aria-hidden
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: stage === 'covering' ? '0%' : '-100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            style={{ background: accent }}
            className="absolute inset-0"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: stage === 'covering' ? 1 : 0,
              scale: 1,
            }}
            transition={{ duration: 0.3, delay: stage === 'covering' ? 0.18 : 0 }}
            className="relative font-display text-4xl md:text-6xl font-black tracking-tight"
            style={{ color: '#FDFBF5' }}
          >
            HIVETZ
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
