/**
 * ScrambledText — pointer-proximity scramble effect using GSAP SplitText + ScrambleTextPlugin.
 * Inspired by Tom Miller / GSAP community (codepen.io/creativeocean/pen/NPWLwJM).
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  tag?: keyof JSX.IntrinsicElements;
};

export default function ScrambledText({
  children,
  className = '',
  style = {},
  radius = 120,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  tag: Tag = 'div',
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<Element[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const inner = rootRef.current.querySelector('[data-split]') as HTMLElement;
    if (!inner) return;

    const split = SplitText.create(inner, { type: 'chars', charsClass: 'char' });
    charsRef.current = split.chars as Element[];

    charsRef.current.forEach(c => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': (c as HTMLElement).innerHTML },
      });
    });

    const handleMove = (e: PointerEvent) => {
      charsRef.current.forEach(c => {
        const { left, top, width, height } = (c as HTMLElement).getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: (c as HTMLElement).dataset.content || '',
              chars: scrambleChars,
              speed,
            },
            ease: 'none',
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove as EventListener);

    return () => {
      el.removeEventListener('pointermove', handleMove as EventListener);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={rootRef} className={className} style={style}>
      <span data-split>{children}</span>
    </Tag>
  );
}
