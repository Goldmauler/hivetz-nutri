import { motion } from 'framer-motion';

type Props = {
  items: string[];
  speed?: number; // seconds per loop
  className?: string;
  dotClassName?: string;
};

export default function Marquee({
  items,
  speed = 35,
  className = '',
  dotClassName = 'bg-current opacity-60',
}: Props) {
  const reel = [...items, ...items, ...items];
  return (
    <div className={`relative w-full overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {reel.map((it, i) => (
          <span key={`${it}-${i}`} className="marquee-item flex items-center gap-5 px-5">
            <span className="font-display font-bold text-[15px] md:text-[17px] tracking-[0.06em]">
              {it}
            </span>
            <span className={`marquee-dot h-1.5 w-1.5 rounded-full ${dotClassName}`} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
