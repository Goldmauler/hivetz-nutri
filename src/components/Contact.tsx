import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Mail, MapPin, ArrowRight, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

type Props = { onEnquire: () => void };

const CONTACT = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 89 407 68881',
    copy: '+918940768881',
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
    copy: 'Hivetz Nutri India Pvt Ltd, B-103, Orbit 11, Akshaya 1432 Trichy Road, Coimbatore - 641018',
  },
  {
    icon: MapPin,
    label: 'Contact Address',
    value: '276/1A, Periyapatti',
    copy: '276/1A, Periyapatti',
  },
];

export default function Contact({ onEnquire }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow text-forest-800 dark:text-honey-300/70 mb-3">
              Contact
            </div>
            <h2 className="display-h text-4xl md:text-6xl text-forest-900 dark:text-honey-600">
              LET'S
              <br />
              FORMULATE.
            </h2>
            <p className="mt-6 max-w-md text-forest-900/75 dark:text-honey-700/80">
              Tell us your bird type, current FCR, and the challenge you're
              facing. A nutritionist will reply with a custom plan within 24
              hours.
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-3"
          >
            {CONTACT.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="glass rounded-2xl p-5 flex items-center gap-5"
              >
                <div
                  className="h-12 w-12 shrink-0 rounded-xl flex items-center justify-center
                             bg-forest-900/8 dark:bg-honey-400/15
                             text-forest-800 dark:text-honey-300"
                >
                  <c.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="eyebrow text-forest-900 dark:text-honey-200/70 mb-0.5">
                    {c.label}
                  </div>
                  <div className="font-medium text-forest-900 dark:text-honey-600 truncate">
                    {c.value}
                  </div>
                </div>
                <button
                  onClick={() => copy(c.copy, c.label)}
                  className="h-9 w-9 rounded-lg flex items-center justify-center
                             border border-forest-900/15 dark:border-honey-400/20
                             hover:bg-forest-900/5 dark:hover:bg-honey-400/10
                             text-forest-800 dark:text-honey-300 transition"
                  aria-label={`Copy ${c.label}`}
                >
                  <Copy size={14} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
