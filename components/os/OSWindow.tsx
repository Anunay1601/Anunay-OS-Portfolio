"use client";

import React, { useRef } from "react";
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

// Content Module Imports
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

export function OSWindow({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMobile,
}: OSWindowProps) {
  const windowRef = useRef<HTMLDivElement | null>(null);

  if (!windowState.isOpen) return null;

  const IconComponent = ICON_MAP[windowState.iconName] || Cpu;

  // Render module content dynamically
  const renderModuleContent = () => {
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
  };

  // Mobile View: Full-screen panel instead of draggable window
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col pt-9 pb-16 px-3 animate-in fade-in slide-in-from-bottom-4">
        {/* Mobile Header Bar */}
        <div className="h-10 px-3 bg-surface border-b border-border flex items-center justify-between rounded-t-apple-lg">
          <div className="flex items-center gap-2">
            <IconComponent className="w-4 h-4 text-accent-blue" />
            <span className="text-xs font-bold text-foreground">{windowState.title}</span>
          </div>
          <button
            type="button"
            onClick={() => onClose(windowState.id)}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground bg-surface-hover transition-colors"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 p-3 bg-surface/50 rounded-b-apple-lg border-x border-b border-border overflow-y-auto">
          {renderModuleContent()}
        </div>
      </div>
    );
  }

  // Desktop View: Draggable glass window with Apple spring physics & Genie fold minimization
  return (
    <motion.div
      ref={windowRef}
      drag={!windowState.isMaximized}
      dragMomentum={false}
      onMouseDown={() => onFocus(windowState.id)}
      initial={{ opacity: 0, scale: 0.15, y: 380, transformOrigin: "bottom center" }}
      animate={{
        opacity: 1,
        scale: 1,
        x: windowState.isMaximized ? 0 : Math.round(windowState.position.x),
        y: windowState.isMaximized ? 0 : Math.round(windowState.position.y),
        width: windowState.isMaximized ? "100%" : Math.round(windowState.size.width),
        height: windowState.isMaximized ? "100%" : Math.round(windowState.size.height),
        top: 0,
        left: 0,
        transformOrigin: "bottom center",
      }}
      exit={{
        opacity: 0,
        scale: 0.08,
        y: 460,
        transformOrigin: "bottom center",
        transition: {
          duration: 0.38,
          ease: [0.32, 0, 0.67, 0],
        },
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
        mass: 0.8,
      }}
      style={{
        zIndex: windowState.zIndex,
        position: "absolute",
      }}
      className={cn(
        "rounded-apple-xl border border-white/30 dark:border-white/20 bg-white/95 dark:bg-[#0C0E17]/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden select-none os-window-content",
        windowState.isMaximized && "rounded-none border-none"
      )}
    >
      {/* Window Header Drag Handle Bar */}
      <div className="h-10 px-4 bg-surface-hover/80 border-b border-border flex items-center justify-between cursor-grab active:cursor-grabbing shrink-0">
        {/* Mac OS Window Traffic Lights Container - Stops Drag Bubbling */}
        <div
          className="flex items-center gap-2 relative z-30 pointer-events-auto"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose(windowState.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-4 h-4 rounded-full bg-[#FF5F56] hover:brightness-90 flex items-center justify-center group cursor-pointer border-none outline-none transition-transform hover:scale-110 active:scale-95"
            aria-label="Close window"
          >
            <X className="w-2.5 h-2.5 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(windowState.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-4 h-4 rounded-full bg-[#FFBD2E] hover:brightness-90 flex items-center justify-center group cursor-pointer border-none outline-none transition-transform hover:scale-110 active:scale-95"
            aria-label="Minimize window"
          >
            <Minus className="w-2.5 h-2.5 text-amber-950 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(windowState.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-4 h-4 rounded-full bg-[#27C93F] hover:brightness-90 flex items-center justify-center group cursor-pointer border-none outline-none transition-transform hover:scale-110 active:scale-95"
            aria-label="Maximize window"
          >
            <Maximize2 className="w-2.5 h-2.5 text-emerald-950 opacity-0 group-hover:opacity-100 transition-opacity" />
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
      <div className={cn("flex-1 overflow-auto bg-white/70 dark:bg-[#0E111D]/90 backdrop-blur-2xl flex flex-col min-h-0 no-scrollbar text-foreground font-sans", windowState.id === "neural-core" ? "p-2 sm:p-3" : "p-5 sm:p-6")}>
        {renderModuleContent()}
      </div>
    </motion.div>
  );
}
