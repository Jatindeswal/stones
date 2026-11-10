export const SITE = {
  brand: "SHILA",
  brandSuffix: "SACRED STONE",
  batchLabel: "Founders' Batch 01 — Live",
  /** WhatsApp business number in international format, digits only. */
  whatsappNumber: "919876543210",
  /** Static year — `new Date()` cannot be read during client-component prerender. */
  copyrightYear: "2026",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
