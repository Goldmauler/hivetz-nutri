import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import LoadingScreen from './components/LoadingScreen';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import SoundToggle from './components/SoundToggle';
import './index.css';

function Root() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease 0.1s',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <SmoothScroll />
        <CustomCursor />
        <GrainOverlay />
        <App />
        <SoundToggle />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SoundProvider>
          <Root />
        </SoundProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
