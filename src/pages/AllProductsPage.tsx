import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnquiryModal from '../components/EnquiryModal';
import { products, productCategories, type Product } from '../data/products';
import { useTheme } from '../hooks/useTheme';

export default function AllProductsPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { theme } = useTheme();
  const isSurprise = theme === 'surprise';

  return (
    <div
      className="min-h-screen bg-cream-50 dark:bg-cream-50"
      style={isSurprise ? { backgroundColor: 'rgb(252, 237, 214)' } : {}}
    >
      <Header onEnquire={() => setEnquiryOpen(true)} />
      <main>
        <HeroSection isSurprise={isSurprise} />
        <ProductsSection isSurprise={isSurprise} />
      </main>
      <Footer />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}

function HeroSection({ isSurprise }: { isSurprise: boolean }) {
  return (
    <section className={`relative py-20 md:py-24 border-b
      ${isSurprise ? 'border-[#8B4513]/15' : 'border-forest-900/10'}`}>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`eyebrow mb-4 ${isSurprise ? 'text-[#D4845A]' : 'text-forest-800 dark:text-honey-700'}`}>
            Complete product catalogue
          </div>
          <h1 className={`display-h text-5xl md:text-7xl
            ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
            ALL PRODUCTS.
          </h1>
          <p className={`mt-4 max-w-xl leading-relaxed
            ${isSurprise ? 'text-[#5C2D0A]/80' : 'text-forest-900/80 dark:text-honey-700/80'}`}>
            {products.length} SKUs across premixes, feed additives, anti
            coccidials, disinfectants and specialty ingredients — every one
            manufactured in-house and batch-tested.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProductsSection({ isSurprise }: { isSurprise: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const [active, setActive] = useState<(typeof productCategories)[number]>('All');

  const filtered = active === 'All'
    ? products
    : products.filter(p => p.category === active);

  const catDot: Record<string, string> = {
    'Premixes':       'bg-forest-700 dark:bg-honey-500',
    'Feed Additives': 'bg-forest-500 dark:bg-honey-400',
    'Anti Coccidial': 'bg-red-500',
    'Disinfectants':  'bg-blue-500',
    'Others':         'bg-forest-400 dark:bg-honey-600',
  };

  return (
    <section className="py-16 md:py-24">
      <div ref={ref} className="container-x">

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {productCategories.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                          text-[11px] font-semibold tracking-[0.18em] uppercase
                          border transition-colors duration-200
                          ${active === c
                            ? isSurprise
                              ? 'border-[#8B4513] text-[rgb(252,237,214)]'
                              : 'border-forest-900 text-cream-50 dark:border-honey-600 dark:text-white'
                            : isSurprise
                              ? 'border-[#8B4513]/25 text-[#5C2D0A]'
                              : 'border-forest-900/15 dark:border-honey-500/20 text-forest-900 dark:text-honey-700/80'
                          }`}
            >
              {active === c && (
                <motion.span
                  layoutId="all-active-pill"
                  className={`absolute inset-0 rounded-full
                    ${isSurprise ? 'bg-[#8B4513]' : 'bg-forest-900 dark:bg-honey-600'}`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {c !== 'All' && <span className={`h-1.5 w-1.5 rounded-full ${catDot[c] ?? 'bg-forest-600'}`} />}
                {c}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className={`mb-6 eyebrow ${isSurprise ? 'text-[#D4845A]/70' : 'text-forest-900/50 dark:text-honey-700/60'}`}
        >
          {filtered.length} products
        </motion.p>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                catDot={catDot[p.category] ?? 'bg-forest-600'}
                isSurprise={isSurprise}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product: p,
  index,
  catDot,
  isSurprise,
}: {
  product: Product;
  index: number;
  catDot: string;
  isSurprise: boolean;
}) {
  const [open, setOpen] = useState(false);
  const Icon = p.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 10 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.4) }}
      whileHover={{ y: -2 }}
      onClick={() => setOpen(v => !v)}
      className="group relative rounded-xl shadow-sm hover:shadow-md
                 p-4 flex flex-col gap-2 cursor-pointer transition-shadow duration-300
                 border"
      style={isSurprise ? {
        background: 'rgba(252, 237, 214, 0.8)',
        borderColor: 'rgba(139,69,19,0.12)',
      } : {
        background: 'rgba(255,255,255,0.70)',
        borderColor: 'rgba(20,83,45,0.08)',
      }}
    >
      <div className="flex items-start justify-between">
        <span className={`h-9 w-9 rounded-lg flex items-center justify-center
                         group-hover:scale-110 transition-transform duration-200
                         ${isSurprise
                           ? 'bg-[#8B4513]/8 text-[#8B4513]'
                           : 'bg-forest-900/6 dark:bg-honey-500/12 text-forest-800 dark:text-honey-600'
                         }`}>
          <Icon size={17} strokeWidth={2} />
        </span>
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${catDot}`} />
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={isSurprise ? 'text-[#8B4513]/40' : 'text-forest-900/40 dark:text-honey-700/50'}
          >
            <ChevronDown size={13} />
          </motion.span>
        </div>
      </div>

      <p className={`text-[13px] font-semibold leading-snug line-clamp-2
        ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
        {p.name}
      </p>
      {p.brand && (
        <p className={`text-[10px] font-medium uppercase tracking-wider
          ${isSurprise ? 'text-[#8B4513]/55' : 'text-forest-700/55 dark:text-honey-700/65'}`}>
          {p.brand}
        </p>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className={`mt-1 text-[11px] leading-relaxed pt-2 border-t
              ${isSurprise
                ? 'text-[#5C2D0A]/70 border-[#8B4513]/10'
                : 'text-forest-900/70 dark:text-honey-700/75 border-forest-900/8 dark:border-honey-500/10'
              }`}>
              {p.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {p.highlights.map(h => (
                <span key={h}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border
                        ${isSurprise
                          ? 'bg-[#8B4513]/6 text-[#5C2D0A]/70 border-[#8B4513]/10'
                          : 'bg-forest-900/5 dark:bg-honey-500/10 text-forest-900/70 dark:text-honey-700/75 border-forest-900/8 dark:border-honey-500/12'
                        }`}>
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
