"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, DollarSign, ShoppingBag, Terminal, Clipboard, Check, Laptop, Tablet, Phone } from "lucide-react";

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
  const [primaryColor, setPrimaryColor] = useState("#6366F1");
  const [surfaceColor, setSurfaceColor] = useState("#0D0F17");
  const [accentColor, setAccentColor] = useState("#A855F7");
  const [font, setFont] = useState("Geist");
  const [radius, setRadius] = useState(12);

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
    const cssText = `:root {
  --prism-primary: ${primaryColor};
  --prism-surface: ${surfaceColor};
  --prism-accent: ${accentColor};
  --prism-font: '${font}', sans-serif;
  --prism-radius: ${radius}px;
}`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const textContrast = getContrastColor(surfaceColor);
  const cardBg = getCardBg(surfaceColor);

  return (
    <section className="py-16 px-6 bg-bg-base relative z-10 border-b border-border-subtle overflow-hidden">
      
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
{`:root {
  --prism-primary: ${primaryColor};
  --prism-surface: ${surfaceColor};
  --prism-accent: ${accentColor};
  --prism-font: '${font}';
  --prism-radius: ${radius}px;
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
              <div
                style={{
                  backgroundColor: surfaceColor,
                  fontFamily: font === "Geist" ? "var(--font-geist)" : font === "JetBrains Mono" ? "var(--font-geist-mono)" : font,
                  borderRadius: `${radius}px`,
                  color: textContrast,
                  transition: "background-color 300ms, color 300ms, border-radius 300ms",
                }}
                className="text-left flex flex-row flex-1 h-full min-h-[520px]"
              >
                {/* Dashboard Sidebar */}
                <div
                  style={{
                    borderColor: textContrast === "#FAFAFA" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  }}
                  className="hidden md:flex flex-col gap-6 p-4 border-r w-44 shrink-0 text-[11px]"
                >
                  <div className="flex items-center gap-2 font-bold mb-2">
                    <svg viewBox="0 0 100 100" className="w-4 h-4 transition-colors duration-300" style={{ fill: primaryColor }}>
                      <path d="M50 15 L20 75 L50 85 Z" fill={primaryColor} />
                      <path d="M50 15 L50 85 L80 75 Z" fill={accentColor} />
                    </svg>
                    <span className="font-semibold tracking-tight">Prism Analytics</span>
                  </div>
                  <div className="flex flex-col gap-1.5 opacity-80">
                    <span style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }} className="px-2.5 py-1.5 rounded font-semibold transition-colors duration-300">Overview</span>
                    <span className="px-2.5 py-1.5 rounded hover:bg-white/5 cursor-pointer transition-colors">Analytics</span>
                    <span className="px-2.5 py-1.5 rounded hover:bg-white/5 cursor-pointer transition-colors">Campaigns</span>
                    <span className="px-2.5 py-1.5 rounded hover:bg-white/5 cursor-pointer transition-colors">Customers</span>
                    <span className="px-2.5 py-1.5 rounded hover:bg-white/5 cursor-pointer transition-colors">Settings</span>
                  </div>
                  <div className="mt-auto opacity-40 text-[9px] font-mono">
                    v2.4.0
                  </div>
                </div>

                {/* Dashboard Main Content */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between overflow-hidden h-full">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 md:hidden">
                      <svg viewBox="0 0 100 100" className="w-5 h-5 transition-colors duration-300" style={{ fill: primaryColor }}>
                        <path d="M50 15 L20 75 L50 85 Z" fill={primaryColor} />
                        <path d="M50 15 L50 85 L80 75 Z" fill={accentColor} />
                      </svg>
                      <span className="font-bold text-sm tracking-tight">Analytics</span>
                    </div>
                    <span className="hidden md:inline font-bold text-sm tracking-tight">Dashboard Overview</span>
                    <span className="text-[10px] opacity-60 uppercase font-mono">Q2 Overview</span>
                  </div>

                  {/* 3 KPI cards row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Revenue", val: "$24,580", trend: "+12.5% ↑", isUp: true },
                      { label: "Active Users", val: "1,847", trend: "+8.2% ↑", isUp: true },
                      { label: "Conversion", val: "3.4%", trend: "-0.5% ↓", isUp: false },
                    ].map((kpi, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: cardBg,
                          borderColor: `${primaryColor}30`,
                          borderRadius: `${radius}px`,
                          transition: "background-color 300ms, border-color 300ms, border-radius 300ms",
                        }}
                        className="border p-3 flex flex-col justify-between h-20 shadow-sm"
                      >
                        <span className="text-[9px] opacity-50 uppercase font-semibold">{kpi.label}</span>
                        <div className="flex justify-between items-end mt-1">
                          <span className="text-lg font-bold leading-none">{kpi.val}</span>
                          <span
                            style={{ color: kpi.isUp ? primaryColor : accentColor }}
                            className="text-[9px] font-semibold transition-colors duration-300"
                          >
                            {kpi.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Large main chart */}
                  <div
                    style={{
                      backgroundColor: cardBg,
                      borderColor: `${primaryColor}20`,
                      borderRadius: `${radius}px`,
                      transition: "background-color 300ms, border-color 300ms, border-radius 300ms",
                    }}
                    className="border p-4 h-[180px] flex flex-col justify-between shadow-sm"
                  >
                    <span className="text-[9px] opacity-50 uppercase font-semibold">User Engagements (Monthly)</span>
                    
                    {/* SVG Chart */}
                    <div className="flex-1 w-full relative pt-2">
                      <svg className="w-full h-full" viewBox="0 0 500 130" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="live-chart-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.25" />
                            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="30" x2="500" y2="30" stroke={textContrast === "#FAFAFA" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} strokeWidth="1" />
                        <line x1="0" y1="70" x2="500" y2="70" stroke={textContrast === "#FAFAFA" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} strokeWidth="1" />
                        <line x1="0" y1="110" x2="500" y2="110" stroke={textContrast === "#FAFAFA" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} strokeWidth="1" />
                        
                        {/* Area Fill */}
                        <path
                          d="M 0 110 Q 70 80, 140 95 T 280 40 T 420 50 T 500 10 L 500 130 L 0 130 Z"
                          fill="url(#live-chart-grad)"
                          className="transition-all duration-300"
                        />
                        
                        {/* Path Line */}
                        <path
                          d="M 0 110 Q 70 80, 140 95 T 280 40 T 420 50 T 500 10"
                          fill="none"
                          stroke={primaryColor}
                          strokeWidth="2.5"
                          className="transition-all duration-300"
                        />
                      </svg>
                    </div>
                    
                    {/* labels */}
                    <div className="flex justify-between text-[8px] opacity-40 uppercase font-mono mt-1">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul</span>
                      <span>Sep</span>
                      <span>Nov</span>
                    </div>
                  </div>

                  {/* Lower Grid: Table + Donut */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Live interactive Table */}
                    <div className="overflow-hidden flex flex-col gap-2">
                      <span className="text-[9px] opacity-50 uppercase font-semibold">Recent Transactions</span>
                      <table className="w-full text-[10px] border-collapse">
                        <thead>
                          <tr style={{ backgroundColor: `${primaryColor}15` }} className="transition-colors duration-300">
                            <th className="py-1.5 px-2 font-semibold text-left opacity-75">Customer</th>
                            <th className="py-1.5 px-2 font-semibold text-left opacity-75">Volume</th>
                            <th className="py-1.5 px-2 font-semibold text-right opacity-75">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: "Acme Corp", vol: "$12,480", status: "Active" },
                            { name: "Vercel Inc", vol: "$9,204", status: "Active" },
                            { name: "Stripe", vol: "$8,492", status: "Pending" },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-b-0">
                              <td className="py-1.5 px-2 font-medium opacity-85">{row.name}</td>
                              <td className="py-1.5 px-2 opacity-80 font-mono">{row.vol}</td>
                              <td className="py-1.5 px-2 text-right">
                                <span style={{ color: primaryColor }} className="font-semibold transition-colors duration-300">
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Donut Chart / Traffic Sources */}
                    <div
                      style={{
                        backgroundColor: cardBg,
                        borderColor: `${primaryColor}20`,
                        borderRadius: `${radius}px`,
                        transition: "background-color 300ms, border-color 300ms, border-radius 300ms",
                      }}
                      className="border p-3.5 flex flex-col justify-between shadow-sm"
                    >
                      <span className="text-[9px] opacity-50 uppercase font-semibold mb-2 block">Traffic Breakdown</span>
                      <div className="flex items-center gap-4 flex-1 justify-center sm:justify-start">
                        {/* Radial Progress Ring */}
                        <div className="relative w-14 h-14 shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-white/5"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            {/* Direct Traffic (60%) */}
                            <path
                              stroke={primaryColor}
                              strokeWidth="3.5"
                              strokeDasharray="60, 100"
                              strokeLinecap="round"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              className="transition-all duration-300"
                            />
                            {/* Referral Traffic (25%) */}
                            <path
                              stroke={accentColor}
                              strokeWidth="3.5"
                              strokeDasharray="25, 100"
                              strokeDashoffset="-60"
                              strokeLinecap="round"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              className="transition-all duration-300"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
                            85%
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 text-[9px]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                            <span className="opacity-80">Direct: 60%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                            <span className="opacity-80">Referral: 25%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
                            <span className="opacity-60">Organic: 15%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Button Row */}
                  <div className="flex gap-3 mt-2">
                    <button
                      style={{
                        backgroundColor: primaryColor,
                        color: getContrastColor(primaryColor),
                        borderRadius: `${radius}px`,
                        transition: "background-color 300ms, color 300ms, border-radius 300ms",
                      }}
                      className="flex-1 py-2 text-xs font-semibold shadow-md active:scale-95 transition-transform duration-100 focus:outline-none text-center justify-center flex items-center"
                    >
                      Export Report
                    </button>
                    <button
                      style={{
                        borderColor: primaryColor,
                        color: primaryColor,
                        borderRadius: `${radius}px`,
                        transition: "border-color 300ms, color 300ms, border-radius 300ms",
                      }}
                      className="flex-1 py-2 text-xs font-semibold border bg-transparent active:scale-95 transition-transform duration-100 focus:outline-none text-center justify-center flex items-center"
                    >
                      Apply Filters
                    </button>
                  </div>

                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
