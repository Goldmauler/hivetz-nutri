import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Factory, Microscope, Globe2, Award } from 'lucide-react';
import ScrambledText from './ScrambledText';

const STATS = [
  { value: 25000, suffix: ' TPA', label: 'Current capacity', icon: Factory },
  { value: 50000, suffix: ' TPA', label: 'Scaling to', icon: Globe2 },
  { value: 12, suffix: '+', label: 'Product families', icon: Award },
  { value: 18, suffix: ' yrs', label: 'Combined R&D', icon: Microscope },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 border-t border-forest-900/10 dark:border-honey-400/10 overflow-hidden"
    >
      {/* ── Section background images ── */}
      {/* Light mode — reduced opacity so bg is soft */}
      <img
        src="/Sectionbackgroud_light.png"
        alt=""
        aria-hidden
        className="block dark:hidden absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none "
        draggable={false}
      />
      {/* Dark mode — reduced opacity */}
      <img
        src="/Sectionbackgroud_Dark.png"
        alt=""
        aria-hidden
        className="hidden dark:block absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none opacity-70"
        draggable={false}
      />
      {/* Cream overlay — lightens the bg further so text is clearly readable */}
      <div className="absolute inset-0 bg-cream-50/80 dark:bg-cream-50/75 pointer-events-none" />
      <div className="relative z-10 container-x">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="eyebrow text-forest-800 dark:text-honey-300/70 mb-3">
              About Hivetz Nutri
            </div>
            <h2 className="display-h text-4xl md:text-6xl text-forest-900 dark:text-honey-600">
              BUILT BY
              <br />
              NUTRITIONISTS,
              <br />
              <span className="text-forest-700 dark:text-honey-400">
                NOT TRADERS.
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-forest-900/80 dark:text-honey-600/80 leading-relaxed">
              <p>
                Hivetz Nutri Pvt Ltd is a science-first animal nutrition
                company. Every premix that leaves our facility is formulated by
                in-house PhDs, manufactured on automated micro-dosing lines, and
                batch-tested for vitamin titre, mineral assay, and microbial
                load.
              </p>
              <p>
                We started with a single mixer and an obsession with
                consistency. Today we serve 400+ farms across India with a
                25,000 TPA facility — and we're scaling to 50,000 TPA by 2027
                without compromising the chemistry.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                'ISO 9001:2015',
                'FSSC 22000',
                'GMP+ B2',
                'FAMI-QS',
              ].map((b) => (
                <span
                  key={b}
                  className="text-xs font-semibold tracking-wider uppercase
                             px-3 py-1.5 rounded-md
                             border border-forest-900/15 dark:border-honey-400/20
                             text-forest-900/80 dark:text-honey-200/90"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl
                       border border-forest-900/10 dark:border-honey-400/15
                       bg-forest-900/5 dark:bg-honey-400/10"
          >
            {STATS.map((s, i) => (
              <StatCard key={s.label} {...s} delay={0.2 + i * 0.1} inView={inView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
  delay,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: typeof Factory;
  delay: number;
  inView: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const id = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(id);
    };
  }, [value, delay, inView]);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white/70 dark:bg-white/60 backdrop-blur-sm p-6 md:p-8 relative overflow-hidden"
    >
      <Icon size={20} className="text-forest-700/60 dark:text-honey-400/70 mb-4" />

      {/* Number — plain count-up, no scramble (value changes dynamically) */}
      <div className="font-display text-3xl md:text-5xl font-black text-forest-900 dark:text-honey-600 leading-none">
        {n.toLocaleString()}
        <span className="text-forest-700 dark:text-honey-400">{suffix}</span>
      </div>

      {/* Label — ScrambledText on static string */}
      <ScrambledText
        radius={80}
        duration={0.8}
        speed={0.5}
        scrambleChars=".:"
        className="eyebrow text-forest-900 dark:text-honey-700/70 mt-3 block"
      >
        {label}
      </ScrambledText>
    </motion.div>
  );
}
