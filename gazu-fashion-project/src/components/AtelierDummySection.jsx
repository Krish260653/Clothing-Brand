import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Layers, Calendar, CheckCircle2, Shield, Plus, ShoppingBag, Eye } from 'lucide-react';

/* ── Garment & Outfit Stage Definitions ─────────────────────────────── */
const GARMENT_STAGES = [
  {
    stage: 1,
    key: "tshirt",
    tag: "01 • BASE LAYER",
    name: "Heavyweight Washed Tee",
    fabric: "280 GSM French Terry Cotton",
    color: "Washed Slate Charcoal",
    price: 1899,
    image: "/assets/gazu_tshirt.png",
    details: "Seamless ribbed collar, pre-shrunk boxy cut with natural shoulder drape and dropped seams.",
    glowColor: "rgba(255, 255, 255, 0.08)",
    id: "gazu-tee",
  },
  {
    stage: 2,
    key: "shirt",
    tag: "02 • MID LAYER",
    name: "Minimalist Workwear Overshirt",
    fabric: "Heavyweight 12oz Duck Canvas",
    color: "Midnight Obsidian",
    price: 4499,
    image: "/assets/gazu_shirt.png",
    details: "Dual industrial chest flap pockets, concealed YKK hardware, and structured drop-shoulder tailoring.",
    glowColor: "rgba(99, 102, 241, 0.12)",
    id: "gazu-overshirt",
  },
  {
    stage: 3,
    key: "sweater",
    tag: "03 • HEAVY KNIT",
    name: "Chunky Ribbed Knit Sweater",
    fabric: "100% Merino Wool Textured Rib",
    color: "Raw Clay Charcoal",
    price: 5499,
    image: "/assets/gazu_sweater.png",
    details: "High-density waffle rib construction, raglan sleeve articulation, and sculpted thermal drape.",
    glowColor: "rgba(168, 85, 247, 0.12)",
    id: "gazu-sweater",
  },
  {
    stage: 4,
    key: "complete",
    tag: "04 • FULL RUNWAY LOOK",
    name: "Complete Atelier Ensemble",
    fabric: "Triple-Layer Architectural Synergy",
    color: "Monochrome Obsidian",
    price: 11897,
    image: "/assets/hero_walker_cutout.png",
    details: "The full GAZU runway silhouette. All upper garments styled with wide-leg tailored trousers and sneakers.",
    glowColor: "rgba(234, 179, 8, 0.18)",
    id: "gazu-full-runway",
  }
];

const UPCOMING_DROPS = [
  {
    code: "DROP 01",
    season: "Q3 2025",
    title: "NEO-METROPOLIS",
    desc: "Cybernetic storm shells, bonded seam outerwear, and magnetic utility closures.",
    status: "In Prototype Testing"
  },
  {
    code: "DROP 02",
    season: "Q4 2025",
    title: "RAW ATELIER",
    desc: "Zero-dye unbleached hemp denim, selvedge overshirts, and architectural work jackets.",
    status: "Pattern Drafting"
  },
  {
    code: "DROP 03",
    season: "Q1 2026",
    title: "ZERO GRAVITY",
    desc: "Featherweight modular down jackets, weather-sealed bombers, and ripstop joggers.",
    status: "Textile Sourcing"
  }
];

/* ── Realistic Guy Mannequin Body (Head, Neck, Torso, Tailored Trousers, Sneakers) ── */
const RealisticMannequinBody = () => (
  <svg
    viewBox="0 0 320 740"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
  >
    <defs>
      {/* Matte dark metallic skin gradient */}
      <linearGradient id="bodySkin" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#3c3c3c" />
        <stop offset="45%" stopColor="#282828" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>

      {/* Torso athletic volume gradient */}
      <radialGradient id="torsoVolume" cx="0.5" cy="0.32" r="0.6">
        <stop offset="0%" stopColor="#444444" />
        <stop offset="55%" stopColor="#2a2a2a" />
        <stop offset="100%" stopColor="#181818" />
      </radialGradient>

      {/* Studio Key Rim Light on left side */}
      <linearGradient id="studioRim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
        <stop offset="18%" stopColor="rgba(255,255,255,0.02)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>

      {/* Tailored trousers fabric gradient */}
      <linearGradient id="trousersGrad" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#222222" />
        <stop offset="50%" stopColor="#171717" />
        <stop offset="100%" stopColor="#0f0f0f" />
      </linearGradient>

      {/* Sneaker rubber sole */}
      <linearGradient id="soleGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#333333" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
    </defs>

    {/* === HEAD & SCULPT === */}
    <ellipse cx="160" cy="46" rx="27" ry="36" fill="url(#bodySkin)" />
    {/* Jawline & Chin structure */}
    <path d="M136,54 Q142,76 160,80 Q178,76 184,54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
    {/* Head rim highlight */}
    <ellipse cx="160" cy="46" rx="27" ry="36" fill="url(#studioRim)" opacity="0.6"/>

    {/* === NECK & TRAPS === */}
    <path d="M146,78 L146,104 L174,104 L174,78 Z" fill="url(#bodySkin)"/>
    <path d="M146,104 Q130,105 102,116 Q80,126 72,136 L72,175 Q68,225 74,275 Q78,310 84,342 L92,356 Q116,368 160,372 Q204,368 228,356 L236,342 Q242,310 246,275 Q252,225 248,175 L248,136 Q240,126 218,116 Q190,105 174,104 Z"
      fill="url(#torsoVolume)"
      stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"
    />
    <path d="M146,104 Q130,105 102,116 Q80,126 72,136 L72,175 Q68,225 74,275 Q78,310 84,342 L92,356 Q116,368 160,372 Q204,368 228,356 L236,342 Q242,310 246,275 Q252,225 248,175 L248,136 Q240,126 218,116 Q190,105 174,104 Z"
      fill="url(#studioRim)" opacity="0.35"
    />

    {/* Subtle chest & abs contour lines */}
    <line x1="160" y1="120" x2="160" y2="310" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
    <path d="M120,152 Q140,162 158,155" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
    <path d="M200,152 Q180,162 162,155" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>

    {/* === ARMS (LEFT & RIGHT) === */}
    {/* Left Arm (Upper + Forearm + Hand) */}
    <path d="M72,136 Q56,146 48,180 Q42,216 44,258 L46,262 Q60,262 64,258 Q66,220 68,184 Q72,152 86,138 Z" fill="url(#bodySkin)"/>
    <path d="M44,258 Q40,300 39,342 Q38,374 41,400 L50,402 Q57,402 61,400 Q62,374 63,342 Q65,300 64,258 Z" fill="url(#bodySkin)"/>
    <path d="M41,400 Q36,416 38,430 Q41,438 48,440 Q54,438 58,430 Q61,416 61,400 Z" fill="url(#bodySkin)"/>
    {/* Left arm rim light */}
    <path d="M72,136 Q56,146 48,180 Q42,216 44,258 L41,400" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

    {/* Right Arm (Upper + Forearm + Hand) */}
    <path d="M248,136 Q264,146 272,180 Q278,216 276,258 L274,262 Q260,262 256,258 Q254,220 252,184 Q248,152 234,138 Z" fill="url(#bodySkin)"/>
    <path d="M276,258 Q280,300 281,342 Q282,374 279,400 L270,402 Q263,402 259,400 Q258,374 257,342 Q255,300 256,258 Z" fill="url(#bodySkin)"/>
    <path d="M279,400 Q284,416 282,430 Q279,438 272,440 Q266,438 262,430 Q259,416 259,400 Z" fill="url(#bodySkin)"/>

    {/* === TAILORED RELAXED TROUSERS (WAIST TO ANKLE) === */}
    {/* Waistband */}
    <path d="M88,348 Q124,360 160,362 Q196,360 232,348 L235,372 Q196,384 160,386 Q124,384 85,372 Z" fill="#242424" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
    
    {/* Left Trouser Leg (Wide, architectural drape) */}
    <path d="M85,372
             Q88,416 91,470 Q94,530 96,585 Q98,630 100,672
             L148,674
             Q147,630 148,585 Q150,530 152,470 Q155,416 156,386
             Z"
      fill="url(#trousersGrad)"
      stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"
    />
    {/* Left Trouser Center Crease */}
    <line x1="122" y1="384" x2="124" y2="672" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>

    {/* Right Trouser Leg (Wide, architectural drape) */}
    <path d="M235,372
             Q232,416 229,470 Q226,530 224,585 Q222,630 220,672
             L172,674
             Q173,630 172,585 Q170,530 168,470 Q165,416 164,386
             Z"
      fill="url(#trousersGrad)"
      stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"
    />
    {/* Right Trouser Center Crease */}
    <line x1="198" y1="384" x2="196" y2="672" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>

    {/* === MINIMALIST RUNWAY SNEAKERS === */}
    {/* Left Sneaker */}
    <path d="M96,672 Q90,678 86,684 Q84,692 90,696 L152,698 Q156,694 154,686 Q151,678 148,674 Z" fill="#181818" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
    {/* Left Sneaker White Accent Sole */}
    <rect x="88" y="694" width="65" height="5" rx="2" fill="url(#soleGrad)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>

    {/* Right Sneaker */}
    <path d="M224,672 Q230,678 234,684 Q236,692 230,696 L168,698 Q164,694 166,686 Q169,678 172,674 Z" fill="#181818" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
    {/* Right Sneaker White Accent Sole */}
    <rect x="167" y="694" width="65" height="5" rx="2" fill="url(#soleGrad)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>

    {/* Subtle atelier insignia on chest */}
    <text x="160" y="325" textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize="7" fontFamily="monospace" letterSpacing="3">
      GAZU FORM 01
    </text>
  </svg>
);

/* ── Floor Studio Reflection ────────────────────────────────────────── */
const StudioFloorReflection = () => (
  <div
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] sm:w-[260px] h-[140px] pointer-events-none"
    style={{
      transform: 'translateX(-50%) scaleY(-1)',
      maskImage: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 65%)',
      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 65%)',
      opacity: 0.2,
      filter: 'blur(3px)',
    }}
  >
    <RealisticMannequinBody />
  </div>
);

/* ── Main Component ─────────────────────────────────────────────────── */
export default function AtelierDummySection({ onAddToCart }) {
  const containerRef = useRef(null);
  const mannequinAreaRef = useRef(null);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [isFullyDressed, setIsFullyDressed] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  /* ── Dedicated Pinned Scroll Track (260vh) ────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    mass: 1.15,
    restDelta: 0.0005
  });

  /* ── Interactive Mouse Parallax ───────────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    if (!mannequinAreaRef.current) return;
    const rect = mannequinAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x: x * 7, y: -y * 4 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  /* ── 1. T-Shirt Scroll Transforms: Worn from 0.00 to 0.32 ─────────── */
  const tshirtY       = useTransform(smoothProgress, [0.00, 0.22], [-45, 0]);
  const tshirtScale   = useTransform(smoothProgress, [0.00, 0.22], [1.08, 1.0]);
  const tshirtOpacity = useTransform(smoothProgress, [0.00, 0.14], [0, 1]);

  /* ── 2. Workwear Shirt Scroll Transforms: Layers over from 0.26 to 0.55 */
  const shirtY       = useTransform(smoothProgress, [0.26, 0.48], [-40, 0]);
  const shirtScale   = useTransform(smoothProgress, [0.26, 0.48], [1.08, 1.0]);
  const shirtOpacity = useTransform(smoothProgress, [0.26, 0.38], [0, 1]);

  /* ── 3. Chunky Knit Sweater Scroll Transforms: Layers over from 0.52 to 0.78 */
  const sweaterY       = useTransform(smoothProgress, [0.52, 0.74], [-40, 0]);
  const sweaterScale   = useTransform(smoothProgress, [0.52, 0.74], [1.08, 1.0]);
  const sweaterOpacity = useTransform(smoothProgress, [0.52, 0.64], [0, 1]);

  /* ── Stage Update Listener ────────────────────────────────────────── */
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (latest < 0.28) {
        setActiveStageIdx(0);
        setIsFullyDressed(false);
      } else if (latest < 0.54) {
        setActiveStageIdx(1);
        setIsFullyDressed(false);
      } else if (latest < 0.78) {
        setActiveStageIdx(2);
        setIsFullyDressed(false);
      } else {
        setActiveStageIdx(3);
        setIsFullyDressed(latest >= 0.92);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const currentGarment = GARMENT_STAGES[activeStageIdx];

  return (
    <div
      id="atelier-mannequin"
      ref={containerRef}
      className="relative h-[260vh] bg-[#0A0A0A] text-white select-none"
    >
      {/* ── Sticky Viewport Frame ────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

        {/* Ambient Top Spotlight Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 65% 50% at 65% 10%, rgba(255,255,255,0.05) 0%, transparent 75%)',
          }}
        />

        {/* Studio Background "ATELIER" Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.025] overflow-hidden">
          <span className="font-display font-black text-[24vw] uppercase leading-none tracking-tight">
            ATELIER
          </span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center w-full px-6 md:px-12">

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* LEFT COLUMN: Brand Story + What It Has + Drop Status + HUD   */}
          {/* ═════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 z-20 flex flex-col justify-center space-y-4 py-2">

            {/* Header Badge */}
            <div className="flex items-center space-x-2 text-[10px] md:text-[11px] font-bold tracking-[0.24em] text-[#A0A0A0] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>THE GAZU ATELIER • BRAND PHILOSOPHY</span>
            </div>

            {/* Title */}
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-[2.6rem] tracking-[-0.03em] uppercase leading-[1.08] text-white">
              CRAFTED FOR MOTION.<br />
              <span className="text-[#888888]">ENDURING BY DESIGN.</span>
            </h2>

            {/* Brand Story */}
            <p className="text-xs sm:text-sm text-[#CCCCCC] font-normal leading-relaxed max-w-lg">
              GAZU is built upon the synthesis of brutalist architectural silhouettes and organic human movement. Pattern-drafted between our Tokyo and New Delhi design labs, each garment redefines streetwear through high-density textiles and uncompromised drape.
            </p>

            {/* Brand Core Pillars */}
            <div className="grid grid-cols-2 gap-3 pt-0.5">
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white flex items-center space-x-1.5 mb-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WHAT WE HAVE</span>
                </div>
                <p className="text-[11px] text-[#999999] leading-snug">
                  280–340 GSM French terry, duck canvas overshirts, merino ribbed knitwear, and custom YKK silver hardware.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white flex items-center space-x-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>WHAT IS UPCOMING</span>
                </div>
                <p className="text-[11px] text-[#999999] leading-snug">
                  Neo-Metropolis storm shells (Q3 '25), Zero-Dye hemp denim (Q4 '25), and structural featherweight down (Q1 '26).
                </p>
              </div>
            </div>

            {/* Confirmed Upcoming Drops */}
            <div className="space-y-1.5 pt-0.5">
              <div className="text-[10px] font-bold tracking-[0.2em] text-[#888888] uppercase">
                CONFIRMED UPCOMING DROPS
              </div>
              <div className="grid grid-cols-3 gap-2">
                {UPCOMING_DROPS.map((drop) => (
                  <div
                    key={drop.code}
                    className="p-2.5 rounded bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors"
                  >
                    <div className="flex justify-between items-center text-[9px] font-mono text-[#777777] mb-0.5">
                      <span>{drop.code}</span>
                      <span>{drop.season}</span>
                    </div>
                    <div className="text-[11px] font-bold text-white truncate">{drop.title}</div>
                    <div className="text-[9px] text-[#34D399] font-medium mt-1 truncate">{drop.status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Active Garment Telemetry HUD (Clean, Luxury, Unobtrusive) ── */}
            <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#34D399] font-bold">
                    DUMMY CURRENTLY WEARING
                  </span>
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase ${
                  isFullyDressed ? 'text-amber-400' : 'text-gray-400'
                }`}>
                  {isFullyDressed ? "ALL 4 WORN • UNLOCKED ↓" : `LAYER 0${activeStageIdx + 1}/04 (SCROLL TO DRESS)`}
                </span>
              </div>

              {/* Garment Details & 1-Click Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-white/10">
                <div>
                  <div className="text-sm font-bold text-white">{currentGarment.name}</div>
                  <div className="text-[11px] text-[#A0A0A0] mt-0.5">{currentGarment.fabric}</div>
                  <div className="text-xs font-mono font-extrabold text-white mt-1">
                    ₹{currentGarment.price.toLocaleString('en-IN')}
                    {currentGarment.stage === 4 && <span className="text-[9px] text-amber-400 ml-1.5">Full 3-Piece Look</span>}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onAddToCart) {
                      onAddToCart({
                        id: currentGarment.id,
                        name: currentGarment.name,
                        price: currentGarment.price,
                        image: currentGarment.image,
                        selectedSize: 'L',
                        sizes: ['M', 'L', 'XL']
                      }, 'L');
                    }
                  }}
                  className={`
                    px-4 py-2 rounded-lg text-[10px] font-bold tracking-wider uppercase cursor-pointer flex items-center justify-center space-x-1.5 transition-all active:scale-95 whitespace-nowrap
                    ${isFullyDressed
                      ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                      : 'bg-white text-black hover:bg-gray-200'
                    }
                  `}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isFullyDressed ? "BAG COMPLETE LOOK" : "BAG THIS PIECE"}</span>
                </button>
              </div>

              {/* Progress 4-Segment Bar */}
              <div className="grid grid-cols-4 gap-1.5 mt-3">
                {GARMENT_STAGES.map((s, idx) => (
                  <div
                    key={s.key}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeStageIdx >= idx
                        ? isFullyDressed ? 'bg-amber-400' : 'bg-white'
                        : 'bg-white/15'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* RIGHT COLUMN: The Guy Dummy Physically Wearing Real Clothes  */}
          {/* ═════════════════════════════════════════════════════════════ */}
          <div
            ref={mannequinAreaRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative h-[560px] sm:h-[620px] md:h-[670px] flex items-center justify-center [perspective:1400px]"
          >
            {/* Ambient Spotlight Behind Dummy Body */}
            <motion.div
              className="absolute w-72 h-72 rounded-full pointer-events-none filter blur-[90px]"
              animate={{ backgroundColor: currentGarment.glowColor }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ top: '22%', left: '50%', transform: 'translateX(-50%)' }}
            />

            {/* Floor Contact Shadow */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[190px] h-[14px] rounded-full z-[2] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.85) 0%, transparent 75%)',
              }}
            />

            {/* Studio Floor Mirrored Reflection */}
            <StudioFloorReflection />

            {/* ── Mannequin & Real Clothes Assembly Container ────────── */}
            <motion.div
              style={{
                rotateY: mouseOffset.x,
                rotateX: mouseOffset.y,
              }}
              className="relative w-[260px] sm:w-[290px] md:w-[320px] h-[520px] sm:h-[580px] md:h-[640px] flex items-center justify-center [transform-style:preserve-3d] transition-transform duration-100 ease-out"
            >
              {/* 1. Base Realistic Guy Mannequin (Head, Traps, Chest, Tailored Trousers, Sneakers) */}
              <div className="absolute inset-0 z-[5] pointer-events-none">
                <RealisticMannequinBody />
              </div>

              {/* 2. REAL T-SHIRT (Worn directly over chest & shoulders) */}
              <motion.div
                style={{
                  y: tshirtY,
                  scale: tshirtScale,
                  opacity: tshirtOpacity,
                  zIndex: 15,
                }}
                className="absolute top-[13.5%] left-1/2 -translate-x-1/2 w-[88%] h-[38%] pointer-events-none flex items-center justify-center [transform-style:preserve-3d]"
              >
                <img
                  src="/assets/gazu_tshirt.png"
                  alt="Real Gazu Heavyweight Washed Tee"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
                />
              </motion.div>

              {/* 3. REAL WORKWEAR SHIRT (Layers directly over the T-shirt on scroll) */}
              <motion.div
                style={{
                  y: shirtY,
                  scale: shirtScale,
                  opacity: shirtOpacity,
                  zIndex: 20,
                }}
                className="absolute top-[13.5%] left-1/2 -translate-x-1/2 w-[90%] h-[40%] pointer-events-none flex items-center justify-center [transform-style:preserve-3d]"
              >
                <img
                  src="/assets/gazu_shirt.png"
                  alt="Real Gazu Workwear Overshirt"
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.75)]"
                />
              </motion.div>

              {/* 4. REAL CHUNKY SWEATER (Layers directly over the shirt on scroll) */}
              <motion.div
                style={{
                  y: sweaterY,
                  scale: sweaterScale,
                  opacity: sweaterOpacity,
                  zIndex: 25,
                }}
                className="absolute top-[13.5%] left-1/2 -translate-x-1/2 w-[92%] h-[41%] pointer-events-none flex items-center justify-center [transform-style:preserve-3d]"
              >
                <img
                  src="/assets/gazu_sweater.png"
                  alt="Real Gazu Textured Chunky Knit Sweater"
                  className="w-full h-full object-contain filter drop-shadow-[0_18px_35px_rgba(0,0,0,0.85)]"
                />
              </motion.div>

              {/* Floating Minimalist Studio Pill Tag beside the dummy */}
              <div className="absolute -right-4 md:-right-8 top-[28%] z-30 pointer-events-none hidden sm:flex flex-col items-start bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 shadow-xl">
                <span className="text-[8px] font-mono tracking-widest text-[#888888] uppercase">
                  ACTIVE LAYER
                </span>
                <span className="text-[10px] font-bold text-white uppercase mt-0.5">
                  {currentGarment.tag}
                </span>
                <span className="text-[9px] text-[#34D399] font-mono mt-0.5">
                  {currentGarment.fabric.split(' ')[0]} {currentGarment.fabric.split(' ')[1]}
                </span>
              </div>
            </motion.div>

            {/* Scroll Instruction / Gate Release Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 z-50 pointer-events-none">
              {!isFullyDressed ? (
                <motion.div
                  className="flex flex-col items-center space-y-1"
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-[9px] font-mono tracking-[0.16em] text-white/50 uppercase">
                    Scroll down to wear clothes ({activeStageIdx + 1}/4)
                  </span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-white/40">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              ) : (
                <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ALL CLOTHES WEARED • SCROLL UNLOCKED ↓</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
