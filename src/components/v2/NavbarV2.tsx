"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

const NAV_LINKS = [
  { href: "/v2#collection", label: "Collection" },
  { href: "/v2#process", label: "Craft & Provenance" },
  { href: "/v2#faq", label: "Care & FAQ" },
] as const;

export function NavbarV2() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D8D0C2] bg-[#F6F3EC]/90 backdrop-blur-md transition-colors">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        {/* Brand */}
        <Link
          href="/v2"
          className="group flex min-w-0 items-center gap-3"
          aria-label={`${SITE.brand} — ${SITE.brandSuffix}, v2 home`}
        >
          <span className="font-[family-name:var(--font-cormorant)] text-2xl font-bold tracking-[0.24em] text-[#1E201D] transition-colors group-hover:text-[#A84A2B]">
            {SITE.brand}
          </span>
          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-[#D8D0C2] sm:block"
          />
          <span className="hidden text-[10px] uppercase tracking-[0.32em] text-[#5C5E58] sm:block font-medium">
            {SITE.brandSuffix}
          </span>
          <span className="hidden rounded-full border border-[#3B5249]/20 bg-[#3B5249]/10 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-[#3B5249] md:inline-flex">
            Small-Batch Workshop • Natural River Basalt
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#5C5E58] transition-colors hover:text-[#A84A2B]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(
              "Hi SHILA, I'd like to ask a question about your handcrafted natural river stones.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#A84A2B]/35 bg-[#A84A2B]/10 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#A84A2B] transition-all hover:bg-[#A84A2B] hover:text-white sm:px-4 sm:text-[11px]"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Workshop Inquiry</span>
            <span className="sm:hidden">Inquire</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default NavbarV2;
