"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { RadialGlowButton } from "@/components/ui/radial-glow-button";
import { profileData } from "@/data/profile";
import { fadeIn, staggerContainer } from "@/lib/animations";
import {
  Monitor,
  FileText,
  Github,
  Linkedin,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Code2,
  Cpu,
  Workflow,
  Zap,
} from "lucide-react";

// Dynamic import with zero SSR block and non-blocking loading skeleton
const NeuralCore = dynamic(
  () => import("@/components/hero/NeuralCore").then((mod) => mod.NeuralCore),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-2xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-[#0c0e18]/80 backdrop-blur-xl flex flex-col items-center justify-center space-y-3 shadow-lg">
        <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 border border-accent-blue/25 flex items-center justify-center animate-pulse">
          <Cpu className="w-6 h-6 text-accent-blue" />
        </div>
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-semibold text-foreground">Loading Technology Network...</span>
          <p className="text-[10px] font-mono text-muted-foreground">Preparing interactive 3D nodes</p>
        </div>
      </div>
    ),
  }
);

export function HeroSection() {
  return (
    <section id="about" className="relative pt-8 pb-12 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden select-none">
      {/* Dynamic Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-accent-blue/10 via-accent-violet/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute -top-10 right-10 w-80 h-80 bg-accent-blue/8 rounded-full blur-[80px] pointer-events-none -z-10" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
      >
        {/* Left Column: Hero Text Content */}
        <motion.div variants={fadeIn} className="lg:col-span-5 space-y-5 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/20 bg-accent-blue/10 backdrop-blur-xl text-xs font-mono font-semibold text-accent-blue shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
            <span>{profileData.role}</span>
          </div>

          {/* Headline Name */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-heading font-black tracking-tight text-foreground uppercase">
              {profileData.name}
            </h1>
            <p className="text-base sm:text-lg font-medium text-foreground/90 max-w-xl">
              {profileData.tagline}
            </p>
          </div>

          {/* Value Statement */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            {profileData.summary}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <style>{`
              @keyframes border-beam-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
            <RadialGlowButton href="/os">
              <Monitor className="w-4.5 h-4.5" />
              <span>Launch ANUNAY OS</span>
              <ArrowRight className="w-4 h-4" />
            </RadialGlowButton>

            <LiquidMetalButton
              href="/resume"
              size="sm"
              icon={<FileText className="w-4 h-4 text-accent-blue dark:text-cyan-400" />}
              borderWidth={3}
              metalConfig={{
                colorBack: "#202538",
                colorTint: "#00f5d4",
                speed: 0.6,
                repetition: 4,
                distortion: 0.18,
              }}
              className="hover:scale-102 transition-transform shadow-lg shadow-cyan-500/10"
            >
              Resume
            </LiquidMetalButton>

            {/* Ultra-Premium Glassmorphic GitHub CTA */}
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="relative group inline-flex items-center justify-center h-12 p-[1.5px] rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08),0_0_12px_rgba(255,255,255,0.06)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_18px_rgba(255,255,255,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2),0_0_28px_rgba(255,255,255,0.25)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_32px_rgba(255,255,255,0.28)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              {/* Static subtle border track */}
              <div className="absolute inset-0 rounded-xl bg-black/10 dark:bg-white/10" />

              {/* Orbiting Laser Border Beam */}
              <div
                className="absolute inset-[-150%] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(148,163,184,0.3) 300deg, rgba(255,255,255,0.9) 345deg, #ffffff 360deg)",
                  animation: "border-beam-spin 3.5s linear infinite",
                }}
              />

              {/* Inner Button Body */}
              <div className="relative z-10 w-full h-full px-4 rounded-[10.5px] bg-white/90 dark:bg-[#0B0F1A]/95 backdrop-blur-2xl flex items-center gap-2.5 font-sans font-semibold text-sm text-foreground/90 group-hover:text-foreground transition-colors overflow-hidden">
                {/* Top specular reflection glare line */}
                <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/40 to-transparent pointer-events-none" />

                {/* Shimmer sweep effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform pointer-events-none" />

                {/* Micro badge icon */}
                <div className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 border border-black/10 dark:border-white/15 group-hover:scale-110 group-hover:bg-black/10 dark:group-hover:bg-white/20 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300">
                  <Github className="w-4 h-4 text-foreground transition-transform" />
                </div>

                <span className="tracking-tight">GitHub</span>

                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </div>
            </a>

            {/* Ultra-Premium Glassmorphic LinkedIn CTA */}
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="relative group inline-flex items-center justify-center h-12 p-[1.5px] rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(10,102,194,0.15),0_0_12px_rgba(56,189,248,0.12)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(14,165,233,0.25)] hover:shadow-[0_12px_32px_rgba(10,102,194,0.3),0_0_30px_rgba(56,189,248,0.35)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_36px_rgba(14,165,233,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              {/* Static subtle border track */}
              <div className="absolute inset-0 rounded-xl bg-[#0A66C2]/15 dark:bg-[#0A66C2]/25" />

              {/* Orbiting Laser Border Beam */}
              <div
                className="absolute inset-[-150%] pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, transparent 260deg, #0A66C2 300deg, #38BDF8 340deg, #ffffff 360deg)",
                  animation: "border-beam-spin 3.5s linear infinite",
                }}
              />

              {/* Inner Button Body */}
              <div className="relative z-10 w-full h-full px-4 rounded-[10.5px] bg-white/90 dark:bg-[#0B0F1A]/95 backdrop-blur-2xl flex items-center gap-2.5 font-sans font-semibold text-sm text-foreground/90 group-hover:text-foreground transition-colors overflow-hidden">
                {/* Top specular reflection glare line */}
                <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent pointer-events-none" />

                {/* Shimmer sweep effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent transition-transform pointer-events-none" />

                {/* Micro badge icon */}
                <div className="w-7 h-7 rounded-lg bg-[#0A66C2]/10 dark:bg-[#0A66C2]/20 flex items-center justify-center shrink-0 border border-[#0A66C2]/25 dark:border-[#38BDF8]/35 group-hover:scale-110 group-hover:bg-[#0A66C2]/25 dark:group-hover:bg-[#0A66C2]/35 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.4)] transition-all duration-300">
                  <Linkedin className="w-4 h-4 text-[#0A66C2] dark:text-[#38BDF8] transition-transform" />
                </div>

                <span className="tracking-tight">LinkedIn</span>

                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#0A66C2] dark:group-hover:text-[#38BDF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </div>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-3 grid grid-cols-3 gap-2 border-t border-border-color">
            <div className="p-2.5 rounded-xl bg-surface-1 border border-border-color backdrop-blur-md text-center lg:text-left">
              <div className="text-base font-bold font-mono text-accent-blue">8.51</div>
              <div className="text-[10px] font-mono text-muted-foreground">CGPA @ VIT Bhopal</div>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-1 border border-border-color backdrop-blur-md text-center lg:text-left">
              <div className="text-base font-bold font-mono text-emerald-500 dark:text-emerald-400">4 Systems</div>
              <div className="text-[10px] font-mono text-muted-foreground">Production Apps</div>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-1 border border-border-color backdrop-blur-md text-center lg:text-left">
              <div className="text-base font-bold font-mono text-purple-500 dark:text-purple-400">9 Credentials</div>
              <div className="text-[10px] font-mono text-muted-foreground">Verified Certs</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Expanded Neural Core Display Canvas */}
        <motion.div variants={fadeIn} className="lg:col-span-7">
          <div className="relative w-full h-[480px] sm:h-[520px] lg:h-[560px]">
            {/* Ambient Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue/15 via-accent-violet/10 to-accent-blue/15 rounded-2xl blur-md opacity-20 pointer-events-none" />
            <NeuralCore />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
