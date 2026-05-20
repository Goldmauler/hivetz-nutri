# Hivetz Nutri — Marketing Site

A production-ready React + TypeScript + Vite + Tailwind site for **Hivetz Nutri Pvt Ltd** — premium animal nutrition (vitamin premixes, chelated minerals, toxin binders, enzymes, probiotics).

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3 (light & dark mode via `class` strategy)
- Framer Motion (parallax hero, scroll-triggered fades, hover 3D tilt, modal/carousel transitions)
- Lucide React (icons)
- React Hot Toast (copy + form notifications)
- LocalStorage theme persistence (`hivetz-theme`)

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
hivetz/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── Header.tsx
    │   ├── Hero.tsx
    │   ├── GetStarted.tsx
    │   ├── DemoChat.tsx
    │   ├── Products.tsx
    │   ├── About.tsx
    │   ├── RnD.tsx
    │   ├── Testimonials.tsx
    │   ├── Contact.tsx
    │   ├── Footer.tsx
    │   ├── EnquiryModal.tsx
    │   └── ThemeToggle.tsx
    ├── hooks/
    │   ├── useTheme.ts
    │   └── useTypewriter.ts
    ├── data/
    │   ├── products.ts
    │   ├── demoChat.ts
    │   └── testimonials.ts
    └── pages/
        └── Home.tsx
```

## Features

- **Sticky animated header** with logo, nav, social icons, animated theme toggle
- **Parallax hero** with inline misty-mountain SVG (no external image required) and scroll-driven layers
- **Get Started** section: glassmorphic terminal-style cards with one-click copy for phone & email
- **Interactive demo chat**: typing animation, sample questions about premixes, toxin binders, FCR, coccidiosis, layer eggshell quality
- **Products grid**: 12 SKUs across 8 categories, filterable, with mouse-tracking 3D tilt on hover
- **About** with animated count-up stats (25,000 → 50,000 TPA, certifications)
- **R&D** section with 4 pillars (wet chem, microbiology, field trials, mycotoxin lab)
- **Testimonials carousel** with auto-rotation, dots, and manual nav
- **Contact** section with copy-to-clipboard contact details
- **Quick Enquiry modal** with species selector, validation, and toast on submit
- **Footer** with sitemap, socials, and policies
- **Light & dark themes** with persistence; smooth transitions on every surface
- **Fully responsive** — single-column on mobile, 2-column tablet, 3-column desktop

## Theme palette

The site uses a custom palette (`forest`, `honey`, `cream`, `ink`) defined in `tailwind.config.js`. The dark mode pulls a deep forest/ink background with honey accents; light mode is a cream/forest pairing.

## Notes

- All product names, copy, taglines, and chat scripts are original content authored for Hivetz Nutri.
- Replace `+91 98765 43210` and `enquiry@hivetznutri.com` with real contact details before going live.
- Wire `EnquiryModal.handleSubmit` to your backend (or a service like Formspree / Netlify Forms) when ready.
