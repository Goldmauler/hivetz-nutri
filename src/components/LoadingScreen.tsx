import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

interface Props {
  onComplete: () => void;
}

// The logo's six molecules (orange r = 1, y up), in the order they pop in; orange comes last.
const DOTS = [
  { x: -0.93, y: -0.99, r: 0.12, c: '#e6413a', at: 0.1 },
  { x: -1.07, y: -0.56, r: 0.28, c: '#641ba2', at: 0.25 },
  { x: 1.01, y: -0.76, r: 0.34, c: '#6dce6b', at: 0.4 },
  { x: 1.03, y: 1.31, r: 0.34, c: '#d9258b', at: 0.55 },
  { x: -0.81, y: 0.92, r: 0.56, c: '#80c7dd', at: 0.72 },
  { x: 0, y: 0, r: 1, c: '#f49b0f', at: 1 },
];

/** Lighter (f > 0) or darker (f < 0) shade of a hex colour, for the glossy sphere gradients. */
function shade(hex: string, f: number) {
  const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const out = ch.map((c) => Math.round(f > 0 ? c + (255 - c) * f : c * (1 + f)));
  return `#${out.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

const MIN_MS = 650; // long enough for the logo to read as built, never longer
const CAP_MS = 2600; // a slow image never holds the page back past this

/**
 * Start screen: the Hivetz logo builds itself while the few things the first view needs arrive
 * (the logo and hero artwork for the current theme, and the fonts), then fades into the page.
 * Everything else streams in behind it.
 */
export default function LoadingScreen({ onComplete }: Props) {
  const { art } = useTheme();
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const target = useRef(0);
  const born = useRef(performance.now());

  useEffect(() => {
    const start = born.current;
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
    for (const j of jobs) j.then(() => (target.current = Math.max(target.current, ++finished / jobs.length)));
    // Leaving runs on timers, not on animation frames: browsers slow or pause frames for windows
    // in the background, and the page must not wait on the logo animation.
    let leaveTimer = 0;
    const leave = () => {
      if (leaveTimer) return;
      target.current = 1;
      const wait = Math.max(0, MIN_MS - (performance.now() - start)) + 420;
      leaveTimer = window.setTimeout(() => setLeaving(true), wait);
    };
    Promise.all(jobs).then(leave);

    let raf = 0;
    const tick = () => {
      // creep so it never looks stalled, ease towards what has really arrived
      const t = Math.max(target.current, Math.min(0.85, (performance.now() - start) / CAP_MS));
      setShown((s) => {
        const next = s + (t - s) * 0.12;
        return t >= 1 && 1 - next < 0.004 ? 1 : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const cap = setTimeout(leave, CAP_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cap);
      clearTimeout(leaveTimer);
    };
    // runs once; the theme at first paint decides which artwork matters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // the exit fade is animation-driven too; hand over on a timer as well so the page always appears
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onComplete, 700);
    return () => clearTimeout(t);
  }, [leaving, onComplete]);

  // mark height; the wordmark sits beside it in the logo's own proportions (whole logo = 4.71 H wide)
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
            className="flex items-start"
            style={{ gap: (H * 15) / 190 }}
            animate={shown >= 1 ? { y: [0, -6, 0] } : {}}
            transition={{ duration: 0.7, ease: [0.34, 1.5, 0.5, 1] }}
          >
            <svg viewBox="-1.35 -1.65 2.72 2.76" width={H} height={H} style={{ overflow: 'visible' }} aria-hidden>
              <defs>
                {DOTS.map((d, i) => (
                  <radialGradient key={i} id={`ld-${i}`} cx="0.5" cy="0.5" r="0.5" fx="0.34" fy="0.3">
                    <stop offset="0" stopColor={shade(d.c, 0.62)} />
                    <stop offset="0.5" stopColor={d.c} />
                    <stop offset="1" stopColor={shade(d.c, -0.12)} />
                  </radialGradient>
                ))}
              </defs>
              {DOTS.map((d, i) => (
                <g key={i}>
                  <circle cx={d.x} cy={-d.y} r={d.r} fill="#ece3d3" />
                  <motion.circle
                    cx={d.x}
                    cy={-d.y}
                    r={d.r}
                    fill={`url(#ld-${i})`}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={shown >= d.at ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 14 }}
                  />
                </g>
              ))}
            </svg>
            <span className="relative block" style={{ height: (H * 164) / 190, marginTop: (H * 5) / 190 }}>
              <img
                src="/brand-wordmark.webp"
                alt=""
                className="block h-full w-auto select-none"
                style={{ filter: 'grayscale(1) brightness(1.5)', opacity: 0.22 }}
                draggable={false}
              />
              <img
                src="/brand-wordmark.webp"
                alt="Hivetz"
                className="absolute inset-0 block h-full w-auto select-none"
                style={{
                  WebkitMaskImage: `linear-gradient(90deg, #000 ${shown * 112 - 12}%, transparent ${shown * 112}%)`,
                  maskImage: `linear-gradient(90deg, #000 ${shown * 112 - 12}%, transparent ${shown * 112}%)`,
                }}
                draggable={false}
              />
            </span>
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
