import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Mail, Twitter, ArrowRight, Github } from 'lucide-react';
import toast from 'react-hot-toast';

const LINKS = {
  Products: [
    { label: 'Vitamin Premixes',     href: '#products' },
    { label: 'Feed Additives',       href: '#products' },
    { label: 'Anti Coccidials',      href: '#products' },
    { label: 'Disinfectants',        href: '#products' },
    { label: 'Probiotics & Enzymes', href: '#products' },
  ],
  Resources: [
    { label: 'Product Catalogue',    href: '#products' },
    { label: 'R&D Lab',              href: '#rnd' },
    { label: 'Technical Support',    href: '#contact' },
    { label: 'Sample Request',       href: '#contact' },
    { label: 'Quality Policy',       href: '#' },
  ],
  Company: [
    { label: 'About Us',             href: '#about' },
    { label: 'Contact',              href: '#contact' },
    { label: 'Careers',              href: '#' },
    { label: 'Privacy Policy',       href: '#' },
    { label: 'Terms of Use',         href: '#' },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordRef   = useRef<HTMLDivElement>(null);
  const [email, setEmail]     = useState('');
  const [sending, setSending] = useState(false);

  /* slide-up when footer enters viewport */
  const inView = useInView(footerRef, { once: true, amount: 0.05 });

  /* parallax on the wordmark */
  const { scrollYProgress } = useScroll({
    target: wordRef,
    offset: ['start end', 'end start'],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    toast.success("Subscribed! We'll be in touch.");
    setEmail('');
  };

  return (
    <motion.footer
      ref={footerRef}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden
                 bg-cream-50 dark:bg-cream-50
                 border-t-2 border-forest-900/15 dark:border-[#1a3490]/25"
      aria-label="Site footer"
    >

      {/* ── 1. COLUMNS + NEWSLETTER ── in normal flow, no overlap */}
      <div className="container-x pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">

          {Object.entries(LINKS).map(([col, items], ci) => (
            <motion.div
              key={col}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + ci * 0.08 }}
            >
              <h4 className="eyebrow text-forest-900/80 dark:text-[#1a3490] mb-5">
                {col}
              </h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-forest-900 dark:text-[#1a3490]
                                 hover:text-forest-900 dark:hover:text-[#142A75]
                                 transition-colors duration-200 underline-anim"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-2 md:col-span-1"
          >
            <h4 className="eyebrow text-forest-900/80 dark:text-[#1a3490] mb-5">
              Stay Updated
            </h4>
            <p className="text-sm text-forest-900 dark:text-[#1a3490] leading-relaxed mb-4">
              Nutrition insights, product launches and technical updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-lg text-sm
                           bg-white border border-forest-900/15 dark:border-[#1a3490]/25
                           text-forest-900 dark:text-[#1a3490]
                           placeholder:text-forest-900/35 dark:placeholder:text-honey-700/35
                           focus:outline-none focus:border-forest-700 dark:focus:border-honey-500
                           transition-colors"
              />
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-4 py-2.5
                           rounded-lg text-sm font-semibold
                           bg-forest-900 text-cream-50
                           dark:bg-[#1a3490] dark:text-white
                           hover:bg-forest-800 dark:hover:bg-[#142A75]
                           transition-colors disabled:opacity-60"
              >
                {sending ? 'Subscribing…' : <> Subscribe <ArrowRight size={14} /></>}
              </motion.button>
            </form>

            <div className="mt-6 flex items-center gap-3
                            text-forest-900/80 dark:text-[#1a3490]">
              {[
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Twitter,  label: 'Twitter',  href: '#' },
                { Icon: Github,   label: 'GitHub',   href: '#' },
                { Icon: Mail,     label: 'Email',    href: 'mailto:info@florabiochem.com' },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                   className="hover:text-forest-900 dark:hover:text-[#142A75] transition-colors">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── 2. DIVIDER ── */}
      <div className="divider mx-6 md:mx-10" />

      {/* ── 3. BOTTOM BAR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="container-x py-5
                   flex flex-col sm:flex-row items-start sm:items-center
                   justify-between gap-3
                   text-xs text-forest-900/80 dark:text-[#1a3490]"
      >
        <span>© {new Date().getFullYear()} Hivetz Nutri Pvt Ltd. All rights reserved.</span>
        <div className="flex items-center gap-5">
          {['Privacy', 'Terms', 'Quality Policy'].map(l => (
            <a key={l} href="#"
               className="hover:text-forest-900 dark:hover:text-[#142A75] transition-colors">
              {l}
            </a>
          ))}
        </div>
      </motion.div>

      {/* ── 4. WORDMARK — in normal flow, BELOW everything, no overlap ── */}
      <div ref={wordRef} className="overflow-hidden select-none" aria-hidden>
        <motion.div style={{ y: wordY }}>
          <svg
            viewBox="0 0 1000 130"
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="110"
              textAnchor="middle"
              fontFamily="'Playfair Display', Georgia, serif"
              fontWeight="900"
              fontSize="138"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              letterSpacing="-3"
              className="text-forest-900/12 dark:text-[#1a3490]/40"
            >
              HIVETZ NUTRI
            </text>
          </svg>
        </motion.div>
      </div>

    </motion.footer>
  );
}
