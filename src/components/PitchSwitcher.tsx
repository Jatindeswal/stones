"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, Sparkles } from "lucide-react";

export function PitchSwitcher() {
  const pathname = usePathname() || "/";

  // Check if we are currently on a v2 route
  // Note: on GitHub Pages, pathname might be /stones/v2 or /v2
  const isV2 = pathname.includes("/v2");

  // Determine equivalent path for opposite version
  let targetPath = "/";
  if (isV2) {
    // Switch from v2 to v1
    // e.g. /v2 -> /
    // e.g. /v2/product/xyz -> /product/xyz
    const stripped = pathname.replace(/\/v2(\/|$)/, "/");
    targetPath = stripped.startsWith("/") ? stripped : `/${stripped}`;
    if (targetPath === "" || targetPath === "//") targetPath = "/";
  } else {
    // Switch from v1 to v2
    // e.g. / -> /v2
    // e.g. /product/xyz -> /v2/product/xyz
    if (pathname === "/" || pathname === "") {
      targetPath = "/v2";
    } else {
      targetPath = `/v2${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
    }
  }

  return (
    <aside
      aria-label="Design Pitch Switcher"
      className="fixed bottom-4 left-4 z-50 flex items-center"
    >
      <Link
        href={targetPath}
        className={`group flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-xs font-medium tracking-wide shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
          isV2
            ? "border-[#D8D0C2] bg-[#FDFBF7]/95 text-[#1E201D] shadow-[0_10px_30px_rgba(30,32,29,0.15)] hover:border-[#A84A2B]"
            : "border-white/15 bg-[#121215]/95 text-[#F4F4F5] shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-[#D4AF37]/60"
        }`}
      >
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
            isV2
              ? "bg-[#A84A2B]/10 text-[#A84A2B] group-hover:bg-[#A84A2B] group-hover:text-white"
              : "bg-[#D4AF37]/15 text-[#E5C158] group-hover:bg-[#D4AF37] group-hover:text-black"
          }`}
        >
          <ArrowLeftRight className="h-3 w-3" />
        </div>

        {isV2 ? (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-[#A84A2B] font-semibold">
              Pitch View: v2 Earthy Craft
            </span>
            <span className="text-[#5C5E58]">|</span>
            <span className="text-[#5C5E58] group-hover:text-[#1E201D] transition-colors">
              Switch to v1 Obsidian →
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-[#E5C158] font-semibold">
              Pitch View: v1 Obsidian
            </span>
            <span className="text-white/30">|</span>
            <span className="text-white/60 group-hover:text-[#F4F4F5] transition-colors">
              Switch to v2 Earthy →
            </span>
          </div>
        )}
      </Link>
    </aside>
  );
}

export default PitchSwitcher;
