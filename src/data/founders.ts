export type Founder = {
  id: string;
  name: string;
  title: string;
  bio: string;
  linkedin?: string;
  initials: string;
  photo?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// TODO: Fill in real titles, bios, LinkedIn URLs and photo paths.
// Names confirmed by client (6 founders):
//   1. Kumar Subramaniam   2. Muthu   3. Kannan
//   4. Angamuthu           5. Rathinam   6. Fernando
// ─────────────────────────────────────────────────────────────────────────────

export const founders: Founder[] = [
  {
    id: 'kumar-subramaniam',
    name: 'Kumar Subramaniam',
    title: 'Co-Founder & Managing Director',
    initials: 'KS',
    linkedin: 'https://linkedin.com',   // TODO: real URL
    bio: "Leads the overall vision and strategy at Hivetz Nutri. With deep roots in the animal nutrition industry across South India, Kumar Subramaniam has built the company from the ground up with an uncompromising focus on science-backed formulations.",
    photo: undefined,                   // TODO: '/FounderKumarSubramaniam.jpg'
  },
  {
    id: 'muthu',
    name: 'Muthu',
    title: 'Co-Founder & Director',
    initials: 'MU',
    linkedin: 'https://linkedin.com',   // TODO: real URL
    bio: "A core pillar of Hivetz Nutri's growth, Muthu brings expertise and commitment that has been instrumental in shaping the company's direction and operations since inception.",
    photo: undefined,
  },
  {
    id: 'kannan',
    name: 'Kannan',
    title: 'Co-Founder & Director',
    initials: 'KA',
    linkedin: 'https://linkedin.com',   // TODO: real URL
    bio: "Kannan's domain knowledge and on-ground experience across poultry farming networks has helped Hivetz Nutri build lasting relationships with integrators and farms across Tamil Nadu and beyond.",
    photo: undefined,
  },
  {
    id: 'angamuthu',
    name: 'Angamuthu',
    title: 'Co-Founder & Director',
    initials: 'AN',
    linkedin: 'https://linkedin.com',   // TODO: real URL
    bio: "Angamuthu brings technical depth and operational discipline to Hivetz Nutri, ensuring that manufacturing processes and quality controls meet the highest standards at every stage of production.",
    photo: undefined,
  },
  {
    id: 'rathinam',
    name: 'Rathinam',
    title: 'Co-Founder & Director',
    initials: 'RA',
    linkedin: 'https://linkedin.com',   // TODO: real URL
    bio: "Rathinam's experience in the feed industry and his understanding of farmer needs at the ground level has directly shaped the product portfolio and field support model that Hivetz Nutri is known for.",
    photo: undefined,
  },
  {
    id: 'fernando',
    name: 'Fernando',
    title: 'Co-Founder & Director',
    initials: 'FE',
    linkedin: 'https://linkedin.com',   // TODO: real URL
    bio: "Fernando leads with a blend of scientific rigour and commercial acumen. His contributions span product development, customer education, and building the technical credibility that sets Hivetz Nutri apart in the market.",
    photo: undefined,
  },
];
