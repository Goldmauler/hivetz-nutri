import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { PLANT_URL } from '../data/links';

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
    { label: 'Quality',              href: '#rnd' },
  ],
  Company: [
    { label: 'About Us',             href: '#about' },
    { label: 'Our Plant · 3D tour',  href: PLANT_URL },
    { label: 'Contact',              href: '#contact' },
  ],
};

/* Approximate path length for the SVG text — used for draw-stroke */
const STROKE_LEN = 4200;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordRef   = useRef<HTMLDivElement>(null);

  /* slide-up when footer enters viewport */
  const inView = useInView(footerRef, { once: true, amount: 0.05 });

  /* inView trigger specifically for the wordmark */
  const wordInView = useInView(wordRef, { once: true, amount: 0.5 });

  /* parallax on the wordmark */
  const { scrollYProgress } = useScroll({
    target: wordRef,
    offset: ['start end', 'end start'],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);


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

      {/* ── 1. COLUMNS + NEWSLETTER ── */}
      <div className="container-x pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">

          {Object.entries(LINKS).map(([col, items], ci) => (
            <motion.div
              key={col}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 * ci }}
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

          {/* Newsletter — column index 3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="col-span-2 md:col-span-1"
          >
            <h4 className="eyebrow text-forest-900/80 dark:text-[#1a3490] mb-5">
              Get in touch
            </h4>
            <ul className="space-y-3 text-sm text-forest-900 dark:text-[#1a3490] leading-relaxed">
              <li className="flex gap-2"><Phone size={15} className="mt-0.5 shrink-0" /><a href="tel:+917010071262" className="underline-anim">+91 70100 71262</a></li>
              <li className="flex gap-2"><Mail size={15} className="mt-0.5 shrink-0" /><a href="mailto:info@florabiochem.com" className="underline-anim">info@florabiochem.com</a></li>
              <li className="flex gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /><span>B-103, Orbit 11, Akshaya 1432 Trichy Road, Coimbatore 641 018</span></li>
            </ul>

            <div className="mt-6 flex items-center gap-3
                            text-forest-900/80 dark:text-[#1a3490]">
              {[
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/hivetz/posts/?feedView=all' },
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
        transition={{ duration: 0.5, delay: 0.4 }}
        className="container-x py-5
                   flex flex-col sm:flex-row items-start sm:items-center
                   justify-between gap-3
                   text-xs text-forest-900/80 dark:text-[#1a3490]"
      >
        <span>© {new Date().getFullYear()} Flora Biochem Private Limited. Hivetz is our brand.</span>
        <div className="flex items-center gap-5">
          {[
            { l: 'Our plant · 3D tour', href: PLANT_URL },
            { l: 'LinkedIn', href: 'https://www.linkedin.com/company/hivetz/' },
          ].map(({ l, href }) => (
            <a key={l} href={href}
               className="hover:text-forest-900 dark:hover:text-[#142A75] transition-colors">
              {l}
            </a>
          ))}
        </div>
      </motion.div>

      {/* ── 4. WORDMARK with draw-stroke animation ── */}
      <div ref={wordRef} className="overflow-hidden select-none" aria-hidden>
        <motion.div style={{ y: wordY }}>
          <svg
            viewBox="0 0 1000 130"
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.text
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
              /* draw-stroke: animate from full offset → 0 */
              initial={{ strokeDasharray: STROKE_LEN, strokeDashoffset: STROKE_LEN, opacity: 0 }}
              animate={
                wordInView
                  ? { strokeDashoffset: 0, opacity: 1 }
                  : {}
              }
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.1 }}
            >
              HIVETZ
            </motion.text>
          </svg>
        </motion.div>
      </div>

    </motion.footer>
  );
}
