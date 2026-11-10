import React, { useId } from "react";
import type { InfillFinish, SvgMotifType } from "@/data/products";

interface StoneVisualizerProps {
  motif: SvgMotifType;
  finish: InfillFinish;
  className?: string;
  showBack?: boolean;
  engravingText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

/** Shared silhouette of the river basalt pebble (root SVG user space). */
const STONE_OUTLINE =
  "M 95 65 C 170 30, 290 34, 335 75 C 375 110, 385 185, 360 235 C 330 290, 225 305, 140 290 C 65 275, 25 220, 30 160 C 35 105, 55 82, 95 65 Z";

/** Top-left contour used for the lit bevel sheen. */
const STONE_BEVEL =
  "M 34 162 C 38 108, 56 84, 96 66 C 142 40, 200 34, 252 40";

/** Which pass of the engraving is being painted. */
type MotifLayer = "trench" | "infill";

export function StoneVisualizer({
  motif,
  finish,
  className = "",
  showBack = false,
  engravingText,
  size = "md",
}: StoneVisualizerProps) {
  const rawId = useId();
  // Sanitize id for SVG url references
  const id = rawId.replace(/[^a-zA-Z0-9-_]/g, "");

  const goldGradId = `gold-grad-${id}`;
  const silverGradId = `silver-grad-${id}`;
  const rawGradId = `raw-grad-${id}`;
  const stoneReliefId = `stone-relief-${id}`;
  const trenchDilateId = `trench-dilate-${id}`;
  const stoneGrainId = `stone-grain-${id}`;
  const stoneClipId = `stone-clip-${id}`;
  const rimLightId = `rim-light-${id}`;
  const bevelBlurId = `bevel-blur-${id}`;
  const contactShadowId = `contact-shadow-${id}`;

  /* ---------------------------------------------------------------- */
  /* Infill paints                                                    */
  /* ---------------------------------------------------------------- */

  /**
   * The metallic inlay is painted as a single continuous sweep of foil
   * across the whole engraving, so every line of a motif shares one
   * reflection instead of restarting the gradient per path.
   */
  const getFinishFill = (layer: MotifLayer = "infill") => {
    if (layer === "trench") return "#050507";
    switch (finish) {
      case "gold":
        return `url(#${goldGradId})`;
      case "silver":
        return `url(#${silverGradId})`;
      case "raw":
        return `url(#${rawGradId})`;
      default:
        return `url(#${goldGradId})`;
    }
  };

  const getFinishStroke = (layer: MotifLayer = "infill") => {
    if (layer === "trench") return "#050507";
    switch (finish) {
      case "gold":
        return `url(#${goldGradId})`;
      case "silver":
        return `url(#${silverGradId})`;
      case "raw":
        return `url(#${rawGradId})`;
      default:
        return `url(#${goldGradId})`;
    }
  };

  /** Flat accent used for small marks that must not sample the gradient. */
  const getInkColor = () => {
    switch (finish) {
      case "silver":
        return "#D4D4D8";
      case "raw":
        return "#A1A1AA";
      default:
        return "#D4AF37";
    }
  };

  /**
   * No outer bloom: the inlay sits *inside* the rock, so it must never
   * glow past its own edges. Only the raw etch keeps a whisper of
   * contact shadow so the uncut trench still reads as recessed.
   */
  const getFinishFilter = () => {
    switch (finish) {
      case "raw":
        return "drop-shadow(0 0.5px 1px rgba(0,0,0,0.75))";
      default:
        return undefined;
    }
  };

  /* ---------------------------------------------------------------- */
  /* Motif artwork                                                     */
  /* ---------------------------------------------------------------- */

  const renderMotifPaths = (layer: MotifLayer = "infill") => {
    const fill = getFinishFill(layer);
    const stroke = getFinishStroke(layer);
    const filterStyle = { filter: getFinishFilter() };
    const bindu = layer === "infill" && finish === "gold" ? "#FF4500" : fill;

    switch (motif) {
      case "ganesha":
        return (
          <g
            id="motif-ganesha"
            style={filterStyle}
            transform="translate(133, 100) scale(1.15)"
          >
            {/* Sacred halo arc with attendant beads */}
            <path
              d="M 14 94 C 14 24, 106 24, 106 94"
              fill="none"
              stroke={stroke}
              strokeWidth="1.4"
              opacity="0.55"
            />
            <circle cx="60" cy="7" r="2.2" fill={fill} />
            <circle cx="41" cy="15" r="1.4" fill={fill} opacity="0.8" />
            <circle cx="79" cy="15" r="1.4" fill={fill} opacity="0.8" />

            {/* Crown (mukut) with central jewel and flanking beads */}
            <path
              d="M 44 44 L 48 24 L 55 36 L 60 12 L 65 36 L 72 24 L 76 44 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M 43 45 Q 60 51 77 45"
              fill="none"
              stroke={stroke}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="60" cy="32" r="2.6" fill={fill} stroke={stroke} strokeWidth="1" />
            <circle cx="51" cy="36" r="1.4" fill={fill} />
            <circle cx="69" cy="36" r="1.4" fill={fill} />

            {/* Forehead dome with tilak */}
            <path
              d="M 44 60 C 45 50, 51 46, 60 46 C 69 46, 75 50, 76 60"
              fill="none"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M 60 63 C 55 59, 60 53, 60 53 C 60 53, 65 59, 60 63 Z" fill={fill} />

            {/* Ears with inner filigree */}
            <path
              d="M 44 62 C 24 58, 13 74, 17 92 C 20 106, 34 106, 43 97"
              fill="none"
              stroke={stroke}
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            <path
              d="M 76 62 C 96 58, 107 74, 103 92 C 100 106, 86 106, 77 97"
              fill="none"
              stroke={stroke}
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            <path
              d="M 40 70 C 30 72, 26 82, 32 90"
              fill="none"
              stroke={stroke}
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 80 70 C 90 72, 94 82, 88 90"
              fill="none"
              stroke={stroke}
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Eyes */}
            <path
              d="M 47 73 Q 51 70, 55 73"
              fill="none"
              stroke={stroke}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M 65 73 Q 69 70, 73 73"
              fill="none"
              stroke={stroke}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="51" cy="72" r="1.1" fill={fill} />
            <circle cx="69" cy="72" r="1.1" fill={fill} />

            {/* Tusks: left broken, right full */}
            <path
              d="M 47 92 L 43 104"
              fill="none"
              stroke={stroke}
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            <path
              d="M 73 92 L 80 110 L 74 110 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />

            {/* Necklace */}
            <path
              d="M 50 100 Q 60 107 70 100"
              fill="none"
              stroke={stroke}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="60" cy="104" r="2" fill={fill} />

            {/* Trunk curling left, holding the modak */}
            <path
              d="M 53 78 C 53 98, 57 120, 49 133 C 42 144, 27 141, 27 127 C 27 117, 39 113, 45 122"
              fill="none"
              stroke={stroke}
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <circle cx="34" cy="126" r="4.2" fill={fill} />
            <path
              d="M 34 121.5 L 34 122"
              fill="none"
              stroke={stroke}
              strokeWidth="0.9"
              opacity="0.7"
            />
          </g>
        );

      case "trishul":
        return (
          <g
            id="motif-trishul"
            style={filterStyle}
            transform="translate(138, 100) scale(1.15)"
          >
            {/* Central spear head with inner facet */}
            <path
              d="M 60 10 L 70 46 L 60 39 L 50 46 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M 60 10 L 60 39"
              fill="none"
              stroke={stroke}
              strokeWidth="0.9"
              opacity="0.75"
            />

            {/* Prongs — slim blades sweeping out from the shaft */}
            <path
              d="M 60 86 C 44 83, 27 70, 26 50 C 25 37, 28 27, 32 19 C 31 30, 33 42, 39 52 C 43 59, 51 64, 60 66 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            <path
              d="M 60 86 C 76 83, 93 70, 94 50 C 95 37, 92 27, 88 19 C 89 30, 87 42, 81 52 C 77 59, 69 64, 60 66 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="17" r="2.2" fill={fill} />
            <circle cx="88" cy="17" r="2.2" fill={fill} />

            {/* Tripundra — three sacred ash lines across the shaft */}
            <path d="M 49 70 Q 60 74 71 70" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 48 76 Q 60 80 72 76" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 49 82 Q 60 86 71 82" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />

            {/* Bindu */}
            <circle cx="60" cy="61" r="3.2" fill={bindu} />

            {/* Crescent moon */}
            <path d="M 71 24 C 78 33, 77 46, 67 53 C 75 47, 78 37, 71 24 Z" fill={fill} />

            {/* Shaft */}
            <path
              d="M 60 84 L 60 150"
              fill="none"
              stroke={stroke}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Damru (hourglass drum) */}
            <path
              d="M 43 94 L 77 94 L 60 109 L 77 124 L 43 124 L 60 109 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M 60 109 Q 73 111 79 117"
              fill="none"
              stroke={stroke}
              strokeWidth="1.4"
            />
            <circle cx="80" cy="117" r="2.4" fill={fill} />
            <path
              d="M 60 109 Q 47 107 41 101"
              fill="none"
              stroke={stroke}
              strokeWidth="1.4"
            />
            <circle cx="40" cy="100" r="2.4" fill={fill} />

            {/* Lotus base */}
            <path
              d="M 44 148 Q 60 156 76 148"
              fill="none"
              stroke={stroke}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="60" cy="152" r="3" fill={fill} />
          </g>
        );

      case "om":
        return (
          <g
            id="motif-om"
            style={filterStyle}
            transform="translate(135, 100) scale(1.15)"
          >
            {/* Outer sacred ring with fine tick band */}
            <circle cx="65" cy="65" r="62" fill="none" stroke={stroke} strokeWidth="1.6" />
            <circle
              cx="65"
              cy="65"
              r="67"
              fill="none"
              stroke={stroke}
              strokeWidth="0.8"
              strokeDasharray="1 5"
              opacity="0.6"
            />

            {/* 12 radiating lotus tips */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
              (angle, idx) => (
                <path
                  key={idx}
                  d="M 65 8 L 68 14 L 62 14 Z"
                  fill={fill}
                  transform={`rotate(${angle} 65 65)`}
                  opacity="0.8"
                />
              )
            )}

            {/* Inner ring */}
            <circle cx="65" cy="65" r="47" fill="none" stroke={stroke} strokeWidth="1" opacity="0.55" />

            {/* Eight-petal heart lotus behind the glyph */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <path
                key={`petal-${idx}`}
                d="M 65 26 C 69 33, 69 39, 65 43 C 61 39, 61 33, 65 26 Z"
                fill={fill}
                stroke={stroke}
                strokeWidth="0.8"
                transform={`rotate(${angle} 65 65)`}
                opacity="0.55"
              />
            ))}

            {/* Sacred ॐ glyph */}
            <g transform="translate(15, 12) scale(0.77)">
              {/* Upper curve */}
              <path
                d="M 42 42 C 42 30, 54 22, 68 22 C 82 22, 92 32, 88 48 C 84 62, 70 66, 62 66"
                fill="none"
                stroke={stroke}
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Lower curve looping right */}
              <path
                d="M 62 66 C 74 66, 92 72, 90 90 C 88 106, 70 114, 52 110 C 38 106, 32 94, 34 88"
                fill="none"
                stroke={stroke}
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Central tail descending and sweeping up */}
              <path
                d="M 76 66 C 88 66, 110 68, 114 90 C 118 108, 108 126, 96 132"
                fill="none"
                stroke={stroke}
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Right crescent (chandrabindu) */}
              <path
                d="M 98 34 C 110 34, 120 42, 124 50 C 120 46, 112 42, 102 42"
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
              />
              {/* Bindu dot */}
              <circle cx="112" cy="24" r="4.5" fill={fill} />
            </g>
          </g>
        );

      case "hanuman":
        return (
          <g
            id="motif-hanuman"
            style={filterStyle}
            transform="translate(140, 96) scale(1.15)"
          >
            {/* Sanjeevani mountain held aloft, clear of the head */}
            <path
              d="M 82 34 L 92 15 L 100 26 L 110 17 L 116 38 L 86 40 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="95" cy="21" r="1.3" fill={fill} />
            <circle cx="104" cy="25" r="1.3" fill={fill} />

            {/* Mukut (crown) */}
            <path
              d="M 58 30 L 64 15 L 70 28 L 75 15 L 79 30"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <circle cx="68" cy="12" r="1.8" fill={fill} />

            {/* Face in profile, looking right */}
            <path
              d="M 58 33 C 66 33, 71 38, 72 44 C 77 44, 82 48, 80 52 C 78 56, 71 57, 68 58 C 68 62, 64 66, 58 67"
              fill="none"
              stroke={stroke}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Brow & eye */}
            <path
              d="M 62 43 Q 65 45 68 43"
              fill="none"
              stroke={stroke}
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            {/* Ear & kundal */}
            <circle cx="60" cy="45" r="2.6" fill="none" stroke={stroke} strokeWidth="1.3" />
            <circle cx="60" cy="49" r="1.2" fill={fill} />

            {/* Raised arm reaching for the mountain */}
            <path
              d="M 63 62 L 76 48 L 84 40"
              fill="none"
              stroke={stroke}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Torso */}
            <path
              d="M 52 59 C 62 61, 70 59, 73 71 C 76 85, 70 97, 66 103 L 48 99 C 44 89, 44 69, 52 59 Z"
              fill="none"
              stroke={stroke}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Sacred Janeyu */}
            <path
              d="M 56 61 Q 62 77 68 93"
              fill="none"
              stroke={stroke}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="2 3"
            />
            {/* Shoulder ornament */}
            <path
              d="M 50 63 Q 60 69 70 63"
              fill="none"
              stroke={stroke}
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* Gada (mace) in the rear hand */}
            <path
              d="M 42 78 L 27 112"
              fill="none"
              stroke={stroke}
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <circle cx="38" cy="69" r="5.4" fill={fill} stroke={stroke} strokeWidth="1.4" />
            <circle cx="38" cy="69" r="1.6" fill={stroke} />

            {/* Tail arcing back and up */}
            <path
              d="M 50 101 C 34 106, 20 96, 16 78 C 12 56, 22 38, 38 30"
              fill="none"
              stroke={stroke}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path d="M 38 30 L 43 25 L 46 31 Z" fill={fill} />

            {/* Legs in stride */}
            <path
              d="M 58 103 L 70 121 L 80 119"
              fill="none"
              stroke={stroke}
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 52 101 L 46 119 L 36 125"
              fill="none"
              stroke={stroke}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Lotus footing */}
            <path
              d="M 28 127 Q 58 135 88 127"
              fill="none"
              stroke={stroke}
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>
        );

      case "gayatri":
        return (
          <g
            id="motif-gayatri"
            style={filterStyle}
            transform="translate(135, 98) scale(1.15)"
          >
            {/* Outer radiant ring with fine tick band */}
            <circle cx="65" cy="65" r="62" fill="none" stroke={stroke} strokeWidth="1.6" opacity="0.85" />
            <circle
              cx="65"
              cy="65"
              r="67"
              fill="none"
              stroke={stroke}
              strokeWidth="0.8"
              strokeDasharray="1 5"
              opacity="0.55"
            />

            {/* 16 solar flames */}
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

            {/* Middle circle */}
            <circle cx="65" cy="65" r="52" fill="none" stroke={stroke} strokeWidth="1.6" />

            {/* Bead band */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
              (angle, idx) => (
                <circle
                  key={`bead-${idx}`}
                  cx="65"
                  cy="46"
                  r="1.4"
                  fill={fill}
                  transform={`rotate(${angle} 65 65)`}
                  opacity="0.85"
                />
              )
            )}

            {/* Sacred syllable band */}
            <circle
              cx="65"
              cy="65"
              r="40"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
              strokeDasharray="2 3"
              opacity="0.7"
            />

            {/* 8-petal heart lotus */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <path
                key={`petal-${idx}`}
                d="M 65 34 C 69 42, 69 48, 65 52 C 61 48, 61 42, 65 34 Z"
                fill={fill}
                stroke={stroke}
                strokeWidth="1"
                transform={`rotate(${angle} 65 65)`}
                opacity="0.9"
              />
            ))}

            {/* Central sun disc */}
            <circle cx="65" cy="65" r="14" fill={fill} />
            <circle cx="65" cy="65" r="17" fill="none" stroke={stroke} strokeWidth="1.5" />
            <circle cx="65" cy="65" r="4" fill="#0F0F10" stroke={stroke} strokeWidth="1.5" />

            {/* Devanagari micro-etch inscription */}
            <text
              x="65"
              y="114"
              textAnchor="middle"
              fill={stroke}
              fontSize="7.5"
              fontFamily="var(--font-cinzel), serif"
              letterSpacing="0.1em"
              opacity="0.85"
            >
              ॐ भूर्भुवः स्वः
            </text>
          </g>
        );

      case "buddha":
        return (
          <g
            id="motif-buddha"
            style={filterStyle}
            transform="translate(136, 100) scale(1.15)"
          >
            {/* Halo / aura radiance */}
            <circle
              cx="60"
              cy="42"
              r="27"
              fill="none"
              stroke={stroke}
              strokeWidth="1.4"
              strokeDasharray="3 3"
              opacity="0.75"
            />
            <circle cx="60" cy="42" r="22" fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.45" />

            {/* Ushnisha (wisdom flame) */}
            <path d="M 60 14 C 57 19, 57 24, 60 27 C 63 24, 63 19, 60 14 Z" fill={fill} />

            {/* Head */}
            <ellipse cx="60" cy="35" rx="11" ry="13" fill="none" stroke={stroke} strokeWidth="2.4" />

            {/* Elongated ears */}
            <path d="M 49 30 C 46 35, 46 43, 49 46" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <path d="M 71 30 C 74 35, 74 43, 71 46" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />

            {/* Meditative eyes & urna */}
            <path d="M 53 36 Q 56 38 59 36" fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
            <path d="M 61 36 Q 64 38 67 36" fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="60" cy="32" r="1.4" fill={fill} />

            {/* Shoulders & robe */}
            <path
              d="M 44 47 C 36 51, 24 64, 24 82 L 96 82 C 96 64, 84 51, 76 47"
              fill="none"
              stroke={stroke}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path d="M 48 48 C 54 62, 60 76, 78 82" fill="none" stroke={stroke} strokeWidth="1.8" opacity="0.8" />
            <path d="M 44 58 C 50 68, 54 78, 64 82" fill="none" stroke={stroke} strokeWidth="1.4" opacity="0.65" />

            {/* Dhyana mudra */}
            <path d="M 50 82 C 54 86, 66 86, 70 82" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
            <ellipse cx="60" cy="83" rx="4.5" ry="1.8" fill={fill} />

            {/* Crossed legs in Padmasana */}
            <path
              d="M 18 102 C 22 90, 36 86, 60 86 C 84 86, 98 90, 102 102 C 94 108, 26 108, 18 102 Z"
              fill="none"
              stroke={stroke}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />

            {/* Lotus throne */}
            <path
              d="M 22 110 C 32 106, 42 106, 50 110 C 60 106, 70 106, 78 110 C 88 106, 94 108, 98 110 L 92 118 L 28 118 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.4"
              strokeLinejoin="round"
              opacity="0.92"
            />
            <path
              d="M 34 113 L 30 118 M 60 111 L 60 118 M 86 113 L 90 118"
              fill="none"
              stroke={stroke}
              strokeWidth="0.8"
              opacity="0.6"
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
      {/* Dynamic Ambient Ground Shadow */}
      <div className="absolute inset-x-8 -bottom-3 h-8 bg-black/80 rounded-full blur-xl pointer-events-none transform scale-95 transition-all duration-500 group-hover:scale-105 group-hover:blur-2xl" />

      <svg
        viewBox="0 0 400 320"
        className="w-full h-full drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Matte basalt grain — fine fractal noise, blended at low opacity */}
          <filter
            id={stoneGrainId}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
              result="grain"
            />
            <feColorMatrix in="grain" type="saturate" values="0" result="mono" />
            <feComponentTransfer in="mono" result="matte">
              <feFuncR type="linear" slope="1.7" intercept="-0.35" />
              <feFuncG type="linear" slope="1.7" intercept="-0.35" />
              <feFuncB type="linear" slope="1.7" intercept="-0.35" />
              <feFuncA type="linear" slope="0" intercept="1" />
            </feComponentTransfer>
          </filter>

          {/* Deep 3D drop shadow of the pebble body */}
          <filter
            id={stoneReliefId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="13"
              floodColor="#000000"
              floodOpacity="0.6"
            />
          </filter>

          {/* Carved trench: dilates the motif silhouette to cut the channel */}
          <filter
            id={trenchDilateId}
            x="-12%"
            y="-12%"
            width="124%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.4" result="spread" />
            <feFlood floodColor="#050507" floodOpacity="0.95" result="ink" />
            <feComposite in="ink" in2="spread" operator="in" />
          </filter>

          {/* Soft blur for the lit bevel sheen */}
          <filter id={bevelBlurId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>

          {/* Deep contact shadow beneath the stone */}
          <filter id={contactShadowId} x="-40%" y="-150%" width="180%" height="400%">
            <feGaussianBlur stdDeviation="13" />
          </filter>

          {/* Clip the grain to the pebble silhouette */}
          <clipPath id={stoneClipId}>
            <path d={STONE_OUTLINE} />
          </clipPath>

          {/* 24K gold foil — sharp, high-contrast metallic sweep */}
          <linearGradient
            id={goldGradId}
            gradientUnits="userSpaceOnUse"
            x1="14"
            y1="0"
            x2="106"
            y2="150"
          >
            <stop offset="0%" stopColor="#AA771C" />
            <stop offset="28%" stopColor="#FBF5B7" />
            <stop offset="56%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A5A10" />
          </linearGradient>

          {/* Brushed pure silver foil */}
          <linearGradient
            id={silverGradId}
            gradientUnits="userSpaceOnUse"
            x1="14"
            y1="0"
            x2="106"
            y2="150"
          >
            <stop offset="0%" stopColor="#71717A" />
            <stop offset="28%" stopColor="#F5F5F7" />
            <stop offset="56%" stopColor="#C7C7CE" />
            <stop offset="100%" stopColor="#8A8A93" />
          </linearGradient>

          {/* Raw micro-fractured stone frost */}
          <linearGradient
            id={rawGradId}
            gradientUnits="userSpaceOnUse"
            x1="14"
            y1="0"
            x2="106"
            y2="150"
          >
            <stop offset="0%" stopColor="#9A9AA3" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#D4D4D8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A1A1AA" stopOpacity="0.62" />
          </linearGradient>

          {/* Rich charcoal-obsidian body gradient */}
          <radialGradient
            id={`basalt-shading-${id}`}
            cx="38%"
            cy="27%"
            r="58%"
            fx="34%"
            fy="23%"
          >
            <stop offset="0%" stopColor="#232328" />
            <stop offset="24%" stopColor="#1A1A1F" />
            <stop offset="48%" stopColor="#141419" />
            <stop offset="74%" stopColor="#101015" />
            <stop offset="100%" stopColor="#0D0D10" />
          </radialGradient>

          {/* Bevel / rim light: lit top-left, shadowed bottom-right */}
          <linearGradient
            id={rimLightId}
            gradientUnits="userSpaceOnUse"
            x1="40"
            y1="40"
            x2="360"
            y2="300"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="44%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* --- DEEP CONTACT SHADOW --- */}
        <ellipse
          cx="200"
          cy="272"
          rx="138"
          ry="22"
          fill="#000000"
          opacity="0.75"
          filter={`url(#${contactShadowId})`}
          pointerEvents="none"
        />

        {/* --- ORGANIC RIVER BASALT ROCK BODY --- */}
        <g filter={`url(#${stoneReliefId})`}>
          {/* Main stone base */}
          <path d={STONE_OUTLINE} fill={`url(#basalt-shading-${id})`} />

          {/* Matte basalt grain */}
          <g clipPath={`url(#${stoneClipId})`}>
            <rect
              x="0"
              y="0"
              width="400"
              height="320"
              filter={`url(#${stoneGrainId})`}
              opacity="0.07"
              style={{ mixBlendMode: "overlay" }}
            />
          </g>

          {/* Smooth river-polished ambient highlight (top-left sun reflection) */}
          <path
            d="M 105 72 C 165 42, 270 46, 310 82 C 330 100, 320 120, 270 108 C 210 94, 140 98, 90 120 C 70 128, 65 105, 105 72 Z"
            fill="#FFFFFF"
            opacity="0.025"
            style={{ mixBlendMode: "overlay" }}
          />

          {/* Fine basalt edge rim lighting */}
          <path
            d={STONE_OUTLINE}
            fill="none"
            stroke={`url(#${rimLightId})`}
            strokeWidth="1.3"
          />
        </g>

        {/* Crisp 3D bevel sheen along the top-left contour (outside the
            drop-shadow group so it cannot cast a halo above the stone) */}
        <path
          d={STONE_BEVEL}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.1"
          strokeWidth="7"
          strokeLinecap="round"
          filter={`url(#${bevelBlurId})`}
        />

        {/* --- FRONT MOTIF OR BACK ENGRAVING --- */}
        {!showBack ? (
          <>
            {/* Carved trench shadow: dark channel cut into the rock */}
            <g transform="translate(0,-1)">
              <g filter={`url(#${trenchDilateId})`}>
                {renderMotifPaths("trench")}
              </g>
            </g>
            {/* Metallic inlay seated inside the trench */}
            {renderMotifPaths("infill")}
          </>
        ) : (
          /* Back-Side of the Sacred Pebble */
          <g id="stone-backside" transform="translate(80, 70)">
            {/* Natural Worry Stone Thumb Contour Recess */}
            <ellipse
              cx="120"
              cy="90"
              rx="64"
              ry="45"
              fill="#08080A"
              opacity="0.6"
              stroke="#27272A"
              strokeWidth="1"
            />
            <ellipse
              cx="120"
              cy="90"
              rx="56"
              ry="38"
              fill="none"
              stroke="#3F3F46"
              strokeWidth="0.8"
              strokeDasharray="3 4"
              opacity="0.3"
            />

            {/* Custom Engraving Text if provided */}
            {engravingText ? (
              <g transform="translate(120, 92)">
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill={getInkColor()}
                  stroke={getInkColor()}
                  strokeWidth="0.5"
                  fontSize={engravingText.length > 18 ? "10" : "12"}
                  fontFamily="var(--font-cinzel), serif"
                  letterSpacing="0.12em"
                  style={{ filter: getFinishFilter() }}
                >
                  {engravingText}
                </text>
                <text
                  x="0"
                  y="18"
                  textAnchor="middle"
                  fill="#71717A"
                  fontSize="7"
                  fontFamily="var(--font-sans), sans-serif"
                  letterSpacing="0.18em"
                  style={{ textTransform: "uppercase" }}
                >
                  Sacred River Basalt • Founders Batch
                </text>
              </g>
            ) : (
              <g transform="translate(120, 90)">
                <text
                  x="0"
                  y="-4"
                  textAnchor="middle"
                  fill="#71717A"
                  fontSize="8"
                  fontFamily="var(--font-cinzel), serif"
                  letterSpacing="0.18em"
                  opacity="0.6"
                >
                  NATURAL BASALT REVERSE
                </text>
                <text
                  x="0"
                  y="12"
                  textAnchor="middle"
                  fill="#52525B"
                  fontSize="7"
                  fontFamily="var(--font-sans), sans-serif"
                  letterSpacing="0.1em"
                  opacity="0.6"
                >
                  Ergonomic Thumb Rest
                </text>
              </g>
            )}
          </g>
        )}

        {/* Micro Laser Specular Sparkle for 24K Gold and Silver */}
        {finish !== "raw" && !showBack && (
          <circle
            cx="175"
            cy="115"
            r="0.9"
            fill="#FFFFFF"
            opacity="0.45"
            className="animate-pulse"
          />
        )}
      </svg>
    </div>
  );
}
