import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Factory, Microscope, Globe2, Award } from 'lucide-react';
import { PLANT_URL } from '../data/links';
import { useTheme } from '../hooks/useTheme';
import { useCountUp } from '../hooks/useCountUp';
import { useParallax } from '../hooks/useParallax';

// Sources: Hivetz brochure ("About Hivetz", "Why Hivetz") and the florabiochem.com about page.
const STATS = [
  { value: 20000, suffix: ' MT', label: 'Capacity per annum', icon: Factory },
  { value: 4, suffix: '', label: 'Hivetz farm disinfectants', icon: Globe2 },
  { value: 25, suffix: '+ yrs', label: 'Promoter experience', icon: Award },
  { value: 8, suffix: '', label: 'Premix families we make', icon: Microscope },
];

const PARAGRAPHS = [
  'Flora Biochem Private Limited makes Hivetz premixes, ingredients and formulations in its own manufacturing units, with its own laboratory and formulation centre. We work with international raw-material suppliers and with feed manufacturers, so customers get one partner from import to dispatch.',
  'Imports, manufacturing and exports are handled end to end by one team. Formulations, batches, sources and prices stay confidential, we sign long-term NDAs, and you choose a cost-plus or a market-price model.',
];

export default function About() {
  const { ref, bgY } = useParallax(30);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { theme } = useTheme();
  const isSurprise = theme === 'surprise';
  const { isColour, art } = useTheme();

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 border-t border-forest-900/10 dark:border-honey-400/10 overflow-hidden"
    >
      {/* Parallax bg wrapper */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-6%] pointer-events-none"
        aria-hidden
      >
        <img
          key={theme}
          src={art('/Hivetz_Colour_Site.webp', '/Sectionbackgroud_light.webp', '/Sectionbackgroud_Dark.webp')}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover object-center select-none ${theme === 'dark' ? 'opacity-70' : ''}`}
          draggable={false}
        />
      </motion.div>
      {/* Cream overlay */}
      <div className={`absolute inset-0 pointer-events-none
        ${isSurprise ? 'bg-[rgba(252,237,214,0.65)]' : 'bg-cream-50/75 dark:bg-cream-50/70'}`} />

      <div className="relative z-10 container-x">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ── Left text block ── */}
          <div>
            <div className={`eyebrow mb-3 ${isSurprise ? '!text-[#D4845A]' : 'text-forest-800 dark:text-honey-300/70'}`}>
              About Hivetz
            </div>

            {/* Headline slides from left */}
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className={`display-h text-4xl md:text-6xl ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}
            >
              ONE PARTNER,
              <br />
              FROM IMPORT
              <br />
              <span className={isSurprise ? 'text-[#8B4513]' : 'text-forest-700 dark:text-honey-400'}>
                TO DISPATCH.
              </span>
            </motion.h2>

            {/* Paragraphs fade in with 0.2s stagger */}
            <div className={`mt-8 space-y-5 leading-relaxed ${isSurprise ? 'text-[#5C2D0A]/80' : 'text-forest-900/80 dark:text-honey-600/80'}`}>
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
                'Tested by HPLC',
                'IPQC',
                'NDA on request',
              ].map((b) => (
                <span
                  key={b}
                  className={`text-xs font-semibold tracking-wider uppercase
                             px-3 py-1.5 rounded-md border
                             ${isSurprise
                               ? 'border-[#8B4513]/20 text-[#8B4513]/85'
                               : 'border-forest-900/15 dark:border-honey-400/20 text-forest-900/80 dark:text-honey-200/90'
                             }`}
                >
                  {b}
                </span>
              ))}
            </motion.div>

            <motion.a
              href={PLANT_URL}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="btn-primary mt-8"
              data-cursor="link"
              data-cursor-label="3D tour"
            >
              Take a look at our plant
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </motion.a>
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
                <StatCard key={s.label} {...s} delay={0.2 + i * 0.12} inView={inView} isSurprise={isSurprise} />
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
  isSurprise,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: typeof Factory;
  delay: number;
  inView: boolean;
  isSurprise: boolean;
}) {
  const count = useCountUp(value, inView, 1800);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="bg-white/70 dark:bg-white/60 backdrop-blur-sm p-6 md:p-8 relative overflow-hidden"
      style={isSurprise ? { background: 'rgba(252, 237, 214, 0.75)' } : {}}
    >
      <Icon size={20} className={`mb-4 ${isSurprise ? 'text-[#D4845A]/70' : 'text-forest-700/60 dark:text-honey-400/70'}`} />

      {/* Fixed height prevents layout shift during count-up */}
      <div style={{ height: '4rem', display: 'flex', alignItems: 'flex-end' }}>
        <span className={`font-display text-3xl md:text-5xl font-black tabular-nums leading-none
          ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
          {count.toLocaleString()}
        </span>
        <span className={`font-display text-3xl md:text-5xl font-black leading-none ml-0.5
          ${isSurprise ? 'text-[#8B4513]' : 'text-forest-700 dark:text-honey-400'}`}>
          {suffix}
        </span>
      </div>

      <div className={`eyebrow mt-3 ${isSurprise ? '!text-[#D4845A]' : 'text-forest-900 dark:text-honey-700'}`}>
        {label}
      </div>
    </motion.div>
  );
}
