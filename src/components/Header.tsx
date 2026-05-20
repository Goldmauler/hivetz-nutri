import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Linkedin, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { label: 'Home',     href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About',    href: '#about' },
  { label: 'R&D',      href: '#rnd' },
  { label: 'Contact',  href: '#contact' },
];

type Props = { onEnquire: () => void };

export default function Header({ onEnquire }: Props) {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50"
    >
      {/* Backdrop */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none
                   bg-cream-50/92 backdrop-blur-xl
                   border-b border-forest-900/10 dark:border-honey-500/15"
      />

      <div className="relative container-x">
        <div className="flex items-center justify-between h-30 md:h-25">

          {/* Logo — large, pinned left */}
          <a href="#home" className="flex-shrink-0 mr-auto">
            {/* Light mode logo */}
            <motion.img
              src="/HivetzLogoLight.png"
              alt="Hivetz Nutri"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="block dark:hidden h-40 md:h-21 w-auto select-none"
              draggable={false}
            />
            {/* Dark mode logo */}
            <motion.img
              src="/HivetzLogoDark.png"
              alt="Hivetz Nutri"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="hidden dark:block h-40 md:h-21 w-auto select-none"
              draggable={false}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1
                          text-[11px] font-semibold tracking-[0.22em] uppercase">
            {NAV.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05 }}
                className="px-5 py-2 rounded-full transition-colors underline-anim
                           text-forest-900 hover:bg-forest-900/5
                           dark:text-honey-700 dark:hover:bg-honey-500/10"
              >
                {n.label}
              </motion.a>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3 md:gap-4">

            {/* Social icons */}
            <div className="hidden md:flex items-center gap-3
                            text-forest-900 dark:text-honey-600/80">
              <a href="https://www.linkedin.com/company/hivetz/posts/?feedView=all" target="_blank" rel="noreferrer"
                 aria-label="LinkedIn"
                 className="hover:text-forest-900 dark:hover:text-honey-700 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:info@florabiochem.com"
                 aria-label="Email"
                 className="hover:text-forest-900 dark:hover:text-honey-700 transition-colors">
                <Mail size={18} />
              </a>
            </div>

            {/* Separator */}
            <div className="hidden md:block h-5 w-px
                            bg-forest-900/15 dark:bg-honey-500/20" />

            {/* THEME label */}
            <span className="hidden md:inline eyebrow
                             text-forest-900 dark:text-honey-700/70">
              Theme
            </span>

            <ThemeToggle />

            {/* Enquire pill */}
            <button
              onClick={onEnquire}
              className="hidden md:inline-flex items-center justify-center
                         px-5 py-2 rounded-full
                         text-[11px] font-semibold tracking-[0.18em] uppercase
                         border transition-all duration-300
                         border-forest-900 text-forest-900
                         hover:bg-forest-900 hover:text-white
                         dark:border-honey-600 dark:text-honey-700
                         dark:hover:bg-honey-600 dark:hover:text-white"
            >
              Enquire
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-full
                         border border-forest-900/15 dark:border-honey-500/20
                         text-forest-900 dark:text-honey-700"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden lg:hidden"
        >
          <div className="py-4 space-y-1">
            {NAV.map(n => (
              <a key={n.href} href={n.href}
                 onClick={() => setMobileOpen(false)}
                 className="block px-4 py-3 rounded-xl text-sm font-semibold
                            tracking-wide uppercase
                            text-forest-900 dark:text-honey-700
                            hover:bg-forest-900/5 dark:hover:bg-honey-500/10">
                {n.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onEnquire(); }}
              className="w-full btn-primary mt-2">
              Quick Enquiry
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll hairline */}
      <div className={`absolute bottom-0 inset-x-0 h-px transition-opacity duration-500
                       ${scrolled ? 'opacity-100' : 'opacity-0'}
                       bg-gradient-to-r from-transparent
                       via-forest-900/15 dark:via-honey-500/25
                       to-transparent`} />
    </motion.header>
  );
}
