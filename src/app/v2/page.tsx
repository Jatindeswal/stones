"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Compass,
  Feather,
  Hammer,
  HelpCircle,
  Layers,
  MessageCircle,
  Package,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { ProductCardV2 } from "@/components/v2/ProductCardV2";
import { StoneVisualizerV2 } from "@/components/v2/StoneVisualizerV2";
import {
  FINISH_META_V2,
  productsV2,
  type InfillFinishV2,
  type ProductCategoryV2,
} from "@/data/productsV2";
import { SITE, whatsappLink } from "@/lib/site";

const HERO_FINISHES: InfillFinishV2[] = [
  "oiled_basalt",
  "raw_frost",
  "terracotta",
];

const CATEGORIES: { id: "all" | ProductCategoryV2; label: string }[] = [
  { id: "all", label: "All Stones" },
  { id: "pocket", label: "Pocket & Palm" },
  { id: "altar", label: "Altar & Mandir" },
  { id: "desk", label: "Desk & Sanctum" },
];

const CRAFT_STEPS = [
  {
    step: "01",
    title: "Sacred Riverbed Sourcing",
    tagline: "Shaped by Water over Centuries",
    copy: "Each pebble is hand-selected from the sacred riverbeds of the Narmada and Himalayan tributaries. No cutting, no tumbling, no resin moulds — only authentic water-worn volcanic basalt with natural contour.",
    icon: Waves,
  },
  {
    step: "02",
    title: "Fiber Laser Micro-Fracturing",
    tagline: "Sub-Millimeter Crystalline Precision",
    copy: "Using precision optics, our fiber lasers fracture the basalt's microscopic mineral crystals. The heat permanently turns the stone's silica into a crisp, bone-white trench without synthetic paints or toxic dyes.",
    icon: Hammer,
  },
  {
    step: "03",
    title: "Organic Beeswax & Mineral Rub",
    tagline: "Hand-Finished in Quiet Devotion",
    copy: "Every carved stone is bathed in natural cold-pressed linseed oil and organic beeswax for a satin wet-charcoal depth, or hand-rubbed with traditional terracotta mineral clay evoking sacred temple sanctums.",
    icon: Feather,
  },
];

const FAQS = [
  {
    q: "Are these authentic natural river stones?",
    a: "Yes, 100%. Every piece is genuine water-worn volcanic river basalt handpicked from sacred riverbeds including the Narmada and Himalayan tributaries. No two stones are identical in shape, contour, or grain.",
  },
  {
    q: "Is there any paint or chemical enamel used?",
    a: "No. Unlike synthetic commercial merchandise, our raw laser etch exposes the stone's own white silica crystals. Our finishes use only pure cold-pressed linseed oil, natural beeswax, and earthen terracotta mineral clay.",
  },
  {
    q: "Can I wash or perform Abhishekam on the stone?",
    a: "Yes. Natural basalt is deeply resistant to water. For oiled stones, gentle rinsing with water is completely fine; you can occasionally re-nourish the deep charcoal sheen with a drop of coconut or sesame oil.",
  },
  {
    q: "How does reverse-side custom laser inscription work?",
    a: "You can add up to 25 characters (in English or Devanagari script) on the stone's smooth reverse face (+₹99) — perfect for personal sankalpas, names, dates, or sacred bija mantras.",
  },
];

export default function V2LandingPage() {
  const [heroFinish, setHeroFinish] = useState<InfillFinishV2>("oiled_basalt");
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProductCategoryV2>("all");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return productsV2;
    return productsV2.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#1E201D] font-sans antialiased selection:bg-[#A84A2B]/20 selection:text-[#A84A2B]">
      <NavbarV2 />

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-[#D8D0C2]">
        {/* Ambient sunlit gradient accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(216,208,194,0.45),transparent_70%)]"
        />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-28">
          {/* Left Hero Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3B5249]/30 bg-[#3B5249]/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3B5249]">
              <Compass className="h-3 w-3" />
              Natural River Basalt • Precision Laser Etched
            </div>

            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E201D] leading-[1.08]">
              Shaped by the River. <br />
              <span className="italic font-normal text-[#A84A2B]">
                Carved in Quiet Devotion.
              </span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#5C5E58]">
              Natural volcanic basalt hand-selected from sacred Indian riverbeds,
              micro-fractured with permanent laser precision and hand-rubbed with organic
              linseed beeswax or temple terracotta. Zero synthetic paints. Honest tactile weight.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#collection"
                className="inline-flex items-center gap-2 rounded-full border border-[#A84A2B] bg-[#A84A2B] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-all hover:bg-[#8E3B20] hover:shadow-xl active:scale-95"
              >
                <span>Explore River Stones</span>
                <Sparkles className="h-4 w-4" />
              </a>

              <a
                href="#process"
                className="inline-flex items-center gap-2 rounded-full border border-[#D8D0C2] bg-[#FDFBF7] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#1E201D] transition-colors hover:border-[#1E201D] hover:bg-[#EBE5D9]"
              >
                Our 3-Step Craft
              </a>
            </div>

            {/* Quick Proof Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#D8D0C2] pt-6 text-[#5C5E58]">
              <div>
                <p className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#1E201D]">
                  100%
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#5C5E58]">
                  Natural River Stone
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#1E201D]">
                  0.02 mm
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#5C5E58]">
                  Fiber Laser Detail
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#A84A2B]">
                  0 Paint
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#5C5E58]">
                  Pure Mineral & Beeswax
                </p>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive Daylight Stone Visualizer */}
          <div className="relative flex flex-col items-center">
            <div className="relative flex w-full max-w-lg flex-col items-center justify-center rounded-3xl border border-[#D8D0C2] bg-[#EBE5D9] p-8 shadow-xl">
              <div className="absolute top-4 left-5 flex items-center gap-2">
                <span className="rounded-full border border-[#D8D0C2] bg-[#FDFBF7] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#5C5E58] font-semibold">
                  Ganesha Palm Stone • Studio Preview
                </span>
              </div>

              <div className="my-6">
                <StoneVisualizerV2
                  motif="ganesha"
                  finish={heroFinish}
                  size="xl"
                />
              </div>

              {/* Finish Switcher Cards */}
              <div className="grid w-full grid-cols-3 gap-2 border-t border-[#D8D0C2]/80 pt-4">
                {HERO_FINISHES.map((key) => {
                  const meta = FINISH_META_V2[key];
                  const isSelected = heroFinish === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setHeroFinish(key)}
                      aria-pressed={isSelected}
                      className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-center transition-all ${
                        isSelected
                          ? "border-[#A84A2B] bg-[#FDFBF7] text-[#A84A2B] shadow-sm font-bold"
                          : "border-[#D8D0C2] bg-[#FDFBF7]/60 text-[#5C5E58] hover:border-[#1E201D]/30"
                      }`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-black/15 shadow-inner"
                        style={{ backgroundColor: meta.swatchHex }}
                      />
                      <span className="text-[10px] uppercase tracking-wider">
                        {meta.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-center text-[10.5px] text-[#5C5E58]">
                {FINISH_META_V2[heroFinish].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COLLECTION SECTION ================= */}
      <section id="collection" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#3B5249] mb-2 font-semibold">
              <Compass className="h-4 w-4" />
              <span className="text-[11px] uppercase tracking-[0.22em]">
                Authentic River Basalt Series
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E201D]">
              Sacred River Collection
            </h2>
            <p className="mt-2 text-sm text-[#5C5E58] max-w-xl">
              Each stone is shaped naturally by water and fiber-laser etched in our workshop.
              Select your preferred finish upon acquisition.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-all duration-200 ${
                    isActive
                      ? "border-[#A84A2B] bg-[#A84A2B] text-white font-bold shadow-sm"
                      : "border-[#D8D0C2] bg-[#FDFBF7] text-[#5C5E58] hover:border-[#1E201D] hover:text-[#1E201D]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCardV2 key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= CRAFT PROCESS SECTION ================= */}
      <section id="process" className="border-t border-[#D8D0C2] bg-[#EBE5D9]/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-[#3B5249]">
              Provenance & Workshop Method
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E201D]">
              How Each Sacred Stone is Born
            </h2>
            <p className="text-sm text-[#5C5E58]">
              We reject molded imitation stone and synthetic paints. Here is how our riverbed craft works from water to sanctum.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {CRAFT_STEPS.map((s) => {
              const IconComp = s.icon;
              return (
                <div
                  key={s.step}
                  className="relative rounded-2xl border border-[#D8D0C2] bg-[#FDFBF7] p-8 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#A84A2B]">
                        {s.step}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#EBE5D9] text-[#3B5249]">
                        <IconComp className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#1E201D] mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#A84A2B] font-semibold mb-3">
                      {s.tagline}
                    </p>
                    <p className="text-xs leading-relaxed text-[#5C5E58]">
                      {s.copy}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FAQ & STONE CARE ================= */}
      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#3B5249]">
            Questions & Vedic Care
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#1E201D]">
            Authenticity & Stone Longevity
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#D8D0C2] bg-[#FDFBF7] p-5 shadow-sm space-y-2"
            >
              <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#1E201D] flex items-center gap-2.5">
                <HelpCircle className="h-4 w-4 text-[#A84A2B] shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs leading-relaxed text-[#5C5E58] pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* WhatsApp Custom Order Banner */}
        <div className="mt-14 rounded-2xl border border-[#A84A2B]/40 bg-[#EBE5D9] p-8 text-center space-y-4 shadow-sm">
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#1E201D]">
            Looking for a Specific Vedic Shloka or Custom Motif?
          </h3>
          <p className="text-xs sm:text-sm text-[#5C5E58] max-w-xl mx-auto">
            Our workshop accepts custom family mantras, temple consecration batches, and personalized river stone gifts with hand-cleaved presentation trays.
          </p>
          <a
            href={whatsappLink(
              "Hi SHILA, I'd like to talk about a custom mantra laser carving for a family occasion.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#A84A2B] bg-[#A84A2B] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md hover:bg-[#8E3B20] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat with Master Artisan</span>
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#D8D0C2] bg-[#EBE5D9] py-14 text-xs text-[#5C5E58]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-6 text-center">
          <p className="font-[family-name:var(--font-cormorant)] text-xl font-bold tracking-[0.24em] text-[#1E201D]">
            SHILA • SUNLIT EARTHY CRAFT
          </p>
          <p className="text-xs text-[#5C5E58] max-w-md mx-auto">
            Hand-selected volcanic river basalt engraved with sacred Vedic hymns.
            Finished with organic beeswax and temple terracotta clay.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-wider text-[#1E201D]/70 pt-2">
            <Link href="/v2#collection" className="hover:text-[#A84A2B]">
              Collection
            </Link>
            <Link href="/v2#process" className="hover:text-[#A84A2B]">
              Craft & Provenance
            </Link>
            <Link href="/v2#faq" className="hover:text-[#A84A2B]">
              Stone Care & FAQ
            </Link>
            <Link href="/" className="hover:text-[#A84A2B] font-semibold">
              ← Switch to v1 Obsidian View
            </Link>
          </div>
          <p className="text-[10px] text-[#5C5E58]/80 tracking-wider">
            © 2026 SHILA Sacred Stones. Small-Batch Artisan Workshop.
          </p>
        </div>
      </footer>
    </div>
  );
}
