"use client";

import React, { useState, useMemo } from "react";
import { certificationsData, Certification } from "@/data/certifications";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, Filter, Sparkles, Key } from "lucide-react";

type CertCategory = "All" | Certification["category"];

const CATEGORIES: CertCategory[] = [
  "All",
  ...Array.from(new Set(certificationsData.map((c) => c.category))),
];

export function CredentialVaultContent() {
  const [selectedCategory, setSelectedCategory] = useState<CertCategory>("All");

  const filteredCerts = useMemo(() => {
    if (selectedCategory === "All") return certificationsData;
    return certificationsData.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="h-full flex flex-col space-y-3 font-sans overflow-hidden select-none">
      {/* Vault Header & Category Filter Bar */}
      <div className="flex items-center justify-between border-b border-border/60 pb-2.5 shrink-0 gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-7 h-7 rounded-apple-md bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center text-accent-violet shrink-0">
            <Key className="w-4 h-4 text-accent-violet" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-mono text-foreground tracking-tight">CREDENTIAL VAULT</h3>
            <p className="text-[10px] font-mono text-muted-foreground">VERIFIED CERTIFICATIONS ({certificationsData.length})</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 shrink-0">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = cat === "All" ? certificationsData.length : certificationsData.filter((c) => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium transition-colors shrink-0 flex items-center gap-1 border ${
                  isActive
                    ? "bg-accent-violet/15 text-accent-violet border-accent-violet/40 font-semibold"
                    : "bg-surface/50 text-muted-foreground border-border/60 hover:bg-surface-hover hover:text-foreground"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[8px] px-1 rounded-full ${isActive ? "bg-accent-violet/20 text-accent-violet" : "bg-surface border border-border/80 text-muted-foreground"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Display */}
      <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
          >
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className="p-3.5 rounded-apple-lg border border-border/80 bg-surface/60 space-y-2 hover:border-accent-violet/40 transition-all duration-200 flex flex-col justify-between shadow-sm group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-accent-violet/10 text-accent-violet border border-accent-violet/20 font-semibold">
                      {cert.category}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground line-clamp-2 pt-0.5 tracking-tight group-hover:text-accent-violet transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-sans">{cert.issuer}</p>
                </div>

                <div className="text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/60 flex items-center justify-between">
                  <span>Issued Date:</span>
                  <span className="text-accent-violet font-semibold">{cert.date}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
