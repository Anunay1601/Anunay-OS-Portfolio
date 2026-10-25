'use client';

import React, { useState } from "react";
import { Orbit as OrbitIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * TYPE DEFINITIONS & CUSTOMIZATION CONTRACTS (VengeanceUI Specification)
 * ============================================================================
 */

// Represents an individual planet/technology node orbiting the core.
export interface SolarSystemItem {
  id: string;      // Unique identifier (e.g. "react", "rust")
  label: string;   // Text label shown next to the icon (e.g. "React")
  type?: string;   // Optional description tag (e.g. "Frontend Framework")
  badge?: string;  // Optional status badge text (e.g. "Official SDK")
  desc?: string;   // Optional longer detail description
  category?: string;
  associatedSkills?: string[];
  associatedProjects?: string[];
  color: string;   // HEX or CSS color used for active glowing highlights (e.g. "#61DAFB")
  svg: React.ReactNode; // React node / Inline SVG rendering the item's logo icon
  isDimmed?: boolean; // When true, visually dims the node (used during category filtering)
}

// Configures a single orbit ring layer (e.g. inner, middle, outer).
export interface OrbitConfig {
  id: string;          // Unique ring identifier (e.g. "inner")
  name: string;        // Readable name for the ring
  radiusClass: string; // CSS variable or absolute size (e.g. "var(--radius-inner)")
  radiusPx: number;    // Absolute size in pixels (used for cosmic dust calculations)
  speed: number;       // Base duration in seconds for one full 360-degree rotation
  items: SolarSystemItem[]; // Array of planet items revolving on this ring
}

export interface SolarSystemProps extends React.HTMLAttributes<HTMLDivElement> {
  // Pass a custom URL string or React element to override the default center sun core logo.
  centerLogo?: string | React.ReactNode;
  centerLogoAlt?: string; // Accessibility description for the center logo
  onCenterLogoClick?: () => void; // Callback when central sun core logo is clicked
  orbits?: OrbitConfig[]; // Custom array of rings and planets (defaults to DEFAULT_ORBITS)
  isPaused?: boolean;     // Stop all rotation animations (play/pause control)
  speedMultiplier?: number; // Speed multiplier for faster/slower rotations (default: 1)
  onItemClick?: (item: SolarSystemItem) => void;
  selectedItemId?: string | null;
}

/**
 * ============================================================================
 * DEFAULT SVG LOGO ICONS
 * ============================================================================
 */
export const SolarSystemIcons = {
  react: (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4 h-4 md:w-5 md:h-5" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 180 180" className="w-4 h-4 md:w-5 md:h-5" fill="none">
      <circle cx="90" cy="90" r="90" fill="#000" stroke="#fff" strokeWidth="6" />
      <path
        d="M149.508 157.52L69.142 54H54v72h14.4V69.412l67.24 87.054a89.4 89.4 0 0013.868-1.046zM111.6 54h14.4v72h-14.4z"
        fill="#fff"
      />
    </svg>
  ),
  flutter: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none">
      <path d="M14.314 0L2.3 12l6 6 6-6-6-6 2.985-2.985L14.314 0zm0 6l-6 6 6 6 5.7-5.7-2.985-3L20.014 6H14.314z" fill="#54C5F8" />
      <path d="M14.314 12L8.3 18l6 6h5.7l-6-6 6-6h-5.7z" fill="#01579B" />
    </svg>
  ),
  vue: (
    <svg viewBox="0 0 256 221" className="w-4 h-4 md:w-5 md:h-5" fill="none">
      <path d="M204.8 0H256L128 220.8 0 0h51.2L128 132.48 204.8 0z" fill="#41B883" />
      <path d="M0 0l128 220.8L256 0h-51.2L128 132.48 51.2 0H0z" fill="#35495E" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path d="M5.5 12v-1.5h4.5V21h-2V12H5.5zm5.5-1.5h4.5v1.5h-3v2h3v1.5h-3v2h3V21h-4.5v-1.5h3v-2h-3v-1.5h3v-2h-3V10.5z" fill="#fff" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none">
      <path
        d="M12.043 1.017c-2.157 0-2.078.918-2.078.918l.003 2.126h2.32v.639H7.768S5.449 4.487 5.449 6.72c0 2.233 0 2.767 0 2.767h1.568V8.282c0-.725.68-1.324 1.582-1.324h3.722c1.383 0 2.234-.84 2.234-2.234V3.11c0-1.156-.99-2.093-2.234-2.093h-2.32V1.017zm-1.09.934a.6.6 0 1 1 .002 1.2.6.6 0 0 1-.002-1.2z"
        fill="#387EB8"
      />
      <path
        d="M12.043 22.983c2.157 0 2.078-.918 2.078-.918l-.003-2.126h-2.32v-.639h4.518s2.32.217 2.32-2.017c0-2.233 0-2.767 0-2.767h-1.568v1.201c0 .725-.68 1.324-1.582 1.324h-3.722c-1.383 0-2.234.84-2.234 2.234v1.867c0 1.156.99 2.093 2.234 2.093h2.32v-.252h-.041z"
        fill="#FFD43B"
      />
    </svg>
  ),
  rust: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#ff6f30" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" fill="#ff6f30" />
      <circle cx="12" cy="12" r="1.5" fill="#fff" />
    </svg>
  ),
  golang: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none">
      <path
        d="M3.8 8.15a.36.36 0 0 0-.36.41.36.36 0 0 0 .36.33h4.69a.36.36 0 0 0 .36-.33.36.36 0 0 0-.36-.41H3.8zm-2.56 1.8a.36.36 0 0 0-.36.45.36.36 0 0 0 .36.33h4.69a.36.36 0 0 0 .36-.33.36.36 0 0 0-.36-.45H1.24zm13.8 0a.36.36 0 0 0-.36.45.36.36 0 0 0 .36.33h4.69a.36.36 0 0 0 .36-.33.36.36 0 0 0-.36-.45h-4.69zm-2.56-1.8a.36.36 0 0 0-.36.41.36.36 0 0 0 .36.33h4.69a.36.36 0 0 0 .36-.33.36.36 0 0 0-.36-.41h-4.69z"
        fill="#00ADD8"
      />
      <path
        d="M22.83 11.1c-.43-1.27-1.53-2.03-2.96-2.03-1.28 0-2.27.49-3.22 1.33.4.35.77.79 1.08 1.3.48-.5 1.06-.96 1.9-.96.84 0 1.4.47 1.57 1.17.03.1.04.2.04.32v.27c-.54-.02-1.18-.05-1.83-.05-2.16 0-3.35.5-4.16 1.5-.78.96-.9 2.14-.9 3.08 0 1.34.5 2.55 1.8 2.55.84 0 1.43-.37 1.91-.86.35.55.72 1.01 1.3 1.31.62.32 1.28.38 2.13.38 1.99 0 3.2-.95 3.85-2.6.54-1.34.38-2.5.03-3.28h-2.73v.02zm-1.16 3.73c-.48.75-1.12 1.06-1.83 1.06-.36 0-.72-.1-1-.32-.3-.23-.5-.56-.5-1.1 0-.8.36-1.42 1.06-1.8.56-.3 1.3-.42 2.23-.42.17 0 .35 0 .54.01-.03.72-.23 1.63-.5 2.57zM8.3 9.02H4.76c-.88 0-1.6.72-1.6 1.6v2.85c0 .88.72 1.6 1.6 1.6H8.3c1.52 0 3.04-1.36 3.04-3.03 0-1.66-1.52-3.02-3.04-3.02zm0 3.95H5.43v-.7H8.3s.36.1.36.43c0 .34-.36.26-.36.26v.01z"
        fill="#00ADD8"
      />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.25" />
    </svg>
  ),
  ml: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 12 2.5 7.5" />
      <path d="m12 12 4.5 9.5" />
      <path d="m12 12 9.5-4.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none">
      <path d="M7 19c3.5 1 7 1 10.5 0M8 21.5c2.5.7 5.5.7 8 0" stroke="#E76F00" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13.5 2c-1.5 2-1 3.5 1 5s.5 3-1.5 4.5" stroke="#E76F00" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 4c-1.5 2-1 3.5 1 5s.5 3-1.5 4.5" stroke="#5382A1" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.5 15.5c0 0 2 1.5 6.5 1.5s6.5-1.5 6.5-1.5" stroke="#E76F00" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M6 9v3a3 3 0 0 0 3 3h6" />
      <path d="M18 15V9a3 3 0 0 0-3-3H9" />
    </svg>
  ),
};

/**
 * ============================================================================
 * DEFAULT ORBITS CONFIGURATION
 * ============================================================================
 */
const DEFAULT_ORBITS: OrbitConfig[] = [
  {
    id: "inner",
    name: "Inner Ring",
    radiusClass: "var(--radius-inner)",
    radiusPx: 175,
    speed: 20,
    items: [
      {
        id: "react",
        label: "React",
        color: "#61DAFB",
        svg: SolarSystemIcons.react,
      },
      {
        id: "nextjs",
        label: "Next.js",
        color: "#ffffff",
        svg: SolarSystemIcons.nextjs,
      },
      {
        id: "flutter",
        label: "Flutter",
        color: "#02569B",
        svg: SolarSystemIcons.flutter,
      },
      {
        id: "vue",
        label: "Vue.js",
        color: "#42B883",
        svg: SolarSystemIcons.vue,
      },
    ],
  },
  {
    id: "mid",
    name: "Middle Ring",
    radiusClass: "var(--radius-mid)",
    radiusPx: 285,
    speed: 32,
    items: [
      {
        id: "typescript",
        label: "TypeScript",
        color: "#3178C6",
        svg: SolarSystemIcons.typescript,
      },
      {
        id: "python",
        label: "Python",
        color: "#FFD43B",
        svg: SolarSystemIcons.python,
      },
    ],
  },
  {
    id: "outer",
    name: "Outer Ring",
    radiusClass: "var(--radius-outer)",
    radiusPx: 395,
    speed: 48,
    items: [
      {
        id: "rust",
        label: "Rust",
        color: "#FF6F30",
        svg: SolarSystemIcons.rust,
      },
      {
        id: "golang",
        label: "Go",
        color: "#00ADD8",
        svg: SolarSystemIcons.golang,
      },
    ],
  },
];

export const SolarSystem = React.forwardRef<HTMLDivElement, SolarSystemProps>(
  (
    {
      centerLogo,
      centerLogoAlt = "Core Engine",
      onCenterLogoClick,
      orbits = DEFAULT_ORBITS,
      isPaused = false,
      speedMultiplier = 1,
      onItemClick,
      selectedItemId = null,
      className,
      ...props
    },
    ref
  ) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [isCenterHovered, setIsCenterHovered] = useState<boolean>(false);

    // Cosmic dust particle animations coordinates
    const dustItems = [
      { delay: "-4s", radius: "var(--dust-r1, 140px)", color: "#00f5d4" },
      { delay: "-11s", radius: "var(--dust-r2, 210px)", color: "#a855f7" },
      { delay: "-19s", radius: "var(--dust-r3, 270px)", color: "#3b82f6" },
      { delay: "-28s", radius: "var(--dust-r4, 320px)", color: "#00f5d4" },
      { delay: "-7s", radius: "var(--dust-r5, 170px)", color: "#ec4899" },
      { delay: "-15s", radius: "var(--dust-r6, 290px)", color: "#eab308" },
      { delay: "-23s", radius: "var(--dust-r7, 340px)", color: "#a855f7" },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "solar-system-container relative flex items-center justify-center w-full max-w-[940px] h-[340px] sm:h-[400px] md:h-[480px] perspective-[1200px] select-none overflow-visible",
          className
        )}
        {...props}
      >
        {/* Dynamic CSS Keyframes & Responsive Orbit Radius Injection */}
        <style dangerouslySetInnerHTML={{ __html: `
          .solar-system-container {
            --radius-inner: 130px;
            --radius-mid: 215px;
            --radius-outer: 300px;

            --dust-r1: 110px;
            --dust-r2: 170px;
            --dust-r3: 240px;
            --dust-r4: 280px;
            --dust-r5: 145px;
            --dust-r6: 260px;
            --dust-r7: 310px;
          }

          @media (min-width: 1024px) {
            .solar-system-container {
              --radius-inner: 140px;
              --radius-mid: 235px;
              --radius-outer: 330px;

              --dust-r1: 120px;
              --dust-r2: 185px;
              --dust-r3: 260px;
              --dust-r4: 310px;
              --dust-r5: 160px;
              --dust-r6: 280px;
              --dust-r7: 335px;
            }
          }

          @media (max-width: 768px) {
            .solar-system-container {
              --radius-inner: 95px;
              --radius-mid: 160px;
              --radius-outer: 220px;

              --dust-r1: 80px;
              --dust-r2: 125px;
              --dust-r3: 175px;
              --dust-r4: 210px;
              --dust-r5: 110px;
              --dust-r6: 190px;
              --dust-r7: 225px;
            }
          }

          @media (max-width: 480px) {
            .solar-system-container {
              --radius-inner: 68px;
              --radius-mid: 115px;
              --radius-outer: 160px;

              --dust-r1: 55px;
              --dust-r2: 90px;
              --dust-r3: 130px;
              --dust-r4: 155px;
              --dust-r5: 78px;
              --dust-r6: 135px;
              --dust-r7: 165px;
            }
          }

          @keyframes custom-orbitMove {
            0% {
              transform: translate(-50%, -50%) rotateZ(0deg) translateX(var(--orbit-radius));
            }
            100% {
              transform: translate(-50%, -50%) rotateZ(-360deg) translateX(var(--orbit-radius));
            }
          }

          @keyframes custom-billboardCancel {
            0% {
              transform: translate(-50%, -50%) rotateZ(0deg) rotateY(10deg) rotateX(-65deg);
            }
            100% {
              transform: translate(-50%, -50%) rotateZ(360deg) rotateY(10deg) rotateX(-65deg);
            }
          }

          @keyframes custom-sun-pulse {
            0% { transform: scale(0.92); opacity: 0.75; }
            100% { transform: scale(1.1); opacity: 1; }
          }

          @keyframes custom-spin-clockwise {
            0% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg); }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(360deg); }
          }
          @keyframes custom-spin-counter {
            0% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg); }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(-360deg); }
          }

          .animate-custom-orbit {
            animation: custom-orbitMove var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-billboard {
            animation: custom-billboardCancel var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-sun-pulse {
            animation: custom-sun-pulse 3.6s ease-in-out infinite alternate;
          }
          .animate-custom-spin-cw {
            animation: custom-spin-clockwise 20s linear infinite;
          }
          .animate-custom-spin-ccw {
            animation: custom-spin-counter 30s linear infinite;
          }

          .orbit-logo-card {
            position: absolute;
            left: 50%;
            top: 50%;
            display: flex;
            align-items: center;
            gap: 7px;
            padding: 0.38rem 0.8rem;
            background: rgba(13, 16, 27, 0.78);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 9999px;
            font-weight: 600;
            color: #ffffff;
            white-space: nowrap;
            user-select: none;
            cursor: pointer;
            pointer-events: auto;
            transition: border-color 0.25s, color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.25s;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          .orbit-logo-card::before {
            content: "";
            position: absolute;
            inset: -8px;
            border-radius: 9999px;
            pointer-events: auto;
            z-index: -1;
          }

          @media (max-width: 640px) {
            .orbit-logo-card {
              padding: 0.28rem 0.55rem;
              gap: 5px;
            }
          }
        `}} />

        {/* Tiltable Orbit Container (handles 3D tilt coordinates) */}
        <div 
          className="absolute w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] md:w-[780px] md:h-[780px] lg:w-[860px] lg:h-[860px] flex items-center justify-center pointer-events-none"
          style={{
            transform: "rotateX(65deg) rotateY(-10deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Central Sun Core Engine */}
          <div 
            className="absolute w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] flex items-center justify-center z-20 pointer-events-auto"
            style={{
              transform: "rotateY(10deg) rotateX(-65deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Glowing aura */}
            <div className={cn(
              "absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-full filter blur-md animate-custom-sun-pulse z-10 transition-all duration-300",
              isCenterHovered ? "bg-teal-400/45 scale-125" : "bg-teal-500/25"
            )} />
            
            {/* Sun Core Logo Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCenterLogoClick?.();
              }}
              onMouseEnter={() => setIsCenterHovered(true)}
              onMouseLeave={() => setIsCenterHovered(false)}
              className={cn(
                "group relative z-20 rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal-400 transition-all duration-300",
                isCenterHovered && "scale-110 shadow-[0_0_40px_rgba(45,212,191,0.6)]"
              )}
              title="Click to view Core Engine Architecture"
              aria-label={centerLogoAlt || "Core Engine Logo"}
            >
              {centerLogo ? (
                typeof centerLogo === "string" ? (
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-cyan-500/50 group-hover:border-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.4)] bg-zinc-950 object-cover relative transition-all duration-300"
                    src={centerLogo}
                    alt={centerLogoAlt}
                    width={80}
                    height={80}
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-teal-500/40 group-hover:border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.35)] bg-zinc-950 flex items-center justify-center p-2 relative transition-all duration-300">
                    {centerLogo}
                  </div>
                )
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-teal-500/40 group-hover:border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.35)] bg-zinc-950 flex items-center justify-center p-2 relative transition-all duration-300">
                  <OrbitIcon className="w-6 h-6 md:w-8 md:h-8 text-teal-400 animate-spin" style={{ animationDuration: '10s' }} />
                </div>
              )}
            </button>

            {/* Sun core dash rings */}
            <div className="absolute w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] rounded-full border border-dashed border-teal-500/30 animate-custom-spin-cw pointer-events-none" />
            <div className="absolute w-[130px] h-[130px] sm:w-[155px] sm:h-[155px] md:w-[185px] md:h-[185px] rounded-full border border-dashed border-teal-500/15 animate-custom-spin-ccw pointer-events-none" />
          </div>

          {/* Cosmic Dust Particles */}
          {dustItems.map((dust, idx) => (
            <div
              key={idx}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full opacity-45 pointer-events-none animate-custom-orbit"
              style={{
                background: dust.color,
                boxShadow: `0 0 6px ${dust.color}`,
                animationDelay: dust.delay,
                animationPlayState: (isPaused || Boolean(hoveredId)) ? "paused" : "running",
                animationDuration: `${24 / speedMultiplier}s`,
                ["--orbit-radius" as any]: dust.radius,
                ["--orbit-duration" as any]: `${24 / speedMultiplier}s`,
                ["--orbit-play-state" as any]: (isPaused || Boolean(hoveredId)) ? "paused" : "running",
              }}
            />
          ))}

          {/* ORBITS AND PLANET NODES RENDERING */}
          {orbits.map((orbit, orbitIdx) => {
            return (
              <React.Fragment key={orbit.id}>
                {/* Visual Dashed Ring Line representing this orbit level */}
                <div
                  className="absolute rounded-full border border-dashed border-zinc-700/60 dark:border-zinc-700/70 pointer-events-none"
                  style={{
                    width: `calc(2 * ${orbit.radiusClass})`,
                    height: `calc(2 * ${orbit.radiusClass})`,
                    boxShadow: "inset 0 0 25px rgba(255, 255, 255, 0.015), 0 0 25px rgba(255, 255, 255, 0.015)",
                    ["--orbit-radius" as any]: orbit.radiusClass,
                  }}
                />

                {/* Orbit Items / Planet Cards */}
                {orbit.items.map((item, idx, arr) => {
                  const durationValue = orbit.speed / speedMultiplier;
                  // Evenly distribute items around the circle and stagger orbit layers to prevent inter-ring alignment
                  const orbitStagger = orbits.length > 1 ? (orbitIdx / orbits.length) * (1 / arr.length) : 0;
                  const phaseFraction = (idx / arr.length) + orbitStagger;
                  const delayValue = -durationValue * phaseFraction;

                  const isHovered = hoveredId === item.id;
                  const isSelected = selectedItemId === item.id;
                  const isOrbitPaused = isPaused || Boolean(hoveredId);

                  const isDimmed = Boolean(item.isDimmed && !isHovered && !isSelected);

                  return (
                    <div
                      key={item.id}
                      className="absolute left-1/2 top-1/2 w-0 h-0 pointer-events-none animate-custom-orbit"
                      style={{
                        animationDelay: `${delayValue}s`,
                        animationDuration: `${durationValue}s`,
                        animationPlayState: isOrbitPaused ? "paused" : "running",
                        ["--orbit-radius" as any]: orbit.radiusClass,
                        ["--orbit-duration" as any]: `${durationValue}s`,
                        ["--orbit-play-state" as any]: isOrbitPaused ? "paused" : "running",
                        ["--hover-color" as any]: item.color,
                        zIndex: isHovered || isSelected ? 40 : 15,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Laser beam connecting sun center with planet (activates on hover or selection) */}
                      <div
                        className="absolute right-0 top-1/2 h-[1.5px] origin-right -translate-y-1/2 pointer-events-none transition-opacity duration-300 z-0"
                        style={{
                          width: orbit.radiusClass,
                          opacity: isHovered || isSelected ? 1 : 0,
                          background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.2) 20%, ${item.color} 80%, ${item.color} 100%)`,
                          boxShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}50`,
                        }}
                      />

                      {/* PLANET LOGO CARD with billboardCancel keyframe animation */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onItemClick?.(item);
                        }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={cn(
                          "orbit-logo-card animate-custom-billboard outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-300",
                          (isHovered || isSelected) && "ring-1",
                          isDimmed && "opacity-30 grayscale-[50%] scale-90"
                        )}
                        style={{
                          animationDelay: `${delayValue}s`,
                          animationDuration: `${durationValue}s`,
                          animationPlayState: isOrbitPaused ? "paused" : "running",
                          borderColor: isHovered || isSelected ? item.color : undefined,
                          backgroundColor: isSelected ? `${item.color}25` : undefined,
                          boxShadow: isHovered || isSelected
                            ? `0 0 25px rgba(0, 0, 0, 0.7), 0 0 18px ${item.color}55`
                            : undefined,
                          scale: isHovered || isSelected ? 1.08 : undefined,
                          ["--orbit-duration" as any]: `${durationValue}s`,
                          ["--orbit-play-state" as any]: isOrbitPaused ? "paused" : "running",
                        }}
                        aria-label={`Technology node: ${item.label}`}
                      >
                        {/* Icon Container */}
                        <div 
                          className="transition-transform duration-300 flex items-center justify-center"
                          style={{
                            transform: isHovered || isSelected ? "scale(1.15)" : "scale(1)",
                            color: item.color,
                          }}
                        >
                          {item.svg}
                        </div>
                        {/* Label Text */}
                        <span className="text-[10px] sm:text-[11px] md:text-[13px] tracking-tight font-semibold">
                          {item.label}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
);

SolarSystem.displayName = "SolarSystem";
