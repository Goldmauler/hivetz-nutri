import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yBg     = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const yText   = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <img
          src="/hivetz_light_background.png"
          alt=""
          className="block dark:hidden absolute inset-0 h-full w-full object-cover object-center select-none"
          draggable={false}
        />
        <img
          src="/hivetz_dark_background.png"
          alt=""
          className="hidden dark:block absolute inset-0 h-full w-full object-cover object-center select-none"
          draggable={false}
        />
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 -z-10 pointer-events-none
                      bg-gradient-to-b from-cream-50/15 via-transparent to-cream-50" />

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity: fadeOut }}
        className="relative container-x text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="eyebrow mb-8 text-forest-800 dark:text-honey-700"
        >
          Made in India · ISO 9001 · FSSC 22000
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="display-h
                     text-[42px] sm:text-[60px] md:text-[84px] lg:text-[106px] xl:text-[122px]
                     text-forest-900 dark:text-honey-600"
        >
          THE PREMIX
          <br />COMPANY
          <br />THAT GROWS WITH
          <br />YOUR FLOCK.
        </motion.h1>

        {/* Horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.1 }}
          className="mt-6 h-[3px] w-full origin-left rounded-full
                     bg-forest-900 dark:bg-honey-600"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-8 max-w-2xl text-base md:text-lg leading-relaxed
                     text-forest-900 dark:text-honey-800"
        >
          Hivetz Nutri Pvt Ltd engineers vitamin premixes, chelated minerals,
          toxin binders and feed additives — manufactured at our 25,000 TPA
          facility and delivered with the science your flock deserves.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#get-started" className="btn-primary">
            Get a Custom Formulation
          </a>
          <a href="#products" className="btn-ghost">
            Explore Products
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden
                     border border-forest-900/10 dark:border-honey-500/15
                     bg-forest-900/5 dark:bg-honey-500/10"
        >
          {[
            ['25,000', 'TPA capacity'],
            ['50,000', 'TPA scaling'],
            ['12+',    'Product families'],
            ['400+',   'Active customers'],
          ].map(([n, l]) => (
            <div key={l}
                 className="bg-cream-50/90 dark:bg-cream-50/90 backdrop-blur-sm px-6 py-5 text-left">
              <div className="font-display text-3xl md:text-4xl font-black
                              text-forest-900 dark:text-honey-600">
                {n}
              </div>
              <div className="eyebrow mt-1 text-forest-900 dark:text-honey-700">
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
