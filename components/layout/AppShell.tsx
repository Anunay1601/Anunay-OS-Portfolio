"use client";

import React from "react";
import { usePathname } from "next/navigation";
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

  // Standard Portfolio View: Render website header, main content, and footer
  return (
    <ResponsiveLayout>
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-mono">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-blue transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-blue transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <span>VIT Bhopal University</span>
          </div>
        </div>
      </footer>
      <AnunayAIAssistant />
    </ResponsiveLayout>
  );
}

