"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  ExternalLink,
  Laptop,
  Cpu,
  Layers,
  ZoomIn,
  ShieldCheck,
} from "lucide-react";

interface AboutLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchOS?: () => void;
}

export function AboutLogoModal({ isOpen, onClose, onLaunchOS }: AboutLogoModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isZoomed, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none overflow-y-auto">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md transition-opacity"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="relative w-full max-w-md my-auto max-h-[92vh] rounded-2xl border border-white/20 dark:border-white/10 bg-white/95 dark:bg-[#0D101C]/95 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-y-auto no-scrollbar z-10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="About ANUNAY OS Logo and System Information"
          >
            {/* Top specular reflection line */}
            <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-black/5 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  System Overview • Brand Identity
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/10 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 flex flex-col items-center text-center space-y-3.5">
              {/* Logo Presentation Area */}
              <div className="relative group cursor-pointer" onClick={() => setIsZoomed(!isZoomed)}>
                {/* Ambient glow behind logo */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-500/20 to-purple-500/25 blur-xl group-hover:blur-2xl transition-all duration-300 pointer-events-none" />

                <motion.div
                  animate={{ scale: isZoomed ? 1.35 : 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#070913] border border-cyan-500/30 shadow-[0_12px_36px_rgba(10,132,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105"
                >
                  <img
                    src="/anunay-os-logo-v2.png"
                    alt="ANUNAY OS Official Emblem Logo"
                    className="w-full h-full object-cover drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                  />
                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                    <ZoomIn className="w-5 h-5 text-white/90 drop-shadow" />
                  </div>
                </motion.div>
                <span className="text-[10px] font-mono text-muted-foreground mt-1.5 block group-hover:text-cyan-400 transition-colors">
                  {isZoomed ? "Click to reset zoom" : "Click logo to enlarge"}
                </span>
              </div>

              {/* Title & Badge */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-sans">
                    ANUNAY OS
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                    v1.0
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-sans max-w-sm">
                  Interactive Web Operating System & Engineering Portfolio
                </p>
              </div>

              {/* System Specs / Details Card */}
              <div className="w-full grid grid-cols-2 gap-2 text-left">
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Laptop className="w-3 h-3 text-cyan-400" />
                    <span>System Architect</span>
                  </span>
                  <p className="text-xs font-semibold text-foreground">Anunay Chhapre</p>
                  <p className="text-[10px] text-muted-foreground">Software & AI Engineer</p>
                </div>

                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-purple-400" />
                    <span>Engine Core</span>
                  </span>
                  <p className="text-xs font-semibold text-foreground">Next.js 14 App Router</p>
                  <p className="text-[10px] text-muted-foreground">React 18 • TypeScript</p>
                </div>

                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Layers className="w-3 h-3 text-emerald-400" />
                    <span>Graphics & 3D</span>
                  </span>
                  <p className="text-xs font-semibold text-foreground">VengeanceUI CSS3D</p>
                  <p className="text-[10px] text-muted-foreground">Keplerian Planetary Orbits</p>
                </div>

                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>Status</span>
                  </span>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Production Ready</p>
                  <p className="text-[10px] text-muted-foreground">Build 2026.10 • Zero Crash</p>
                </div>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="p-4 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-3">
              <span className="text-[10px] font-mono text-muted-foreground">
                Esc to dismiss
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-sans font-medium text-muted-foreground hover:text-foreground bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors border border-black/10 dark:border-white/10 cursor-pointer"
                >
                  Close
                </button>

                {onLaunchOS ? (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLaunchOS();
                    }}
                    className="px-4 py-1.5 rounded-xl text-xs font-sans font-semibold text-white bg-accent-blue hover:bg-accent-blue/90 shadow-md shadow-accent-blue/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Launch OS</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ) : (
                  <Link
                    href="/os"
                    onClick={onClose}
                    className="px-4 py-1.5 rounded-xl text-xs font-sans font-semibold text-white bg-accent-blue hover:bg-accent-blue/90 shadow-md shadow-accent-blue/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Launch OS</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
