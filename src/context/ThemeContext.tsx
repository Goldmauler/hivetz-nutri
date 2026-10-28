import { createContext, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

/** 'brand' is the main Hivetz theme (logo colours); light, dark and surprise are kept as options. */
export type Theme = 'brand' | 'light' | 'dark' | 'surprise';

export const THEMES: Theme[] = ['brand', 'light', 'dark', 'surprise'];

// v3: the Hivetz theme became the default, so earlier saved choices start over on it once
const STORAGE_KEY = 'hivetz-theme-v3';

/** Only a theme the visitor picked is remembered; the default is never written. */
function remember(t: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, t);
  } catch {
    /* not persisted; the theme still applies for this visit */
  }
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'brand';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && THEMES.includes(stored)) return stored;
  } catch {
    /* storage blocked: fall through to the default */
  }
  return 'brand';
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    remember(t);
  }, []);

  // cycles the three everyday themes (surprise has its own button)
  const toggle = useCallback(() => {
    setThemeState((t) => {
      const next: Theme = t === 'brand' ? 'light' : t === 'light' ? 'dark' : 'brand';
      remember(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.remove('dark', 'surprise', 'brand');
    body.classList.remove('dark', 'surprise', 'brand');

    if (theme !== 'light') {
      root.classList.add(theme);
      body.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
