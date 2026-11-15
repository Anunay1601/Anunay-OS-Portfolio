"use client";

import React, { useRef, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const AbstractNeuralCore = memo(function AbstractNeuralCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Hardware-accelerated MotionValues: zero React re-renders on mousemove
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20 };
  const rotateX = useSpring(rawMouseY, springConfig);
  const rotateY = useSpring(rawMouseX, springConfig);

  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    }
  };

  // Subtle interactive pointer reaction (max +/- 8 degrees tilt)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    if (!rectRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    }
    const rect = rectRef.current;
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawMouseX.set(x * 14);
    rawMouseY.set(y * -14);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[390px] xl:max-w-[420px] aspect-square mx-auto flex items-center justify-center select-none"
      style={{ perspective: 1000 }}
      aria-label="Abstract Neural Core - Signature engineering mark of ANUNAY OS"
      role="img"
    >
      {/* Ambient Radial Accent Glow behind the Core */}
      <div className="absolute inset-0 bg-accent-blue/[0.07] rounded-full blur-3xl pointer-events-none transform-gpu" />

      {/* 3D Tilting Canvas Container - Driven directly by MotionValues without re-renders */}
      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
        }}
        className="relative w-full h-full flex items-center justify-center transform-gpu"
      >
        {/* SVG Orbital Geometry & Constellation Grid */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Core Radial Glow */}
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#4F8CFF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
            </radialGradient>

            {/* Orbit Gradient Line */}
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
            </linearGradient>

            {/* Constellation Line Gradient */}
            <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Background Core Aura */}
          <circle cx="250" cy="250" r="160" fill="url(#coreGlow)" />

          {/* Layer 1: Outer Celestial Orbit Ring */}
          <g
            className={prefersReducedMotion ? "" : "animate-[spin_60s_linear_infinite]"}
            style={{ transformOrigin: "250px 250px" }}
          >
            <circle
              cx="250"
              cy="250"
              r="215"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            {/* Outer Coordinate Accent Ticks */}
            <line x1="250" y1="30" x2="250" y2="38" stroke="rgba(79, 140, 255, 0.4)" strokeWidth="1.5" />
            <line x1="250" y1="462" x2="250" y2="470" stroke="rgba(79, 140, 255, 0.4)" strokeWidth="1.5" />
            <line x1="30" y1="250" x2="38" y2="250" stroke="rgba(79, 140, 255, 0.4)" strokeWidth="1.5" />
            <line x1="462" y1="250" x2="470" y2="250" stroke="rgba(79, 140, 255, 0.4)" strokeWidth="1.5" />

            {/* Outer Satellites */}
            <circle cx="250" cy="35" r="3" fill="#4F8CFF" />
            <circle cx="436" cy="357" r="2.5" fill="#A1A1AA" />
          </g>

          {/* Layer 2: Mid Inclined Elliptical Orbit */}
          <g
            className={prefersReducedMotion ? "" : "animate-[spin_40s_linear_infinite_reverse]"}
            style={{ transformOrigin: "250px 250px" }}
          >
            <ellipse
              cx="250"
              cy="250"
              rx="180"
              ry="110"
              transform="rotate(-25 250 250)"
              stroke="url(#orbitGrad)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            {/* Mid Node A */}
            <circle cx="390" cy="180" r="4" fill="#4F8CFF" />
            <circle cx="390" cy="180" r="8" stroke="rgba(79, 140, 255, 0.3)" strokeWidth="1" />

            {/* Mid Node B */}
            <circle cx="110" cy="320" r="3.5" fill="#8B5CF6" />
            <circle cx="110" cy="320" r="7" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" />
          </g>

          {/* Layer 3: Inner Constellation Network */}
          <g
            className={prefersReducedMotion ? "" : "animate-[spin_28s_linear_infinite]"}
            style={{ transformOrigin: "250px 250px" }}
          >
            <circle
              cx="250"
              cy="250"
              r="135"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />

            {/* Cross Constellation Vector Links */}
            <line x1="160" y1="170" x2="340" y2="170" stroke="url(#linkGrad)" strokeWidth="1" />
            <line x1="340" y1="170" x2="320" y2="330" stroke="url(#linkGrad)" strokeWidth="1" />
            <line x1="320" y1="330" x2="160" y2="310" stroke="url(#linkGrad)" strokeWidth="1" />
            <line x1="160" y1="310" x2="160" y2="170" stroke="url(#linkGrad)" strokeWidth="1" />

            {/* Connected Pillar Nodes */}
            <g>
              <circle cx="160" cy="170" r="3" fill="#F5F5F7" />
              <circle cx="340" cy="170" r="3" fill="#4F8CFF" />
              <circle cx="320" cy="330" r="3" fill="#8B5CF6" />
              <circle cx="160" cy="310" r="3" fill="#10B981" />
            </g>
          </g>

          {/* Central Ring Accents */}
          <circle
            cx="250"
            cy="250"
            r="82"
            stroke="rgba(79, 140, 255, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <circle
            cx="250"
            cy="250"
            r="68"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
          />
        </svg>

        {/* Center Medallion: Signature "AO" Monogram Core */}
        <div className="absolute w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full p-[2px] bg-gradient-to-b from-white/20 via-accent-blue/30 to-white/5 shadow-[0_0_40px_rgba(79,140,255,0.25)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#0B0C0F] border border-white/10 flex items-center justify-center overflow-hidden relative group">
            {/* Inner Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/15 via-transparent to-accent-violet/10 pointer-events-none" />

            {/* Official ANUNAY OS Monogram Logo */}
            <img
              src="/anunay-os-logo-v2.png"
              alt="ANUNAY OS Monogram"
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

      </motion.div>
    </div>
  );
});
