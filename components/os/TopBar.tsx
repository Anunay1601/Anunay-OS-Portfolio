"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AboutLogoModal } from "@/components/modals/AboutLogoModal";
import { WindowId } from "@/hooks/useOSStore";
import {
  ArrowLeft,
  Search,
  FileText,
  Clock,
} from "lucide-react";

interface TopBarProps {
  onOpenCommandPalette: () => void;
  onOpenWindow: (id: WindowId) => void;
}

const TopBarClock = React.memo(function TopBarClock() {
  const [dateString, setDateString] = useState<string>("");
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const datePart = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      const timePart = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setDateString(datePart);
      setTimeString(timePart);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden px-2 sm:px-2.5 py-1 rounded-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center gap-1 sm:gap-1.5 text-muted-foreground hover:text-foreground font-medium text-xs whitespace-nowrap shrink-0 transition-colors">
      <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 dark:via-white/20 to-transparent pointer-events-none" />
      <Clock className="w-3.5 h-3.5 text-accent-blue shrink-0 hidden sm:inline" />
      <span className="font-mono text-xs font-medium text-foreground/80 flex items-center gap-1 sm:gap-1.5">
        <span className="hidden sm:inline">{dateString || "Fri, Sep 18"}</span>
        <span className="hidden sm:inline text-zinc-500">•</span>
        <span>{timeString || "10:16 PM"}</span>
      </span>
    </div>
  );
});

export const TopBar = React.memo(function TopBar({ onOpenCommandPalette, onOpenWindow }: TopBarProps) {
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  return (
    <header className="h-11 w-full border-b border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#070A14]/70 backdrop-blur-2xl px-3 sm:px-5 flex items-center justify-between z-40 select-none text-xs shadow-xs relative">
      {/* Bottom subtle specular glass edge highlight */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent pointer-events-none" />

      {/* Left: Navigation, Branding Logo */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Liquid Glass Exit OS Pill */}
        <Link
          href="/"
          className="relative overflow-hidden flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-all duration-200 px-3 py-1 rounded-full bg-white/40 hover:bg-white/70 dark:bg-white/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] group"
          title="Return to Recruiter Landing Page"
        >
          <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline font-sans font-medium text-xs text-muted-foreground group-hover:text-foreground transition-colors">Exit OS</span>
        </Link>

        <div className="h-4 w-px bg-black/10 dark:bg-white/10 shrink-0 hidden sm:block" />

        {/* OS Logo Badge & Title (Click to open About Logo modal) */}
        <button
          type="button"
          onClick={() => setIsAboutOpen(true)}
          className="flex items-center gap-2 text-foreground font-bold font-sans shrink-0 px-2 py-1 -mx-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer group"
          title="Click to view ANUNAY OS Logo & System Overview"
          aria-label="Open ANUNAY OS Logo and System Information"
        >
          <div className="w-6 h-6 shrink-0 rounded-lg overflow-hidden relative shadow-xs border border-white/15 bg-[#070913] group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all duration-200">
            <img
              src="/anunay-os-logo-v2.png"
              alt="ANUNAY OS Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-xs tracking-tight text-foreground/90 group-hover:text-cyan-400 transition-colors">ANUNAY OS</span>
        </button>
      </div>

      {/* Center: Command Palette Search Bar */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4 flex justify-center shrink">
        <motion.button
          onClick={onOpenCommandPalette}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 900, damping: 25, mass: 0.15 }}
          className="w-full relative flex items-center justify-between gap-2.5 px-3.5 py-1.5 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-2xl border border-white/50 dark:border-white/20 shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.7),_inset_0_-1.5px_2px_0_rgba(0,0,0,0.08),_0_2px_12px_rgba(10,132,255,0.1)] group cursor-pointer overflow-hidden"
          aria-label="Open Command Palette Search"
        >
          {/* Top specular reflection glare line */}
          <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />

          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 z-10">
            <Search className="w-3.5 h-3.5 text-accent-blue shrink-0 group-hover:scale-110 transition-transform duration-100" />
            <span className="font-sans text-xs font-medium truncate text-muted-foreground group-hover:text-foreground transition-colors duration-100 hidden sm:inline">
              Search ANUNAY OS...
            </span>
            <span className="font-sans text-xs font-medium truncate text-muted-foreground group-hover:text-foreground transition-colors duration-100 sm:hidden">
              Search...
            </span>
          </div>
          <kbd className="hidden xs:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-white/50 dark:bg-white/10 border border-white/50 dark:border-white/15 text-muted-foreground shrink-0 shadow-2xs backdrop-blur-sm group-hover:border-accent-blue/40 transition-colors z-10">
            ⌘K
          </kbd>
        </motion.button>
      </div>

      {/* Right: Status, Resume, Theme & Date/Time */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 text-muted-foreground">
        {/* Liquid Glass System Kernel Version Pill */}
        <div className="hidden lg:flex relative overflow-hidden items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-600/30 dark:border-emerald-400/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold tracking-tight shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_2px_10px_rgba(16,185,129,0.15)]">
          <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent pointer-events-none" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981] shrink-0" />
          <span>v1.0 Kernel</span>
        </div>

        {/* Liquid Glass Quick Resume Access Button */}
        <motion.button
          onClick={() => onOpenWindow("resume")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 900, damping: 25, mass: 0.15 }}
          className="relative overflow-hidden flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/15 hover:bg-accent-blue/25 dark:bg-accent-blue/20 dark:hover:bg-accent-blue/30 text-accent-blue dark:text-sky-400 border border-accent-blue/40 dark:border-accent-blue/35 transition-colors duration-100 font-sans text-xs font-semibold tracking-tight shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_2px_12px_rgba(10,132,255,0.2)] cursor-pointer group"
          title="Open Resume Window"
        >
          {/* Top specular reflection glare line */}
          <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/40 to-transparent pointer-events-none" />
          <FileText className="w-3.5 h-3.5 shrink-0 transition-transform duration-100 group-hover:scale-110 text-accent-blue dark:text-sky-400" />
          <span className="hidden md:inline font-semibold">Resume</span>
        </motion.button>

        {/* Liquid Glass Date & Time Widget (Memoized subcomponent) */}
        <TopBarClock />
      </div>

      {/* About ANUNAY OS Logo Modal */}
      <AboutLogoModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </header>
  );
});

