
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  Zap,
  ChevronDown,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "What projects has Anunay built?",
  "What technologies does he use?",
  "Show me his AI projects.",
  "What internships has he completed?",
  "What is Anunay currently learning?",
];

// Helper renderer for Markdown formatting hoisted outside component
function renderFormattedContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, idx) => {
    const boldParts = line.split(/\*\*(.*?)\*\*/g);
    const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");

    return (
      <div key={idx} className={isBullet ? "pl-2 py-0.5 flex items-start gap-1.5" : "py-0.5"}>
        {isBullet && <span className="text-accent-blue font-bold">•</span>}
        <span>
          {boldParts.map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className="font-bold text-foreground">
                {part}
              </strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </span>
      </div>
    );
  });
}

// Memoized individual message item to prevent re-rendering entire conversation on keystrokes/updates
const ChatMessageItem = React.memo(function ChatMessageItem({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-mono font-bold mt-0.5 ${
          isUser
            ? "bg-accent-blue text-white"
            : "bg-surface-2 border border-border-color text-accent-blue"
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      {/* Bubble Container */}
      <div
        className={`max-w-[84%] p-3 rounded-2xl ${
          isUser
            ? "bg-accent-blue text-white shadow-xs"
            : "bg-surface-2/90 border border-border-color text-foreground shadow-xs"
        }`}
      >
        <div className="leading-relaxed font-sans">{renderFormattedContent(msg.content)}</div>
        <div
          className={`text-[9px] font-mono mt-1 text-right ${
            isUser ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {msg.timestamp}
        </div>
      </div>
    </motion.div>
  );
});

// Memoized isolated input form: keystrokes do NOT re-render the parent chat container or message list
interface ChatInputFormProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onSend: (text: string) => void;
  isLoading: boolean;
}

const ChatInputForm = React.memo(function ChatInputForm({
  inputRef,
  onSend,
  isLoading,
}: ChatInputFormProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query || isLoading) return;
    onSend(query);
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-border-color bg-surface-2/40 flex items-center gap-2 shrink-0"
    >
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ask ANUNAY AI a question..."
        className="flex-1 px-3 py-2 rounded-xl bg-surface-1 border border-border-color text-xs font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
      />
      <button
        type="submit"
        disabled={!inputValue.trim() || isLoading}
        className="p-2 rounded-xl bg-accent-blue text-white hover:bg-accent-blue/90 disabled:opacity-40 disabled:hover:bg-accent-blue transition-colors cursor-pointer shrink-0"
        aria-label="Send message"
      >
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
});

export function AnunayAIAssistant() {
  const pathname = usePathname();
  const isOSPage = pathname === "/os";
  const [isOpen, setIsOpen] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Hello! I am **ANUNAY AI**, your interactive portfolio assistant. Ask me anything about Anunay's projects, technical stack, internships, or academic credentials!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input on expand & listen for Escape to close
  useEffect(() => {
    if (isOpen) {
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        clearTimeout(focusTimer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  // Smoothly hide launcher as soon as the footer reaches the floating button zone
  useEffect(() => {
    if (isOSPage) {
      setIsAtFooter(false);
      return;
    }

    let rafId: number | null = null;

    const updateFooterVisibility = () => {
      rafId = null;
      const footer = document.querySelector("footer");
      if (!footer) {
        setIsAtFooter(false);
        return;
      }
      const rect = footer.getBoundingClientRect();
      // Begin smooth exit just as the footer enters the bottom edge of the viewport
      const reachedFooter = rect.top <= window.innerHeight - 10;
      setIsAtFooter((prev) => (prev === reachedFooter ? prev : reachedFooter));
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateFooterVisibility);
    };

    updateFooterVisibility();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    document.body.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      document.body.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
    };
  }, [pathname, isOSPage]);

  // Clean up in-flight requests on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleSendMessage = useCallback(
    async (textToSend: string) => {
      const query = textToSend.trim();
      if (!query || isLoading) return;

      setError(null);

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: query,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setIsLoading(true);

      // Abort any previous pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to process request");
        }

        const data = await response.json();
        const assistantReply = data.message || "Information unavailable.";

        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: "assistant",
            content: assistantReply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } catch (err: any) {
        if (err.name === "AbortError") {
          return; // Intentionally aborted by user or new request
        }
        console.error("AI Chat Assistant Error:", err);
        setError("Connection temporary error. Reverting to local portfolio data.");
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-err-${Date.now()}`,
            role: "assistant",
            content:
              "I'm currently unable to reach the AI service, but you can explore Anunay's verified projects, technical skills, and experience directly in the portfolio!",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const handleClearHistory = useCallback(() => {
    abortControllerRef.current?.abort();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Chat reset! Ask me anything about Anunay's projects, technical stack, or internships.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setError(null);
  }, []);

  const shouldHide = isAtFooter && !isOpen;

  return (
    <motion.div
      initial={false}
      animate={
        shouldHide
          ? { opacity: 0, y: 20, scale: 0.92 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={
        shouldHide
          ? { duration: 0.32, ease: [0.4, 0, 0.2, 1] }
          : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }
      aria-hidden={shouldHide}
      className={`fixed z-[45] select-none flex flex-col items-end ${
        shouldHide ? "pointer-events-none" : "pointer-events-auto"
      } ${
        isOSPage
          ? "bottom-[6rem] right-3 sm:right-5 xl:bottom-6 xl:right-6"
          : "bottom-3 right-3 sm:bottom-5 sm:right-6"
      }`}
    >
      {/* Expanded Chat Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.15, y: 25, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0, transformOrigin: "bottom right" }}
            exit={{ opacity: 0, scale: 0.15, y: 25, transformOrigin: "bottom right" }}
            transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.8 }}
            id="anunay-ai-dialog"
            role="dialog"
            aria-modal="false"
            aria-label="ANUNAY AI Assistant"
            className="w-[calc(100vw-1.5rem)] sm:w-[400px] h-[min(480px,calc(100dvh-7.5rem))] sm:h-[min(520px,calc(100dvh-8rem))] rounded-3xl apple-liquid-palette overflow-hidden flex flex-col mb-3 crisp-text relative shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
          >
            {/* Top specular reflection glare line */}
            <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/35 to-transparent pointer-events-none z-20" />

            {/* Assistant Header */}
            <div className="p-3.5 px-4 border-b border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/[0.04] backdrop-blur-md flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-accent-blue to-indigo-600 flex items-center justify-center text-white shadow-xs overflow-hidden border border-white/30">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white/50 dark:ring-black/50 shadow-[0_0_6px_#10b981]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground font-sans tracking-tight flex items-center gap-1.5">
                    <span>ANUNAY AI</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-accent-blue/15 text-accent-blue border border-accent-blue/30 font-semibold">
                      Grounded AI
                    </span>
                  </h3>
                  <p className="text-[10px] font-mono text-muted-foreground">Portfolio Intelligence Assistant</p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors cursor-pointer"
                  title="Clear chat history"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors cursor-pointer"
                  aria-label="Minimize assistant"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 border-b border-border-color bg-surface-2/30 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[9px] font-mono text-accent-blue font-bold shrink-0 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>TRY:</span>
              </span>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full text-[10px] font-sans font-medium bg-surface-1 hover:bg-accent-blue/15 hover:text-accent-blue hover:border-accent-blue/40 border border-border-color text-muted-foreground transition-all shrink-0 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Message Scroll List */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto no-scrollbar font-sans text-xs">
              {messages.map((msg) => (
                <ChatMessageItem key={msg.id} msg={msg} />
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-lg bg-surface-2 border border-border-color text-accent-blue flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl bg-surface-2/90 border border-border-color flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Error Banner */}
            {error && (
              <div className="px-3 py-1.5 bg-amber-500/10 border-t border-amber-500/20 text-amber-500 text-[10px] font-mono flex items-center gap-1.5 shrink-0">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Input Form Bar - Isolated component preventing full chat re-render on typing */}
            <ChatInputForm
              inputRef={inputRef}
              onSend={handleSendMessage}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Assistant Launcher Button - Futuristic Glassmorphism with Apple-Style Fluid Layout Motion */}
      <motion.button
        layout
        tabIndex={shouldHide ? -1 : 0}
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={shouldHide ? undefined : { scale: 1.03, y: -2 }}
        whileTap={shouldHide ? undefined : { scale: 0.97 }}
        transition={{
          layout: { type: "spring", stiffness: 220, damping: 26, mass: 0.8 },
        }}
        aria-expanded={isOpen}
        aria-controls="anunay-ai-dialog"
        className="relative group cursor-pointer rounded-full select-none outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 shadow-[0_8px_25px_rgba(0,0,0,0.3)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
        aria-label="Toggle ANUNAY AI Assistant"
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/25 via-indigo-500/20 to-fuchsia-500/25 blur-lg opacity-30 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none -z-10" />

        {/* Inner Capsule Body */}
        <motion.div
          layout
          transition={{
            layout: { type: "spring", stiffness: 350, damping: 25, mass: 0.6 },
          }}
          className="relative z-10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2.5 bg-[#090E1F]/90 dark:bg-[#070B16]/90 backdrop-blur-2xl flex items-center gap-2 sm:gap-2.5 overflow-hidden border border-white/15 dark:border-white/10 group-hover:border-cyan-400/40 transition-colors duration-200"
        >
          {/* Top Specular Glare Reflection Line */}
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/25 to-transparent pointer-events-none" />

          {/* AI Logo Emblem Container (Allows radar pulse to render without clipping) */}
          <div className="relative shrink-0">
            <motion.div
              layout
              className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-cyan-500/25 via-blue-600/35 to-indigo-600/40 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_14px_rgba(6,182,212,0.45),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden border border-cyan-400/50 group-hover:border-cyan-300 group-hover:shadow-[0_0_18px_rgba(34,211,238,0.65)]"
            >
              {/* Ambient inner lens sheen */}
              <span className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/15 pointer-events-none" />

              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isOpen ? 0 : 1,
                    scale: isOpen ? 0.5 : 1,
                    rotate: isOpen ? -90 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.95)]" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    scale: isOpen ? 1 : 0.5,
                    rotate: isOpen ? 0 : 90,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Live Status Radar Pulse - Fully visible with zero clipping */}
            <AnimatePresence>
              {!isOpen && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-0.5 -right-0.5 flex h-2 w-2 z-30 pointer-events-none"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 ring-1.5 ring-[#090E1F] dark:ring-[#070B16] shadow-[0_0_6px_#10b981]" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Holographic Typography */}
          <div className="relative flex items-center overflow-hidden">
            <motion.span
              key={isOpen ? "close" : "anunay"}
              initial={{ opacity: 0.3, y: isOpen ? 4 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="font-sans text-xs sm:text-[12.5px] font-extrabold tracking-wider bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,211,238,0.35)] whitespace-nowrap block"
            >
              {isOpen ? "CLOSE" : "ANUNAY AI"}
            </motion.span>
          </div>

          {/* Neural Equalizer Waves with smooth fluid width collapse */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="equalizer-waves"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden hidden sm:flex items-center gap-[2.5px] h-3 px-0.5"
                aria-hidden="true"
              >
                <span className="w-[2px] h-2 rounded-full bg-cyan-400/80 animate-pulse [animation-duration:600ms]" />
                <span className="w-[2px] h-3.5 rounded-full bg-indigo-400/90 animate-pulse [animation-duration:900ms]" />
                <span className="w-[2px] h-1.5 rounded-full bg-fuchsia-400/80 animate-pulse [animation-duration:750ms]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Futuristic Micro-Badge with instant clean alignment */}
          <div className="hidden sm:flex items-center">
            <motion.span
              key={isOpen ? "badge-esc" : "badge-ask"}
              initial={{ opacity: 0.3, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap transition-colors ${
                isOpen
                  ? "bg-rose-500/15 text-rose-500 dark:text-rose-300 border border-rose-500/30"
                  : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30 shadow-[0_0_8px_rgba(6,182,212,0.15)]"
              }`}
            >
              {isOpen ? "ESC" : "✦ ASK"}
            </motion.span>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
