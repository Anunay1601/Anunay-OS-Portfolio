"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/projects";
import {
  Cpu,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  Brain,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import {
  SolarSystem,
  SolarSystemItem,
  OrbitConfig,
  SolarSystemIcons,
} from "@/components/ui/solar-system";

export interface CoreNode {
  id: string;
  label: string;
  category: "AI/ML" | "Language" | "Frontend" | "Automation";
  description: string;
  associatedProjects: string[];
  associatedSkills: string[];
  color: string;
  glowColor: string;
}

const CATEGORY_COLORS: Record<CoreNode["category"], { color: string; glow: string; label: string }> = {
  "AI/ML": { color: "#4F8CFF", glow: "rgba(79, 140, 255, 0.4)", label: "AI & ML" },
  Language: { color: "#8B5CF6", glow: "rgba(139, 92, 246, 0.4)", label: "Languages" },
  Frontend: { color: "#10B981", glow: "rgba(16, 185, 129, 0.4)", label: "Frontend" },
  Automation: { color: "#F59E0B", glow: "rgba(245, 158, 11, 0.4)", label: "Automation" },
};

export const CORE_SKILLS: CoreNode[] = [
  {
    id: "react",
    label: "React & TS",
    category: "Frontend",
    description: "Modern component-driven UIs, TypeScript safety, state management & 3D WebGL experiences.",
    associatedProjects: ["atithi-vms", "shriji-polymers-3d", "privacyshield-ai"],
    associatedSkills: ["React 18", "TypeScript", "Next.js", "Tailwind CSS", "React Three Fiber"],
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
  {
    id: "python",
    label: "Python",
    category: "Language",
    description: "Core language for AI services, Flask microservices, speech synthesis & backend integration.",
    associatedProjects: ["atithi-vms", "privacyshield-ai", "atlas-voice-assistant"],
    associatedSkills: ["Python 3", "Flask", "PyTTSx3", "REST APIs"],
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  {
    id: "ai",
    label: "AI & GenAI",
    category: "AI/ML",
    description: "Generative AI integration, OpenAI API, LLM document security & voice command agents.",
    associatedProjects: ["privacyshield-ai", "atlas-voice-assistant"],
    associatedSkills: ["OpenAI API", "Generative AI", "n8n", "Speech Recognition"],
    color: "#0A84FF",
    glowColor: "rgba(10, 132, 255, 0.5)",
  },
  {
    id: "automation",
    label: "Automation",
    category: "Automation",
    description: "Visual workflow engines, n8n pipelines, Telegram Bot alerts & document redaction workflows.",
    associatedProjects: ["privacyshield-ai", "atithi-vms", "atlas-voice-assistant"],
    associatedSkills: ["n8n", "Telegram Bot API", "Workflow Orchestration", "OS Automation"],
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  {
    id: "ml",
    label: "Machine Learning",
    category: "AI/ML",
    description: "Applied Machine Learning algorithms, risk scoring models & face recognition microservices.",
    associatedProjects: ["atithi-vms", "privacyshield-ai"],
    associatedSkills: ["Applied ML in Python", "Face Recognition", "Privacy Exposure Scoring"],
    color: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.5)",
  },
  {
    id: "java",
    label: "Java",
    category: "Language",
    description: "Enterprise software architecture, Spring Boot frameworks & object-oriented programming.",
    associatedProjects: ["atithi-vms"],
    associatedSkills: ["Java", "Spring Boot", "OOP", "Data Structures & Algorithms"],
    color: "#C084FC",
    glowColor: "rgba(192, 132, 252, 0.5)",
  },
];

export function NeuralCore() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isCoreOpen, setIsCoreOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const selectedNode = useMemo(
    () => CORE_SKILLS.find((n) => n.id === selectedNodeId) || null,
    [selectedNodeId]
  );

  // Map CORE_SKILLS to VengeanceUI SolarSystem OrbitConfig layers
  const orbits: OrbitConfig[] = useMemo(() => {
    const getNodeItem = (id: string, defaultSvg: React.ReactNode): SolarSystemItem => {
      const node = CORE_SKILLS.find((n) => n.id === id)!;
      const isDimmed = activeCategory !== null && node.category !== activeCategory;
      return {
        id: node.id,
        label: node.label,
        type: node.category,
        desc: node.description,
        category: node.category,
        associatedSkills: node.associatedSkills,
        associatedProjects: node.associatedProjects,
        color: node.color,
        svg: defaultSvg,
        isDimmed,
      };
    };

    return [
      {
        id: "inner",
        name: "Inner Orbit",
        radiusClass: "var(--radius-inner)",
        radiusPx: 140,
        speed: 22,
        items: [
          getNodeItem("react", SolarSystemIcons.react),
          getNodeItem("python", SolarSystemIcons.python),
        ],
      },
      {
        id: "mid",
        name: "Middle Orbit",
        radiusClass: "var(--radius-mid)",
        radiusPx: 235,
        speed: 34,
        items: [
          getNodeItem("ai", SolarSystemIcons.ai),
          getNodeItem("automation", SolarSystemIcons.automation),
        ],
      },
      {
        id: "outer",
        name: "Outer Orbit",
        radiusClass: "var(--radius-outer)",
        radiusPx: 330,
        speed: 46,
        items: [
          getNodeItem("ml", SolarSystemIcons.ml),
          getNodeItem("java", SolarSystemIcons.java),
        ],
      },
    ];
  }, [activeCategory]);

  const toggleSpeed = () => {
    setSpeedMultiplier((prev) => {
      if (prev === 1) return 1.5;
      if (prev === 1.5) return 2;
      return 1;
    });
  };

  return (
    <div
      className="relative w-full h-full min-h-[360px] rounded-2xl border border-white/[0.08] bg-[#0E1015] overflow-hidden select-none flex flex-col justify-between shadow-2xl"
      tabIndex={0}
      aria-label="Solar System interactive technology core."
    >
      {/* Background Subtle Graphic Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Refined Header Bar with Category Filter Chips & Controls */}
      <div className="relative z-30 p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] bg-[#111319]/90 backdrop-blur-md">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-mono font-medium text-foreground shadow-sm">
          <Zap className="w-3.5 h-3.5 text-accent-blue" />
          <span className="hidden xs:inline">NEURAL CORE</span>
          <span className="text-[10px] text-muted-foreground font-mono">v1.0</span>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium transition-all cursor-pointer ${
              activeCategory === null
                ? "bg-accent-blue/90 text-white shadow-sm"
                : "bg-white/40 dark:bg-white/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {Object.entries(CATEGORY_COLORS).map(([catKey, catVal]) => {
            const isActive = activeCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(isActive ? null : catKey)}
                className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium transition-all cursor-pointer ${
                  isActive
                    ? "text-white shadow-sm"
                    : "bg-white/40 dark:bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
                style={isActive ? { backgroundColor: catVal.color } : {}}
              >
                {catVal.label}
              </button>
            );
          })}
        </div>

        {/* Play/Pause & Speed Controller */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-1 sm:p-1.5 rounded-full bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/20 dark:border-white/10 transition-colors cursor-pointer"
            title={isPaused ? "Resume rotation" : "Pause rotation"}
            aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
          </button>
          <button
            onClick={toggleSpeed}
            className="px-2 py-0.5 rounded-full bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 text-[10px] font-mono font-semibold text-muted-foreground hover:text-foreground border border-white/20 dark:border-white/10 transition-colors cursor-pointer"
            title="Toggle rotation speed"
            aria-label="Toggle rotation speed"
          >
            {speedMultiplier}x
          </button>
        </div>
      </div>

      {/* Main Solar System Display Area */}
      <div 
        className="relative flex-1 w-full flex items-center justify-center overflow-hidden min-h-[300px]"
        onClick={() => {
          setSelectedNodeId(null);
          setIsCoreOpen(false);
        }}
      >
        <SolarSystem
          centerLogo="/anunay-os-logo-v2.png"
          centerLogoAlt="ANUNAY OS Engine Core"
          onCenterLogoClick={() => {
            setIsCoreOpen((prev) => !prev);
            setSelectedNodeId(null);
          }}
          orbits={orbits}
          isPaused={isPaused}
          speedMultiplier={speedMultiplier}
          selectedItemId={selectedNodeId}
          onItemClick={(item) => {
            setIsCoreOpen(false);
            setSelectedNodeId((prev) => (prev === item.id ? null : item.id));
          }}
          className="w-full h-full"
        />

        {/* Central Core Engine Details Floating Overlay */}
        <AnimatePresence>
          {isCoreOpen && (
            <motion.div
              key="core-engine-overlay"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 left-3 right-3 z-50 p-4 rounded-apple-xl border border-teal-500/30 bg-white/95 dark:bg-[#0D121F]/95 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] max-w-lg mx-auto space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-border/80 dark:border-white/10 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-apple-md bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-mono font-bold text-xs backdrop-blur-md shadow-sm">
                    <Cpu className="w-4 h-4 text-teal-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground tracking-tight flex items-center gap-1.5">
                      <span>ANUNAY CORE ENGINE</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 font-semibold">
                        v1.0
                      </span>
                    </h4>
                    <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-teal-400">
                      Central Processing Hub • Active
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCoreOpen(false)}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground bg-surface-hover/80 hover:bg-surface-active transition-colors border border-white/10 cursor-pointer"
                  aria-label="Close core details"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-foreground/90 font-sans leading-relaxed">
                The centralized neural orchestration unit coordinating Anunay’s full technology ecosystem. Harmonizes 3 active orbital layers across AI/ML pipelines, programming languages, and automation workflows.
              </p>

              {/* System Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 rounded-lg bg-surface/40 dark:bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-muted-foreground">Active Orbits</span>
                  <p className="text-foreground font-semibold">3 Concentric Rings</p>
                </div>
                <div className="p-2 rounded-lg bg-surface/40 dark:bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-muted-foreground">Orchestrated Skills</span>
                  <p className="text-foreground font-semibold">6 Verified Modules</p>
                </div>
                <div className="p-2 rounded-lg bg-surface/40 dark:bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-muted-foreground">Rotation Velocity</span>
                  <p className="text-teal-400 font-semibold">{speedMultiplier}x Speed Multiplier</p>
                </div>
                <div className="p-2 rounded-lg bg-surface/40 dark:bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-muted-foreground">Telemetry Status</span>
                  <p className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>100% Operational</span>
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-1 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-muted-foreground">
                  Click any orbiting planet to view skill details
                </span>
                <Link
                  href="/os"
                  onClick={() => setIsCoreOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-apple-md text-[11px] font-mono font-semibold bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 backdrop-blur-md transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Launch OS</span>
                  <ArrowRight className="w-3 h-3 text-teal-300" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Selected Node Details Floating Overlay */}
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 left-3 right-3 z-50 p-4 rounded-apple-xl border border-white/40 dark:border-white/20 bg-white/90 dark:bg-[#10131E]/95 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] max-w-lg mx-auto space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-border/80 dark:border-white/10 pb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-apple-md flex items-center justify-center text-white font-mono font-bold text-xs backdrop-blur-md shadow-sm"
                    style={{ backgroundColor: selectedNode.color }}
                  >
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground tracking-tight">
                      {selectedNode.label}
                    </h4>
                    <span
                      className="text-[9px] font-mono font-semibold uppercase tracking-wider"
                      style={{ color: selectedNode.color }}
                    >
                      {selectedNode.category} Orbit Node
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground bg-surface-hover/80 hover:bg-surface-active transition-colors border border-white/10 cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-foreground/90 font-sans leading-relaxed">
                {selectedNode.description}
              </p>

              {/* Connected Skills */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-foreground font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-accent-blue" />
                  <span>Associated Stack</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.associatedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-apple-sm text-[10px] font-mono bg-white/70 dark:bg-white/10 text-foreground border border-white/20 dark:border-white/10 font-medium shadow-sm backdrop-blur-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Systems */}
              {selectedNode.associatedProjects.length > 0 && (
                <div className="space-y-1 pt-0.5">
                  <span className="text-[10px] font-mono text-foreground font-semibold flex items-center gap-1">
                    <Layers className="w-3 h-3 text-accent-violet" />
                    <span>Verified Projects</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.associatedProjects.map((projId) => {
                      const proj = projectsData.find((p) => p.id === projId);
                      if (!proj) return null;
                      return (
                        <Link
                          key={proj.id}
                          href="/#projects"
                          onClick={() => setSelectedNodeId(null)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-apple-md text-[11px] font-mono font-semibold bg-accent-blue/15 hover:bg-accent-blue/30 text-accent-blue border border-accent-blue/40 backdrop-blur-md transition-all duration-150 shadow-sm active:scale-95 cursor-pointer"
                        >
                          <span>{proj.title}</span>
                          <ArrowRight className="w-3 h-3 text-accent-blue" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glassy Apple Footer Bar */}
      <div className="relative z-20 px-3 sm:px-4 py-2 bg-white/90 dark:bg-[#101420]/90 border-t border-white/30 dark:border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-muted-foreground shadow-lg rounded-b-apple-xl">
        <span className="flex items-center gap-1.5 font-semibold text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Orbits: 3 Active • 6 Skills</span>
          {activeCategory && <span className="hidden sm:inline">• Filter: {activeCategory}</span>}
        </span>
        <span className="text-muted-foreground flex items-center gap-1">
          <span>Click core or planet to inspect</span>
          <span className="hidden sm:inline">• Hover for orbital beam</span>
        </span>
      </div>
    </div>
  );
}
