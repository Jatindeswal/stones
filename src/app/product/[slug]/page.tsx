import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { ProductCard } from "@/components/ProductCard";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Stone Not Found | SHILA Sacred Stones",
    };
  }

  return {
    title: `${product.name} | SHILA Sacred Basalt`,
    description: `${product.description} Handcrafted with ${product.sanskritMantra}.`,
    openGraph: {
      title: `${product.name} — SHILA Sacred Stone`,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related stones: 3 other stones from the catalog
  const relatedStones = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F4F4F5]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs text-white/50"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-[#E5C158]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" />
          <Link
            href="/#collection"
            className="transition-colors hover:text-[#E5C158]"
          >
            Sacred Collection
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" />
          <span className="text-[#E5C158] truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Client Product Detail Workspace wrapped in Suspense for static prerendering */}
        <Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-white/10 bg-[#121215]">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#E5C158]">
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Loading Sacred Stone...</span>
              </div>
            </div>
          }
        >
          <ProductDetailClient product={product} />
        </Suspense>

        {/* Related Sacred Stones Section */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium">
                  Complementary Energies
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-wide text-[#F4F4F5]">
                Other Sacred River Stones
              </h2>
            </div>
            <Link
              href="/#collection"
              className="text-xs uppercase tracking-[0.18em] text-[#E5C158] hover:underline"
            >
              View Full Collection →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedStones.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 bg-[#080809] py-12 text-center text-xs text-white/40">
        <div className="mx-auto max-w-7xl px-5 space-y-4">
          <p className="font-heading text-sm tracking-[0.25em] text-[#F4F4F5]">
            SHILA • SACRED RIVER BASALT
          </p>
          <p className="text-[11px] text-white/40 max-w-md mx-auto">
            Naturally shaped river basalt hand-selected and laser-engraved with eternal Vedic mantras.
          </p>
          <p className="text-[10px] text-white/30 tracking-wider">
            © 2026 SHILA Sacred Stones. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
