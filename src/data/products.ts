export type InfillFinish = 'gold' | 'silver' | 'raw';
export type ProductCategory = 'pocket' | 'altar' | 'desk' | 'gift_set';
export type SvgMotifType = 'ganesha' | 'trishul' | 'om' | 'hanuman' | 'gayatri' | 'buddha';

export interface StoneProduct {
  id: string;
  slug: string;
  name: string;
  deity: string;
  sanskritMantra: string;
  category: ProductCategory;
  basePrice: number; // in INR
  stoneDimensions: string;
  weightGrams: number;
  stockBatchCount: number; // e.g. 7 to 15
  description: string;
  spiritualSignificance: string;
  imagesByFinish: Record<InfillFinish, string>;
  svgMotifType: SvgMotifType;
}

export const products: StoneProduct[] = [
  {
    id: "stone-ganesha-pocket",
    slug: "minimalist-ganesha-palm-stone",
    name: "Minimalist Ganesha Palm Stone",
    deity: "Lord Ganesha",
    sanskritMantra: "ॐ गं गणपतये नमः",
    category: "pocket",
    basePrice: 499,
    stoneDimensions: "5–7 cm Smooth Oval Narmada Pebble",
    weightGrams: 160,
    stockBatchCount: 11,
    description:
      "Hand-selected black river basalt naturally sculpted by sacred waters, fiber-laser engraved with the minimalist Lord Ganesha icon. Silky smooth in the palm, tailored for pocket carry during high-stakes endeavors and daily transitions.",
    spiritualSignificance:
      "Lord Ganesha is the remover of all obstacles (Vighnaharta) and patron of new beginnings. Holding this pocket pebble grounds overactive thoughts, invoking calm discernment and auspicious momentum.",
    imagesByFinish: {
      gold: "/images/products/ganesha-gold.webp",
      silver: "/images/products/ganesha-silver.webp",
      raw: "/images/products/ganesha-raw.webp",
    },
    svgMotifType: "ganesha",
  },
  {
    id: "stone-shiva-trishul-altar",
    slug: "shiva-trishul-damru-basalt-rock",
    name: "Shiva Trishul & Damru Basalt Rock",
    deity: "Lord Shiva (Mahadev)",
    sanskritMantra: "ॐ नमः शिवाय",
    category: "altar",
    basePrice: 899,
    stoneDimensions: "10–12 cm Dense Volcanic Basalt Slab",
    weightGrams: 520,
    stockBatchCount: 8,
    description:
      "Substantial, self-standing dark river basalt stone deeply incised with Mahadev's Trishul intertwined with the cosmic Damru and crescent moon. A majestic centerpiece for personal mandirs and meditation sanctums.",
    spiritualSignificance:
      "The Trishul represents sovereignty over the three gunas (Sattva, Rajas, Tamas) and time itself. The Damru emits the primal cosmic vibration from which creation unfolds. Acts as a potent grounding anchor for Dhyana.",
    imagesByFinish: {
      gold: "/images/products/trishul-gold.webp",
      silver: "/images/products/trishul-silver.webp",
      raw: "/images/products/trishul-raw.webp",
    },
    svgMotifType: "trishul",
  },
  {
    id: "stone-om-mandala-pocket",
    slug: "sacred-om-mandala-worry-stone",
    name: "Sacred Om Mandala Worry Stone",
    deity: "The Primordial Cosmos (Brahman)",
    sanskritMantra: "ॐ शान्तिः शान्तिः शान्तिः",
    category: "pocket",
    basePrice: 449,
    stoneDimensions: "6–7 cm Ergonomic Oval Basalt",
    weightGrams: 140,
    stockBatchCount: 14,
    description:
      "Featuring a soothing thumb contour on the reverse and a laser-micro-etched Sanskrit Om encased in concentric mandala geometry. Crafted specifically for mindful touch, breathwork, and tactile stress dispersion.",
    spiritualSignificance:
      "Om is the timeless sonic signature of the universe. Tactile repetition across its etched contours calms the nervous system, drawing awareness inward toward stillness and peace.",
    imagesByFinish: {
      gold: "/images/products/om-gold.webp",
      silver: "/images/products/om-silver.webp",
      raw: "/images/products/om-raw.webp",
    },
    svgMotifType: "om",
  },
  {
    id: "stone-hanuman-desk",
    slug: "sankat-mochan-hanuman-silhouette",
    name: "Sankat Mochan Hanuman Silhouette",
    deity: "Lord Hanuman (Maruti)",
    sanskritMantra: "ॐ हं हनुमते नमः",
    category: "desk",
    basePrice: 999,
    stoneDimensions: "9–11 cm Upright Standing River Basalt",
    weightGrams: 460,
    stockBatchCount: 9,
    description:
      "A striking silhouette of Veer Hanuman carrying the Sanjeevani mountain with his formidable Gada, carved onto an upright river stone with a naturally stable flat base. A commanding, silent companion for study tables and executive workstations.",
    spiritualSignificance:
      "Emblem of selfless courage, unyielding physical endurance, and focused willpower. Guarding your workspace against apathy, inertia, and anxiety while instilling unwavering confidence.",
    imagesByFinish: {
      gold: "/images/products/hanuman-gold.webp",
      silver: "/images/products/hanuman-silver.webp",
      raw: "/images/products/hanuman-raw.webp",
    },
    svgMotifType: "hanuman",
  },
  {
    id: "stone-gayatri-altar",
    slug: "gayatri-mantra-sanctum-slab",
    name: "Gayatri Mantra Sanctum Slab",
    deity: "Devi Gayatri / Savitr",
    sanskritMantra: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
    category: "altar",
    basePrice: 1299,
    stoneDimensions: "13–15 cm Wide Flat Basalt Tablet",
    weightGrams: 850,
    stockBatchCount: 7,
    description:
      "Broad, heavy hand-split river basalt slab inscribed with the 24 sacred syllables of the Vedic Gayatri Mantra in pristine Devanagari script, surrounded by radiant solar flares. The crown jewel of any altar or sacred bookshelf.",
    spiritualSignificance:
      "The supreme Vedic prayer invoking the radiant solar essence to illumine the seeker's intellect. Radiates high-vibrational harmony, purifying the ambient energy of living spaces.",
    imagesByFinish: {
      gold: "/images/products/gayatri-gold.webp",
      silver: "/images/products/gayatri-silver.webp",
      raw: "/images/products/gayatri-raw.webp",
    },
    svgMotifType: "gayatri",
  },
  {
    id: "stone-buddha-desk",
    slug: "meditating-buddha-zen-river-pebble",
    name: "Meditating Buddha Zen River Pebble",
    deity: "Gautama Buddha",
    sanskritMantra: "बुद्धं शरणं गच्छामि",
    category: "desk",
    basePrice: 799,
    stoneDimensions: "8–10 cm Contoured River Basalt",
    weightGrams: 320,
    stockBatchCount: 12,
    description:
      "Minimalist zen line-work engraving of Lord Buddha in Padmasana meditation posture on a dark charcoal river basalt stone with subtle mineral flecks. Designed to anchor focus during demanding digital work.",
    spiritualSignificance:
      "Inspires equanimity, stillness, and mindful pauses throughout chaotic workdays. Reminds the observer to step back into the role of the silent, undisturbed witness.",
    imagesByFinish: {
      gold: "/images/products/buddha-gold.webp",
      silver: "/images/products/buddha-silver.webp",
      raw: "/images/products/buddha-raw.webp",
    },
    svgMotifType: "buddha",
  },
];
