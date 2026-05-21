import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Copy, Check, Phone, Mail, Sparkles, X } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme';

type Card = {
  step: string;
  title: string;
  command: string;
  display: string;
  icon: typeof Phone;
  copyValue: string;
  copyLabel: string;
};

const CARDS: Card[] = [
  {
    step: '1. CALL',
    title: 'Talk to a nutrition specialist',
    command: 'hivetz call --line=sales',
    display: '+91 89 407 68881',
    icon: Phone,
    copyValue: '+918940768881',
    copyLabel: 'Phone number copied',
  },
  {
    step: '2. EMAIL',
    title: 'Send us your specs',
    command: 'hivetz mail --to=info',
    display: 'info@florabiochem.com',
    icon: Mail,
    copyValue: 'info@florabiochem.com',
    copyLabel: 'Email copied',
  },
];

const CARD_DELAYS = [0.2, 0.35];

export default function GetStarted() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { theme } = useTheme();
  const isSurprise = theme === 'surprise';
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      id="get-started"
      ref={ref}
      className="relative border-t border-forest-900/10 dark:border-honey-400/10 overflow-hidden"
      style={{
        minHeight: revealed ? '70vh' : '520px',
        ...(isSurprise && !revealed ? { backgroundColor: 'rgba(252, 237, 214, 1)' } : {}),
      }}
    >
      {/* ── Surprise_cick reveal image — bright, no overlay ── */}
      <AnimatePresence>
        {revealed && (
          <motion.img
            key="surprise-reveal"
            src="/Surprise_cick.png"
            alt=""
            aria-hidden
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none select-none"
            draggable={false}
          />
        )}
      </AnimatePresence>

      {/* ── Normal backgrounds (hidden when revealed) ── */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="normal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Surprise theme chick */}
            <img
              src="/Hivetz_chick.png"
              alt=""
              aria-hidden
              className={`${isSurprise ? 'block' : 'hidden'} absolute inset-0 w-full h-full object-contain object-center select-none`}
              draggable={false}
            />
            {/* Light EGG */}
            <img
              src="/EGG_Light.png"
              alt=""
              aria-hidden
              className={`${!isSurprise ? 'block dark:hidden' : 'hidden'} absolute inset-0 w-full h-full object-contain object-center select-none`}
              draggable={false}
            />
            {/* Dark EGG */}
            <img
              src="/EGG_Dark.png"
              alt=""
              aria-hidden
              className={`${!isSurprise ? 'hidden dark:block' : 'hidden'} absolute inset-0 w-full h-full object-contain object-center select-none`}
              draggable={false}
            />
            {/* Edge vignette */}
            <div
              className="absolute inset-0"
              style={isSurprise
                ? { background: 'linear-gradient(to right, rgba(252,237,214,0.65) 0%, transparent 30%, transparent 70%, rgba(252,237,214,0.65) 100%)' }
                : { background: 'linear-gradient(to right, var(--tw-gradient-from, rgba(253,251,245,0.6)) 0%, transparent 30%, transparent 70%, rgba(253,251,245,0.6) 100%)' }
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Close button (only when revealed) ── */}
      <AnimatePresence>
        {revealed && (
          <motion.button
            key="close-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            onClick={() => setRevealed(false)}
            className="absolute top-6 right-6 z-20 flex items-center gap-2
                       px-4 py-2 rounded-full
                       bg-black/40 backdrop-blur-md border border-white/20
                       text-white text-xs font-semibold tracking-wide
                       hover:bg-black/60 transition-colors"
          >
            <X size={13} /> Close
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Content (fades out when revealed) ── */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 container-x max-w-4xl py-24 md:py-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <div className={`eyebrow mb-4 ${isSurprise ? '!text-[#D4845A]' : 'text-forest-800 dark:text-honey-300/70'}`}>
                Open Conversations · Island-wide Delivery
              </div>
              <h2 className={`display-h text-4xl md:text-6xl ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
                GET STARTED.
              </h2>
              <p className={`mt-5 max-w-xl mx-auto ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-700/75'}`}>
                Two ways to start a conversation. Pick one. We'll route you to the
                right nutritionist within an hour.
              </p>

              {/* Reveal button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8"
              >
                <motion.button
                  onClick={() => setRevealed(true)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full
                              font-semibold text-sm tracking-wide overflow-hidden border
                              transition-all duration-300
                              ${isSurprise
                                ? 'bg-[#8B4513]/10 border-[#8B4513]/30 text-[#8B4513] hover:bg-[#8B4513]/20'
                                : 'bg-forest-900/6 border-forest-900/20 text-forest-900 dark:bg-honey-500/10 dark:border-honey-500/30 dark:text-honey-600 hover:bg-forest-900/12 dark:hover:bg-honey-500/18'
                              }`}
                >
                  {/* Shimmer */}
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  />
                  <Sparkles size={15} />
                  <span className="relative">Wanna see what Hivetz can do?</span>
                </motion.button>
              </motion.div>
            </motion.div>

            <div className="space-y-6">
              {CARDS.map((c, i) => (
                <CommandCard
                  key={c.step}
                  card={c}
                  delay={CARD_DELAYS[i]}
                  inView={inView}
                  isSurprise={isSurprise}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CommandCard({
  card,
  delay,
  inView,
  isSurprise,
}: {
  card: Card;
  delay: number;
  inView: boolean;
  isSurprise: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const Icon = card.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(card.copyValue);
      setCopied(true);
      toast.success(card.copyLabel);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Could not copy');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="flex items-start justify-between mb-2 px-1 gap-2">
        <div className={`flex items-center gap-2 eyebrow font-bold flex-wrap
          ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-200'}`}>
          <Icon size={14} className="flex-shrink-0" />
          <span className="whitespace-nowrap">{card.step}</span>
          <span className="font-semibold hidden sm:inline">— {card.title}</span>
        </div>
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.82 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className={`eyebrow flex items-center gap-1.5 transition-colors flex-shrink-0
            ${isSurprise
              ? '!text-[#D4845A] hover:!text-[#8B4513]'
              : 'text-forest-800/80 dark:text-honey-300/80 hover:text-forest-900 dark:hover:text-honey-200'
            }`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'COPIED' : 'COPY'}
        </motion.button>
      </div>

      <p className={`sm:hidden eyebrow font-semibold mb-2 px-1
        ${isSurprise ? 'text-[#5C2D0A]/70' : 'text-forest-900/70 dark:text-honey-200/70'}`}>
        {card.title}
      </p>

      <motion.div
        whileHover={{
          y: -2,
          boxShadow: isSurprise
            ? '0 0 0 2px rgba(212,132,90,0.3), 0 8px 32px rgba(139,69,19,0.20)'
            : '0 0 0 2px rgba(34,85,34,0.25), 0 8px 32px rgba(34,85,34,0.18)',
        }}
        transition={{ duration: 0.25 }}
        className="terminal glass rounded-xl px-5 py-4 flex items-center gap-4"
        style={isSurprise ? {
          background: 'linear-gradient(180deg, rgba(245,166,35,0.06) 0%, rgba(212,132,90,0.10) 100%)',
          border: '1px solid rgba(139,69,19,0.18)',
          color: '#5C2D0A',
        } : {}}
      >
        <div className="flex items-center gap-3 min-w-0 overflow-hidden">
          <span className={`font-bold flex-shrink-0 ${isSurprise ? 'text-[#D4845A]' : 'text-forest-700 dark:text-honey-400'}`}>
            $
          </span>
          <span className="min-w-0 overflow-hidden">
            <span className="opacity-70 text-xs md:text-sm">{card.command}</span>{' '}
            <span className="terminal-highlight text-xs md:text-sm break-all">{card.display}</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
