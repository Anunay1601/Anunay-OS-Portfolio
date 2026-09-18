"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { Mail, Phone, MapPin, Send, CheckCircle2, Linkedin, Github, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="h-full flex flex-col space-y-4 font-sans select-none">
      <div className="border-b border-border/60 pb-3 shrink-0">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4 text-accent-blue" />
          <span>Direct Communication & Network Profiles</span>
        </h3>
        <p className="text-xs text-muted-foreground">Reach out via email, phone, or connect directly on professional networks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto pr-1 no-scrollbar">
        {/* Direct Contact Details & Professional Links */}
        <div className="space-y-3">
          {/* Contact Info Card */}
          <div className="p-4 rounded-apple-lg border border-border/80 bg-surface/60 space-y-3 shadow-sm">
            <h4 className="text-xs font-mono font-bold uppercase text-accent-blue tracking-wider">
              Contact Specifications
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent-blue shrink-0" />
                  <a href={`mailto:${profileData.email}`} className="hover:underline font-mono">
                    {profileData.email}
                  </a>
                </div>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors"
                >
                  Email
                </a>
              </div>

              <div className="flex items-center justify-between text-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent-blue shrink-0" />
                  <span className="font-mono">+91 {profileData.phone}</span>
                </div>
                <a
                  href={`tel:+91${profileData.phone}`}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  Call
                </a>
              </div>

              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-accent-blue shrink-0" />
                <span className="font-mono">{profileData.location}</span>
              </div>
            </div>
          </div>

          {/* LinkedIn Profile Redirect Card */}
          <div className="p-4 rounded-apple-lg border border-accent-blue/30 bg-accent-blue/5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-apple-md bg-accent-blue text-white flex items-center justify-center shrink-0">
                  <Linkedin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">LinkedIn Profile</h4>
                  <p className="text-[10px] font-mono text-muted-foreground">Anunay Chhapre</p>
                </div>
              </div>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-apple-md text-xs font-mono font-semibold bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <span>Connect</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* GitHub Profile Redirect Card */}
          <div className="p-4 rounded-apple-lg border border-border/80 bg-surface/60 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-apple-md bg-foreground/10 border border-border text-foreground flex items-center justify-center shrink-0">
                  <Github className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">GitHub Profile</h4>
                  <p className="text-[10px] font-mono text-muted-foreground">@Anunay1601</p>
                </div>
              </div>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-apple-md text-xs font-mono font-semibold bg-surface-hover hover:bg-surface-active text-foreground border border-border transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>View GitHub</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="p-4 rounded-apple-lg border border-border/80 bg-surface/60 space-y-3 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-accent-blue tracking-wider mb-2">
              Send Direct Message
            </h4>
            {submitted ? (
              <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/20 rounded-apple-md">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-emerald-300">Message Transmitted!</div>
                <p className="text-[11px] text-muted-foreground">Thank you for reaching out. I will get back to your email promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-muted-foreground font-mono text-[10px] mb-1">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Recruiter / Hiring Manager"
                    className="w-full px-3 py-2 rounded-apple-sm bg-surface border border-border/80 text-foreground focus:outline-none focus:border-accent-blue font-sans"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground font-mono text-[10px] mb-1">Your Email</label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-apple-sm bg-surface border border-border/80 text-foreground focus:outline-none focus:border-accent-blue font-sans"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground font-mono text-[10px] mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Hello Anunay, we would love to discuss a opportunity..."
                    className="w-full px-3 py-2 rounded-apple-sm bg-surface border border-border/80 text-foreground focus:outline-none focus:border-accent-blue font-sans"
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
