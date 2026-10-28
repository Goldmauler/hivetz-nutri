import { motion } from 'framer-motion';

// The logo's six molecules (orange r = 1, y up), in the order they pop in; orange comes last.
const DOTS = [
  { x: -0.93, y: -0.99, r: 0.12, c: '#e6413a', at: 0.1 },
  { x: -1.07, y: -0.56, r: 0.28, c: '#641ba2', at: 0.25 },
  { x: 1.01, y: -0.76, r: 0.34, c: '#6dce6b', at: 0.4 },
  { x: 1.03, y: 1.31, r: 0.34, c: '#d9258b', at: 0.55 },
  { x: -0.81, y: 0.92, r: 0.56, c: '#80c7dd', at: 0.72 },
  { x: 0, y: 0, r: 1, c: '#f49b0f', at: 1 },
];

/** Lighter (f > 0) or darker (f < 0) shade of a hex colour, for the glossy sphere gradients. */
function shade(hex: string, f: number) {
  const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const out = ch.map((c) => Math.round(f > 0 ? c + (255 - c) * f : c * (1 + f)));
  return `#${out.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

type Props = {
  /** 0..1: how far the logo has built (molecules pop in turn, the wordmark fills from the left) */
  p: number;
  /** mark height in px; the whole logo is 4.71 × this wide */
  size: number;
  /** unique per mounted instance, for the SVG gradient ids */
  id: string;
  /** colour of the unbuilt molecule placeholders */
  ghost?: string;
};

/**
 * The Hivetz logo, building itself: the six molecules in the logo's own colours and positions,
 * beside the real wordmark (cut from the logo artwork), laid out in the logo's proportions:
 * mark 190 units tall, a 15-unit gap, the wordmark 164 units tall and 5 units below the top.
 */
export default function HivetzLogo({ p, size: H, id, ghost = '#ece3d3' }: Props) {
  return (
    <div className="flex items-start" style={{ gap: (H * 15) / 190 }}>
      <svg viewBox="-1.35 -1.65 2.72 2.76" width={H} height={H} style={{ overflow: 'visible' }} aria-hidden>
        <defs>
          {DOTS.map((d, i) => (
            <radialGradient key={i} id={`${id}-${i}`} cx="0.5" cy="0.5" r="0.5" fx="0.34" fy="0.3">
              <stop offset="0" stopColor={shade(d.c, 0.62)} />
              <stop offset="0.5" stopColor={d.c} />
              <stop offset="1" stopColor={shade(d.c, -0.12)} />
            </radialGradient>
          ))}
        </defs>
        {DOTS.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={-d.y} r={d.r} fill={ghost} />
            <motion.circle
              cx={d.x}
              cy={-d.y}
              r={d.r}
              fill={`url(#${id}-${i})`}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={p >= d.at ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 14 }}
            />
          </g>
        ))}
      </svg>
      <span className="relative block" style={{ height: (H * 164) / 190, marginTop: (H * 5) / 190 }}>
        <img
          src="/brand-wordmark.webp"
          alt=""
          className="block h-full w-auto select-none"
          style={{ filter: 'grayscale(1) brightness(1.5)', opacity: 0.22 }}
          draggable={false}
        />
        <img
          src="/brand-wordmark.webp"
          alt="Hivetz"
          className="absolute inset-0 block h-full w-auto select-none"
          style={{
            WebkitMaskImage: `linear-gradient(90deg, #000 ${p * 112 - 12}%, transparent ${p * 112}%)`,
            maskImage: `linear-gradient(90deg, #000 ${p * 112 - 12}%, transparent ${p * 112}%)`,
          }}
          draggable={false}
        />
      </span>
    </div>
  );
}
