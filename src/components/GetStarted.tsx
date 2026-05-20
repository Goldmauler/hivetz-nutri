import { motion, useInView } from 'framer-motion';
import { Copy, Check, Phone, Mail } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

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

export default function GetStarted() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      id="get-started"
      ref={ref}
      className="relative py-24 md:py-32 border-t border-forest-900/10 dark:border-honey-400/10"
    >
      <div className="container-x max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="eyebrow text-forest-800 dark:text-honey-300/70 mb-4">
            Open Conversations · Pan-India Delivery
          </div>
          <h2 className="display-h text-4xl md:text-6xl text-forest-900 dark:text-honey-600">
            GET STARTED.
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-forest-900 dark:text-honey-700/75">
            Two ways to start a conversation. Pick one. We'll route you to the
            right nutritionist within an hour.
          </p>
        </motion.div>

        <div className="space-y-6">
          {CARDS.map((c, i) => (
            <CommandCard
              key={c.step}
              card={c}
              delay={0.2 + i * 0.15}
              inView={inView}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-center mt-10 eyebrow text-forest-900/80 dark:text-honey-200/50"
        >
          Trial samples available · MOQ 500 kg
        </motion.p>
      </div>
    </section>
  );
}

function CommandCard({
  card,
  delay,
  inView,
}: {
  card: Card;
  delay: number;
  inView: boolean;
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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2 eyebrow font-bold text-forest-900 dark:text-honey-200">
          <Icon size={14} />
          <span>{card.step}</span>
          <span className="font-semibold">— {card.title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="eyebrow text-forest-800/80 dark:text-honey-300/80
                     hover:text-forest-900 dark:hover:text-honey-200
                     flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>

      <motion.div
        whileHover={{ y: -2 }}
        className="terminal glass rounded-xl px-5 py-4 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-forest-700 dark:text-honey-400 font-bold">
            $
          </span>
          <span className="truncate">
            <span className="opacity-70">{card.command}</span>{' '}
            <span className="terminal-highlight">{card.display}</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
