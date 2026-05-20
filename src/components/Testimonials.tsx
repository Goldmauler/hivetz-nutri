import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setInterval(() => {
      setI((x) => (x + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [paused, inView]);

  const t = testimonials[i];

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative py-24 md:py-32 border-t border-forest-900/10 dark:border-honey-400/10"
    >
      <div className="container-x max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="eyebrow text-forest-800 dark:text-honey-300/70 mb-3">
            What customers say
          </div>
          <h2 className="display-h text-4xl md:text-6xl text-forest-900 dark:text-honey-600">
            TRUSTED BY
            <br />
            FARMS THAT
            <br />
            DON'T COMPROMISE.
          </h2>
        </motion.div>

        <div className="relative glass rounded-3xl p-8 md:p-14 overflow-hidden min-h-[320px]">
          <Quote
            size={120}
            className="absolute -top-2 -left-2 text-forest-900/5 dark:text-honey-400/10"
            strokeWidth={1}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <p className="font-display text-2xl md:text-4xl leading-snug text-forest-900 dark:text-honey-600">
                "{t.quote}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center
                             bg-forest-800 text-cream-50 dark:bg-honey-400 dark:text-ink-300
                             font-display font-bold text-lg"
                >
                  {t.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-forest-900 dark:text-honey-600">
                    {t.author}
                  </div>
                  <div className="text-sm text-forest-900 dark:text-honey-700/65">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <button
              onClick={() =>
                setI((x) => (x - 1 + testimonials.length) % testimonials.length)
              }
              className="h-10 w-10 rounded-full border border-forest-900/15 dark:border-honey-400/25
                         flex items-center justify-center
                         hover:bg-forest-900/5 dark:hover:bg-honey-400/10 transition"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setI((x) => (x + 1) % testimonials.length)}
              className="h-10 w-10 rounded-full border border-forest-900/15 dark:border-honey-400/25
                         flex items-center justify-center
                         hover:bg-forest-900/5 dark:hover:bg-honey-400/10 transition"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === i
                  ? 'w-8 bg-forest-800 dark:bg-honey-400'
                  : 'w-1.5 bg-forest-900/20 dark:bg-honey-400/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
