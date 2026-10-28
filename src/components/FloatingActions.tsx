import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const WHATSAPP_NUMBER = '917010071262';
const WHATSAPP_MSG    = encodeURIComponent(
  "Hi Hivetz! I'd like to enquire about your poultry premix products."
);

type Props = { onEnquire: () => void };

export default function FloatingActions({ onEnquire }: Props) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { theme } = useTheme();
  const isSurprise = theme === 'surprise';

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      setVisible(v > 400);
      setShowTop(v > 800);
    });
    return unsub;
  }, [scrollY]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3">

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`h-10 w-10 rounded-full flex items-center justify-center shadow-lg
                        border transition-colors duration-300
                        ${isSurprise
                          ? 'bg-[rgb(252,237,214)] border-[#8B4513]/20 text-[#8B4513] hover:bg-[#8B4513] hover:text-[rgb(252,237,214)]'
                          : 'bg-cream-50 dark:bg-cream-50 border-forest-900/15 dark:border-honey-500/20 text-forest-900 dark:text-honey-700 hover:bg-forest-900 hover:text-white dark:hover:bg-honey-600 dark:hover:text-white'
                        }`}
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick Enquiry pill */}
      <AnimatePresence>
        {visible && (
          <motion.button
            key="enquiry"
            initial={{ opacity: 0, scale: 0.6, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: 40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 }}
            onClick={onEnquire}
            aria-label="Quick enquiry"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full
                        text-xs font-semibold tracking-wide uppercase shadow-lg
                        transition-all duration-300 hover:-translate-y-0.5
                        ${isSurprise
                          ? 'bg-[#8B4513] text-[rgb(252,237,214)] hover:bg-[#5C2D0A] shadow-[0_4px_20px_rgba(139,69,19,0.35)]'
                          : 'bg-forest-900 text-cream-50 hover:bg-forest-800 shadow-[0_4px_20px_rgba(20,83,45,0.30)] dark:bg-honey-600 dark:text-white dark:hover:bg-honey-500 dark:shadow-[0_4px_20px_rgba(59,104,245,0.30)]'
                        }`}
          >
            <MessageCircle size={14} />
            <span className="hidden sm:inline">Quick Enquiry</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp button — always visible */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="relative h-14 w-14 rounded-full flex items-center justify-center
                   shadow-[0_6px_28px_rgba(37,211,102,0.45)]
                   hover:shadow-[0_8px_32px_rgba(37,211,102,0.60)]
                   transition-shadow duration-300"
        style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
      >
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(37,211,102,0.35)' }}
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7 relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}
