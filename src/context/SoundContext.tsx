import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

type SoundKey = 'hover' | 'click' | 'enter' | 'reveal';

type Ctx = {
  enabled: boolean;
  toggle: () => void;
  play: (k: SoundKey) => void;
};

const SoundCtx = createContext<Ctx>({
  enabled: false,
  toggle: () => {},
  play: () => {},
});

export const useSound = () => useContext(SoundCtx);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!ctxRef.current) {
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
  }, [enabled]);

  const play = (k: SoundKey) => {
    if (!enabled) return;
    const ac = ctxRef.current;
    if (!ac) return;
    if (ac.state === 'suspended') ac.resume();

    const now = ac.currentTime;
    const o = ac.createOscillator();
    const g = ac.createGain();

    const presets: Record<SoundKey, { freq: number; type: OscillatorType; dur: number; gain: number }> = {
      hover:  { freq: 880,  type: 'sine',     dur: 0.06, gain: 0.025 },
      click:  { freq: 520,  type: 'triangle', dur: 0.10, gain: 0.06 },
      enter:  { freq: 240,  type: 'sine',     dur: 0.45, gain: 0.05 },
      reveal: { freq: 660,  type: 'sine',     dur: 0.55, gain: 0.045 },
    };
    const p = presets[k];

    o.type = p.type;
    o.frequency.setValueAtTime(p.freq, now);
    if (k === 'enter' || k === 'reveal') {
      o.frequency.exponentialRampToValueAtTime(p.freq * 1.7, now + p.dur * 0.8);
    }
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(p.gain, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + p.dur);

    o.connect(g).connect(ac.destination);
    o.start(now);
    o.stop(now + p.dur + 0.02);
  };

  const toggle = () => setEnabled((v) => !v);

  return (
    <SoundCtx.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundCtx.Provider>
  );
}
