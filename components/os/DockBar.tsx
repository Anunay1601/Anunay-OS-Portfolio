"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WindowId, WindowState } from "@/hooks/useOSStore";
import {
  Cpu,
  FolderGit2,
  Code2,
  Workflow,
  History,
  Award,
  Terminal,
  FileText,
  Network,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DockBarProps {
  windows: Record<WindowId, WindowState>;
  onToggleWindow: (id: WindowId) => void;
  activeWindowId: WindowId | null;
}

interface DockItem {
  id: WindowId;
  label: string;
  icon: any;
  colorGradient: string;
  glowColor: string;
  category: "core" | "utility";
}

const DOCK_ITEMS: DockItem[] = [
  { id: "neural-core", label: "Neural Core", icon: Cpu, colorGradient: "from-blue-500 via-indigo-500 to-indigo-600", glowColor: "rgba(59, 130, 246, 0.45)", category: "core" },
  { id: "project-lab", label: "Project Lab", icon: FolderGit2, colorGradient: "from-indigo-500 via-purple-500 to-purple-600", glowColor: "rgba(168, 85, 247, 0.45)", category: "core" },
  { id: "dev-env", label: "Dev Environment", icon: Code2, colorGradient: "from-sky-500 via-blue-500 to-blue-600", glowColor: "rgba(56, 189, 248, 0.45)", category: "core" },
  { id: "automation-core", label: "Automation Core", icon: Workflow, colorGradient: "from-purple-500 via-pink-500 to-pink-600", glowColor: "rgba(236, 72, 153, 0.45)", category: "core" },
  { id: "system-logs", label: "System Logs", icon: History, colorGradient: "from-emerald-500 via-teal-500 to-teal-600", glowColor: "rgba(16, 185, 129, 0.45)", category: "core" },
  { id: "credential-vault", label: "Credential Vault", icon: Award, colorGradient: "from-amber-500 via-orange-500 to-orange-600", glowColor: "rgba(245, 158, 11, 0.45)", category: "core" },
  { id: "terminal", label: "Terminal", icon: Terminal, colorGradient: "from-slate-700 via-slate-800 to-slate-950", glowColor: "rgba(100, 116, 139, 0.45)", category: "utility" },
  { id: "resume", label: "Resume", icon: FileText, colorGradient: "from-blue-600 via-cyan-500 to-cyan-600", glowColor: "rgba(6, 182, 212, 0.45)", category: "utility" },
  { id: "network", label: "Skill Network", icon: Network, colorGradient: "from-violet-500 via-fuchsia-500 to-fuchsia-600", glowColor: "rgba(192, 132, 252, 0.45)", category: "utility" },
  { id: "contact", label: "Contact", icon: Mail, colorGradient: "from-rose-500 via-red-500 to-red-600", glowColor: "rgba(244, 63, 94, 0.45)", category: "utility" },
];

export function DockBar({ windows, onToggleWindow, activeWindowId }: DockBarProps) {
  const [hoveredId, setHoveredId] = useState<WindowId | null>(null);

  const coreItems = DOCK_ITEMS.filter((item) => item.category === "core");
  const utilityItems = DOCK_ITEMS.filter((item) => item.category === "utility");

  const renderDockItem = (item: DockItem) => {
    const Icon = item.icon;
    const win = windows[item.id];
    const isOpen = Boolean(win?.isOpen && !win?.isMinimized);
    const isActive = activeWindowId === item.id && isOpen;
    const isHovered = hoveredId === item.id;

    return (
      <div
        key={item.id}
        className="relative flex flex-col items-center justify-center shrink-0"
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Apple visionOS Liquid Glass Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.94 }}
              animate={{ opacity: 1, y: -50, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.94 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute z-50 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-white/85 dark:bg-[#080B15]/90 border border-white/50 dark:border-white/20 text-foreground whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-2xl pointer-events-none flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              <span>{item.label}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liquid Glass Dock Icon Button - Exact hover behavior retained */}
        <motion.button
          onClick={() => onToggleWindow(item.id)}
          whileHover={{ scale: 1.25, y: -6 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.4 }}
          aria-label={`Open ${item.label}`}
          className={cn(
            "w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent-blue/50 relative cursor-pointer transition-all duration-200 border liquid-glass-btn z-10",
            isActive
              ? `bg-gradient-to-tr ${item.colorGradient} text-white border-white/60 shadow-lg shadow-accent-blue/40 ring-2 ring-white/40`
              : isOpen
              ? "bg-accent-blue/20 text-accent-blue border-accent-blue/60 shadow-inner backdrop-blur-md"
              : "bg-white/45 dark:bg-white/10 text-foreground hover:bg-white/70 dark:hover:bg-white/20 border-white/60 dark:border-white/15"
          )}
          style={
            isHovered
              ? { boxShadow: `0 8px 28px ${item.glowColor}, inset 0 1.5px 2px rgba(255,255,255,0.8)` }
              : {}
          }
        >
          {/* Glass Inner Specular Lens Highlight */}
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none z-10" />

          <Icon className={cn("w-5 h-5 transition-transform duration-200 z-20 relative", isActive && "scale-105")} />
        </motion.button>

        {/* Absolutely Positioned Active Indicator Dot (Zero Layout Shift on Open/Close) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 pointer-events-none z-20",
                isActive
                  ? "bg-accent-blue scale-125 shadow-[0_0_8px_#0A84FF]"
                  : "bg-muted-foreground/60"
              )}
            />
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-auto select-none">
      {/* Ultra-Glassy Apple Capsule Dock Bar */}
      <nav
        role="toolbar"
        aria-label="ANUNAY OS Application Dock"
        className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full apple-liquid-dock relative flex items-center gap-1.5 sm:gap-2.5"
      >
        {/* Specular Highlight Streak */}
        <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 dark:via-white/40 to-transparent pointer-events-none" />

        {/* Core Apps Group */}
        <div className="flex items-center gap-1 sm:gap-2">
          {coreItems.map(renderDockItem)}
        </div>

        {/* Liquid Metallic Vertical Divider */}
        <div className="h-6 w-px bg-gradient-to-b from-transparent via-black/25 dark:via-white/30 to-transparent mx-1.5 shrink-0" />

        {/* Utilities Group */}
        <div className="flex items-center gap-1 sm:gap-2">
          {utilityItems.map(renderDockItem)}
        </div>
      </nav>
    </div>
  );
}


