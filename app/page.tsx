"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero/HeroSection";
import { OSRevealSection } from "@/components/os-reveal/OSRevealSection";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";
import {
  Github,
  Code2,
  GraduationCap,
  Award,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Workflow,
  Cpu,
  Server,
  Globe,
  Database,
  Wrench,
  Layers,
  ShieldCheck,
  Mic,
  Lock,
  Box,
  FileCheck,
} from "lucide-react";

const atithiProject = projectsData.find((p) => p.id === "atithi-vms") || projectsData[0];
const coreSkills = skillsData.filter((g) => g.category !== "Tools");
const toolsGroup = skillsData.find((g) => g.category === "Tools");

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code2,
  Frontend: Globe,
  Backend: Server,
  "AI / ML": Cpu,
  "3D / Motion": Layers,
  "Databases / Cloud": Database,
};

export default function HomePage() {
  return (
    <div className="pb-16">
      {/* 1. Memorable Hero Section with Abstract Neural Core */}
      <HeroSection />

      {/* 2. Signature ANUNAY OS Reveal Section ("More than a portfolio.") */}
      <OSRevealSection />

      {/* 3. Refined Featured Projects Section */}
      <SectionContainer
        id="projects"
        tag="// 01 • FEATURED PROJECTS"
        title="Engineering Projects"
        subtitle="Full-stack visitor management, automated document security pipelines, 3D WebGL experiences, and speech automation"
      >
        <div className="space-y-6 sm:space-y-8">
          {/* Prominent Featured System: Atithi VMS */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "160px 0px" }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/[0.08] bg-[#111318]/90 hover:border-accent-blue/35 transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Project Identity & 3 Verified Highlights */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-accent-blue/10 text-accent-blue border border-accent-blue/25 tracking-wide">
                    FEATURED PROJECT
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {atithiProject.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F7] tracking-tight">
                    {atithiProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-0.5">
                    {atithiProject.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                  Traditional manual logs in facilities create security blindspots and slow registration. Atithi VMS automates visitor onboarding with biometric face verification and real-time host notifications.
                </p>

                {/* Exactly 3 Verified Highlights */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-accent-blue" />
                    <span>Key Engineering Highlights</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#F5F5F7]">Biometric Validation:</strong> Python Flask face-recognition microservice integration for automated guest identity checks.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#F5F5F7]">Real-time Host Notifications:</strong> Instant visitor arrival alerts dispatched to facility hosts via Telegram Bot API.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#F5F5F7]">Data Privacy Compliance:</strong> Aadhaar data masking algorithm and soft-delete subscription suspension logic.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Compact Technologies Line */}
                <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs">
                  <span className="font-mono text-zinc-500 uppercase tracking-wider text-[10px]">
                    Core Stack:
                  </span>
                  <span className="font-mono text-zinc-300">
                    {atithiProject.technologies.slice(0, 6).join(" · ")}
                  </span>
                </div>

                {/* GitHub Link */}
                {atithiProject.githubUrl && (
                  <div className="pt-1">
                    <a
                      href={atithiProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4 text-zinc-400" />
                      <span>View Repository on GitHub</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column: Simplified Authentic Architecture Illustration */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-white/[0.08] bg-[#0E1015] p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-2 tracking-wide">
                      <Server className="w-4 h-4 text-accent-blue" />
                      <span>System Architecture</span>
                    </span>
                  </div>

                  {/* Clean Readable Architecture Diagram */}
                  <div className="space-y-2">
                    {/* Layer 1: Client */}
                    <div className="p-3 rounded-lg border border-accent-blue/20 bg-accent-blue/[0.04] flex items-center gap-3">
                      <div className="p-2 rounded-md bg-accent-blue/10 border border-accent-blue/20 shrink-0">
                        <Globe className="w-4 h-4 text-accent-blue" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-[#F5F5F7]">Client Interface</div>
                        <div className="text-xs font-mono text-zinc-300">React + Vite · Vercel</div>
                      </div>
                    </div>

                    {/* Flow Connector */}
                    <div className="flex justify-center">
                      <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
                    </div>

                    {/* Layer 2: API Backend */}
                    <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] flex items-center gap-3">
                      <div className="p-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                        <Server className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-[#F5F5F7]">REST API Backend</div>
                        <div className="text-xs font-mono text-zinc-300">Node.js + Express · Render</div>
                      </div>
                    </div>

                    {/* Flow Connector */}
                    <div className="flex justify-center">
                      <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
                    </div>

                    {/* Layer 3: AI, Storage & Notifications */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.025] space-y-1">
                        <div className="flex items-center gap-1.5 text-accent-violet">
                          <Cpu className="w-4 h-4 shrink-0" />
                          <span className="text-xs font-semibold text-[#F5F5F7]">Face Recognition</span>
                        </div>
                        <div className="text-xs font-mono text-zinc-300">Python Flask</div>
                      </div>

                      <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.025] space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-400">
                          <Database className="w-4 h-4 shrink-0" />
                          <span className="text-xs font-semibold text-[#F5F5F7]">Database &amp; Media</span>
                        </div>
                        <div className="text-xs font-mono text-zinc-300">MongoDB Atlas · Cloudinary</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.025] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-accent-blue shrink-0" />
                        <span className="text-xs font-semibold text-[#F5F5F7]">Host Alerts</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-300">Telegram Bot API</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Varied Supporting Project Showcases (No repetitive cookie-cutter cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project 2: PrivacyShield AI (Document Security & Automation) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "160px 0px" }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#111318]/85 hover:border-accent-blue/30 transition-all flex flex-col justify-between space-y-5 shadow-sm group h-full"
            >
              <div className="space-y-4">
                <div className="text-[11px] font-mono font-semibold text-emerald-400 tracking-wide">
                  AUTOMATION &amp; SECURITY
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#F5F5F7] group-hover:text-accent-blue transition-colors tracking-tight">
                    PrivacyShield AI
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    Automated Sensitive Document Redaction
                  </p>
                </div>

                <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                  Automates PII discovery and redaction in PDF documents through an n8n visual automation workflow integrated with OpenAI context analysis.
                </p>

                {/* Domain-Specific Visual Preview: n8n Redaction Pipeline Schematic */}
                <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-[#0E1015] space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 border-b border-white/[0.06] pb-2">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>n8n Redaction Pipeline</span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 text-center font-mono">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.07] space-y-1">
                      <FileCheck className="w-3.5 h-3.5 text-zinc-300 mx-auto" />
                      <div className="text-[10px] text-zinc-200 leading-tight">PDF Input</div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-emerald-400/70" />
                    <div className="p-2 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/25 space-y-1">
                      <Workflow className="w-3.5 h-3.5 text-emerald-400 mx-auto" />
                      <div className="text-[10px] text-zinc-100 leading-tight">n8n + AI</div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-emerald-400/70" />
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.07] space-y-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-400 mx-auto" />
                      <div className="text-[10px] text-zinc-200 leading-tight">Redacted</div>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400">
                    PII Detection · Risk Scoring · PDF Output
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-400">
                  TypeScript · n8n · OpenAI API · PDF Engine
                </div>

                <a
                  href="https://github.com/Anunay1601/privacy-shield-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-[#F5F5F7] transition-colors"
                  aria-label="PrivacyShield AI repository"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Project 3: Shriji Polymers 3D (Interactive WebGL Experience) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "160px 0px" }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#111318]/85 hover:border-accent-blue/30 transition-all flex flex-col justify-between space-y-5 shadow-sm group h-full"
            >
              <div className="space-y-4">
                <div className="text-[11px] font-mono font-semibold text-purple-400 tracking-wide">
                  3D WEB &amp; GRAPHICS
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#F5F5F7] group-hover:text-accent-blue transition-colors tracking-tight">
                    Shriji Polymers 3D
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    Interactive 3D Product Showcase
                  </p>
                </div>

                <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                  Interactive 3D web experience with 360° product inspection, GSAP scroll-synchronized camera physics, and custom procedural shaders.
                </p>

                {/* Domain-Specific Visual Preview: Isometric WebGL Wireframe Schematic */}
                <div className="p-3.5 rounded-xl border border-purple-500/20 bg-[#0E1015] space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-purple-400 border-b border-white/[0.06] pb-2">
                    <Box className="w-3.5 h-3.5 shrink-0" />
                    <span>React Three Fiber Viewport</span>
                  </div>

                  <div className="flex items-center justify-center py-1">
                    <svg
                      viewBox="0 0 180 76"
                      className="w-full max-w-[180px] h-[68px]"
                      aria-hidden="true"
                    >
                      <ellipse
                        cx="90"
                        cy="44"
                        rx="66"
                        ry="20"
                        fill="none"
                        stroke="rgba(139, 92, 246, 0.4)"
                        strokeWidth="1.2"
                        strokeDasharray="4 3"
                      />
                      <polygon
                        points="90,11 116,25 116,51 90,65 64,51 64,25"
                        fill="rgba(139, 92, 246, 0.1)"
                        stroke="#A78BFA"
                        strokeWidth="1.5"
                      />
                      <polyline
                        points="64,25 90,39 116,25"
                        fill="none"
                        stroke="#C4B5FD"
                        strokeWidth="1.2"
                      />
                      <line
                        x1="90"
                        y1="39"
                        x2="90"
                        y2="65"
                        stroke="#C4B5FD"
                        strokeWidth="1.2"
                      />
                      <circle cx="156" cy="44" r="3" fill="#4F8CFF" />
                      <circle cx="24" cy="44" r="2.5" fill="#A78BFA" />
                    </svg>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400">
                    360° Orbit Inspection · GSAP ScrollTrigger
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-400">
                  React Three Fiber · Three.js · GSAP · WebGL
                </div>

                <a
                  href="https://github.com/Anunay1601/shriji-polymers-3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-[#F5F5F7] transition-colors"
                  aria-label="Shriji Polymers 3D repository"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Project 4: Atlas Voice Assistant (AI & OS Automation) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "160px 0px" }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#111318]/85 hover:border-accent-blue/30 transition-all flex flex-col justify-between space-y-5 shadow-sm group h-full"
            >
              <div className="space-y-4">
                <div className="text-[11px] font-mono font-semibold text-sky-400 tracking-wide">
                  AI &amp; OS AUTOMATION
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#F5F5F7] group-hover:text-accent-blue transition-colors tracking-tight">
                    Atlas Voice Assistant
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    AI Voice Automation Assistant
                  </p>
                </div>

                <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                  Voice command automation assistant that converts microphone speech signals into system actions, natural language intents, and API requests.
                </p>

                {/* Domain-Specific Visual Preview: Acoustic Signal & Intent Chain */}
                <div className="p-3.5 rounded-xl border border-sky-500/20 bg-[#0E1015] space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-sky-400 border-b border-white/[0.06] pb-2">
                    <Mic className="w-3.5 h-3.5 shrink-0" />
                    <span>Speech Intent Pipeline</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 py-1">
                    <svg
                      viewBox="0 0 112 36"
                      className="w-28 h-9 shrink-0"
                      aria-hidden="true"
                    >
                      <rect x="4" y="13" width="4" height="10" rx="2" fill="rgba(79,140,255,0.45)" />
                      <rect x="14" y="8" width="4" height="20" rx="2" fill="rgba(79,140,255,0.65)" />
                      <rect x="24" y="4" width="4" height="28" rx="2" fill="#38BDF8" />
                      <rect x="34" y="10" width="4" height="16" rx="2" fill="rgba(79,140,255,0.7)" />
                      <rect x="44" y="2" width="4" height="32" rx="2" fill="#4F8CFF" />
                      <rect x="54" y="7" width="4" height="22" rx="2" fill="#38BDF8" />
                      <rect x="64" y="12" width="4" height="12" rx="2" fill="rgba(79,140,255,0.6)" />
                      <rect x="74" y="5" width="4" height="26" rx="2" fill="#38BDF8" />
                      <rect x="84" y="9" width="4" height="18" rx="2" fill="rgba(79,140,255,0.75)" />
                      <rect x="94" y="13" width="4" height="10" rx="2" fill="rgba(79,140,255,0.45)" />
                      <rect x="104" y="15" width="4" height="6" rx="2" fill="rgba(79,140,255,0.3)" />
                    </svg>

                    <ArrowRight className="w-3.5 h-3.5 text-sky-400/70 shrink-0" />

                    <div className="text-[10px] font-mono text-right space-y-1">
                      <div className="text-zinc-200">SpeechRecognition</div>
                      <div className="text-sky-400">OS &amp; API Actions</div>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400">
                    Voice Input · Intent Parsing · PyTTSx3 Speech
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-400">
                  Python · SpeechRecognition · PyTTSx3 · REST APIs
                </div>

                <a
                  href="https://github.com/Anunay1601/atlas-voice-assistant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-[#F5F5F7] transition-colors"
                  aria-label="Atlas Voice Assistant repository"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* 4. Structured Technical Stack (Scannable, verified, no boilerplate) */}
      <SectionContainer
        id="skills"
        tag="// 02 • TECHNICAL STACK"
        title="Technical Stack & Expertise"
        subtitle="Languages, frameworks, AI microservices, 3D graphics, and cloud infrastructure used across engineering projects"
      >
        <div className="space-y-5">
          {/* 6 Core Categories in a balanced 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreSkills.map((group) => {
              const CategoryIcon = CATEGORY_ICONS[group.category] || Code2;
              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "160px 0px" }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-2xl border border-white/[0.07] bg-[#111318]/80 hover:border-white/[0.14] transition-all flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="border-b border-white/[0.06] pb-3 mb-3.5">
                      <h3 className="text-sm font-bold text-[#F5F5F7] flex items-center gap-2">
                        <CategoryIcon className="w-4 h-4 text-accent-blue shrink-0" />
                        <span>{group.category}</span>
                      </h3>
                    </div>

                    <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                      {group.skills.map((skill) => (
                        <li
                          key={skill.id}
                          className="flex items-start gap-2 text-xs sm:text-[13px] font-mono text-[#E4E4E7] leading-snug"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/80 shrink-0 mt-1.5" />
                          <span>{skill.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dedicated Developer Tools Banner */}
          {toolsGroup && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "160px 0px" }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl border border-white/[0.07] bg-[#111318]/80 hover:border-white/[0.14] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex items-center gap-2 shrink-0">
                <Wrench className="w-4 h-4 text-accent-blue" />
                <h3 className="text-sm font-bold text-[#F5F5F7]">Developer Tools &amp; Environment</h3>
              </div>
              <p className="text-xs sm:text-[13px] font-mono text-zinc-300 leading-relaxed">
                {toolsGroup.skills.map((skill) => skill.name).join(" · ")}
              </p>
            </motion.div>
          )}
        </div>
      </SectionContainer>

      {/* 5. Work Experience Section */}
      <SectionContainer
        id="experience"
        tag="// 03 • WORK EXPERIENCE"
        title="Experience & Internships"
        subtitle="Software engineering internships across fintech, visitor management systems, and enterprise automation"
      >
        <div className="relative border-l border-white/[0.08] ml-3 sm:ml-4 pl-5 sm:pl-8 space-y-6 sm:space-y-8">
          {experienceData.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "160px 0px" }}
              transition={{ duration: 0.3 }}
              className="relative p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-[#111318]/85 hover:border-white/[0.15] transition-all space-y-3.5 shadow-sm"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[27px] sm:-left-[39px] top-7 w-3 h-3 rounded-full bg-accent-blue ring-4 ring-[#0B0C0F]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-[#F5F5F7]">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-accent-blue">
                      @ {exp.company}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    {exp.location} • {exp.type}
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-300 self-start sm:self-auto">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="leading-relaxed flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 mt-2" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2.5 border-t border-white/[0.06] flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Stack:
                </span>
                <span className="font-mono text-zinc-300">
                  {exp.technologies.join(" · ")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* 6. Education & Certifications Section */}
      <SectionContainer
        id="education"
        tag="// 04 • EDUCATION & CERTIFICATIONS"
        title="Education & Certifications"
        subtitle="Academic curriculum at VIT Bhopal University and professional technical certifications"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 pb-1">
              <GraduationCap className="w-4 h-4 text-accent-blue" />
              <h3 className="text-base font-bold text-[#F5F5F7]">Academic Background</h3>
            </div>

            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="p-5 rounded-2xl border border-white/[0.07] bg-[#111318]/80 space-y-2.5 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h4 className="font-bold text-[#F5F5F7] text-sm">{edu.institution}</h4>
                  <span className="text-xs font-mono text-zinc-400">
                    {edu.location ? `${edu.location} · ` : ""}
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs font-semibold text-accent-blue">{edu.degree} — {edu.field}</p>
                <div className="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  {edu.grade}
                </div>
                {edu.details && (
                  <ul className="text-xs text-zinc-400 space-y-1 pt-1 border-t border-white/[0.06]">
                    {edu.details.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-7 space-y-4" id="certifications">
            <div className="flex items-center gap-2 pb-1">
              <Award className="w-4 h-4 text-accent-blue" />
              <h3 className="text-base font-bold text-[#F5F5F7]">Certifications ({certificationsData.length})</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl border border-white/[0.07] bg-[#111318]/80 hover:border-white/[0.15] transition-colors space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      {cert.category}
                    </span>
                    <Award className="w-3.5 h-3.5 text-accent-blue shrink-0" />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#F5F5F7] leading-snug pt-0.5">{cert.title}</h4>
                  <p className="text-xs text-zinc-300">{cert.issuer}</p>
                  <span className="inline-block text-[11px] font-mono text-zinc-400">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
