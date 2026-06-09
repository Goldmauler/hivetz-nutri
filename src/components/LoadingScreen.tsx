import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const PRELOAD = [
  '/Hivetz_Logo.png',
  '/HivetzLogoLight.png',
  '/HivetzLogoDark.png',
  '/hivetz_light_background.png',
  '/hivetz_dark_background.png',
  '/Hivetz_colour_1.png',
  '/hero_background.png',
  '/farm_aerial.png',
  '/about_science.png',
  '/rnd_hplc.png',
  '/products_bg.png',
  '/Bag_Green.png',
  '/Bag_Blue.png',
  '/EGG_Light.png',
  '/EGG_Dark.png',
];

const MARK = [
  { x: 50, y: 14, label: 'NUTRITION' },
  { x: 88, y: 50, label: 'SCIENCE'   },
  { x: 50, y: 86, label: 'QUALITY'   },
  { x: 12, y: 50, label: 'CARE'      },
];

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'intro' | 'reveal' | 'exit'>('intro');

  useEffect(() => {
    let done = 0;
    const total = PRELOAD.length;
    const start = performance.now();

    const finalize = () => {
      const elapsed = performance.now() - start;
      const minMs = 1900;
      const wait = Math.max(0, minMs - elapsed);
      setTimeout(() => {
        setStage('reveal');
        setTimeout(() => setStage('exit'), 600);
      }, wait);
    };

    PRELOAD.forEach((src) => {
      const img = new Image();
      const finish = () => {
        done += 1;
        setProgress(Math.min(1, done / total));
        if (done === total) finalize();
      };
      img.onload = finish;
      img.onerror = finish;
      img.src = src;
    });

    // hard cap — never block more than 4.5s
    const cap = setTimeout(() => {
      setProgress(1);
      finalize();
    }, 4500);

    return () => clearTimeout(cap);
  }, []);

  const pct = Math.round(progress * 100);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {stage !== 'exit' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#FDFBF5' }}
        >
          {/* Curtain panels that part on reveal */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2"
            style={{ background: '#0A2818' }}
            initial={{ x: 0 }}
            animate={{ x: stage === 'reveal' ? '-100%' : 0 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute top-0 right-0 h-full w-1/2"
            style={{ background: '#0A2818' }}
            initial={{ x: 0 }}
            animate={{ x: stage === 'reveal' ? '100%' : 0 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Soft radial pulse */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(245,166,35,0.08) 0%, transparent 55%)',
                'radial-gradient(circle at 50% 50%, rgba(245,166,35,0.18) 0%, transparent 55%)',
                'radial-gradient(circle at 50% 50%, rgba(245,166,35,0.08) 0%, transparent 55%)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Center stack */}
          <div className="relative z-10 flex flex-col items-center" style={{ width: 'min(440px, 86vw)' }}>

            {/* Animated mark — SVG hexagon-ish ring with cardinal labels */}
            <div className="relative" style={{ width: 200, height: 200 }}>
              {/* Outer rotating ring */}
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              >
                <motion.circle
                  cx={100}
                  cy={100}
                  r={94}
                  fill="none"
                  stroke="#F5A623"
                  strokeWidth={0.8}
                  strokeDasharray="4 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.55 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              </motion.svg>

              {/* Hex shape draw-in */}
              <motion.svg viewBox="0 0 200 200" className="absolute inset-0">
                <motion.polygon
                  points="100,18 168,58 168,142 100,182 32,142 32,58"
                  fill="none"
                  stroke="#FDFBF5"
                  strokeWidth={1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                />
                <motion.polygon
                  points="100,46 142,72 142,128 100,154 58,128 58,72"
                  fill="none"
                  stroke="#F5A623"
                  strokeWidth={1.2}
                  initial={{ pathLength: 0, opacity: 0, rotate: 30 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  style={{ originX: '100px', originY: '100px' } as any}
                />
              </motion.svg>

              {/* Cardinal labels */}
              {MARK.map((m, i) => (
                <motion.span
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + i * 0.12, duration: 0.45 }}
                  className="absolute font-semibold tracking-[0.28em] uppercase"
                  style={{
                    left: `${m.x}%`,
                    top: `${m.y}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: 9,
                    color: '#FDFBF5',
                    opacity: 0.7,
                  }}
                >
                  {m.label}
                </motion.span>
              ))}

              {/* Center wordmark fade-in */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center">
                  <div
                    className="font-display font-black"
                    style={{
                      color: '#FDFBF5',
                      fontSize: 28,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    HIVETZ
                  </div>
                  <div
                    style={{
                      color: '#F5A623',
                      fontSize: 9,
                      letterSpacing: '0.32em',
                      marginTop: 6,
                      fontWeight: 700,
                    }}
                  >
                    NUTRI
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, duration: 0.6 }}
              className="mt-8 text-center"
              style={{
                color: '#FDFBF5',
                fontSize: 11,
                letterSpacing: '0.32em',
                fontWeight: 600,
                opacity: 0.7,
              }}
            >
              ENGINEERED PREMIXES · SINCE INCEPTION
            </motion.div>

            {/* Progress row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 w-full flex items-center gap-4"
            >
              <div
                className="flex-1 h-[2px] rounded-full overflow-hidden"
                style={{ background: 'rgba(253,251,245,0.18)' }}
              >
                <motion.div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, #F5A623 0%, #FDFBF5 100%)',
                    width: `${pct}%`,
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </div>
              <span
                className="tabular-nums"
                style={{
                  color: '#FDFBF5',
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  opacity: 0.7,
                  minWidth: 36,
                  textAlign: 'right',
                }}
              >
                {String(pct).padStart(3, '0')}%
              </span>
            </motion.div>
          </div>

          {/* Skip hint */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'intro' ? 0.5 : 0 }}
            transition={{ delay: 1.4 }}
            onClick={() => { setStage('reveal'); setTimeout(() => setStage('exit'), 600); }}
            className="absolute bottom-8 right-8 z-20
                       text-[10px] font-semibold tracking-[0.3em] uppercase
                       transition-opacity duration-200"
            style={{ color: '#FDFBF5' }}
          >
            Skip →
          </motion.button>

          {/* Corner marks */}
          {[
            { top: 24, left: 24 },
            { top: 24, right: 24 },
            { bottom: 24, left: 24 },
            { bottom: 24, right: 24 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
              className="absolute h-3 w-3 z-20"
              style={{
                ...pos,
                borderTop:    pos.top    !== undefined ? '1px solid #F5A623' : undefined,
                borderBottom: pos.bottom !== undefined ? '1px solid #F5A623' : undefined,
                borderLeft:   pos.left   !== undefined ? '1px solid #F5A623' : undefined,
                borderRight:  pos.right  !== undefined ? '1px solid #F5A623' : undefined,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
