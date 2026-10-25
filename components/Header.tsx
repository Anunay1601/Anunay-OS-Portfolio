"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { AboutLogoModal } from "@/components/modals/AboutLogoModal";
import { profileData } from "@/data/profile";
import { Search } from "lucide-react";

export function Header() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          type="button"
          onClick={() => setIsLogoModalOpen(true)}
          className="flex items-center gap-2 group focus:outline-none cursor-pointer text-left"
          title="Click to open ANUNAY OS Logo & System Overview"
          aria-label="Open ANUNAY OS Logo and System Information"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.45)] transition-all duration-300 relative border border-white/20 bg-[#070913] shadow-md">
            <img
              src="/anunay-os-logo-v2.png"
              alt="ANUNAY OS Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground group-hover:text-accent-blue transition-colors">
              ANUNAY OS
            </span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest -mt-0.5">
              Portfolio v1.0
            </span>
          </div>
        </button>

        {/* Center/Right Nav Controls */}
        <div className="flex items-center gap-2.5">
          {/* Touch-Accessible Command Palette Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-apple-md border border-border bg-surface/60 hover:bg-surface hover:border-accent-blue/40 text-muted-foreground hover:text-foreground transition-all duration-200 shadow-xs group"
            aria-label="Search portfolio commands"
            title="Search Portfolio (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-accent-blue group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline text-xs font-sans font-medium">Search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-surface border border-border rounded text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          <Navigation />
          <div className="h-4 w-px bg-border hidden md:block" />
          <ThemeSwitcher />
        </div>
      </div>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectModule={() => {}}
      />

      {/* About ANUNAY OS Logo Modal */}
      <AboutLogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </header>
  );
}
