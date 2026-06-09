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

export const products: Product[] = [

  // ─── PREMIXES ────────────────────────────────────────────────────────────────
  {
    id: 'vp-broiler',
    name: 'Vitamin Premix — For Broiler',
    brand: 'HIBRO PX+',
    category: 'Premixes',
    tagline: 'Peak growth & feed conversion for commercial broilers',
    description:
      'High-density vitamin stack engineered for modern fast-growing broiler genetics. Optimises daily weight gain, uniformity, and FCR across starter, grower, and finisher phases.',
    icon: Sparkles,
    highlights: ['A · D3 · E · K3', 'Full B-complex', 'Heat-stable'],
    benefits: [
      'Ensures ideal broiler growth and production performance',
      'Enhances immunity and magnificent meat yield',
      'Delivers healthy liveability through finisher phase',
    ],
    application: 'Starter / Grower / Finisher diets at recommended inclusion.',
  },
  {
    id: 'vp-breeder',
    name: 'Vitamin Premix — For Breeder',
    brand: 'HIBREED PX',
    category: 'Premixes',
    tagline: 'Fertility & hatchability support for breeder flocks',
    description:
      'Elevated Vitamin E, biotin, and folic acid to maximise fertility, embryo viability, and first-week chick quality in parent stock.',
    icon: Sparkles,
    highlights: ['Hatchability boost', 'Elevated Vit E', 'Chick livability'],
    benefits: [
      'Assures optimum vitamin levels for improved growth and reproduction',
      'Protects against vitamin deficiencies — excellent hatchability',
      'Finest bird uniformity and egg quality',
    ],
    application: 'Pre-breeder through peak production.',
  },
  {
    id: 'vp-layer',
    name: 'Vitamin Premix — For Layer',
    brand: 'LAY MIX PX',
    category: 'Premixes',
    tagline: 'Sustained production & shell quality for layers',
    description:
      'Balanced vitamin profile supporting persistent egg production, shell strength, and yolk colour from peak production through late lay.',
    icon: Wheat,
    highlights: ['Persistency', 'Shell strength', 'Yolk pigmenter'],
    benefits: [
      'Achieves egg uniformity and consistency',
      'Enhances bird immunity for better productivity',
      'Supports optimum growth and improves egg production',
    ],
    application: 'In-plant premix from peak through late lay.',
  },
  {
    id: 'vp-country',
    name: 'Vitamin Premix — For Country Bird',
    category: 'Premixes',
    tagline: 'Robust immunity & growth for native & desi breeds',
    description:
      'Tailored vitamin fortification for slower-growing native and country bird strains raised in semi-intensive and backyard systems.',
    icon: Leaf,
    highlights: ['Immunity focus', 'Stress tolerant', 'Low inclusion'],
  },
  {
    id: 'conc-premix',
    name: 'Poultry Feed Premix — Concentrate',
    category: 'Premixes',
    tagline: 'All-in-one vitamin + mineral concentrate',
    description:
      'High-potency concentrate premix combining vitamins, trace minerals, and performance additives in a single inclusion point for simplified feed manufacturing.',
    icon: Layers,
    highlights: ['Vit + Min + Additive', 'Single inclusion', 'Reduces SKUs'],
  },
  {
    id: 'combo-premix',
    name: 'Combo Premix — with AA 0.5%–1%',
    category: 'Premixes',
    tagline: 'Vitamin-mineral-amino acid combo premix',
    description:
      'Flexible combo premix with amino acid inclusion (0.5%–1%) for integrators running multiple species or house brands. Customisable ratios on request.',
    icon: FlaskConical,
    highlights: ['With amino acids', 'Customisable', 'Cost-efficient'],
  },
  {
    id: 'aqua-premix',
    name: 'Aqua Premix',
    category: 'Premixes',
    tagline: 'Specialised vitamin-mineral premix for aquaculture',
    description:
      'Water-stable vitamin and mineral premix for shrimp, fish, and other aqua species — supporting growth, immunity, and survival rates.',
    icon: Fish,
    highlights: ['Water-stable', 'Shrimp & fish', 'Growth support'],
  },
  {
    id: 'cattle-premix',
    name: 'Cattle Premix',
    category: 'Premixes',
    tagline: 'Complete micronutrient support for dairy & beef cattle',
    description:
      'Vitamin and chelated mineral premix for dairy and beef cattle, supporting milk production, reproductive performance, and hoof health.',
    icon: Beef,
    highlights: ['Dairy & beef', 'Chelated minerals', 'Reproduction'],
  },

  // ─── FEED ADDITIVES ──────────────────────────────────────────────────────────
  {
    id: 'hi-min-inorganic',
    name: 'HI MIN — Trace Minerals Inorganic',
    brand: 'HI MIN BROILER/BREEDER',
    category: 'Feed Additives',
    tagline: 'Sulphate-based trace mineral matrix',
    description:
      'Blended zinc, copper, manganese, iron, iodine, and selenium sulphates providing cost-effective mineral fortification for standard commercial diets.',
    icon: Beaker,
    highlights: ['Zn · Cu · Mn · Fe', 'Sulphate form', 'Cost-effective'],
  },
  {
    id: 'hi-min-organic',
    name: 'HI MIN — Trace Minerals Organic',
    brand: 'HI MIN BROILER/BREEDER',
    category: 'Feed Additives',
    tagline: 'Chelated trace minerals for superior bioavailability',
    description:
      'Amino-acid chelated zinc, copper, manganese, and selenium for superior gut absorption, skeletal integrity, eggshell thickness, and reproductive performance.',
    icon: Microscope,
    highlights: ['Glycine chelates', 'Higher bioavailability', 'Low inclusion'],
  },
  {
    id: 'hi-bind',
    name: 'HI BIND — Toxin Binder',
    brand: 'HI BIND',
    category: 'Feed Additives',
    tagline: 'Broad-spectrum mycotoxin binder',
    description:
      'Activated bentonite, yeast cell-wall mannan, and montmorillonite working together to adsorb aflatoxin, ochratoxin, zearalenone, and DON without binding nutrients.',
    icon: Shield,
    highlights: ['Multi-mycotoxin', 'pH-stable', 'No nutrient loss'],
  },
  {
    id: 'hi-dol',
    name: 'HI DOL PLUS / HI DOL X — Emulsifiers',
    brand: 'HI DOL PLUS / HI DOL X',
    category: 'Feed Additives',
    tagline: 'Lysolecithin-based fat emulsification',
    description:
      'Enzymatic lysolecithin blend (HI DOL PLUS / HI DOL X) that improves fat digestibility in high-energy diets, enables fat reduction, and lowers feed cost per kg of gain.',
    icon: Droplets,
    highlights: ['Lysolecithin', '+Energy recovery', 'Cost reduction'],
  },
  {
    id: 'oxivet',
    name: 'OXIVET — Antioxidants',
    brand: 'OXIVET',
    category: 'Feed Additives',
    tagline: 'Feed-grade antioxidant preservation system',
    description:
      'OXIVET protects fat, fat-soluble vitamins, and feed pellets from oxidative rancidity during storage, extending shelf life and preserving nutritional value.',
    icon: Flame,
    highlights: ['Natural tocopherols', 'BHA/BHT free option', 'Extended shelf life'],
  },
  {
    id: 'hi-chol-plus',
    name: 'HI CHOL PLUS — Herbal Choline',
    brand: 'HI CHOL PLUS',
    category: 'Feed Additives',
    tagline: 'Herbal choline for liver function & fat metabolism',
    description:
      'Plant-derived herbal choline formulation supporting liver detoxification, fat metabolism, and methyl group transfer. A natural alternative to synthetic choline chloride.',
    icon: HeartPulse,
    highlights: ['Herbal source', 'Liver detox', 'Fat metabolism'],
  },
  {
    id: 'hi-phersel',
    name: 'HI PHERSEL — Vitamin E with Selenium',
    brand: 'HI PHERSEL',
    category: 'Feed Additives',
    tagline: 'Antioxidant duo for immunity & reproduction',
    description:
      'HI PHERSEL combines Vitamin E and selenium for synergistic antioxidant protection — essential for breeder fertility, immune response, and heat-stress management.',
    icon: Pill,
    highlights: ['Vit E + Se', 'Breeder fertility', 'Heat stress'],
  },
  {
    id: 'bestaci',
    name: 'BESTACI — Acidifier',
    brand: 'BESTACI',
    category: 'Feed Additives',
    tagline: 'Organic acid blend for gut health & pathogen control',
    description:
      'BESTACI is a balanced blend of formic, propionic, and butyric acids for pH reduction in feed and water, controlling Salmonella, E. coli, and improving gut integrity.',
    icon: TestTube,
    highlights: ['Organic acids', 'Salmonella control', 'Gut pH'],
  },

  // ─── ANTI COCCIDIAL ──────────────────────────────────────────────────────────
  {
    id: 'maduram-nicarb',
    name: 'Maduramycin (0.75%) + Nicarbazine (8%)',
    category: 'Anti Coccidial',
    tagline: 'Dual-action ionophore + chemical combination',
    description:
      'Synergistic combination of maduramycin ammonium and nicarbazine for broad-spectrum coccidiosis control with reduced resistance risk in broiler programmes.',
    icon: Bug,
    highlights: ['Broad spectrum', 'Shuttle-ready', 'Reduced resistance'],
  },
  {
    id: 'monens-nicarb',
    name: 'Monensin Sodium (8%) + Nicarbazine (8%)',
    category: 'Anti Coccidial',
    tagline: 'Ionophore-chemical combination for robust protection',
    description:
      'Monensin sodium paired with nicarbazine for enhanced coccidiosis efficacy, particularly effective against E. tenella and E. acervulina in broiler grower diets.',
    icon: ShieldCheck,
    highlights: ['E. tenella · E. acervulina', 'Grower phase', 'Combination'],
  },
  {
    id: 'diclazuril',
    name: 'Diclazuril 0.5%',
    category: 'Anti Coccidial',
    tagline: 'Triazine-based chemical coccidiostat',
    description:
      'Low-inclusion triazinone coccidiostat with activity across all pathogenic Eimeria species. Suitable for finisher and withdrawal-friendly programmes.',
    icon: Zap,
    highlights: ['0.5% active', 'All Eimeria spp.', 'Low inclusion'],
  },
  {
    id: 'salinomycin',
    name: 'Salinomycin 12%',
    category: 'Anti Coccidial',
    tagline: 'Ionophore coccidiostat for broilers',
    description:
      'Salinomycin 12% is a naturally derived ionophore antibiotic providing effective control of Eimeria species in broiler starter and grower phases.',
    icon: Bug,
    highlights: ['12% active', 'Ionophore', 'Starter/grower'],
  },
  {
    id: 'amprolium',
    name: 'Amprolium 0.75%',
    category: 'Anti Coccidial',
    tagline: 'Thiamine analogue coccidiostat',
    description:
      'Amprolium 0.75% acts as a competitive thiamine antagonist, inhibiting Eimeria development. Safe for use close to slaughter with low withdrawal period.',
    icon: ShieldCheck,
    highlights: ['0.75% active', 'Low withdrawal', 'Safe near slaughter'],
  },

  // ─── DISINFECTANTS ───────────────────────────────────────────────────────────
  {
    id: 'sterivetz-plus',
    name: 'Sterivetz Plus',
    brand: 'Sterivetz Plus',
    category: 'Disinfectants',
    tagline: 'Multipurpose broad-spectrum farm disinfectant',
    description:
      'A powerful bactericidal, virucidal, and antifungal disinfectant designed for comprehensive farm and poultry sanitation. Effectively eliminates all major poultry pathogens, ensuring superior biosecurity and disease control.',
    icon: ShieldCheck,
    highlights: ['Bactericidal', 'Virucidal', 'Antifungal'],
  },
  {
    id: 'steriox',
    name: 'SteriOx',
    brand: 'SteriOx',
    category: 'Disinfectants',
    tagline: 'Ultimate high-level oxidising disinfectant',
    description:
      'SteriOx destroys harmful microorganisms by oxidising sulfur bonds in proteins and enzymes, disrupting cellular functions and causing rupture of the microbial cell membrane. Extremely effective against bacteria, viruses, fungi, and spores.',
    icon: Flame,
    highlights: ['Oxidising action', 'Spore-active', 'High-risk environments'],
  },
  {
    id: 'gludac',
    name: 'Gludac',
    brand: 'Gludac',
    category: 'Disinfectants',
    tagline: 'High-level synergistic broad-spectrum disinfectant',
    description:
      'Gludac delivers strong multi-action protection with biocidal, fungicidal, virucidal, sporicidal, mycobactericidal, and yeasticidal activity. Formulated for environments requiring maximum hygiene and rapid microbial kill across a wide spectrum.',
    icon: Shield,
    highlights: ['Sporicidal', 'Mycobactericidal', 'Rapid kill'],
  },
  {
    id: 'merisan',
    name: 'Merisan DS / Marisan Extra',
    brand: 'Merisan DS',
    category: 'Disinfectants',
    tagline: 'Dual-strength farm sanitation disinfectant',
    description:
      'Merisan DS and Marisan Extra provide reliable broad-spectrum sanitation for poultry houses, hatcheries, and farm equipment between flocks.',
    icon: Shield,
    highlights: ['Two strengths', 'Farm & hatchery', 'Between flocks'],
  },

  // ─── OTHERS ──────────────────────────────────────────────────────────────────
  {
    id: 'probiotics',
    name: 'Probiotics — Life Gus',
    brand: 'Life Gus',
    category: 'Others',
    tagline: 'Live multi-strain probiotic for gut health',
    description:
      'Life Gus is a multi-strain Bacillus and Lactobacillus probiotic for microflora balance, necrotic enteritis control, and improved feed conversion in broilers and layers.',
    icon: Sprout,
    highlights: ['10⁹ CFU/g', 'Multi-strain', 'Spore-forming'],
  },
  {
    id: 'phytase',
    name: 'Phytase — Thermostable & Non-thermostable',
    category: 'Others',
    tagline: 'Phosphorus-releasing enzyme for feed cost reduction',
    description:
      'Available in thermostable and non-thermostable forms. Breaks down phytic acid in plant-based feeds, releasing phosphorus and reducing inorganic phosphate supplementation costs.',
    icon: FlaskConical,
    highlights: ['Thermo & non-thermo', 'P-release', 'Cost saving'],
  },
  {
    id: 'csb',
    name: 'Feed Grade Sodium Butyrate 90% Coated',
    category: 'Others',
    tagline: 'Slow-release butyrate for gut integrity',
    description:
      'Micro-encapsulated sodium butyrate at 90% for targeted delivery to the lower intestine — supporting villi development, tight-junction integrity, and Salmonella control.',
    icon: Layers,
    highlights: ['90% coated', 'Enteric release', 'Villi development'],
  },
  {
    id: 'acidifier-eo',
    name: 'Acidifier with Essential Oil',
    category: 'Others',
    tagline: 'Synergistic acid-phytogenic blend',
    description:
      'Combination of organic acids with essential oils (thymol, carvacrol, cinnamaldehyde) for enhanced antimicrobial activity, gut integrity, and palatability improvement.',
    icon: Droplets,
    highlights: ['Acids + essential oils', 'AGP-free', 'Gut integrity'],
  },
  {
    id: 'cyromycin',
    name: 'Cyromycin 2% Px (Cyromax)',
    category: 'Others',
    tagline: 'Flavophospholipol growth promotor',
    description:
      'Cyromycin (Cyromax) 2% provides flavophospholipol-based growth promotion, improving feed efficiency and weight gain in broiler and swine diets.',
    icon: Zap,
    highlights: ['Flavophospholipol', 'Growth promotion', 'Feed efficiency'],
  },
];
