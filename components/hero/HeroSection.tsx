"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { certificationsData } from "@/data/certifications";
import { projectsData } from "@/data/projects";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { AbstractNeuralCore } from "@/components/hero/AbstractNeuralCore";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import {
  Monitor,
  FileText,
  Github,
  Linkedin,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="about"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Subtle Restrained Ambient Lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[320px] sm:w-[500px] lg:w-[600px] h-[320px] sm:h-[500px] lg:h-[600px] max-w-full bg-accent-blue/[0.04] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />

      <motion.div
        variants={staggerContainer}
        initial={false}
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto"
      >
        {/* Left Column: Editorial Headline & Identity */}
        <motion.div variants={fadeIn} className="lg:col-span-7 space-y-3.5 sm:space-y-4 text-center lg:text-left">
          {/* Eyebrow: Restrained Verified Identifier */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md text-[10.5px] xs:text-xs font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse shrink-0" />
            <span className="text-zinc-300 font-semibold tracking-wider uppercase whitespace-nowrap">
              COMPUTER SCIENCE · AI &amp; ML
            </span>
            <span className="text-zinc-600">•</span>
            <span className="whitespace-nowrap">VIT BHOPAL</span>
          </div>

          {/* Main Identity & Editorial Headline */}
          <div className="space-y-2 sm:space-y-2.5">
            {/* Dominant Name: Strictly in two deliberate lines (Line 1: ANUNAY, Line 2: CHHAPRE) */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-[4.75rem] font-black tracking-tight text-[#F5F5F7] font-heading leading-[0.90] uppercase">
              <span className="block">ANUNAY</span>
              <span className="block text-zinc-100">CHHAPRE</span>
            </h1>

            {/* Secondary Supporting Quote: Matches Outfit typography of the name */}
            <p className="text-base sm:text-lg md:text-xl font-medium tracking-[-0.015em] font-heading text-zinc-200 leading-snug">
              Building thoughtful software.{" "}
              <span className="text-zinc-400 font-normal">
                Exploring intelligent systems.
              </span>
            </p>
          </div>

          {/* Supporting Text: Natural, unpretentious overview in matching font */}
          <p className="text-xs sm:text-sm md:text-[14px] text-zinc-400 leading-relaxed max-w-xl font-heading font-normal tracking-[-0.01em]">
            Computer Science undergraduate at VIT Bhopal University. I develop full-stack software, explore AI automation pipelines, and turn technical ideas into useful digital experiences.
          </p>

          {/* Action CTAs */}
          <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            {/* Primary Action: Explore My Work - Luminous Electric Capsule */}
            <a
              href="#projects"
              className="relative group inline-flex items-center gap-3 py-2 pl-2 pr-5 rounded-full bg-gradient-to-r from-blue-600 via-accent-blue to-blue-500 text-white font-semibold text-xs sm:text-sm border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_32px_-8px_rgba(37,99,235,0.5)] hover:shadow-[0_16px_40px_-6px_rgba(79,140,255,0.65)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* Ambient Glow Aura */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-accent-blue to-cyan-400 opacity-40 blur-md group-hover:opacity-85 transition-opacity duration-300 pointer-events-none -z-10" />

              {/* Shimmer Sheen Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none rounded-full" />

              {/* Relatable Icon Pod: Software engineering & projects icon */}
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] shrink-0">
                <Code2 className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform duration-200" />
              </div>

              <span>Explore My Work</span>
              <ArrowDown className="w-3.5 h-3.5 text-white/90 group-hover:translate-y-0.5 transition-transform" />
            </a>

            {/* Secondary Action: Enter ANUNAY OS - VengeanceUI Liquid Metal Style */}
            <LiquidMetalButton
              href="/os"
              size="sm"
              borderWidth={2.5}
              metalConfig={{
                colorBack: "#1e293b",
                colorTint: "#60a5fa",
                speed: 0.55,
                repetition: 4,
                distortion: 0.18,
              }}
              icon={<Monitor className="w-3.5 h-3.5 text-accent-blue" />}
            >
              <span>Enter ANUNAY OS</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </LiquidMetalButton>
          </div>

          {/* Social Links & Resume: Moderately increased size, strictly smaller than the CTAs above */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs font-mono">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.07] hover:border-white/[0.18] text-zinc-300 hover:text-[#F5F5F7] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
            >
              <Github className="w-4 h-4 text-zinc-400" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.07] hover:border-white/[0.18] text-zinc-300 hover:text-[#F5F5F7] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
            >
              <Linkedin className="w-4 h-4 text-zinc-400" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.07] hover:border-white/[0.18] text-zinc-300 hover:text-[#F5F5F7] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
            >
              <FileText className="w-4 h-4 text-accent-blue" />
              <span>Resume (PDF)</span>
            </Link>
          </div>

          {/* Accurate Verified Stats Bar */}
          <div className="pt-2.5 grid grid-cols-3 gap-2 sm:gap-3 border-t border-white/[0.07] max-w-lg mx-auto lg:mx-0">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#111318]/90 border border-white/[0.06] text-center lg:text-left">
              <div className="text-sm sm:text-base font-bold font-mono text-accent-blue">{profileData.cgpa.split(" ")[0]}</div>
              <div className="text-[10px] font-mono text-zinc-400 mt-0.5">CGPA • VIT Bhopal</div>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#111318]/90 border border-white/[0.06] text-center lg:text-left">
              <div className="text-sm sm:text-base font-bold font-mono text-[#F5F5F7]">{projectsData.length}</div>
              <div className="text-[10px] font-mono text-zinc-400 mt-0.5">Featured Projects</div>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#111318]/90 border border-white/[0.06] text-center lg:text-left">
              <div className="text-sm sm:text-base font-bold font-mono text-[#F5F5F7]">{certificationsData.length}</div>
              <div className="text-[10px] font-mono text-zinc-400 mt-0.5">Certifications</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Abstract Neural Core Signature Visual */}
        <motion.div variants={fadeIn} className="lg:col-span-5 flex items-center justify-center">
          <AbstractNeuralCore />
        </motion.div>
      </motion.div>
    </section>
  );
}
