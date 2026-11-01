import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Sparkles, Plus, ArrowDown } from 'lucide-react';

const LOOKS = [
  {
    id: "look-01",
    lookNumber: "01",
    title: "Minimalist Workwear Overshirt",
    tagline: "Heavy cotton canvas with dual industrial chest pockets and silver hardware.",
    price: 4499,
    image: "/assets/look_1.jpg",
    fallback: "/assets/ref_vibes_model.jpg",
    color: "Midnight Black"
  },
  {
    id: "look-02",
    lookNumber: "02",
    title: "Volume Trench Coat Campaign",
    tagline: "Water-repellent structured gabardine with raglan sleeve and horn buttons.",
    price: 6499,
    image: "/assets/look_2.jpg",
    fallback: "/assets/ref_hero_walker.jpg",
    color: "Storm Clay"
  },
  {
    id: "look-03",
    lookNumber: "03",
    title: "Heavyweight Washed Charcoal Tee",
    tagline: "280 GSM French terry cotton with architectural drop-shoulder cut.",
    price: 1499,
    image: "/assets/look_3.jpg",
    fallback: "/assets/ref_men.jpg",
    color: "Washed Charcoal"
  },
  {
    id: "look-04",
    lookNumber: "04",
    title: "Raw Hem Oversized Ivory Tee",
    tagline: "Unbleached organic cotton with micro-waffle texture and raw sleeve cuffs.",
    price: 1599,
    image: "/assets/look_4.jpg",
    fallback: "/assets/ref_women.jpg",
    color: "Ivory Bone"
  }
];

export default function NewVibesSection({ onExplore, onQuickViewHeroItem, onAddToCart }) {
  const containerRef = useRef(null);
  const [activeLookIdx, setActiveLookIdx] = useState(0);

  // Dedicated pinned runway: viewport stays fixed while the 4 cards change via scroll
  // Only after the 4th photo has fully settled does the page release to the next section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 1.1,
    restDelta: 0.0005
  });

  // Card 0 (Look 01)
  const c0Y = useTransform(smoothProgress, [0.0, 0.2, 0.32], [0, 0, -100]);
  const c0Scale = useTransform(smoothProgress, [0.0, 0.2, 0.32], [1, 1, 0.88]);
  const c0Opacity = useTransform(smoothProgress, [0.0, 0.2, 0.3], [1, 1, 0]);

  // Card 1 (Look 02)
  const c1Y = useTransform(smoothProgress, [0.18, 0.32, 0.48, 0.58], [120, 0, 0, -100]);
  const c1Scale = useTransform(smoothProgress, [0.18, 0.32, 0.48, 0.58], [0.88, 1, 1, 0.88]);
  const c1Opacity = useTransform(smoothProgress, [0.18, 0.26, 0.48, 0.56], [0, 1, 1, 0]);

  // Card 2 (Look 03)
  const c2Y = useTransform(smoothProgress, [0.44, 0.58, 0.72, 0.82], [120, 0, 0, -100]);
  const c2Scale = useTransform(smoothProgress, [0.44, 0.58, 0.72, 0.82], [0.88, 1, 1, 0.88]);
  const c2Opacity = useTransform(smoothProgress, [0.44, 0.52, 0.72, 0.8], [0, 1, 1, 0]);

  // Card 3 (Look 04 - the LAST photo)
  const c3Y = useTransform(smoothProgress, [0.68, 0.82, 1.0], [120, 0, 0]);
  const c3Scale = useTransform(smoothProgress, [0.68, 0.82, 1.0], [0.88, 1, 1]);
  const c3Opacity = useTransform(smoothProgress, [0.68, 0.76, 1.0], [0, 1, 1]);

  const cardsMotion = [
    { y: c0Y, scale: c0Scale, opacity: c0Opacity, zIndex: 10 },
    { y: c1Y, scale: c1Scale, opacity: c1Opacity, zIndex: 20 },
    { y: c2Y, scale: c2Scale, opacity: c2Opacity, zIndex: 30 },
    { y: c3Y, scale: c3Scale, opacity: c3Opacity, zIndex: 40 }
  ];

  // Sync active look text with the currently active photo card
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (latest < 0.26) setActiveLookIdx(0);
      else if (latest < 0.52) setActiveLookIdx(1);
      else if (latest < 0.78) setActiveLookIdx(2);
      else setActiveLookIdx(3);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const currentLook = LOOKS[activeLookIdx];
  const isLastLook = activeLookIdx === 3;

  return (
    // 260vh scroll runway: locks viewport so the user watches all 4 photos change one after another
    <div
      id="new-vibes"
      ref={containerRef}
      className="relative h-[260vh] bg-[#DDDDDA] select-none"
    >
      {/* Sticky viewport pinned to the top of screen */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden px-6 md:px-12 border-b border-[#CCCCCC]">
        {/* Background ambient watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.035] overflow-hidden">
          <span className="font-display font-black text-[28vw] uppercase leading-none tracking-tight">
            VIBES
          </span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center w-full">
          {/* Left Column: Narrative & Live Look Inspector */}
          <div className="lg:col-span-5 z-20 flex flex-col items-start justify-center">
            {/* Section subtitle */}
            <div className="flex items-center space-x-2 text-[11px] md:text-[12px] font-semibold tracking-[0.24em] text-[#444444] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>NEW SEASON • SCROLL TO REVEAL</span>
            </div>

            {/* Giant Headline */}
            <h2 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.04em] text-[#111111] uppercase leading-[0.92] mb-5">
              NEW<br />
              VIBES
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-[#333333] font-normal leading-relaxed max-w-sm mb-6">
              Scroll down to cycle through the 4 campaign looks. The page only advances to the next section after you reach the final look.
            </p>

            {/* Dynamic Active Look Card with smooth cross-fade */}
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl p-6 border border-black/10 shadow-xl mb-6 transition-all duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-black/10">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#777777] uppercase">
                  ACTIVE LOOK {currentLook.lookNumber} / 04
                </span>
                <span className="text-xs font-bold text-black uppercase">
                  {currentLook.color}
                </span>
              </div>

              <div className="pt-3">
                <h4 className="font-display text-lg font-bold text-black mb-1">
                  {currentLook.title}
                </h4>
                <p className="text-xs text-gray-600 mb-4">{currentLook.tagline}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-black">
                    ₹{currentLook.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => {
                      if (onAddToCart) {
                        onAddToCart({
                          id: currentLook.id,
                          name: currentLook.title,
                          price: currentLook.price,
                          image: currentLook.image,
                          selectedSize: 'M',
                          sizes: ['S', 'M', 'L', 'XL']
                        }, 'M');
                      }
                    }}
                    className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded text-[11px] font-bold tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer shadow-md active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>QUICK ADD</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Step Progress Bar - Shows exact look 1, 2, 3, 4 */}
            <div className="w-full max-w-md bg-black/[0.04] p-3.5 rounded-lg border border-black/5 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
                  {isLastLook ? "FINAL LOOK 04 REACHED" : `SCROLLING LOOK 0${activeLookIdx + 1} OF 04`}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 ${
                  isLastLook ? 'text-emerald-700' : 'text-black'
                }`}>
                  {isLastLook ? (
                    <>
                      <span>READY FOR NEXT PAGE</span>
                      <ArrowDown className="w-3 h-3 animate-bounce" />
                    </>
                  ) : (
                    <span>SCROLL TO ADVANCE</span>
                  )}
                </span>
              </div>

              {/* 4 segmented pill bars */}
              <div className="grid grid-cols-4 gap-2">
                {LOOKS.map((look, i) => (
                  <div
                    key={look.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeLookIdx >= i ? 'bg-black' : 'bg-black/15'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Explore button */}
            <button
              onClick={onExplore}
              className="group bg-[#111111] text-white hover:bg-black text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase px-8 py-3.5 rounded-sm transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center space-x-3 cursor-pointer"
            >
              <span>EXPLORE ALL COLLECTIONS</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Right Column: Photo Cards that CHANGE WHILE SCROLLING */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[540px] md:h-[600px] flex items-center justify-center [perspective:1400px]">
            {LOOKS.map((look, i) => {
              const motionProps = cardsMotion[i];

              return (
                <motion.div
                  key={look.id}
                  style={{
                    y: motionProps.y,
                    scale: motionProps.scale,
                    opacity: motionProps.opacity,
                    zIndex: motionProps.zIndex
                  }}
                  className="absolute w-[290px] sm:w-[340px] md:w-[390px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 bg-[#C8C8C5] group transition-shadow duration-500 hover:shadow-[0_35px_70px_rgba(0,0,0,0.4)] [transform-style:preserve-3d]"
                >
                  {/* Photo with high-res presentation */}
                  <img
                    src={look.image}
                    alt={look.title}
                    onError={(e) => {
                      e.currentTarget.src = look.fallback;
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Top Stamp */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase shadow">
                    LOOK {look.lookNumber} / 04
                  </div>

                  {/* Bottom Meta */}
                  <div className="absolute bottom-5 inset-x-5 text-white">
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">
                      GAZU ARCHIVES • 2024–25
                    </div>
                    <div className="text-base font-bold truncate mt-0.5">{look.title}</div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-extrabold text-emerald-400">
                        ₹{look.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] tracking-widest uppercase text-gray-300">
                        {i === 3 ? "Final Look" : "Scroll For Next →"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
