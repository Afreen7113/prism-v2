"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sliders,
  BarChart3,
  Users,
  CreditCard,
  Clipboard,
  Check,
  Code2,
  Plus,
  ShieldCheck,
  Server,
  Eye,
  BookOpen,
  X
} from "lucide-react";
import PrismDashboard from "@/components/PrismDashboard";

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<"playground" | "builder" | "customers" | "billing">("playground");

  // --- 1. PLAYGROUND STATE (White-label design tokens) ---
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [surfaceColor, setSurfaceColor] = useState("#0f172a");
  const [accentColor, setAccentColor] = useState("#0ea5e9");
  const [font, setFont] = useState("Inter");
  const [radius, setRadius] = useState(8);
  const [activePreset, setActivePreset] = useState<string>("default");
  const [cssCopied, setCssCopied] = useState(false);
  const [playgroundPulse, setPlaygroundPulse] = useState(false);
  const [canvasWidgets, setCanvasWidgets] = useState<string[]>(["kpi", "chart", "table"]);

  // Preset Handlers
  const applyPreset = (preset: string) => {
    setActivePreset(preset);
    if (preset === "default") {
      setPrimaryColor("#4f46e5");
      setSurfaceColor("#0f172a");
      setAccentColor("#0ea5e9");
      setFont("Inter");
      setRadius(8);
    } else if (preset === "healthcare") {
      setPrimaryColor("#0284C7");
      setSurfaceColor("#F8FAFC");
      setAccentColor("#0F766E");
      setFont("Inter");
      setRadius(6);
    } else if (preset === "fintech") {
      setPrimaryColor("#059669");
      setSurfaceColor("#0B0F19");
      setAccentColor("#EAB308");
      setFont("Sora");
      setRadius(4);
    } else if (preset === "consumer") {
      setPrimaryColor("#EC4899");
      setSurfaceColor("#FFFDFD");
      setAccentColor("#F97316");
      setFont("DM Sans");
      setRadius(24);
    } else if (preset === "developer") {
      setPrimaryColor("#10B981");
      setSurfaceColor("#050505");
      setAccentColor("#06B6D4");
      setFont("JetBrains Mono");
      setRadius(0);
    }
  };

  useEffect(() => {
    setPlaygroundPulse(true);
    const timer = setTimeout(() => setPlaygroundPulse(false), 300);
    return () => clearTimeout(timer);
  }, [primaryColor, surfaceColor, accentColor, font, radius]);

  // Color Contrast Helper
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

  const textContrast = getContrastColor(surfaceColor);
  const cardBg = textContrast === "#0F172A" ? "rgba(15, 23, 42, 0.04)" : "rgba(255, 255, 255, 0.03)";
  const primaryContrast = getContrastColor(primaryColor);

  const themeStyle = {
    "--prism-dashboard-bg": surfaceColor,
    "--prism-dashboard-text": textContrast,
    "--prism-dashboard-text-secondary": textContrast === "#FAFAFA" ? "#cbd5e1" : "#475569",
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
  } as React.CSSProperties;

  const copyCss = () => {
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
  --prism-semantic-text-secondary: ${textContrast === "#FAFAFA" ? "#cbd5e1" : "#475569"};
  --prism-semantic-border: ${textContrast === "#FAFAFA" ? "rgba(250,250,250,0.08)" : "rgba(15,23,42,0.08)"};
  --prism-semantic-radius: var(--prism-radius-base);

  /* 3. Component Tokens */
  --prism-dashboard-bg: var(--prism-semantic-bg);
  --prism-dashboard-text: var(--prism-semantic-text-primary);
  --prism-dashboard-text-secondary: var(--prism-semantic-text-secondary);
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
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 2000);
  };

  // --- 2. CHART BUILDER STATE ---
  const [chartType, setChartType] = useState<"Area" | "Line" | "Bar">("Area");
  const [chartMetric, setChartMetric] = useState<string>("User Engagements");
  const [chartPrimary, setChartPrimary] = useState("#6366F1");
  const [chartAccent, setChartAccent] = useState("#A855F7");
  const [chartRadius, setChartRadius] = useState(12);
  const [embedCopied, setEmbedCopied] = useState<"react" | "html" | null>(null);

  const copyEmbed = (type: "react" | "html") => {
    let text = "";
    if (type === "react") {
      text = `<PrismDashboard
  chartType="${chartType}"
  chartMetric="${chartMetric}"
  style={{
    "--prism-chart-primary": "${chartPrimary}",
    "--prism-chart-accent": "${chartAccent}",
    "--prism-card-radius": "${chartRadius}px"
  }}
/>`;
    } else {
      text = `<iframe 
  src="https://cdn.prism.dev/embed/chart?type=${chartType.toLowerCase()}&metric=${encodeURIComponent(chartMetric)}&primary=${encodeURIComponent(chartPrimary)}&accent=${encodeURIComponent(chartAccent)}&radius=${chartRadius}" 
  width="100%" 
  height="300" 
  frameborder="0" 
  style="border-radius: ${chartRadius}px; border: 1px solid rgba(255,255,255,0.08);"
></iframe>`;
    }
    navigator.clipboard.writeText(text);
    setEmbedCopied(type);
    setTimeout(() => setEmbedCopied(null), 2000);
  };

  // --- 3. CUSTOMER (TENANT) MANAGEMENT STATE ---
  const [tenants, setTenants] = useState([
    { id: "1", name: "Clinix Medical", clientId: "cli_health_84a7", apiKey: "pk_live_0a28bc94ef03", preset: "healthcare", status: "Active", tier: "Growth", requests: "142,840" },
    { id: "2", name: "Apex Wealth", clientId: "cli_fintech_71b9", apiKey: "pk_live_948fbd20adbc", preset: "fintech", status: "Active", tier: "Enterprise", requests: "942,030" },
    { id: "3", name: "ShopSync Retail", clientId: "cli_retail_38c2", apiKey: "pk_live_e92a40b90c01", preset: "consumer", status: "Active", tier: "Growth", requests: "582,310" },
    { id: "4", name: "DevEngine Metrics", clientId: "cli_devtools_90d5", apiKey: "pk_live_38bf8c02def9", preset: "developer", status: "Suspended", tier: "Developer", requests: "12,940" },
  ]);
  const [newTenantName, setNewTenantName] = useState("");
  const [newTenantPreset, setNewTenantPreset] = useState("default");
  const [newTenantTier, setNewTenantTier] = useState("Growth");
  const [showAddModal, setShowAddModal] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState<Record<string, boolean>>({});

  const toggleTenantStatus = (id: string) => {
    setTenants(tenants.map(t => t.id === id ? { ...t, status: t.status === "Active" ? "Suspended" : "Active" } : t));
  };

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantName) return;
    const randomHex = Math.floor(Math.random() * 65535).toString(16);
    const randomKey = Math.floor(Math.random() * 10000000000000).toString(16);
    const newT = {
      id: (tenants.length + 1).toString(),
      name: newTenantName,
      clientId: `cli_${newTenantPreset}_${randomHex}`,
      apiKey: `pk_live_${randomKey}`,
      preset: newTenantPreset,
      status: "Active",
      tier: newTenantTier,
      requests: "0"
    };
    setTenants([...tenants, newT]);
    setNewTenantName("");
    setShowAddModal(false);
  };

  // --- 4. TELEMETRY & BILLING STATE ---
  const [selectedTier, setSelectedTier] = useState<"developer" | "growth" | "enterprise">("growth");
  const billingConfig = {
    developer: { price: "$0", limit: "50,000 requests/mo", features: ["Standard charts", "Standard support", "CSS Customization"], capPct: 25.8 },
    growth: { price: "$149/mo", limit: "1,000,000 requests/mo", features: ["Advanced visualizer", "Priority response support", "Multi-tenant white-label variables", "Interactive theme dashboard"], capPct: 83.7 },
    enterprise: { price: "Custom Pricing", limit: "Unlimited requests", features: ["Dedicated servers", "SLA guarantees", "Custom analytics pipelines", "24/7 Phone Support"], capPct: 42.1 }
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col relative font-sans overflow-x-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 bg-grid opacity-20 pointer-events-none" />

      {/* Admin Portal Header */}
      <header className="h-16 border-b border-border-subtle bg-bg-surface/60 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 100 100" className="w-6 h-6 drop-shadow-[0_0_6px_rgba(99,102,241,0.4)]">
            <path d="M50 10 L15 75 L50 90 Z" fill="url(#prism-grad-1)" />
            <path d="M50 10 L50 90 L85 75 Z" fill="url(#prism-grad-2)" />
            <path d="M50 10 L50 90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
          </svg>
          <span className="font-semibold text-text-primary text-base tracking-tight">
            Prism <span className="text-primary font-bold text-xs uppercase bg-primary/10 px-2 py-0.5 rounded ml-1.5 border border-primary/20">Admin Surface</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-text-secondary hover:text-text-primary transition-all">
            ← Back to marketing page
          </Link>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10">
        {/* Sidebar Controls */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border-subtle bg-[#05060A]/85 p-5 flex flex-col gap-1 shrink-0">
          <span className="text-[10px] uppercase font-bold text-text-muted px-3 mb-2 tracking-widest">Navigation</span>
          
          {[
            { id: "playground", label: "Theme Playground", icon: Sliders },
            { id: "builder", label: "Chart Builder", icon: BarChart3 },
            { id: "customers", label: "Tenant Manager", icon: Users },
            { id: "billing", label: "Usage & Telemetry", icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "playground" | "builder" | "customers" | "billing")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all duration-300 ${
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/20 shadow-[0_0_12px_rgba(99,102,241,0.1)]"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}

          <Link
            href="/storybook"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 text-pink-500" />
            <span>Storybook Docs</span>
          </Link>

          <div className="mt-8 pt-6 border-t border-white/5 px-3 hidden lg:flex flex-col gap-2">
            <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest block mb-1">Status Overview</span>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">API Status:</span>
              <span className="text-success font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Gateway latency:</span>
              <span className="text-text-primary font-mono">14.2ms</span>
            </div>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* TABS VIEWPORT */}

            {/* TAB 1: THEME PLAYGROUND */}
            {activeTab === "playground" && (
              <motion.div
                key="playground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start"
              >
                <div className="xl:col-span-12">
                  <h1 className="text-3xl font-semibold tracking-tight">White-Label Theme Playground</h1>
                  <p className="text-sm text-text-secondary mt-1">
                    Prism adapts dynamically to any client dashboard. Customize 3-layer CSS Design Tokens, test presets, and copy integration custom properties.
                  </p>
                </div>

                {/* Left: Playground Controls */}
                <div className="xl:col-span-5 flex flex-col gap-6 bg-bg-surface/50 border border-white/5 p-6 rounded-[24px] shadow-xl">
                  
                  {/* Preset Selector */}
                  <div>
                    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2.5">
                      1. Visual Presets (White-Label Demos)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { id: "default", label: "Default" },
                        { id: "healthcare", label: "Medical" },
                        { id: "fintech", label: "Fintech" },
                        { id: "consumer", label: "Retail" },
                        { id: "developer", label: "Console" },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => applyPreset(p.id)}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all border ${
                            activePreset === p.id
                              ? "bg-primary/20 text-primary border-primary"
                              : "bg-white/5 border-white/5 hover:border-white/10 text-text-secondary"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Token Level 1: Primitives */}
                  <div className="border-t border-white/5 pt-4">
                    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">
                      2. Layer 1: Primitive Tokens (Base Variables)
                    </span>
                    
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {/* Primary Color */}
                      <div className="flex flex-col gap-1 items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                        <label className="cursor-pointer relative flex items-center justify-center">
                          <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => {
                              setPrimaryColor(e.target.value);
                              setActivePreset("custom");
                            }}
                            className="absolute opacity-0 w-8 h-8 cursor-pointer"
                          />
                          <div
                            className="w-8 h-8 rounded-lg border border-white/10 shadow-inner cursor-pointer"
                            style={{ backgroundColor: primaryColor }}
                          />
                        </label>
                        <span className="text-[10px] font-semibold text-text-primary mt-1">Primary</span>
                        <span className="text-[9px] font-mono text-text-muted uppercase leading-none">{primaryColor}</span>
                      </div>

                      {/* Surface Color */}
                      <div className="flex flex-col gap-1 items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                        <label className="cursor-pointer relative flex items-center justify-center">
                          <input
                            type="color"
                            value={surfaceColor}
                            onChange={(e) => {
                              setSurfaceColor(e.target.value);
                              setActivePreset("custom");
                            }}
                            className="absolute opacity-0 w-8 h-8 cursor-pointer"
                          />
                          <div
                            className="w-8 h-8 rounded-lg border border-white/10 shadow-inner cursor-pointer"
                            style={{ backgroundColor: surfaceColor }}
                          />
                        </label>
                        <span className="text-[10px] font-semibold text-text-primary mt-1">Surface</span>
                        <span className="text-[9px] font-mono text-text-muted uppercase leading-none">{surfaceColor}</span>
                      </div>

                      {/* Accent Color */}
                      <div className="flex flex-col gap-1 items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                        <label className="cursor-pointer relative flex items-center justify-center">
                          <input
                            type="color"
                            value={accentColor}
                            onChange={(e) => {
                              setAccentColor(e.target.value);
                              setActivePreset("custom");
                            }}
                            className="absolute opacity-0 w-8 h-8 cursor-pointer"
                          />
                          <div
                            className="w-8 h-8 rounded-lg border border-white/10 shadow-inner cursor-pointer"
                            style={{ backgroundColor: accentColor }}
                          />
                        </label>
                        <span className="text-[10px] font-semibold text-text-primary mt-1">Accent</span>
                        <span className="text-[9px] font-mono text-text-muted uppercase leading-none">{accentColor}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Font Primitive */}
                      <div>
                        <label className="block text-[9px] font-bold text-text-secondary uppercase mb-1">Font family</label>
                        <select
                          value={font}
                          onChange={(e) => {
                            setFont(e.target.value);
                            setActivePreset("custom");
                          }}
                          className="w-full bg-[#0D0F17] border border-white/10 p-2 rounded-lg text-xs text-text-primary focus:outline-none"
                        >
                          <option value="Geist">Geist</option>
                          <option value="Inter">Inter (SaaS Std)</option>
                          <option value="Sora">Sora (Modern/Fintech)</option>
                          <option value="DM Sans">DM Sans (Consumer)</option>
                          <option value="JetBrains Mono">JetBrains Mono</option>
                        </select>
                      </div>

                      {/* Radius Primitive */}
                      <div>
                        <label className="block text-[9px] font-bold text-text-secondary uppercase mb-1">Border Radius</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="24"
                            value={radius}
                            onChange={(e) => {
                              setRadius(Number(e.target.value));
                              setActivePreset("custom");
                            }}
                            className="flex-1 accent-primary bg-white/10 h-1.5 rounded-lg cursor-pointer"
                          />
                          <span className="text-[10px] font-semibold font-mono text-text-primary min-w-[28px] text-right">{radius}px</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Token Level 2 & 3: Semantics & Component Mappings */}
                  <div className="border-t border-white/5 pt-4">
                    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2.5">
                      3. Semantic & Component Token Resolutions
                    </span>
                    <div className="flex flex-col gap-2 bg-black/30 p-3.5 rounded-xl border border-white/5 text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                        <span className="text-text-secondary font-semibold font-mono">--prism-semantic-bg</span>
                        <span className="text-text-primary font-mono uppercase text-[10px]" style={{ color: surfaceColor }}>{surfaceColor}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                        <span className="text-text-secondary font-semibold font-mono">--prism-semantic-text-primary</span>
                        <span className="text-text-primary font-mono uppercase text-[10px]" style={{ color: textContrast }}>{textContrast}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                        <span className="text-text-secondary font-semibold font-mono">--prism-card-radius</span>
                        <span className="text-text-primary font-mono text-[10px]">{radius}px</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary font-semibold font-mono">--prism-button-bg</span>
                        <span className="text-text-primary font-mono uppercase text-[10px]" style={{ color: primaryColor }}>{primaryColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Generate Code CSS Box */}
                  <div className="border-t border-white/5 pt-4 relative">
                    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">
                      4. Export Token Variables CSS
                    </span>
                    <div className="bg-black/90 rounded-xl p-3.5 border border-white/5 font-mono text-[9px] leading-relaxed text-[#86EFAC] relative overflow-hidden select-all max-h-[140px] overflow-y-auto">
                      <button
                        onClick={copyCss}
                        className="absolute top-2 right-2 p-1.5 rounded bg-white/5 hover:bg-white/10 text-white transition-all focus:outline-none"
                      >
                        {cssCopied ? <Check className="w-3.5 h-3.5 text-success" /> : <Clipboard className="w-3.5 h-3.5" />}
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
}`}
                      </pre>
                    </div>
                  </div>

                </div>

                {/* Right: Browser Mockup with Cascading Tokens */}
                <div className="xl:col-span-7 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-primary" /> Live white-label browser sandbox
                    </span>
                    <span className="text-xs text-text-secondary">
                      Active: <span className="font-semibold text-text-primary capitalize">{activePreset} preset</span>
                    </span>
                  </div>

                  <motion.div
                    animate={playgroundPulse ? { scale: 1.01 } : { scale: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-full bg-[#05060A]/90 border border-white/10 rounded-[20px] overflow-hidden shadow-2xl flex flex-col flex-1 h-full min-h-[560px]"
                  >
                    {/* Browser chrome header */}
                    <div className="bg-white/5 border-b border-white/5 px-4 py-3.5 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
                      </div>
                      <div className="flex-1 max-w-[280px] mx-auto bg-white/5 py-1 px-3 rounded text-[10px] text-text-muted font-mono text-center truncate select-all">
                        https://client-portal.app/analytics
                      </div>
                    </div>

                    {/* Dashboard Container embedding PrismDashboard */}
                    <div className="p-4 bg-white/[0.01] flex-1 flex flex-col h-full min-h-[500px]">
                      <PrismDashboard
                        title={activePreset === "healthcare" ? "Clinix EHR Portal" : activePreset === "fintech" ? "Apex Ledger" : activePreset === "consumer" ? "ShopSync Hub" : "Prism Dashboard"}
                        chartMetric={activePreset === "healthcare" ? "Daily Admissions" : activePreset === "fintech" ? "Ledger Volume" : activePreset === "consumer" ? "Gross Orders" : "API requests"}
                        style={themeStyle}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: CHART BUILDER WITH DRAG & DROP DASHBOARD CANVAS */}
            {activeTab === "builder" && (
              <motion.div
                key="builder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start text-left"
              >
                <div className="xl:col-span-12">
                  <h1 className="text-3xl font-semibold tracking-tight">Chart & Widget Builder</h1>
                  <p className="text-sm text-text-secondary mt-1">
                    Design custom embedded charts, configure metrics, select color coordinates, and assemble layouts using the drag-and-drop dashboard canvas.
                  </p>
                </div>

                {/* Left Controls & Widgets Library */}
                <div className="xl:col-span-5 flex flex-col gap-6">
                  
                  {/* Selector Configuration */}
                  <div className="flex flex-col gap-6 bg-bg-surface/50 border border-white/5 p-6 rounded-[24px] shadow-xl">
                    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      1. Widget Customization
                    </span>

                    <div className="flex flex-col gap-4">
                      {/* Chart Type */}
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">Visual representation</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["Area", "Line", "Bar"].map((t) => (
                            <button
                              key={t}
                              onClick={() => setChartType(t as "Area" | "Line" | "Bar")}
                              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                                chartType === t
                                  ? "bg-primary/25 border-primary text-text-primary"
                                  : "bg-white/5 border-white/5 hover:border-white/10 text-text-secondary"
                              }`}
                            >
                              {t} Chart
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Primary Metric */}
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">Focus Metric Name</label>
                        <select
                          value={chartMetric}
                          onChange={(e) => setChartMetric(e.target.value)}
                          className="w-full bg-[#0D0F17] border border-white/10 p-2.5 rounded-lg text-xs text-text-primary focus:outline-none"
                        >
                          <option value="User Engagements">User Engagements</option>
                          <option value="Monthly Net Revenue">Monthly Net Revenue</option>
                          <option value="Weekly Active Sessions">Weekly Active Sessions</option>
                          <option value="Server Response Time">Server Response Time</option>
                          <option value="API Conversion Rates">API Conversion Rates</option>
                        </select>
                      </div>

                      {/* Grid Colors */}
                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                        <div>
                          <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1.5">Chart Primary</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={chartPrimary}
                              onChange={(e) => setChartPrimary(e.target.value)}
                              className="w-8 h-8 rounded border border-white/15 cursor-pointer bg-transparent"
                            />
                            <span className="text-xs font-mono uppercase">{chartPrimary}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1.5">Chart Accent</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={chartAccent}
                              onChange={(e) => setChartAccent(e.target.value)}
                              className="w-8 h-8 rounded border border-white/15 cursor-pointer bg-transparent"
                            />
                            <span className="text-xs font-mono uppercase">{chartAccent}</span>
                          </div>
                        </div>
                      </div>

                      {/* Radius selector */}
                      <div className="border-t border-white/5 pt-4">
                        <label className="block text-xs font-semibold text-text-secondary mb-2">Border Radius</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={chartRadius}
                            onChange={(e) => setChartRadius(Number(e.target.value))}
                            className="flex-1 accent-primary bg-white/10 h-1 rounded-lg cursor-pointer"
                          />
                          <span className="text-xs font-mono text-text-primary">{chartRadius}px</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Drag-and-Drop Widgets Library Sidebar */}
                  <div className="bg-bg-surface/50 border border-white/5 p-6 rounded-[24px] shadow-xl flex flex-col gap-4">
                    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      2. Drag-and-Drop Library
                    </span>
                    <p className="text-[11px] text-text-secondary leading-normal">
                      Drag any widget card below and drop it into the dashboard canvas on the right to arrange your layout.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "kpi", label: "KPI Stat Blocks", desc: "SaaS revenue, user volume, and conversion", icon: Sliders },
                        { id: "chart", label: "Analytics Canvas", desc: "Interactive area, line, or bar charts", icon: BarChart3 },
                        { id: "table", label: "Data Records", desc: "List of recently processed transactions", icon: Users },
                        { id: "donut", label: "Traffic Breakdown", desc: "Category breakdown progress donut", icon: CreditCard }
                      ].map(w => {
                        const Icon = w.icon;
                        const isAdded = canvasWidgets.includes(w.id);
                        return (
                          <div
                            key={w.id}
                            draggable={!isAdded}
                            onDragStart={(e) => {
                              e.dataTransfer.setData("widgetType", w.id);
                            }}
                            onClick={() => {
                              if (!isAdded) {
                                setCanvasWidgets([...canvasWidgets, w.id]);
                              }
                            }}
                            className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all duration-300 group select-none ${
                              isAdded 
                                ? "bg-white/5 border-white/5 opacity-45 cursor-not-allowed" 
                                : "bg-bg-surface border-white/5 hover:border-primary/40 cursor-grab active:cursor-grabbing hover:bg-white/5"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isAdded ? "bg-white/5 text-text-muted" : "bg-primary/10 text-primary group-hover:bg-primary/20"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <div className="text-[11px] font-bold text-text-primary leading-tight truncate">{w.label}</div>
                              <div className="text-[9px] text-text-secondary leading-none mt-1 truncate">{w.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Generate codes snippet */}
                  <div className="bg-bg-surface/50 border border-white/5 p-6 rounded-[24px] shadow-xl flex flex-col gap-4">
                    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      3. Widget Integration Codes
                    </span>

                    {/* React embed */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-semibold text-text-secondary flex items-center gap-1">
                          <Code2 className="w-3.5 h-3.5 text-primary" /> React Component Snippet
                        </span>
                        <button
                          onClick={() => copyEmbed("react")}
                          className="text-[9px] font-semibold text-primary hover:text-text-primary transition-all flex items-center gap-1"
                        >
                          {embedCopied === "react" ? <Check className="w-3 h-3 text-success" /> : <Clipboard className="w-3 h-3" />}
                          Copy Component
                        </button>
                      </div>
                      <div className="bg-black/90 p-3 rounded-lg border border-white/5 font-mono text-[9px] text-text-primary max-h-[100px] overflow-y-auto">
                        <pre>{`<PrismDashboard
  chartType="${chartType}"
  chartMetric="${chartMetric}"
  style={{
    "--prism-chart-primary": "${chartPrimary}",
    "--prism-chart-accent": "${chartAccent}",
    "--prism-card-radius": "${chartRadius}px"
  }}
/>`}</pre>
                      </div>
                    </div>

                    {/* HTML Iframe embed */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-semibold text-text-secondary flex items-center gap-1">
                          <Server className="w-3.5 h-3.5 text-primary" /> Raw HTML Iframe embed
                        </span>
                        <button
                          onClick={() => copyEmbed("html")}
                          className="text-[9px] font-semibold text-primary hover:text-text-primary transition-all flex items-center gap-1"
                        >
                          {embedCopied === "html" ? <Check className="w-3 h-3 text-success" /> : <Clipboard className="w-3 h-3" />}
                          Copy Iframe
                        </button>
                      </div>
                      <div className="bg-black/90 p-3 rounded-lg border border-white/5 font-mono text-[9px] text-text-primary max-h-[100px] overflow-y-auto truncate">
                        <code>{`<iframe src="https://cdn.prism.dev/embed/chart?type=${chartType.toLowerCase()}&metric=${encodeURIComponent(chartMetric)}&primary=${encodeURIComponent(chartPrimary)}" width="100%" height="300" frameborder="0"></iframe>`}</code>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Interactive Dashboard Canvas with Dropzone */}
                <div className="xl:col-span-7 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">
                      4. Custom Dashboard Canvas (Drag & Drop Target)
                    </span>
                    <button
                      onClick={() => setCanvasWidgets(["kpi", "chart", "table"])}
                      className="text-[10px] font-semibold text-primary hover:text-text-primary transition-colors"
                    >
                      Reset Canvas Layout
                    </button>
                  </div>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const type = e.dataTransfer.getData("widgetType");
                      if (type && !canvasWidgets.includes(type)) {
                        setCanvasWidgets([...canvasWidgets, type]);
                      }
                    }}
                    className={`bg-[#08090E]/90 border-2 border-dashed border-white/10 p-6 shadow-2xl flex flex-col gap-4 transition-all duration-300 min-h-[520px] justify-start relative`}
                    style={{
                      borderRadius: `${chartRadius}px`,
                      "--prism-chart-primary": chartPrimary,
                      "--prism-chart-accent": chartAccent,
                      "--prism-card-radius": `${chartRadius}px`,
                      "--prism-dashboard-bg": "transparent",
                      "--prism-dashboard-text": "#FAFAFA",
                      "--prism-card-bg": "rgba(255, 255, 255, 0.03)",
                      "--prism-card-border": "rgba(255,255,255,0.06)",
                      "--prism-dashboard-border": "rgba(255,255,255,0.06)"
                    } as React.CSSProperties}
                  >
                    {canvasWidgets.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center text-text-muted mb-4">
                          <BarChart3 className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">Empty Dashboard Canvas</div>
                        <div className="text-[10px] text-text-secondary mt-1 max-w-[200px]">
                          Drag widgets from the library on the left and drop them here.
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {/* Dynamic Render of Widget List */}
                        
                        {/* 1. KPI Stats Card */}
                        {canvasWidgets.includes("kpi") && (
                          <div className="relative border border-white/10 bg-white/5 p-3 rounded-xl flex flex-col gap-2 group">
                            {/* Drag indicator bar */}
                            <div className="flex items-center justify-between border-b border-white/5 pb-1">
                              <span className="text-[9px] font-bold text-text-secondary flex items-center gap-1.5 cursor-grab">
                                <span className="flex flex-col gap-[2px] w-2 pointer-events-none opacity-50">
                                  <span className="h-[2px] bg-white rounded-full" />
                                  <span className="h-[2px] bg-white rounded-full" />
                                  <span className="h-[2px] bg-white rounded-full" />
                                </span>
                                KPI STATS BLOCK
                              </span>
                              <button
                                onClick={() => setCanvasWidgets(canvasWidgets.filter(w => w !== "kpi"))}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-white/10 text-white"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            {/* Render actual Stats */}
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { label: "Revenue", value: "$24,580", trend: "+12.5% ↑", isUp: true },
                                { label: "Active Users", value: "1,847", trend: "+8.2% ↑", isUp: true },
                                { label: "Conversion", value: "3.4%", trend: "-0.5% ↓", isUp: false },
                              ].map((kpi, idx) => (
                                <div key={idx} className="bg-black/25 border border-white/5 p-2 rounded-lg flex flex-col justify-between h-14">
                                  <span className="text-[8px] text-text-secondary uppercase font-bold tracking-wider">{kpi.label}</span>
                                  <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-white">{kpi.value}</span>
                                    <span style={{ color: kpi.isUp ? "var(--prism-chart-primary)" : "var(--prism-chart-accent)" }} className="text-[8px] font-bold">{kpi.trend}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 2. Visual Charts */}
                        {canvasWidgets.includes("chart") && (
                          <div className="relative border border-white/10 bg-white/5 p-3 rounded-xl flex flex-col gap-2 group">
                            <div className="flex items-center justify-between border-b border-white/5 pb-1">
                              <span className="text-[9px] font-bold text-text-secondary flex items-center gap-1.5 cursor-grab">
                                <span className="flex flex-col gap-[2px] w-2 pointer-events-none opacity-50">
                                  <span className="h-[2px] bg-white rounded-full" />
                                  <span className="h-[2px] bg-white rounded-full" />
                                  <span className="h-[2px] bg-white rounded-full" />
                                </span>
                                {chartMetric.toUpperCase()} ({chartType.toUpperCase()} CHART)
                              </span>
                              <button
                                onClick={() => setCanvasWidgets(canvasWidgets.filter(w => w !== "chart"))}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-white/10 text-white"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                              <PrismDashboard
                                chartType={chartType}
                                chartMetric={chartMetric}
                                hideSidebar={true}
                                title={chartMetric}
                                customData={[]}
                              />
                            </div>
                          </div>
                        )}

                        {/* 3. Data Inflows Grid */}
                        {canvasWidgets.includes("table") && (
                          <div className="relative border border-white/10 bg-white/5 p-3 rounded-xl flex flex-col gap-2 group">
                            <div className="flex items-center justify-between border-b border-white/5 pb-1">
                              <span className="text-[9px] font-bold text-text-secondary flex items-center gap-1.5 cursor-grab">
                                <span className="flex flex-col gap-[2px] w-2 pointer-events-none opacity-50">
                                  <span className="h-[2px] bg-white rounded-full" />
                                  <span className="h-[2px] bg-white rounded-full" />
                                  <span className="h-[2px] bg-white rounded-full" />
                                </span>
                                CUSTOMER INFLOW DATA TABLE
                              </span>
                              <button
                                onClick={() => setCanvasWidgets(canvasWidgets.filter(w => w !== "table"))}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-white/10 text-white"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <div className="bg-black/25 p-2 rounded-lg border border-white/5 overflow-x-auto">
                              <table className="w-full text-[9.5px] text-left border-collapse">
                                <thead>
                                  <tr className="border-b border-white/5 text-text-secondary">
                                    <th className="py-1 px-2 font-bold">Tenant Name</th>
                                    <th className="py-1 px-2 font-bold">Monthly Volume</th>
                                    <th className="py-1 px-2 text-right font-bold">Integration Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[
                                    { name: "Acme Corp", vol: "$12,480", status: "Active" },
                                    { name: "Vercel Inc", vol: "$9,204", status: "Active" },
                                    { name: "Stripe Metrics", vol: "$8,492", status: "Pending" }
                                  ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 last:border-0 text-white">
                                      <td className="py-1.5 px-2 font-semibold">{row.name}</td>
                                      <td className="py-1.5 px-2 font-mono">{row.vol}</td>
                                      <td className="py-1.5 px-2 text-right">
                                        <span className="font-bold text-[var(--prism-semantic-primary)]">{row.status}</span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* 4. Traffic Breakdown Donut */}
                        {canvasWidgets.includes("donut") && (
                          <div className="relative border border-white/10 bg-white/5 p-3 rounded-xl flex flex-col gap-2 group">
                            <div className="flex items-center justify-between border-b border-white/5 pb-1">
                              <span className="text-[9px] font-bold text-text-secondary flex items-center gap-1.5 cursor-grab">
                                <span className="flex flex-col gap-[2px] w-2 pointer-events-none opacity-50">
                                  <span className="h-[2px] bg-white rounded-full" />
                                  <span className="h-[2px] bg-white rounded-full" />
                                  <span className="h-[2px] bg-white rounded-full" />
                                </span>
                                TRAFFIC CHANNELS PIE BREAKDOWN
                              </span>
                              <button
                                onClick={() => setCanvasWidgets(canvasWidgets.filter(w => w !== "donut"))}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-white/10 text-white"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <div className="bg-black/25 p-3.5 rounded-lg border border-white/5 flex items-center gap-6 justify-center">
                              <div className="relative w-12 h-12 shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <path className="text-slate-700/30" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <path stroke="var(--prism-chart-primary)" strokeWidth="3.5" strokeDasharray="60, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <path stroke="var(--prism-chart-accent)" strokeWidth="3.5" strokeDasharray="25, 100" strokeDashoffset="-60" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">85%</div>
                              </div>
                              <div className="flex flex-col gap-0.5 text-[8.5px] text-text-secondary font-bold">
                                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--prism-chart-primary)" }} /><span>Direct Web: 60%</span></div>
                                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--prism-chart-accent)" }} /><span>Referrals: 25%</span></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 3: CUSTOMER (TENANT) MANAGEMENT */}
            {activeTab === "customers" && (
              <motion.div
                key="customers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Customer Tenant Registry</h1>
                    <p className="text-sm text-text-secondary mt-1">
                      Manage active B2B platform integrations, view client credentials, configure API scopes, and provision new workspaces.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-xl flex items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add New Tenant
                  </button>
                </div>

                {/* Tenant List Table container */}
                <div className="bg-bg-surface/40 border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="border-b border-white/10 text-xs font-bold text-text-secondary">
                        <th className="pb-3.5 px-3">Tenant Name</th>
                        <th className="pb-3.5 px-3">Client ID</th>
                        <th className="pb-3.5 px-3">API Key (PK)</th>
                        <th className="pb-3.5 px-3">Active Preset</th>
                        <th className="pb-3.5 px-3">Pricing Tier</th>
                        <th className="pb-3.5 px-3">Requests (mo)</th>
                        <th className="pb-3.5 px-3">Status</th>
                        <th className="pb-3.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {tenants.map((t) => (
                        <tr key={t.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-all">
                          <td className="py-4 px-3 font-semibold text-text-primary flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                              {t.name.substring(0,2)}
                            </span>
                            {t.name}
                          </td>
                          <td className="py-4 px-3 font-mono text-text-secondary opacity-80">{t.clientId}</td>
                          <td className="py-4 px-3 font-mono text-text-secondary">
                            <div className="flex items-center gap-1.5">
                              <span>
                                {apiKeyVisible[t.id] ? t.apiKey : "pk_live_••••••••••••"}
                              </span>
                              <button
                                onClick={() => setApiKeyVisible({ ...apiKeyVisible, [t.id]: !apiKeyVisible[t.id] })}
                                className="text-[10px] text-primary hover:text-text-primary font-semibold"
                              >
                                {apiKeyVisible[t.id] ? "Hide" : "Reveal"}
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-3">
                            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 font-semibold capitalize text-[10px]">
                              {t.preset}
                            </span>
                          </td>
                          <td className="py-4 px-3 font-semibold text-text-primary">
                            <span className={`px-2 py-0.5 rounded border ${
                              t.tier === "Enterprise"
                                ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                                : t.tier === "Growth"
                                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                : "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
                            }`}>
                              {t.tier}
                            </span>
                          </td>
                          <td className="py-4 px-3 font-mono text-text-secondary">{t.requests}</td>
                          <td className="py-4 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              t.status === "Active"
                                ? "bg-success/10 text-success border border-success/15"
                                : "bg-red-500/10 text-red-400 border border-red-500/15"
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="py-4 px-3 text-right">
                            <div className="flex justify-end gap-3.5">
                              <button
                                onClick={() => toggleTenantStatus(t.id)}
                                className={`text-[10px] font-bold ${
                                  t.status === "Active" ? "text-amber-500 hover:text-amber-400" : "text-success hover:text-success/80"
                                }`}
                              >
                                {t.status === "Active" ? "Suspend" : "Activate"}
                              </button>
                              <button
                                onClick={() => setTenants(tenants.filter(item => item.id !== t.id))}
                                className="text-red-500 hover:text-red-400 font-semibold"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ADD TENANT MODAL MOCK */}
                {showAddModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#0D0F17] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
                      <h3 className="text-lg font-bold text-text-primary mb-1">Provision New Tenant Space</h3>
                      <p className="text-xs text-text-secondary mb-4">Set customer credentials, pick theme environments, and assign billing limits.</p>
                      
                      <form onSubmit={handleAddTenant} className="flex flex-col gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1">Company / Tenant Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Stripe Inc"
                            value={newTenantName}
                            onChange={(e) => setNewTenantName(e.target.value)}
                            className="w-full bg-black/30 border border-white/10 p-2.5 rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Visual Preset</label>
                            <select
                              value={newTenantPreset}
                              onChange={(e) => setNewTenantPreset(e.target.value)}
                              className="w-full bg-[#0D0F17] border border-white/10 p-2.5 rounded-xl text-xs text-text-primary focus:outline-none"
                            >
                              <option value="default">Default Dark</option>
                              <option value="healthcare">Clinical Light</option>
                              <option value="fintech">Fintech Amber</option>
                              <option value="consumer">Retail Pink</option>
                              <option value="developer">Developer Mono</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Pricing Plan</label>
                            <select
                              value={newTenantTier}
                              onChange={(e) => setNewTenantTier(e.target.value)}
                              className="w-full bg-[#0D0F17] border border-white/10 p-2.5 rounded-xl text-xs text-text-primary focus:outline-none"
                            >
                              <option value="Developer">Developer</option>
                              <option value="Growth">Growth</option>
                              <option value="Enterprise">Enterprise</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-4">
                          <button
                            type="button"
                            onClick={() => setShowAddModal(false)}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 transition-all text-text-secondary"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:brightness-110 transition-all"
                          >
                            Create Space
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 4: USAGE & BILLING TELEMETRY */}
            {activeTab === "billing" && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-12">
                  <h1 className="text-3xl font-semibold tracking-tight">Usage Billing & API Telemetry</h1>
                  <p className="text-sm text-text-secondary mt-1">
                    Monitor tenant-wide request volumes, gateway query loads, active rates, and simulate billing configurations.
                  </p>
                </div>

                {/* Billing Simulator Card */}
                <div className="lg:col-span-5 bg-bg-surface/50 border border-white/5 p-6 rounded-[24px] shadow-xl flex flex-col gap-6">
                  <div>
                    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">
                      Interactive Billing Plan Configurator
                    </span>
                    <div className="flex gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5">
                      {["developer", "growth", "enterprise"].map((tier) => (
                        <button
                          key={tier}
                          onClick={() => setSelectedTier(tier as "developer" | "growth" | "enterprise")}
                          className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                            selectedTier === tier
                              ? "bg-primary text-white shadow-lg shadow-primary/15"
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tier details panel */}
                  <div className="bg-black/35 rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-text-secondary uppercase font-bold tracking-wide">Monthly Price</span>
                      <span className="text-2xl font-bold text-primary">{billingConfig[selectedTier].price}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-xs text-text-secondary uppercase font-bold tracking-wide">Usage Limit</span>
                      <span className="text-sm font-semibold text-text-primary">{billingConfig[selectedTier].limit}</span>
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Plan Features Included:</span>
                      {billingConfig[selectedTier].features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                          <span className="opacity-95">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Limit usage bars */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-semibold">
                      <span className="text-text-secondary">Current tier limit reached:</span>
                      <span className={`${billingConfig[selectedTier].capPct >= 80 ? "text-amber-500" : "text-success"}`}>
                        {billingConfig[selectedTier].capPct}%
                      </span>
                    </div>
                    <div className="w-full bg-white/5 border border-white/5 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          billingConfig[selectedTier].capPct >= 80
                            ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                            : "bg-success"
                        }`}
                        style={{ width: `${billingConfig[selectedTier].capPct}%` }}
                      />
                    </div>
                    {billingConfig[selectedTier].capPct >= 80 && (
                      <span className="text-[10px] text-amber-500 font-bold block mt-2 animate-pulse">
                        ⚠ Warning: Approaching request caps. Tenant requests will be throttled.
                      </span>
                    )}
                  </div>

                  <button className="w-full py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-primary to-tertiary text-white shadow-lg active:scale-[0.98] transition-all hover:brightness-110">
                    Apply Subscription Upgrade
                  </button>
                </div>

                {/* Telemetry charts */}
                <div className="lg:col-span-7 bg-bg-surface/50 border border-white/5 p-6 rounded-[24px] shadow-xl flex flex-col gap-6">
                  <div>
                    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
                      Aggregate API Gateway Requests
                    </span>
                    <span className="text-xs text-text-secondary">Telemetries for all active API Keys (Past 24h)</span>
                  </div>

                  {/* SVG Telemetry analytics */}
                  <div className="h-56 relative w-full border border-white/5 bg-black/20 p-4 rounded-xl flex flex-col justify-between">
                    <div className="flex-1 w-full relative pt-2">
                      <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="telemetry-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="37" x2="500" y2="37" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <line x1="0" y1="112" x2="500" y2="112" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                        {/* Request area fill */}
                        <path
                          d="M 0 130 C 50 110, 100 80, 150 100 C 200 120, 250 50, 300 40 C 350 30, 400 90, 450 60 L 500 50 L 500 150 L 0 150 Z"
                          fill="url(#telemetry-grad)"
                        />
                        {/* Request line path */}
                        <path
                          d="M 0 130 C 50 110, 100 80, 150 100 C 200 120, 250 50, 300 40 C 350 30, 400 90, 450 60 L 500 50"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2.5"
                        />
                      </svg>
                    </div>
                    {/* Time ticks */}
                    <div className="flex justify-between text-[8px] opacity-40 uppercase font-mono mt-1 shrink-0">
                      <span>00:00</span>
                      <span>04:00</span>
                      <span>08:00</span>
                      <span>12:00</span>
                      <span>16:00</span>
                      <span>20:00</span>
                    </div>
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-black/35 rounded-xl border border-white/5 p-3 text-center">
                      <span className="block text-[8px] text-text-muted uppercase font-bold tracking-wider mb-1">Total Hits</span>
                      <span className="text-base font-bold text-text-primary">1.68M</span>
                    </div>
                    <div className="bg-black/35 rounded-xl border border-white/5 p-3 text-center">
                      <span className="block text-[8px] text-text-muted uppercase font-bold tracking-wider mb-1">Avg Latency</span>
                      <span className="text-base font-bold text-text-primary">14.2ms</span>
                    </div>
                    <div className="bg-black/35 rounded-xl border border-white/5 p-3 text-center">
                      <span className="block text-[8px] text-text-muted uppercase font-bold tracking-wider mb-1">Uptime</span>
                      <span className="text-base font-bold text-success">99.98%</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
