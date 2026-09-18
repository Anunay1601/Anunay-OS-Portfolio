"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveLayout({ children, className }: ResponsiveLayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-accent-blue/20 selection:text-accent-blue", className)}>
      {children}
    </div>
  );
}
