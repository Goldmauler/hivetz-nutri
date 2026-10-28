import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Mail, MapPin, ArrowRight, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

type Props = { onEnquire: () => void };

const CONTACT = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 70100 71262',
    copy: '+917010071262',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@florabiochem.com',
    copy: 'info@florabiochem.com',
  },
  {
    icon: Mail,
    label: 'Email (Alt)',
    value: 'premixmuthu@gmail.com',
    copy: 'premixmuthu@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Head Office',
    value: 'B-103, Orbit 11, Akshaya 1432 Trichy Road, Coimbatore – 641 018',
    copy: 'Flora Biochem Private Limited, B-103, Orbit 11, Akshaya 1432 Trichy Road, Coimbatore - 641018',
  },
  {
    icon: MapPin,
    label: 'Contact Address',
    value: '276/1A, Periyapatti',
    copy: '276/1A, Periyapatti',
  },
];

const HEADLINE_WORDS = ["LET'S", 'FORMULATE.'];

export default function Contact({ onEnquire }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`${label} copied`);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 border-t border-forest-900/10 dark:border-honey-400/10"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* Left — headline with per-word bounce */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow text-forest-800 dark:text-honey-300/70 mb-3">
              Contact
            </div>

            <h2 className="display-h text-4xl md:text-6xl text-forest-900 dark:text-honey-600">
              {HEADLINE_WORDS.map((word, wi) => (
                <motion.span
                  key={word}
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + wi * 0.15,
                    type: 'spring',
                    stiffness: 300,
                    damping: 18,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <p className="mt-6 max-w-md text-forest-900/75 dark:text-honey-700/80 break-words">
              Tell us your bird type, your feed and what you need. The enquiry
              opens in WhatsApp, ready to send to our team.
            </p>

            <button
              onClick={onEnquire}
              className="mt-8 btn-primary group"
            >
              Open quick enquiry
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>

          {/* Right — contact cards slide from right with stagger */}
          <div className="space-y-3">
            {CONTACT.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4 }}
                className="glass rounded-2xl p-4 md:p-5 flex items-start gap-4 group"
              >
                <div
                  className="h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-xl flex items-center justify-center
                             bg-forest-900/8 dark:bg-honey-400/15
                             text-forest-800 dark:text-honey-300"
                >
                  <c.icon size={18} />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="eyebrow text-forest-900 dark:text-honey-200/70 mb-0.5">
                    {c.label}
                  </div>
                  <div className="font-medium text-forest-900 dark:text-honey-600 break-words text-sm md:text-base">
                    {c.value}
                  </div>
                </div>
                {/* Copy icon */}
                <motion.button
                  onClick={() => copy(c.copy, c.label)}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 h-8 w-8 md:h-9 md:w-9 rounded-lg flex items-center justify-center
                             border border-forest-900/15 dark:border-honey-400/20
                             hover:bg-forest-900/5 dark:hover:bg-honey-400/10
                             text-forest-800 dark:text-honey-300 transition-colors"
                  aria-label={`Copy ${c.label}`}
                >
                  <Copy size={13} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
