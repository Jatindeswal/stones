import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ChevronRight, Compass, Sparkles } from "lucide-react";
import { productsV2 } from "@/data/productsV2";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { ProductDetailClientV2 } from "@/components/v2/ProductDetailClientV2";
import { ProductCardV2 } from "@/components/v2/ProductCardV2";

interface ProductPageV2Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return productsV2.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageV2Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productsV2.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Stone Not Found | SHILA Earthy Craft",
    };
  }

  return {
    title: `${product.name} | SHILA Earthy River Basalt`,
    description: `${product.description} Sourced from ${product.provenance}.`,
    openGraph: {
      title: `${product.name} — Handcrafted River Basalt`,
      description: product.description,
    },
  };
}

export default async function ProductPageV2({ params }: ProductPageV2Props) {
  const { slug } = await params;
  const product = productsV2.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related stones from v2 catalog
  const relatedStones = productsV2
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#1E201D] font-sans antialiased selection:bg-[#A84A2B]/20 selection:text-[#A84A2B]">
      <NavbarV2 />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#5C5E58]"
        >
          <Link
            href="/v2"
            className="flex items-center gap-1.5 transition-colors hover:text-[#A84A2B]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Workshop Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#D8D0C2]" />
          <Link
            href="/v2#collection"
            className="transition-colors hover:text-[#A84A2B]"
          >
            Sacred Collection
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#D8D0C2]" />
          <span className="text-[#A84A2B] font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Client Product Detail Component wrapped in Suspense for static prerendering */}
        <Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-[#D8D0C2] bg-[#EBE5D9]">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#A84A2B]">
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Loading Handcrafted Stone...</span>
              </div>
            </div>
          }
        >
          <ProductDetailClientV2 product={product} />
        </Suspense>

        {/* Related Sacred Stones Section */}
        <section className="mt-24 border-t border-[#D8D0C2] pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-[#3B5249] mb-2 font-semibold">
                <Compass className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-[0.24em]">
                  Complementary Provenance
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold tracking-tight text-[#1E201D]">
                Other Sacred River Stones
              </h2>
            </div>
            <Link
              href="/v2#collection"
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[#A84A2B] hover:underline"
            >
              View Full Collection →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedStones.map((related) => (
              <ProductCardV2 key={related.id} product={related} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-[#D8D0C2] bg-[#EBE5D9] py-12 text-center text-xs text-[#5C5E58]">
        <div className="mx-auto max-w-7xl px-5 space-y-4">
          <p className="font-[family-name:var(--font-cormorant)] text-lg font-bold tracking-[0.24em] text-[#1E201D]">
            SHILA • SUNLIT EARTHY CRAFT
          </p>
          <p className="text-[11px] text-[#5C5E58] max-w-md mx-auto">
            Naturally water-worn river basalt engraved with Vedic hymns. Free of synthetic lacquers or toxic paints.
          </p>
          <p className="text-[10px] text-[#5C5E58]/80 tracking-wider">
            © 2026 SHILA Sacred Stones. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
