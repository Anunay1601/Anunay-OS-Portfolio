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
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Reusable module loader skeleton
const ModuleLoader = ({ title }: { title?: string }) => (
  <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center space-y-3 p-8">
    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center animate-pulse">
      <Cpu className="w-5 h-5 text-accent-blue animate-spin" />
    </div>
    <span className="text-xs font-mono text-muted-foreground">Loading {title || "Module"}...</span>
  </div>
);

// Dynamic Content Module Imports (Code-Splitting for Production Performance)
const NeuralCore = dynamic(
  () => import("@/components/hero/NeuralCore").then((m) => m.NeuralCore),
  { ssr: false, loading: () => <ModuleLoader title="Neural Core" /> }
);
const ProjectLabContent = dynamic(
  () => import("@/components/os/modules/ProjectLabContent").then((m) => m.ProjectLabContent),
  { ssr: false, loading: () => <ModuleLoader title="Project Lab" /> }
);
const DevEnvContent = dynamic(
  () => import("@/components/os/modules/DevEnvContent").then((m) => m.DevEnvContent),
  { ssr: false, loading: () => <ModuleLoader title="Dev Environment" /> }
);
const AutomationCoreContent = dynamic(
  () => import("@/components/os/modules/AutomationCoreContent").then((m) => m.AutomationCoreContent),
  { ssr: false, loading: () => <ModuleLoader title="Automation Core" /> }
);
const SystemLogsContent = dynamic(
  () => import("@/components/os/modules/SystemLogsContent").then((m) => m.SystemLogsContent),
  { ssr: false, loading: () => <ModuleLoader title="System Logs" /> }
);
const CredentialVaultContent = dynamic(
  () => import("@/components/os/modules/CredentialVaultContent").then((m) => m.CredentialVaultContent),
  { ssr: false, loading: () => <ModuleLoader title="Credential Vault" /> }
);
const TerminalContent = dynamic(
  () => import("@/components/os/modules/TerminalContent").then((m) => m.TerminalContent),
  { ssr: false, loading: () => <ModuleLoader title="Terminal Shell" /> }
);
const ResumeContent = dynamic(
  () => import("@/components/os/modules/ResumeContent").then((m) => m.ResumeContent),
  { ssr: false, loading: () => <ModuleLoader title="Official Resume" /> }
);
const NetworkContent = dynamic(
  () => import("@/components/os/modules/NetworkContent").then((m) => m.NetworkContent),
  { ssr: false, loading: () => <ModuleLoader title="Skill Network" /> }
);
const ContactContent = dynamic(
  () => import("@/components/os/modules/ContactContent").then((m) => m.ContactContent),
  { ssr: false, loading: () => <ModuleLoader title="Contact Dispatcher" /> }
);

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
      <div
        role="dialog"
        aria-modal="true"
        aria-label={windowState.title}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col pt-9 pb-16 px-3 animate-in fade-in slide-in-from-bottom-4"
      >
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

  // Desktop View: Draggable glass window with authentic macOS Genie spring physics emerging from dock button
  return (
    <motion.div
      ref={windowRef}
      role="dialog"
      aria-label={`${windowState.title} — ${windowState.subtitle}`}
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
          duration: 0.35,
          ease: [0.32, 0, 0.67, 0],
        },
      }}
      transition={{
        type: "spring",
        stiffness: 290,
        damping: 24,
        mass: 0.75,
      }}
      style={{
        zIndex: windowState.zIndex,
        position: "absolute",
      }}
      className={cn(
        "rounded-2xl border border-white/30 dark:border-white/20 bg-white/95 dark:bg-[#0C0E17]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden select-none os-window-content transition-shadow duration-300",
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
        {renderModuleContent()}
      </div>
    </motion.div>
  );
}
