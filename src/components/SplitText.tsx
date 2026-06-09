import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode, CSSProperties } from 'react';

type Props = {
  text: string;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  as?: 'span' | 'div';
  yOffset?: number;
};

export default function SplitText({
  text,
  className,
  style,
  stagger = 0.025,
  delay = 0,
  duration = 0.75,
  triggerOnce = true,
  as = 'span',
  yOffset = 28,
}: Props) {
  const ref = useRef<HTMLSpanElement | HTMLDivElement>(null);
  const inView = useInView(ref, { once: triggerOnce, amount: 0.4 });

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const childVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, rotateZ: 4 },
    show: {
      y: 0,
      opacity: 1,
      rotateZ: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const words = text.split(' ');
  const Tag: any = as === 'div' ? motion.div : motion.span;

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{ display: 'inline-block', ...style }}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.28em' }}
          aria-hidden
        >
          {Array.from(word).map((ch, ci) => (
            <span
              key={`${ch}-${ci}`}
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
            >
              <motion.span
                variants={childVariants}
                style={{ display: 'inline-block' }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
