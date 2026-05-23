import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTheme } from './hooks/useTheme';
import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
import GetStarted from './components/GetStarted';
import DemoChat from './components/DemoChat';
import Products from './components/Products';
import About from './components/About';
import RnD from './components/RnD';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import FloatingActions from './components/FloatingActions';

import AllProductsPage from './pages/AllProductsPage';
import FoundersPage from './pages/FoundersPage';

function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const isSurprise = theme === 'surprise';

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className={`fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left
          ${isSurprise
            ? 'bg-gradient-to-r from-[#F5A623] via-[#D4845A] to-[#8B4513]'
            : 'bg-gradient-to-r from-forest-500 via-forest-700 to-forest-900 dark:from-honey-400 dark:via-honey-500 dark:to-honey-600'
          }`}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#FDFBF5',
            color:      theme === 'dark' ? '#2A4FD8' : '#14532D',
            border:     theme === 'dark'
              ? '1px solid rgba(59,104,245,0.25)'
              : '1px solid rgba(20,83,45,0.20)',
            fontSize: '14px',
            fontWeight: 500,
          },
        }}
      />

      <Header onEnquire={() => setEnquiryOpen(true)} />

      <main className="relative">
        <Hero />
        <GetStarted />
        <DemoChat />
        <Products />
        <About />
        <RnD />
        <Testimonials />
        <Contact onEnquire={() => setEnquiryOpen(true)} />
      </main>

      <Footer />
      <FloatingActions onEnquire={() => setEnquiryOpen(true)} />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/"           element={<HomePage />} />
      <Route path="/products"   element={<AllProductsPage />} />
      <Route path="/founders"   element={<FoundersPage />} />
    </Routes>
  );
}
