"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  id?: string;
  tag?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionContainer({
  id,
  tag,
  title,
  subtitle,
  className,
  children,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20", className)}>
      {(title || subtitle || tag) && (
        <div className="mb-6 sm:mb-8 space-y-1.5 sm:space-y-2">
          {tag && (
            <div className="text-[11px] font-mono uppercase tracking-widest text-accent-blue font-semibold">
              {tag}
            </div>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F5F7] font-sans">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
