import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import type { Product } from '../data/products';

type Props = {
  product: Product | null;
  onClose: () => void;
  onEnquire?: () => void;
};

export default function ProductQuickView({ product, onClose, onEnquire }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  const Icon = product?.icon;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-300/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl rounded-3xl glass overflow-hidden max-h-[88vh] overflow-y-auto"
          >
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-forest-700 via-forest-800 to-forest-900 dark:from-honey-400 dark:via-honey-500 dark:to-honey-600" />

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  {Icon && (
                    <div className="h-14 w-14 rounded-xl flex items-center justify-center
                                    bg-forest-900/8 dark:bg-honey-500/12
                                    text-forest-800 dark:text-honey-600 shrink-0">
                      <Icon size={26} strokeWidth={1.6} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="eyebrow text-forest-800 dark:text-honey-700 mb-1">
                      {product.category}
                      {product.brand && <> · <span className="text-forest-900 dark:text-honey-600">{product.brand}</span></>}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight text-forest-900 dark:text-honey-600 break-words">
                      {product.name}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  data-cursor="link"
                  aria-label="Close"
                  className="h-9 w-9 rounded-full flex items-center justify-center shrink-0
                             hover:bg-forest-900/5 dark:hover:bg-honey-400/10 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-forest-900/85 dark:text-honey-700/85 leading-relaxed text-[15px]">
                {product.description}
              </p>

              {product.benefits && product.benefits.length > 0 && (
                <div className="mt-6">
                  <div className="eyebrow text-forest-800 dark:text-honey-700 mb-3">Benefits</div>
                  <ul className="space-y-2">
                    {product.benefits.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i, duration: 0.35 }}
                        className="flex items-start gap-2.5 text-sm text-forest-900 dark:text-honey-700"
                      >
                        <Check size={15} className="mt-0.5 shrink-0 text-forest-700 dark:text-honey-500" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <div className="eyebrow text-forest-800 dark:text-honey-700 mb-3">Highlights</div>
                <div className="flex flex-wrap gap-1.5">
                  {product.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full
                                 bg-forest-900/6 dark:bg-honey-500/10 border border-forest-900/10 dark:border-honey-500/15
                                 text-forest-900 dark:text-honey-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {product.composition && (
                <div className="mt-6">
                  <div className="eyebrow text-forest-800 dark:text-honey-700 mb-2">Composition</div>
                  <p className="text-sm leading-relaxed text-forest-900/85 dark:text-honey-700/85">{product.composition}</p>
                </div>
              )}

              {product.application && (
                <div className="mt-6 rounded-xl p-4 bg-forest-900/4 dark:bg-honey-500/8 border border-forest-900/8 dark:border-honey-500/12">
                  <div className="eyebrow text-forest-800 dark:text-honey-700 mb-1.5">Application</div>
                  <p className="text-sm text-forest-900 dark:text-honey-700">{product.application}</p>
                </div>
              )}

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { onEnquire?.(); onClose(); }}
                  data-cursor="link"
                  data-cursor-label="Enquire"
                  className="btn-primary flex-1 group"
                >
                  Get a quote
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#contact"
                  onClick={onClose}
                  data-cursor="link"
                  className="btn-ghost flex-1"
                >
                  Request technical sheet
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
