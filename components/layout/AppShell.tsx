"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { ResponsiveLayout } from "@/components/ui/ResponsiveLayout";
import { profileData } from "@/data/profile";
import { AnunayAIAssistant } from "@/components/ai/AnunayAIAssistant";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isOSPage = pathname === "/os";

  // Full-screen OS Desktop View: No global header, no footer, no page scrollbars
  if (isOSPage) {
    return (
      <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-background text-foreground">
        {children}
        <AnunayAIAssistant />
      </div>
    );
  }

  const footerLinks = [
    {
      label: "Email",
      href: `mailto:${profileData.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: "LinkedIn",
      href: profileData.linkedin,
      icon: Linkedin,
      external: true,
    },
    {
      label: "GitHub",
      href: profileData.github,
      icon: Github,
      external: true,
    },
  ];

  // Standard Portfolio View: Render website header, main content, and footer
  return (
    <ResponsiveLayout>
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/[0.07] py-8 text-xs text-zinc-500 bg-[#0B0C0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Minimal Contact Gateway */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-5 border-b border-white/[0.06] text-center lg:text-left">
            <p className="text-sm font-medium tracking-tight text-[#F5F5F7] font-heading">
              Let&apos;s build something meaningful.
            </p>

            <nav
              aria-label="Footer contact links"
              className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-2.5 text-xs"
            >
              <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
                {footerLinks.map(({ label, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-white/[0.07] hover:border-white/[0.18] hover:-translate-y-0.5 active:translate-y-0 text-zinc-300 hover:text-[#F5F5F7] transition-all duration-200 font-sans font-medium whitespace-nowrap"
                  >
                    <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-accent-blue transition-colors shrink-0" />
                    <span>{label}</span>
                    {external && (
                      <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all hidden sm:block shrink-0" />
                    )}
                  </a>
                ))}
              </div>

              <span className="hidden sm:block h-4 w-px bg-white/[0.08] mx-0.5" aria-hidden="true" />

              <Link
                href="/os?open=contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl border border-accent-blue/35 bg-gradient-to-b from-accent-blue/[0.14] to-accent-blue/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_16px_-6px_rgba(79,140,255,0.28)] hover:border-accent-blue/60 hover:from-accent-blue/[0.22] hover:to-accent-blue/[0.12] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_22px_-6px_rgba(79,140,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 text-[#F5F5F7] transition-all duration-200 font-sans font-medium whitespace-nowrap"
              >
                <span>Open Contact in ANUNAY OS</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent-blue group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </Link>
            </nav>
          </div>

          {/* Bottom Copyright & Affiliation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div>
              © {new Date().getFullYear()} {profileData.name}. All rights reserved.
            </div>
            <div className="font-mono text-zinc-400">
              {profileData.university}
            </div>
          </div>
        </div>
      </footer>
      <AnunayAIAssistant />
    </ResponsiveLayout>
  );
}

