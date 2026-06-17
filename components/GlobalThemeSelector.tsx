"use client";

import React, { useState, useEffect } from "react";
import { Sliders, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes: Record<string, { themeMode: "light" | "dark", tokens: Record<string, string> }> = {
  default: {
    themeMode: "dark",
    tokens: {}
  },
  "default-light": {
    themeMode: "light",
    tokens: {}
  },
  healthcare: {
    themeMode: "light",
    tokens: {
      "--semantic-primary": "#0284C7",
      "--semantic-accent": "#0F766E",
      "--semantic-accent-2": "#0369A1",
      "--semantic-bg": "#F8FAFC",
      "--semantic-surface": "#FFFFFF",
      "--semantic-elevated": "#F1F5F9",
      "--semantic-glass-bg": "rgba(255, 255, 255, 0.75)",
      "--semantic-primary-glow": "rgba(2, 132, 199, 0.15)",
    }
  },
  fintech: {
    themeMode: "dark",
    tokens: {
      "--semantic-primary": "#059669",
      "--semantic-accent": "#EAB308",
      "--semantic-accent-2": "#047857",
      "--semantic-bg": "#0B0F19",
      "--semantic-surface": "#111827",
      "--semantic-elevated": "#1F2937",
      "--semantic-glass-bg": "rgba(17, 24, 39, 0.6)",
      "--semantic-primary-glow": "rgba(5, 150, 105, 0.3)",
    }
  },
  consumer: {
    themeMode: "light",
    tokens: {
      "--semantic-primary": "#EC4899",
      "--semantic-accent": "#F97316",
      "--semantic-accent-2": "#D946EF",
      "--semantic-bg": "#FFFDFD",
      "--semantic-surface": "#FFF1F2",
      "--semantic-elevated": "#FFE4E6",
      "--semantic-glass-bg": "rgba(255, 241, 242, 0.75)",
      "--semantic-primary-glow": "rgba(236, 72, 153, 0.15)",
    }
  },
  developer: {
    themeMode: "dark",
    tokens: {
      "--semantic-primary": "#10B981",
      "--semantic-accent": "#06B6D4",
      "--semantic-accent-2": "#047857",
      "--semantic-bg": "#050505",
      "--semantic-surface": "#0A0A0A",
      "--semantic-elevated": "#121212",
      "--semantic-glass-bg": "rgba(10, 10, 10, 0.8)",
      "--semantic-primary-glow": "rgba(16, 185, 129, 0.3)",
    }
  }
};

export default function GlobalThemeSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("default");

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      selectTheme("default");
    } else {
      selectTheme("default-light");
    }
  }, []);

  const selectTheme = (key: string) => {
    setSelected(key);
    const themeObj = themes[key];
    if (themeObj) {
      // Set the data-theme attribute for base light/dark switching
      document.documentElement.setAttribute("data-theme", themeObj.themeMode);

      // Build a set of all variable names across all theme presets to clear them clean
      const allVariableNames = new Set<string>();
      Object.values(themes).forEach((t) => {
        Object.keys(t.tokens).forEach((varName) => allVariableNames.add(varName));
      });
      
      // Clear inline overrides so there's no spillover
      allVariableNames.forEach((varName) => {
        document.documentElement.style.removeProperty(varName);
      });

      // Apply selected theme semantic overrides
      Object.keys(themeObj.tokens).forEach((varName) => {
        document.documentElement.style.setProperty(varName, themeObj.tokens[varName]);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-3 bg-bg-surface/90 glass border border-border-subtle p-4 rounded-2xl w-60 shadow-2xl flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <span className="text-[10px] uppercase font-bold text-text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Global Theme Sandbox
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {[
                { id: "default", label: "Default Dark", color: "bg-[#6366F1]" },
                { id: "default-light", label: "Default Light", color: "bg-white border border-slate-300" },
                { id: "healthcare", label: "Clinical Light", color: "bg-[#0284C7]" },
                { id: "fintech", label: "Fintech Green", color: "bg-[#059669]" },
                { id: "consumer", label: "Retail Pink", color: "bg-[#EC4899]" },
                { id: "developer", label: "Console Mono", color: "bg-[#10B981]" },
              ].map((t) => {
                const isSelected = selected === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => selectTheme(t.id)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? "bg-primary/10 border-primary/30 text-text-primary shadow-glow-primary"
                        : "bg-bg-elevated border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                      <span>{t.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
            <span className="text-[9px] text-text-muted leading-tight text-center mt-1">
              Select a theme to see the entire landing page morph in real-time.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-tertiary flex items-center justify-center text-white shadow-glow-primary hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
      >
        <Sliders className="w-5 h-5" />
      </button>
    </div>
  );
}
