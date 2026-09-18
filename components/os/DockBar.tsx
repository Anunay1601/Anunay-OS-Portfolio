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
  { id: "neural-core", label: "Neural Core", icon: Cpu, colorGradient: "from-blue-500 via-indigo-500 to-indigo-600", glowColor: "rgba(59, 130, 246, 0.4)", category: "core" },
  { id: "project-lab", label: "Project Lab", icon: FolderGit2, colorGradient: "from-indigo-500 via-purple-500 to-purple-600", glowColor: "rgba(168, 85, 247, 0.4)", category: "core" },
  { id: "dev-env", label: "Dev Environment", icon: Code2, colorGradient: "from-sky-500 via-blue-500 to-blue-600", glowColor: "rgba(56, 189, 248, 0.4)", category: "core" },
  { id: "automation-core", label: "Automation Core", icon: Workflow, colorGradient: "from-purple-500 via-pink-500 to-pink-600", glowColor: "rgba(236, 72, 153, 0.4)", category: "core" },
  { id: "system-logs", label: "System Logs", icon: History, colorGradient: "from-emerald-500 via-teal-500 to-teal-600", glowColor: "rgba(16, 185, 129, 0.4)", category: "core" },
  { id: "credential-vault", label: "Credential Vault", icon: Award, colorGradient: "from-amber-500 via-orange-500 to-orange-600", glowColor: "rgba(245, 158, 11, 0.4)", category: "core" },
  { id: "terminal", label: "Terminal", icon: Terminal, colorGradient: "from-slate-700 via-slate-800 to-slate-950", glowColor: "rgba(100, 116, 139, 0.4)", category: "utility" },
  { id: "resume", label: "Resume", icon: FileText, colorGradient: "from-blue-600 via-cyan-500 to-cyan-600", glowColor: "rgba(6, 182, 212, 0.4)", category: "utility" },
  { id: "network", label: "Skill Network", icon: Network, colorGradient: "from-violet-500 via-fuchsia-500 to-fuchsia-600", glowColor: "rgba(192, 132, 252, 0.4)", category: "utility" },
  { id: "contact", label: "Contact", icon: Mail, colorGradient: "from-rose-500 via-red-500 to-red-600", glowColor: "rgba(244, 63, 94, 0.4)", category: "utility" },
];

export function DockBar({ windows, onToggleWindow, activeWindowId }: DockBarProps) {
  const [hoveredId, setHoveredId] = useState<WindowId | null>(null);

  const coreItems = DOCK_ITEMS.filter((item) => item.category === "core");
  const utilityItems = DOCK_ITEMS.filter((item) => item.category === "utility");

  const renderDockItem = (item: DockItem) => {
    const Icon = item.icon;
    const win = windows[item.id];
    const isOpen = win?.isOpen;
    const isActive = activeWindowId === item.id && isOpen && !win?.isMinimized;
    const isHovered = hoveredId === item.id;

    return (
      <div
        key={item.id}
        className="relative flex flex-col items-center"
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Apple Tooltip on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.92 }}
              animate={{ opacity: 1, y: -48, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.92 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="absolute z-50 px-3 py-1 rounded-apple-md text-[11px] font-mono font-bold bg-background/95 dark:bg-[#121624]/95 border border-white/20 text-foreground whitespace-nowrap shadow-2xl backdrop-blur-2xl pointer-events-none flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              <span>{item.label}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Magnified Glowing Dock Icon Button */}
        <motion.button
          onClick={() => onToggleWindow(item.id)}
          whileHover={{ scale: 1.25, y: -6 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.4 }}
          aria-label={`Open ${item.label}`}
          className={cn(
            "w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent-blue/50 relative shadow-md cursor-pointer transition-shadow duration-200 border",
            isActive
              ? `bg-gradient-to-tr ${item.colorGradient} text-white border-white/40 shadow-lg shadow-accent-blue/40 ring-2 ring-white/30`
              : isOpen
              ? "bg-surface-hover/90 text-accent-blue border-accent-blue/40 shadow-inner"
              : "bg-surface/80 dark:bg-white/10 text-foreground hover:bg-surface-hover border-white/20 dark:border-white/10"
          )}
          style={
            isHovered
              ? { boxShadow: `0 8px 24px ${item.glowColor}` }
              : {}
          }
        >
          <Icon className={cn("w-5 h-5 transition-transform duration-200", isActive && "scale-105")} />
        </motion.button>

        {/* Glowing Active Indicator Dot */}
        {isOpen && (
          <motion.div
            layoutId={`dock-dot-${item.id}`}
            className={cn(
              "w-1.5 h-1.5 rounded-full mt-1.5 transition-all duration-200",
              isActive
                ? "bg-accent-blue shadow-[0_0_8px_#0A84FF] scale-110"
                : "bg-muted-foreground/60"
            )}
          />
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-auto select-none">
      {/* Translucent Apple Glass Dock Bar */}
      <div className="px-3.5 py-2.5 rounded-[28px] border border-white/30 dark:border-white/20 bg-white/70 dark:bg-[#0A0D16]/85 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex items-center gap-2 sm:gap-3">
        {/* Core Apps Group */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {coreItems.map(renderDockItem)}
        </div>

        {/* Vertical Divider Separator */}
        <div className="h-7 w-px bg-white/30 dark:bg-white/15 mx-0.5" />

        {/* Utilities Group */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {utilityItems.map(renderDockItem)}
        </div>
      </div>
    </div>
  );
}
