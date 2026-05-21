import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export type Theme = 'light' | 'dark' | 'surprise';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
