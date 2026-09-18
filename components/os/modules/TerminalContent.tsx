"use client";

import React, { useState, useRef, useEffect } from "react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";
import { ExternalLink, Terminal, Sparkles, CheckCircle2 } from "lucide-react";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export function TerminalContent() {
  const [input, setInput] = useState("");
  const [commandListHistory, setCommandListHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "neofetch",
      output: (
        <div className="space-y-2 text-xs font-mono">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <pre className="text-accent-blue font-bold leading-none hidden xs:block select-none text-[10px] sm:text-xs">
{`       /\\       
      /  \\      
     / /\\ \\     
    / ____ \\    
   /_/    \\_\\   `}
            </pre>
            <div className="space-y-1 text-xs font-mono">
              <div className="text-accent-blue font-bold">anunay@anunay-os</div>
              <div className="text-muted-foreground">----------------</div>
              <div><span className="text-accent-blue font-semibold">OS:</span> ANUNAY OS v1.0 Kernel (x86_64)</div>
              <div><span className="text-accent-blue font-semibold">Host:</span> VIT Bhopal University (B.Tech CSE AI & ML)</div>
              <div><span className="text-accent-blue font-semibold">Developer:</span> {profileData.name} (CGPA: 8.51/10)</div>
              <div><span className="text-accent-blue font-semibold">Location:</span> {profileData.location}</div>
              <div><span className="text-accent-blue font-semibold">Shell:</span> zsh 5.9 (x86_64-apple-darwin)</div>
              <div><span className="text-accent-blue font-semibold">Core Stack:</span> Java, Python, TypeScript, React, Next.js, n8n</div>
              <div><span className="text-accent-blue font-semibold">Deployments:</span> 4 Verified Systems • 9 Certifications</div>
            </div>
          </div>
          <div className="text-muted-foreground pt-1 border-t border-white/10">
            Type <span className="text-accent-blue font-bold">'help'</span> to see all available commands.
          </div>
        </div>
      ),
    },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandListHistory.length === 0) return;
      const nextIdx = historyPointer === -1 ? commandListHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextIdx);
      setInput(commandListHistory[nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextIdx = historyPointer + 1;
      if (nextIdx >= commandListHistory.length) {
        setHistoryPointer(-1);
        setInput("");
      } else {
        setHistoryPointer(nextIdx);
        setInput(commandListHistory[nextIdx]);
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");
    setHistoryPointer(-1);

    if (!cmd) return;

    setCommandListHistory((prev) => [...prev, cmd]);

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-accent-blue font-bold pb-1 border-b border-white/10">
              AVAILABLE COMMANDS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pt-1">
              <div><span className="text-accent-blue font-bold">neofetch</span> — Display system kernel specs</div>
              <div><span className="text-accent-blue font-bold">about</span> — Developer bio & CGPA details</div>
              <div><span className="text-accent-blue font-bold">projects</span> — List all software systems</div>
              <div><span className="text-accent-blue font-bold">skills</span> — Display technical skill matrices</div>
              <div><span className="text-accent-blue font-bold">experience</span> — View internship deployments</div>
              <div><span className="text-accent-blue font-bold">education</span> — Academic degree & university</div>
              <div><span className="text-accent-blue font-bold">certifications</span> — List verified cert vault</div>
              <div><span className="text-accent-blue font-bold">github</span> — Open GitHub repository profile</div>
              <div><span className="text-accent-blue font-bold">linkedin</span> — Open LinkedIn network profile</div>
              <div><span className="text-accent-blue font-bold">resume</span> — View & download official CV</div>
              <div><span className="text-accent-blue font-bold">contact</span> — Reach out via email / social</div>
              <div><span className="text-accent-blue font-bold">clear</span> — Clear terminal screen</div>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-2 text-xs font-mono leading-relaxed">
            <div className="text-accent-blue font-bold uppercase">{profileData.name} — {profileData.role}</div>
            <div>{profileData.tagline}</div>
            <div className="text-muted-foreground">{profileData.summary}</div>
            <div className="pt-1 text-emerald-400 font-semibold">
              VIT Bhopal University • B.Tech CSE (AI & ML) • CGPA: 8.51 / 10
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-3 text-xs font-mono">
            <div className="text-accent-blue font-bold tracking-wider uppercase border-b border-white/10 pb-1">
              PROJECT LAB
            </div>
            <div className="space-y-2">
              {projectsData.map((p, idx) => (
                <div key={p.id} className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-accent-blue font-bold font-mono">0{idx + 1}</span>
                    <span className="font-bold text-foreground">{p.title}</span>
                    <span className="text-[10px] text-muted-foreground">({p.category})</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">● {p.status}</span>
                  </div>
                  <div className="pl-6 text-muted-foreground text-[11px]">{p.subtitle}</div>
                  <div className="pl-6 text-[10px] text-accent-violet">
                    Stack: {p.technologies.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-accent-violet font-bold uppercase border-b border-white/10 pb-1">
              TECHNICAL SKILL MATRIX
            </div>
            {skillsData.map((group) => (
              <div key={group.category} className="space-y-0.5">
                <span className="text-accent-blue font-semibold">{group.category}:</span>{" "}
                <span className="text-foreground">{group.skills.map((s) => s.name).join(" • ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-3 text-xs font-mono">
            <div className="text-emerald-400 font-bold uppercase border-b border-white/10 pb-1">
              WORKPLACE DEPLOYMENTS & INTERNSHIPS
            </div>
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex items-center justify-between text-foreground">
                  <span className="font-bold text-emerald-400">{exp.role} @ {exp.company}</span>
                  <span className="text-muted-foreground text-[10px]">{exp.period}</span>
                </div>
                <div className="text-muted-foreground text-[11px]">{exp.location} • {exp.type}</div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-foreground/90 pl-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        output = (
          <div className="space-y-3 text-xs font-mono">
            <div className="text-accent-blue font-bold uppercase border-b border-white/10 pb-1">
              ACADEMIC MILESTONES
            </div>
            {educationData.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>{edu.institution}</span>
                  <span className="text-muted-foreground text-[10px]">{edu.period}</span>
                </div>
                <div className="text-accent-blue">{edu.degree} — {edu.field}</div>
                <div className="text-emerald-400 font-bold">{edu.grade}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "certifications":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-accent-violet font-bold uppercase border-b border-white/10 pb-1">
              VERIFIED CREDENTIAL VAULT ({certificationsData.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {certificationsData.map((cert) => (
                <div key={cert.id} className="p-2 rounded bg-white/5 border border-white/10 space-y-0.5">
                  <div className="font-bold text-foreground flex items-center justify-between text-[11px]">
                    <span className="line-clamp-1">{cert.title}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-[10px] text-muted-foreground">{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "github":
        if (typeof window !== "undefined") {
          window.open(profileData.github, "_blank");
        }
        output = (
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span>Opening GitHub profile:</span>
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="underline font-bold">
              {profileData.github}
            </a>
            <ExternalLink className="w-3 h-3" />
          </div>
        );
        break;

      case "linkedin":
        if (typeof window !== "undefined") {
          window.open(profileData.linkedin, "_blank");
        }
        output = (
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span>Opening LinkedIn profile:</span>
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="underline font-bold">
              {profileData.linkedin}
            </a>
            <ExternalLink className="w-3 h-3" />
          </div>
        );
        break;

      case "resume":
        output = (
          <div className="text-xs font-mono space-y-1">
            <div className="text-accent-blue font-bold">Official CV / Resume Artifact:</div>
            <div className="flex items-center gap-2">
              <a href="/resume" className="px-3 py-1 rounded bg-accent-blue/20 text-accent-blue border border-accent-blue/30 hover:bg-accent-blue/30 transition-colors inline-flex items-center gap-1">
                <span>View Official Resume</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="/Anunay_Resume.pdf" download="Anunay_Chhapre_Resume.pdf" className="px-3 py-1 rounded bg-white/10 text-foreground border border-white/20 hover:bg-white/20 transition-colors">
                Download PDF
              </a>
            </div>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-accent-blue font-bold uppercase">REACH OUT TO ANUNAY CHHAPRE</div>
            <div>Email: <a href={`mailto:${profileData.email}`} className="text-accent-blue underline">{profileData.email}</a></div>
            <div>Location: {profileData.location}</div>
            <div>GitHub: <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">{profileData.github}</a></div>
            <div>LinkedIn: <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">{profileData.linkedin}</a></div>
          </div>
        );
        break;

      case "neofetch":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <pre className="text-accent-blue font-bold leading-none hidden xs:block select-none text-[10px] sm:text-xs">
{`       /\\       
      /  \\      
     / /\\ \\     
    / ____ \\    
   /_/    \\_\\   `}
              </pre>
              <div className="space-y-1 text-xs font-mono">
                <div className="text-accent-blue font-bold">anunay@anunay-os</div>
                <div className="text-muted-foreground">----------------</div>
                <div><span className="text-accent-blue font-semibold">OS:</span> ANUNAY OS v1.0 Kernel (x86_64)</div>
                <div><span className="text-accent-blue font-semibold">Host:</span> VIT Bhopal University (B.Tech CSE AI & ML)</div>
                <div><span className="text-accent-blue font-semibold">Developer:</span> {profileData.name} (CGPA: 8.51/10)</div>
                <div><span className="text-accent-blue font-semibold">Location:</span> {profileData.location}</div>
                <div><span className="text-accent-blue font-semibold">Shell:</span> zsh 5.9 (x86_64-apple-darwin)</div>
                <div><span className="text-accent-blue font-semibold">Core Stack:</span> Java, Python, TypeScript, React, Next.js, n8n</div>
              </div>
            </div>
          </div>
        );
        break;

      default:
        output = (
          <div className="text-xs font-mono text-red-400">
            zsh: command not found: '{cmd}'. Type <span className="text-accent-blue font-bold">'help'</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full flex flex-col font-mono text-xs bg-[#0A0C14]/95 p-4 rounded-apple-lg border border-white/20 text-foreground space-y-3 overflow-hidden select-text cursor-text shadow-2xl"
    >
      <div className="flex items-center justify-between text-muted-foreground border-b border-white/10 pb-2 text-[11px] select-none">
        <span className="flex items-center gap-1.5 text-foreground font-semibold">
          <Terminal className="w-3.5 h-3.5 text-accent-blue" />
          <span>anunay@os ~ zsh 5.9</span>
        </span>
        <span className="hidden sm:inline">Use ↑ ↓ for history • Type 'help'</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-accent-blue font-bold">
              <span>anunay@os ~ %</span>
              <span className="text-foreground">{item.command}</span>
            </div>
            <div className="pl-4 text-foreground/95">{item.output}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-white/10 shrink-0">
        <span className="text-accent-blue font-bold whitespace-nowrap">anunay@os ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type command..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none font-mono text-xs"
        />
      </form>
    </div>
  );
}
