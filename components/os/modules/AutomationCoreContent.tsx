"use client";

import React, { useState, useEffect } from "react";
import {
  Workflow,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  FileText,
  Scan,
  Lock,
  Cpu,
  Gauge,
  FileCheck,
  Zap,
  Terminal,
  Send,
  AlertTriangle,
} from "lucide-react";

export interface AutomationNode {
  id: string;
  stepNumber: number;
  label: string;
  shortType: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  technicalDetails: string;
  stack: string[];
  samplePayload: Record<string, any>;
  status: "idle" | "processing" | "success";
}

const AUTOMATION_NODES: AutomationNode[] = [
  {
    id: "document",
    stepNumber: 1,
    label: "DOCUMENT",
    shortType: "Trigger",
    icon: FileText,
    description: "Ingests raw PDF document payloads or webhooks uploaded via web frontend.",
    technicalDetails: "Acts as the initial n8n webhook listener node. Receives file stream, validates binary signatures, and buffers PDF buffer memory for downstream parsing.",
    stack: ["n8n Webhook", "Node.js Stream", "REST API"],
    samplePayload: {
      event: "document.received",
      fileName: "financial_audit_2026.pdf",
      fileSize: "2.4 MB",
      mimeType: "application/pdf",
      timestamp: "2026-09-18T22:05:00Z",
    },
    status: "idle",
  },
  {
    id: "privacy-scanner",
    stepNumber: 2,
    label: "PRIVACY SCANNER",
    shortType: "Parser Node",
    icon: Scan,
    description: "Extracts textual streams, structural layouts, and bounding coordinates from document pages.",
    technicalDetails: "Utilizes Python PyMuPDF to extract text spans and layout trees. Maps coordinate bounding boxes for exact redacted blackout positioning.",
    stack: ["PyMuPDF", "Python 3", "JSON Coordinate Map"],
    samplePayload: {
      pagesParsed: 4,
      totalWords: 1420,
      layoutConfidence: "99.2%",
      extractedLines: 84,
    },
    status: "idle",
  },
  {
    id: "sensitive-detector",
    stepNumber: 3,
    label: "SENSITIVE DATA DETECTOR",
    shortType: "Entity Matching",
    icon: Lock,
    description: "Scans parsed tokens for PII, Aadhaar numbers, SSN tokens, emails, and confidential tags.",
    technicalDetails: "Applies high-throughput Regular Expressions and Named Entity Recognition (NER) pattern matchers to isolate confidential data points.",
    stack: ["RegEx Matching Engine", "Spacy NER", "Pattern Rules"],
    samplePayload: {
      detectedEntities: [
        { type: "AADHAAR_NUMBER", count: 2, match: "XXXX-XXXX-9482" },
        { type: "EMAIL_ADDRESS", count: 3, match: "audit_dept@company.com" },
        { type: "CONFIDENTIAL_HEADER", count: 1, match: "STRICTLY PRIVATE" },
      ],
      scanDurationMs: 42,
    },
    status: "idle",
  },
  {
    id: "ai-processing",
    stepNumber: 4,
    label: "AI PROCESSING",
    shortType: "LLM Intelligence",
    icon: Cpu,
    description: "Passes extracted ambiguous text blocks to OpenAI API for semantic privacy threat analysis.",
    technicalDetails: "Executes structured prompt templates on OpenAI GPT-4o API to evaluate context risk, detect indirect disclosure vulnerabilities, and recommend redaction zones.",
    stack: ["OpenAI API (GPT-4o)", "LangChain / Prompting", "JSON Schema Output"],
    samplePayload: {
      model: "gpt-4o-mini",
      promptTokens: 412,
      completionTokens: 88,
      privacyVulnerabilities: ["Indirect identity disclosure via department ID"],
      recommendedAction: "REDACT_FULL_PARAGRAPH",
    },
    status: "idle",
  },
  {
    id: "risk-score",
    stepNumber: 5,
    label: "RISK SCORE",
    shortType: "Scoring Engine",
    icon: Gauge,
    description: "Calculates an aggregated Privacy Exposure Index (0–100) based on detected threat severity.",
    technicalDetails: "Weighs entity density, financial exposure flags, and AI threat findings into a deterministic risk score formula.",
    stack: ["Exposure Scoring Engine", "Weighted Risk Matrix", "Python Math"],
    samplePayload: {
      exposureScore: 84,
      riskLevel: "HIGH_EXPOSURE",
      severityBreakdown: { piiWeight: 40, llmRiskWeight: 44 },
      alertThresholdExceeded: true,
    },
    status: "idle",
  },
  {
    id: "safe-output",
    stepNumber: 6,
    label: "SAFE OUTPUT",
    shortType: "Redaction & Alert",
    icon: FileCheck,
    description: "Generates the blackout-redacted PDF document and dispatches real-time alerts via Telegram Bot.",
    technicalDetails: "Draws opaque vector overlays over sensitive coordinates to render a sanitized PDF and triggers Telegram Bot API alert webhooks to security team.",
    stack: ["PyMuPDF Vector Overlay", "Telegram Bot API", "Secure Storage Output"],
    samplePayload: {
      redactedPdfUrl: "https://anunay-os.dev/export/redacted_financial_audit.pdf",
      redactionsApplied: 6,
      telegramNotificationSent: true,
      executionStatus: "SUCCESS",
    },
    status: "idle",
  },
];

export function AutomationCoreContent() {
  const [selectedNode, setSelectedNode] = useState<AutomationNode>(AUTOMATION_NODES[3]); // Default: AI Processing
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);
  const [activeSimulationStepIndex, setActiveSimulationStepIndex] = useState<number>(-1);

  // Simulation execution loop
  useEffect(() => {
    if (!isRunningSimulation) return;

    let step = 0;
    setActiveSimulationStepIndex(0);
    setSelectedNode(AUTOMATION_NODES[0]);

    const interval = setInterval(() => {
      step++;
      if (step < AUTOMATION_NODES.length) {
        setActiveSimulationStepIndex(step);
        setSelectedNode(AUTOMATION_NODES[step]);
      } else {
        clearInterval(interval);
        setIsRunningSimulation(false);
        setActiveSimulationStepIndex(-1);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isRunningSimulation]);

  return (
    <div className="h-full flex flex-col space-y-4 font-sans select-none">
      {/* Top Header & Simulation Controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Workflow className="w-4.5 h-4.5 text-accent-blue" />
              <span>PrivacyShield AI — Automated n8n Pipeline</span>
            </h3>
            <span className="hidden xs:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
              n8n & OpenAI
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Automated PDF sensitive document ingestion, privacy scanning, LLM risk scoring, and Telegram alerts
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsRunningSimulation(true)}
            disabled={isRunningSimulation}
            className={`px-3.5 py-1.5 rounded-apple-md font-mono text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isRunningSimulation
                ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/30 cursor-not-allowed"
                : "bg-accent-blue text-white hover:bg-accent-blue/90 active:scale-95 cursor-pointer"
            }`}
          >
            {isRunningSimulation ? (
              <>
                <Zap className="w-3.5 h-3.5 animate-pulse text-accent-blue" />
                <span>Simulating Stream...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Pipeline Test</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pipeline Visual Workflow Diagram */}
      <div className="p-4 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-[#0D0F18]/60 backdrop-blur-2xl space-y-3 shrink-0">
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5 font-semibold text-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Workflow Nodes ({AUTOMATION_NODES.length})</span>
          </span>
          <span className="hidden sm:inline">Select node to inspect execution details</span>
        </div>

        {/* Desktop Pipeline (Horizontal Sequence) */}
        <div className="hidden md:flex items-center justify-between gap-1 relative pt-1">
          {AUTOMATION_NODES.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = selectedNode.id === node.id;
            const isSimActive = activeSimulationStepIndex === idx;
            const isSimCompleted = activeSimulationStepIndex > idx;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`flex-1 p-2.5 rounded-apple-lg border text-left transition-all duration-200 relative group flex flex-col justify-between h-24 ${
                    isSelected
                      ? "bg-accent-blue/15 border-accent-blue text-accent-blue shadow-md scale-102 ring-2 ring-accent-blue/30"
                      : isSimActive
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 scale-105"
                      : "bg-surface/80 border-border/80 text-foreground hover:bg-surface-hover hover:border-accent-blue/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-surface border border-border text-foreground/80">
                      0{node.stepNumber}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-accent-blue" : isSimActive ? "text-emerald-400 animate-bounce" : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  <div>
                    <div className="text-xs font-extrabold tracking-tight font-mono uppercase leading-tight line-clamp-2">
                      {node.label}
                    </div>
                    <div className="text-[10px] font-mono font-semibold text-foreground/75 mt-0.5">
                      {node.shortType}
                    </div>
                  </div>
                </button>

                {/* Arrow Connector (between nodes) */}
                {idx < AUTOMATION_NODES.length - 1 && (
                  <div className="flex items-center justify-center shrink-0 px-0.5">
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-colors ${
                        activeSimulationStepIndex === idx
                          ? "text-emerald-400 animate-pulse"
                          : "text-muted-foreground/40"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Pipeline (Vertical Sequence) */}
        <div className="md:hidden space-y-2 pt-1">
          {AUTOMATION_NODES.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = selectedNode.id === node.id;
            const isSimActive = activeSimulationStepIndex === idx;

            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-3 rounded-apple-lg border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-accent-blue/15 border-accent-blue text-accent-blue shadow-sm"
                      : isSimActive
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-400"
                      : "bg-surface/80 border-border text-foreground hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface border border-border">
                      0{node.stepNumber}
                    </span>
                    <Icon className="w-4 h-4 text-accent-blue" />
                    <div>
                      <div className="text-xs font-bold font-mono uppercase">{node.label}</div>
                      <div className="text-[10px] text-muted-foreground">{node.shortType}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </button>

                {idx < AUTOMATION_NODES.length - 1 && (
                  <div className="flex justify-center my-0.5">
                    <ArrowDown className="w-3 h-3 text-muted-foreground/40" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details & Execution Payload Inspector Panel */}
      <div className="flex-1 rounded-2xl border border-white/20 dark:border-white/10 bg-white/50 dark:bg-[#0D0F18]/80 backdrop-blur-3xl p-5 space-y-4 overflow-y-auto no-scrollbar shadow-lg">
        {/* Node Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-apple-md bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center text-accent-blue">
              <selectedNode.icon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground font-mono uppercase">
                Step {selectedNode.stepNumber}: {selectedNode.label}
              </h4>
              <span className="text-[10px] font-mono text-accent-blue font-semibold uppercase tracking-wider">
                Node Type: {selectedNode.shortType}
              </span>
            </div>
          </div>

          <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ● Node Executed (0 Errors)
          </span>
        </div>

        {/* Explanation & Details */}
        <div className="space-y-3">
          <div>
            <span className="text-[11px] font-mono font-semibold text-accent-blue uppercase tracking-wider block mb-1">
              Function & Overview
            </span>
            <p className="text-xs text-foreground/95 leading-relaxed font-sans">
              {selectedNode.description}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-mono font-semibold text-accent-violet uppercase tracking-wider block mb-1">
              Technical Execution Logic
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
              {selectedNode.technicalDetails}
            </p>
          </div>
        </div>

        {/* Underlying Tech Stack */}
        <div className="space-y-1.5 pt-1 border-t border-border/60">
          <span className="text-[10px] font-mono font-bold text-foreground uppercase tracking-wider block">
            Node Technology Integration:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {selectedNode.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-apple-sm text-[11px] font-mono bg-surface border border-border/80 text-foreground font-semibold shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Sample Payload Log Viewer */}
        <div className="space-y-1.5 pt-2 border-t border-border/60">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1 text-accent-blue font-bold">
              <Terminal className="w-3 h-3" />
              <span>Sample Execution Payload Log</span>
            </span>
            <span>JSON Payload</span>
          </div>
          <pre className="p-3 rounded-apple-lg bg-black/80 border border-white/10 text-emerald-400 text-[11px] font-mono overflow-x-auto leading-relaxed">
            {JSON.stringify(selectedNode.samplePayload, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
