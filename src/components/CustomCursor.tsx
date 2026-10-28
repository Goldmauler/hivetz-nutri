import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

type Variant = 'default' | 'link' | 'media' | 'text';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const labelEl = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<Variant>('default');
  const [label, setLabel] = useState('');
  const [hidden, setHidden] = useState(true);
  const [coarse, setCoarse] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setCoarse(mq.matches);
    const onChange = () => setCoarse(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (coarse) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (hidden) setHidden(false);
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (labelEl.current) {
        labelEl.current.style.transform = `translate3d(${rx}px, ${ry + 28}px, 0) translate(-50%, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest<HTMLElement>('[data-cursor]');
      if (a) {
        const v = (a.dataset.cursor as Variant) || 'link';
        setVariant(v);
        setLabel(a.dataset.cursorLabel || '');
        return;
      }
      const clickable = t.closest('a, button, [role="button"], input, textarea, label');
      if (clickable) {
        setVariant('link');
        setLabel('');
        return;
      }
      setVariant('default');
      setLabel('');
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [coarse, hidden]);

  if (coarse) return null;

  const color =
    theme === 'surprise' ? '#8B4513'
    : theme === 'dark'   ? '#2A4FD8'
    : theme === 'brand'  ? '#005698'
    :                      '#14532D';

  const ringSize =
    variant === 'media' ? 84
    : variant === 'link'  ? 56
    : variant === 'text'  ? 4
    :                       36;

  const dotSize = variant === 'text' ? 14 : 6;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: hidden ? 0 : variant === 'text' ? 0 : 0.8,
          transition: 'width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s, background 0.2s',
          willChange: 'transform',
          background: variant === 'media' ? `${color}22` : 'transparent',
        }}
      />
      <div
        ref={dot}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: variant === 'text' ? '2px' : '50%',
          background: color,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: hidden ? 0 : 1,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s, border-radius 0.2s',
          willChange: 'transform',
        }}
      />
      <div
        ref={labelEl}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: hidden || !label ? 0 : 1,
          transition: 'opacity 0.2s',
          willChange: 'transform',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color,
          background: 'rgba(253,251,245,0.9)',
          padding: '4px 8px',
          borderRadius: 999,
          border: `1px solid ${color}33`,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
      <style>{`
        @media (pointer: fine) {
          html, body, a, button, [role="button"], input, textarea, label {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
