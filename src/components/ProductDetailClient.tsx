"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  Flame,
  HelpCircle,
  Package,
  RotateCcw,
  Ruler,
  ShieldCheck,
  Sparkles,
  Weight,
} from "lucide-react";
import { StoneVisualizer } from "@/components/StoneVisualizer";
import { CheckoutDrawer } from "@/components/CheckoutDrawer";
import type { InfillFinish, StoneProduct } from "@/data/products";

interface ProductDetailClientProps {
  product: StoneProduct;
  initialFinish?: InfillFinish;
}

const FINISH_DETAILS: {
  id: InfillFinish;
  title: string;
  tagline: string;
  badge: string;
  accentBorder: string;
  activeBg: string;
}[] = [
  {
    id: "gold",
    title: "24K Gold Enamel",
    tagline: "Metallic antique gold infill with warm sacred luster",
    badge: "Most Auspicious",
    accentBorder: "border-[#D4AF37] ring-1 ring-[#D4AF37]/50",
    activeBg: "bg-[#D4AF37]/10",
  },
  {
    id: "silver",
    title: "Pure Silver Enamel",
    tagline: "Brushed pure silver metallic leaf with subtle moon sheen",
    badge: "Chandra Radiance",
    accentBorder: "border-white/50 ring-1 ring-white/30",
    activeBg: "bg-white/10",
  },
  {
    id: "raw",
    title: "Raw Frosted Etch",
    tagline: "Laser-fractured chalk-white micro relief in natural stone",
    badge: "Minimalist Stone",
    accentBorder: "border-white/30 ring-1 ring-white/15",
    activeBg: "bg-white/5",
  },
];

export function ProductDetailClient({
  product,
  initialFinish = "gold",
}: ProductDetailClientProps) {
  const searchParams = useSearchParams();
  const urlFinish = searchParams?.get("finish");
  const resolvedInitialFinish: InfillFinish =
    urlFinish === "gold" || urlFinish === "silver" || urlFinish === "raw"
      ? urlFinish
      : initialFinish;

  const [selectedFinish, setSelectedFinish] = useState<InfillFinish>(resolvedInitialFinish);
  const [addBackEngraving, setAddBackEngraving] = useState<boolean>(false);
  const [customBackText, setCustomBackText] = useState<string>("");
  const [viewSide, setViewSide] = useState<"front" | "back">("front");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);

  const totalPrice = product.basePrice + (addBackEngraving ? 99 : 0);

  const handleEngravingToggle = (checked: boolean) => {
    setAddBackEngraving(checked);
    if (checked) {
      setViewSide("back");
    }
  };

  const handleCustomTextChange = (text: string) => {
    setCustomBackText(text);
    if (viewSide !== "back") {
      setViewSide("back");
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ================= LEFT COLUMN: LIVE VISUAL SHOWCASE ================= */}
        <div className="lg:col-span-7">
          <div className="sticky top-24 space-y-4">
            {/* Visualizer Frame */}
            <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#121215] p-6 sm:p-10 shadow-2xl">
              {/* Subtle background sacred gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]"
              />

              {/* View Side Badge */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                  {viewSide === "front" ? "Front: Sacred Motif" : "Reverse: Custom Face"}
                </span>
              </div>

              {/* The Tactile Visualizer Component */}
              <div className="relative my-4 flex w-full items-center justify-center">
                <StoneVisualizer
                  motif={product.svgMotifType}
                  finish={selectedFinish}
                  showBack={viewSide === "back"}
                  engravingText={addBackEngraving ? customBackText : undefined}
                  size="xl"
                />
              </div>

              {/* Interactive Front / Reverse Side Toggle Pills */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewSide("front")}
                  aria-pressed={viewSide === "front"}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                    viewSide === "front"
                      ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#E5C158] shadow-[0_0_20px_-8px_rgba(212,175,55,0.8)]"
                      : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span>Front View</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewSide("back")}
                  aria-pressed={viewSide === "back"}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                    viewSide === "back"
                      ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#E5C158] shadow-[0_0_20px_-8px_rgba(212,175,55,0.8)]"
                      : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reverse Face</span>
                  {addBackEngraving && (
                    <span className="rounded-full bg-[#D4AF37]/20 px-1.5 py-0.2 text-[9px] text-[#E5C158]">
                      +Engraved
                    </span>
                  )}
                </button>
              </div>

              {/* Natural Stone Authenticity Note */}
              <p className="mt-4 text-center text-[11px] text-white/35">
                Each river stone is naturally water-worn and hand-selected. Contour and grain vary uniquely.
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CONTROLS & DETAILS ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Scarcity & Batch Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#E5C158]">
              <Flame className="h-3 w-3 text-[#E5C158]" />
              Founders&apos; Batch 01 • Only {product.stockBatchCount} remaining
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/50">
              Dispatches in 5–7 business days
            </span>
          </div>

          {/* Sanskrit Mantra & Deity */}
          <div>
            <p className="font-heading text-sm font-medium tracking-wide text-[#E5C158]">
              {product.sanskritMantra}
            </p>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              {product.deity} • Sacred Collection
            </p>
          </div>

          {/* Title & Price */}
          <div className="border-b border-white/10 pb-5">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-wide text-[#F4F4F5]">
              {product.name}
            </h1>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-heading text-3xl font-bold text-[#F4F4F5]">
                ₹{totalPrice}
              </span>
              {addBackEngraving && (
                <span className="text-xs text-white/50">
                  (Includes ₹{product.basePrice} base + ₹99 laser engraving)
                </span>
              )}
            </div>
          </div>

          {/* FR-1.2: Finish Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-[0.18em] text-white/80">
                1. Select Sacred Infill Finish:
              </label>
              <span className="text-xs text-[#E5C158] capitalize">
                {selectedFinish === "gold"
                  ? "24K Gold Enamel"
                  : selectedFinish === "silver"
                  ? "Pure Silver Enamel"
                  : "Raw Frosted Etch"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {FINISH_DETAILS.map((opt) => {
                const isSelected = selectedFinish === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedFinish(opt.id)}
                    aria-pressed={isSelected}
                    className={`relative flex flex-col items-start justify-between rounded-xl border p-3.5 text-left transition-all duration-300 ${
                      isSelected
                        ? `${opt.accentBorder} ${opt.activeBg} shadow-lg`
                        : "border-white/10 bg-[#18181B] text-white/60 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs font-semibold text-[#F4F4F5]">
                        {opt.title}
                      </span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-[#E5C158]" />
                      )}
                    </div>
                    <span className="mt-1 text-[10px] text-white/45 leading-tight">
                      {opt.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FR-1.3: Reverse-Side Personalization (+₹99) */}
          <div
            className={`rounded-2xl border p-4 transition-all duration-300 ${
              addBackEngraving
                ? "border-[#D4AF37]/50 bg-[#18181B] shadow-[0_0_25px_rgba(212,175,55,0.08)]"
                : "border-white/10 bg-[#18181B]/60 hover:border-white/20"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                id="backEngravingCheckbox"
                type="checkbox"
                checked={addBackEngraving}
                onChange={(e) => handleEngravingToggle(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-black/40 text-[#D4AF37] accent-[#D4AF37] focus:ring-0"
              />
              <div className="flex-1">
                <label
                  htmlFor="backEngravingCheckbox"
                  className="flex cursor-pointer items-center justify-between text-xs font-medium uppercase tracking-[0.14em] text-[#F4F4F5]"
                >
                  <span>Add Reverse-Side Personalization</span>
                  <span className="rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-semibold text-[#E5C158]">
                    +₹99
                  </span>
                </label>
                <p className="mt-1 text-[11px] text-white/45">
                  Micro-laser etch a name, birth date, sankalpa, or sacred mantra on the stone&apos;s smooth reverse face.
                </p>
              </div>
            </div>

            {/* Revealed Input when Checked */}
            {addBackEngraving && (
              <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">
                    Engraving Text (English or Devanagari)
                  </span>
                  <span
                    className={`font-mono text-[10px] ${
                      customBackText.length >= 25 ? "text-amber-400" : "text-white/40"
                    }`}
                  >
                    {customBackText.length}/25
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={25}
                  value={customBackText}
                  onChange={(e) => handleCustomTextChange(e.target.value)}
                  placeholder="e.g. Om Shanti or Aarav 2026"
                  className="w-full rounded-lg border border-white/15 bg-[#121215] px-3.5 py-2.5 text-sm text-[#F4F4F5] placeholder-white/25 focus:border-[#D4AF37] focus:outline-none"
                />
                <p className="text-[10px] text-white/35">
                  Live preview active on the stone graphic above. Flip to Reverse Face anytime.
                </p>
              </div>
            )}
          </div>

          {/* Primary Acquire CTA */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#D4AF37]/80 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#AA771C] py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
            >
              <Sparkles className="h-4 w-4 fill-current" />
              <span>Acquire Sacred Stone — ₹{totalPrice}</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.14em] text-white/40">
              <span>Zero Shipping Charges</span>
              <span>•</span>
              <span>Sanctum Velvet Pouch</span>
              <span>•</span>
              <span>Instant WhatsApp & UPI</span>
            </div>
          </div>

          {/* Spiritual Significance & Specifications Accordion */}
          <div className="rounded-2xl border border-white/10 bg-[#18181B] divide-y divide-white/10">
            {/* Description & Significance */}
            <div className="p-4 space-y-3">
              <button
                type="button"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-heading text-xs uppercase tracking-[0.18em] text-[#F4F4F5]">
                  Spiritual Significance & Lore
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-white/50 transition-transform ${
                    isDetailsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDetailsOpen && (
                <div className="pt-2 text-xs leading-relaxed text-white/65 space-y-3">
                  <p>{product.description}</p>
                  <div className="rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.05] p-3 text-[11px] text-[#E5C158]/90">
                    <span className="font-semibold uppercase tracking-wider block text-[10px] text-[#E5C158] mb-1">
                      Meditation & Ritual Significance:
                    </span>
                    {product.spiritualSignificance}
                  </div>
                </div>
              )}
            </div>

            {/* Physical Stone Specs */}
            <div className="p-4 space-y-2 text-xs">
              <span className="font-heading text-[11px] uppercase tracking-[0.18em] text-white/50 block mb-3">
                Material Specifications
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-white/70">
                  <Ruler className="h-4 w-4 text-[#D4AF37]" />
                  <span>{product.stoneDimensions}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Weight className="h-4 w-4 text-[#D4AF37]" />
                  <span>{product.weightGrams} grams approx</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                  <span>100% Volcanic Basalt</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Package className="h-4 w-4 text-[#D4AF37]" />
                  <span>Velvet Sanctum Pouch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Thumb-Zone Bar on Mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-white/10 bg-[#101012]/95 px-5 py-3.5 backdrop-blur-lg md:hidden">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">
            Total Price
          </p>
          <p className="font-heading text-lg font-bold text-[#F4F4F5]">
            ₹{totalPrice}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCheckoutOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/80 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-lg"
        >
          <Sparkles className="h-3.5 w-3.5 fill-current" />
          <span>Acquire Stone</span>
        </button>
      </div>

      {/* Checkout Drawer Modal */}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
        finish={selectedFinish}
        customBackText={addBackEngraving ? customBackText : ""}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default ProductDetailClient;
