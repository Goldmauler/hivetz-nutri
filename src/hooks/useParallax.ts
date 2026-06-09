import { useRef } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/**
 * Attaches to a section ref and returns a spring-smoothed `y` MotionValue
 * for use on the section's background image.
 *
 * @param strength  How many px the bg travels over the scroll range (default 60)
 * @param smooth    Spring smoothing — higher = more lag/butter (default 80)
 */
export function useParallax(strength = 60, smooth = 80): {
  ref: React.RefObject<HTMLElement>;
  bgY: MotionValue<string>;
} {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [`-${strength}px`, `${strength}px`]);

  const bgY = useSpring(raw, {
    stiffness: smooth,
    damping: 20,
    mass: 0.5,
  }) as unknown as MotionValue<string>;

  return { ref, bgY };
}
