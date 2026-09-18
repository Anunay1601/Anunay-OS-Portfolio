"use client";

import React, { useState, useMemo } from "react";
import { skillsData, SkillCategoryGroup, SkillItem } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Sparkles,
  Layers,
  Terminal,
  FolderGit2,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Cpu,
} from "lucide-react";

export function DevEnvContent() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategoryGroup["category"]>("Languages");

  const currentGroup = useMemo(() => {
    return skillsData.find((g) => g.category === selectedCategory) || skillsData[0];
  }, [selectedCategory]);

  const [selectedSkillId, setSelectedSkillId] = useState<string>(currentGroup.skills[0]?.id || "python");

  const currentSkill = useMemo(() => {
    // Search within current group first, fallback to any group
    for (const group of skillsData) {
      const found = group.skills.find((s) => s.id === selectedSkillId);
      if (found) return found;
    }
    return currentGroup.skills[0];
  }, [selectedSkillId, currentGroup]);

  // Find linked projects for the selected skill
  const relatedProjects = useMemo(() => {
    if (!currentSkill || !currentSkill.relatedProjectIds) return [];
    return projectsData.filter((p) => currentSkill.relatedProjectIds.includes(p.id));
  }, [currentSkill]);

  // Find linked experiences for the selected skill
  const relatedExperiences = useMemo(() => {
    if (!currentSkill || !currentSkill.relatedExperienceIds) return [];
    return experienceData.filter((e) => currentSkill.relatedExperienceIds.includes(e.id));
  }, [currentSkill]);

  return (
    <div className="h-full flex flex-col space-y-3 font-sans overflow-hidden select-none">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 border-b border-border/60 shrink-0 no-scrollbar">
        {skillsData.map((group) => {
          const isActive = selectedCategory === group.category;
          return (
            <button
              key={group.category}
              onClick={() => {
                setSelectedCategory(group.category);
                if (group.skills.length > 0) {
                  setSelectedSkillId(group.skills[0].id);
                }
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all duration-150 shrink-0 flex items-center gap-1.5 border ${
                isActive
                  ? "bg-accent-blue/15 text-accent-blue border-accent-blue/40 shadow-sm font-semibold"
                  : "bg-surface/50 text-muted-foreground border-border/70 hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <span>{group.category}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-accent-blue/20 text-accent-blue" : "bg-surface border border-border/80 text-muted-foreground"}`}>
                {group.skills.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Split Interface */}
      <div className="flex-1 flex flex-col md:flex-row gap-3 overflow-hidden min-h-0">
        {/* Left Skill Grid */}
        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-border/60 pb-2 md:pb-0 md:pr-3 space-y-2 overflow-y-auto shrink-0 max-h-48 md:max-h-none no-scrollbar">
          <div className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-widest px-1">
            {currentGroup.category} ({currentGroup.skills.length})
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {currentGroup.skills.map((skill) => {
              const isSelected = currentSkill.id === skill.id;
              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`w-full p-2.5 rounded-apple-lg text-left transition-all duration-150 border flex items-center justify-between group ${
                    isSelected
                      ? "bg-accent-blue/12 border-accent-blue/40 text-foreground shadow-sm ring-1 ring-accent-blue/20"
                      : "bg-surface/40 border-border/60 text-foreground hover:bg-surface-hover hover:border-border"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold font-sans tracking-tight">{skill.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground line-clamp-1">
                      {skill.relatedProjectIds.length > 0
                        ? `${skill.relatedProjectIds.length} Linked Project(s)`
                        : "Core Foundation"}
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "text-accent-blue translate-x-0.5" : "text-muted-foreground/40 group-hover:text-muted-foreground"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Skill Detail Inspector */}
        <div className="flex-1 flex flex-col overflow-y-auto space-y-3 pr-1 no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSkill.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.14 }}
              className="space-y-3 flex-1"
            >
              {/* Skill Header Card */}
              <div className="p-3.5 rounded-apple-lg bg-surface/70 border border-border/80 space-y-2">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent-blue" />
                    <h3 className="text-base font-bold text-foreground">{currentSkill.name}</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent-blue/10 text-accent-blue border border-accent-blue/20 font-semibold">
                    {currentSkill.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  {currentSkill.description}
                </p>
              </div>

              {/* Related Projects Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-accent-blue">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>LINKED SOFTWARE PROJECTS ({relatedProjects.length})</span>
                </div>

                {relatedProjects.length === 0 ? (
                  <div className="p-3 rounded-apple-md bg-surface/30 border border-dashed border-border/60 text-xs text-muted-foreground font-mono">
                    No explicit showcase projects mapped to this specific skill. Applied in general coursework & software engineering.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {relatedProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3 rounded-apple-lg bg-surface/60 border border-border/80 flex items-start justify-between gap-3 shadow-sm hover:border-accent-blue/30 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-foreground">{proj.title}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-surface border border-border text-muted-foreground">
                              {proj.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">{proj.subtitle}</p>
                        </div>
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-apple-sm bg-surface-hover text-muted-foreground hover:text-foreground border border-border transition-colors shrink-0"
                            title="View GitHub Repository"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Experience Section */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>WORKPLACE DEPLOYMENTS ({relatedExperiences.length})</span>
                </div>

                {relatedExperiences.length === 0 ? (
                  <div className="p-3 rounded-apple-md bg-surface/30 border border-dashed border-border/60 text-xs text-muted-foreground font-mono">
                    Skill utilized across independent research, project engineering, and academic labs.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {relatedExperiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-3 rounded-apple-lg bg-surface/60 border border-border/80 space-y-1.5 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-foreground">{exp.role}</div>
                          <span className="text-[10px] font-mono text-muted-foreground">{exp.period}</span>
                        </div>
                        <div className="text-[11px] font-mono text-accent-blue font-semibold">{exp.company}</div>
                        <ul className="space-y-1 pt-1">
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                              <span className="text-accent-blue font-bold">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
