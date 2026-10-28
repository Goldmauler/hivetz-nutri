import { motion, useScroll, useTransform } from 'framer-motion';
import { Box, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SurpriseButton from './SurpriseButton';
import { useTheme } from '../hooks/useTheme';
import { PLANT_URL } from '../data/links';

const NAV = [
  { label: 'Home',     href: '/',         hash: ''        },
  { label: 'Products', href: '/products', hash: ''        },
  { label: 'About',    href: '/',         hash: 'about'   },
  { label: 'Founders', href: '/founders', hash: ''        },
  { label: 'R&D',      href: '/',         hash: 'rnd'     },
  { label: 'Contact',  href: '/',         hash: 'contact' },
];

type Props = { onEnquire: () => void };

function scrollToHash(hash: string) {
  const el = document.getElementById(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Header({ onEnquire }: Props) {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingHash, setPendingHash] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isSurprise = theme === 'surprise';
  const { isColour, art } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // After navigating to '/', scroll to the pending hash
  useEffect(() => {
    if (pendingHash && location.pathname === '/') {
      const t = setTimeout(() => {
        scrollToHash(pendingHash);
        setPendingHash('');
      }, 80);
      return () => clearTimeout(t);
    }
  }, [location.pathname, pendingHash]);

  function handleNavClick(e: React.MouseEvent, item: typeof NAV[number]) {
    if (!item.hash) return; // let Link handle pure page routes
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === '/') {
      scrollToHash(item.hash);
    } else {
      setPendingHash(item.hash);
      navigate('/');
    }
  }

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
        className={`absolute inset-0 pointer-events-none backdrop-blur-xl border-b
          ${isSurprise
            ? 'bg-[rgba(252,237,214,0.92)] border-[#8B4513]/15'
            : 'bg-cream-50/92 border-forest-900/10 dark:border-honey-500/15'
          }`}
      />

      <div className="relative container-x">
        {/* Mobile: 2-col (logo | hamburger), Desktop: 3-col (logo | nav | actions) */}
        <div className="flex items-center justify-between lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-4 lg:items-center h-[72px] md:h-[90px] lg:h-[116px]">

          {/* ── Col 1: Logo ── */}
          <div className="flex items-center justify-start">
            <a href="/" className="flex-shrink-0">
              <motion.img
                key={theme}
                src={art('/Hivetz_Logo.webp', '/HivetzLogoLight.webp', '/HivetzLogoDark.webp')}
                alt="Hivetz"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className={`block w-auto select-none ${isColour ? 'h-[100px] md:h-[130px]' : theme === 'dark' ? 'h-[96px] md:h-[145px]' : 'h-[150px] md:h-[145px]'}`}
                draggable={false}
              />
            </a>
          </div>

          {/* ── Col 2: Nav ── */}
          <nav className="hidden lg:flex items-center justify-center gap-1
                          text-[11px] font-semibold tracking-[0.22em] uppercase">
            {NAV.map((n, i) => {
              const fullHref = n.hash ? `${n.href}#${n.hash}` : n.href;
              const isActive = n.hash
                ? location.hash === `#${n.hash}`
                : location.pathname === n.href && !location.hash;
              return (
                <motion.span
                  key={n.label}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <Link
                    to={fullHref}
                    onClick={(e) => handleNavClick(e, n)}
                    className={`px-4 py-2 rounded-full transition-colors underline-anim block
                      ${isSurprise
                        ? isActive
                          ? 'text-[#8B4513] bg-[#F5A623]/20'
                          : 'text-[#5C2D0A] hover:bg-[#F5A623]/10'
                        : isActive
                          ? 'text-forest-900 bg-forest-900/8 dark:text-honey-600 dark:bg-honey-500/12'
                          : 'text-forest-900 hover:bg-forest-900/5 dark:text-honey-700 dark:hover:bg-honey-500/10'
                      }`}
                  >
                    {n.label}
                  </Link>
                </motion.span>
              );
            })}
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + NAV.length * 0.05 }}
            >
              <a
                href={PLANT_URL}
                data-cursor="link"
                data-cursor-label="3D tour"
                className={`ml-1 inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border transition-colors
                  ${isSurprise
                    ? 'border-[#8B4513]/30 text-[#8B4513] hover:bg-[#F5A623]/15'
                    : 'border-forest-900/20 text-forest-900 hover:bg-forest-900/5 dark:border-honey-500/30 dark:text-honey-700 dark:hover:bg-honey-500/10'
                  }`}
              >
                <span className="plant-dot h-1.5 w-1.5 rounded-full bg-current" />
                Our Plant
              </a>
            </motion.span>
          </nav>

          {/* ── Col 3: Actions ── */}
          <div className="flex items-center justify-end gap-2 lg:gap-3">

            {/* Surprise — hidden on small mobile, shown from sm up */}
            <div className="hidden sm:block">
              <SurpriseButton />
            </div>

            <div className={`hidden md:block h-5 w-px
              ${isSurprise ? 'bg-[#8B4513]/20' : 'bg-forest-900/15 dark:bg-honey-500/20'}`} />

            {!isSurprise && (
              <>
                <span className="hidden md:inline eyebrow text-forest-900 dark:text-honey-700">
                  Theme
                </span>
                <ThemeToggle />
              </>
            )}

            <button
              onClick={onEnquire}
              className={`hidden md:inline-flex items-center justify-center
                         px-4 py-2 rounded-full
                         text-[11px] font-semibold tracking-[0.18em] uppercase
                         border transition-all duration-300
                         ${isSurprise
                           ? 'border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white'
                           : 'border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-white dark:border-honey-600 dark:text-honey-700 dark:hover:bg-honey-600 dark:hover:text-white'
                         }`}
            >
              Enquire
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className={`lg:hidden p-2 rounded-full border
                ${isSurprise
                  ? 'border-[#8B4513]/25 text-[#8B4513]'
                  : 'border-forest-900/15 dark:border-honey-500/20 text-forest-900 dark:text-honey-700'
                }`}
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
          <div
            className={`rounded-2xl mb-4 p-4 space-y-1 border
              ${isSurprise
                ? 'bg-[rgb(252,237,214)] border-[#8B4513]/15'
                : 'bg-cream-50 dark:bg-cream-50 border-forest-900/8 dark:border-honey-500/15'
              }`}
          >
            {NAV.map(n => {
              const fullHref = n.hash ? `${n.href}#${n.hash}` : n.href;
              return (
                <Link
                  key={n.label}
                  to={fullHref}
                  onClick={(e) => handleNavClick(e, n)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold
                              tracking-wide uppercase transition-colors
                              ${isSurprise
                                ? 'text-[#5C2D0A] hover:bg-[#8B4513]/8'
                                : 'text-forest-900 dark:text-honey-700 hover:bg-forest-900/5 dark:hover:bg-honey-500/10'
                              }`}
                >
                  {n.label}
                </Link>
              );
            })}

            <a
              href={PLANT_URL}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
                          tracking-wide uppercase transition-colors
                          ${isSurprise
                            ? 'text-[#5C2D0A] hover:bg-[#8B4513]/8'
                            : 'text-forest-900 dark:text-honey-700 hover:bg-forest-900/5 dark:hover:bg-honey-500/10'
                          }`}
            >
              <Box size={16} strokeWidth={2} /> Our Plant · 3D tour
            </a>

            {/* Divider */}
            <div className={`h-px mx-4 my-2 ${isSurprise ? 'bg-[#8B4513]/12' : 'bg-forest-900/8'}`} />

            {/* Mobile-only: surprise + theme toggle row */}
            <div className="flex items-center justify-between px-4 py-2">
              <SurpriseButton />
              {!isSurprise && (
                <div className="flex items-center gap-2">
                  <span className="eyebrow text-forest-900 dark:text-honey-700">Theme</span>
                  <ThemeToggle />
                </div>
              )}
            </div>

            <button
              onClick={() => { setMobileOpen(false); onEnquire(); }}
              className={`w-full mt-1 py-3 rounded-xl text-sm font-semibold tracking-wide uppercase transition-colors
                ${isSurprise
                  ? 'bg-[#8B4513] text-[rgb(252,237,214)] hover:bg-[#5C2D0A]'
                  : 'bg-forest-900 text-cream-50 hover:bg-forest-800 dark:bg-honey-600 dark:text-white dark:hover:bg-honey-500'
                }`}
            >
              Quick Enquiry
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll hairline */}
      <div className={`absolute bottom-0 inset-x-0 h-px transition-opacity duration-500
                       ${scrolled ? 'opacity-100' : 'opacity-0'}
                       ${isSurprise
                         ? 'bg-gradient-to-r from-transparent via-[#8B4513]/20 to-transparent'
                         : 'bg-gradient-to-r from-transparent via-forest-900/15 dark:via-honey-500/25 to-transparent'
                       }`} />
    </motion.header>
  );
}
