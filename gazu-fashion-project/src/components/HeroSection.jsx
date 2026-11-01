import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function HeroSection({ onShopNow, onExploreNew }) {
  const containerRef = useRef(null);

  // Natural scroll of the hero section - zero empty void
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001
  });

  // 1. Obvious horizontal stride across the word "GAZU"
  const modelX = useTransform(smoothProgress, [0, 1], ['-15%', '35%']);

  // 2. High-impact walking steps (bobbing up and down realistically like real foot plants)
  const modelY = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, -28, 4, -30, 6, 16]
  );

  // 3. Forward 3D scale: comes right at the viewer
  const modelScale = useTransform(smoothProgress, [0, 1], [1.0, 1.28]);

  // 4. Dynamic 3D swagger & perspective yaw
  const modelRotateY = useTransform(smoothProgress, [0, 1], [0, 18]);
  const modelRotateZ = useTransform(smoothProgress, [0, 0.5, 1], [0, 2.5, -1]);

  // 5. Dynamic ground contact shadow
  const shadowScaleX = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1, 0.75, 1.2, 0.75, 1.25, 1.3]);
  const shadowOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.5, 0.25, 0.6, 0.25, 0.62, 0.45]);

  // 6. Text depth parallax behind the model
  const textParallaxY = useTransform(smoothProgress, [0, 1], ['0%', '-12%']);
  const textOpacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.9, 0.3]);

  // Interactive mouse tilt for instant 3D holographic responsiveness
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 25 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] md:min-h-screen w-full bg-[#ECECE9] flex flex-col justify-between overflow-hidden select-none [perspective:1400px]"
    >
      {/* Top Tagline & Telemetry */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 pt-6 md:pt-10 z-30 flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] md:text-[11px] font-semibold tracking-[0.24em] text-[#222222] uppercase leading-relaxed max-w-[170px]"
        >
          FASHION<br />
          THAT MOVES<br />
          WITH YOU.
        </motion.div>

        <div className="hidden sm:flex items-center space-x-2 text-[10px] tracking-[0.2em] font-semibold text-[#666666] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
          <span>AUTUMN / WINTER 2024–25</span>
        </div>
      </div>

      {/* Center 3D Stage with letters and walking model */}
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative flex-1 flex items-center justify-center w-full px-4 overflow-hidden my-auto [transform-style:preserve-3d]"
      >
        {/* Giant GAZU Background Typography */}
        <motion.div
          style={{ y: textParallaxY, opacity: textOpacity }}
          className="w-full flex justify-center items-center pointer-events-none select-none z-10 [transform:translateZ(-60px)]"
        >
          <h1 className="font-display font-black text-[21vw] leading-none tracking-[-0.04em] text-[#111111] uppercase select-none text-center whitespace-nowrap">
            GAZU
          </h1>
        </motion.div>

        {/* Dynamic Walking Model in True 3D */}
        <motion.div
          style={{
            x: modelX,
            y: modelY,
            scale: modelScale,
            rotateY: modelRotateY,
            rotateZ: modelRotateZ,
          }}
          className="absolute z-20 flex flex-col items-center justify-center pointer-events-none [transform-style:preserve-3d]"
        >
          {/* Cutout Walking Model */}
          <div className="relative max-w-[320px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] transition-all">
            <img
              src="/assets/hero_walker_cutout.png"
              alt="GAZU Hero Trench Walking Model"
              onError={(e) => {
                e.currentTarget.src = "/assets/ref_hero_walker.jpg";
              }}
              className="w-full h-auto object-contain select-none filter contrast-[1.04]"
            />

            {/* Dynamic 3D Ground Contact Shadow */}
            <motion.div
              style={{
                scaleX: shadowScaleX,
                opacity: shadowOpacity,
              }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-black/60 rounded-[100%] filter blur-lg pointer-events-none"
            />
          </div>

          {/* Micro 3D Spatial Tag */}
          <div className="absolute -top-3 right-0 bg-[#111111] text-white text-[9px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded shadow-xl border border-white/20 whitespace-nowrap hidden sm:block">
            Volume Trench • AW25
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar: Action buttons & Release year */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 pb-8 md:pb-10 z-30 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div className="flex items-center space-x-5">
          <button
            onClick={onShopNow}
            className="group relative overflow-hidden bg-[#111111] text-[#FFFFFF] text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase px-7 py-3.5 rounded-sm hover:bg-black transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>SHOP NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>

          <button
            onClick={onExploreNew}
            className="group relative text-[11px] md:text-[12px] font-semibold tracking-[0.16em] text-[#111111] uppercase py-3 cursor-pointer"
          >
            <span>EXPLORE NEW IN</span>
            <span className="block max-w-full h-[1.5px] bg-[#111111] transition-all duration-300 group-hover:w-0" />
          </button>
        </div>

        <div className="text-right">
          <div className="text-[10px] md:text-[11px] font-semibold tracking-[0.24em] text-[#555555] uppercase">
            NEW<br />
            COLLECTION<br />
            <span className="text-[#111111] font-bold">2024 / 2025</span>
          </div>
        </div>
      </div>
    </section>
  );
}
