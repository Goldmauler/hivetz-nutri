import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { chatScripts, type ChatStep } from '../data/demoChat';
import { useTheme } from '../hooks/useTheme';

export default function DemoChat() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { theme } = useTheme();
  const isSurprise = theme === 'surprise';

  const [activeId, setActiveId] = useState(chatScripts[0].id);
  const [played, setPlayed] = useState<ChatStep[]>([]);
  const [typing, setTyping] = useState(false);

  const active = chatScripts.find((s) => s.id === activeId)!;

  useEffect(() => {
    let cancelled = false;
    setPlayed([]);
    setTyping(false);

    const run = async () => {
      for (let i = 0; i < active.steps.length; i++) {
        if (cancelled) return;
        const step = active.steps[i];
        if (step.role === 'agent') {
          setTyping(true);
          await wait(step.delay ?? 600);
          if (cancelled) return;
          setTyping(false);
        }
        setPlayed((p) => [...p, step]);
        await wait(step.role === 'user' ? 200 : 400);
      }
    };

    if (inView) run();
    return () => { cancelled = true; };
  }, [activeId, inView]);

  const textPrimary   = isSurprise ? 'text-[#5C2D0A]'      : 'text-forest-900 dark:text-honey-600';
  const textSecondary = isSurprise ? 'text-[#5C2D0A]/75'   : 'text-forest-900 dark:text-honey-700/75';
  const eyebrowColor  = isSurprise ? 'text-[#D4845A]'       : 'text-forest-800 dark:text-honey-300/70';
  const borderColor   = isSurprise ? 'border-[#8B4513]/15'  : 'border-forest-900/10 dark:border-honey-400/15';
  const glassStyle    = isSurprise ? {
    background: 'rgba(252,237,214,0.7)',
    border: '1px solid rgba(139,69,19,0.15)',
  } : {};

  return (
    <section
      ref={ref}
      className={`relative py-20 md:py-28 border-t ${borderColor} overflow-hidden`}
    >
      <div className="container-x">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className={`eyebrow ${eyebrowColor} mb-3`}>
            From our product brochure
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className={`display-h text-4xl md:text-6xl ${textPrimary}`}>
              ASK HIVETZ
              <br />
              ANYTHING.
            </h2>
            <p className={`max-w-md text-sm leading-relaxed ${textSecondary}`}>
              Pick a question to see the answer from the Hivetz product brochure:
              doses, compositions and packs, as printed. For anything else, message us.
            </p>
          </div>
        </motion.div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full overflow-hidden"
        >
          <div
            className="glass rounded-2xl overflow-hidden w-full"
            style={glassStyle}
          >
            {/* Window chrome */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${borderColor}`}>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className={`eyebrow ${isSurprise ? 'text-[#8B4513]' : 'text-forest-900 dark:text-honey-200/70'} flex items-center gap-1.5`}>
                <Sparkles size={11} /> hivetz-advisor
              </div>
              <div className="w-10" />
            </div>

            {/* Questions — horizontal scroll pills on mobile, sidebar on desktop */}
            <div className={`border-b lg:border-b-0 ${borderColor} lg:hidden`}>
              <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
                {chatScripts.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition whitespace-nowrap
                      ${s.id === activeId
                        ? isSurprise
                          ? 'bg-[#8B4513] text-[rgb(252,237,214)] border-[#8B4513]'
                          : 'bg-forest-900 text-cream-50 border-forest-900 dark:bg-honey-500 dark:border-honey-500 dark:text-white'
                        : isSurprise
                          ? 'border-[#8B4513]/20 text-[#5C2D0A]'
                          : 'border-forest-900/15 dark:border-honey-400/20 text-forest-900 dark:text-honey-700/75'
                      }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-[260px_1fr]">
              {/* Sidebar — desktop only */}
              <div className={`hidden lg:block border-r ${borderColor} p-4 space-y-1`}>
                <div className={`eyebrow ${isSurprise ? 'text-[#D4845A]' : 'text-forest-900 dark:text-honey-200/70'} px-2 mb-3`}>
                  Sample Questions
                </div>
                {chatScripts.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    className={`w-full text-left text-sm px-3 py-2.5 rounded-lg transition
                      ${s.id === activeId
                        ? isSurprise
                          ? 'bg-[#8B4513]/12 text-[#5C2D0A]'
                          : 'bg-forest-900/8 dark:bg-honey-400/15 text-forest-900 dark:text-honey-200'
                        : isSurprise
                          ? 'hover:bg-[#8B4513]/6 text-[#5C2D0A]/80'
                          : 'hover:bg-forest-900/5 dark:hover:bg-honey-400/8 text-forest-900 dark:text-honey-700/75'
                      }`}
                  >
                    <span className="block leading-snug">{s.title}</span>
                  </button>
                ))}
              </div>

              {/* Chat body */}
              <div className="p-4 md:p-6 min-h-[360px] flex flex-col overflow-hidden">
                <div className="flex-1 space-y-4 font-mono text-[12px] md:text-[13.5px] overflow-hidden">
                  <AnimatePresence>
                    {played.map((step, i) => (
                      <motion.div
                        key={`${activeId}-${i}`}
                        initial={step.role === 'user' ? { opacity: 0, x: -16 } : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        {step.role === 'user' ? (
                          <div className="flex gap-2 overflow-hidden">
                            <span className={`flex-shrink-0 ${isSurprise ? 'text-[#D4845A]' : 'text-forest-700 dark:text-honey-400'}`}>
                              ▸
                            </span>
                            <span className={`break-words min-w-0 ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
                              {step.content}
                            </span>
                          </div>
                        ) : (
                          <div className="pl-4 space-y-1 overflow-hidden">
                            {step.meta && (
                              <div className={`eyebrow tracking-[0.15em] ${isSurprise ? 'text-[#D4845A]/80' : 'text-forest-700/80 dark:text-honey-400/80'}`}>
                                › {step.meta}
                              </div>
                            )}
                            <TypedLine text={step.content} isSurprise={isSurprise} />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {typing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`pl-4 flex items-center gap-1 ${isSurprise ? 'text-[#8B4513]/60' : 'text-forest-900/80 dark:text-honey-700/60'}`}
                    >
                      <WaveDot delay={0} />
                      <WaveDot delay={0.15} />
                      <WaveDot delay={0.3} />
                    </motion.div>
                  )}
                </div>

                {/* Fake input */}
                <div className={`mt-5 flex items-center gap-2 px-3 py-2.5 rounded-xl border ${borderColor}`}>
                  <span className={`flex-shrink-0 ${isSurprise ? 'text-[#D4845A]' : 'text-forest-700 dark:text-honey-400'}`}>▸</span>
                  <span className={`font-mono text-xs flex-1 truncate ${isSurprise ? 'text-[#5C2D0A]/60' : 'text-forest-900/75 dark:text-honey-700/50'}`}>
                    Next question · anything else, WhatsApp +91 70100 71262
                  </span>
                  <button
                    className={`flex-shrink-0 h-7 w-7 rounded-lg flex items-center justify-center hover:scale-105 transition
                      ${isSurprise ? 'bg-[#8B4513] text-[rgb(252,237,214)]' : 'bg-forest-800 text-cream-50 dark:bg-honey-400 dark:text-ink-300'}`}
                    onClick={() => {
                      const idx = chatScripts.findIndex((s) => s.id === activeId);
                      setActiveId(chatScripts[(idx + 1) % chatScripts.length].id);
                    }}
                    aria-label="Next demo"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TypedLine({ text, isSurprise }: { text: string; isSurprise: boolean }) {
  const [out, setOut] = useState('');
  useEffect(() => {
    setOut('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 14);
    return () => window.clearInterval(id);
  }, [text]);
  return (
    <span className={`block leading-relaxed break-words ${isSurprise ? 'text-[#5C2D0A]/85' : 'text-forest-900/85 dark:text-honey-600/90'}`}>
      {out}
      {out.length < text.length && (
        <span className={`ml-0.5 inline-block w-1.5 h-3.5 animate-blink align-middle
          ${isSurprise ? 'bg-[#D4845A]' : 'bg-forest-700 dark:bg-honey-400'}`} />
      )}
    </span>
  );
}

function WaveDot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay, ease: 'easeInOut' }}
      className="h-1.5 w-1.5 rounded-full bg-current"
    />
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
