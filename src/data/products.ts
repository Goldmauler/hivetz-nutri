import {
  Beaker,
  Leaf,
  Shield,
  Bug,
  FlaskConical,
  Sparkles,
  Wheat,
  Droplets,
  Pill,
  HeartPulse,
  Sprout,
  Zap,
  ShieldCheck,
  Layers,
  Microscope,
  TestTube,
  Flame,
  Fish,
  Beef,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Every product, figure and benefit below is transcribed from the Hivetz "Product Information
// Centre" brochure (Flora Biochem Private Limited). Where the brochure gives no detail for a
// product, none is added here: the card says so and invites an enquiry instead.

export type Product = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  benefits?: string[];
  composition?: string;
  application?: string;
};

export const productCategories = [
  'All',
  'Premixes',
  'Feed Additives',
  'Anti Coccidial',
  'Disinfectants',
  'Others',
] as const;

const PREMIX_NOTE = 'Premix is usually a gray to brown granular powder. Store in a dry place and avoid direct sunlight.';
const ASK = 'Made in our own plant. Ask us for the composition and dose for your feed.';
const TRADED = 'Part of the range Flora Biochem supplies to feed manufacturers. Ask us for specifications and availability.';

export const products: Product[] = [

  // ─── PREMIXES (made at our plants) ─────────────────────────────────────────
  {
    id: 'vp-broiler',
    name: 'Vitamin Premix — For Broiler',
    brand: 'HIBRO-PX+',
    category: 'Premixes',
    tagline: 'Ideal growth and production performance in broilers',
    description: `Broiler vitamin premix. ${PREMIX_NOTE}`,
    icon: Sparkles,
    highlights: ['500 g per tonne of feed', 'Vit A 30 MIU · D3 12 MIU per kg'],
    benefits: [
      'Ensures broiler ideal growth and production performance.',
      'Enhances immunity and meat yield.',
      'Hibro Plus delivers healthy liveability.',
    ],
    composition:
      'Per 1 kg: Vitamin A 30 MIU, D3 12 MIU, E 100 g, K3 6 g, B1 12 g, B2 16 g, B6 12 g, B12 0.06 g, pantothenic acid 32 g, niacin 100 g, folic acid 3 g, D-biotin 0.3 g.',
    application: '500 g per tonne of feed.',
  },
  {
    id: 'vp-breeder',
    name: 'Vitamin Premix — For Breeder',
    brand: 'HIBREED-PX',
    category: 'Premixes',
    tagline: 'Optimum vitamin levels for growth and reproduction',
    description: `Breeder vitamin premix. Antioxidant, anticaking agent, binder and organic carrier added. ${PREMIX_NOTE}`,
    icon: Sparkles,
    highlights: ['1 kg per tonne of feed', 'With coated vitamin C'],
    benefits: [
      'Assures optimum vitamin levels for improved growth and reproduction.',
      'Protects against vitamin deficiencies.',
      'Excellent hatchability.',
      'Finest bird uniformity and egg quality.',
    ],
    composition:
      'Per 1 kg: Vitamin A 22.5 MIU, D3 4 MIU, E 100 g, K3 4 g, B1 4.4 g, B2 20 g, B6 6 g, B12 0.03 g, pantothenic acid 30 g, niacin 66 g, folic acid 6 g, D-biotin 0.25 g, vitamin C (coated) 100 g.',
    application: '1 kg per tonne of feed.',
  },
  {
    id: 'vp-layer',
    name: 'Vitamin Premix — For Layer',
    brand: 'HILAY-PX',
    category: 'Premixes',
    tagline: 'Egg uniformity, consistency and production',
    description: `Layer vitamin premix. Antioxidant, anticaking agent, binder and organic carrier added. ${PREMIX_NOTE}`,
    icon: Wheat,
    highlights: ['250 g per tonne of feed', 'Vit A 50 MIU per kg'],
    benefits: [
      'Achieves egg uniformity and consistency.',
      'Enhances bird immunity for better productivity.',
      'Supports optimum growth.',
      'Improves egg production.',
    ],
    composition:
      'Per 1 kg: Vitamin A 50 MIU, D3 13.2 MIU, E 32 g, K3 4 g, B1 4 g, B2 20 g, B6 6 g, B12 0.064 g, pantothenic acid 32 g, niacin 48 g, folic acid 4 g, D-biotin 0.2 g.',
    application: '250 g per tonne of feed.',
  },
  {
    id: 'vp-country',
    name: 'Vitamin Premix — For Country Bird',
    category: 'Premixes',
    tagline: 'Vitamin premix for country birds',
    description: ASK,
    icon: Leaf,
    highlights: ['Made at our plant'],
  },
  {
    id: 'pfp-concentrate',
    name: 'Poultry Feed Premix — Concentrate',
    category: 'Premixes',
    tagline: 'Poultry feed premix concentrate',
    description: ASK,
    icon: Layers,
    highlights: ['Made at our plant'],
  },
  {
    id: 'combo-aa',
    name: 'Combo Premix — with AA 0.5%–1%',
    category: 'Premixes',
    tagline: 'Combo premix with amino acids at 0.5% to 1%',
    description: ASK,
    icon: FlaskConical,
    highlights: ['Amino acids 0.5%–1%'],
  },
  {
    id: 'aqua',
    name: 'Aqua Premix',
    category: 'Premixes',
    tagline: 'Premix for aquaculture feed',
    description: ASK,
    icon: Fish,
    highlights: ['Made at our plant'],
  },
  {
    id: 'cattle',
    name: 'Cattle Premix',
    brand: 'HIVITAMIX AD3E',
    category: 'Premixes',
    tagline: 'Vitamin A, D3 and E premix for dairy and cattle',
    description: `Vitamin A, D3, E premix for dairy and cattle feed. ${PREMIX_NOTE}`,
    icon: Beef,
    highlights: ['100 g per tonne of cattle feed', 'Type 1 and Type 2 feed'],
    benefits: [
      'Increased bioavailability of nutrients.',
      'Disease resistance.',
      'Overall feed efficiency.',
      'Improved nutritional condition.',
    ],
    composition: 'Per 1 kg: Vitamin A 80 MIU, D3 15 MIU, E 300 g.',
    application: '100 g per tonne of cattle feed (Type 1 and Type 2).',
  },

  // ─── FEED ADDITIVES (Hivetz brand) ────────────────────────────────────────
  {
    id: 'hi-min',
    name: 'HI MIN — Trace Minerals',
    brand: 'HI MIN BROILER / BREEDER',
    category: 'Feed Additives',
    tagline: 'Trace minerals, inorganic and organic',
    description: 'Hivetz trace-mineral additive for broiler and breeder feed, in inorganic and organic forms. Ask us for the specification.',
    icon: Beaker,
    highlights: ['Inorganic and organic', 'Broiler / breeder'],
  },
  {
    id: 'hi-bind',
    name: 'HI BIND — Toxin Binder',
    brand: 'HI BIND',
    category: 'Feed Additives',
    tagline: 'Toxin binder',
    description: 'Hivetz toxin binder for feed. Ask us for the specification and inclusion rate.',
    icon: Shield,
    highlights: ['Toxin binder'],
  },
  {
    id: 'hi-dol',
    name: 'HI DOL PLUS / HI DOL X — Emulsifiers',
    brand: 'HI DOL PLUS / HI DOL X',
    category: 'Feed Additives',
    tagline: 'Emulsifiers',
    description: 'Hivetz emulsifiers for feed. Ask us for the specification and inclusion rate.',
    icon: Droplets,
    highlights: ['Emulsifier'],
  },
  {
    id: 'oxivet',
    name: 'OXIVET — Antioxidants',
    brand: 'OXIVET',
    category: 'Feed Additives',
    tagline: 'Antioxidants',
    description: 'Hivetz antioxidant for feed. Ask us for the specification and inclusion rate.',
    icon: Flame,
    highlights: ['Antioxidant'],
  },
  {
    id: 'hi-chol',
    name: 'HI CHOL PLUS — Herbal Choline',
    brand: 'HI CHOL PLUS',
    category: 'Feed Additives',
    tagline: 'Herbal choline',
    description: 'Hivetz herbal choline. Ask us for the specification and inclusion rate.',
    icon: HeartPulse,
    highlights: ['Herbal choline'],
  },
  {
    id: 'hi-phersel',
    name: 'HI PHERSEL — Vitamin E with Selenium',
    brand: 'HI PHERSEL',
    category: 'Feed Additives',
    tagline: 'Vitamin E with selenium',
    description: 'Hivetz vitamin E with selenium. Ask us for the specification and inclusion rate.',
    icon: Pill,
    highlights: ['Vitamin E + selenium'],
  },
  {
    id: 'bestaci',
    name: 'BESTACI — Acidifier',
    brand: 'BESTACI',
    category: 'Feed Additives',
    tagline: 'Acidifier',
    description: 'Hivetz acidifier. Ask us for the specification and inclusion rate.',
    icon: TestTube,
    highlights: ['Acidifier'],
  },

  // ─── ANTICOCCIDIALS (traded) ───────────────────────────────────────────────
  { id: 'madu-nica', name: 'Maduramycin (0.75%) + Nicarbazin (8%)', category: 'Anti Coccidial', tagline: 'Anticoccidial premix', description: TRADED, icon: Bug, highlights: ['Maduramycin 0.75%', 'Nicarbazin 8%'] },
  { id: 'mone-nica', name: 'Monensin Sodium (8%) + Nicarbazin (8%)', category: 'Anti Coccidial', tagline: 'Anticoccidial premix', description: TRADED, icon: Bug, highlights: ['Monensin sodium 8%', 'Nicarbazin 8%'] },
  { id: 'diclazuril', name: 'Diclazuril 0.5%', category: 'Anti Coccidial', tagline: 'Anticoccidial', description: TRADED, icon: ShieldCheck, highlights: ['Diclazuril 0.5%'] },
  { id: 'salinomycin', name: 'Salinomycin 12%', category: 'Anti Coccidial', tagline: 'Anticoccidial', description: TRADED, icon: Zap, highlights: ['Salinomycin 12%'] },
  { id: 'amprolium', name: 'Amprolium 0.75%', category: 'Anti Coccidial', tagline: 'Anticoccidial', description: TRADED, icon: Bug, highlights: ['Amprolium 0.75%'] },
  { id: 'clopidol', name: 'Clobest 25 (Clopidol 25%)', category: 'Anti Coccidial', tagline: 'Anticoccidial', description: TRADED, icon: ShieldCheck, highlights: ['Clopidol 25%'] },
  { id: 'nicarbazin', name: 'Nicarbazin 25%', category: 'Anti Coccidial', tagline: 'Anticoccidial', description: TRADED, icon: Bug, highlights: ['Nicarbazin 25%'] },

  // ─── DISINFECTANTS (Hivetz brand) ──────────────────────────────────────────
  {
    id: 'sterivetz',
    name: 'Sterivetz +',
    brand: 'Sterivetz +',
    category: 'Disinfectants',
    tagline: 'Multipurpose broad-spectrum disinfectant',
    description:
      'A bactericidal, virucidal and antifungal disinfectant for comprehensive farm and poultry sanitation. It eliminates all major poultry pathogens for superior biosecurity and disease control.',
    icon: ShieldCheck,
    highlights: ['1 Ltr · 5 Ltr', 'Bactericidal · virucidal · antifungal'],
    composition:
      'Didecyl dimethyl ammonium chloride 9.2% w/v; alkyl (C12-61%, C14-23%, C16-11%) dimethyl benzyl ammonium chloride 9.2% w/v; alkyl (C12-40%, C14-50%, C16-10%) dimethyl benzyl ammonium chloride 4.6% v/v; bis-n-tributyltin oxide 1.0% v/v.',
  },
  {
    id: 'sterioxx',
    name: 'SteriOx',
    brand: 'SteriOx',
    category: 'Disinfectants',
    tagline: 'Ultimate high-level disinfectant',
    description:
      'Destroys microorganisms by oxidizing sulfur bonds in proteins and enzymes, disrupting cellular function and rupturing the cell membrane. Effective against bacteria, viruses, fungi and spores in high-risk environments.',
    icon: Flame,
    highlights: ['500 g · 1 Kg', 'Bacteria · viruses · fungi · spores'],
    composition:
      'Potassium monopersulphate compound (triple salt) 49.8% w/w; sodium chloride 1.5% w/w; inert ingredients Q.S.',
  },
  {
    id: 'gludac',
    name: 'Gludac',
    brand: 'Gludac',
    category: 'Disinfectants',
    tagline: 'High-level synergistic broad-spectrum disinfectant',
    description:
      'Multi-action protection: biocidal, fungicidal, virucidal, sporicidal, mycobactericidal and yeasticidal activity, for environments that need maximum hygiene and rapid microbial kill.',
    icon: Shield,
    highlights: ['1 Ltr · 5 Ltr', 'Glutaraldehyde + quats'],
    composition:
      'Didecyl dimethyl ammonium chloride 7.80% w/w; alkyl dimethyl benzyl ammonium chlorides I.P. 10.00% v/v and 7.06% v/v; strong glutaraldehyde solution 10.73% v/v; inert ingredients Q.S.',
  },
  {
    id: 'merisan',
    name: 'Merisan Extra',
    brand: 'Merisan Extra',
    category: 'Disinfectants',
    tagline: 'Aldehyde-based surface and environmental disinfectant',
    description: 'Excellent cleansing property and a broad spectrum of germicidal action.',
    icon: Shield,
    highlights: ['500 ml · 1 Ltr · 5 Ltr', 'Aldehyde-based'],
    composition:
      'Each 100 g contains: (ethylenedioxy) dimethanol 14.1 g; didecyldimethyl ammonium chloride 16.0 g; glutaraldehyde 5.0 g; specialized inbuilt cleansers and corrosion inhibitors.',
  },

  // ─── OTHERS (traded) ───────────────────────────────────────────────────────
  { id: 'life-gus', name: 'Probiotics — Life Gus', brand: 'Life Gus', category: 'Others', tagline: 'Probiotics', description: TRADED, icon: Sprout, highlights: ['Probiotic'] },
  { id: 'phytase', name: 'Phytase — Thermostable & Non-thermostable', category: 'Others', tagline: 'Feed enzyme', description: TRADED, icon: FlaskConical, highlights: ['Thermostable', 'Non-thermostable'] },
  { id: 'butyrate', name: 'Sodium Butyrate 90% Coated', category: 'Others', tagline: 'Feed grade, coated', description: TRADED, icon: Layers, highlights: ['90% coated'] },
  { id: 'acid-eo', name: 'Acidifier with Essential Oil', category: 'Others', tagline: 'Acidifier with essential oil', description: TRADED, icon: Droplets, highlights: ['With essential oil'] },
  { id: 'cyromax', name: 'Cyromycin 2% PX (Cyromax)', brand: 'Cyromax', category: 'Others', tagline: 'Cyromycin 2% PX', description: TRADED, icon: Microscope, highlights: ['Cyromycin 2%'] },
];
