import { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

type Cell = {
  x: number;
  y: number;
  vy: number;
  size: number;
  rot: number;
  vrot: number;
  alpha: number;
  pulse: number;
  /** index into LOGO (Hivetz theme only) */
  hue: number;
};

// the six molecule colours of the Hivetz logo
const LOGO: [number, number, number][] = [
  [244, 155, 15], [128, 199, 221], [217, 37, 139], [100, 27, 162], [109, 206, 107], [230, 65, 58],
];

export default function HoneycombCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const cells: Cell[] = [];

    const color =
      theme === 'surprise' ? [245, 166, 35]   // amber
      : theme === 'dark'   ? [77, 127, 255]   // blue
      :                      [22, 101, 52];   // forest (and the Hivetz theme's fallback)
    const molecules = theme === 'brand';

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const reset = (c: Cell, fromTop = false) => {
      c.x = Math.random() * w;
      c.y = fromTop ? -20 - Math.random() * h * 0.3 : h + 20 + Math.random() * h * 0.5;
      c.size = 4 + Math.random() * 14;
      c.vy = -0.18 - Math.random() * 0.42;
      c.rot = Math.random() * Math.PI;
      c.vrot = (Math.random() - 0.5) * 0.004;
      c.alpha = 0.08 + Math.random() * 0.22;
      c.pulse = Math.random() * Math.PI * 2;
      c.hue = Math.floor(Math.random() * LOGO.length);
    };

    const count = Math.min(48, Math.floor((w * h) / 18000));
    for (let i = 0; i < count; i++) {
      const c: Cell = { x: 0, y: 0, vy: 0, size: 0, rot: 0, vrot: 0, alpha: 0, pulse: 0, hue: 0 };
      reset(c);
      c.y = Math.random() * h;
      cells.push(c);
    }

    let mx = -1, my = -1;
    const move = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const leave = () => { mx = -1; my = -1; };
    window.addEventListener('mousemove', move);
    canvas.addEventListener('mouseleave', leave);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const drawHex = (cx: number, cy: number, r: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.18})`;
      ctx.fill();
      ctx.restore();
    };

    // Hivetz theme: the hexagons become the logo's glossy spheres, one colour each
    const drawSphere = (cx: number, cy: number, r: number, rgb: [number, number, number], alpha: number) => {
      const g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
      g.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, alpha * 2.2)})`);
      g.addColorStop(0.35, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Math.min(1, alpha * 2)})`);
      g.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha * 0.9})`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    };

    let t = 0;
    const loop = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      for (const c of cells) {
        c.y += c.vy;
        c.rot += c.vrot;
        c.pulse += 0.02;

        // Subtle cursor repel
        if (mx >= 0) {
          const dx = c.x - mx;
          const dy = c.y - my;
          const d2 = dx * dx + dy * dy;
          const r = 140;
          if (d2 < r * r) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / r) * 0.7;
            c.x += (dx / d) * f;
            c.y += (dy / d) * f;
          }
        }

        const a = c.alpha * (0.7 + Math.sin(c.pulse) * 0.3);
        if (molecules) drawSphere(c.x, c.y, c.size * 0.6, LOGO[c.hue], a);
        else drawHex(c.x, c.y, c.size, c.rot, a);

        if (c.y < -40) reset(c, false);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', move);
      canvas.removeEventListener('mouseleave', leave);
    };
  }, [theme]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
    />
  );
}
