"use client";

import React, { useId } from "react";
import type { InfillFinishV2, SvgMotifTypeV2 } from "@/data/productsV2";

interface StoneVisualizerV2Props {
  motif: SvgMotifTypeV2;
  finish: InfillFinishV2;
  className?: string;
  showBack?: boolean;
  engravingText?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function StoneVisualizerV2({
  motif,
  finish,
  className = "",
  showBack = false,
  engravingText,
  size = "md",
}: StoneVisualizerV2Props) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9-_]/g, "");

  const stoneNoiseId = `stone-noise-v2-${id}`;
  const stoneReliefId = `stone-relief-v2-${id}`;
  const etchTrenchId = `etch-trench-v2-${id}`;
  const terracottaGradId = `terracotta-grad-v2-${id}`;
  const boneWhiteGradId = `bone-white-grad-v2-${id}`;
  const rawFrostGradId = `raw-frost-grad-v2-${id}`;

  // Palette based on honest laser finish
  const getEtchFill = () => {
    switch (finish) {
      case "oiled_basalt":
        return `url(#${boneWhiteGradId})`;
      case "raw_frost":
        return `url(#${rawFrostGradId})`;
      case "terracotta":
        return `url(#${terracottaGradId})`;
      default:
        return `url(#${boneWhiteGradId})`;
    }
  };

  const getEtchStroke = () => {
    switch (finish) {
      case "oiled_basalt":
        return "#EAE6DD";
      case "raw_frost":
        return "#D8D2C5";
      case "terracotta":
        return "#B34E2F";
      default:
        return "#EAE6DD";
    }
  };

  const getStoneGradientId = () => {
    switch (finish) {
      case "oiled_basalt":
        return `stone-oiled-${id}`;
      case "raw_frost":
        return `stone-raw-${id}`;
      case "terracotta":
        return `stone-terracotta-base-${id}`;
      default:
        return `stone-oiled-${id}`;
    }
  };

  const renderMotifPaths = () => {
    const fill = getEtchFill();
    const stroke = getEtchStroke();
    const filterStyle = { filter: `url(#${etchTrenchId})` };

    switch (motif) {
      case "ganesha":
        return (
          <g
            id="motif-ganesha-v2"
            style={filterStyle}
            transform="translate(140, 110) scale(1.15)"
          >
            {/* Tilak / Trishul mark */}
            <path
              d="M 60 42 C 60 30, 68 22, 60 12 C 52 22, 60 30, 60 42 Z"
              fill={fill}
            />
            <path
              d="M 49 28 C 55 33, 65 33, 71 28"
              stroke={stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="60" cy="36" r="3" fill={fill} />

            {/* Left Ear */}
            <path
              d="M 44 48 C 22 45, 12 60, 16 80 C 20 95, 34 92, 42 85"
              fill="none"
              stroke={stroke}
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <path
              d="M 28 60 C 22 70, 24 78, 32 80"
              fill="none"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Right Ear */}
            <path
              d="M 76 48 C 98 45, 108 60, 104 80 C 100 95, 86 92, 78 85"
              fill="none"
              stroke={stroke}
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <path
              d="M 92 60 C 98 70, 96 78, 88 80"
              fill="none"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Forehead dome */}
            <path
              d="M 40 50 C 44 38, 52 34, 60 34 C 68 34, 76 38, 80 50"
              fill="none"
              stroke={stroke}
              strokeWidth="3.8"
              strokeLinecap="round"
            />

            {/* Tusks */}
            <path
              d="M 43 92 L 40 98"
              stroke={stroke}
              strokeWidth="3.8"
              strokeLinecap="square"
            />
            <path
              d="M 77 92 L 82 104 L 79 104"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Trunk */}
            <path
              d="M 52 70 C 52 88, 55 110, 48 126 C 42 138, 26 136, 26 122 C 26 112, 38 108, 44 116"
              fill="none"
              stroke={stroke}
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <circle cx="34" cy="116" r="4.2" fill={fill} />

            {/* Eyes */}
            <path
              d="M 46 62 Q 50 60, 54 62"
              stroke={stroke}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 66 62 Q 70 60, 74 62"
              stroke={stroke}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );

      case "trishul":
        return (
          <g
            id="motif-trishul-v2"
            style={filterStyle}
            transform="translate(142, 105) scale(1.15)"
          >
            {/* Tripundra lines */}
            <path
              d="M 38 48 Q 60 52 82 48"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 36 53 Q 60 57 84 53"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 38 58 Q 60 62 82 58"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <circle
              cx="60"
              cy="55"
              r="2.8"
              fill={finish === "terracotta" ? "#C85A38" : fill}
            />

            {/* Central Spear Point */}
            <path
              d="M 60 12 L 67 44 L 60 40 L 53 44 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Outer Prongs */}
            <path
              d="M 60 76 C 45 76, 22 68, 22 36 C 22 28, 28 20, 31 16 C 30 25, 36 38, 46 44 C 52 47, 56 50, 60 52"
              fill={fill}
              stroke={stroke}
              strokeWidth="1"
            />
            <path
              d="M 60 76 C 75 76, 98 68, 98 36 C 98 28, 92 20, 89 16 C 90 25, 84 38, 74 44 C 68 47, 64 50, 60 52"
              fill={fill}
              stroke={stroke}
              strokeWidth="1"
            />

            {/* Crescent Moon */}
            <path
              d="M 72 26 C 77 34, 76 45, 68 51 C 74 47, 76 38, 72 26 Z"
              fill={fill}
            />

            {/* Central Shaft */}
            <path
              d="M 60 76 L 60 148"
              stroke={stroke}
              strokeWidth="3.8"
              strokeLinecap="round"
            />

            {/* Damru */}
            <path
              d="M 44 92 L 76 92 L 60 106 L 76 120 L 44 120 L 60 106 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M 60 106 Q 72 108 78 114"
              stroke={stroke}
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="79" cy="115" r="2.2" fill={fill} />
            <path
              d="M 60 106 Q 48 104 42 98"
              stroke={stroke}
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="41" cy="97" r="2.2" fill={fill} />
            <circle cx="60" cy="151" r="3" fill={fill} />
          </g>
        );

      case "om":
        return (
          <g
            id="motif-om-v2"
            style={filterStyle}
            transform="translate(135, 100) scale(1.15)"
          >
            {/* Concentric rings */}
            <circle
              cx="65"
              cy="65"
              r="62"
              fill="none"
              stroke={stroke}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.8"
            />
            <circle
              cx="65"
              cy="65"
              r="58"
              fill="none"
              stroke={stroke}
              strokeWidth="1.5"
            />

            {/* Lotus ray accents */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
              (angle, idx) => (
                <path
                  key={idx}
                  d="M 65 8 L 68 14 L 62 14 Z"
                  fill={fill}
                  transform={`rotate(${angle} 65 65)`}
                  opacity="0.85"
                />
              )
            )}

            <circle
              cx="65"
              cy="65"
              r="48"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
              opacity="0.65"
            />

            {/* Central ॐ (Om) Glyph */}
            <g transform="translate(15, 12) scale(0.77)">
              <path
                d="M 42 42 C 42 30, 54 22, 68 22 C 82 22, 92 32, 88 48 C 84 62, 70 66, 62 66"
                fill="none"
                stroke={stroke}
                strokeWidth="4.8"
                strokeLinecap="round"
              />
              <path
                d="M 62 66 C 74 66, 92 72, 90 90 C 88 106, 70 114, 52 110 C 38 106, 32 94, 34 88"
                fill="none"
                stroke={stroke}
                strokeWidth="4.8"
                strokeLinecap="round"
              />
              <path
                d="M 76 66 C 88 66, 110 68, 114 90 C 118 108, 108 126, 96 132"
                fill="none"
                stroke={stroke}
                strokeWidth="4.2"
                strokeLinecap="round"
              />
              <path
                d="M 98 34 C 110 34, 120 42, 124 50 C 120 46, 112 42, 102 42"
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
              />
              <circle cx="112" cy="24" r="4.2" fill={fill} />
            </g>
          </g>
        );

      case "hanuman":
        return (
          <g
            id="motif-hanuman-v2"
            style={filterStyle}
            transform="translate(140, 105) scale(1.15)"
          >
            {/* Sanjeevani Mountain */}
            <path
              d="M 72 26 L 86 12 L 96 22 L 108 14 L 114 34 L 78 36 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Arm */}
            <path
              d="M 66 48 L 78 36 L 82 42 L 72 56"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Crown & Head Profile */}
            <path
              d="M 44 26 L 52 14 L 58 26 L 64 16 L 68 28 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.5"
            />
            <path
              d="M 46 28 C 54 28, 58 32, 60 38 C 64 38, 70 42, 68 46 C 66 50, 58 52, 54 54 C 54 58, 50 62, 44 64"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
            />
            <circle cx="48" cy="42" r="3" fill="none" stroke={stroke} strokeWidth="1.5" />
            <circle cx="48" cy="46" r="1.5" fill={fill} />

            {/* Torso */}
            <path
              d="M 44 64 C 56 66, 68 62, 70 76 C 72 90, 62 104, 58 112 L 40 106 C 36 96, 36 78, 44 64 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
            />
            {/* Gada */}
            <path
              d="M 28 62 L 48 138"
              stroke={stroke}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M 22 56 C 20 48, 32 42, 38 48 C 42 54, 36 62, 28 64 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
            />
            {/* Arching Tail */}
            <path
              d="M 40 108 C 22 110, 12 90, 16 66 C 20 40, 34 20, 50 10 C 60 4, 72 6, 78 12"
              fill="none"
              stroke={stroke}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path d="M 78 12 L 83 8 L 86 14 Z" fill={fill} />
            {/* Legs */}
            <path
              d="M 58 112 L 72 136 L 84 134"
              stroke={stroke}
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 46 108 L 42 128 L 32 136"
              stroke={stroke}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        );

      case "gayatri":
        return (
          <g
            id="motif-gayatri-v2"
            style={filterStyle}
            transform="translate(135, 100) scale(1.15)"
          >
            {/* Solar Radiant Ring */}
            <circle
              cx="65"
              cy="65"
              r="62"
              fill="none"
              stroke={stroke}
              strokeWidth="1.5"
              opacity="0.8"
            />
            {/* 16 Solar Flames */}
            {[
              0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5,
              270, 292.5, 315, 337.5,
            ].map((angle, idx) => (
              <path
                key={idx}
                d="M 65 6 L 68 13 L 65 11 L 62 13 Z"
                fill={fill}
                transform={`rotate(${angle} 65 65)`}
              />
            ))}
            <circle
              cx="65"
              cy="65"
              r="52"
              fill="none"
              stroke={stroke}
              strokeWidth="1.5"
            />
            {/* 8-Petal Lotus */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <path
                key={idx}
                d="M 65 34 C 69 42, 69 48, 65 52 C 61 48, 61 42, 65 34 Z"
                fill={fill}
                stroke={stroke}
                strokeWidth="1"
                transform={`rotate(${angle} 65 65)`}
                opacity="0.9"
              />
            ))}
            <circle cx="65" cy="65" r="14" fill={fill} />
            <text
              x="65"
              y="114"
              textAnchor="middle"
              fill={stroke}
              fontSize="6.5"
              fontFamily="var(--font-sans), sans-serif"
              letterSpacing="0.1em"
              opacity="0.9"
            >
              ॐ भूर्भुवः स्वः
            </text>
          </g>
        );

      case "buddha":
        return (
          <g
            id="motif-buddha-v2"
            style={filterStyle}
            transform="translate(140, 105) scale(1.15)"
          >
            {/* Aura */}
            <circle
              cx="60"
              cy="40"
              r="26"
              fill="none"
              stroke={stroke}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.75"
            />
            <path
              d="M 60 16 C 58 20, 58 24, 60 26 C 62 24, 62 20, 60 16 Z"
              fill={fill}
            />
            <ellipse
              cx="60"
              cy="34"
              rx="12"
              ry="13"
              fill="none"
              stroke={stroke}
              strokeWidth="2.5"
            />
            {/* Ears */}
            <path
              d="M 48 30 C 46 34, 46 42, 49 44"
              fill="none"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 72 30 C 74 34, 74 42, 71 44"
              fill="none"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Meditative Eyes */}
            <path
              d="M 53 34 Q 56 36, 59 34"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 61 34 Q 64 36, 67 34"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Robe */}
            <path
              d="M 44 46 C 36 50, 24 64, 24 82 L 96 82 C 96 64, 84 50, 76 46"
              fill="none"
              stroke={stroke}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Mudra */}
            <path
              d="M 50 82 C 54 86, 66 86, 70 82"
              fill="none"
              stroke={stroke}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <ellipse cx="60" cy="83" rx="5" ry="2" fill={fill} />
            {/* Padmasana */}
            <path
              d="M 18 102 C 22 90, 36 86, 60 86 C 84 86, 98 90, 102 102 C 94 108, 26 108, 18 102 Z"
              fill="none"
              stroke={stroke}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Lotus Throne */}
            <path
              d="M 22 110 C 32 106, 42 106, 50 110 C 60 106, 70 106, 78 110 C 88 106, 94 108, 98 110 L 92 118 L 28 118 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        );

      default:
        return null;
    }
  };

  const sizeClasses = {
    sm: "w-40 h-32 md:w-48 md:h-36",
    md: "w-64 h-52 md:w-72 md:h-56",
    lg: "w-80 h-64 md:w-96 md:h-76",
    xl: "w-full aspect-[4/3] max-w-lg",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${sizeClasses[size]} ${className}`}
    >
      {/* Sunlit Studio Soft Contact Shadow */}
      <div className="absolute inset-x-8 -bottom-3 h-8 bg-[#1E201D]/20 rounded-full blur-xl pointer-events-none transform scale-95 transition-all duration-500 group-hover:scale-105 group-hover:blur-2xl" />

      <svg
        viewBox="0 0 400 320"
        className="w-full h-full drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle natural stone relief filter for daylight studio */}
          <filter id={stoneReliefId} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow
              dx="0"
              dy="14"
              stdDeviation="16"
              floodColor="#1E201D"
              floodOpacity="0.22"
            />
          </filter>

          {/* Micro-recessed trench shadow for laser carved grooves */}
          <filter id={etchTrenchId}>
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="0.6"
              floodColor="#0E100E"
              floodOpacity="0.75"
            />
          </filter>

          {/* Oiled Basalt Finish (Beeswax Deep Charcoal) */}
          <radialGradient
            id={`stone-oiled-${id}`}
            cx="40%"
            cy="34%"
            r="66%"
            fx="36%"
            fy="28%"
          >
            <stop offset="0%" stopColor="#2E322E" />
            <stop offset="35%" stopColor="#222522" />
            <stop offset="70%" stopColor="#171917" />
            <stop offset="95%" stopColor="#111311" />
            <stop offset="100%" stopColor="#0B0C0B" />
          </radialGradient>

          {/* Raw Frost Finish (Natural Weathered Matte Ash-Grey) */}
          <radialGradient
            id={`stone-raw-${id}`}
            cx="42%"
            cy="36%"
            r="66%"
            fx="38%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#4A4E4A" />
            <stop offset="35%" stopColor="#3C403C" />
            <stop offset="70%" stopColor="#2D302D" />
            <stop offset="95%" stopColor="#222522" />
            <stop offset="100%" stopColor="#1B1C1B" />
          </radialGradient>

          {/* Terracotta Base Stone */}
          <radialGradient
            id={`stone-terracotta-base-${id}`}
            cx="40%"
            cy="34%"
            r="66%"
            fx="36%"
            fy="28%"
          >
            <stop offset="0%" stopColor="#363A36" />
            <stop offset="35%" stopColor="#282C28" />
            <stop offset="70%" stopColor="#1E201E" />
            <stop offset="95%" stopColor="#141614" />
            <stop offset="100%" stopColor="#0D0F0D" />
          </radialGradient>

          {/* Crisp Bone-White Laser Infill (for Oiled Basalt) */}
          <linearGradient id={boneWhiteGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F4F1EA" />
            <stop offset="100%" stopColor="#E5E1D8" />
          </linearGradient>

          {/* Chalky Off-White Laser Infill (for Raw Frost) */}
          <linearGradient id={rawFrostGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAE5DC" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#DFD9CE" stopOpacity="0.90" />
            <stop offset="100%" stopColor="#CEC7BA" stopOpacity="0.85" />
          </linearGradient>

          {/* Sacred Terracotta Infill (Natural Clay Rub) */}
          <linearGradient id={terracottaGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D96A47" />
            <stop offset="50%" stopColor="#B85132" />
            <stop offset="100%" stopColor="#963D22" />
          </linearGradient>

          {/* Subtle daylight stone speckle pattern */}
          <pattern
            id={`stone-grain-v2-${id}`}
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4" cy="7" r="0.7" fill="#6A6E68" opacity="0.25" />
            <circle cx="16" cy="5" r="0.6" fill="#888C86" opacity="0.2" />
            <circle cx="23" cy="18" r="0.9" fill="#585B56" opacity="0.25" />
            <circle cx="10" cy="22" r="0.6" fill="#757973" opacity="0.2" />
          </pattern>
        </defs>

        {/* --- NATURAL RIVER BASALT ROCK BODY --- */}
        <g filter={`url(#${stoneReliefId})`}>
          {/* Main Stone Base */}
          <path
            d="M 95 65
               C 170 30, 290 34, 335 75
               C 375 110, 385 185, 360 235
               C 330 290, 225 305, 140 290
               C 65 275, 25 220, 30 160
               C 35 105, 55 82, 95 65 Z"
            fill={`url(#${getStoneGradientId()})`}
          />

          {/* Mineral Grain Overlay */}
          <path
            d="M 95 65
               C 170 30, 290 34, 335 75
               C 375 110, 385 185, 360 235
               C 330 290, 225 305, 140 290
               C 65 275, 25 220, 30 160
               C 35 105, 55 82, 95 65 Z"
            fill={`url(#stone-grain-v2-${id})`}
          />

          {/* Daylight Satin Sheen (Top-left ambient daylight reflection) */}
          <path
            d="M 105 72
               C 165 42, 270 46, 310 82
               C 330 100, 320 120, 270 108
               C 210 94, 140 98, 90 120
               C 70 128, 65 105, 105 72 Z"
            fill="#FFFFFF"
            opacity={finish === "oiled_basalt" ? "0.08" : "0.04"}
            style={{ mixBlendMode: "overlay" }}
          />

          {/* Fine Edge Rim Highlight */}
          <path
            d="M 95 65
               C 170 30, 290 34, 335 75
               C 375 110, 385 185, 360 235
               C 330 290, 225 305, 140 290
               C 65 275, 25 220, 30 160
               C 35 105, 55 82, 95 65 Z"
            fill="none"
            stroke="#7C8079"
            strokeWidth="1"
            opacity="0.25"
          />
        </g>

        {/* --- FRONT MOTIF OR REVERSE BACK ENGRAVING --- */}
        {!showBack ? (
          <g>{renderMotifPaths()}</g>
        ) : (
          /* Back-Side of the Sacred Pebble */
          <g id="stone-backside-v2" transform="translate(80, 70)">
            {/* Natural Worry Stone Thumb Contour Recess */}
            <ellipse
              cx="120"
              cy="90"
              rx="64"
              ry="45"
              fill="#121412"
              opacity="0.55"
              stroke="#383C38"
              strokeWidth="1"
            />
            <ellipse
              cx="120"
              cy="90"
              rx="56"
              ry="38"
              fill="none"
              stroke="#4E524E"
              strokeWidth="0.8"
              strokeDasharray="3 4"
              opacity="0.3"
            />

            {/* Custom Engraving Text if provided */}
            {engravingText ? (
              <g transform="translate(120, 92)" filter={`url(#${etchTrenchId})`}>
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill={getEtchFill()}
                  stroke={getEtchStroke()}
                  strokeWidth="0.4"
                  fontSize={engravingText.length > 18 ? "10" : "12"}
                  fontFamily="var(--font-cormorant), serif"
                  letterSpacing="0.12em"
                >
                  {engravingText}
                </text>
                <text
                  x="0"
                  y="18"
                  textAnchor="middle"
                  fill="#A8A49C"
                  fontSize="7"
                  fontFamily="var(--font-sans), sans-serif"
                  letterSpacing="0.18em"
                  style={{ textTransform: "uppercase" }}
                >
                  Natural River Basalt • Hand Finished
                </text>
              </g>
            ) : (
              <g transform="translate(120, 90)">
                <text
                  x="0"
                  y="-4"
                  textAnchor="middle"
                  fill="#98948C"
                  fontSize="8.5"
                  fontFamily="var(--font-cormorant), serif"
                  letterSpacing="0.16em"
                  opacity="0.75"
                >
                  NATURAL BASALT REVERSE
                </text>
                <text
                  x="0"
                  y="12"
                  textAnchor="middle"
                  fill="#6C6E68"
                  fontSize="7"
                  fontFamily="var(--font-sans), sans-serif"
                  letterSpacing="0.1em"
                  opacity="0.7"
                >
                  Hand-Polished Thumb Rest
                </text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

export default StoneVisualizerV2;
