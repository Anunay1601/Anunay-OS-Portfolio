"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import {
  Monitor,
  Terminal,
  FolderGit2,
  Workflow,
  Search,
  ArrowRight,
  Sparkles,
  Command,
} from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";

const atithiProject = projectsData.find((p) => p.id === "atithi-vms") || projectsData[0];

export function OSRevealSection() {
  return (
    <section id="os-reveal" className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "140px 0px" }}
        transition={{ duration: 0.35 }}
        className="space-y-8 sm:space-y-10"
      >
        {/* Section Header: The Product Philosophy */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/[0.06] text-xs font-mono font-medium text-accent-blue">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIGNATURE ENVIRONMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F5F7] font-sans">
            More than a portfolio.
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            ANUNAY OS is an interactive desktop workstation engineered directly in the browser. It translates my engineering projects, technical stack, diagnostic terminal, and automation pipelines into a responsive windowed operating environment.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-4">
            <LiquidMetalButton
              href="/os"
              size="md"
              borderWidth={3}
              metalConfig={{
                colorBack: "#1e293b",
                colorTint: "#60a5fa",
                speed: 0.55,
                repetition: 4,
                distortion: 0.18,
              }}
              icon={<Monitor className="w-4 h-4 text-accent-blue" />}
            >
              <span>Enter ANUNAY OS</span>
              <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </LiquidMetalButton>

            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <span>Press</span>
              <kbd className="px-2 py-0.5 rounded border border-white/[0.1] bg-white/[0.04] text-[#F5F5F7] font-semibold text-[11px]">
                ⌘K
              </kbd>
              <span>anywhere to search</span>
            </span>
          </div>
        </div>

        {/* The Signature OS Reveal: Large, Refined Visual Window Canvas */}
        <Link
          href="/os"
          aria-label="Open ANUNAY OS interactive workstation"
          className="block group"
        >
          <div className="relative rounded-2xl md:rounded-3xl border border-white/[0.14] bg-[#0B0D12] shadow-[0_28px_70px_rgba(0,0,0,0.65)] overflow-hidden group-hover:border-accent-blue/45 transition-all duration-300">
            {/* Top Specular Edge */}
            <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent pointer-events-none z-20" />

            {/* Ambient Desktop Lighting */}
            <div className="absolute top-0 right-1/4 w-[520px] h-[320px] bg-accent-blue/[0.07] rounded-full blur-[110px] pointer-events-none" />

            {/* Top System Bar: Mirrors /os TopBar */}
            <div className="h-10 sm:h-11 px-4 sm:px-5 flex items-center justify-between border-b border-white/[0.08] bg-[#10131B]/95 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#F5F5F7] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_#4F8CFF]" />
                  <span>ANUNAY OS</span>
                </span>
                <span className="hidden sm:inline text-zinc-600">•</span>
                <span className="hidden sm:inline text-zinc-400 text-[11px]">Desktop Environment</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] text-zinc-300">
                  <Search className="w-3 h-3 text-accent-blue" />
                  <span>Search ANUNAY OS...</span>
                  <span className="text-zinc-400">⌘K</span>
                </div>
                <span className="text-emerald-400 text-[11px] flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online</span>
                </span>
              </div>
            </div>

            {/* Simulated Desktop Canvas with Real Implemented Windows & Dock */}
            <div className="relative min-h-[360px] sm:min-h-[410px] lg:min-h-[440px] p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#151A28] via-[#0D1017] to-[#090B10]">
              {/* Subtle Ambient Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500">
                <img
                  src="/anunay-os-logo-v2.png"
                  alt=""
                  aria-hidden="true"
                  className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
                />
              </div>

              {/* Centered Realistic Floating Windows */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-stretch max-w-5xl mx-auto w-full my-auto">
                {/* Window 1: Interactive Terminal */}
                <div className="md:col-span-7 rounded-xl border border-white/[0.14] bg-[#0F121A]/95 backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.55)] p-4 sm:p-5 space-y-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                      <span className="text-xs font-mono text-zinc-200 font-medium ml-2">anunay@os ~ zsh</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">Terminal</span>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs sm:text-[13px] leading-relaxed">
                    <div>
                      <span className="text-accent-blue font-semibold">anunay@os ~ %</span>{" "}
                      <span className="text-[#F5F5F7]">anunay-os --status</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-zinc-300 pl-2 border-l border-white/[0.1]">
                      <div>
                        <span className="text-zinc-400">Engineer:</span>{" "}
                        <span className="text-[#F5F5F7] font-medium">{profileData.name}</span>{" "}
                        <span className="text-zinc-300">(B.Tech CSE · AI &amp; ML)</span>
                      </div>
                      <div>
                        <span className="text-zinc-400">Academic:</span>{" "}
                        <span className="text-zinc-200">{profileData.university}</span>{" "}
                        <span className="text-emerald-400 font-semibold">· CGPA {profileData.cgpa}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400">Projects:</span>{" "}
                        <span className="text-zinc-200">
                          {projectsData.map((p) => p.title).join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="pt-1 flex items-center gap-1.5">
                      <span className="text-emerald-400 font-semibold">anunay@os ~ %</span>
                      <span className="text-[#F5F5F7]">open project-lab</span>
                      <span className="w-1.5 h-4 bg-accent-blue animate-pulse inline-block" />
                    </div>
                  </div>
                </div>

                {/* Window 2: Project Lab Inspector */}
                <div className="md:col-span-5 rounded-xl border border-accent-blue/40 bg-[#111522]/95 backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.55)] p-4 sm:p-5 space-y-3.5 group-hover:border-accent-blue/65 transition-colors flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                      <span className="text-xs font-mono font-semibold text-[#F5F5F7]">Project Inspector</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {atithiProject.status}
                    </span>
                  </div>

                  <div className="space-y-2.5 font-sans">
                    <div>
                      <div className="text-sm sm:text-base font-bold text-[#F5F5F7] tracking-tight">
                        {atithiProject.title}
                      </div>
                      <div className="text-xs font-mono text-zinc-400">
                        {atithiProject.subtitle}
                      </div>
                    </div>

                    <p className="text-xs text-zinc-200 leading-relaxed">
                      Multi-service visitor management with Python Flask face verification, Telegram arrival alerts, and React client.
                    </p>

                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-zinc-200 leading-snug">
                      React UI → Express API → Flask Face AI → MongoDB
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["React", "Node.js", "Flask", "Telegram"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.05] text-zinc-200 border border-white/[0.1]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Authentic VisionOS Dock Bar */}
              <div className="relative z-10 flex items-center justify-center pt-6 pb-1">
                <div className="px-4 sm:px-5 py-2 rounded-2xl border border-white/[0.14] bg-[#121622]/90 backdrop-blur-2xl shadow-2xl flex items-center gap-2.5 sm:gap-3">
                  <div className="p-2 rounded-xl bg-accent-blue/20 text-accent-blue" title="Neural Core">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400" title="Project Lab">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400" title="Terminal">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400" title="Automation Core">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div className="h-4 w-px bg-white/[0.14]" />
                  <span className="text-xs font-mono text-[#F5F5F7] group-hover:text-accent-blue transition-colors flex items-center gap-1.5 font-semibold">
                    <span>Enter live workstation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>


        {/* Supporting Details: What visitors can explore inside */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-white/[0.07] bg-[#111318]/80 space-y-1.5">
            <div className="flex items-center gap-2 text-accent-blue font-semibold text-xs font-mono">
              <FolderGit2 className="w-4 h-4" />
              <span>Project Lab</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Examine live architectural breakdowns, system relationships, and repositories for all 4 featured systems.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.07] bg-[#111318]/80 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs font-mono">
              <Terminal className="w-4 h-4" />
              <span>Diagnostic Terminal</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Interactive Zsh shell environment with real command dispatching for project logs and system navigation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.07] bg-[#111318]/80 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs font-mono">
              <Workflow className="w-4 h-4" />
              <span>Automation Core</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Visualized n8n workflow pipeline and sensitive document redaction exposure scoring modules.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.07] bg-[#111318]/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs font-mono">
              <Command className="w-4 h-4" />
              <span>Command Palette</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Instant system-wide search triggered via ⌘K to jump between applications, documents, and credentials.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
