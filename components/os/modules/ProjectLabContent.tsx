"use client";

import React, { useState, useMemo, useCallback } from "react";
import { projectsData, Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Server,
  Database,
  Terminal,
  Activity,
  Filter,
  Workflow,
  Globe,
  ShieldCheck,
} from "lucide-react";

type CategoryFilter = "All" | "Full Stack" | "AI" | "Automation" | "3D" | "Developer Tools";

const CATEGORIES: CategoryFilter[] = ["All", "Full Stack", "AI", "Automation", "3D", "Developer Tools"];

// Helper component for static status badges to prevent re-creation
const StatusBadge = React.memo(({ status }: { status: Project["status"] }) => {
  switch (status) {
    case "DEPLOYED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          ● DEPLOYED
        </span>
      );
    case "PRODUCTION READY":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-accent-blue/10 text-accent-blue border border-accent-blue/30 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
          ● PRODUCTION READY
        </span>
      );
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          ● COMPLETED
        </span>
      );
  }
});
StatusBadge.displayName = "StatusBadge";

export function ProjectLabContent() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);
  const [activeTab, setActiveTab] = useState<"overview" | "problem" | "architecture" | "systemFlow" | "features" | "deployment">("overview");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const selectedProject = useMemo(() => {
    return (
      projectsData.find((p) => p.id === selectedProjectId) ||
      filteredProjects[0] ||
      projectsData[0]
    );
  }, [selectedProjectId, filteredProjects]);

  const handleCategorySelect = useCallback(
    (cat: CategoryFilter) => {
      setSelectedCategory(cat);
      const matching = cat === "All" ? projectsData : projectsData.filter((p) => p.category === cat);
      if (matching.length > 0 && !matching.some((p) => p.id === selectedProjectId)) {
        setSelectedProjectId(matching[0].id);
      }
    },
    [selectedProjectId]
  );

  return (
    <div className="h-full flex flex-col space-y-3 font-sans overflow-hidden select-none">
      {/* Category Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 border-b border-border/60 shrink-0 no-scrollbar">
        <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground mr-1 shrink-0">
          <Filter className="w-3 h-3 text-accent-blue" />
          <span>FILTER:</span>
        </div>
        {CATEGORIES.map((cat) => {
          const count = cat === "All" ? projectsData.length : projectsData.filter((p) => p.category === cat).length;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-colors duration-150 shrink-0 flex items-center gap-1.5 border ${
                isActive
                  ? "bg-accent-blue/15 text-accent-blue border-accent-blue/40 shadow-sm"
                  : "bg-surface/50 text-muted-foreground border-border/70 hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-accent-blue/20 text-accent-blue" : "bg-surface border border-border/80 text-muted-foreground"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-3 overflow-hidden min-h-0">
        {/* Left Sidebar List */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border/60 pb-2 md:pb-0 md:pr-3 space-y-2 overflow-y-auto shrink-0 max-h-48 md:max-h-none no-scrollbar">
          <div className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-widest px-1 flex items-center justify-between">
            <span>Systems ({filteredProjects.length})</span>
            <Activity className="w-3 h-3 text-accent-blue/70" />
          </div>

          {filteredProjects.length === 0 ? (
            <div className="p-4 text-center text-xs text-muted-foreground font-mono bg-surface/30 rounded-apple-md border border-dashed border-border">
              No systems registered under {selectedCategory} category.
            </div>
          ) : (
            filteredProjects.map((project) => {
              const isSelected = selectedProject.id === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    setActiveTab("overview");
                  }}
                  className={`w-full p-2.5 rounded-apple-lg text-left transition-all duration-150 border relative group ${
                    isSelected
                      ? "bg-accent-blue/10 border-accent-blue/40 text-foreground shadow-sm ring-1 ring-accent-blue/20"
                      : "bg-surface/40 border-border/60 text-foreground hover:bg-surface-hover hover:border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs font-bold font-sans tracking-tight flex items-center gap-1.5">
                      <span>{project.title}</span>
                      {project.githubUrl && <Github className="w-3 h-3 text-muted-foreground/70 shrink-0" />}
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-surface/80 border border-border/80 text-muted-foreground shrink-0">
                      {project.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5 font-sans">
                    {project.subtitle}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <StatusBadge status={project.status} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Main System Detail Inspector with Framer Motion */}
        <div className="flex-1 flex flex-col overflow-y-auto space-y-3 pr-1 no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="space-y-3 flex-1 flex flex-col"
            >
              {/* Header Panel */}
              <div className="p-3.5 rounded-apple-lg bg-surface/70 border border-border/80 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border/60 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">{selectedProject.title}</h3>
                      <StatusBadge status={selectedProject.status} />
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">{selectedProject.subtitle}</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-apple-md text-xs font-semibold font-mono bg-surface-hover hover:bg-surface-active text-foreground border border-border/80 transition-colors shadow-sm"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Repo</span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-apple-md text-xs font-semibold font-mono bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shadow-sm"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3 text-white/80" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-apple-sm text-[11px] font-mono bg-surface border border-border/80 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* System Relationships Flow Visual Diagram */}
              {selectedProject.systemRelationships && selectedProject.systemRelationships.length > 0 && (
                <div className="p-3 rounded-apple-lg bg-surface/50 border border-border/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent-blue flex items-center gap-1.5">
                      <Workflow className="w-3.5 h-3.5" />
                      SYSTEM RELATIONSHIPS ARCHITECTURE FLOW
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground">REAL-TIME PIPELINE</span>
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-1.5 overflow-x-auto py-1 px-0.5 no-scrollbar">
                    {selectedProject.systemRelationships.map((node, index) => (
                      <React.Fragment key={index}>
                        <div className="px-2.5 py-1.5 rounded-apple-md bg-surface-hover/80 border border-border/80 text-[11px] font-mono font-semibold text-foreground flex items-center gap-1.5 shrink-0 shadow-sm">
                          {index === 0 ? (
                            <Terminal className="w-3 h-3 text-accent-blue" />
                          ) : index === selectedProject.systemRelationships.length - 1 ? (
                            <Database className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Server className="w-3 h-3 text-purple-400" />
                          )}
                          <span>{node}</span>
                        </div>
                        {index < selectedProject.systemRelationships.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="flex gap-1 border-b border-border/60 pb-1.5 overflow-x-auto no-scrollbar">
                {(
                  [
                    { id: "overview", label: "Overview" },
                    { id: "problem", label: "Problem & Solution" },
                    { id: "architecture", label: "Architecture" },
                    { id: "systemFlow", label: "System Flow" },
                    { id: "features", label: "Key Features" },
                    { id: "deployment", label: "Deployment" },
                  ] as const
                ).map((tab) => {
                  if (tab.id === "deployment" && !selectedProject.deployment) return null;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-2.5 py-1 rounded-apple-sm text-xs font-medium font-sans capitalize transition-colors shrink-0 ${
                        isActive
                          ? "bg-accent-blue text-white shadow-sm font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Display */}
              <div className="flex-1 space-y-3 pb-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                  >
                    {activeTab === "overview" && (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-apple-lg bg-surface/50 border border-border/80 space-y-1.5">
                          <h4 className="text-[10px] font-mono font-semibold text-foreground uppercase tracking-wider">
                            Executive Summary
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                            {selectedProject.overview}
                          </p>
                        </div>
                        <div className="p-3.5 rounded-apple-lg bg-surface/50 border border-border/80 space-y-1.5">
                          <h4 className="text-[10px] font-mono font-semibold text-foreground uppercase tracking-wider">
                            System Description
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                            {selectedProject.description}
                          </p>
                        </div>

                        {selectedProject.githubUrl && (
                          <div className="p-3 rounded-apple-lg bg-surface/60 border border-border/80 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-apple-md bg-foreground/10 border border-border flex items-center justify-center text-foreground shrink-0">
                                <Github className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-bold font-mono text-foreground">Source Code & Repository</div>
                                <div className="text-[10px] font-mono text-muted-foreground">{selectedProject.githubUrl}</div>
                              </div>
                            </div>
                            <a
                              href={selectedProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-apple-md text-xs font-mono font-semibold bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors flex items-center gap-1 shrink-0"
                            >
                              <span>View Repo</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "problem" && (
                      <div className="space-y-2.5">
                        <div className="p-3.5 rounded-apple-lg bg-amber-500/10 border border-amber-500/20 text-xs leading-relaxed space-y-1">
                          <div className="flex items-center gap-1.5 font-mono font-semibold text-amber-400 text-[11px]">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>PROBLEM STATEMENT</span>
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed">{selectedProject.problem}</p>
                        </div>
                        <div className="p-3.5 rounded-apple-lg bg-emerald-500/10 border border-emerald-500/20 text-xs leading-relaxed space-y-1">
                          <div className="flex items-center gap-1.5 font-mono font-semibold text-emerald-400 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>ENGINEERED SOLUTION</span>
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed">{selectedProject.solution}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "architecture" && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-semibold text-foreground uppercase tracking-wider block">
                          System Architecture Breakdown
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {selectedProject.architecture.map((arch, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-apple-md bg-surface border border-border/80 text-xs text-foreground flex items-center gap-2.5 font-mono shadow-sm"
                            >
                              <div className="w-5 h-5 rounded bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue shrink-0 font-bold text-[9px]">
                                0{idx + 1}
                              </div>
                              <span>{arch}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "systemFlow" && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-semibold text-foreground uppercase tracking-wider block">
                          Data Pipeline & Node Progression
                        </span>
                        <div className="p-3.5 rounded-apple-lg bg-surface/50 border border-border space-y-2.5">
                          {selectedProject.systemRelationships.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                                {idx + 1}
                              </div>
                              <div className="flex-1 p-2 rounded-apple-md bg-surface border border-border text-xs font-mono text-foreground">
                                {step}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "features" && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-semibold text-foreground uppercase tracking-wider block">
                          Key Technical Capabilities
                        </span>
                        <div className="space-y-1.5">
                          {selectedProject.features.map((feat, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-apple-md bg-surface border border-border/80 text-xs text-muted-foreground flex items-start gap-2.5 shadow-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed text-foreground">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "deployment" && selectedProject.deployment && (
                      <div className="p-3.5 rounded-apple-lg bg-surface/60 border border-border/80 space-y-1.5">
                        <div className="flex items-center gap-2 font-mono font-semibold text-xs text-accent-blue">
                          <Server className="w-3.5 h-3.5" />
                          <span>DEPLOYMENT SPECIFICATION</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                          {selectedProject.deployment}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
