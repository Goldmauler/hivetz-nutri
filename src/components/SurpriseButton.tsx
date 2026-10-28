import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { Sparkles } from 'lucide-react';

export default function SurpriseButton() {
  const { theme, setTheme } = useTheme();
  const isSurprise = theme === 'surprise';

  const handleClick = () => {
    setTheme(isSurprise ? 'brand' : 'surprise');
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Surprise theme"
      title={isSurprise ? 'Back to normal' : 'Surprise me!'}
      className={`relative inline-flex items-center gap-1.5
                  px-3.5 py-1.5 rounded-full
                  text-[11px] font-bold tracking-[0.18em] uppercase
                  transition-all duration-300 overflow-hidden
                  ${isSurprise
                    ? 'bg-[#8B4513] text-[#F5E6C8] border border-[#D4845A]/60 shadow-[0_0_14px_rgba(139,69,19,0.4)]'
                    : 'border border-[#D4845A] text-[#8B4513] hover:bg-[#F5A623]/15'
                  }`}
    >
      {/* Shimmer sweep when active */}
      {isSurprise && (
        <motion.span
          className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <motion.span
        animate={isSurprise ? { rotate: [0, 20, -20, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Sparkles size={13} strokeWidth={2.5} />
      </motion.span>
      <span className="relative">{isSurprise ? 'Coloured' : 'Surprise'}</span>
    </motion.button>
  );
}
