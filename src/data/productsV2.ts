export type InfillFinishV2 = "oiled_basalt" | "raw_frost" | "terracotta";
export type ProductCategoryV2 = "pocket" | "altar" | "desk" | "gift_set";
export type SvgMotifTypeV2 =
  | "ganesha"
  | "trishul"
  | "om"
  | "hanuman"
  | "gayatri"
  | "buddha";

export interface FinishMetaV2 {
  label: string;
  shortLabel: string;
  description: string;
  swatchHex: string;
}

export const FINISH_META_V2: Record<InfillFinishV2, FinishMetaV2> = {
  oiled_basalt: {
    label: "Beeswax Oiled Basalt",
    shortLabel: "Oiled Basalt",
    description:
      "Hand-rubbed with natural beeswax and cold-pressed linseed oil to turn the stone deep wet-charcoal, creating bold contrast against the bone-white laser etch.",
    swatchHex: "#1C1E1C",
  },
  raw_frost: {
    label: "Raw Laser Frost",
    shortLabel: "Raw Frost",
    description:
      "Unsealed natural matte grey river basalt with a crisp, chalky bone-white micro-fractured laser etch directly in the stone's crystalline grain.",
    swatchHex: "#5A5D58",
  },
  terracotta: {
    label: "Sacred Terracotta Rub",
    shortLabel: "Terracotta Rub",
    description:
      "Laser-carved grooves hand-rubbed with traditional matte terracotta and sacred kumkum mineral clay, evoking temple sanctum offerings.",
    swatchHex: "#A84A2B",
  },
};

export interface StoneProductV2 {
  id: string;
  slug: string;
  name: string;
  deity: string;
  sanskritMantra: string;
  category: ProductCategoryV2;
  basePrice: number; // in INR
  stoneDimensions: string;
  weightGrams: number;
  description: string;
  spiritualSignificance: string;
  provenance: string;
  svgMotifType: SvgMotifTypeV2;
}

export const productsV2: StoneProductV2[] = [
  {
    id: "v2-stone-ganesha-pocket",
    slug: "minimalist-ganesha-palm-stone",
    name: "Minimalist Ganesha Palm Stone",
    deity: "Lord Ganesha",
    sanskritMantra: "ॐ गं गणपतये नमः",
    category: "pocket",
    basePrice: 499,
    stoneDimensions: "5–7 cm Smooth Oval Narmada Pebble",
    weightGrams: 160,
    provenance: "Sacred Narmada Riverbed, Maheshwar, Madhya Pradesh",
    description:
      "Water-worn basalt pebble naturally sculpted by sacred river currents over centuries. Sub-millimeter fiber laser micro-fracturing produces a crisp, bone-white Ganesha silhouette directly into the stone's volcanic silicate crystals without synthetic paints or toxic lacquers.",
    spiritualSignificance:
      "Lord Ganesha is the remover of obstacles (Vighnaharta) and patron of auspicious starts. The tactile weight of the stone in the palm offers instant sensory grounding during chaotic days.",
    svgMotifType: "ganesha",
  },
  {
    id: "v2-stone-shiva-trishul-altar",
    slug: "shiva-trishul-damru-basalt-rock",
    name: "Shiva Trishul & Damru Basalt Rock",
    deity: "Lord Shiva (Mahadev)",
    sanskritMantra: "ॐ नमः शिवाय",
    category: "altar",
    basePrice: 899,
    stoneDimensions: "10–12 cm Dense Volcanic Basalt Slab",
    weightGrams: 520,
    provenance: "Upper Himalayan Foothills, Rishikesh, Uttarakhand",
    description:
      "Substantial, self-standing dark river basalt with a naturally flat river-cleaved base. Deep fiber-laser relief etching reveals Mahadev's Trishul, cosmic Damru, and crescent moon carved directly into the dense volcanic grain.",
    spiritualSignificance:
      "The Trishul represents dominion over past, present, and future, while the Damru vibrates the primordial sound of genesis. Serves as an unshakeable dhyana anchor for home altars.",
    svgMotifType: "trishul",
  },
  {
    id: "v2-stone-om-mandala-pocket",
    slug: "sacred-om-mandala-worry-stone",
    name: "Sacred Om Mandala Worry Stone",
    deity: "The Primordial Cosmos (Brahman)",
    sanskritMantra: "ॐ शान्तिः शान्तिः शान्तिः",
    category: "pocket",
    basePrice: 449,
    stoneDimensions: "6–7 cm Ergonomic Oval Basalt",
    weightGrams: 140,
    provenance: "Narmada Riverbed, Omkareshwar, Madhya Pradesh",
    description:
      "Hand-selected ergonomic river basalt featuring a natural thumb contour on the reverse face. The front is micro-etched with concentric sacred geometry and the timeless Sanskrit Om, intended for mindful touch, breathwork, and sensory grounding.",
    spiritualSignificance:
      "Om embodies the primal vibration underlying all form. Running your thumb across the etched grooves channels nervous energy away and resets conscious breath.",
    svgMotifType: "om",
  },
  {
    id: "v2-stone-hanuman-desk",
    slug: "sankat-mochan-hanuman-silhouette",
    name: "Sankat Mochan Hanuman Silhouette",
    deity: "Lord Hanuman (Maruti)",
    sanskritMantra: "ॐ हं हनुमते नमः",
    category: "desk",
    basePrice: 999,
    stoneDimensions: "9–11 cm Upright Standing River Basalt",
    weightGrams: 460,
    provenance: "Tungabhadra Riverbed (Kishkindha Realm), Karnataka",
    description:
      "Upright-standing dense river basalt with an honest matte profile and naturally stable resting plane. Laser-fractured with Veer Hanuman lifting the Sanjeevani mountain with his Gada, designed to stand steadily on desks and writing stations.",
    spiritualSignificance:
      "Lord Hanuman symbolizes fearless devotion, intellectual clarity, and physical fortitude. An inspiring workspace companion guarding against procrastination and doubt.",
    svgMotifType: "hanuman",
  },
  {
    id: "v2-stone-gayatri-altar",
    slug: "gayatri-mantra-sanctum-slab",
    name: "Gayatri Mantra Sanctum Slab",
    deity: "Devi Gayatri / Savitr",
    sanskritMantra: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
    category: "altar",
    basePrice: 1299,
    stoneDimensions: "13–15 cm Wide Flat Basalt Tablet",
    weightGrams: 850,
    provenance: "Ganga Riverbed, Haridwar, Uttarakhand",
    description:
      "Broad, heavy hand-cleaved river basalt slab engraved with the 24 sacred syllables of the Vedic Gayatri Mantra in traditional Devanagari script, surrounded by etched solar flares. Free of synthetic coatings.",
    spiritualSignificance:
      "The supreme Vedic hymn evoking the radiant solar light of consciousness to awaken intuitive wisdom. Fills meditation corners and living sanctums with serene stillness.",
    svgMotifType: "gayatri",
  },
  {
    id: "v2-stone-buddha-desk",
    slug: "meditating-buddha-zen-river-pebble",
    name: "Meditating Buddha Zen River Pebble",
    deity: "Gautama Buddha",
    sanskritMantra: "बुद्धं शरणं गच्छामि",
    category: "desk",
    basePrice: 799,
    stoneDimensions: "8–10 cm Contoured River Basalt",
    weightGrams: 320,
    provenance: "Falgu Riverbed (Near Bodh Gaya), Bihar",
    description:
      "Naturally rounded water-worn pebble featuring a minimalist line silhouette of Lord Buddha seated in Dhyana Padmasana. Hand-rubbed to reveal the natural basalt texture and subtle micro-mineral crystalline flecks.",
    spiritualSignificance:
      "A quiet visual anchor reminding the observer to cultivate non-reactive awareness, equanimity, and mindful presence amidst fast-paced workdays.",
    svgMotifType: "buddha",
  },
];
