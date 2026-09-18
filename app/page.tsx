"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero/HeroSection";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/Button";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";
import {
  Github,
  Linkedin,
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  Monitor,
  ExternalLink,
  ShieldCheck,
  Zap,
  Layers,
  Workflow,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20 select-none">
      {/* Hero Experience (Phase 2 Centerpiece) */}
      <HeroSection />

      {/* Projects Section */}
      <SectionContainer
        id="projects"
        title="Featured Software Systems"
        subtitle="Production-grade visitor management, AI sensitive document redaction, 3D showcases, and voice automation"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-border/80 bg-surface/70 backdrop-blur-xl shadow-apple-soft hover:border-accent-blue/50 hover:shadow-xl hover:shadow-accent-blue/10 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ● {project.status}
                    </span>
                  </div>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-apple-md bg-surface-hover hover:bg-surface-active text-muted-foreground hover:text-foreground border border-border transition-colors flex items-center gap-1 text-xs font-mono"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent-blue transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* System Relationships Flow */}
                {project.systemRelationships && project.systemRelationships.length > 0 && (
                  <div className="p-2.5 rounded-apple-md bg-surface/50 border border-border/70 space-y-1">
                    <div className="text-[9px] font-mono font-bold text-accent-blue uppercase tracking-wider flex items-center gap-1">
                      <Workflow className="w-3 h-3" />
                      <span>Architecture Pipeline</span>
                    </div>
                    <div className="text-[10px] font-mono text-foreground/80 line-clamp-1">
                      {project.systemRelationships.join(" → ")}
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies list */}
              <div className="space-y-3 pt-1 border-t border-border/60">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-apple-sm text-[11px] font-mono bg-surface border border-border/80 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Skills Section */}
      <SectionContainer
        id="skills"
        title="Technical Stack & Architecture"
        subtitle="Languages, frameworks, cloud infrastructure, AI models, and tools"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-5 rounded-2xl border border-border/80 bg-surface/70 backdrop-blur-xl space-y-3 hover:border-accent-blue/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-accent-blue" />
                  <span>{group.category}</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-semibold border border-accent-blue/20">
                  {group.skills.length} Stack(s)
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {group.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {group.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2.5 py-1 rounded-apple-sm text-xs font-mono bg-surface border border-border/80 text-foreground hover:border-accent-blue/40 transition-colors shadow-xs"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Experience Section */}
      <SectionContainer
        id="experience"
        title="Workplace Deployments & Internships"
        subtitle="Full-stack engineering deployments, microservice architectures, and ServiceNow automation"
      >
        <div className="space-y-4">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-border/80 bg-surface/70 backdrop-blur-xl space-y-3 shadow-sm hover:border-accent-blue/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-bold text-accent-blue">
                      @ {exp.company}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    {exp.location} • {exp.type}
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-surface border border-border text-foreground font-semibold self-start sm:self-auto">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 text-xs text-muted-foreground">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="leading-relaxed flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                    <span className="text-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-apple-sm text-[11px] font-mono bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Education & Certifications Section */}
      <SectionContainer
        id="education"
        title="Education & Credential Vault"
        subtitle="Academic degree, CGPA distinction, and verified certifications"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent-blue" />
              <span>Academic Foundation</span>
            </h3>
            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="p-5 rounded-2xl border border-border/80 bg-surface/70 backdrop-blur-xl space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-foreground text-sm">{edu.institution}</h4>
                  <span className="text-xs font-mono text-muted-foreground">{edu.period}</span>
                </div>
                <p className="text-xs font-semibold text-accent-blue">{edu.degree} — {edu.field}</p>
                <p className="text-xs font-mono font-bold text-emerald-400">{edu.grade}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-4" id="certifications">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-violet" />
              <span>Verified Certifications ({certificationsData.length})</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-apple-lg border border-border/80 bg-surface/70 backdrop-blur-xl space-y-1 hover:border-accent-violet/40 transition-colors shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-accent-violet/10 text-accent-violet border border-accent-violet/20 font-semibold">
                      {cert.category}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground line-clamp-1 pt-1">{cert.title}</h4>
                  <p className="text-[11px] text-muted-foreground">{cert.issuer}</p>
                  <span className="inline-block text-[10px] font-mono text-accent-violet font-semibold">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Bottom Interactive OS Launch CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-10 rounded-3xl border border-accent-blue/30 bg-gradient-to-r from-accent-blue/15 via-accent-violet/10 to-accent-blue/15 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Interactive OS Workspace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Ready to Explore ANUNAY OS?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Experience the desktop kernel workspace with window management, real-time command search (⌘K), skill graphs, and system diagnostics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link href="/os">
              <Button size="lg" className="shadow-xl shadow-accent-blue/30 hover:scale-105 transition-transform font-bold px-6">
                <Monitor className="w-4.5 h-4.5" />
                <span>Launch Desktop OS</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
