import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { products, productCategories, type Product } from '../data/products';

const INITIAL_COUNT = 8;

export default function Products() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [active, setActive] = useState<(typeof productCategories)[number]>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = active === 'All'
    ? products
    : products.filter(p => p.category === active);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT;

  const catDot: Record<string, string> = {
    'Premixes':       'bg-forest-700 dark:bg-honey-500',
    'Feed Additives': 'bg-forest-500 dark:bg-honey-400',
    'Anti Coccidial': 'bg-red-500',
    'Disinfectants':  'bg-blue-500',
    'Others':         'bg-forest-400 dark:bg-honey-600',
  };

  return (
    <section
      id="products"
      ref={ref}
      className="relative py-20 md:py-28 border-t border-forest-900/10 dark:border-honey-500/15"
    >
      <div className="container-x">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <div className="eyebrow text-forest-800 dark:text-honey-600/70 mb-2">
              Engineered, not assembled
            </div>
            <h2 className="display-h text-3xl md:text-5xl text-forest-900 dark:text-honey-600">
              PRODUCTS THAT WORK.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-forest-900 dark:text-honey-700/70 leading-relaxed">
            Every SKU manufactured in-house, batch-tested, and traceable
            from raw material to dispatch.
          </p>
        </motion.div>

        {/* Category filter pills — spring-animated active background via layoutId */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {productCategories.map(c => (
            <button
              key={c}
              onClick={() => { setActive(c); setShowAll(false); }}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                          text-[11px] font-semibold tracking-[0.18em] uppercase
                          border transition-colors duration-200
                          ${active === c
                            ? 'border-forest-900 text-cream-50 dark:border-honey-600 dark:text-white'
                            : 'border-forest-900/15 dark:border-honey-500/20 text-forest-900 dark:text-honey-700/80 hover:border-forest-900/30 dark:hover:border-honey-500/40'
                          }`}
            >
              {/* Spring-animated background for active pill */}
              {active === c && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-forest-900 dark:bg-honey-600"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {c !== 'All' && (
                  <span className={`h-1.5 w-1.5 rounded-full ${catDot[c] ?? 'bg-forest-600'}`} />
                )}
                {c}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                catDot={catDot[p.category] ?? 'bg-forest-600'}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View more / collapse */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <button
              onClick={() => setShowAll(v => !v)}
              className="group flex items-center gap-2 px-7 py-3 rounded-full
                         border border-forest-900/20 dark:border-honey-500/25
                         text-sm font-semibold text-forest-900 dark:text-honey-600
                         hover:bg-forest-900/5 dark:hover:bg-honey-500/10
                         transition-all duration-300"
            >
              {showAll ? (
                <>
                  <ChevronUp size={15} className="group-hover:-translate-y-0.5 transition-transform" />
                  Show Less
                </>
              ) : (
                <>
                  View All {filtered.length} Products
                  <ChevronDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
            {!showAll && (
              <p className="eyebrow text-forest-900/35 dark:text-honey-700/45">
                showing {INITIAL_COUNT} of {filtered.length}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  catDot,
}: {
  product: Product;
  index: number;
  catDot: string;
}) {
  const Icon = product.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.3, delay: index < INITIAL_COUNT ? index * 0.04 : 0 }}
      whileHover={{
        scale: 1.02,
        y: -3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        transition: { duration: 0.18 },
      }}
      className="group relative rounded-xl
                 bg-white/70 dark:bg-white/60
                 border border-forest-900/8 dark:border-honey-500/15
                 shadow-sm
                 p-4 flex flex-col gap-3
                 transition-shadow duration-300"
    >
      {/* Icon + category dot */}
      <div className="flex items-start justify-between">
        <span className="h-9 w-9 rounded-lg flex items-center justify-center
                         bg-forest-900/6 dark:bg-honey-500/12
                         text-forest-800 dark:text-honey-600
                         group-hover:scale-110 transition-transform duration-200">
          <Icon size={17} strokeWidth={2} />
        </span>
        <span className={`h-2 w-2 rounded-full mt-1.5 ${catDot}`} />
      </div>

      {/* Name */}
      <div>
        <p className="text-[13px] font-semibold leading-snug
                      text-forest-900 dark:text-honey-600 line-clamp-2">
          {product.name}
        </p>
        {product.brand && (
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider
                        text-forest-700/55 dark:text-honey-700/65">
            {product.brand}
          </p>
        )}
      </div>

      {/* Tagline */}
      <p className="text-[11px] leading-relaxed text-forest-900 dark:text-honey-700/65
                    line-clamp-2 flex-1">
        {product.tagline}
      </p>

      {/* Highlight pills */}
      <div className="flex flex-wrap gap-1">
        {product.highlights.slice(0, 2).map(h => (
          <span key={h}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full
                           bg-forest-900/5 dark:bg-honey-500/10
                           text-forest-900 dark:text-honey-700/75
                           border border-forest-900/8 dark:border-honey-500/12">
            {h}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
