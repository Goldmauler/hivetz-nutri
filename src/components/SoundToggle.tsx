import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { useTheme } from '../hooks/useTheme';

export default function SoundToggle() {
  const { enabled, toggle, play } = useSound();
  const { theme } = useTheme();
  const isSurprise = theme === 'surprise';

  return (
    <button
      data-cursor="link"
      data-cursor-label={enabled ? 'Mute' : 'Sound on'}
      onClick={() => { toggle(); play('click'); }}
      aria-label={enabled ? 'Disable sound' : 'Enable sound'}
      className={`fixed bottom-6 left-4 md:left-6 z-50
                  h-10 w-10 rounded-full flex items-center justify-center
                  shadow-md border backdrop-blur transition-all duration-300
                  ${isSurprise
                    ? 'bg-[rgba(252,237,214,0.92)] border-[#8B4513]/20 text-[#8B4513] hover:bg-[#8B4513] hover:text-[rgb(252,237,214)]'
                    : 'bg-cream-50/92 border-forest-900/15 dark:border-honey-500/20 text-forest-900 dark:text-honey-700 hover:bg-forest-900 hover:text-white dark:hover:bg-honey-600 dark:hover:text-white'
                  }`}
    >
      {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
    </button>
  );
}
