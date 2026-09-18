"use client";

import React, { useState, useEffect, useRef } from "react";
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
  { id: "neural-core", title: "Neural Core", subtitle: "Interactive skill node network", category: "Module", icon: Cpu, windowId: "neural-core", sectionHash: "#hero" },
  { id: "automation-core", title: "Automation", subtitle: "n8n visual workflow engine", category: "Module", icon: Workflow, windowId: "automation-core" },
  { id: "terminal", title: "Terminal", subtitle: "CLI shell with interactive commands", category: "Module", icon: Terminal, windowId: "terminal" },
  { id: "resume", title: "Resume", subtitle: "Verified official CV & PDF download", category: "Module", icon: FileText, windowId: "resume" },
  { id: "contact", title: "Contact", subtitle: "Direct email & social redirects", category: "Module", icon: Mail, windowId: "contact", sectionHash: "#contact" },
];

export function CommandPalette({ isOpen, onClose, onSelectModule }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    } else {
      router.push("/os");
      if (item.windowId) {
        setTimeout(() => onSelectModule(item.windowId!), 100);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -12 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl rounded-2xl border border-white/20 dark:border-white/10 bg-white/95 dark:bg-[#10131E]/95 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col crisp-text select-none"
        >
          {/* Header Search Bar */}
          <div className="h-13 px-4 border-b border-border/80 flex items-center gap-3 bg-surface-hover/40">
            <Search className="w-4.5 h-4.5 text-accent-blue shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type to search commands (Projects, Skills, Terminal...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-surface border border-border rounded text-muted-foreground">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-apple-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
              aria-label="Close Command Palette"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filtered Commands List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
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
                    onClick={() => executeSelection(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full p-3 rounded-apple-lg flex items-center justify-between text-left cursor-pointer transition-all duration-150 border ${
                      isFocused
                        ? "bg-accent-blue/15 border-accent-blue/40 shadow-sm"
                        : "border-transparent hover:bg-surface/50"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-apple-md flex items-center justify-center transition-colors ${
                          isFocused
                            ? "bg-accent-blue text-white"
                            : "bg-surface border border-border/70 text-accent-blue"
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div
                          className={`text-xs font-bold tracking-tight font-sans ${
                            isFocused ? "text-accent-blue" : "text-foreground"
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="text-[11px] font-sans text-muted-foreground">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isFocused && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-accent-blue font-semibold">
                          <span>Press</span>
                          <CornerDownLeft className="w-3 h-3" />
                        </span>
                      )}
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isFocused ? "text-accent-blue translate-x-0.5" : "text-muted-foreground/50"
                        }`}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Access Tips */}
          <div className="px-4 py-2 bg-surface/40 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5 font-semibold text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ANUNAY OS Index</span>
            </span>
            <span className="hidden sm:inline">Use ↑ ↓ arrows to navigate • Enter to launch</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
