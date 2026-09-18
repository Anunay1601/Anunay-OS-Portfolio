"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionContainer({
  id,
  title,
  subtitle,
  className,
  children,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", className)}>
      {(title || subtitle) && (
        <div className="mb-10 text-center md:text-left space-y-1.5">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
