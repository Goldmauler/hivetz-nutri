import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { chatScripts, type ChatStep } from '../data/demoChat';

export default function DemoChat() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

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
    return () => {
      cancelled = true;
    };
  }, [activeId, inView]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 border-t border-forest-900/10 dark:border-honey-400/10"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between gap-6 mb-10 flex-wrap"
        >
          <div>
            <div className="eyebrow text-forest-800 dark:text-honey-300/70 mb-3">
              See it in action
            </div>
            <h2 className="display-h text-4xl md:text-6xl text-forest-900 dark:text-honey-600">
              ASK HIVETZ
              <br />
              ANYTHING.
            </h2>
          </div>
          <p className="max-w-md text-forest-900 dark:text-honey-700/75">
            A working demo of the kind of advice our nutritionists give every
            day. Pick a question and watch a recommendation get drafted in real
            time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-3xl overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-forest-900/10 dark:border-honey-400/15">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="eyebrow text-forest-900 dark:text-honey-200/70 flex items-center gap-2">
              <Sparkles size={12} /> hivetz-advisor
            </div>
            <div className="w-12" />
          </div>

          <div className="grid lg:grid-cols-[280px_1fr]">
            {/* Sample questions sidebar */}
            <div className="border-b lg:border-b-0 lg:border-r border-forest-900/10 dark:border-honey-400/15 p-4 space-y-2">
              <div className="eyebrow text-forest-900 dark:text-honey-200/70 px-2 mb-2">
                Sample Questions
              </div>
              {chatScripts.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={`w-full text-left text-sm px-3 py-2.5 rounded-lg transition
                    ${
                      s.id === activeId
                        ? 'bg-forest-900/8 dark:bg-honey-400/15 text-forest-900 dark:text-honey-200'
                        : 'hover:bg-forest-900/5 dark:hover:bg-honey-400/8 text-forest-900 dark:text-honey-700/75'
                    }`}
                >
                  <span className="block leading-snug">{s.title}</span>
                </button>
              ))}
            </div>

            {/* Chat body */}
            <div className="p-5 md:p-7 min-h-[420px] flex flex-col">
              <div className="flex-1 space-y-4 font-mono text-[13.5px] md:text-sm">
                <AnimatePresence>
                  {played.map((step, i) => (
                    <motion.div
                      key={`${activeId}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.role === 'user' ? (
                        <div className="flex gap-3">
                          <span className="text-forest-700 dark:text-honey-400 select-none">
                            ▸
                          </span>
                          <span className="text-forest-900 dark:text-honey-600">
                            {step.content}
                          </span>
                        </div>
                      ) : (
                        <div className="pl-6 space-y-1.5">
                          {step.meta && (
                            <div className="eyebrow text-forest-700/80 dark:text-honey-400/80 tracking-[0.15em]">
                              › {step.meta}
                            </div>
                          )}
                          <TypedLine text={step.content} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pl-6 flex items-center gap-1 text-forest-900/80 dark:text-honey-700/60"
                  >
                    <Dot delay={0} />
                    <Dot delay={0.15} />
                    <Dot delay={0.3} />
                  </motion.div>
                )}
              </div>

              {/* Fake input */}
              <div className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-forest-900/15 dark:border-honey-400/20">
                <span className="text-forest-700 dark:text-honey-400">▸</span>
                <span className="font-mono text-sm text-forest-900/75 dark:text-honey-700/50 flex-1 truncate">
                  Type a question about premixes, FCR, mycotoxins…
                </span>
                <button
                  className="h-8 w-8 rounded-lg bg-forest-800 text-cream-50 dark:bg-honey-400 dark:text-ink-300
                             flex items-center justify-center hover:scale-105 transition"
                  onClick={() => {
                    // cycle through demo
                    const idx = chatScripts.findIndex((s) => s.id === activeId);
                    const next = chatScripts[(idx + 1) % chatScripts.length];
                    setActiveId(next.id);
                  }}
                  aria-label="Next demo"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TypedLine({ text }: { text: string }) {
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
    <span className="block text-forest-900/85 dark:text-honey-600/90 leading-relaxed">
      {out}
      {out.length < text.length && (
        <span className="ml-0.5 inline-block w-2 h-4 bg-forest-700 dark:bg-honey-400 animate-blink align-middle" />
      )}
    </span>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
      className="h-1.5 w-1.5 rounded-full bg-current"
    />
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
