"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { Network, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export function NetworkContent() {
  return (
    <div className="h-full flex flex-col space-y-4 font-sans">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Network className="w-4 h-4 text-accent-blue" />
          <span>Professional Network & Connections</span>
        </h3>
        <p className="text-xs text-muted-foreground">Digital profiles, social repositories, and developer platforms</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 overflow-y-auto">
        <a
          href={profileData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-apple-xl border border-border bg-surface/60 hover:bg-surface-hover hover:border-accent-blue/40 transition-all duration-200 space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <Github className="w-6 h-6 text-foreground group-hover:text-accent-blue transition-colors" />
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-bold text-foreground group-hover:text-accent-blue transition-colors">GitHub Profile</h4>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">github.com/Anunay1601</p>
          </div>
          <p className="text-xs text-muted-foreground">Explore open-source repositories, 3D showcases, and full-stack projects.</p>
        </a>

        <a
          href={profileData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-apple-xl border border-border bg-surface/60 hover:bg-surface-hover hover:border-[#0A66C2]/40 transition-all duration-200 space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <Linkedin className="w-6 h-6 text-[#0A66C2]" />
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-bold text-foreground group-hover:text-[#0A66C2] transition-colors">LinkedIn Network</h4>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">linkedin.com/in/anunay-chhapre-3a3b7a331/</p>
          </div>
          <p className="text-xs text-muted-foreground">Connect for software engineering roles, AI projects, and professional networking.</p>
        </a>
      </div>
    </div>
  );
}
