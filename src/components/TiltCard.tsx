import { ReactNode, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export default function TiltCard({
  children,
  className,
  max = 8,
  glare = true,
  onClick,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 250, damping: 22 });
  const sy = useSpring(ry, { stiffness: 250, damping: 22 });
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ry.set((x - 0.5) * 2 * max);
    rx.set(-(y - 0.5) * 2 * max);
    setPos({ x: x * 100, y: y * 100 });
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHovering(false);
  };

  const rxOut = useTransform(sx, (v) => `${v}deg`);
  const ryOut = useTransform(sy, (v) => `${v}deg`);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
      style={{
        ...style,
        rotateX: rxOut,
        rotateY: ryOut,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.22), transparent 40%)`,
            opacity: hovering ? 1 : 0,
            transition: 'opacity 0.25s',
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </motion.div>
  );
}
