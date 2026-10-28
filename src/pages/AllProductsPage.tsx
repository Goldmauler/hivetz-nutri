import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnquiryModal from '../components/EnquiryModal';
import ProductQuickView from '../components/ProductQuickView';
import { products, productCategories, type Product } from '../data/products';
import { useTheme } from '../hooks/useTheme';

export default function AllProductsPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [preview, setPreview] = useState<Product | null>(null);
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
        <ProductsSection isSurprise={isSurprise} onOpen={setPreview} />
      </main>
      <Footer />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <ProductQuickView
        product={preview}
        onClose={() => setPreview(null)}
        onEnquire={() => setEnquiryOpen(true)}
      />
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

function ProductsSection({ isSurprise, onOpen }: { isSurprise: boolean; onOpen: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const [active, setActive] = useState<(typeof productCategories)[number]>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const byCat = active === 'All'
      ? products
      : products.filter(p => p.category === active);
    if (!query.trim()) return byCat;
    const q = query.toLowerCase();
    return byCat.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      (p.brand?.toLowerCase().includes(q) ?? false) ||
      p.highlights.some(h => h.toLowerCase().includes(q))
    );
  }, [active, query]);

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

        {/* Search input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 max-w-md"
        >
          <div className={`relative flex items-center rounded-full border
            ${isSurprise
              ? 'border-[#8B4513]/20 bg-[rgba(252,237,214,0.7)]'
              : 'border-forest-900/15 dark:border-honey-500/25 bg-white/60'
            }`}>
            <Search size={14} className={`absolute left-4 ${isSurprise ? 'text-[#8B4513]/60' : 'text-forest-900/50 dark:text-honey-700/60'}`} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, or ingredients…"
              className={`w-full bg-transparent pl-11 pr-10 py-2.5 text-sm outline-none
                ${isSurprise ? 'text-[#5C2D0A] placeholder:text-[#5C2D0A]/45' : 'text-forest-900 dark:text-honey-600 placeholder:text-forest-900/40 dark:placeholder:text-honey-700/45'}`}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className={`absolute right-3 h-6 w-6 rounded-full flex items-center justify-center
                  ${isSurprise ? 'text-[#8B4513] hover:bg-[#8B4513]/10' : 'text-forest-900 dark:text-honey-700 hover:bg-forest-900/8 dark:hover:bg-honey-500/12'}`}
              >
                <X size={12} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
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
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
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
                onOpen={() => onOpen(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className={`text-center py-12 ${isSurprise ? 'text-[#5C2D0A]/65' : 'text-forest-900/60 dark:text-honey-700/65'}`}>
            No products match "{query}".
          </p>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product: p,
  index,
  catDot,
  isSurprise,
  onOpen,
}: {
  product: Product;
  index: number;
  catDot: string;
  isSurprise: boolean;
  onOpen: () => void;
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
      onClick={(e) => {
        // Double-click → expand inline. Single click → open modal preview.
        if (e.detail === 2) setOpen(v => !v);
        else onOpen();
      }}
      data-cursor="link"
      data-cursor-label="View"
      className="group relative rounded-xl shadow-sm hover:shadow-md
                 p-4 flex flex-col gap-2 cursor-pointer transition-shadow duration-300
                 border"
      style={isSurprise ? {
        background: 'rgba(252, 237, 214, 0.8)',
        borderColor: 'rgba(139,69,19,0.12)',
      } : {
        background: 'rgba(255,255,255,0.70)',
        borderColor: 'rgb(var(--forest-900)/0.08)',
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
