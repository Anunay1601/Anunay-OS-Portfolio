"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Minimize2, Maximize2, X, Minus } from "lucide-react";

interface WindowContainerProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function WindowContainer({
  title,
  subtitle,
  icon,
  onClose,
  onMinimize,
  onMaximize,
  className,
  children,
}: WindowContainerProps) {
  return (
    <div
      className={cn(
        "rounded-apple-xl border border-border bg-surface/90 backdrop-blur-xl shadow-apple-window overflow-hidden flex flex-col transition-all duration-300",
        className
      )}
    >
      {/* Window Header Bar */}
      <div className="h-10 px-4 bg-surface-hover/80 border-b border-border flex items-center justify-between select-none">
        {/* Mac OS Window Traffic Lights */}
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close window"
              className="w-4 h-4 rounded-full bg-[#FF5F56] hover:brightness-90 flex items-center justify-center group cursor-pointer border-none outline-none transition-transform hover:scale-110 active:scale-95"
            >
              <X className="w-2.5 h-2.5 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
          {onMinimize && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              aria-label="Minimize window"
              className="w-4 h-4 rounded-full bg-[#FFBD2E] hover:brightness-90 flex items-center justify-center group cursor-pointer border-none outline-none transition-transform hover:scale-110 active:scale-95"
            >
              <Minus className="w-2.5 h-2.5 text-amber-950 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
          {onMaximize && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
              aria-label="Maximize window"
              className="w-4 h-4 rounded-full bg-[#27C93F] hover:brightness-90 flex items-center justify-center group cursor-pointer border-none outline-none transition-transform hover:scale-110 active:scale-95"
            >
              <Maximize2 className="w-2.5 h-2.5 text-emerald-950 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>

        {/* Window Title */}
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          {icon}
          <span>{title}</span>
          {subtitle && (
            <span className="text-muted-foreground font-normal hidden sm:inline">
              — {subtitle}
            </span>
          )}
        </div>

        {/* Empty Spacer */}
        <div className="w-12" />
      </div>

      {/* Window Content */}
      <div className="p-4 sm:p-6 flex-1 overflow-auto">{children}</div>
    </div>
  );
}
