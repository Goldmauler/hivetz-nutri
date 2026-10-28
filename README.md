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
- **Quick Enquiry modal**: species selector and validation; the enquiry opens in WhatsApp, addressed to the sales line, ready to send
- **Footer** with sitemap, contact details and a link to the 3D plant tour
- **Four themes**: Hivetz (default, the logo's colours), Green, Blue and Surprise; a chosen theme is remembered
- **Fully responsive** — single-column on mobile, 2-column tablet, 3-column desktop

## Theme palette

The `forest-*` and `cream-*` palettes in `tailwind.config.js` read CSS variables from `src/index.css`.
Green, Blue and Surprise use the original values; the Hivetz theme (`html.brand`) remaps them to the
logo's wordmark blue (#005698) with orange (#F49B0F) accents and the six molecule colours. The full-colour
artwork is shared with Surprise; `useTheme().art()` renders only the current theme's image.

## Content

Every claim comes from the Hivetz *Product Information Centre* brochure and exhibition poster, the
florabiochem.com pages, or contact details supplied by the client. Nothing else goes on the site.
Products live in `src/data/products.ts`, founders in `src/data/founders.ts`, the brochure Q&A in
`src/data/demoChat.ts`.

## Images

Site images are WebP in `public/`. The original PNG artwork is kept in `art-src/` (not deployed).

## Deploy

Vercel project `hivetz-nutri`, connected to this repo: every push to `master` deploys to
https://hivetz-nutri.vercel.app, and other branches get preview URLs.
`VITE_PLANT_URL` (set in Vercel) points the "Our Plant" links at the 3D tour, https://hivetz-plant.vercel.app.
