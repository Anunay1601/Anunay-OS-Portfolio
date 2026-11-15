"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal, FileText, Monitor, FolderGit2, User, Briefcase, Award, GraduationCap } from "lucide-react";

export const navItems = [
  { name: "About", href: "/#about", icon: User },
  { name: "Projects", href: "/#projects", icon: FolderGit2 },
  { name: "Skills", href: "/#skills", icon: Terminal },
  { name: "Experience", href: "/#experience", icon: Briefcase },
  { name: "Education", href: "/#education", icon: GraduationCap },
  { name: "Certifications", href: "/#certifications", icon: Award },
  { name: "Resume", href: "/resume", icon: FileText },
  { name: "Launch OS", href: "/os", icon: Monitor, highlight: true },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <nav className="relative z-50">
      {/* Desktop Navigation links - VengeanceUI Glass Dock Style */}
      <div
        onMouseLeave={() => setHoveredItem(null)}
        className="glass-dock relative hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-[#0B0F19]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.37),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 group"
      >
        {/* Top Specular Glare Reflection Line */}
        <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none" />

        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-blue/15 via-white/5 to-accent-blue/15 blur-lg opacity-30 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none -z-10" />

        {navItems
          .filter((item) => item.name !== "About" && item.name !== "Certifications")
          .map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isHovered = hoveredItem === item.name;

            if (item.highlight) {
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05, y: -1.5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                >
                  <Link
                    href={item.href}
                    className="relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-accent-blue hover:bg-accent-blue/90 rounded-xl shadow-[0_4px_15px_rgba(79,140,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-accent-blue/40 transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05, y: -1.5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                onMouseEnter={() => setHoveredItem(item.name)}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-[#F5F5F7]"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>

                {/* Animated Glass Dock Highlight Pill */}
                {isHovered && (
                  <motion.div
                    layoutId="glass-dock-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute inset-0 rounded-xl bg-white/15 dark:bg-white/[0.08] border border-white/20 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none"
                  />
                )}

                {/* Active Indicator when not hovered */}
                {isActive && !isHovered && (
                  <div className="absolute inset-0 rounded-xl bg-white/10 dark:bg-white/[0.05] border border-white/15 dark:border-white/[0.08] pointer-events-none" />
                )}
              </motion.div>
            );
          })}
      </div>

      {/* Mobile Toggle Button - Glass Dock style */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Navigation Menu"
        aria-expanded={mobileMenuOpen}
        className="lg:hidden p-2 rounded-xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/60 backdrop-blur-xl text-[#F5F5F7] shadow-md"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Mobile Menu Dropdown - Glass Dock style with Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden absolute top-12 right-0 w-56 p-2 rounded-2xl border border-white/20 dark:border-white/10 bg-[#0B0F19]/[0.98] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.75)] flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium rounded-xl transition-all",
                    item.highlight
                      ? "bg-accent-blue text-white font-semibold shadow-[0_4px_15px_rgba(79,140,255,0.35)]"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.08]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
}
