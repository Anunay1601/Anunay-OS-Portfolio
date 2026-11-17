"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DigitalArchitectureWallpaperProps {
  hasActiveWindow: boolean;
  className?: string;
}

export const DigitalArchitectureWallpaper = memo(function DigitalArchitectureWallpaper({
  hasActiveWindow,
  className = "",
}: DigitalArchitectureWallpaperProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse parallax state: normalized target [-1, 1] and smoothed current coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const rafRef = useRef<number | null>(null);
  const isMovingRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateLoop = () => {
      const mouse = mouseRef.current;
      const dx = mouse.targetX - mouse.currentX;
      const dy = mouse.targetY - mouse.currentY;

      // Easing interpolation (low-pass smoothing)
      mouse.currentX += dx * 0.06;
      mouse.currentY += dy * 0.06;

      setCoords({
        x: Number(mouse.currentX.toFixed(4)),
        y: Number(mouse.currentY.toFixed(4)),
      });

      // Stop RAF loop when practically stationary to achieve 0% idle CPU usage
      if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
        rafRef.current = requestAnimationFrame(updateLoop);
      } else {
        isMovingRef.current = false;
        rafRef.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseRef.current.targetX = (e.clientX - w / 2) / (w / 2);
      mouseRef.current.targetY = (e.clientY - h / 2) / (h / 2);

      if (!isMovingRef.current) {
        isMovingRef.current = true;
        rafRef.current = requestAnimationFrame(updateLoop);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  // Differential parallax layers
  const farX = prefersReducedMotion ? 0 : coords.x * 3.5;
  const farY = prefersReducedMotion ? 0 : coords.y * 2.5;

  const midX = prefersReducedMotion ? 0 : coords.x * 8.5;
  const midY = prefersReducedMotion ? 0 : coords.y * 5.5;

  const foreX = prefersReducedMotion ? 0 : coords.x * 14;
  const foreY = prefersReducedMotion ? 0 : coords.y * 9;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none transition-all duration-700 ease-out ${
        hasActiveWindow
          ? "opacity-30 scale-[0.985] filter blur-[0.6px]"
          : "opacity-100 scale-100 filter-none"
      } ${className}`}
    >
      {/* 1. Deep Near-Black Architectural Atmosphere & Ambient Lighting */}
      <div className="absolute inset-0 bg-[#07090E]" />

      {/* Atmospheric directional gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,_rgba(79,140,255,0.06),_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_12%_45%,_rgba(79,140,255,0.05),_transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_88%_40%,_rgba(139,92,246,0.04),_transparent_65%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(4,6,10,0.92)_0%,_transparent_40%)]" />

      {/* 2. Topographic Elevation Contours & Perspective Base Grid (Far Layer) */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${farX}px, ${farY}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Topographic line gradient */}
            <linearGradient id="topoGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.08" />
              <stop offset="25%" stopColor="#4F8CFF" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.02" />
              <stop offset="75%" stopColor="#8B5CF6" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="topoGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.06" />
              <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.06" />
            </linearGradient>

            {/* Floor perspective line gradient */}
            <linearGradient id="floorRayGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.0" />
              <stop offset="35%" stopColor="#4F8CFF" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Perspective architectural ground lines receding toward horizon */}
          <g stroke="url(#floorRayGrad)" strokeWidth="0.8">
            <line x1="960" y1="620" x2="120" y2="1080" />
            <line x1="960" y1="620" x2="340" y2="1080" />
            <line x1="960" y1="620" x2="560" y2="1080" />
            <line x1="960" y1="620" x2="760" y2="1080" />
            <line x1="960" y1="620" x2="1160" y2="1080" />
            <line x1="960" y1="620" x2="1360" y2="1080" />
            <line x1="960" y1="620" x2="1580" y2="1080" />
            <line x1="960" y1="620" x2="1800" y2="1080" />
          </g>

          {/* Logarithmic horizontal ground datum lines */}
          <line x1="280" y1="740" x2="1640" y2="740" stroke="#4F8CFF" strokeOpacity="0.025" strokeWidth="0.8" />
          <line x1="200" y1="810" x2="1720" y2="810" stroke="#4F8CFF" strokeOpacity="0.03" strokeWidth="0.8" />
          <line x1="120" y1="890" x2="1800" y2="890" stroke="#4F8CFF" strokeOpacity="0.035" strokeWidth="0.8" />
          <line x1="60" y1="980" x2="1860" y2="980" stroke="#4F8CFF" strokeOpacity="0.04" strokeWidth="0.8" />

          {/* Architectural floor grid intersection crosshairs */}
          <g stroke="#4F8CFF" strokeOpacity="0.06" strokeWidth="0.8">
            <path d="M 560 886 v 8 M 556 890 h 8" />
            <path d="M 760 886 v 8 M 756 890 h 8" />
            <path d="M 1160 886 v 8 M 1156 890 h 8" />
            <path d="M 1360 886 v 8 M 1356 890 h 8" />
          </g>

          {/* Flowing topographic elevation contours across bottom and background */}
          {/* Contour 1 - Deep background */}
          <path
            d="M -40 780 C 260 740, 520 810, 840 760 C 1120 715, 1420 800, 1960 730"
            stroke="url(#topoGrad2)"
            strokeWidth="0.85"
            fill="none"
          />

          {/* Contour 2 */}
          <path
            d="M -40 825 C 220 785, 480 860, 820 810 C 1140 760, 1460 855, 1960 785"
            stroke="url(#topoGrad1)"
            strokeWidth="0.9"
            fill="none"
          />

          {/* Contour 3 */}
          <path
            d="M -40 870 C 180 830, 460 910, 860 855 C 1180 805, 1480 910, 1960 840"
            stroke="url(#topoGrad1)"
            strokeWidth="0.95"
            fill="none"
          />

          {/* Contour 4 */}
          <path
            d="M -40 915 C 240 875, 520 955, 920 900 C 1220 850, 1520 955, 1960 890"
            stroke="url(#topoGrad1)"
            strokeWidth="1"
            fill="none"
          />

          {/* Contour 5 */}
          <path
            d="M -40 960 C 280 920, 580 995, 980 945 C 1280 895, 1560 995, 1960 940"
            stroke="url(#topoGrad2)"
            strokeWidth="1.05"
            fill="none"
          />

          {/* Contour 6 - Foreground subtle floor flow */}
          <path
            d="M -40 1010 C 320 965, 640 1035, 1040 985 C 1340 935, 1620 1035, 1960 985"
            stroke="url(#topoGrad2)"
            strokeWidth="1.1"
            fill="none"
          />

          {/* Topographic elevation micro-typography markers */}
          <g fill="#4F8CFF" fillOpacity="0.18" fontFamily="monospace" fontSize="8" letterSpacing="1">
            <text x="70" y="821">EL. +140.0m</text>
            <text x="70" y="866">EL. +120.0m</text>
            <text x="70" y="911">EL. +100.0m</text>
            <text x="1800" y="781" textAnchor="end">SEC_B // +140</text>
            <text x="1800" y="836" textAnchor="end">SEC_B // +120</text>
            <text x="1800" y="886" textAnchor="end">SEC_B // +100</text>
          </g>
        </svg>
      </div>

      {/* 3. Midground Architectural Monoliths & Geometric Volumes (Mid Layer) */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${midX}px, ${midY}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Left Monolith Far Gradients */}
            <linearGradient id="leftMono1Lit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#141A29" />
              <stop offset="60%" stopColor="#0D111D" />
              <stop offset="100%" stopColor="#080A12" />
            </linearGradient>

            <linearGradient id="leftMono1Shadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B0E18" />
              <stop offset="100%" stopColor="#06080E" />
            </linearGradient>

            {/* Left Stepped Slabs Gradients */}
            <linearGradient id="leftSlabFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#111624" />
              <stop offset="50%" stopColor="#0E121E" />
              <stop offset="100%" stopColor="#070911" />
            </linearGradient>

            <linearGradient id="leftSlabTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C2438" />
              <stop offset="100%" stopColor="#111726" />
            </linearGradient>

            {/* Right Monolith Gradients */}
            <linearGradient id="rightMonoLit" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#171A2E" />
              <stop offset="60%" stopColor="#0E1220" />
              <stop offset="100%" stopColor="#070913" />
            </linearGradient>

            <linearGradient id="rightMonoShadow" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0C0E1B" />
              <stop offset="100%" stopColor="#06070E" />
            </linearGradient>

            {/* Right Cantilever Slabs */}
            <linearGradient id="rightCantileverTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1B1E34" />
              <stop offset="100%" stopColor="#101424" />
            </linearGradient>

            {/* Monolith edge highlight gradients */}
            <linearGradient id="blueEdgeLit" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="violetEdgeLit" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
            </linearGradient>

            {/* Monolith base drop shadow filter */}
            <filter id="monolithShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#000000" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* ======================================================== */}
          {/* LEFT FLANK ARCHITECTURAL CLUSTER (x: 40 to 360)          */}
          {/* ======================================================== */}
          <g filter="url(#monolithShadow)">
            {/* L1: Far Tall Vertical Monolith Pillar (Left margin) */}
            {/* Left face */}
            <polygon
              points="60,180 120,135 120,980 60,980"
              fill="url(#leftMono1Lit)"
            />
            {/* Right face */}
            <polygon
              points="120,135 175,175 175,980 120,980"
              fill="url(#leftMono1Shadow)"
            />
            {/* Beveled top facet */}
            <polygon
              points="60,180 120,135 175,175 115,220"
              fill="#182033"
              stroke="url(#blueEdgeLit)"
              strokeWidth="0.8"
            />
            {/* Crisp vertical ridge highlight */}
            <line x1="120" y1="135" x2="120" y2="980" stroke="url(#blueEdgeLit)" strokeWidth="1" />

            {/* L2: Midground Stepped Architectural Massing */}
            {/* Lower vertical base */}
            <polygon
              points="150,380 280,380 280,990 150,990"
              fill="url(#leftSlabFront)"
            />
            {/* Stepped upper setback */}
            <polygon
              points="175,270 255,270 255,380 175,380"
              fill="#121827"
              stroke="#4F8CFF"
              strokeOpacity="0.1"
              strokeWidth="0.8"
            />
            {/* Top illuminated facet of setback */}
            <polygon
              points="175,270 255,270 290,295 210,295"
              fill="url(#leftSlabTop)"
              stroke="url(#blueEdgeLit)"
              strokeWidth="0.8"
            />
            {/* Left structural side edge */}
            <line x1="150" y1="380" x2="150" y2="990" stroke="#4F8CFF" strokeOpacity="0.2" strokeWidth="0.8" />
            <line x1="280" y1="380" x2="280" y2="990" stroke="#4F8CFF" strokeOpacity="0.08" strokeWidth="0.8" />

            {/* Architectural datum hairline grooves */}
            <line x1="150" y1="520" x2="280" y2="520" stroke="#4F8CFF" strokeOpacity="0.12" strokeWidth="0.8" />
            <line x1="150" y1="680" x2="280" y2="680" stroke="#4F8CFF" strokeOpacity="0.08" strokeWidth="0.8" />
            <line x1="150" y1="840" x2="280" y2="840" stroke="#4F8CFF" strokeOpacity="0.06" strokeWidth="0.8" />

            {/* Subtle technical elevation annotation */}
            <text x="162" y="512" fill="#4F8CFF" fillOpacity="0.3" fontFamily="monospace" fontSize="8" letterSpacing="1.5">
              MOD_01 // SEC-L
            </text>
          </g>

          {/* ======================================================== */}
          {/* RIGHT FLANK ARCHITECTURAL CLUSTER (x: 1540 to 1860)      */}
          {/* ======================================================== */}
          <g filter="url(#monolithShadow)">
            {/* R1: Far Geometric Monolith Pylon (Right margin) */}
            {/* Left lit face */}
            <polygon
              points="1740,165 1800,120 1800,990 1740,990"
              fill="url(#rightMonoLit)"
            />
            {/* Right shadow face */}
            <polygon
              points="1800,120 1860,165 1860,990 1800,990"
              fill="url(#rightMonoShadow)"
            />
            {/* Top faceted apex */}
            <polygon
              points="1740,165 1800,120 1860,165 1800,210"
              fill="#1C213B"
              stroke="url(#violetEdgeLit)"
              strokeWidth="0.8"
            />
            {/* Spine ridge highlight */}
            <line x1="1800" y1="120" x2="1800" y2="990" stroke="url(#violetEdgeLit)" strokeWidth="1" />

            {/* R2: Midground Cantilevered Geometric Volume */}
            {/* Upper projecting volume */}
            <polygon
              points="1620,320 1745,320 1745,610 1620,610"
              fill="#111425"
            />
            {/* Recessed base below cantilever */}
            <polygon
              points="1645,610 1745,610 1745,990 1645,990"
              fill="#0A0C18"
            />
            {/* Cantilever soffit under-shadow */}
            <polygon
              points="1620,610 1645,610 1645,645 1620,610"
              fill="#04050A"
            />
            {/* Top illuminated plane */}
            <polygon
              points="1620,320 1745,320 1775,348 1650,348"
              fill="url(#rightCantileverTop)"
              stroke="url(#violetEdgeLit)"
              strokeWidth="0.8"
            />
            {/* Right structural edge lines */}
            <line x1="1620" y1="320" x2="1620" y2="610" stroke="#8B5CF6" strokeOpacity="0.22" strokeWidth="0.8" />
            <line x1="1745" y1="320" x2="1745" y2="990" stroke="#8B5CF6" strokeOpacity="0.1" strokeWidth="0.8" />

            {/* Cantilever datum lines */}
            <line x1="1620" y1="460" x2="1745" y2="460" stroke="#8B5CF6" strokeOpacity="0.12" strokeWidth="0.8" />
            <line x1="1645" y1="780" x2="1745" y2="780" stroke="#8B5CF6" strokeOpacity="0.08" strokeWidth="0.8" />

            {/* Technical annotation */}
            <text x="1632" y="452" fill="#8B5CF6" fillOpacity="0.32" fontFamily="monospace" fontSize="8" letterSpacing="1.5">
              STRUC_02 // SEC-R
            </text>
          </g>

          {/* Minimalist datum coordinates & architectural ticks */}
          <g fill="#4F8CFF" fillOpacity="0.2" fontFamily="monospace" fontSize="7" letterSpacing="1.5">
            <text x="290" y="392">LAT. 23.4° N</text>
            <text x="1605" y="332" textAnchor="end">GRID_REF // 84-A</text>
          </g>
        </svg>
      </div>

      {/* 4. Foreground Translucent Architectural Glass Planes (Fore Layer) */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${foreX}px, ${foreY}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Left Translucent Glass Blade Gradient */}
            <linearGradient id="glassBladeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.07" />
              <stop offset="40%" stopColor="#4F8CFF" stopOpacity="0.03" />
              <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.05" />
            </linearGradient>

            {/* Right Translucent Glass Blade Gradient */}
            <linearGradient id="glassBladeRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.065" />
              <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.025" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
            </linearGradient>

            {/* Specular hairline border gradient */}
            <linearGradient id="glassStrokeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#4F8CFF" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#4F8CFF" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="glassStrokeRight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
              <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.22" />
              <stop offset="75%" stopColor="#8B5CF6" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Left Foreground Glass Shear Wall Plane */}
          <polygon
            points="230,230 330,195 330,860 230,895"
            fill="url(#glassBladeLeft)"
            stroke="url(#glassStrokeLeft)"
            strokeWidth="0.9"
          />
          {/* Subtle interior hairline datum on glass */}
          <line x1="230" y1="420" x2="330" y2="385" stroke="#4F8CFF" strokeOpacity="0.14" strokeWidth="0.8" />
          <line x1="230" y1="650" x2="330" y2="615" stroke="#4F8CFF" strokeOpacity="0.09" strokeWidth="0.8" />
          <circle cx="280" cy="305" r="1.5" fill="#FFFFFF" fillOpacity="0.4" />

          {/* Right Foreground Glass Shear Wall Plane */}
          <polygon
            points="1550,210 1660,245 1660,890 1550,855"
            fill="url(#glassBladeRight)"
            stroke="url(#glassStrokeRight)"
            strokeWidth="0.9"
          />
          {/* Subtle interior hairline datum on right glass */}
          <line x1="1550" y1="400" x2="1660" y2="435" stroke="#8B5CF6" strokeOpacity="0.14" strokeWidth="0.8" />
          <line x1="1550" y1="630" x2="1660" y2="665" stroke="#8B5CF6" strokeOpacity="0.09" strokeWidth="0.8" />
          <circle cx="1605" cy="325" r="1.5" fill="#FFFFFF" fillOpacity="0.35" />
        </svg>
      </div>

      {/* 5. Central Sanctuary Vignette (Ensures 100% negative space clarity for Desktop UI) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,_transparent_28%,_rgba(6,8,13,0.35)_75%,_rgba(6,8,13,0.75)_100%)] pointer-events-none" />
    </div>
  );
});

DigitalArchitectureWallpaper.displayName = "DigitalArchitectureWallpaper";
export default DigitalArchitectureWallpaper;
