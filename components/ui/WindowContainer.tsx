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
        <div className="flex items-center gap-2 -ml-1 px-1.5 py-1 rounded-lg group/traffic cursor-pointer select-none">
          {onClose && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close window"
              title="Close"
              className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:brightness-95 flex items-center justify-center cursor-pointer border-none outline-none transition-transform duration-75 hover:scale-110 active:scale-90 relative before:absolute before:-inset-2 before:content-[''] before:rounded-full"
            >
              <X className="w-2.5 h-2.5 text-[#4D0000] stroke-[2.5] opacity-0 group-hover/traffic:opacity-100 transition-none" />
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
              title="Minimize"
              className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:brightness-95 flex items-center justify-center cursor-pointer border-none outline-none transition-transform duration-75 hover:scale-110 active:scale-90 relative before:absolute before:-inset-2 before:content-[''] before:rounded-full"
            >
              <Minus className="w-2.5 h-2.5 text-[#5A3B00] stroke-[2.5] opacity-0 group-hover/traffic:opacity-100 transition-none" />
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
              title="Zoom / Maximize"
              className="w-3.5 h-3.5 rounded-full bg-[#27C93F] hover:brightness-95 flex items-center justify-center cursor-pointer border-none outline-none transition-transform duration-75 hover:scale-110 active:scale-90 relative before:absolute before:-inset-2 before:content-[''] before:rounded-full"
            >
              <Maximize2 className="w-2 h-2 text-[#004D11] stroke-[2.5] opacity-0 group-hover/traffic:opacity-100 transition-none" />
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
