"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, DollarSign, ShoppingBag, Terminal, Clipboard, Check, Laptop, Tablet, Phone } from "lucide-react";
import PrismDashboard from "@/components/PrismDashboard";

// Determine text contrast based on background color luminance
const getContrastColor = (hex: string) => {
  const cleanHex = hex.replace("#", "");
  let r = 0, g = 0, b = 0;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex.charAt(0) + cleanHex.charAt(0), 16);
    g = parseInt(cleanHex.charAt(1) + cleanHex.charAt(1), 16);
    b = parseInt(cleanHex.charAt(2) + cleanHex.charAt(2), 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  }
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#0F172A" : "#FAFAFA";
};

// Determine card background base based on surface color brightness
const getCardBg = (hex: string) => {
  const contrast = getContrastColor(hex);
  return contrast === "#0F172A" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)";
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
};

export default function ThemeEngine() {
  // Theme States
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [surfaceColor, setSurfaceColor] = useState("#0f172a");
  const [accentColor, setAccentColor] = useState("#0ea5e9");
  const [font, setFont] = useState("Inter");
  const [radius, setRadius] = useState(8);

  // Interaction States
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [pulse, setPulse] = useState(false);

  // Trigger preview pulse when theme shifts
  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(timer);
  }, [primaryColor, surfaceColor, accentColor, font, radius]);

  // Preset Handler
  const applyPreset = (name: string) => {
    setActivePreset(name);
    if (name === "healthcare") {
      setPrimaryColor("#0EA5E9");
      setSurfaceColor("#F8FAFC");
      setAccentColor("#06B6D4");
      setFont("Inter");
      setRadius(8);
    } else if (name === "fintech") {
      setPrimaryColor("#059669");
      setSurfaceColor("#064E3B");
      setAccentColor("#FBBF24");
      setFont("Geist");
      setRadius(4);
    } else if (name === "consumer") {
      setPrimaryColor("#EC4899");
      setSurfaceColor("#FDF2F8");
      setAccentColor("#F97316");
      setFont("DM Sans");
      setRadius(20);
    } else if (name === "developer") {
      setPrimaryColor("#10B981");
      setSurfaceColor("#0A0A0A");
      setAccentColor("#22D3EE");
      setFont("JetBrains Mono");
      setRadius(2);
    }
  };

  const handleCopy = () => {
    const cssText = `/* CSS Design Token System - 3 Abstraction Layers */
:root {
  /* 1. Primitive Tokens */
  --prism-color-primary: ${primaryColor};
  --prism-color-accent: ${accentColor};
  --prism-color-surface: ${surfaceColor};
  --prism-radius-base: ${radius}px;
  --prism-font-base: '${font}', sans-serif;

  /* 2. Semantic Tokens */
  --prism-semantic-primary: var(--prism-color-primary);
  --prism-semantic-accent: var(--prism-color-accent);
  --prism-semantic-bg: var(--prism-color-surface);
  --prism-semantic-text-primary: ${textContrast};
  --prism-semantic-text-secondary: ${textContrast === "#FAFAFA" ? "rgba(250,250,250,0.6)" : "rgba(15,23,42,0.6)"};
  --prism-semantic-border: ${textContrast === "#FAFAFA" ? "rgba(250,250,250,0.08)" : "rgba(15,23,42,0.08)"};
  --prism-semantic-radius: var(--prism-radius-base);

  /* 3. Component Tokens */
  --prism-dashboard-bg: var(--prism-semantic-bg);
  --prism-dashboard-text: var(--prism-semantic-text-primary);
  --prism-dashboard-border: var(--prism-semantic-border);
  --prism-sidebar-bg: ${textContrast === "#FAFAFA" ? "rgba(0,0,0,0.15)" : "rgba(15,23,42,0.03)"};
  --prism-card-bg: ${cardBg};
  --prism-card-radius: var(--prism-semantic-radius);
  --prism-button-bg: var(--prism-semantic-primary);
  --prism-button-text: ${primaryContrast};
  --prism-chart-primary: var(--prism-semantic-primary);
  --prism-chart-accent: var(--prism-semantic-accent);
}`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const textContrast = getContrastColor(surfaceColor);
  const cardBg = getCardBg(surfaceColor);
  const primaryContrast = getContrastColor(primaryColor);

  return (
    <section id="white-label" className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base relative z-10 border-b border-border-subtle overflow-hidden">
      
      {/* Background orbs */}
      <motion.div
        animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none blur-[100px] z-0"
      />
      
      <motion.div
        animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none blur-[100px] z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <span className="inline-block text-[13px] font-medium tracking-[0.15em] text-primary uppercase mb-4">
            Live Interactive Demo
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] text-text-primary mb-6 max-w-lg mx-auto"
          >
            {"Watch it match".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-0.5">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
            {" "}
            <span className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] inline-block"
              style={{
                backgroundImage: "linear-gradient(120deg, #6366F1, #A855F7, #22D3EE, #6366F1)",
              }}
            >
              {"any brand.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 py-0.5">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Move the controls. See your design system come alive in real-time.
          </motion.p>
        </div>

        {/* Main Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left panel: Control panel */}
          <div className="lg:col-span-2 bg-bg-elevated/40 glass rounded-[24px] p-5 sm:p-6 border border-white/5 shadow-xl flex flex-col gap-4 text-left justify-between h-full">
            
            {/* 1. BRAND COLORS */}
            <div>
              <span className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-3">
                Brand Colors
              </span>
              <div className="grid grid-cols-3 gap-2">
                
                {/* Primary */}
                <div className="flex flex-col gap-1.5 bg-white/5 p-2 rounded-xl border border-white/5 items-center text-center">
                  <label className="cursor-pointer relative flex items-center justify-center">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => {
                        setPrimaryColor(e.target.value);
                        setActivePreset(null);
                      }}
                      className="sr-only"
                    />
                    <div
                      className="w-8 h-8 rounded-lg border border-white/10 shadow-inner"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </label>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-semibold text-text-primary">Primary</span>
                    <span className="text-[9px] font-mono text-text-muted uppercase">{primaryColor}</span>
                  </div>
                </div>

                {/* Surface */}
                <div className="flex flex-col gap-1.5 bg-white/5 p-2 rounded-xl border border-white/5 items-center text-center">
                  <label className="cursor-pointer relative flex items-center justify-center">
                    <input
                      type="color"
                      value={surfaceColor}
                      onChange={(e) => {
                        setSurfaceColor(e.target.value);
                        setActivePreset(null);
                      }}
                      className="sr-only"
                    />
                    <div
                      className="w-8 h-8 rounded-lg border border-white/10 shadow-inner"
                      style={{ backgroundColor: surfaceColor }}
                    />
                  </label>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-semibold text-text-primary">Surface</span>
                    <span className="text-[9px] font-mono text-text-muted uppercase">{surfaceColor}</span>
                  </div>
                </div>

                {/* Accent */}
                <div className="flex flex-col gap-1.5 bg-white/5 p-2 rounded-xl border border-white/5 items-center text-center">
                  <label className="cursor-pointer relative flex items-center justify-center">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => {
                        setAccentColor(e.target.value);
                        setActivePreset(null);
                      }}
                      className="sr-only"
                    />
                    <div
                      className="w-8 h-8 rounded-lg border border-white/10 shadow-inner"
                      style={{ backgroundColor: accentColor }}
                    />
                  </label>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-semibold text-text-primary">Accent</span>
                    <span className="text-[9px] font-mono text-text-muted uppercase">{accentColor}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. TYPOGRAPHY */}
            <div className="border-t border-white/5 pt-4">
              <span className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                Typography
              </span>
              <select
                value={font}
                onChange={(e) => {
                  setFont(e.target.value);
                  setActivePreset(null);
                }}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 p-2 rounded-lg text-xs text-text-primary focus:outline-none cursor-pointer"
              >
                <option value="Geist" className="bg-[#0D0F17]">Geist</option>
                <option value="Inter" className="bg-[#0D0F17]">Inter</option>
                <option value="DM Sans" className="bg-[#0D0F17]">DM Sans</option>
                <option value="Sora" className="bg-[#0D0F17]">Sora</option>
                <option value="JetBrains Mono" className="bg-[#0D0F17]">JetBrains Mono</option>
              </select>
            </div>

            {/* 3. BORDER RADIUS */}
            <div className="border-t border-white/5 pt-4">
              <span className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                Border Radius
              </span>
              <div className="flex items-center gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={radius}
                    onChange={(e) => {
                      setRadius(Number(e.target.value));
                      setActivePreset(null);
                    }}
                    className="w-full accent-primary bg-white/10 h-1 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] font-semibold font-mono text-text-primary">{radius}px</span>
                </div>

                {/* Small preview block */}
                <motion.div
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    borderColor: primaryColor,
                    borderRadius: `${radius}px`,
                  }}
                  className="w-10 h-10 border-2 shrink-0 transition-all duration-300"
                />
              </div>
            </div>

            {/* 4. PRESET THEMES */}
            <div className="border-t border-white/5 pt-4">
              <span className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                Preset Themes
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: "healthcare", label: "Health", icon: Heart },
                  { name: "fintech", label: "Fintech", icon: DollarSign },
                  { name: "consumer", label: "Retail", icon: ShoppingBag },
                  { name: "developer", label: "Dev", icon: Terminal },
                ].map((preset) => {
                  const Icon = preset.icon;
                  const isActive = activePreset === preset.name;
                  return (
                    <motion.button
                      key={preset.name}
                      onClick={() => applyPreset(preset.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-center p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 focus:outline-none ${
                        isActive
                          ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                          : "bg-white/5 border-white/5 hover:border-white/20"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-text-secondary"}`} />
                      <span className="text-[10px] font-semibold text-text-primary leading-none mt-0.5">{preset.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>


            {/* 5. GENERATED CSS OUTPUT */}
            <div className="border-t border-white/5 pt-4 relative">
              <span className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                Generated CSS
              </span>
              <div className="bg-black/80 rounded-xl p-3 border border-white/5 font-mono text-[9px] leading-normal text-[#86EFAC] relative overflow-hidden select-all">
                <button
                  onClick={handleCopy}
                  className="absolute top-2.5 right-2.5 p-1 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors duration-300 focus:outline-none"
                >
                  {copied ? <Check className="w-3 h-3 text-success" /> : <Clipboard className="w-3 h-3" />}
                </button>
                <pre className="text-left whitespace-pre-wrap">
{`/* CSS Design Token System - 3 Abstraction Layers */
:root {
  /* 1. Primitive Tokens */
  --prism-color-primary: ${primaryColor};
  --prism-color-accent: ${accentColor};
  --prism-color-surface: ${surfaceColor};
  --prism-radius-base: ${radius}px;
  --prism-font-base: '${font}', sans-serif;

  /* 2. Semantic Tokens */
  --prism-semantic-primary: var(--prism-color-primary);
  --prism-semantic-accent: var(--prism-color-accent);
  --prism-semantic-bg: var(--prism-color-surface);
  --prism-semantic-text-primary: ${textContrast};
  --prism-semantic-border: ${textContrast === "#FAFAFA" ? "rgba(250,250,250,0.08)" : "rgba(15,23,42,0.08)"};
  --prism-semantic-radius: var(--prism-radius-base);

  /* 3. Component Tokens */
  --prism-dashboard-bg: var(--prism-semantic-bg);
  --prism-card-bg: ${cardBg};
  --prism-card-radius: var(--prism-semantic-radius);
  --prism-button-bg: var(--prism-semantic-primary);
  --prism-chart-primary: var(--prism-semantic-primary);
}`}
                </pre>
              </div>
            </div>

          </div>

          {/* Right panel: Preview container */}
          <div className="lg:col-span-3 flex flex-col gap-4 h-full justify-between">
            
            {/* Device Toggles */}
            <div className="flex justify-center md:justify-end">
              <div className="glass p-1 rounded-full flex gap-1 border border-white/5">
                {[
                  { id: "desktop", label: "Desktop", icon: Laptop },
                  { id: "tablet", label: "Tablet", icon: Tablet },
                  { id: "mobile", label: "Mobile", icon: Phone },
                ].map((dev) => {
                  const DevIcon = dev.icon;
                  const isActive = previewWidth === dev.id;
                  return (
                    <button
                      key={dev.id}
                      onClick={() => setPreviewWidth(dev.id as "desktop" | "tablet" | "mobile")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-300 focus:outline-none ${
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      <DevIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{dev.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Browser Mockup Canvas */}
            <motion.div
              animate={pulse ? { scale: 1.015 } : { scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`w-full mx-auto bg-[#05060A]/80 glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 flex-1 flex flex-col h-full ${
                previewWidth === "tablet"
                  ? "max-w-[600px]"
                  : previewWidth === "mobile"
                  ? "max-w-[360px]"
                  : "max-w-full"
              }`}
            >
              
              {/* Browser Header Chrome */}
              <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
                </div>
                <div className="flex-1 max-w-xs mx-auto bg-white/5 py-1 px-3 rounded text-[10px] text-text-muted font-mono text-center">
                  yourbrand.com/analytics
                </div>
              </div>

              {/* Themeable Live Dashboard */}
              <div className="p-4 bg-white/[0.01] flex-1 flex flex-col h-full min-h-[500px]">
                <PrismDashboard
                  title={activePreset === "healthcare" ? "Clinix EHR Portal" : activePreset === "fintech" ? "Apex Ledger" : activePreset === "consumer" ? "ShopSync Hub" : "Prism Dashboard"}
                  chartMetric={activePreset === "healthcare" ? "Daily Admissions" : activePreset === "fintech" ? "Ledger Volume" : activePreset === "consumer" ? "Gross Orders" : "API requests"}
                  style={{
                    "--prism-dashboard-bg": surfaceColor,
                    "--prism-dashboard-text": textContrast,
                    "--prism-dashboard-border": textContrast === "#FAFAFA" ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
                    "--prism-sidebar-bg": textContrast === "#FAFAFA" ? "rgba(0,0,0,0.15)" : "rgba(15,23,42,0.03)",
                    "--prism-sidebar-border": textContrast === "#FAFAFA" ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
                    "--prism-card-bg": cardBg,
                    "--prism-card-border": textContrast === "#FAFAFA" ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
                    "--prism-card-radius": `${radius}px`,
                    "--prism-button-bg": primaryColor,
                    "--prism-button-text": primaryContrast,
                    "--prism-button-radius": `${Math.min(radius, 8)}px`,
                    "--prism-chart-primary": primaryColor,
                    "--prism-chart-accent": accentColor,
                    "--prism-semantic-primary": primaryColor,
                    "--prism-semantic-font": font === "Geist" ? "var(--font-geist)" : font === "JetBrains Mono" ? "var(--font-geist-mono)" : font,
                  } as React.CSSProperties}
                />
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
