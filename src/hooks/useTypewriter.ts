import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed = 28, start = true) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) {
      setOut('');
      setDone(false);
      return;
    }
    setOut('');
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, start]);

  return { text: out, done };
}
