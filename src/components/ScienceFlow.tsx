import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FlaskConical, Microscope, Beaker, TestTube, FileCheck } from 'lucide-react';

const STEPS = [
  { icon: FlaskConical, label: 'SAMPLE',  sub: 'Intake & ID'      },
  { icon: Beaker,       label: 'PREP',    sub: 'Wet chemistry'    },
  { icon: Microscope,   label: 'HPLC',    sub: 'Vitamin titre'    },
  { icon: TestTube,     label: 'AAS',     sub: 'Mineral assay'    },
  { icon: FileCheck,    label: 'CoA',     sub: '18hr turnaround'  },
];

export default function ScienceFlow({ isSurprise }: { isSurprise: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const stroke = isSurprise
    ? '#8B4513'
    : 'currentColor';

  return (
    <div ref={ref} className="mt-14 mb-2">
      <div className={`eyebrow mb-5 ${isSurprise ? '!text-[#D4845A]' : 'text-forest-800 dark:text-honey-300/70'}`}>
        The validation pipeline
      </div>

      {/* Desktop: horizontal flow */}
      <div className={`hidden md:block relative rounded-3xl p-8 border
        ${isSurprise
          ? 'bg-[rgba(252,237,214,0.55)] border-[#8B4513]/15'
          : 'bg-cream-50/40 dark:bg-cream-50/35 border-forest-900/8 dark:border-honey-400/20'
        }`}>
        <svg
          viewBox="0 0 1000 80"
          preserveAspectRatio="none"
          className={`absolute left-8 right-8 top-1/2 -translate-y-1/2 h-20 pointer-events-none
            ${isSurprise ? 'text-[#8B4513]' : 'text-forest-700 dark:text-honey-500'}`}
          aria-hidden
        >
          <motion.path
            d="M 20 40 Q 200 -10 380 40 T 740 40 T 980 40"
            stroke={stroke}
            strokeWidth="1.5"
            strokeDasharray="4 6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
          <motion.circle
            r="4"
            fill={stroke}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M 20 40 Q 200 -10 380 40 T 740 40 T 980 40"
            />
          </motion.circle>
        </svg>

        <div className="relative grid grid-cols-5 gap-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-3
                    ${isSurprise
                      ? 'bg-[#8B4513] text-[#FDF6E3]'
                      : 'bg-forest-900 text-cream-50 dark:bg-honey-500 dark:text-ink-300'
                    }`}
                  style={{ boxShadow: isSurprise
                    ? '0 8px 20px -8px rgba(139,69,19,0.45)'
                    : '0 8px 20px -8px rgba(20,83,45,0.45)' }}
                >
                  <Icon size={20} />
                </motion.div>
                <div className={`font-display font-bold text-sm tracking-wider
                  ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
                  {s.label}
                </div>
                <div className={`text-[11px] mt-0.5
                  ${isSurprise ? 'text-[#5C2D0A]/65' : 'text-forest-900/65 dark:text-honey-700/65'}`}>
                  {s.sub}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className={`md:hidden rounded-2xl p-5 border space-y-3
        ${isSurprise
          ? 'bg-[rgba(252,237,214,0.55)] border-[#8B4513]/15'
          : 'bg-cream-50/40 dark:bg-cream-50/35 border-forest-900/8 dark:border-honey-400/20'
        }`}>
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0
                ${isSurprise
                  ? 'bg-[#8B4513] text-[#FDF6E3]'
                  : 'bg-forest-900 text-cream-50 dark:bg-honey-500 dark:text-ink-300'
                }`}>
                <Icon size={16} />
              </div>
              <div>
                <div className={`font-display font-bold text-sm
                  ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
                  {s.label}
                </div>
                <div className={`text-[11px]
                  ${isSurprise ? 'text-[#5C2D0A]/65' : 'text-forest-900/65 dark:text-honey-700/65'}`}>
                  {s.sub}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
