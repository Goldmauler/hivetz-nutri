import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTheme } from './hooks/useTheme';
import { useState } from 'react';

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

import AllProductsPage from './pages/AllProductsPage';
import FoundersPage from './pages/FoundersPage';

function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-clip">
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
