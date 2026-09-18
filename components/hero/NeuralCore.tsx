"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "next-themes";
import { projectsData } from "@/data/projects";
import {
  Cpu,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  Code,
  Zap,
  Activity,
  Brain,
  Workflow,
  Terminal,
  Filter,
} from "lucide-react";
import Link from "next/link";

export interface CoreNode {
  id: string;
  label: string;
  category: "AI/ML" | "Language" | "Frontend" | "Automation";
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  baseRadius: number;
  connections: string[]; // node IDs
  description: string;
  associatedProjects: string[]; // project IDs
  associatedSkills: string[];
  color: string; // hex accent
  glowColor: string;
}

const CATEGORY_COLORS: Record<CoreNode["category"], { color: string; glow: string; label: string }> = {
  "AI/ML": { color: "#0A84FF", glow: "rgba(10, 132, 255, 0.4)", label: "AI & ML" },
  Language: { color: "#A855F7", glow: "rgba(168, 85, 247, 0.4)", label: "Languages" },
  Frontend: { color: "#10B981", glow: "rgba(16, 185, 129, 0.4)", label: "Frontend" },
  Automation: { color: "#F59E0B", glow: "rgba(245, 158, 11, 0.4)", label: "Automation" },
};

const NODES: CoreNode[] = [
  {
    id: "ai",
    label: "AI & GenAI",
    category: "AI/ML",
    x: 50,
    y: 24,
    baseRadius: 20,
    connections: ["ml", "python", "automation", "react"],
    description: "Generative AI integration, OpenAI API, LLM document security & voice command agents.",
    associatedProjects: ["privacyshield-ai", "atlas-voice-assistant"],
    associatedSkills: ["OpenAI API", "Generative AI", "n8n", "Speech Recognition"],
    color: "#0A84FF",
    glowColor: "rgba(10, 132, 255, 0.5)",
  },
  {
    id: "ml",
    label: "Machine Learning",
    category: "AI/ML",
    x: 78,
    y: 42,
    baseRadius: 17,
    connections: ["ai", "python", "automation"],
    description: "Applied Machine Learning algorithms, risk scoring models & face recognition microservices.",
    associatedProjects: ["atithi-vms", "privacyshield-ai"],
    associatedSkills: ["Applied ML in Python", "Face Recognition", "Privacy Exposure Scoring"],
    color: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.5)",
  },
  {
    id: "python",
    label: "Python",
    category: "Language",
    x: 72,
    y: 64,
    baseRadius: 17,
    connections: ["ai", "ml", "automation"],
    description: "Core language for AI services, Flask microservices, speech synthesis & backend integration.",
    associatedProjects: ["atithi-vms", "privacyshield-ai", "atlas-voice-assistant"],
    associatedSkills: ["Python 3", "Flask", "PyTTSx3", "REST APIs"],
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  {
    id: "java",
    label: "Java",
    category: "Language",
    x: 28,
    y: 64,
    baseRadius: 16,
    connections: ["react", "python"],
    description: "Enterprise software architecture, Spring Boot frameworks & object-oriented programming.",
    associatedProjects: ["atithi-vms"],
    associatedSkills: ["Java", "Spring Boot", "OOP", "Data Structures & Algorithms"],
    color: "#C084FC",
    glowColor: "rgba(192, 132, 252, 0.5)",
  },
  {
    id: "react",
    label: "React & TS",
    category: "Frontend",
    x: 22,
    y: 42,
    baseRadius: 19,
    connections: ["ai", "java", "automation"],
    description: "Modern component-driven UIs, TypeScript safety, state management & 3D WebGL experiences.",
    associatedProjects: ["atithi-vms", "shriji-polymers-3d", "privacyshield-ai"],
    associatedSkills: ["React 18", "TypeScript", "Next.js", "Tailwind CSS", "React Three Fiber"],
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
  {
    id: "automation",
    label: "Automation",
    category: "Automation",
    x: 50,
    y: 64,
    baseRadius: 17,
    connections: ["ai", "ml", "python", "react"],
    description: "Visual workflow engines, n8n pipelines, Telegram Bot alerts & document redaction workflows.",
    associatedProjects: ["privacyshield-ai", "atithi-vms", "atlas-voice-assistant"],
    associatedSkills: ["n8n", "Telegram Bot API", "Workflow Orchestration", "OS Automation"],
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
];

interface PulseParticle {
  fromId: string;
  toId: string;
  progress: number;
  speed: number;
  length: number;
}

export function NeuralCore() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<CoreNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Global document click listener: dismiss selected node when clicking anywhere outside container
  useEffect(() => {
    if (!selectedNode) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedNode(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedNode]);

  // Dynamic canvas animation loop with futuristic radar orbits & comet energy streams
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let lastTime = performance.now();
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const pulses: PulseParticle[] = [];
    NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        pulses.push({
          fromId: node.id,
          toId: targetId,
          progress: Math.random(),
          speed: 0.0025 + Math.random() * 0.0035,
          length: 0.12 + Math.random() * 0.1,
        });
      });
    });

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getNodePos = (node: CoreNode, currentTime: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const floatX = prefersReducedMotion ? 0 : Math.sin(currentTime * 0.0012 + node.x) * 5;
      const floatY = prefersReducedMotion ? 0 : Math.cos(currentTime * 0.0014 + node.y) * 5;

      const rawCx = (node.x / 100) * w + floatX;
      const rawCy = (node.y / 100) * h + floatY;

      const cx = Math.max(node.baseRadius + 45, Math.min(rawCx, w - node.baseRadius - 45));
      const cy = Math.max(node.baseRadius + 50, Math.min(rawCy, h - node.baseRadius - 70));

      return { cx, cy };
    };

    const render = (now: number) => {
      if (!isVisible || document.hidden) {
        lastTime = now;
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min(now - lastTime, 32); // cap delta at 32ms to prevent large jumps
      lastTime = now;
      time += delta;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const isDarkMode = document.documentElement.classList.contains("dark");
      const centerCx = w / 2;
      const centerCy = h / 2 - 10;

      // 0. Render Futuristic Radar Orbit Rings & Crosshairs
      if (!prefersReducedMotion) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.05)";

        // Concentric Orbit Circles
        [0.22, 0.36, 0.48].forEach((scale) => {
          ctx.beginPath();
          ctx.arc(centerCx, centerCy, w * scale, 0, Math.PI * 2);
          ctx.setLineDash([4, 6]);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        // Rotating Scanner Sweep Ray
        const scannerAngle = (time * 0.0004) % (Math.PI * 2);
        const sweepLen = w * 0.42;
        const sweepGrad = ctx.createLinearGradient(
          centerCx,
          centerCy,
          centerCx + Math.cos(scannerAngle) * sweepLen,
          centerCy + Math.sin(scannerAngle) * sweepLen
        );
        sweepGrad.addColorStop(0, "rgba(10, 132, 255, 0.15)");
        sweepGrad.addColorStop(1, "rgba(10, 132, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(centerCx, centerCy);
        ctx.arc(centerCx, centerCy, sweepLen, scannerAngle - 0.25, scannerAngle);
        ctx.closePath();
        ctx.fillStyle = sweepGrad;
        ctx.fill();

        ctx.restore();
      }

      const defaultLineColor = isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)";

      // 1. Draw Connection Lines
      NODES.forEach((node) => {
        const posA = getNodePos(node, time);
        const isNodeDimmed = activeCategory && node.category !== activeCategory;

        node.connections.forEach((targetId) => {
          const targetNode = NODES.find((n) => n.id === targetId);
          if (!targetNode) return;

          const posB = getNodePos(targetNode, time);

          const isConnectedToHovered =
            hoveredNodeId && (node.id === hoveredNodeId || targetId === hoveredNodeId);
          const isConnectedToSelected =
            selectedNode && (node.id === selectedNode.id || targetId === selectedNode.id);

          ctx.beginPath();
          ctx.moveTo(posA.cx, posA.cy);
          ctx.lineTo(posB.cx, posB.cy);

          if (isConnectedToHovered || isConnectedToSelected) {
            const grad = ctx.createLinearGradient(posA.cx, posA.cy, posB.cx, posB.cy);
            grad.addColorStop(0, node.color);
            grad.addColorStop(1, targetNode.color);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.2;
          } else {
            ctx.strokeStyle = isNodeDimmed ? "rgba(255, 255, 255, 0.02)" : defaultLineColor;
            ctx.lineWidth = 1;
          }

          ctx.setLineDash(isConnectedToHovered ? [] : [3, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      });

      // 2. Animate Travelling Comet Energy Streams
      if (!prefersReducedMotion) {
        pulses.forEach((p) => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;

          const nodeA = NODES.find((n) => n.id === p.fromId);
          const nodeB = NODES.find((n) => n.id === p.toId);
          if (!nodeA || !nodeB) return;

          if (activeCategory && nodeA.category !== activeCategory && nodeB.category !== activeCategory) {
            return;
          }

          const posA = getNodePos(nodeA, time);
          const posB = getNodePos(nodeB, time);

          const startP = Math.max(0, p.progress - p.length);
          const endP = p.progress;

          const x1 = posA.cx + (posB.cx - posA.cx) * startP;
          const y1 = posA.cy + (posB.cy - posA.cy) * startP;
          const x2 = posA.cx + (posB.cx - posA.cx) * endP;
          const y2 = posA.cy + (posB.cy - posA.cy) * endP;

          const cometGrad = ctx.createLinearGradient(x1, y1, x2, y2);
          cometGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
          cometGrad.addColorStop(1, nodeA.color);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = cometGrad;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Leading Head Glow Dot
          ctx.beginPath();
          ctx.arc(x2, y2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
        });
      }

      // 3. Draw Luminous Radial Core Nodes
      NODES.forEach((node) => {
        const { cx, cy } = getNodePos(node, time);
        const isHovered = hoveredNodeId === node.id;
        const isSelected = selectedNode?.id === node.id;
        const isDimmed = activeCategory && node.category !== activeCategory;

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.35 : 1;

        // Concentric Pulsing Ring
        if (!prefersReducedMotion && (isHovered || isSelected || node.id === "ai" || node.id === "react")) {
          const ringRadius = node.baseRadius + ((time * 0.02 + node.x * 5) % 22);
          const ringOpacity = Math.max(0, 1 - (ringRadius - node.baseRadius) / 22) * 0.4;

          ctx.beginPath();
          ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = node.glowColor.replace("0.5", String(ringOpacity));
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        // Outer Luminous Glow Aura
        const auraRadius = isHovered || isSelected ? node.baseRadius * 2.5 : node.baseRadius * 1.8;
        const glowGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, auraRadius);
        glowGrad.addColorStop(0, node.glowColor);
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.beginPath();
        ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Node Outer Ring & Fill
        const currentRadius = isHovered ? node.baseRadius * 1.15 : node.baseRadius;
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);

        const nodeBodyGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentRadius);
        nodeBodyGrad.addColorStop(0, isDarkMode ? "#1C2030" : "#FFFFFF");
        nodeBodyGrad.addColorStop(1, isDarkMode ? "#0F121C" : "#F0F3F8");
        ctx.fillStyle = nodeBodyGrad;
        ctx.fill();

        ctx.lineWidth = isHovered || isSelected ? 2.2 : 1.5;
        ctx.strokeStyle = isHovered || isSelected ? node.color : isDarkMode ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.15)";
        ctx.stroke();

        // Central Luminous Core Dot
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        ctx.restore();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [hoveredNodeId, selectedNode, activeCategory, prefersReducedMotion, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[360px] rounded-apple-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-[#0C0E17]/40 backdrop-blur-3xl overflow-hidden select-none flex flex-col justify-between shadow-2xl"
      tabIndex={0}
      aria-label="Neural Core interactive technology graph."
    >
      {/* Background Subtle Graphic Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--muted) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Glass Header Bar with Category Filter Chips */}
      <div className="relative z-20 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 dark:border-white/5 bg-white/30 dark:bg-[#101320]/40 backdrop-blur-2xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 dark:border-white/15 bg-white/70 dark:bg-[#121624]/80 backdrop-blur-2xl text-xs font-mono font-semibold text-foreground shadow-sm">
          <Zap className="w-3.5 h-3.5 text-accent-blue animate-pulse" />
          <span>ANUNAY CORE v1.0</span>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium transition-all ${
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
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium transition-all ${
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
      </div>

      {/* Interactive Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer z-10"
        onMouseMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          let found: string | null = null;
          NODES.forEach((node) => {
            const nx = (node.x / 100) * rect.width;
            const ny = (node.y / 100) * rect.height;
            const dist = Math.hypot(mouseX - nx, mouseY - ny);
            if (dist <= node.baseRadius * 1.8) {
              found = node.id;
            }
          });
          setHoveredNodeId(found);
        }}
        onClick={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          let clickedNode: CoreNode | null = null;
          NODES.forEach((node) => {
            const nx = (node.x / 100) * rect.width;
            const ny = (node.y / 100) * rect.height;
            const dist = Math.hypot(mouseX - nx, mouseY - ny);
            if (dist <= node.baseRadius * 2.2) {
              clickedNode = node;
            }
          });

          setSelectedNode(clickedNode);
        }}
      />

      {/* Node Labels Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {NODES.map((node) => {
          const isHovered = hoveredNodeId === node.id;
          const isSelected = selectedNode?.id === node.id;
          const isDimmed = activeCategory && node.category !== activeCategory;

          return (
            <div
              key={node.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isDimmed ? "opacity-35 scale-95" : "opacity-100 scale-100"
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
            >
              <div
                className={`mt-4 sm:mt-5 px-3 py-1.5 rounded-apple-md text-xs sm:text-xs font-sans font-extrabold tracking-tight whitespace-nowrap transition-all duration-200 pointer-events-auto cursor-pointer border shadow-lg flex items-center gap-1.5 ${
                  isHovered || isSelected
                    ? "text-white scale-105 shadow-xl shadow-black/40 ring-2 ring-white/30"
                    : "bg-white/95 dark:bg-[#121828]/95 text-foreground border-white/40 dark:border-white/20 hover:bg-white dark:hover:bg-[#182035]"
                }`}
                style={
                  isHovered || isSelected
                    ? { backgroundColor: node.color, borderColor: node.color }
                    : {}
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(node);
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>{node.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Overlay */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-11 left-3 right-3 z-50 p-4 rounded-apple-xl border border-white/40 dark:border-white/20 bg-white/85 dark:bg-[#10131E]/90 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-lg mx-auto space-y-3 crisp-text"
          >
            <div className="flex items-start justify-between gap-2 border-b border-border/80 dark:border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-apple-md flex items-center justify-center text-white font-mono font-bold text-xs backdrop-blur-md shadow-sm"
                  style={{ backgroundColor: selectedNode.color }}
                >
                  <Brain className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground tracking-tight">
                    {selectedNode.label}
                  </h4>
                  <span
                    className="text-[9px] font-mono font-semibold uppercase tracking-wider"
                    style={{ color: selectedNode.color }}
                  >
                    {selectedNode.category} Core Node
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground bg-surface-hover/80 hover:bg-surface-active transition-colors border border-white/10"
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
                    className="px-2.5 py-0.5 rounded-apple-sm text-[10px] font-mono bg-white/70 dark:bg-white/10 text-foreground border border-white/20 dark:border-white/10 font-medium shadow-sm backdrop-blur-md"
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
                        onClick={() => setSelectedNode(null)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-apple-md text-[11px] font-mono font-semibold bg-accent-blue/15 hover:bg-accent-blue/30 text-accent-blue border border-accent-blue/40 backdrop-blur-md transition-all duration-150 shadow-sm active:scale-95 cursor-pointer"
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

      {/* Glassy Apple Footer Bar */}
      <div className="relative z-10 px-4 py-2.5 bg-white/75 dark:bg-[#101420]/80 backdrop-blur-3xl border-t border-white/30 dark:border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-muted-foreground shadow-lg rounded-b-apple-xl">
        <span className="flex items-center gap-1.5 font-semibold text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Nodes: {NODES.length} Active {activeCategory && `• Filter: ${activeCategory}`}
        </span>
        <span className="hidden sm:inline-block">Click node to inspect • Filter by category</span>
      </div>
    </div>
  );
}
