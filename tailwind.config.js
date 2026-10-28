/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      colors: {
        // ── LIGHT MODE accent: original olive/forest green ─────────────
        // Read from CSS variables (src/index.css) so the Hivetz theme can remap the whole
        // light-mode palette to the logo's colours without touching any component markup.
        forest: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((k) => [k, `rgb(var(--forest-${k}) / <alpha-value>)`]),
        ),

        // ── DARK MODE accent: vivid blue (same blue as your reference) ─
        // Used in dark: variants via honey-* class names
        honey: {
          50:  '#EEF4FF',
          100: '#DCE7FF',
          200: '#C2D4FF',
          300: '#99B6FF',
          400: '#6E9BFF',
          500: '#4D7FFF',
          600: '#3B68F5',
          700: '#2A4FD8',
          800: '#1F3DAE',
          900: '#142A75',
        },

        // ── shared surfaces (CSS variables too, see index.css) ─────────
        cream: Object.fromEntries([50, 100, 200].map((k) => [k, `rgb(var(--cream-${k}) / <alpha-value>)`])),

        // ── Hivetz logo colours (sampled from the logo artwork) ───────
        logo: {
          orange:  '#F49B0F',
          sky:     '#80C7DD',
          magenta: '#D9258B',
          purple:  '#641BA2',
          green:   '#6DCE6B',
          red:     '#E6413A',
          blue:    '#005698',
        },

        // ── dark mode BG: same cream as light (NOT navy) ───────────────
        // dark mode page bg = cream-50 (#FDFBF5), hero uses the dark PNG
        ink: {
          50:  '#FDFBF5',
          100: '#FAF5E8',
          200: '#FDFBF5',
          300: '#FAF5E8',
          400: '#F3EBD0',
        },
      },

      animation: {
        blink:        'blink 1s step-end infinite',
        float:        'float 6s ease-in-out infinite',
        shimmer:      'shimmer 3s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      keyframes: {
        blink:        { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        float:        { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'gradient-x': { '0%,100%': { 'background-position': '0% 50%' }, '50%': { 'background-position': '100% 50%' } },
      },
    },
  },
  plugins: [],
};
