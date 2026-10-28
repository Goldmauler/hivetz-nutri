import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HivetzLogo from './HivetzLogo';
import { PLANT_URL } from '../data/links';

/**
 * Between pages: a cream curtain rises with the Hivetz logo building itself on it (molecules
 * popping in, the wordmark filling with blue), then lifts away to the new page. The first page
 * load has its own start screen, so the curtain only plays on navigation. Links to the 3D plant
 * tour play it too before the browser leaves (the plant site plays the same one coming back).
 */
const BUILD = [0.12, 0.3, 0.45, 0.6, 0.78, 1];
export default function PageTransition() {
  const location = useLocation();
  const [stage, setStage] = useState<'idle' | 'covering' | 'revealing'>('idle');
  const [p, setP] = useState(0);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;
    setP(0);
    setStage('covering');
    // build the logo while the curtain is up: molecules one by one, the wordmark wiping in
    const timers = BUILD.map((v, i) => setTimeout(() => setP(v), 260 + i * 70));
    timers.push(setTimeout(() => setStage('revealing'), 980));
    timers.push(setTimeout(() => setStage('idle'), 1560));
    return () => timers.forEach(clearTimeout);
  }, [location.pathname]);

  // leaving for the plant tour: cover, build the logo, then go
  useEffect(() => {
    const plant = new URL(PLANT_URL, window.location.href).origin;
    const timers: number[] = [];
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (!a || a.target === '_blank' || new URL(a.href, window.location.href).origin !== plant) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      e.preventDefault();
      setP(0);
      setStage('covering');
      BUILD.forEach((v, i) => timers.push(window.setTimeout(() => setP(v), 260 + i * 70)));
      timers.push(window.setTimeout(() => (window.location.href = a.href), 1000));
    };
    // Back from the plant restores this page from cache with the curtain still up: lift it
    const onShow = (e: PageTransitionEvent) => e.persisted && setStage('idle');
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', onShow);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', onShow);
      timers.forEach(clearTimeout);
    };
  }, []);

  const H = Math.round(Math.min(76, (window.innerWidth - 64) / 4.71));

  return (
    <AnimatePresence>
      {stage !== 'idle' && (
        <motion.div key="curtain" className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center" aria-hidden>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: stage === 'covering' ? '0%' : '-100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
            style={{ background: 'radial-gradient(120% 90% at 50% 45%, #ffffff 0%, #FDF6EA 60%, #F6EAD6 100%)' }}
          >
            {/* the logo-colour line along the curtain's leading edge */}
            <div className="logo-gradient absolute inset-x-0 top-0 h-[3px]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={stage === 'covering' ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: stage === 'covering' ? 0.4 : 0.45, delay: stage === 'covering' ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HivetzLogo p={p} size={H} id="pt" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
