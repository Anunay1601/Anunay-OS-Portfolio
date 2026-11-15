"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WindowId } from "@/hooks/useOSStore";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  X,
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
  ArrowRight,
  GraduationCap,
  CornerDownLeft,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (id: WindowId) => void;
}

export interface CommandItem {
  id: WindowId | string;
  title: string;
  subtitle: string;
  category: "Module" | "Section" | "Action";
  icon: React.ComponentType<{ className?: string }>;
  sectionHash?: string;
  windowId?: WindowId;
}

const MODULES: CommandItem[] = [
  { id: "project-lab", title: "Projects", subtitle: "Software systems & live code previews", category: "Module", icon: FolderGit2, windowId: "project-lab", sectionHash: "#projects" },
  { id: "dev-env", title: "Skills", subtitle: "Interconnected technology & stack matrix", category: "Module", icon: Code2, windowId: "dev-env", sectionHash: "#skills" },
  { id: "system-logs", title: "Experience", subtitle: "Workplace deployments & internships", category: "Module", icon: History, windowId: "system-logs", sectionHash: "#experience" },
  { id: "education", title: "Education", subtitle: "Academic degree & CGPA details", category: "Module", icon: GraduationCap, windowId: "system-logs", sectionHash: "#education" },
  { id: "credential-vault", title: "Certifications", subtitle: "Verified technical credentials", category: "Module", icon: Award, windowId: "credential-vault", sectionHash: "#certifications" },
  { id: "neural-core", title: "Neural Core", subtitle: "Interactive skill node network", category: "Module", icon: Cpu, windowId: "neural-core", sectionHash: "#about" },
  { id: "automation-core", title: "Automation", subtitle: "n8n visual workflow engine", category: "Module", icon: Workflow, windowId: "automation-core" },
  { id: "terminal", title: "Terminal", subtitle: "CLI shell with interactive commands", category: "Module", icon: Terminal, windowId: "terminal" },
  { id: "resume", title: "Resume", subtitle: "Verified official CV & PDF download", category: "Module", icon: FileText, windowId: "resume" },
  { id: "contact", title: "Contact", subtitle: "Direct email & social redirects", category: "Module", icon: Mail, windowId: "contact" },
];

export function CommandPalette({ isOpen, onClose, onSelectModule }: CommandPaletteProps) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = MODULES.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length === 0 ? 0 : (prev + 1) % filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length === 0 ? 0 : (prev - 1 + filtered.length) % filtered.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered.length > 0 && filtered[selectedIndex]) {
          executeSelection(filtered[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  const executeSelection = (item: CommandItem) => {
    onClose();
    if (pathname === "/os" && item.windowId) {
      onSelectModule(item.windowId);
    } else if (item.sectionHash) {
      router.push(`/${item.sectionHash}`);
    } else if (item.windowId === "resume") {
      router.push("/resume");
    } else if (item.windowId) {
      router.push(`/os?open=${item.windowId}`);
    } else {
      router.push("/os");
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command Search Palette"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl apple-liquid-palette overflow-hidden flex flex-col crisp-text select-none relative shadow-2xl"
          >
            {/* Top specular reflection glare line */}
            <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 dark:via-white/40 to-transparent pointer-events-none z-20" />

            {/* Header Search Bar with generous Apple padding & precise icon alignment */}
            <div className="h-16 px-4 sm:px-6 border-b border-black/5 dark:border-white/10 flex items-center gap-2 sm:gap-3.5 bg-white/20 dark:bg-white/[0.03]">
              <Search className="w-5 h-5 text-accent-blue shrink-0" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={filtered.length > 0}
                aria-autocomplete="list"
                aria-controls="command-palette-results"
                aria-label="Search modules and commands"
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-sm sm:text-base font-sans font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <kbd className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-mono rounded-full bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/15 text-muted-foreground shrink-0 shadow-2xs">
                ESC
              </kbd>
              <button
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 flex items-center justify-center bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 border border-white/30 dark:border-white/15 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer ml-1"
                aria-label="Close Command Palette"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </button>
            </div>

            {/* Filtered Commands List */}
            <div
              id="command-palette-results"
              role="listbox"
              aria-label="Search results"
              className="max-h-80 overflow-y-auto p-2.5 sm:p-3 space-y-1.5 scroll-smooth"
            >
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-muted-foreground">
                  No matching modules or commands found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isFocused = idx === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isFocused}
                      tabIndex={0}
                      onClick={() => executeSelection(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          executeSelection(item);
                        }
                      }}
                      className={`w-full p-2.5 sm:p-3 rounded-2xl flex items-center justify-between text-left cursor-pointer transition-all duration-150 ease-out hover:translate-x-0.5 border ${
                        isFocused
                          ? "bg-accent-blue/15 dark:bg-accent-blue/25 border-accent-blue/40 shadow-[0_4px_20px_rgba(10,132,255,0.2),_inset_0_1px_1px_rgba(255,255,255,0.25)]"
                          : "border-transparent hover:bg-white/20 dark:hover:bg-white/[0.06] hover:border-white/20 dark:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all liquid-glass-btn shrink-0 ${
                            isFocused
                              ? "bg-gradient-to-tr from-accent-blue to-indigo-600 text-white shadow-md shadow-accent-blue/35 border border-white/40"
                              : "bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/15 text-accent-blue"
                          }`}
                        >
                          <Icon className="w-5 h-5 relative z-10" />
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-xs sm:text-sm font-semibold tracking-tight font-sans truncate ${
                              isFocused ? "text-accent-blue dark:text-sky-300" : "text-foreground"
                            }`}
                          >
                            {item.title}
                          </div>
                          <div className="text-[11px] font-sans text-muted-foreground truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pl-2">
                        {isFocused && (
                          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-blue/20 border border-accent-blue/35 text-[10px] font-mono text-accent-blue font-semibold">
                            <span>Press</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </span>
                        )}
                        <ArrowRight
                          className={`w-4 h-4 transition-transform duration-150 ${
                            isFocused ? "text-accent-blue translate-x-0.5" : "text-muted-foreground/40"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Access Tips */}
            <div className="px-6 py-2.5 bg-white/10 dark:bg-black/25 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span>ANUNAY OS Index</span>
              </span>
              <span className="hidden sm:inline">Use ↑ ↓ arrows to navigate • Enter to launch</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
