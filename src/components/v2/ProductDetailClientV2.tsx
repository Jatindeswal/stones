"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  Compass,
  Feather,
  Package,
  RotateCcw,
  Ruler,
  ShieldCheck,
  Sparkles,
  Weight,
} from "lucide-react";
import { StoneVisualizerV2 } from "@/components/v2/StoneVisualizerV2";
import { CheckoutDrawerV2 } from "@/components/v2/CheckoutDrawerV2";
import {
  FINISH_META_V2,
  type InfillFinishV2,
  type StoneProductV2,
} from "@/data/productsV2";

interface ProductDetailClientV2Props {
  product: StoneProductV2;
  initialFinish?: InfillFinishV2;
}

const FINISH_KEYS: InfillFinishV2[] = [
  "oiled_basalt",
  "raw_frost",
  "terracotta",
];

export function ProductDetailClientV2({
  product,
  initialFinish = "oiled_basalt",
}: ProductDetailClientV2Props) {
  const searchParams = useSearchParams();
  const urlFinish = searchParams?.get("finish");
  const resolvedInitialFinish: InfillFinishV2 =
    urlFinish === "oiled_basalt" ||
    urlFinish === "raw_frost" ||
    urlFinish === "terracotta"
      ? urlFinish
      : initialFinish;

  const [selectedFinish, setSelectedFinish] =
    useState<InfillFinishV2>(resolvedInitialFinish);
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
            {/* Visualizer Frame on Sunlit Travertine Mat */}
            <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#D8D0C2] bg-[#EBE5D9] p-6 sm:p-10 shadow-lg">
              {/* Soft ambient daylight highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7),transparent_70%)]"
              />

              {/* View Face Pill */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <span className="rounded-full border border-[#D8D0C2] bg-[#FDFBF7]/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#5C5E58] backdrop-blur-md font-medium">
                  {viewSide === "front" ? "Front Face: Sacred Etch" : "Reverse Face: Custom"}
                </span>
              </div>

              {/* Daylight Stone Visualizer */}
              <div className="relative my-4 flex w-full items-center justify-center">
                <StoneVisualizerV2
                  motif={product.svgMotifType}
                  finish={selectedFinish}
                  showBack={viewSide === "back"}
                  engravingText={addBackEngraving ? customBackText : undefined}
                  size="xl"
                />
              </div>

              {/* Front / Reverse Toggle */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewSide("front")}
                  aria-pressed={viewSide === "front"}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                    viewSide === "front"
                      ? "border-[#A84A2B] bg-[#FDFBF7] text-[#A84A2B] font-semibold shadow-md"
                      : "border-[#D8D0C2] bg-[#FDFBF7]/60 text-[#5C5E58] hover:border-[#1E201D]/40 hover:text-[#1E201D]"
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
                      ? "border-[#A84A2B] bg-[#FDFBF7] text-[#A84A2B] font-semibold shadow-md"
                      : "border-[#D8D0C2] bg-[#FDFBF7]/60 text-[#5C5E58] hover:border-[#1E201D]/40 hover:text-[#1E201D]"
                  }`}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reverse Face</span>
                  {addBackEngraving && (
                    <span className="rounded-full bg-[#A84A2B]/15 px-1.5 py-0.2 text-[9px] text-[#A84A2B] font-semibold">
                      +Engraved
                    </span>
                  )}
                </button>
              </div>

              {/* Honest Craft Caption */}
              <p className="mt-4 text-center text-[11px] text-[#5C5E58] max-w-sm">
                Interactive Engraving Blueprint & Stone Tone Preview — Each natural river stone varies subtly in grain and contour.
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CONTROLS & CRAFT DETAILS ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Workshop Provenance Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3B5249]/25 bg-[#3B5249]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3B5249]">
              <Feather className="h-3 w-3" />
              Small-Batch Workshop • Made to Order
            </span>
            <span className="rounded-full border border-[#D8D0C2] bg-[#EBE5D9] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#5C5E58] font-medium">
              Ships in 5–7 business days
            </span>
          </div>

          {/* Sanskrit Mantra & Provenance */}
          <div>
            <p className="font-[family-name:var(--font-cormorant)] text-lg font-bold tracking-wide text-[#A84A2B]">
              {product.sanskritMantra}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-[#5C5E58]">
              <Compass className="h-3.5 w-3.5 text-[#3B5249]" />
              <span>{product.provenance}</span>
            </div>
          </div>

          {/* Title & Price Display */}
          <div className="border-b border-[#D8D0C2] pb-5">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold tracking-tight text-[#1E201D]">
              {product.name}
            </h1>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#1E201D]">
                ₹{totalPrice}
              </span>
              {addBackEngraving && (
                <span className="text-xs text-[#5C5E58]">
                  (₹{product.basePrice} base + ₹99 reverse laser etch)
                </span>
              )}
            </div>
          </div>

          {/* FR-1.2: Finish Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1E201D]">
                1. Select Natural Craft Finish:
              </label>
              <span className="text-xs text-[#A84A2B] font-semibold">
                {FINISH_META_V2[selectedFinish].shortLabel}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {FINISH_KEYS.map((key) => {
                const meta = FINISH_META_V2[key];
                const isSelected = selectedFinish === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedFinish(key)}
                    aria-pressed={isSelected}
                    className={`flex items-start gap-3.5 rounded-xl border p-3.5 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-[#A84A2B] bg-[#FDFBF7] ring-1 ring-[#A84A2B] shadow-sm"
                        : "border-[#D8D0C2] bg-[#FDFBF7]/70 hover:border-[#1E201D]/30"
                    }`}
                  >
                    <span
                      className="mt-0.5 h-4 w-4 rounded-full border border-black/15 shrink-0 shadow-inner"
                      style={{ backgroundColor: meta.swatchHex }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E201D]">
                          {meta.label}
                        </span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-[#A84A2B]" />
                        )}
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#5C5E58]">
                        {meta.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FR-1.3: Reverse-Side Personalization (+₹99) */}
          <div
            className={`rounded-2xl border p-4 transition-all duration-300 ${
              addBackEngraving
                ? "border-[#A84A2B] bg-[#FDFBF7] shadow-sm"
                : "border-[#D8D0C2] bg-[#FDFBF7]/70 hover:border-[#1E201D]/20"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                id="backEngravingCheckboxV2"
                type="checkbox"
                checked={addBackEngraving}
                onChange={(e) => handleEngravingToggle(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#D8D0C2] text-[#A84A2B] accent-[#A84A2B] focus:ring-0"
              />
              <div className="flex-1">
                <label
                  htmlFor="backEngravingCheckboxV2"
                  className="flex cursor-pointer items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-[#1E201D]"
                >
                  <span>Add Reverse-Side Laser Inscription</span>
                  <span className="rounded-full border border-[#A84A2B]/30 bg-[#A84A2B]/10 px-2 py-0.5 text-[10px] font-bold text-[#A84A2B]">
                    +₹99
                  </span>
                </label>
                <p className="mt-1 text-[11px] text-[#5C5E58]">
                  Precision micro-fractured laser engraving of a name, birth date, sankalpa, or mantra on the smooth reverse face.
                </p>
              </div>
            </div>

            {/* Revealed Input when Checked */}
            {addBackEngraving && (
              <div className="mt-4 border-t border-[#D8D0C2]/60 pt-3 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#5C5E58] font-medium">
                    Engraving Text (English or Devanagari)
                  </span>
                  <span
                    className={`font-mono text-[10px] ${
                      customBackText.length >= 25 ? "text-amber-600 font-bold" : "text-[#5C5E58]"
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
                  className="w-full rounded-lg border border-[#D8D0C2] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder-[#5C5E58]/40 focus:border-[#A84A2B] focus:outline-none"
                />
                <p className="text-[10px] text-[#5C5E58]">
                  Live engraving blueprint preview active on the stone graphic above. Flip to Reverse Face anytime.
                </p>
              </div>
            )}
          </div>

          {/* Primary Acquire CTA Button */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#A84A2B] bg-[#A84A2B] py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 hover:bg-[#8E3B20] hover:shadow-lg active:scale-[0.99]"
            >
              <Sparkles className="h-4 w-4" />
              <span>Acquire Sacred Stone — ₹{totalPrice}</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.14em] text-[#5C5E58]">
              <span>Free Delivery</span>
              <span>•</span>
              <span>Handloom Cotton Pouch</span>
              <span>•</span>
              <span>Instant WhatsApp & UPI</span>
            </div>
          </div>

          {/* Craft Lore & Specifications Accordion */}
          <div className="rounded-2xl border border-[#D8D0C2] bg-[#FDFBF7] divide-y divide-[#D8D0C2]/70 shadow-sm">
            <div className="p-4 space-y-3">
              <button
                type="button"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-[family-name:var(--font-cormorant)] text-sm font-bold uppercase tracking-[0.16em] text-[#1E201D]">
                  Provenance Lore & Spiritual Significance
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#5C5E58] transition-transform ${
                    isDetailsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDetailsOpen && (
                <div className="pt-2 text-xs leading-relaxed text-[#5C5E58] space-y-3">
                  <p>{product.description}</p>
                  <div className="rounded-lg border border-[#3B5249]/20 bg-[#3B5249]/[0.06] p-3 text-[11px] text-[#3B5249]">
                    <span className="font-bold uppercase tracking-wider block text-[10px] text-[#3B5249] mb-1">
                      Meditation & Ritual Anchor:
                    </span>
                    {product.spiritualSignificance}
                  </div>
                </div>
              )}
            </div>

            {/* Material Specifications */}
            <div className="p-4 space-y-2 text-xs">
              <span className="font-[family-name:var(--font-cormorant)] text-xs font-bold uppercase tracking-[0.16em] text-[#5C5E58] block mb-3">
                Material & Origin Specifications
              </span>
              <div className="grid grid-cols-2 gap-3 text-[#1E201D]">
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-[#A84A2B]" />
                  <span>{product.stoneDimensions}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-[#A84A2B]" />
                  <span>{product.weightGrams} grams approx</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#3B5249]" />
                  <span>100% Volcanic Basalt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#3B5249]" />
                  <span>Handloom Cotton Pouch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Thumb-Zone Bar on Mobile Viewports */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-[#D8D0C2] bg-[#FDFBF7]/95 px-5 py-3.5 backdrop-blur-lg md:hidden">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#5C5E58]">
            Workshop Price
          </p>
          <p className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#1E201D]">
            ₹{totalPrice}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCheckoutOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-[#A84A2B] bg-[#A84A2B] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md active:scale-95"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Acquire Stone</span>
        </button>
      </div>

      {/* Checkout Drawer Modal */}
      <CheckoutDrawerV2
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

export default ProductDetailClientV2;
