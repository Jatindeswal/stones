import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

const NAV_LINKS = [
  { href: "/#collection", label: "Collection" },
  { href: "/#process", label: "Process" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0B0C]/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        {/* Brand */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label={`${SITE.brand} — ${SITE.brandSuffix}, home`}
        >
          <span className="font-heading text-lg font-semibold tracking-[0.28em] text-[#F4F4F5] transition-colors group-hover:text-[#E5C158] sm:text-xl">
            {SITE.brand}
          </span>
          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-white/15 sm:block"
          />
          <span className="hidden font-heading text-[10px] tracking-[0.34em] text-white/45 sm:block">
            {SITE.brandSuffix}
          </span>
          <span className="hidden rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-[#E5C158] md:inline-flex">
            {SITE.batchLabel}
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-[#E5C158]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(
              "Hi SHILA, I'd like to enquire about a custom sacred stone order.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#E5C158] transition-colors hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/70 sm:px-4 sm:text-[11px]"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Custom Inquiry</span>
            <span className="sm:hidden">Enquire</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
