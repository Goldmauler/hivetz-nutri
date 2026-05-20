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
        forest: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#0A2818',
        },

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

        // ── shared surfaces ────────────────────────────────────────────
        cream: {
          50:  '#FDFBF5',
          100: '#FAF5E8',
          200: '#F3EBD0',
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
