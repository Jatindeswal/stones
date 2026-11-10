import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { PitchSwitcher } from "@/components/PitchSwitcher";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sacred Stones | Handcrafted Basalt River Stones & Sacred Mantras",
  description:
    "Laser-engraved natural river basalt stones infused with Vedic mantras and sacred deities. Available in Sacred Obsidian and Sunlit Earthy Craft editions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0B0C] text-[#F4F4F5]">
        {children}
        <PitchSwitcher />
      </body>
    </html>
  );
}
