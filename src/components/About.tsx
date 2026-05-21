import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Factory, Microscope, Globe2, Award } from 'lucide-react';

const STATS = [
  { value: 25000, suffix: ' TPA', label: 'Current capacity', icon: Factory },
  { value: 50000, suffix: ' TPA', label: 'Scaling to', icon: Globe2 },
  { value: 12, suffix: '+', label: 'Product families', icon: Award },
  { value: 18, suffix: ' yrs', label: 'Combined R&D', icon: Microscope },
];

const PARAGRAPHS = [
  'Hivetz Nutri Pvt Ltd is a science-first animal nutrition company. Every premix that leaves our facility is formulated by in-house PhDs, manufactured on automated micro-dosing lines, and batch-tested for vitamin titre, mineral assay, and microbial load.',
  "We started with a single mixer and an obsession with consistency. Today we serve 400+ farms across India with a 25,000 TPA facility \u2014 and we\u2019re scaling to 50,000 TPA by 2027 without compromising the chemistry.",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 border-t border-forest-900/10 dark:border-honey-400/10 overflow-hidden"
    >
      {/* ── Section background images ── */}
      <img
        src="/Sectionbackgroud_light.png"
        alt=""
        aria-hidden
        className="block dark:hidden absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        draggable={false}
      />
      <img
        src="/Sectionbackgroud_Dark.png"
        alt=""
        aria-hidden
        className="hidden dark:block absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none opacity-70"
        draggable={false}
      />
      {/* Cream overlay */}
      <div className="absolute inset-0 bg-cream-50/80 dark:bg-cream-50/75 pointer-events-none" />

      <div className="relative z-10 container-x">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ── Left text block ── */}
          <div>
            <div className="eyebrow text-forest-800 dark:text-honey-300/70 mb-3">
              About Hivetz Nutri
            </div>

            {/* Headline slides from left */}
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="display-h text-4xl md:text-6xl text-forest-900 dark:text-honey-600"
            >
              BUILT BY
              <br />
              NUTRITIONISTS,
              <br />
              <span className="text-forest-700 dark:text-honey-400">
                NOT TRADERS.
              </span>
            </motion.h2>

            {/* Paragraphs fade in with 0.2s stagger */}
            <div className="mt-8 space-y-5 text-forest-900/80 dark:text-honey-600/80 leading-relaxed">
              {PARAGRAPHS.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-10 flex flex-wrap gap-3"
            >
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
            </motion.div>
          </div>

          {/* ── Right stats grid ── */}
          <div className="relative">
            {/* Slow rotating background circle decoration */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 -m-10 pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <div className="w-full h-full rounded-full border-2 border-dashed border-forest-900/8 dark:border-honey-400/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative z-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl
                         border border-forest-900/10 dark:border-honey-400/15
                         bg-forest-900/5 dark:bg-honey-400/10"
            >
              {STATS.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.2 + i * 0.12} inView={inView} />
              ))}
            </motion.div>
          </div>
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="bg-white/70 dark:bg-white/60 backdrop-blur-sm p-6 md:p-8 relative overflow-hidden"
    >
      <Icon size={20} className="text-forest-700/60 dark:text-honey-400/70 mb-4" />

      <div className="font-display text-3xl md:text-5xl font-black text-forest-900 dark:text-honey-600 leading-none">
        {value.toLocaleString()}
        <span className="text-forest-700 dark:text-honey-400">{suffix}</span>
      </div>

      <div className="eyebrow text-forest-900 dark:text-honey-700 mt-3">
        {label}
      </div>
    </motion.div>
  );
}
