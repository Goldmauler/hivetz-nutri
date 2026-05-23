import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FlaskConical, Microscope, BarChart3, ShieldCheck } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useParallax } from '../hooks/useParallax';

const PILLARS = [
  {
    icon: FlaskConical,
    title: 'Wet chemistry lab',
    body: 'In-house assays for vitamin A, D3, E titre and chelated mineral content on every production batch.',
  },
  {
    icon: Microscope,
    title: 'Microbiology suite',
    body: 'Total plate count, Salmonella, E. coli, and yeast/mould monitoring before any SKU is released.',
  },
  {
    icon: BarChart3,
    title: 'Field trials',
    body: 'Live broiler and layer trial sheds where formulations are validated against breed standards.',
  },
  {
    icon: ShieldCheck,
    title: 'Mycotoxin lab',
    body: 'HPLC-grade aflatoxin, ochratoxin, zearalenone, and DON quantification in 18-hour turnaround.',
  },
];

export default function RnD() {
  const { ref, bgY } = useParallax(30);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { theme } = useTheme();
  const isSurprise = theme === 'surprise';

  const barRef = useRef<HTMLDivElement>(null);
  const barInView = useInView(barRef, { once: true, amount: 0.15 });

  return (
    <section
      id="rnd"
      ref={ref}
      className="relative py-24 md:py-32 border-t border-forest-900/10 dark:border-honey-400/10 overflow-hidden"
    >
      {/* Parallax bg wrapper — decorative watermark, same size across all themes */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none flex items-center justify-end pr-8"
        aria-hidden
      >
        <img
          src="/Hivetz_Colour_3.png"
          alt=""
          className={`${isSurprise ? 'block' : 'hidden'} select-none opacity-80`}
          style={{ width: '100%', maxWidth: '1750px', height: 'auto' }}
          draggable={false}
        />
        <img
          src="/Bag_Green.png"
          alt=""
          className={`${!isSurprise ? 'block dark:hidden' : 'hidden'} select-none opacity-80`}
         style={{ width: '100%', maxWidth: '1750px', height: 'auto' }}
          draggable={false}
        />
        <img
          src="/Bag_Blue.png"
          alt=""
          className={`${!isSurprise ? 'hidden dark:block' : 'hidden'} select-none opacity-80`}
          style={{ width: '100%', maxWidth: '1750px', height: 'auto' }}
          draggable={false}
        />
      </motion.div>
      {/* Cream overlay — heavier so text stays readable */}
      <div className={`absolute inset-0 pointer-events-none
        ${isSurprise ? 'bg-[rgba(252,237,214,0.55)]' : 'bg-cream-50/80 dark:bg-cream-50/78'}`} />
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-forest-700/10 dark:bg-honey-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-honey-400/10 dark:bg-forest-500/10 blur-3xl" />

      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <div className={`eyebrow mb-3 ${isSurprise ? '!text-[#D4845A]' : 'text-forest-800 dark:text-honey-300/70'}`}>
            R&D Centre · Sri Lanka
          </div>
          <h2 className={`display-h text-4xl md:text-6xl ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
            THE SCIENCE
            <br />
            BEHIND THE BAG.
          </h2>
          <p className={`mt-6 ${isSurprise ? 'text-[#5C2D0A]/75' : 'text-forest-900/75 dark:text-honey-700/80'}`}>
            A 4,000 sq.ft. dedicated R&D centre with HPLC, AAS, ELISA and live
            trial sheds. Every formulation we ship has been validated three
            ways: bench, batch, and bird.
          </p>
        </motion.div>

        {/* Pillar cards — fan in from the bottom with stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`glass rounded-2xl p-6 group
                ${isSurprise ? '' : ''}`}
              style={isSurprise ? {
                background: 'rgba(255,244,220,0.65)',
                border: '1px solid rgba(139,69,19,0.15)',
                backdropFilter: 'blur(20px)',
              } : {}}
            >
              {/* Icon rotates 10deg + scales on hover */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className={`h-11 w-11 rounded-xl flex items-center justify-center
                            ${isSurprise
                              ? 'bg-[#F5A623]/15 text-[#8B4513]'
                              : 'bg-forest-900/8 dark:bg-honey-400/15 text-forest-800 dark:text-honey-300'
                            }`}
              >
                <p.icon size={20} />
              </motion.div>
              <h3 className={`mt-5 font-display text-xl font-bold ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
                {p.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${isSurprise ? 'text-[#5C2D0A]/75' : 'text-forest-900 dark:text-honey-700/75'}`}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Big highlight bar — slides in from the right when inView */}
        <div ref={barRef}>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={barInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-12 rounded-2xl overflow-hidden p-8 md:p-12
                       flex flex-col md:flex-row items-start md:items-center justify-between gap-6
                       ${isSurprise
                         ? 'bg-[#8B4513] text-[#FDF6E3]'
                         : 'bg-forest-900 text-cream-50 dark:bg-honey-400 dark:text-ink-300'
                       }`}
          >
            <div>
              <div className="eyebrow opacity-70 mb-2">Average turnaround</div>
              <div className="font-display text-3xl md:text-5xl font-black">
                18 hours · sample to certificate of analysis
              </div>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full
                         bg-cream-50 text-forest-900 dark:bg-cream-50 dark:text-honey-300
                         font-semibold hover:scale-[1.02] transition"
            >
              Submit a sample
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
