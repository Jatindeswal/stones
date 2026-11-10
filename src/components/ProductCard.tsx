"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Ruler, Weight } from "lucide-react";
import { StoneVisualizer } from "@/components/StoneVisualizer";
import type { InfillFinish, StoneProduct } from "@/data/products";

interface ProductCardProps {
  product: StoneProduct;
}

const FINISH_OPTIONS: {
  value: InfillFinish;
  label: string;
  activeClass: string;
}[] = [
  {
    value: "gold",
    label: "24K Gold",
    activeClass:
      "border-[#D4AF37]/70 bg-[#D4AF37]/15 text-[#E5C158] shadow-[0_0_20px_-8px_rgba(212,175,55,0.9)]",
  },
  {
    value: "silver",
    label: "Silver",
    activeClass:
      "border-white/40 bg-white/10 text-[#E4E4E7] shadow-[0_0_20px_-10px_rgba(228,228,231,0.8)]",
  },
  {
    value: "raw",
    label: "Raw Etch",
    activeClass:
      "border-white/25 bg-white/[0.07] text-white/80 shadow-[0_0_20px_-12px_rgba(255,255,255,0.6)]",
  },
];

const IDLE_CLASS =
  "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white/85";

export function ProductCard({ product }: ProductCardProps) {
  const [selectedFinish, setSelectedFinish] = useState<InfillFinish>("gold");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#18181B] transition-colors duration-500 hover:border-[#D4AF37]/30">
      {/* Obsidian showcase box */}
      <div className="relative flex items-center justify-center overflow-hidden bg-[#121215] px-6 py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.10),transparent_62%)]"
        />
        <div className="relative w-full">
          <StoneVisualizer
            motif={product.svgMotifType}
            finish={selectedFinish}
            size="xl"
            className="mx-auto"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        {/* Finish switcher pills */}
        <div className="flex flex-wrap items-center gap-2">
          {FINISH_OPTIONS.map((option) => {
            const isActive = option.value === selectedFinish;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedFinish(option.value)}
                aria-pressed={isActive}
                className={`rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] transition-all duration-300 ${
                  isActive ? option.activeClass : IDLE_CLASS
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Scarcity badge */}
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.07] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#D4AF37]">
          <Flame className="h-3 w-3" aria-hidden="true" />
          <span>
            Only {product.stockBatchCount} stones left in Batch 01
          </span>
        </div>

        {/* Mantra + deity */}
        <div>
          <p className="font-heading text-[11px] leading-relaxed tracking-wide text-[#E5C158]/85">
            {product.sanskritMantra}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
            {product.deity}
          </p>
        </div>

        {/* Title */}
        <h3 className="font-heading text-base font-semibold leading-snug tracking-wide text-[#F4F4F5] transition-colors group-hover:text-[#E5C158]">
          {product.name}
        </h3>

        {/* Dimensions */}
        <dl className="space-y-1.5 text-[11px] text-white/45">
          <div className="flex items-start gap-2">
            <dt className="flex shrink-0 items-center gap-1.5 text-white/30">
              <Ruler className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Dimensions</span>
            </dt>
            <dd className="leading-relaxed">{product.stoneDimensions}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex shrink-0 items-center gap-1.5 text-white/30">
              <Weight className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Weight</span>
            </dt>
            <dd className="leading-relaxed">{product.weightGrams} grams</dd>
          </div>
        </dl>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">
              Base Price
            </p>
            <p className="font-heading text-2xl font-semibold text-[#F4F4F5]">
              ₹{product.basePrice}
            </p>
          </div>

          <Link
            href={`/product/${product.slug}?finish=${selectedFinish}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-gradient-to-b from-[#D4AF37]/25 to-[#D4AF37]/10 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#E5C158] transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/25"
          >
            View Stone
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
