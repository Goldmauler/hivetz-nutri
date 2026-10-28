import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export type { Theme } from '../context/ThemeContext';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  const { theme } = ctx;
  const isColour = theme === 'brand' || theme === 'surprise';
  return {
    ...ctx,
    /**
     * The one image for the current theme. Only that one is put in the page: hidden <img>s still
     * download, and every section used to fetch its colour, light and dark artwork at once.
     */
    art: (colour: string, light: string, dark: string) => (isColour ? colour : theme === 'dark' ? dark : light),
    isBrand: theme === 'brand',
    /** themes that use the full-colour artwork (logo colours) instead of the line drawings */
    isColour: theme === 'brand' || theme === 'surprise',
  };
}
