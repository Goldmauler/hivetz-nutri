export type ChatStep = {
  role: 'user' | 'agent';
  content: string;
  meta?: string;
  delay?: number;
};

export type ChatScript = {
  id: string;
  title: string;
  steps: ChatStep[];
};

// Every answer is quoted from the Hivetz "Product Information Centre" brochure: doses,
// compositions and pack sizes as printed. No farm data or dosing advice beyond the label.
export const chatScripts: ChatScript[] = [
  {
    id: 'broiler-dose',
    title: 'What is the dose of HIBRO-PX+ for broilers?',
    steps: [
      { role: 'user', content: 'What is the dose of HIBRO-PX+ for broilers?' },
      { role: 'agent', meta: 'lookup "HIBRO-PX+"', content: 'Broiler vitamin premix · 500 g per tonne of feed.', delay: 700 },
      {
        role: 'agent',
        meta: 'composition per kg',
        content:
          'Vitamin A 30 MIU, D3 12 MIU, E 100 g, K3 6 g, B1 12 g, B2 16 g, B6 12 g, B12 0.06 g, pantothenic acid 32 g, niacin 100 g, folic acid 3 g, D-biotin 0.3 g. It supports ideal growth and production performance, immunity, meat yield and liveability.',
        delay: 1100,
      },
    ],
  },
  {
    id: 'layer',
    title: 'Which premix do you make for layers?',
    steps: [
      { role: 'user', content: 'Which premix do you make for layers?' },
      { role: 'agent', meta: 'lookup "HILAY-PX"', content: 'HILAY-PX, our layer vitamin premix · 250 g per tonne of feed.', delay: 700 },
      {
        role: 'agent',
        meta: 'benefits',
        content:
          'Egg uniformity and consistency, better immunity for better productivity, optimum growth and improved egg production. Antioxidant, anticaking agent, binder and organic carrier are added.',
        delay: 1100,
      },
    ],
  },
  {
    id: 'breeder',
    title: 'What does HIBREED-PX do for breeder flocks?',
    steps: [
      { role: 'user', content: 'What does HIBREED-PX do for breeder flocks?' },
      { role: 'agent', meta: 'lookup "HIBREED-PX"', content: 'Breeder vitamin premix · 1 kg per tonne of feed, with coated vitamin C.', delay: 700 },
      {
        role: 'agent',
        meta: 'benefits',
        content:
          'Optimum vitamin levels for improved growth and reproduction, protection against vitamin deficiencies, excellent hatchability, and the finest bird uniformity and egg quality.',
        delay: 1100,
      },
    ],
  },
  {
    id: 'disinfectant',
    title: 'Which Hivetz disinfectant is for high-risk areas?',
    steps: [
      { role: 'user', content: 'Which Hivetz disinfectant is for high-risk areas?' },
      { role: 'agent', meta: 'lookup "SteriOx"', content: 'SteriOx, our ultimate high-level disinfectant · 500 g and 1 Kg packs.', delay: 700 },
      {
        role: 'agent',
        meta: 'how it works',
        content:
          'It destroys microorganisms by oxidizing sulfur bonds in proteins and enzymes, and is effective against bacteria, viruses, fungi and spores. For everyday farm sanitation there is Sterivetz +; Gludac and Merisan Extra complete the range.',
        delay: 1100,
      },
    ],
  },
];
