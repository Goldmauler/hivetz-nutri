import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FlaskConical, Microscope, BarChart3, ShieldCheck } from 'lucide-react';

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
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      id="rnd"
      ref={ref}
      className="relative py-24 md:py-32 border-t border-forest-900/10 dark:border-honey-400/10 overflow-hidden"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-forest-700/10 dark:bg-honey-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-honey-400/10 dark:bg-forest-500/10 blur-3xl" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <div className="eyebrow text-forest-800 dark:text-honey-300/70 mb-3">
            R&D Centre · Karnataka
          </div>
          <h2 className="display-h text-4xl md:text-6xl text-forest-900 dark:text-honey-600">
            THE SCIENCE
            <br />
            BEHIND THE BAG.
          </h2>
          <p className="mt-6 text-forest-900/75 dark:text-honey-700/80">
            A 4,000 sq.ft. dedicated R&D centre with HPLC, AAS, ELISA and live
            trial sheds. Every formulation we ship has been validated three
            ways: bench, batch, and bird.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 group"
            >
              <div className="h-11 w-11 rounded-xl flex items-center justify-center
                              bg-forest-900/8 dark:bg-honey-400/15
                              text-forest-800 dark:text-honey-300
                              group-hover:scale-110 transition-transform">
                <p.icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-forest-900 dark:text-honey-600">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-900 dark:text-honey-700/75">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Big highlight bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 rounded-2xl overflow-hidden
                     bg-forest-900 text-cream-50 dark:bg-honey-400 dark:text-ink-300
                     p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
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
    </section>
  );
}
