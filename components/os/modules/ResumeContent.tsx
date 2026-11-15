"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { educationData } from "@/data/education";
import { experienceData } from "@/data/experience";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ResumeContent() {
  const degree = educationData[0];

  return (
    <div className="h-full flex flex-col space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent-blue" />
            <span>Official Resume Document</span>
          </h3>
          <p className="text-xs text-muted-foreground">{profileData.name} — Verified Curriculum Vitae</p>
        </div>
        <a href="/Anunay Resume.pdf" download="Anunay Resume.pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="sm">
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </Button>
        </a>
      </div>

      <div className="flex-1 overflow-y-auto p-4 rounded-apple-lg border border-border bg-surface/60 space-y-4 text-xs">
        <div>
          <h4 className="font-bold text-sm text-foreground">{profileData.name}</h4>
          <p className="text-accent-blue font-medium">{profileData.role}</p>
          <p className="text-muted-foreground mt-1">{profileData.summary}</p>
        </div>

        <div className="space-y-1">
          <span className="font-mono font-bold text-accent-blue uppercase block">Education</span>
          {degree && (
            <p className="text-foreground font-semibold">
              {degree.institution} — {degree.degree}, {degree.field} ({degree.period})
            </p>
          )}
          <p className="text-emerald-400 font-mono">CGPA: {profileData.cgpa}</p>
        </div>

        <div className="space-y-1">
          <span className="font-mono font-bold text-accent-blue uppercase block">Key Internships</span>
          {experienceData.map((exp) => (
            <p key={exp.id} className="text-foreground">
              {exp.role} @ {exp.company} ({exp.period})
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
