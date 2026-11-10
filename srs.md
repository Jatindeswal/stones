# Project Lock Spec: Sacred River Stone Store (Phase 1 MVP)
- **Framework:** Next.js App Router (`src/app`), TypeScript, Tailwind CSS.
- **Theme:** Sacred Luxury Obsidian. Background `#0F0F0F`, Card `#18181B`, Primary Accent `#D4AF37` (Antique Gold), Text `#F4F4F5`.
- **Phase 1 Scope ONLY:**
  1. Static seed data in `src/data/products.ts` (No database/Supabase yet).
  2. Flagship storefront in `src/app/page.tsx` with category filtering.
  3. Dynamic product page in `src/app/product/[slug]/page.tsx` with:
     - Finish Toggle (`gold`, `silver`, `raw`) that swaps the active preview image.
     - Optional Back-Side Engraving checkbox (+₹99, max 25 chars) that updates total price.
     - Founders' Batch scarcity badge.
  4. Slide-over Checkout Drawer (`src/components/CheckoutDrawer.tsx`) with WhatsApp Instant Order deep-link (`wa.me`) and Razorpay placeholder button.
- **Strict Rule:** Do NOT create extra pages, auth routes, or canvas tools in Phase 1.