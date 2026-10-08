"use client";

import React, { memo, forwardRef, useState, useEffect } from "react";
import Link from "next/link";
import { LiquidMetal as LiquidMetalShader } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

// ============================================================================
// LiquidMetal - Base shader wrapper component
// ============================================================================

export interface LiquidMetalProps {
  /** Base background color of the liquid metal */
  colorBack?: string;
  /** Tint/highlight color for the chrome effect */
  colorTint?: string;
  /** Animation speed (0.1 - 2.0 recommended) */
  speed?: number;
  /** Pattern complexity/repetition (1 - 10) */
  repetition?: number;
  /** Wave distortion amount (0 - 1) */
  distortion?: number;
  /** Texture scale */
  scale?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const LiquidMetal = memo(function LiquidMetal({
  colorBack = "#aaaaac",
  colorTint = "#ffffff",
  speed = 0.5,
  repetition = 4,
  distortion = 0.1,
  scale = 1,
  className,
  style,
}: LiquidMetalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}
      style={style}
    >
      {mounted ? (
        <LiquidMetalShader
          colorBack={colorBack}
          colorTint={colorTint}
          speed={speed}
          repetition={repetition}
          distortion={distortion}
          softness={0}
          shiftRed={0.3}
          shiftBlue={-0.3}
          angle={45}
          shape="none"
          scale={scale}
          fit="cover"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 animate-pulse" />
      )}
    </div>
  );
});

LiquidMetal.displayName = "LiquidMetal";

// ============================================================================
// LiquidMetalButton - Premium button with liquid metal border effect
// ============================================================================

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode;
  /** Optional navigation URL (renders as Next.js Link) */
  href?: string;
  /** Optional icon displayed on the left */
  icon?: React.ReactNode;
  /** Border width in pixels */
  borderWidth?: number;
  /** Configuration for the LiquidMetal shader */
  metalConfig?: Omit<LiquidMetalProps, "className" | "style">;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

export const LiquidMetalButton = forwardRef<
  HTMLButtonElement,
  LiquidMetalButtonProps
>(
  (
    {
      children,
      href,
      icon,
      borderWidth = 3,
      metalConfig,
      size = "sm",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "py-2 pl-2 pr-5 gap-2.5 text-sm",
      md: "py-2.5 pl-2.5 pr-6 gap-3.5 text-sm sm:text-base",
      lg: "py-3.5 pl-3.5 pr-8 gap-5 text-base sm:text-lg",
    };

    const iconSizes = {
      sm: "w-7 h-7 sm:w-8 sm:h-8",
      md: "w-8 h-8 sm:w-9 sm:h-9",
      lg: "w-10 h-10 sm:w-11 sm:h-11",
    };

    const innerContent = (
      <div
        className="relative rounded-full overflow-hidden shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:shadow-[0_16px_40px_-6px_rgba(0,245,212,0.35)]"
        style={{ padding: borderWidth }}
      >
        {/* Liquid Metal Flowing Shader Border Layer */}
        <LiquidMetal
          colorBack={metalConfig?.colorBack ?? "#252b3d"}
          colorTint={metalConfig?.colorTint ?? "#00f5d4"}
          speed={metalConfig?.speed ?? 0.6}
          repetition={metalConfig?.repetition ?? 4}
          distortion={metalConfig?.distortion ?? 0.18}
          scale={metalConfig?.scale ?? 1}
          className="absolute inset-0 z-0 rounded-full"
        />

        {/* Inner Button Body */}
        <div
          className={cn(
            "relative z-10 rounded-full flex items-center justify-center font-sans font-semibold tracking-tight",
            "bg-white/95 dark:bg-[#0A0D17]/95 backdrop-blur-xl",
            "border border-white/40 dark:border-white/10",
            "shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.4),inset_0_-1.5px_2px_rgba(0,0,0,0.4)]",
            "transition-colors duration-200 group-hover:bg-white dark:group-hover:bg-[#101424]",
            sizeStyles[size]
          )}
        >
          {icon && (
            <div
              className={cn(
                "rounded-full flex items-center justify-center shrink-0",
                "bg-black/5 dark:bg-white/10",
                "border border-black/5 dark:border-white/10",
                "shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]",
                "transition-transform duration-200 group-hover:scale-105",
                iconSizes[size]
              )}
            >
              {icon}
            </div>
          )}
          <span className="font-semibold text-foreground">
            {children}
          </span>
        </div>
      </div>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={cn(
            "relative inline-block group cursor-pointer border-none bg-transparent p-0 outline-none transition-transform active:scale-[0.98]",
            className
          )}
          aria-label={typeof children === "string" ? children : undefined}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative inline-block group cursor-pointer border-none bg-transparent p-0 outline-none transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        {innerContent}
      </button>
    );
  }
);

LiquidMetalButton.displayName = "LiquidMetalButton";

export default LiquidMetalButton;
