"use client";

import React, { useState } from "react";
import { Sliders, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes: Record<string, Record<string, string>> = {
  default: {
    "--prism-site-bg": "#000000",
    "--prism-site-surface": "#08090E",
    "--prism-site-elevated": "#0D0F17",
    "--prism-semantic-primary": "#6366F1",
    "--prism-semantic-accent": "#22D3EE",
    "--prism-semantic-accent-2": "#A855F7",
    "--prism-site-text": "#FAFAFA",
    "--prism-site-text-secondary": "#71717A",
    "--prism-site-text-muted": "#52525B",
    "--prism-site-border": "rgba(255, 255, 255, 0.06)",
    "--prism-primary-glow": "rgba(99, 102, 241, 0.4)",
    "--prism-border-glow": "rgba(99, 102, 241, 0.3)",
    "--prism-glass-bg": "rgba(13, 15, 23, 0.6)",
    "--prism-glass-border": "rgba(255, 255, 255, 0.05)",
    "--prism-grid-color": "rgba(255, 255, 255, 0.03)",
    // Mockup component tokens
    "--prism-dashboard-bg": "#0D0F17",
    "--prism-dashboard-text": "#FAFAFA",
    "--prism-card-bg": "rgba(255, 255, 255, 0.03)",
    "--prism-card-border": "rgba(255, 255, 255, 0.06)",
    "--prism-card-radius": "12px",
    "--prism-button-bg": "#6366F1",
    "--prism-chart-primary": "#6366F1",
    "--prism-chart-accent": "#A855F7"
  },
  healthcare: {
    "--prism-site-bg": "#F8FAFC",
    "--prism-site-surface": "#FFFFFF",
    "--prism-site-elevated": "#F1F5F9",
    "--prism-semantic-primary": "#0284C7",
    "--prism-semantic-accent": "#0F766E",
    "--prism-semantic-accent-2": "#0369A1",
    "--prism-site-text": "#0F172A",
    "--prism-site-text-secondary": "#475569",
    "--prism-site-text-muted": "#64748B",
    "--prism-site-border": "rgba(15, 23, 42, 0.08)",
    "--prism-primary-glow": "rgba(2, 132, 199, 0.15)",
    "--prism-border-glow": "rgba(2, 132, 199, 0.1)",
    "--prism-glass-bg": "rgba(255, 255, 255, 0.75)",
    "--prism-glass-border": "rgba(15, 23, 42, 0.08)",
    "--prism-grid-color": "rgba(15, 23, 42, 0.04)",
    // Mockup component tokens
    "--prism-dashboard-bg": "#FFFFFF",
    "--prism-dashboard-text": "#0F172A",
    "--prism-card-bg": "#F8FAFC",
    "--prism-card-border": "rgba(15, 23, 42, 0.06)",
    "--prism-card-radius": "6px",
    "--prism-button-bg": "#0284C7",
    "--prism-chart-primary": "#0284C7",
    "--prism-chart-accent": "#0F766E"
  },
  fintech: {
    "--prism-site-bg": "#0B0F19",
    "--prism-site-surface": "#111827",
    "--prism-site-elevated": "#1F2937",
    "--prism-semantic-primary": "#059669",
    "--prism-semantic-accent": "#EAB308",
    "--prism-semantic-accent-2": "#047857",
    "--prism-site-text": "#F9FAFB",
    "--prism-site-text-secondary": "#9CA3AF",
    "--prism-site-text-muted": "#6B7280",
    "--prism-site-border": "rgba(255, 255, 255, 0.08)",
    "--prism-primary-glow": "rgba(5, 150, 105, 0.3)",
    "--prism-border-glow": "rgba(5, 150, 105, 0.2)",
    "--prism-glass-bg": "rgba(17, 24, 39, 0.6)",
    "--prism-glass-border": "rgba(255, 255, 255, 0.08)",
    "--prism-grid-color": "rgba(255, 255, 255, 0.02)",
    // Mockup component tokens
    "--prism-dashboard-bg": "#111827",
    "--prism-dashboard-text": "#F9FAFB",
    "--prism-card-bg": "rgba(255, 255, 255, 0.03)",
    "--prism-card-border": "rgba(255, 255, 255, 0.08)",
    "--prism-card-radius": "4px",
    "--prism-button-bg": "#059669",
    "--prism-chart-primary": "#059669",
    "--prism-chart-accent": "#EAB308"
  },
  consumer: {
    "--prism-site-bg": "#FFFDFD",
    "--prism-site-surface": "#FFF1F2",
    "--prism-site-elevated": "#FFE4E6",
    "--prism-semantic-primary": "#EC4899",
    "--prism-semantic-accent": "#F97316",
    "--prism-semantic-accent-2": "#D946EF",
    "--prism-site-text": "#1C1917",
    "--prism-site-text-secondary": "#6B5F5F",
    "--prism-site-text-muted": "#8C7E7E",
    "--prism-site-border": "rgba(120, 100, 100, 0.08)",
    "--prism-primary-glow": "rgba(236, 72, 153, 0.15)",
    "--prism-border-glow": "rgba(236, 72, 153, 0.1)",
    "--prism-glass-bg": "rgba(255, 241, 242, 0.75)",
    "--prism-glass-border": "rgba(120, 100, 100, 0.08)",
    "--prism-grid-color": "rgba(120, 100, 100, 0.04)",
    // Mockup component tokens
    "--prism-dashboard-bg": "#FFF1F2",
    "--prism-dashboard-text": "#1C1917",
    "--prism-card-bg": "#FFFFFF",
    "--prism-card-border": "rgba(120, 100, 100, 0.06)",
    "--prism-card-radius": "24px",
    "--prism-button-bg": "#EC4899",
    "--prism-chart-primary": "#EC4899",
    "--prism-chart-accent": "#F97316"
  },
  developer: {
    "--prism-site-bg": "#050505",
    "--prism-site-surface": "#0A0A0A",
    "--prism-site-elevated": "#121212",
    "--prism-semantic-primary": "#10B981",
    "--prism-semantic-accent": "#06B6D4",
    "--prism-semantic-accent-2": "#047857",
    "--prism-site-text": "#EDEDED",
    "--prism-site-text-secondary": "#A0A0A0",
    "--prism-site-text-muted": "#666666",
    "--prism-site-border": "rgba(255, 255, 255, 0.1)",
    "--prism-primary-glow": "rgba(16, 185, 129, 0.3)",
    "--prism-border-glow": "rgba(16, 185, 129, 0.2)",
    "--prism-glass-bg": "rgba(10, 10, 10, 0.8)",
    "--prism-glass-border": "rgba(255, 255, 255, 0.1)",
    "--prism-grid-color": "rgba(255, 255, 255, 0.04)",
    // Mockup component tokens
    "--prism-dashboard-bg": "#0A0A0A",
    "--prism-dashboard-text": "#EDEDED",
    "--prism-card-bg": "rgba(255, 255, 255, 0.02)",
    "--prism-card-border": "rgba(255, 255, 255, 0.1)",
    "--prism-card-radius": "0px",
    "--prism-button-bg": "#10B981",
    "--prism-chart-primary": "#10B981",
    "--prism-chart-accent": "#06B6D4"
  }
};

export default function GlobalThemeSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("default");

  const selectTheme = (key: string) => {
    setSelected(key);
    const themeObj = themes[key];
    Object.keys(themeObj).forEach((varName) => {
      document.documentElement.style.setProperty(varName, themeObj[varName]);
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-3 bg-bg-surface/90 glass border border-white/10 p-4 rounded-2xl w-60 shadow-2xl flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] uppercase font-bold text-text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Global Theme Sandbox
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {[
                { id: "default", label: "Default Dark", color: "bg-[#6366F1]" },
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
                        ? "bg-primary/10 border-primary/30 text-text-primary shadow-[0_0_12px_rgba(99,102,241,0.1)]"
                        : "bg-white/5 border-transparent text-text-secondary hover:text-text-primary hover:bg-white/10"
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
        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-tertiary flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
      >
        <Sliders className="w-5 h-5" />
      </button>
    </div>
  );
}
