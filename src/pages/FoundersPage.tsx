import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnquiryModal from '../components/EnquiryModal';
import { founders } from '../data/founders';
import { useTheme } from '../hooks/useTheme';

export default function FoundersPage() {
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
        <TeamGrid isSurprise={isSurprise} />
      </main>
      <Footer />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}

function HeroSection({ isSurprise }: { isSurprise: boolean }) {
  return (
    <section className={`relative py-20 md:py-28 overflow-hidden border-b
      ${isSurprise ? 'border-[#8B4513]/15' : 'border-forest-900/10'}`}>
      <div className="container-x text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`eyebrow mb-4 ${isSurprise ? 'text-[#D4845A]' : 'text-forest-800 dark:text-honey-700'}`}>
            The people behind the premix
          </div>
          <h1 className={`display-h text-5xl md:text-7xl
            ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
            OUR FOUNDERS.
          </h1>
          <p className={`mt-6 mx-auto max-w-2xl leading-relaxed
            ${isSurprise ? 'text-[#5C2D0A]/80' : 'text-forest-900/80 dark:text-honey-700/80'}`}>
            Hivetz Nutri was built by practitioners, not investors. Each
            founder brings deep domain expertise from formulation, operations,
            field sales, and R&D — all pointed at one goal: better nutrition
            for every flock in Sri Lanka.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TeamGrid({ isSurprise }: { isSurprise: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {founders.map((f, i) => (
            <FounderCard key={f.id} founder={f} index={i} inView={inView} isSurprise={isSurprise} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  founder: f,
  index,
  inView,
  isSurprise,
}: {
  founder: (typeof founders)[number];
  index: number;
  inView: boolean;
  isSurprise: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="glass rounded-3xl p-8 md:p-10 flex flex-col gap-6"
      style={isSurprise ? {
        background: 'rgba(252, 237, 214, 0.75)',
        border: '1px solid rgba(139,69,19,0.15)',
      } : {}}
    >
      {/* Avatar */}
      <div className="flex items-start gap-5">
        {f.photo ? (
          <img
            src={f.photo}
            alt={f.name}
            className="h-20 w-20 rounded-2xl object-cover object-top flex-shrink-0"
          />
        ) : (
          <div className={`h-20 w-20 rounded-2xl flex-shrink-0 flex items-center justify-center
                          font-display font-black text-2xl select-none
                          ${isSurprise
                            ? 'bg-[#8B4513] text-[rgb(252,237,214)]'
                            : 'bg-forest-900 dark:bg-honey-600 text-cream-50 dark:text-white'
                          }`}>
            {f.initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className={`font-display text-2xl font-bold leading-tight
            ${isSurprise ? 'text-[#5C2D0A]' : 'text-forest-900 dark:text-honey-600'}`}>
            {f.name}
          </h2>
          <p className={`mt-1 text-sm font-semibold
            ${isSurprise ? 'text-[#8B4513]' : 'text-forest-700 dark:text-honey-700'}`}>
            {f.title}
          </p>
          {f.linkedin && (
            <a
              href={f.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`mt-2 inline-flex items-center gap-1.5 text-xs transition-colors
                ${isSurprise
                  ? 'text-[#D4845A]/80 hover:text-[#8B4513]'
                  : 'text-forest-900/60 dark:text-honey-700/70 hover:text-forest-900 dark:hover:text-honey-600'
                }`}
            >
              <Linkedin size={13} />
              LinkedIn Profile
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className={`text-sm leading-relaxed
        ${isSurprise ? 'text-[#5C2D0A]/80' : 'text-forest-900/80 dark:text-honey-700/85'}`}>
        {f.bio}
      </p>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.12 }}
        className={`h-0.5 w-full origin-left rounded-full bg-gradient-to-r
          ${isSurprise
            ? 'from-[#8B4513] to-[#D4845A]'
            : 'from-forest-800 to-forest-500 dark:from-honey-600 dark:to-honey-400'
          }`}
      />
    </motion.div>
  );
}
