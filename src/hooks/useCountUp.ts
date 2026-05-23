import { useEffect, useRef, useState } from 'react';

/**
 * Counts up from 0 to `target` over `duration` ms using easeOutExpo.
 * Only starts when `inView` becomes true, and only once.
 */
export function useCountUp(target: number, inView: boolean, duration = 1800): number {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return count;
}
