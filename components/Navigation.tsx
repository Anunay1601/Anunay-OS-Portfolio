"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <nav className="relative z-50">
      {/* Desktop Navigation links */}
      <div className="hidden md:flex items-center gap-1.5 bg-surface/60 backdrop-blur-md p-1.5 rounded-apple-lg border border-border">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.highlight) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-accent-blue hover:bg-accent-blue/90 rounded-apple-md shadow-sm transition-all duration-200 hover:scale-[1.02]"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-apple-md transition-colors duration-200",
                isActive
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Navigation Menu"
        className="md:hidden p-2 rounded-apple-md border border-border bg-surface/80 text-foreground"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-12 right-0 w-56 p-2 rounded-apple-lg border border-border bg-surface/95 backdrop-blur-xl shadow-apple-window flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium rounded-apple-md transition-colors",
                  item.highlight
                    ? "bg-accent-blue text-white font-semibold"
                    : "text-foreground hover:bg-surface/80"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
