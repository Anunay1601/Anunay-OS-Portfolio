"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({
  label = "Initializing ANUNAY OS...",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center gap-3 min-h-[200px]",
        className
      )}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Subtle Apple Spinner */}
        <div className="w-8 h-8 rounded-full border-2 border-accent-blue/20 border-t-accent-blue animate-spin" />
      </div>
      <p className="text-xs font-mono text-muted-foreground animate-pulse">
        {label}
      </p>
    </div>
  );
}
