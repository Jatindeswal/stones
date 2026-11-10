"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Gem,
  MessageCircle,
  Mountain,
  Package,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { StoneVisualizer } from "@/components/StoneVisualizer";
import { products } from "@/data/products";
import type { InfillFinish, ProductCategory } from "@/data/products";
import { SITE, whatsappLink } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Static section data                                                */
/* ------------------------------------------------------------------ */

const HERO_FINISHES: InfillFinish[] = ["gold", "silver", "raw"];

const HERO_FINISH_COPY: Record<InfillFinish, { label: string; caption: string }> = {
  gold: {
    label: "24K Gold",
    caption: "24K gold enamel inlay, hand-sealed & mirror-polished",
  },
  silver: {
    label: "Silver",
    caption: "Brushed pure silver inlay for a cool, luminous finish",
  },
  raw: {
    label: "Raw Etch",
    caption: "Raw micro-fractured etch — the stone, left entirely untouched",
  },
};

const TRUST_POINTS = [
  {
    icon: Gem,
    title: "100% Natural River Basalt",
    copy: "Collected by hand from the Narmada and Himalayan riverbeds. No resin, no dye, no synthetic stone.",
  },
  {
    icon: ScanLine,
    title: "Precision Micro-Laser Etch",
    copy: "Fiber-laser micro-fracturing at 0.1mm tolerance carves sacred iconography into the basalt itself.",
  },
  {
    icon: ShieldCheck,
    title: "Weatherproof Metallic Enamel",
    copy: "Metallic enamel is oven-cured and sealed, so the inlay will not fade, crack or wash off.",
  },
  {
    icon: Package,
    title: "Velvet Sanctum Pouch Included",
    copy: "Every stone ships in a cushioned velvet sanctum pouch, ready for gifting or your own altar.",
  },
];

type FilterKey = "all" | ProductCategory;

const COLLECTION_FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pocket", label: "Pocket Worry Stones" },
  { key: "altar", label: "Mandir & Altar" },
  { key: "desk", label: "Desk Accents" },
];

const PROCESS_STEPS = [
  {
    number: "01",
    icon: Mountain,
    title: "Hand-Selected River Basalt",
    copy: "Each pebble is chosen by eye for grain, weight and proportion, then river-smoothed over weeks of tumbling until it holds a silky, palm-cool surface.",
    detail: "Narmada · Himalayan basalt",
  },
  {
    number: "02",
    icon: Zap,
    title: "High-Contrast Laser Micro-Fracturing",
    copy: "A fiber laser burns the icon deep into the stone's crystalline structure — not a print, not a sticker, but a true incision that catches light from every angle.",
    detail: "0.1mm tolerance · 6 iconographies",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Hand-Inlaid Gold Enamel & Sealing",
    copy: "Metallic enamel is worked into the incision by hand, then oven-cured and sealed. The result is a mirror-bright 24K line that outlives generations of handling.",
    detail: "24K gold · silver · raw etch",
  },
];

const FAQ_ITEMS = [
  {
    question: "Every stone is different — will mine look exactly like the photo?",
    answer:
      "No two basalt stones are identical, and that is the point. Natural grain, micro-flecks, and the exact silhouette of each pebble vary, so the placement of the iconography shifts slightly from piece to piece. What stays identical is the iconography, the dimensions band, the finish quality, and the mantra. We photograph and ship the actual stone you receive.",
  },
  {
    question: "How durable is the gold inlay? Can I wash the stone?",
    answer:
      "The enamel is oven-cured and sealed, which makes it fully waterproof and resistant to ordinary friction, sun and moisture. You can rinse the stone under cool water with a soft cloth — avoid dish soap, and never use a dishwasher or abrasive scrubber. Dry with a soft cloth and it will keep its mirror lustre for years.",
  },
  {
    question: "When will my Founders' Batch 01 stone be dispatched?",
    answer:
      "Batch 01 is made to order in limited numbers, so dispatch takes 5–7 working days after your order is confirmed — allowing time for stone selection, laser etching, hand inlay and the final sealing cure. You will receive a WhatsApp confirmation with a dispatch tracking update the moment your piece is sealed and packed.",
  },
  {
    question: "Can I request a custom mantra or back-side engraving?",
    answer:
      "Yes. A back-side engraving of up to 25 characters can be added on the product page for a small supplement, and our team can help you commission bespoke iconography or matched altar sets through the Custom Inquiry button in the header.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [heroFinish, setHeroFinish] = useState<InfillFinish>("gold");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  // Automatic finish rotation for the hero showcase (pauses on reduced motion).
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setHeroFinish((current) => {
        const index = HERO_FINISHES.indexOf(current);
        return HERO_FINISHES[(index + 1) % HERO_FINISHES.length];
      });
    }, 4200);

    return () => window.clearInterval(timer);
  }, [heroFinish]);

  const visibleProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Navbar />

      <main className="flex-1">
        {/* ---------------------------------------------- HERO ---------- */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.14),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_85%_80%,rgba(255,255,255,0.05),transparent_70%)]"
          />

          <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-28">
            {/* Copy */}
            <div>
              <span className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.08] px-4 py-1.5 text-center text-[10px] uppercase tracking-[0.18em] text-[#E5C158]">
                <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
                SACRED RIVER BASALT • HAND-SEALED IN 24K GOLD
              </span>

              <h1 className="mt-7 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-[#F4F4F5] sm:text-5xl lg:text-6xl">
                Carved in River Stone.
                <span className="mt-2 block bg-gradient-to-r from-[#FFF3B0] via-[#D4AF37] to-[#AA771C] bg-clip-text text-transparent">
                  Sealed in 24K Gold.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                We hand-select natural basalt stones carried by sacred rivers,
                laser-etch them with precise Vedic iconography, and seal the
                incisions with 24K gold enamel. Each piece is a one-of-one
                ritual object — the river&apos;s own memory, made to be held.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#collection"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#E5C158] to-[#B8912A] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0B0B0C] shadow-[0_10px_40px_-16px_rgba(212,175,55,0.9)] transition-transform duration-300 hover:scale-[1.02]"
                >
                  Explore the Collection
                </a>
                <a
                  href="#process"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:border-white/35 hover:text-white"
                >
                  How It&apos;s Made
                </a>
              </div>

              <dl className="mt-11 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
                {[
                  { label: "Batch 01 Stones", value: "06" },
                  { label: "Natural Basalt", value: "100%" },
                  { label: "Dispatch", value: "5–7 Days" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                      {stat.label}
                    </dt>
                    <dd className="mt-1.5 font-heading text-xl font-semibold text-[#F4F4F5]">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Interactive showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/10 bg-[#121215] p-6 shadow-[0_40px_120px_-50px_rgba(0,0,0,1)] sm:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_60%)]"
              />
              <div className="relative flex flex-col items-center">
                <p className="mb-4 self-start text-[9px] uppercase tracking-[0.24em] text-white/35">
                  Live preview · {HERO_FINISH_COPY[heroFinish].label}
                </p>

                <div className="w-full">
                  <StoneVisualizer
                    motif="ganesha"
                    finish={heroFinish}
                    size="xl"
                    className="mx-auto max-w-xl"
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {HERO_FINISHES.map((finish) => {
                    const isActive = finish === heroFinish;
                    const isGold = finish === "gold";
                    return (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setHeroFinish(finish)}
                        aria-pressed={isActive}
                        className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                          isActive
                            ? isGold
                              ? "border-[#D4AF37]/70 bg-[#D4AF37]/15 text-[#E5C158] shadow-[0_0_24px_-10px_rgba(212,175,55,0.9)]"
                              : finish === "silver"
                                ? "border-white/45 bg-white/10 text-[#E4E4E7]"
                                : "border-white/25 bg-white/[0.07] text-white/80"
                            : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white/85"
                        }`}
                      >
                        {HERO_FINISH_COPY[finish].label}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 max-w-sm text-center text-[11px] leading-relaxed text-white/40">
                  {HERO_FINISH_COPY[heroFinish].caption}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ----------------------------------------- TRUST RIBBON -------- */}
        <section
          aria-label="Product guarantees"
          className="border-b border-white/5 bg-[#0E0E10]"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="group bg-[#0E0E10] px-6 py-8 transition-colors duration-500 hover:bg-[#121215]"
                >
                  <Icon
                    className="h-5 w-5 text-[#D4AF37] transition-transform duration-500 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F4F4F5]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/40">
                    {point.copy}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* --------------------------------------- CURATED COLLECTION ---- */}
        <section id="collection" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#D4AF37]">
                  The Curated Collection
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight tracking-tight text-[#F4F4F5] sm:text-4xl">
                  Founders&apos; Batch 01 — Six Sacred Stones
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  Each stone is individually numbered within the batch and
                  released only once. Preview every finish directly on the card,
                  then open a stone to customise its engraving.
                </p>
              </div>

              {/* Filter tabs */}
              <div
                role="tablist"
                aria-label="Filter collection by category"
                className="flex flex-wrap gap-2"
              >
                {COLLECTION_FILTERS.map((filter) => {
                  const isActive = filter.key === activeFilter;
                  return (
                    <button
                      key={filter.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                        isActive
                          ? "border-[#D4AF37]/70 bg-[#D4AF37]/15 text-[#E5C158]"
                          : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white/85"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 28, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* -------------------------------------------- PROCESS -------- */}
        <section
          id="process"
          className="scroll-mt-24 border-y border-white/5 bg-[#0E0E10] py-20 sm:py-24"
        >
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#D4AF37]">
                The Artisanal Process
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight tracking-tight text-[#F4F4F5] sm:text-4xl">
                Three Steps. One Stone. No Shortcuts.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                From the riverbed to your altar, every piece passes through
                three pairs of hands before it is allowed to leave the sanctum.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PROCESS_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.article
                    key={step.number}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121215] p-7 transition-colors duration-500 hover:border-[#D4AF37]/30"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 -top-6 font-heading text-7xl font-bold text-white/[0.03] transition-colors duration-500 group-hover:text-[#D4AF37]/[0.07]"
                    >
                      {step.number}
                    </span>

                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.08]">
                      <Icon className="h-4.5 w-4.5 text-[#D4AF37]" aria-hidden="true" />
                    </div>

                    <h3 className="relative mt-6 font-heading text-lg font-semibold leading-snug tracking-wide text-[#F4F4F5]">
                      {step.title}
                    </h3>
                    <p className="relative mt-3 text-[12px] leading-relaxed text-white/45">
                      {step.copy}
                    </p>
                    <p className="relative mt-5 border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/70">
                      {step.detail}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ FAQ -------- */}
        <section id="faq" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#D4AF37]">
                Sacred Answers
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight tracking-tight text-[#F4F4F5] sm:text-4xl">
                Before You Begin
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                Stone, sealing, and shipping — answered plainly. For anything
                else, message us directly and a founder will reply personally.
              </p>
              <a
                href={whatsappLink(
                  "Hi SHILA, I have a question about a Founders' Batch 01 stone.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#E5C158] transition-colors hover:bg-[#D4AF37]/20"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Ask on WhatsApp
              </a>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-white/10 bg-[#121215] px-6 py-5 transition-colors duration-300 open:border-[#D4AF37]/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13px] font-medium leading-snug text-[#F4F4F5] marker:hidden">
                    {item.question}
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-[#D4AF37] transition-transform duration-300 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-4 text-[12px] leading-relaxed text-white/45">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* --------------------------------------------- FOOTER --------- */}
      <footer className="border-t border-white/10 bg-[#0E0E10]">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <p className="font-heading text-lg font-semibold tracking-[0.28em] text-[#F4F4F5]">
                {SITE.brand}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-white/40">
                {SITE.brandSuffix}
              </p>
              <p className="mt-5 text-[12px] leading-relaxed text-white/40">
                Hand-selected natural river basalt, laser-etched with sacred
                iconography and sealed in 24K gold enamel. Made in small,
                numbered batches.
              </p>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                  Explore
                </p>
                <ul className="mt-4 space-y-2.5">
                  {COLLECTION_FILTERS.slice(1).map((filter) => (
                    <li key={filter.key}>
                      <a
                        href="#collection"
                        onClick={() => setActiveFilter(filter.key)}
                        className="text-[12px] text-white/55 transition-colors hover:text-[#E5C158]"
                      >
                        {filter.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#process"
                      className="text-[12px] text-white/55 transition-colors hover:text-[#E5C158]"
                    >
                      The Process
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="text-[12px] text-white/55 transition-colors hover:text-[#E5C158]"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                  Contact
                </p>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <a
                      href={whatsappLink(
                        "Hi SHILA, I'd like to enquire about a custom sacred stone order.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[12px] text-white/55 transition-colors hover:text-[#E5C158]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      WhatsApp Inquiry
                    </a>
                  </li>
                  <li className="text-[12px] text-white/45">
                    Batch 01 dispatch · 5–7 working days
                  </li>
                  <li className="text-[12px] text-white/45">
                    Free shipping within India on Batch 01
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <p className="text-[11px] text-white/30">
              © {SITE.copyrightYear} {SITE.brand} — {SITE.brandSuffix}.
              All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/60">
              {SITE.batchLabel}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
