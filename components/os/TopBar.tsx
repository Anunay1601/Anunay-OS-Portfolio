"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
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

export function TopBar({ onOpenCommandPalette, onOpenWindow }: TopBarProps) {
  const [dateTimeString, setDateTimeString] = useState<string>("");

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
      setDateTimeString(`${datePart}  •  ${timePart}`);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-11 w-full border-b border-border/60 bg-background/80 backdrop-blur-2xl px-3 sm:px-5 flex items-center justify-between z-40 select-none text-xs shadow-xs">
      {/* Left: Navigation, Branding Logo */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-all duration-150 px-2.5 py-1 rounded-apple-sm hover:bg-surface-hover group"
          title="Return to Recruiter Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline font-sans font-medium text-xs">Exit OS</span>
        </Link>

        <div className="h-4 w-px bg-border/70 shrink-0 hidden sm:block" />

        {/* OS Logo Badge & Title */}
        <div className="flex items-center gap-2 text-foreground font-bold font-sans shrink-0">
          <div className="w-5 h-5 shrink-0 rounded-md bg-gradient-to-tr from-accent-blue via-indigo-500 to-accent-violet flex items-center justify-center text-white text-[11px] font-mono font-bold shadow-xs">
            A
          </div>
          <span className="font-semibold text-xs tracking-tight">ANUNAY OS</span>
        </div>
      </div>

      {/* Center: Command Palette Search Bar */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4 flex justify-center shrink">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-apple-md bg-surface/90 hover:bg-surface-hover border border-border/80 hover:border-accent-blue/40 text-muted-foreground hover:text-foreground transition-all duration-200 group shadow-2xs"
          aria-label="Open Command Palette Search"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-3.5 h-3.5 text-accent-blue shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-sans text-xs font-medium truncate text-muted-foreground group-hover:text-foreground">
              Search ANUNAY OS...
            </span>
          </div>
          <kbd className="hidden xs:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium bg-surface-active/80 rounded border border-border text-muted-foreground shrink-0">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Status, Resume, Theme & Date/Time */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-muted-foreground">
        {/* System Kernel Version Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-medium shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>v1.0 Kernel</span>
        </div>

        {/* Quick Resume Access Button */}
        <button
          onClick={() => onOpenWindow("resume")}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-apple-sm bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue border border-accent-blue/30 transition-colors font-sans text-xs font-semibold shrink-0"
          title="Open Resume Window"
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden md:inline">Resume</span>
        </button>

        <div className="h-4 w-px bg-border/70 shrink-0" />

        {/* Theme Switcher */}
        <div className="shrink-0">
          <ThemeSwitcher />
        </div>

        {/* Date & Time Widget */}
        <div className="flex items-center gap-1.5 text-foreground font-medium text-xs whitespace-nowrap shrink-0 pl-0.5">
          <Clock className="w-3.5 h-3.5 text-accent-blue shrink-0 hidden sm:inline" />
          <span className="font-mono text-xs font-semibold">{dateTimeString || "Fri, Sep 18  •  10:16 PM"}</span>
        </div>
      </div>
    </header>
  );
}

