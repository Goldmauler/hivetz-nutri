import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import HoneycombCanvas from './HoneycombCanvas';
import SplitText from './SplitText';
import Marquee from './Marquee';
import MagneticWrap from './MagneticWrap';

const STATS: Array<{ raw: number; display: string; label: string }> = [
  { raw: 25000, display: '25,000', label: 'TPA capacity' },
  { raw: 50000, display: '50,000', label: 'TPA scaling' },
  { raw: 12,    display: '12',     label: 'Product families' },
  { raw: 400,   display: '400',    label: 'Active customers' },
];

const TRUST_BADGES = [
  'GMP+ B2 CERTIFIED',
  'FAMI-QS COMPLIANT',
  '25,000 TPA FACILITY',
  '400+ FARMS SERVED',
  'IN-HOUSE R&D LAB',
  'HPLC · AAS · ELISA',
  '12 PRODUCT FAMILIES',
  'MADE IN SRI LANKA',
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const isSurprise = theme === 'surprise';
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yBg     = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const yText   = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const headlineColor = isSurprise
    ? 'text-[#5C2D0A]'
    : 'text-forest-900 dark:text-honey-600';

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100vh] flex items-center pt-24 pb-24 overflow-hidden"
    >
      {/* Ken Burns parallax background */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <motion.img
          src="/Hivetz_colour_1.png"
          alt=""
          className={`${isSurprise ? 'block' : 'hidden'} absolute inset-0 h-full w-full object-cover object-center select-none`}
          draggable={false}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src="/hivetz_light_background.png"
          alt=""
          className={`${!isSurprise ? 'block dark:hidden' : 'hidden'} absolute inset-0 h-full w-full object-cover object-center select-none`}
          draggable={false}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src="/hivetz_dark_background.png"
          alt=""
          className={`${!isSurprise ? 'hidden dark:block' : 'hidden'} absolute inset-0 h-full w-full object-cover object-center select-none`}
          draggable={false}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Honeycomb canvas particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <HoneycombCanvas />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={isSurprise
          ? { background: 'linear-gradient(to bottom, rgba(252,237,214,0.15) 0%, transparent 40%, rgb(252,237,214) 100%)' }
          : undefined}
      >
        {!isSurprise && (
          <div className="absolute inset-0 bg-gradient-to-b from-cream-50/15 via-transparent to-cream-50" />
        )}
      </div>

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
          className={`eyebrow mb-8 inline-flex items-center gap-3
            ${isSurprise ? 'text-[#D4845A]' : 'text-forest-800 dark:text-honey-700'}`}
        >
          <span className={`h-px w-8 ${isSurprise ? 'bg-[#D4845A]' : 'bg-forest-800 dark:bg-honey-700'}`} />
          Made in Sri Lanka · Est. 2017
          <span className={`h-px w-8 ${isSurprise ? 'bg-[#D4845A]' : 'bg-forest-800 dark:bg-honey-700'}`} />
        </motion.p>

        {/* Kinetic headline */}
        <h1
          className={`display-h
                     text-[42px] sm:text-[60px] md:text-[84px] lg:text-[106px] xl:text-[122px]
                     ${headlineColor}`}
        >
          <div className="block"><SplitText text="THE PREMIX" stagger={0.03} delay={0.25} /></div>
          <div className="block"><SplitText text="COMPANY" stagger={0.03} delay={0.45} /></div>
          <div className="block"><SplitText text="THAT GROWS WITH" stagger={0.025} delay={0.65} /></div>
          <div className="block"><SplitText text="YOUR FLOCK." stagger={0.03} delay={0.9} /></div>
        </h1>

        {/* Horizontal rule with shimmer */}
        <div className={`relative mt-6 h-[3px] w-full overflow-hidden rounded-full
                        ${isSurprise ? 'bg-[#D4845A]/30' : 'bg-forest-900/20 dark:bg-honey-600/40'}`}>
          <motion.div
            className={`absolute inset-0 origin-left ${isSurprise ? 'bg-[#D4845A]' : 'bg-forest-900 dark:bg-honey-600'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 1.2 }}
          />
          <motion.div
            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/80 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '110vw' }}
            transition={{ duration: 1.2, delay: 2.4, ease: 'easeInOut' }}
          />
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className={`mx-auto mt-8 max-w-2xl text-base md:text-lg leading-relaxed
                     ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-800'}`}
        >
          Hivetz Nutri Pvt Ltd engineers vitamin premixes, chelated minerals,
          toxin binders and feed additives — manufactured at our 25,000 TPA
          facility and delivered with the science your flock deserves.
        </motion.p>

        {/* CTAs (magnetic) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticWrap strength={0.25}>
            <a href="#get-started" className="btn-primary" data-cursor="link" data-cursor-label="Talk to us">
              Get a Custom Formulation
            </a>
          </MagneticWrap>
          <MagneticWrap strength={0.2}>
            <a href="#products" className="btn-ghost" data-cursor="link" data-cursor-label="Browse">
              Explore Products
            </a>
          </MagneticWrap>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className={`mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden
                     border
                     ${isSurprise
                       ? 'border-[#D4845A]/20 bg-[#D4845A]/8'
                       : 'border-forest-900/10 dark:border-honey-500/15 bg-forest-900/5 dark:bg-honey-500/10'
                     }`}
        >
          {STATS.map((s, i) => (
            <HeroStatCell key={s.label} stat={s} isSurprise={isSurprise} delay={1.85 + i * 0.08} />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        style={{ opacity: fadeOut }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className={`eyebrow ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-700'}`}>
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className={isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-700'}
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.span>
      </motion.div>

      {/* Trust marquee at the bottom */}
      <div
        className={`absolute bottom-0 left-0 right-0 py-3 border-t backdrop-blur-sm
          ${isSurprise
            ? 'bg-[rgba(252,237,214,0.78)] border-[#8B4513]/15 text-[#5C2D0A]'
            : 'bg-cream-50/78 border-forest-900/10 dark:border-honey-500/20 text-forest-900 dark:text-honey-700'
          }`}
      >
        <Marquee items={TRUST_BADGES} speed={42} dotClassName={isSurprise ? 'bg-[#D4845A]' : 'bg-current opacity-50'} />
      </div>
    </section>
  );
}

function HeroStatCell({
  stat,
  isSurprise,
  delay,
}: {
  stat: { raw: number; display: string; label: string };
  isSurprise: boolean;
  delay: number;
}) {
  const suffix = stat.label.includes('families') || stat.label.includes('customers') ? '+' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="bg-cream-50/90 dark:bg-cream-50/90 backdrop-blur-sm px-6 py-5 text-left"
      style={isSurprise ? { background: 'rgba(252, 237, 214, 0.92)' } : {}}
    >
      <div className={`font-display text-3xl md:text-4xl font-black
                      ${isSurprise ? 'text-[#8B4513]' : 'text-forest-900 dark:text-honey-600'}`}>
        {stat.display}{suffix}
      </div>
      <div className={`eyebrow mt-1 ${isSurprise ? '!text-[#D4845A]' : 'text-forest-900 dark:text-honey-700'}`}>
        {stat.label}
      </div>
    </motion.div>
  );
}
