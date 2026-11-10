"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Compass,
  Feather,
  Lock,
  MessageCircle,
  Package,
  ShieldCheck,
  X,
} from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import {
  FINISH_META_V2,
  type InfillFinishV2,
  type StoneProductV2,
} from "@/data/productsV2";

interface CheckoutDrawerV2Props {
  isOpen: boolean;
  onClose: () => void;
  product: StoneProductV2;
  finish: InfillFinishV2;
  customBackText: string;
  totalPrice: number;
}

interface ShippingForm {
  fullName: string;
  phone: string;
  pinCode: string;
  address: string;
  cityState: string;
}

export function CheckoutDrawerV2({
  isOpen,
  onClose,
  product,
  finish,
  customBackText,
  totalPrice,
}: CheckoutDrawerV2Props) {
  const [form, setForm] = useState<ShippingForm>({
    fullName: "",
    phone: "",
    pinCode: "",
    address: "",
    cityState: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({});
  const [isSimulatedSuccess, setIsSimulatedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsSimulatedSuccess(false);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingForm, string>> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    const cleanPhone = form.phone.trim();
    if (!cleanPhone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    const cleanPin = form.pinCode.trim();
    if (!cleanPin) {
      newErrors.pinCode = "6-digit PIN code is required";
    } else if (!/^\d{6}$/.test(cleanPin)) {
      newErrors.pinCode = "PIN code must be exactly 6 digits";
    }

    if (!form.address.trim()) {
      newErrors.address = "Complete delivery address is required";
    } else if (form.address.trim().length < 8) {
      newErrors.address = "Please provide street, house/flat & landmark";
    }

    if (!form.cityState.trim()) {
      newErrors.cityState = "City and state are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const constructWhatsAppMessage = (isVerified = false) => {
    const meta = FINISH_META_V2[finish];
    const lines = [
      `*NAMASTE SHILA WORKSHOP — ${isVerified ? "ONLINE ORDER VERIFIED" : "CUSTOM STONE ORDER"}*`,
      isVerified
        ? `Order Reference: #SHILA-CRAFT-202 (Sunlit Earthy Edition)`
        : `Requesting custom river stone order & UPI payment details`,
      "",
      `*CRAFT ORDER SUMMARY:*`,
      `• Stone: ${product.name}`,
      `• Deity / Mantra: ${product.deity} (${product.sanskritMantra})`,
      `• Provenance: ${product.provenance}`,
      `• Craft Finish: ${meta.label}`,
      `• Reverse Personalization: ${
        customBackText.trim() ? `"${customBackText.trim()}" (+₹99)` : "None (Plain Basalt)"
      }`,
      `• Total Workshop Amount: ₹${totalPrice}`,
      "",
      `*DELIVERY & RECIPIENT DETAILS:*`,
      `• Full Name: ${form.fullName.trim()}`,
      `• Mobile: +91 ${form.phone.trim()}`,
      `• Address: ${form.address.trim()}`,
      `• City & State: ${form.cityState.trim()}`,
      `• PIN Code: ${form.pinCode.trim()}`,
      "",
      `*WORKSHOP NOTE:* Each natural basalt pebble is selected and hand-rubbed with natural finishes. Includes handloom cotton sanctum pouch. Dispatches in 5–7 business days.`,
    ];

    return lines.join("\n");
  };

  const handleWhatsAppCheckout = () => {
    if (!validate()) return;
    const msg = constructWhatsAppMessage(false);
    const url = whatsappLink(msg);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOnlineSimulatedPay = () => {
    if (!validate()) return;
    setIsSimulatedSuccess(true);
  };

  const meta = FINISH_META_V2[finish];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#1E201D]/55 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-drawer-v2-title"
            className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-[#D8D0C2] bg-[#F6F3EC] text-[#1E201D] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D8D0C2] bg-[#FDFBF7] px-6 py-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3B5249]">
                  Small-Batch Workshop Order
                </p>
                <h2
                  id="checkout-drawer-v2-title"
                  className="font-[family-name:var(--font-cormorant)] text-2xl font-bold tracking-tight text-[#1E201D]"
                >
                  Acquire Sacred River Stone
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="rounded-full border border-[#D8D0C2] p-2 text-[#5C5E58] transition-colors hover:border-[#1E201D] hover:bg-[#EBE5D9] hover:text-[#1E201D]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {!isSimulatedSuccess ? (
                <div className="space-y-6">
                  {/* Order Summary Card */}
                  <div className="rounded-xl border border-[#D8D0C2] bg-[#FDFBF7] p-5 shadow-sm">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#5C5E58] font-medium">
                      Craft Order Summary
                    </p>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#1E201D]">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#5C5E58]">{product.deity}</p>
                        <p className="mt-0.5 text-[10px] text-[#3B5249]">
                          {product.provenance}
                        </p>
                      </div>
                      <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#1E201D]">
                        ₹{product.basePrice}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#D8D0C2]/60 pt-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A84A2B]/30 bg-[#A84A2B]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A84A2B]">
                        <span
                          className="h-2 w-2 rounded-full border border-black/10"
                          style={{ backgroundColor: meta.swatchHex }}
                        />
                        {meta.label}
                      </span>

                      {customBackText.trim() && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#D8D0C2] bg-[#EBE5D9]/70 px-2.5 py-1 text-[10px] text-[#1E201D]">
                          Reverse: &quot;{customBackText.trim()}&quot; (+₹99)
                        </span>
                      )}
                    </div>

                    <div className="mt-4 space-y-1.5 border-t border-[#D8D0C2]/60 pt-3 text-xs">
                      <div className="flex justify-between text-[#5C5E58]">
                        <span>Stone & Laser Craft Base</span>
                        <span>₹{product.basePrice}</span>
                      </div>
                      {customBackText.trim() && (
                        <div className="flex justify-between text-[#5C5E58]">
                          <span>Reverse Laser Engraving</span>
                          <span>₹99</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#5C5E58]">
                        <span>Handloom Cotton Pouch & Shipping</span>
                        <span className="text-[#3B5249] font-medium uppercase text-[10px] tracking-wider">
                          Complimentary
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-[#D8D0C2] pt-3 text-base">
                        <span className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider font-bold text-[#1E201D]">
                          Total Workshop Amount
                        </span>
                        <span className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#A84A2B]">
                          ₹{totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Form */}
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <Feather className="h-4 w-4 text-[#A84A2B]" />
                      <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1E201D]">
                        Delivery & Recipient Details
                      </h3>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleWhatsAppCheckout();
                      }}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="fullNameV2"
                          className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#5C5E58]"
                        >
                          Full Name *
                        </label>
                        <input
                          id="fullNameV2"
                          type="text"
                          value={form.fullName}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, fullName: e.target.value }))
                          }
                          placeholder="e.g. Meera Nair"
                          className={`mt-1.5 w-full rounded-lg border bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder-[#5C5E58]/40 transition-colors focus:outline-none ${
                            errors.fullName
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-[#D8D0C2] focus:border-[#A84A2B]"
                          }`}
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-[11px] text-rose-600">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Phone & PIN Code */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="phoneV2"
                            className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#5C5E58]"
                          >
                            Mobile (WhatsApp) *
                          </label>
                          <div className="relative mt-1.5">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-[#5C5E58]">
                              +91
                            </span>
                            <input
                              id="phoneV2"
                              type="tel"
                              maxLength={10}
                              value={form.phone}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  phone: e.target.value.replace(/\D/g, ""),
                                }))
                              }
                              placeholder="9876543210"
                              className={`w-full rounded-lg border bg-[#FDFBF7] py-2.5 pl-11 pr-3.5 text-sm text-[#1E201D] placeholder-[#5C5E58]/40 transition-colors focus:outline-none ${
                                errors.phone
                                  ? "border-rose-500 focus:border-rose-500"
                                  : "border-[#D8D0C2] focus:border-[#A84A2B]"
                              }`}
                            />
                          </div>
                          {errors.phone && (
                            <p className="mt-1 text-[11px] text-rose-600">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="pinCodeV2"
                            className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#5C5E58]"
                          >
                            6-Digit PIN Code *
                          </label>
                          <input
                            id="pinCodeV2"
                            type="text"
                            maxLength={6}
                            value={form.pinCode}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                pinCode: e.target.value.replace(/\D/g, ""),
                              }))
                            }
                            placeholder="560001"
                            className={`mt-1.5 w-full rounded-lg border bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder-[#5C5E58]/40 transition-colors focus:outline-none ${
                              errors.pinCode
                                ? "border-rose-500 focus:border-rose-500"
                              : "border-[#D8D0C2] focus:border-[#A84A2B]"
                            }`}
                          />
                          {errors.pinCode && (
                            <p className="mt-1 text-[11px] text-rose-600">
                              {errors.pinCode}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div>
                        <label
                          htmlFor="addressV2"
                          className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#5C5E58]"
                        >
                          Complete Delivery Address *
                        </label>
                        <textarea
                          id="addressV2"
                          rows={2}
                          value={form.address}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, address: e.target.value }))
                          }
                          placeholder="House/Apartment No., Street Name, Landmark"
                          className={`mt-1.5 w-full rounded-lg border bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder-[#5C5E58]/40 transition-colors focus:outline-none ${
                            errors.address
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-[#D8D0C2] focus:border-[#A84A2B]"
                          }`}
                        />
                        {errors.address && (
                          <p className="mt-1 text-[11px] text-rose-600">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      {/* City & State */}
                      <div>
                        <label
                          htmlFor="cityStateV2"
                          className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#5C5E58]"
                        >
                          City & State *
                        </label>
                        <input
                          id="cityStateV2"
                          type="text"
                          value={form.cityState}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, cityState: e.target.value }))
                          }
                          placeholder="e.g. Pune, Maharashtra"
                          className={`mt-1.5 w-full rounded-lg border bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder-[#5C5E58]/40 transition-colors focus:outline-none ${
                            errors.cityState
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-[#D8D0C2] focus:border-[#A84A2B]"
                          }`}
                        />
                        {errors.cityState && (
                          <p className="mt-1 text-[11px] text-rose-600">
                            {errors.cityState}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Workshop Trust Points */}
                  <div className="grid grid-cols-2 gap-3 border-t border-[#D8D0C2] pt-4 text-[10px] text-[#5C5E58]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#3B5249]" />
                      <span>100% River-Cleaved Basalt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#3B5249]" />
                      <span>Handmade in 5–7 Days</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Simulated Confirmation State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 py-6 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#3B5249]/30 bg-[#3B5249]/10">
                    <CheckCircle2 className="h-9 w-9 text-[#3B5249]" />
                  </div>

                  <div>
                    <span className="rounded-full border border-[#3B5249]/20 bg-[#3B5249]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3B5249]">
                      Workshop Slip Generated
                    </span>
                    <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#1E201D]">
                      Verification In Progress
                    </h3>
                    <p className="mt-1 text-xs text-[#5C5E58]">
                      Order Reference:{" "}
                      <span className="font-mono font-semibold text-[#A84A2B]">
                        #SHILA-CRAFT-202
                      </span>
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#D8D0C2] bg-[#FDFBF7] p-4 text-left text-xs space-y-2.5 shadow-sm">
                    <div className="flex justify-between">
                      <span className="text-[#5C5E58]">Stone</span>
                      <span className="font-medium text-[#1E201D]">{product.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C5E58]">Craft Finish</span>
                      <span className="text-[#A84A2B] font-medium">{meta.label}</span>
                    </div>
                    {customBackText.trim() && (
                      <div className="flex justify-between">
                        <span className="text-[#5C5E58]">Reverse Laser Etch</span>
                        <span className="text-[#1E201D] font-medium">
                          &quot;{customBackText.trim()}&quot;
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#5C5E58]">Total Amount</span>
                      <span className="font-bold text-[#1E201D]">₹{totalPrice}</span>
                    </div>
                    <div className="border-t border-[#D8D0C2] pt-2 flex justify-between">
                      <span className="text-[#5C5E58]">Recipient</span>
                      <span className="text-right text-[#1E201D]">
                        {form.fullName}, {form.cityState} ({form.pinCode})
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#5C5E58] leading-relaxed">
                    Your workshop slip is reserved. Complete your UPI verification or send this
                    confirmation directly to the master artisan over WhatsApp:
                  </p>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const msg = constructWhatsAppMessage(true);
                        const url = whatsappLink(msg);
                        window.open(url, "_blank", "noopener,noreferrer");
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#A84A2B] bg-[#A84A2B] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md transition-all hover:bg-[#8E3B20] active:scale-[0.98]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Dispatch Slip to WhatsApp Desk
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full rounded-xl border border-[#D8D0C2] py-3 text-xs uppercase tracking-[0.16em] text-[#5C5E58] transition-colors hover:bg-[#EBE5D9] hover:text-[#1E201D]"
                    >
                      Return to Workshop
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Actions */}
            {!isSimulatedSuccess && (
              <div className="border-t border-[#D8D0C2] bg-[#FDFBF7] p-5 space-y-3">
                {/* Primary CTA: WhatsApp Instant Order */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#A84A2B] bg-[#A84A2B] py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition-all hover:bg-[#8E3B20] active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>Instant Order via WhatsApp • Pay via UPI</span>
                </button>

                {/* Secondary CTA: Online Gateway Verification */}
                <button
                  type="button"
                  onClick={handleOnlineSimulatedPay}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8D0C2] bg-white py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#5C5E58] transition-all hover:border-[#1E201D] hover:text-[#1E201D]"
                >
                  <Lock className="h-3.5 w-3.5 text-[#3B5249]" />
                  <span>Pay Online via Razorpay / UPI</span>
                </button>

                <p className="text-center text-[10px] tracking-wider text-[#5C5E58]">
                  Direct Workshop WhatsApp Support • Encrypted Checkout
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CheckoutDrawerV2;
