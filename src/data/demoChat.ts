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

export const chatScripts: ChatScript[] = [
  {
    id: 'mycotoxin',
    title: 'How do we tackle aflatoxin in our broiler feed this monsoon?',
    steps: [
      {
        role: 'user',
        content: 'How do we tackle aflatoxin in our broiler feed this monsoon?',
      },
      {
        role: 'agent',
        meta: 'analyze_feed_batch "kharif-2026"',
        content: 'Detected aflatoxin B1 at 78 ppb in 3 of 12 sampled lots — above the safe threshold.',
        delay: 800,
      },
      {
        role: 'agent',
        meta: 'recommend',
        content:
          'Include HI BIND at 1.5 kg/ton for the next 21 days. HI BIND\'s activated bentonite + yeast cell-wall matrix adsorbs aflatoxin, ochratoxin, and ZEA without binding vitamins. Pair with HI CHOL PLUS at 500 g/ton to support liver recovery.',
        delay: 1200,
      },
    ],
  },
  {
    id: 'fcr',
    title: 'My broiler FCR is stuck at 1.72 — what should I change?',
    steps: [
      {
        role: 'user',
        content: 'My broiler FCR is stuck at 1.72 — what should I change?',
      },
      {
        role: 'agent',
        meta: 'review_diet_matrix',
        content: 'Energy density is ~60 kcal below breed standard. Fat digestibility likely the bottleneck.',
        delay: 700,
      },
      {
        role: 'agent',
        meta: 'recommend',
        content:
          'Add HI DOL PLUS emulsifier at 500 g/ton to unlock fat energy. Also consider BESTACI acidifier to improve gut pH and nutrient absorption. Target FCR under 1.58 by day 35.',
        delay: 1100,
      },
    ],
  },
  {
    id: 'cocci',
    title: 'Need a coccidiosis programme for broiler grower phase.',
    steps: [
      {
        role: 'user',
        content: 'Need a coccidiosis programme for broiler grower phase.',
      },
      {
        role: 'agent',
        meta: 'design_program',
        content: 'Building rotation-friendly programme for grower phase (day 15–35).',
        delay: 800,
      },
      {
        role: 'agent',
        meta: 'recommend',
        content:
          'Use Monensin Sodium (8%) + Nicarbazine (8%) for grower phase — strong against E. tenella and E. acervulina. Rotate to Diclazuril 0.5% in finisher to prevent resistance buildup. Zero withdrawal concern with this rotation.',
        delay: 1200,
      },
    ],
  },
  {
    id: 'biosecurity',
    title: 'What disinfectant programme do you recommend between flocks?',
    steps: [
      {
        role: 'user',
        content: 'What disinfectant programme do you recommend between flocks?',
      },
      {
        role: 'agent',
        meta: 'review_biosecurity_protocol',
        content: 'Designing a 3-stage terminal disinfection programme.',
        delay: 700,
      },
      {
        role: 'agent',
        meta: 'recommend',
        content:
          'Stage 1: Wash down with Sterivetz Plus (broad-spectrum bactericidal + virucidal). Stage 2: Fogging with SteriOx for spore and fungal control. Stage 3: Final spray with Gludac for maximum sporicidal and mycobactericidal assurance before placement.',
        delay: 1200,
      },
    ],
  },
];
