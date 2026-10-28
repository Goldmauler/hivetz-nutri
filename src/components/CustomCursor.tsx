import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

type Variant = 'default' | 'link' | 'media' | 'text';

/**
 * A ring that follows the pointer and grows over links (with an optional label). The system
 * pointer stays visible: it is drawn by the OS and never lags, however busy the page is. The
 * ring eases by elapsed time, not per frame, so it hugs the pointer at any frame rate, and it
 * uses no blend mode (a blended layer made the browser recomposite the page on every move).
 */
export default function CustomCursor() {
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

    let mx = -100;
    let my = -100;
    let rx = mx;
    let ry = my;
    let seen = false;
    let rafId = 0;
    let last = performance.now();

    const place = () => {
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (labelEl.current) labelEl.current.style.transform = `translate3d(${rx}px, ${ry + 30}px, 0) translate(-50%, 0)`;
    };

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!seen) {
        // first sighting: start on the pointer instead of sweeping in from a corner
        seen = true;
        rx = mx;
        ry = my;
        place();
        setHidden(false);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const k = 1 - Math.exp(-dt * 38); // ~95 % of the way in 80 ms
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      place();
      rafId = requestAnimationFrame(tick);
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest<HTMLElement>('[data-cursor]');
      if (a) {
        setVariant((a.dataset.cursor as Variant) || 'link');
        setLabel(a.dataset.cursorLabel || '');
        return;
      }
      setVariant(t.closest('a, button, [role="button"], input, textarea, select, label') ? 'link' : 'default');
      setLabel('');
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => seen && setHidden(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [coarse]);

  if (coarse) return null;

  const color =
    theme === 'surprise' ? '#8B4513'
    : theme === 'dark'   ? '#2A4FD8'
    : theme === 'brand'  ? '#005698'
    :                      '#14532D';

  const ringSize =
    variant === 'media' ? 72
    : variant === 'link'  ? 46
    :                       30;

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
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: hidden || variant === 'text' ? 0 : variant === 'default' ? 0.45 : 0.8,
          transition: 'width 0.22s cubic-bezier(0.22, 1, 0.36, 1), height 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s, background-color 0.2s',
          willChange: 'transform',
          backgroundColor: variant === 'link' || variant === 'media' ? `${color}14` : 'transparent',
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
          background: 'rgba(253,251,245,0.92)',
          padding: '4px 8px',
          borderRadius: 999,
          border: `1px solid ${color}33`,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </>
  );
}
