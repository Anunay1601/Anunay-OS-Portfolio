"use client";

import React, { memo, forwardRef } from "react";
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
    const [isMounted, setIsMounted] = React.useState(false);
    const [isInView, setIsInView] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setIsMounted(true);
        if (!containerRef.current || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.05, rootMargin: "80px" }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 z-0 overflow-hidden", className)}
            style={style}
        >
            {isMounted && isInView ? (
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
                <div className="w-full h-full bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 opacity-60" />
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
    /** Optional icon displayed on the left */
    icon?: React.ReactNode;
    /** Border width in pixels */
    borderWidth?: number;
    /** Configuration for the LiquidMetal shader */
    metalConfig?: Omit<LiquidMetalProps, "className" | "style">;
    /** Size variant */
    size?: "xs" | "sm" | "md" | "lg";
    /** Optional href to render button as Next.js Link */
    href?: string;
}

export const LiquidMetalButton = forwardRef<
    HTMLButtonElement,
    LiquidMetalButtonProps
>(
    (
        {
            children,
            icon,
            borderWidth = 3,
            metalConfig,
            size = "sm",
            className,
            disabled,
            href,
            ...props
        },
        ref
    ) => {
        const sizeStyles = {
            xs: "py-1.5 pl-1.5 pr-4 gap-2 text-xs",
            sm: "py-2 pl-2 pr-5 gap-3 text-xs sm:text-sm",
            md: "py-2.5 pl-2.5 pr-7 gap-3.5 text-sm sm:text-base",
            lg: "py-3.5 pl-3.5 pr-9 gap-5 text-base sm:text-lg",
        };

        const iconSizes = {
            xs: "w-6 h-6",
            sm: "w-7 h-7",
            md: "w-9 h-9",
            lg: "w-11 h-11",
        };

        const buttonInner = (
            <div
                className="relative rounded-full overflow-hidden shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:shadow-[0_16px_40px_-6px_rgba(79,140,255,0.25)]"
                style={{ padding: borderWidth }}
            >
                {/* Liquid Metal Border Layer */}
                <LiquidMetal
                    colorBack={metalConfig?.colorBack ?? "#4b5563"}
                    colorTint={metalConfig?.colorTint ?? "#ffffff"}
                    speed={metalConfig?.speed ?? 0.5}
                    repetition={metalConfig?.repetition ?? 4}
                    distortion={metalConfig?.distortion ?? 0.18}
                    scale={metalConfig?.scale ?? 1}
                    className="absolute inset-0 z-0 rounded-full"
                />

                {/* Inner Button Body */}
                <div
                    className={cn(
                        "relative z-10 rounded-full flex items-center",
                        "bg-white dark:bg-[#0B0C0F]",
                        "transition-colors duration-200",
                        "group-hover:bg-neutral-50 dark:group-hover:bg-[#12141A]",
                        sizeStyles[size]
                    )}
                >
                    {icon && (
                        <div
                            className={cn(
                                "rounded-full flex items-center justify-center shrink-0",
                                "bg-neutral-100 dark:bg-white/[0.08]",
                                "shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]",
                                iconSizes[size]
                            )}
                        >
                            <span className="text-neutral-700 dark:text-neutral-200 flex items-center justify-center">
                                {icon}
                            </span>
                        </div>
                    )}
                    <span className="font-semibold tracking-tight text-neutral-900 dark:text-[#F5F5F7] flex items-center gap-2">
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
                        "relative inline-block group cursor-pointer border-none bg-transparent p-0 outline-none transition-transform hover:-translate-y-0.5 active:scale-[0.98]",
                        className
                    )}
                    aria-label={typeof children === "string" ? children : undefined}
                >
                    {buttonInner}
                </Link>
            );
        }

        return (
            <button
                ref={ref}
                disabled={disabled}
                className={cn(
                    "relative group cursor-pointer border-none bg-transparent p-0 outline-none transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
                    className
                )}
                {...props}
            >
                {buttonInner}
            </button>
        );
    }
);

LiquidMetalButton.displayName = "LiquidMetalButton";

export default LiquidMetalButton;
