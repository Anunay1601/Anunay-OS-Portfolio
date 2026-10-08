"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WindowId } from "@/hooks/useOSStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Cpu,
  FolderGit2,
  Code2,
  Workflow,
  Terminal,
  FileText,
  Search,
  Zap,
  ArrowRight,
} from "lucide-react";

interface DesktopWallpaperProps {
  hasActiveWindow: boolean;
  onOpenWindow: (id: WindowId) => void;
  onOpenCommandPalette: () => void;
}

const QUICK_MODULES: {
  id: WindowId;
  title: string;
  subtitle: string;
  icon: any;
  gradient: string;
  badge: string;
}[] = [
  {
    id: "neural-core",
    title: "Neural Core",
    subtitle: "Interactive 3D Technology Graph",
    icon: Cpu,
    gradient: "from-blue-500/20 to-indigo-600/20 border-blue-500/30 text-blue-400",
    badge: "AI Graph",
  },
  {
    id: "project-lab",
    title: "Project Lab",
    subtitle: "4 Verified Production Systems",
    icon: FolderGit2,
    gradient: "from-purple-500/20 to-pink-600/20 border-purple-500/30 text-purple-400",
    badge: "Deployed",
  },
  {
    id: "dev-env",
    title: "Dev Environment",
    subtitle: "Skill Matrix & Workplace Deployments",
    icon: Code2,
    gradient: "from-sky-500/20 to-blue-600/20 border-sky-500/30 text-sky-400",
    badge: "Full Stack",
  },
  {
    id: "automation-core",
    title: "Automation Core",
    subtitle: "n8n LLM Document Redaction Pipeline",
    icon: Workflow,
    gradient: "from-pink-500/20 to-rose-600/20 border-pink-500/30 text-pink-400",
    badge: "n8n & LLM",
  },
  {
    id: "terminal",
    title: "Terminal Shell",
    subtitle: "Interactive Zsh CLI Workstation",
    icon: Terminal,
    gradient: "from-emerald-500/20 to-teal-600/20 border-emerald-500/30 text-emerald-400",
    badge: "CLI Zsh",
  },
  {
    id: "resume",
    title: "Official Resume",
    subtitle: "Verified PDF Curriculum Vitae",
    icon: FileText,
    gradient: "from-cyan-500/20 to-blue-600/20 border-cyan-500/30 text-cyan-400",
    badge: "PDF CV",
  },
];

export function DesktopWallpaper({
  hasActiveWindow,
  onOpenWindow,
  onOpenCommandPalette,
}: DesktopWallpaperProps) {
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live Digital HUD Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setDateString(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const prefersReducedMotion = useReducedMotion();

  // Ambient Floating Particle Grid Canvas
  useEffect(() => {
    if (hasActiveWindow) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
      
      particles = Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.35 + 0.1,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(10, 132, 255, ${p.alpha})` : `rgba(0, 0, 0, ${p.alpha * 0.4})`;
        ctx.fill();
      });

      if (!prefersReducedMotion && !document.hidden) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [hasActiveWindow, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {!hasActiveWindow && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-between p-4 sm:p-8 overflow-y-auto no-scrollbar pointer-events-auto select-none z-0"
        >
          {/* Canvas Background Mesh */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />

          {/* Top Clock HUD & System Telemetry Bar */}
          <div className="flex flex-col items-center space-y-1 pt-2 sm:pt-4">
            <div className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-foreground/90">
              {timeString || "11:52:18 PM"}
            </div>
            <div className="text-xs sm:text-sm font-mono text-muted-foreground font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{dateString || "Friday, September 18, 2026"}</span>
            </div>
          </div>

          {/* Central Holographic Emblem Badge */}
          <div className="my-auto py-2 flex flex-col items-center text-center space-y-3 max-w-3xl w-full">
            {/* Glowing Multi-Layer Emblem Core */}
            <div
              className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group cursor-pointer"
              onClick={onOpenCommandPalette}
              title="Open Command Search (⌘K)"
            >
              {/* Outer Radar Orbit */}
              <div className="absolute inset-0 rounded-full border border-dashed border-accent-blue/30 animate-spin [animation-duration:18s]" />
              <div className="absolute -inset-2 rounded-full border border-black/8 dark:border-white/10 animate-spin [animation-duration:30s] [animation-direction:reverse]" />

              {/* Luminous Glow Backdrop */}
              <div className="absolute inset-1 rounded-3xl bg-gradient-to-tr from-accent-blue via-indigo-500 to-accent-violet blur-xl opacity-35 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Central Glass Card Icon */}
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-tr from-accent-blue via-indigo-500 to-accent-violet p-0.5 shadow-2xl transition-transform duration-300 group-hover:scale-104">
                <div className="w-full h-full rounded-[22px] bg-white/40 dark:bg-[#0E111B]/60 backdrop-blur-2xl flex items-center justify-center overflow-hidden shadow-inner relative">
                  <img
                    src="/anunay-cutout.png"
                    alt="Anunay Chhapre"
                    className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Emblem Text & System Badging */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs font-mono font-bold shadow-xs">
                <Zap className="w-3.5 h-3.5 text-accent-blue" />
                <span>ANUNAY OS KERNEL</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-sans">
                Interactive Workstation
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-md mx-auto">
                All windows minimized • Select a system module below or press <kbd className="px-1.5 py-0.5 rounded bg-surface-2 border border-border-color text-foreground font-bold">⌘K</kbd>
              </p>
            </div>

            {/* VisionOS Style Launch Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 w-full pt-1">
              {QUICK_MODULES.map((mod) => {
                const Icon = mod.icon;
                return (
                  <button
                    key={mod.id}
                    onClick={() => onOpenWindow(mod.id)}
                    className="p-3.5 rounded-2xl border border-white/40 dark:border-white/12 bg-white/85 dark:bg-[#121626]/85 backdrop-blur-2xl text-left transition-all duration-200 group hover:border-accent-blue/60 hover:bg-white dark:hover:bg-[#161a2e] hover:shadow-[0_10px_30px_rgba(10,132,255,0.2)] hover:-translate-y-0.5 shadow-sm flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${mod.gradient} flex items-center justify-center shrink-0 border border-white/20 shadow-md text-white`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-foreground font-sans truncate block group-hover:text-accent-blue transition-colors">
                          {mod.title}
                        </span>
                        <p className="text-[11px] text-muted-foreground font-sans line-clamp-1">
                          {mod.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent-blue/10 dark:bg-accent-blue/20 border border-accent-blue/25 text-accent-blue">
                        {mod.badge}
                      </span>
                      <ArrowRight className="w-4 h-4 text-accent-blue/70 group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Command Search Trigger Bar */}
          <div className="w-full max-w-md pb-2">
            <button
              onClick={onOpenCommandPalette}
              className="w-full px-4 py-2.5 rounded-2xl bg-white/85 dark:bg-[#121624]/90 border border-white/40 dark:border-white/15 hover:border-accent-blue/50 backdrop-blur-2xl text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center justify-between text-xs font-mono shadow-md hover:shadow-lg group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-accent-blue group-hover:scale-105 transition-transform" />
                <span className="font-sans font-medium text-xs">Search ANUNAY OS commands & projects...</span>
              </div>
              <kbd className="px-2 py-0.5 text-[10px] font-mono font-bold bg-surface-2 rounded border border-border-color text-foreground">
                ⌘K
              </kbd>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
