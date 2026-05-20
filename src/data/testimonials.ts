export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'We swapped our legacy premix for Hivetz BroilerMax across 14 sheds. FCR dropped from 1.68 to 1.56 in two flocks. The team treats us like partners, not customers.',
    author: 'Rajeev Menon',
    role: 'GM Production',
    company: 'Coastal Broilers Pvt Ltd',
  },
  {
    id: 't2',
    quote:
      'ToxiGuard saved a 90,000-bird flock during last monsoon. Their lab turned around aflatoxin reports in 18 hours when we needed it most.',
    author: 'Dr. Sangeeta Pillai',
    role: 'Head Veterinarian',
    company: 'Krishna Layer Farms',
  },
  {
    id: 't3',
    quote:
      'Hivetz built a custom layer premix matched to our local maize quality. Egg production held above 92% all the way to 78 weeks.',
    author: 'Imran Khan',
    role: 'Director',
    company: 'Sunrise Eggs',
  },
  {
    id: 't4',
    quote:
      'The R&D team genuinely engineers — not just sells. Their phytogenic coccidia program let us go fully antibiotic-free for export.',
    author: 'Dr. Niranjan Rao',
    role: 'Nutrition Consultant',
    company: 'Premium Poultry Group',
  },
];
