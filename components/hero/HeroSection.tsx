"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { NeuralCore } from "@/components/hero/NeuralCore";
import { profileData } from "@/data/profile";
import { fadeIn, staggerContainer } from "@/lib/animations";
import {
  Monitor,
  FileText,
  Github,
  Linkedin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Code2,
  Cpu,
  Workflow,
  Zap,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-12 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden select-none">
      {/* Dynamic Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent-blue/15 via-accent-violet/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
      >
        {/* Left Column: Hero Text Content */}
        <motion.div variants={fadeIn} className="lg:col-span-5 space-y-5 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 backdrop-blur-xl text-xs font-mono font-semibold text-accent-blue shadow-sm">
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
            <Link href="/os">
              <Button size="lg" className="shadow-xl shadow-accent-blue/25 hover:scale-105 transition-transform font-bold">
                <Monitor className="w-4.5 h-4.5" />
                <span>Launch ANUNAY OS</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/resume">
              <Button variant="secondary" size="lg" className="hover:scale-105 transition-transform">
                <FileText className="w-4 h-4 text-accent-blue" />
                <span>Resume</span>
              </Button>
            </Link>

            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Button variant="outline" size="lg" className="px-3.5 hover:scale-105 transition-transform">
                <Github className="w-4.5 h-4.5" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Button variant="outline" size="lg" className="px-3.5 hover:scale-105 transition-transform">
                <Linkedin className="w-4.5 h-4.5 text-[#0A66C2]" />
                <span className="hidden sm:inline">LinkedIn</span>
              </Button>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-3 grid grid-cols-3 gap-2 border-t border-border/60">
            <div className="p-2.5 rounded-apple-md bg-surface/50 border border-border/70 backdrop-blur-md text-center lg:text-left">
              <div className="text-base font-bold font-mono text-accent-blue">8.51</div>
              <div className="text-[10px] font-mono text-muted-foreground">CGPA @ VIT Bhopal</div>
            </div>
            <div className="p-2.5 rounded-apple-md bg-surface/50 border border-border/70 backdrop-blur-md text-center lg:text-left">
              <div className="text-base font-bold font-mono text-emerald-400">4 Systems</div>
              <div className="text-[10px] font-mono text-muted-foreground">Production Apps</div>
            </div>
            <div className="p-2.5 rounded-apple-md bg-surface/50 border border-border/70 backdrop-blur-md text-center lg:text-left">
              <div className="text-base font-bold font-mono text-purple-400">9 Credentials</div>
              <div className="text-[10px] font-mono text-muted-foreground">Verified Certs</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Expanded Neural Core Display Canvas */}
        <motion.div variants={fadeIn} className="lg:col-span-7">
          <div className="relative w-full h-[480px] sm:h-[520px] lg:h-[560px]">
            {/* Ambient Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue/20 via-accent-violet/15 to-accent-blue/20 rounded-apple-xl blur-md opacity-25 pointer-events-none" />
            <NeuralCore />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
