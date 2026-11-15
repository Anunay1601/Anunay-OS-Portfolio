"use client";

import React, { useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WindowState, WindowId } from "@/hooks/useOSStore";
import {
  X,
  Minus,
  Maximize2,
  Cpu,
  FolderGit2,
  Code2,
  Workflow,
  History,
  Award,
  Terminal,
  FileText,
  Network,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Static Content Module Imports (Zero-Latency Instant Mounting)
import { NeuralCore } from "@/components/hero/NeuralCore";
import { ProjectLabContent } from "@/components/os/modules/ProjectLabContent";
import { DevEnvContent } from "@/components/os/modules/DevEnvContent";
import { AutomationCoreContent } from "@/components/os/modules/AutomationCoreContent";
import { SystemLogsContent } from "@/components/os/modules/SystemLogsContent";
import { CredentialVaultContent } from "@/components/os/modules/CredentialVaultContent";
import { TerminalContent } from "@/components/os/modules/TerminalContent";
import { ResumeContent } from "@/components/os/modules/ResumeContent";
import { NetworkContent } from "@/components/os/modules/NetworkContent";
import { ContactContent } from "@/components/os/modules/ContactContent";

const ICON_MAP: Record<string, any> = {
  Cpu,
  FolderGit2,
  Code2,
  Workflow,
  History,
  Award,
  Terminal,
  FileText,
  Network,
  Mail,
};

interface OSWindowProps {
  windowState: WindowState;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
  isMobile: boolean;
}

export const OSWindow = React.memo(function OSWindow({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMobile,
}: OSWindowProps) {
  const windowRef = useRef<HTMLDivElement | null>(null);

  const moduleContent = useMemo(() => {
    switch (windowState.id) {
      case "neural-core":
        return <NeuralCore />;
      case "project-lab":
        return <ProjectLabContent />;
      case "dev-env":
        return <DevEnvContent />;
      case "automation-core":
        return <AutomationCoreContent />;
      case "system-logs":
        return <SystemLogsContent />;
      case "credential-vault":
        return <CredentialVaultContent />;
      case "terminal":
        return <TerminalContent />;
      case "resume":
        return <ResumeContent />;
      case "network":
        return <NetworkContent />;
      case "contact":
        return <ContactContent />;
      default:
        return <div>Module Content</div>;
    }
  }, [windowState.id]);

  if (!windowState.isOpen) return null;

  const IconComponent = ICON_MAP[windowState.iconName] || Cpu;

  // Mobile View: Full-screen panel with native iOS sheet spring transition
  if (isMobile) {
    return (
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={windowState.title}
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.8 }}
        style={{ zIndex: windowState.zIndex }}
        className="fixed inset-0 bg-background/95 backdrop-blur-xl flex flex-col pt-12 pb-24 px-3"
      >
        {/* Mobile Header Bar */}
        <div className="h-10 px-3 bg-surface border-b border-border flex items-center justify-between rounded-t-apple-lg shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <IconComponent className="w-4 h-4 text-accent-blue shrink-0" />
            <span className="text-xs font-bold text-foreground truncate">{windowState.title}</span>
          </div>
          <button
            type="button"
            onClick={() => onClose(windowState.id)}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground bg-surface-hover transition-colors shrink-0"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 p-3 bg-surface/50 rounded-b-apple-lg border-x border-b border-border overflow-y-auto no-scrollbar">
          {moduleContent}
        </div>
      </motion.div>
    );
  }

  const targetX = windowState.isMaximized ? 0 : Math.round(windowState.position.x);
  const targetY = windowState.isMaximized ? 0 : Math.round(windowState.position.y);
  const targetW = windowState.isMaximized ? "100%" : Math.round(windowState.size.width);
  const targetH = windowState.isMaximized ? "100%" : Math.round(windowState.size.height);

  // Desktop View: Draggable glass window with Apple macOS / visionOS Spring Bloom
  return (
    <motion.div
      ref={windowRef}
      role="dialog"
      aria-label={`${windowState.title} — ${windowState.subtitle}`}
      drag={!windowState.isMaximized}
      dragMomentum={false}
      onMouseDown={() => onFocus(windowState.id)}
      initial={{
        opacity: 0,
        x: targetX,
        y: targetY + 10,
      }}
      animate={{
        opacity: 1,
        x: targetX,
        y: targetY,
      }}
      exit={{
        opacity: 0,
        y: targetY + 10,
        transition: {
          duration: 0.14,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.6,
      }}
      style={{
        zIndex: windowState.zIndex,
        position: "absolute",
        top: 0,
        left: 0,
        width: targetW,
        height: targetH,
      }}
      className={cn(
        "rounded-2xl border border-white/30 dark:border-white/20 bg-white/95 dark:bg-[#0C0E17]/95 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden select-none os-window-content",
        windowState.isMaximized && "rounded-none border-none shadow-none"
      )}
    >
      {/* Window Header Drag Handle Bar */}
      <div className="h-10 px-4 bg-surface-2/60 border-b border-border-color flex items-center justify-between cursor-grab active:cursor-grabbing shrink-0">
        {/* Mac OS Window Traffic Lights Container - Stops Drag Bubbling */}
        <div
          className="flex items-center gap-0 -ml-2 rounded-lg group/traffic relative z-30 pointer-events-auto select-none"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button (Red) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose(windowState.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-7 h-7 flex items-center justify-center cursor-pointer border-none outline-none group/btn"
            aria-label="Close window"
            title="Close"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] group-hover/btn:brightness-95 flex items-center justify-center transition-transform duration-75 group-hover/btn:scale-110 group-active/btn:scale-90">
              <X className="w-2.5 h-2.5 text-[#4D0000] stroke-[2.5] opacity-0 group-hover/traffic:opacity-100 transition-none" />
            </div>
          </button>

          {/* Minimize Button (Yellow) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(windowState.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-7 h-7 flex items-center justify-center cursor-pointer border-none outline-none group/btn"
            aria-label="Minimize window"
            title="Minimize"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] group-hover/btn:brightness-95 flex items-center justify-center transition-transform duration-75 group-hover/btn:scale-110 group-active/btn:scale-90">
              <Minus className="w-2.5 h-2.5 text-[#5A3B00] stroke-[2.5] opacity-0 group-hover/traffic:opacity-100 transition-none" />
            </div>
          </button>

          {/* Maximize Button (Green) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(windowState.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-7 h-7 flex items-center justify-center cursor-pointer border-none outline-none group/btn"
            aria-label="Maximize window"
            title="Zoom / Maximize"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] group-hover/btn:brightness-95 flex items-center justify-center transition-transform duration-75 group-hover/btn:scale-110 group-active/btn:scale-90">
              <Maximize2 className="w-2 h-2 text-[#004D11] stroke-[2.5] opacity-0 group-hover/traffic:opacity-100 transition-none" />
            </div>
          </button>
        </div>

        {/* Window Title */}
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <IconComponent className="w-3.5 h-3.5 text-accent-blue" />
          <span>{windowState.title}</span>
          <span className="text-muted-foreground font-normal text-[11px] hidden sm:inline">
            — {windowState.subtitle}
          </span>
        </div>

        <div className="w-12" />
      </div>

      {/* Module Content Container */}
      <div className={cn("flex-1 overflow-auto bg-white/80 dark:bg-[#0E111D]/90 backdrop-blur-xl flex flex-col min-h-0 no-scrollbar text-foreground font-sans", windowState.id === "neural-core" ? "p-2 sm:p-3" : "p-4 sm:p-6")}>
        {moduleContent}
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.windowState.id === nextProps.windowState.id &&
    prevProps.windowState.isOpen === nextProps.windowState.isOpen &&
    prevProps.windowState.isMinimized === nextProps.windowState.isMinimized &&
    prevProps.windowState.isMaximized === nextProps.windowState.isMaximized &&
    prevProps.windowState.zIndex === nextProps.windowState.zIndex &&
    prevProps.windowState.position.x === nextProps.windowState.position.x &&
    prevProps.windowState.position.y === nextProps.windowState.position.y &&
    prevProps.windowState.size.width === nextProps.windowState.size.width &&
    prevProps.windowState.size.height === nextProps.windowState.size.height
  );
});
