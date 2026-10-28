import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import HivetzLogo from './HivetzLogo';

interface Props {
  onComplete: () => void;
}

const CAP_MS = 2600; // a slow image never holds the page back past this
const HOLD_MS = 420; // the finished logo stays up this long (its little bounce), then the page fades in
const FORCE_MS = 1200; // if frames stall (background tab), snap the logo complete this long after loading

/**
 * Start screen: the Hivetz logo builds itself while the few things the first view needs arrive
 * (the logo and hero artwork for the current theme, and the fonts), then fades into the page.
 * It only ever leaves on a finished logo: every molecule in, the wordmark fully blue.
 */
export default function LoadingScreen({ onComplete }: Props) {
  const { art } = useTheme();
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const target = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const critical = [
      art('/Hivetz_Logo.webp', '/HivetzLogoLight.webp', '/HivetzLogoDark.webp'),
      art('/Hivetz_colour_1.webp', '/hivetz_light_background.webp', '/hivetz_dark_background.webp'),
    ];
    const jobs: Promise<unknown>[] = critical.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => resolve();
          img.src = src;
        }),
    );
    jobs.push(document.fonts?.ready ?? Promise.resolve());
    let finished = 0;
    for (const j of jobs) j.then(() => (target.current = Math.max(target.current, (++finished / jobs.length) * 0.999)));

    let force = 0;
    const loaded = () => {
      if (force) return;
      target.current = 1;
      force = window.setTimeout(() => setShown(1), FORCE_MS);
    };
    Promise.all(jobs).then(loaded);
    const cap = setTimeout(loaded, CAP_MS);

    // Ease towards what has really arrived, by elapsed time rather than per frame, so a slow or
    // throttled frame rate still lands in the right place; creep meanwhile so it never looks stuck.
    let raf = 0;
    let last = start;
    const tick = (now: number) => {
      const dt = Math.min(0.5, Math.max(0, now - last) / 1000);
      last = now;
      const want = Math.max(target.current, Math.min(0.85, (now - start) / CAP_MS));
      const k = 1 - Math.exp(-dt * (want >= 1 ? 9 : 6));
      setShown((s) => {
        if (s >= 1) return 1;
        const next = s + (want - s) * k;
        return want >= 1 && 1 - next < 0.01 ? 1 : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cap);
      clearTimeout(force);
    };
    // runs once; the theme at first paint decides which artwork matters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // leave only on the finished logo
  useEffect(() => {
    if (shown < 1 || leaving) return;
    const t = setTimeout(() => setLeaving(true), HOLD_MS);
    return () => clearTimeout(t);
  }, [shown, leaving]);

  // the exit fade is animation-driven; hand over on a timer as well so the page always appears
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onComplete, 700);
    return () => clearTimeout(t);
  }, [leaving, onComplete]);

  const H = Math.round(Math.min(96, (window.innerWidth - 48) / 4.71));

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!leaving && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'radial-gradient(120% 90% at 50% 45%, #ffffff 0%, #FDF6EA 60%, #F6EAD6 100%)' }}
          role="progressbar"
          aria-label="Loading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(shown * 100)}
        >
          <motion.div
            animate={shown >= 1 ? { y: [0, -6, 0] } : {}}
            transition={{ duration: 0.7, ease: [0.34, 1.5, 0.5, 1] }}
          >
            <HivetzLogo p={shown} size={H} id="ld" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-8 text-[13px] md:text-sm tracking-[0.04em]"
            style={{ color: '#4b5563', fontStyle: 'italic', fontWeight: 700 }}
          >
            <span style={{ color: '#F49B0F' }}>Hi</span>Quality · <span style={{ color: '#F49B0F' }}>Hi</span>Gain ·{' '}
            <span style={{ color: '#F49B0F' }}>Hi</span>Value
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
