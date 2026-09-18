"use client";

import React from "react";
import Link from "next/link";
import { WindowContainer } from "@/components/ui/WindowContainer";
import { Button } from "@/components/ui/Button";
import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { projectsData } from "@/data/projects";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";
import { skillsData } from "@/data/skills";
import { FileText, ArrowLeft, Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-6">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <a href="/Anunay_Resume.pdf" download="Anunay_Chhapre_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="sm">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Clean Document View */}
      <WindowContainer
        title="Anunay_Chhapre_Resume.pdf"
        subtitle="Verified Official Document"
        icon={<FileText className="w-4 h-4 text-accent-blue" />}
      >
        <div className="bg-surface p-6 sm:p-10 rounded-apple-lg border border-border space-y-8 font-sans">
          {/* Header */}
          <div className="border-b border-border pb-6 space-y-3 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-foreground">{profileData.name}</h1>
            <p className="text-sm text-accent-blue font-medium">{profileData.role}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-muted-foreground pt-1">
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {profileData.phone}</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {profileData.email}</span>
              <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-blue">Summary</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{profileData.summary}</p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-blue">Technical Skills</h2>
            <div className="space-y-2 text-sm">
              {skillsData.map((cat) => (
                <div key={cat.category} className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                  <span className="font-semibold text-foreground">{cat.category}:</span>
                  <span className="sm:col-span-3 text-muted-foreground font-mono text-xs">
                    {cat.skills.map((s) => s.name).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-blue">Experience</h2>
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <span className="font-bold text-foreground">{exp.role} — <span className="font-medium text-accent-blue">{exp.company}</span> ({exp.location})</span>
                  <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 pl-1">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="leading-relaxed">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-blue">Projects</h2>
            {projectsData.map((proj) => (
              <div key={proj.id} className="space-y-1 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-foreground">{proj.title} <span className="font-mono text-xs text-muted-foreground">({proj.technologies.slice(0, 4).join(", ")})</span></span>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-accent-blue hover:underline inline-flex items-center gap-1"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-blue">Education</h2>
            {educationData.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-foreground">{edu.institution}, {edu.location}</span> — <span className="text-muted-foreground">{edu.degree}, {edu.field}</span>
                </div>
                <div className="text-xs font-mono text-right">
                  <span className="text-muted-foreground">{edu.period}</span>
                  <span className="text-accent-blue font-semibold ml-2">({edu.grade})</span>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-blue">Certifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
              {certificationsData.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-2 rounded bg-surface-hover/50 border border-border">
                  <span className="font-medium text-foreground">{c.title}</span>
                  <span className="font-mono text-[10px] text-accent-violet">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WindowContainer>
    </div>
  );
}
