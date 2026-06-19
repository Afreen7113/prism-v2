"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeState = {
  activePreset: string;
  themeMode: "light" | "dark";
  primaryColor: string;
  accentColor: string;
  surfaceColor: string;
  bgColor: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  chartPrimary: string;
  chartSecondary: string;
  radius: number;
  font: string;
  elevatedColor: string;
  glassBg: string;
  primaryGlow: string;
};

export type ThemeContextType = ThemeState & {
  setTheme: (updates: Partial<ThemeState>) => void;
  applyPreset: (presetId: string) => void;
};

const defaultTheme: ThemeState = {
  activePreset: "default",
  themeMode: "dark",
  primaryColor: "var(--color-indigo-600)",
  accentColor: "var(--color-sky-500)",
  surfaceColor: "var(--color-slate-900)",
  bgColor: "var(--color-slate-950)",
  textPrimary: "var(--color-slate-50)",
  textSecondary: "var(--color-slate-400)",
  textMuted: "var(--color-slate-500)",
  borderColor: "var(--color-slate-800)",
  successColor: "var(--color-emerald-500)",
  warningColor: "var(--color-amber-500)",
  errorColor: "var(--color-red-500)",
  chartPrimary: "var(--color-indigo-500)",
  chartSecondary: "var(--color-sky-400)",
  radius: 8,
  font: "Inter",
  elevatedColor: "var(--color-slate-800)",
  glassBg: "rgba(15, 23, 42, 0.75)",
  primaryGlow: "rgba(79, 70, 229, 0.15)",
};

const presets: Record<string, Partial<ThemeState>> = {
  "default": {
    themeMode: "dark",
    primaryColor: "var(--color-indigo-600)",
    accentColor: "var(--color-sky-500)",
    surfaceColor: "var(--color-slate-900)",
    bgColor: "var(--color-slate-950)",
    textPrimary: "var(--color-slate-50)",
    textSecondary: "var(--color-slate-400)",
    textMuted: "var(--color-slate-500)",
    borderColor: "var(--color-slate-800)",
    elevatedColor: "var(--color-slate-800)",
    glassBg: "rgba(15, 23, 42, 0.75)",
    primaryGlow: "rgba(79, 70, 229, 0.15)",
    font: "Inter",
    radius: 8,
  },
  "default-light": {
    themeMode: "light",
    primaryColor: "var(--color-indigo-600)",
    accentColor: "var(--color-sky-500)",
    surfaceColor: "var(--color-white)",
    bgColor: "var(--color-slate-50)",
    textPrimary: "var(--color-slate-900)",
    textSecondary: "var(--color-slate-600)",
    textMuted: "var(--color-slate-500)",
    borderColor: "var(--color-slate-200)",
    elevatedColor: "var(--color-slate-100)",
    glassBg: "rgba(255, 255, 255, 0.75)",
    primaryGlow: "rgba(79, 70, 229, 0.08)",
    font: "Inter",
    radius: 8,
  },
  "healthcare": {
    themeMode: "light",
    primaryColor: "#0284C7",
    accentColor: "#0F766E",
    surfaceColor: "var(--color-white)",
    bgColor: "#F8FAFC",
    textPrimary: "var(--color-slate-900)",
    textSecondary: "var(--color-slate-600)",
    textMuted: "var(--color-slate-500)",
    borderColor: "var(--color-slate-200)",
    elevatedColor: "#F1F5F9",
    glassBg: "rgba(255, 255, 255, 0.75)",
    primaryGlow: "rgba(2, 132, 199, 0.15)",
    font: "Inter",
    radius: 6,
  },
  "fintech": {
    themeMode: "dark",
    primaryColor: "#059669",
    accentColor: "#EAB308",
    surfaceColor: "#111827",
    bgColor: "#0B0F19",
    textPrimary: "var(--color-slate-50)",
    textSecondary: "var(--color-slate-400)",
    textMuted: "var(--color-slate-500)",
    borderColor: "var(--color-slate-800)",
    elevatedColor: "#1F2937",
    glassBg: "rgba(17, 24, 39, 0.6)",
    primaryGlow: "rgba(5, 150, 105, 0.3)",
    font: "Sora",
    radius: 4,
  },
  "consumer": {
    themeMode: "light",
    primaryColor: "#1F2937",
    accentColor: "#D4A017",
    surfaceColor: "#FAFAFA",
    bgColor: "#FFFFFF",
    textPrimary: "#111827",
    textSecondary: "#4B5563",
    textMuted: "#9CA3AF",
    borderColor: "#E5E7EB",
    elevatedColor: "#F3F4F6",
    glassBg: "rgba(255, 255, 255, 0.75)",
    primaryGlow: "rgba(31, 41, 55, 0.15)",
    font: "DM Sans",
    radius: 8,
  },
  "developer": {
    themeMode: "dark",
    primaryColor: "var(--color-success)",
    accentColor: "#06B6D4",
    surfaceColor: "#0A0A0A",
    bgColor: "#050505",
    textPrimary: "var(--color-slate-50)",
    textSecondary: "var(--color-slate-400)",
    textMuted: "var(--color-slate-500)",
    borderColor: "var(--color-slate-800)",
    elevatedColor: "#121212",
    glassBg: "rgba(10, 10, 10, 0.8)",
    primaryGlow: "rgba(16, 185, 129, 0.3)",
    font: "JetBrains Mono",
    radius: 0,
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to apply CSS variables directly to the DOM
const applyThemeToDOM = (theme: ThemeState) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.themeMode);

  root.style.setProperty("--semantic-primary", theme.primaryColor);
  root.style.setProperty("--semantic-accent", theme.accentColor);
  root.style.setProperty("--semantic-bg", theme.bgColor);
  root.style.setProperty("--semantic-surface", theme.surfaceColor);
  root.style.setProperty("--semantic-elevated", theme.elevatedColor);
  
  root.style.setProperty("--semantic-text-primary", theme.textPrimary);
  root.style.setProperty("--semantic-text-secondary", theme.textSecondary);
  root.style.setProperty("--semantic-text-muted", theme.textMuted);
  root.style.setProperty("--semantic-text-on-primary", "#ffffff");
  
  root.style.setProperty("--semantic-border", theme.borderColor);
  
  root.style.setProperty("--semantic-success", theme.successColor);
  root.style.setProperty("--semantic-warning", theme.warningColor);
  root.style.setProperty("--semantic-error", theme.errorColor);
  
  root.style.setProperty("--semantic-glass-bg", theme.glassBg);
  root.style.setProperty("--semantic-primary-glow", theme.primaryGlow);

  root.style.setProperty("--prism-chart-primary", theme.chartPrimary || theme.primaryColor);
  root.style.setProperty("--prism-chart-secondary", theme.chartSecondary || theme.accentColor);
  root.style.setProperty("--prism-chart-accent", theme.accentColor);
  
  root.style.setProperty("--semantic-radius", `${theme.radius}px`);
  root.style.setProperty("--prism-card-radius", `${theme.radius}px`);
  
  let fontVar = theme.font;
  if (theme.font === "Geist") fontVar = "var(--font-geist)";
  if (theme.font === "JetBrains Mono") fontVar = "var(--font-geist-mono)";
  root.style.setProperty("--semantic-font", fontVar);
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeState, setThemeState] = useState<ThemeState>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // useIsomorphicLayoutEffect runs synchronously before browser paint
  useIsomorphicLayoutEffect(() => {
    let currentTheme = defaultTheme;
    try {
      const savedTheme = localStorage.getItem("prism-theme");
      if (savedTheme) {
        currentTheme = JSON.parse(savedTheme);
      } else {
        // If no saved theme, determine based on system preference
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        currentTheme = isDark 
          ? { ...defaultTheme, ...presets["default"], activePreset: "default" }
          : { ...defaultTheme, ...presets["default-light"], activePreset: "default-light" };
      }
    } catch (e) {
      console.error("Failed to parse saved theme from localStorage", e);
    }
    
    setThemeState(currentTheme);
    // Immediately apply CSS variables to the DOM before rendering frame
    applyThemeToDOM(currentTheme);
    setMounted(true);
  }, []);

  // Save to localStorage and apply CSS vars whenever themeState changes
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("prism-theme", JSON.stringify(themeState));
    applyThemeToDOM(themeState);
  }, [themeState, mounted]);

  const setTheme = (updates: Partial<ThemeState>) => {
    setThemeState(prev => ({ ...prev, ...updates }));
  };

  const applyPreset = (presetId: string) => {
    const presetTheme = presets[presetId];
    if (presetTheme) {
      setThemeState(prev => ({ ...prev, ...presetTheme, activePreset: presetId }));
    }
  };

  // We only render children once mounted to avoid hydration mismatch with text/content that depends on the theme.
  // Wait, if we return null, there is a FOUC (white screen).
  // The requirement says "Avoid flashes of incorrect theme during page load". 
  // Next.js hydration will just give warnings in dev, so we can suppress them or ignore them.
  // Let's render children immediately. The CSS variables are applied synchronously above so there is no visual FOUC!
  return (
    <ThemeContext.Provider value={{ ...themeState, setTheme, applyPreset }}>
      <div style={{ display: "contents" }} suppressHydrationWarning>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
