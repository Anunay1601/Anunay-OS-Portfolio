"use client";

import { useState, useCallback, useEffect } from "react";

export type WindowId =
  | "neural-core"
  | "project-lab"
  | "dev-env"
  | "automation-core"
  | "system-logs"
  | "credential-vault"
  | "terminal"
  | "resume"
  | "network"
  | "contact";

export interface WindowState {
  id: WindowId;
  title: string;
  subtitle: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  idealSize: { width: number; height: number };
}

const DEFAULT_SPECS: Record<WindowId, { title: string; subtitle: string; iconName: string; idealWidth: number; idealHeight: number }> = {
  "neural-core": {
    title: "Neural Core",
    subtitle: "Interactive Tech Network",
    iconName: "Cpu",
    idealWidth: 1120,
    idealHeight: 720,
  },
  "project-lab": {
    title: "Project Lab",
    subtitle: "Software Systems & Previews",
    iconName: "FolderGit2",
    idealWidth: 1120,
    idealHeight: 720,
  },
  "dev-env": {
    title: "Dev Environment",
    subtitle: "Connected Skill Network",
    iconName: "Code2",
    idealWidth: 1120,
    idealHeight: 720,
  },
  "automation-core": {
    title: "Automation Core",
    subtitle: "n8n Visual Workflow Engine",
    iconName: "Workflow",
    idealWidth: 1120,
    idealHeight: 720,
  },
  "system-logs": {
    title: "System Logs",
    subtitle: "Chronological Milestones",
    iconName: "History",
    idealWidth: 1120,
    idealHeight: 720,
  },
  "credential-vault": {
    title: "Credential Vault",
    subtitle: "Verified Certifications",
    iconName: "Award",
    idealWidth: 1120,
    idealHeight: 720,
  },
  "terminal": {
    title: "Developer Terminal",
    subtitle: "CLI Shell v1.0",
    iconName: "Terminal",
    idealWidth: 1120,
    idealHeight: 680,
  },
  "resume": {
    title: "Resume",
    subtitle: "Verified Official CV",
    iconName: "FileText",
    idealWidth: 1120,
    idealHeight: 720,
  },
  "network": {
    title: "Skill Network",
    subtitle: "Interconnected Matrix",
    iconName: "Network",
    idealWidth: 1120,
    idealHeight: 720,
  },
  "contact": {
    title: "Communication / Contact",
    subtitle: "Get in Touch",
    iconName: "Mail",
    idealWidth: 1120,
    idealHeight: 720,
  },
};

export function computeCenteredBounds(
  idealWidth: number,
  idealHeight: number,
  offsetIndex: number = 0
) {
  if (typeof window === "undefined") {
    return {
      position: { x: 30 + offsetIndex * 16, y: 44 + offsetIndex * 16 },
      size: { width: idealWidth, height: idealHeight },
    };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Workspace area between TopBar (36px) and DockBar (~76px)
  const topBarH = 36;
  const dockH = 76;
  const workspaceH = Math.max(300, vh - topBarH - dockH);
  const availableW = Math.max(320, vw - 32);

  // Match width dynamically to idealWidth (1120px) or available view width
  const width = Math.min(idealWidth, availableW);
  const height = Math.min(idealHeight, Math.floor(workspaceH * 0.94));

  // Center horizontally, and position vertically directly below TopBar with minimal top offset
  const baseX = Math.max(16, Math.floor((vw - width) / 2));
  // Position with clean, balanced top padding below top bar
  const baseY = Math.max(topBarH + 12, topBarH + Math.floor((workspaceH - height) / 2));

  const stagger = (offsetIndex % 4) * 16;

  return {
    position: {
      x: Math.round(Math.min(baseX + stagger, Math.max(16, vw - width - 16))),
      y: Math.round(Math.min(baseY + stagger, Math.max(topBarH + 12, vh - height - dockH))),
    },
    size: { width: Math.round(width), height: Math.round(height) },
  };
}

function getTopOpenWindowId(
  windows: Record<WindowId, WindowState>,
  excludeId?: WindowId
): WindowId | null {
  let topWin: WindowState | null = null;
  for (const w of Object.values(windows)) {
    if (w.id === excludeId) continue;
    if (w.isOpen && !w.isMinimized) {
      if (!topWin || w.zIndex > topWin.zIndex) {
        topWin = w;
      }
    }
  }
  return topWin ? topWin.id : null;
}

export function useOSStore() {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => {
    const initial: Record<string, WindowState> = {};

    (Object.keys(DEFAULT_SPECS) as WindowId[]).forEach((id) => {
      const spec = DEFAULT_SPECS[id];
      const isOpen = id === "neural-core";
      const bounds = computeCenteredBounds(spec.idealWidth, spec.idealHeight, 0);

      initial[id] = {
        id,
        title: spec.title,
        subtitle: spec.subtitle,
        iconName: spec.iconName,
        isOpen,
        isMinimized: false,
        isMaximized: false,
        zIndex: isOpen ? 10 : 1,
        position: bounds.position,
        size: bounds.size,
        idealSize: { width: spec.idealWidth, height: spec.idealHeight },
      };
    });

    return initial as Record<WindowId, WindowState>;
  });

  const [activeZIndex, setActiveZIndex] = useState<number>(10);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>("neural-core");

  // Recalculate window placements on client mount & window resize
  useEffect(() => {
    const handleResize = () => {
      setWindows((prev) => {
        const updated = { ...prev };

        (Object.keys(updated) as WindowId[]).forEach((id) => {
          const win = updated[id];
          const bounds = computeCenteredBounds(
            win.idealSize.width,
            win.idealSize.height,
            0
          );

          updated[id] = {
            ...win,
            position: win.isMaximized ? { x: 0, y: 0 } : bounds.position,
            size: bounds.size,
          };
        });

        return updated;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setWindows((prevWin) => {
      const current = prevWin[id];
      if (!current) return prevWin;

      const maxZ = Math.max(10, ...Object.values(prevWin).map((w) => w.zIndex));
      const nextZ = maxZ + 1;
      const bounds = computeCenteredBounds(
        current.idealSize.width,
        current.idealSize.height,
        0
      );

      setActiveZIndex(nextZ);
      setActiveWindowId(id);

      return {
        ...prevWin,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
          position: current.isOpen && current.position.y >= 36 ? current.position : bounds.position,
          size: bounds.size,
        },
      };
    });
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    setWindows((prevWin) => {
      const current = prevWin[id];
      if (!current) return prevWin;

      const maxZ = Math.max(10, ...Object.values(prevWin).map((w) => w.zIndex));
      const nextZ = maxZ + 1;
      const bounds = computeCenteredBounds(
        current.idealSize.width,
        current.idealSize.height,
        0
      );

      setActiveZIndex(nextZ);
      setActiveWindowId(id);

      return {
        ...prevWin,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
          position: bounds.position,
          size: bounds.size,
        },
      };
    });
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const nextWindows = {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false,
        },
      };
      const nextActive = getTopOpenWindowId(nextWindows, id);
      setActiveWindowId(nextActive);
      return nextWindows;
    });
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const nextWindows = {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
        },
      };
      const nextActive = getTopOpenWindowId(nextWindows, id);
      setActiveWindowId(nextActive);
      return nextWindows;
    });
  }, []);

  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  }, []);

  const toggleWindow = useCallback((id: WindowId) => {
    setWindows((prevWin) => {
      const current = prevWin[id];
      if (!current) return prevWin;

      // 1. If currently opened and visible: CLOSE IT!
      if (current.isOpen && !current.isMinimized) {
        const nextWindows = {
          ...prevWin,
          [id]: {
            ...current,
            isOpen: false,
            isMinimized: false,
          },
        };
        const nextActive = getTopOpenWindowId(nextWindows, id);
        setActiveWindowId(nextActive);
        return nextWindows;
      }

      // 2. Otherwise (closed or minimized): OPEN IT AT THE TOP!
      const maxZ = Math.max(10, ...Object.values(prevWin).map((w) => w.zIndex));
      const nextZ = maxZ + 1;
      const bounds = computeCenteredBounds(
        current.idealSize.width,
        current.idealSize.height,
        0
      );

      setActiveZIndex(nextZ);
      setActiveWindowId(id);

      return {
        ...prevWin,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
          position: bounds.position,
          size: bounds.size,
        },
      };
    });
  }, []);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    toggleWindow,
    focusWindow,
  };
}
