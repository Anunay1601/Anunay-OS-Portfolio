"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore, WindowId } from "@/hooks/useOSStore";
import { TopBar } from "@/components/os/TopBar";
import { DockBar } from "@/components/os/DockBar";
import { OSWindow } from "@/components/os/OSWindow";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { DesktopWallpaper } from "@/components/os/DesktopWallpaper";

export default function OSDesktopPage() {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    toggleWindow,
    focusWindow,
  } = useOSStore();

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const openWindows = Object.values(windows).filter(
    (win) => win.isOpen && !win.isMinimized
  );

  const hasActiveWindow = openWindows.length > 0;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background select-none flex flex-col">
      {/* Ambient Glass Wallpaper Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-blue/10 via-background to-background pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-violet/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top System Bar */}
      <TopBar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenWindow={openWindow}
      />

      {/* Desktop Workspace Window Canvas */}
      <main className="relative flex-1 w-full overflow-hidden">
        {/* Emblem & Quick Launch Badge on Desktop when all windows are minimized */}
        <DesktopWallpaper
          hasActiveWindow={hasActiveWindow}
          onOpenWindow={openWindow}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        <AnimatePresence>
          {openWindows.map((winState) => (
            <OSWindow
              key={winState.id}
              windowState={winState}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={toggleMaximizeWindow}
              onFocus={focusWindow}
              isMobile={isMobile}
            />
          ))}
        </AnimatePresence>
      </main>

      {/* Dock Launcher Bar */}
      <DockBar
        windows={windows}
        onToggleWindow={toggleWindow}
        activeWindowId={activeWindowId}
      />

      {/* Command Palette Search Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectModule={openWindow}
      />
    </div>
  );
}

