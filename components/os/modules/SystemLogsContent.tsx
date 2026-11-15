"use client";

import React, { useState } from "react";
import { experienceData, ExperienceItem } from "@/data/experience";
import { educationData, EducationItem } from "@/data/education";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

export function SystemLogsContent() {
  const [activeTab, setActiveTab] = useState<"deployments" | "education">("deployments");

  return (
    <div className="h-full flex flex-col space-y-3 font-sans overflow-hidden select-none">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-border/60 pb-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("deployments")}
            className={`px-2.5 sm:px-3 py-1 rounded-apple-sm text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === "deployments"
                ? "bg-accent-blue text-white shadow-sm"
                : "bg-surface/50 text-muted-foreground hover:bg-surface-hover hover:text-foreground border border-border/60"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">DEPLOYMENTS (EXPERIENCE)</span>
            <span className="sm:hidden">EXPERIENCE</span>
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-2.5 sm:px-3 py-1 rounded-apple-sm text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === "education"
                ? "bg-accent-blue text-white shadow-sm"
                : "bg-surface/50 text-muted-foreground hover:bg-surface-hover hover:text-foreground border border-border/60"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">ACADEMIC LOGS (EDUCATION)</span>
            <span className="sm:hidden">EDUCATION</span>
          </button>
        </div>

        <div className="text-[10px] font-mono text-muted-foreground hidden lg:flex items-center gap-1 shrink-0">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>VERIFIED RESUME RECORD</span>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === "deployments" && (
            <motion.div
              key="deployments"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14 }}
              className="space-y-3"
            >
              {experienceData.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-apple-lg bg-surface/60 border border-border/80 space-y-3 shadow-sm hover:border-accent-blue/30 transition-colors"
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-border/60 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-foreground tracking-tight">{exp.role}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          ● {exp.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-accent-blue font-semibold mt-0.5">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-accent-blue" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Contributions / Responsibilities List */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                      CONTRIBUTIONS & DELIVERABLES
                    </span>
                    <ul className="space-y-1.5">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                          <span className="text-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Badge List */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="pt-2 border-t border-border/60 space-y-1">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        TECHNOLOGY SPECIFICATION
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-apple-sm text-[11px] font-mono bg-surface border border-border/80 text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14 }}
              className="space-y-3"
            >
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-apple-lg bg-surface/60 border border-border/80 space-y-3 shadow-sm hover:border-accent-blue/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-border/60 pb-2.5">
                    <div>
                      <h4 className="text-sm font-bold text-foreground tracking-tight">{edu.institution}</h4>
                      <p className="text-xs font-mono text-accent-blue font-semibold mt-0.5">
                        {edu.degree} — {edu.field}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-accent-blue" />
                        {edu.period}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface border border-border text-emerald-400 font-bold">
                        {edu.grade}
                      </span>
                    </div>
                  </div>

                  {edu.details && edu.details.length > 0 && (
                    <ul className="space-y-1.5">
                      {edu.details.map((detail, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                          <Terminal className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                          <span className="text-foreground font-sans">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
