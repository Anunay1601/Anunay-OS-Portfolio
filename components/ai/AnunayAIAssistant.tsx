"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function AnunayAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
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
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input on expand
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput("");
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

    const startTime = Date.now();

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process request");
      }

      const data = await response.json();
      const assistantReply = data.message || "Information unavailable.";

      // Enforce at least 1.2s typing indicator delay for a natural AI experience
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 1200) {
        await new Promise((res) => setTimeout(res, 1200 - elapsedTime));
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          role: "assistant",
          content: assistantReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.error("AI Chat Assistant Error:", err);
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 1200) {
        await new Promise((res) => setTimeout(res, 1200 - elapsedTime));
      }
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
  };

  const handleClearHistory = () => {
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
  };

  // Helper renderer for Markdown formatting
  const renderFormattedContent = (content: string) => {
    // Split lines for basic bullet lists and bold text rendering
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      let formattedLine = line;

      // Render bold text **text**
      const boldParts = formattedLine.split(/\*\*(.*?)\*\*/g);
      const isBullet = formattedLine.trim().startsWith("* ") || formattedLine.trim().startsWith("- ");

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
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto select-none flex flex-col items-end">
      {/* Expanded Chat Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.08, y: 30, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0, transformOrigin: "bottom right" }}
            exit={{ opacity: 0, scale: 0.08, y: 30, transformOrigin: "bottom right" }}
            transition={{ type: "spring", stiffness: 340, damping: 26, mass: 0.6 }}
            className="w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[82vh] rounded-3xl border border-white/30 dark:border-white/20 bg-white/95 dark:bg-[#0C0E1A]/95 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden mb-3 crisp-text"
          >
            {/* Assistant Header */}
            <div className="p-3.5 px-4 border-b border-border/80 bg-surface-hover/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-apple-md bg-gradient-to-tr from-accent-blue to-accent-violet flex items-center justify-center text-white shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse" />
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
                  className="p-1.5 rounded-apple-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                  title="Clear chat history"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-apple-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                  aria-label="Minimize assistant"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 border-b border-border/60 bg-surface/30 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[9px] font-mono text-accent-blue font-bold shrink-0 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>TRY:</span>
              </span>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full text-[10px] font-sans font-medium bg-surface/80 hover:bg-accent-blue/15 hover:text-accent-blue hover:border-accent-blue/40 border border-border/80 text-muted-foreground transition-all shrink-0 active:scale-95 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Message Scroll List */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto no-scrollbar font-sans text-xs">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-6 h-6 rounded-apple-sm flex items-center justify-center shrink-0 text-[10px] font-mono font-bold mt-0.5 ${
                        isUser
                          ? "bg-accent-blue text-white"
                          : "bg-surface border border-border/80 text-accent-blue"
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Bubble Container */}
                    <div
                      className={`max-w-[84%] p-3 rounded-2xl ${
                        isUser
                          ? "bg-accent-blue text-white rounded-tr-xs shadow-xs"
                          : "bg-surface/90 border border-border/80 text-foreground rounded-tl-xs shadow-xs"
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
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-apple-sm bg-surface border border-border/80 text-accent-blue flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-xs bg-surface/90 border border-border/80 flex items-center gap-1">
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

            {/* Input Form Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-border/80 bg-surface/40 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask ANUNAY AI a question..."
                className="flex-1 px-3 py-2 rounded-apple-md bg-surface border border-border/80 text-xs font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent-blue/60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-apple-md bg-accent-blue text-white hover:bg-accent-blue/90 disabled:opacity-40 disabled:hover:bg-accent-blue transition-colors cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Assistant Launcher Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full border border-white/40 dark:border-white/20 bg-white/95 dark:bg-[#101322]/95 backdrop-blur-2xl text-foreground shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:border-accent-blue/60 hover:shadow-accent-blue/20 transition-all cursor-pointer group"
        aria-label="Toggle ANUNAY AI Assistant"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-accent-blue via-indigo-500 to-accent-violet flex items-center justify-center text-white shadow-md shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-background animate-pulse" />
        </motion.div>
        <span className="font-sans text-xs sm:text-sm font-extrabold tracking-tight pr-0.5 text-foreground">
          ANUNAY AI
        </span>
      </motion.button>
    </div>
  );
}
