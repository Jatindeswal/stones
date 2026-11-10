"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Feather, Ruler, Weight } from "lucide-react";
import { StoneVisualizerV2 } from "@/components/v2/StoneVisualizerV2";
import {
  FINISH_META_V2,
  type InfillFinishV2,
  type StoneProductV2,
} from "@/data/productsV2";

interface ProductCardV2Props {
  product: StoneProductV2;
}

const FINISH_KEYS: InfillFinishV2[] = [
  "oiled_basalt",
  "raw_frost",
  "terracotta",
];

export function ProductCardV2({ product }: ProductCardV2Props) {
  const [selectedFinish, setSelectedFinish] =
    useState<InfillFinishV2>("oiled_basalt");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D8D0C2] bg-[#FDFBF7] transition-all duration-500 hover:border-[#A84A2B]/40 hover:shadow-[0_16px_36px_rgba(30,32,29,0.08)]">
      {/* Stone Display Mat (Natural Travertine / Sunlit River Sand) */}
      <div className="relative flex items-center justify-center overflow-hidden bg-[#EBE5D9] px-6 py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.7),transparent_70%)]"
        />
        <div className="relative w-full">
          <StoneVisualizerV2
            motif={product.svgMotifType}
            finish={selectedFinish}
            size="xl"
            className="mx-auto"
          />
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        {/* Finish Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {FINISH_KEYS.map((key) => {
            const meta = FINISH_META_V2[key];
            const isActive = selectedFinish === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedFinish(key)}
                aria-pressed={isActive}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                  isActive
                    ? "border-[#A84A2B] bg-[#A84A2B]/10 text-[#A84A2B] font-semibold"
                    : "border-[#D8D0C2] bg-white/60 text-[#5C5E58] hover:border-[#1E201D]/30 hover:text-[#1E201D]"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: meta.swatchHex }}
                />
                <span>{meta.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Calm Honest Craft Note (No fake scarcity) */}
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#3B5249]/20 bg-[#3B5249]/[0.08] px-3 py-1 text-[10px] font-medium tracking-wide text-[#3B5249]">
          <Feather className="h-3 w-3" aria-hidden="true" />
          <span>Made to order • Dispatches in 5–7 days</span>
        </div>

        {/* Mantra + Deity */}
        <div>
          <p className="font-[family-name:var(--font-cormorant)] text-sm font-semibold tracking-wide text-[#A84A2B]">
            {product.sanskritMantra}
          </p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#5C5E58]">
            {product.deity}
          </p>
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold leading-snug tracking-normal text-[#1E201D] transition-colors group-hover:text-[#A84A2B]">
          {product.name}
        </h3>

        {/* Provenance & Specs */}
        <dl className="space-y-1.5 text-[11px] text-[#5C5E58]">
          <div className="flex items-start gap-2">
            <dt className="flex shrink-0 items-center gap-1 text-[#3B5249]">
              <Compass className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Provenance</span>
            </dt>
            <dd className="line-clamp-1 text-[10.5px]">{product.provenance}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex shrink-0 items-center gap-1 text-[#5C5E58]/70">
              <Ruler className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Dimensions</span>
            </dt>
            <dd>{product.stoneDimensions}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex shrink-0 items-center gap-1 text-[#5C5E58]/70">
              <Weight className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Weight</span>
            </dt>
            <dd>{product.weightGrams} grams approx</dd>
          </div>
        </dl>

        {/* Price & Action */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#D8D0C2]/60 pt-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#5C5E58]/80">
              Workshop Price
            </p>
            <p className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#1E201D]">
              ₹{product.basePrice}
            </p>
          </div>

          <Link
            href={`/v2/product/${product.slug}?finish=${selectedFinish}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#A84A2B] bg-[#A84A2B] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#8E3B20] hover:shadow-md active:scale-95"
          >
            Explore Stone
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCardV2;
