"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Code2, 
  Check, 
  Clipboard, 
  Settings
} from "lucide-react";
import PrismDashboard from "@/components/PrismDashboard";

export default function StorybookPage() {
  const [activeStory, setActiveStory] = useState<"provider" | "dashboard" | "kpi" | "chart">("dashboard");
  const [copiedCode, setCopiedCode] = useState(false);

  // --- STORY CONTROLS ---
  // Dashboard story controls
  const [dashTitle, setDashTitle] = useState("Corporate Overview");
  const [dashChartType, setDashChartType] = useState<"Area" | "Line" | "Bar">("Area");
  const [dashChartMetric, setDashChartMetric] = useState("Net Volume");
  const [dashHideSidebar, setDashHideSidebar] = useState(false);

  // Provider story controls
  const [provPrimary, setProvPrimary] = useState("#4f46e5");
  const [provSurface, setProvSurface] = useState("#0f172a");
  const [provRadius, setProvRadius] = useState(12);

  // Contrast Calculation Helper
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

  const provText = getContrastColor(provSurface);
  const provTextSecondary = provText === "#FAFAFA" ? "#cbd5e1" : "#475569";
  const provBorder = provText === "#FAFAFA" ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";

  // KPI story controls
  const [kpiLabel, setKpiLabel] = useState("API Latency");
  const [kpiValue, setKpiValue] = useState("47.2 ms");
  const [kpiTrend, setKpiTrend] = useState("-12.4% ↓");
  const [kpiIsUp, setKpiIsUp] = useState(false);

  // Chart story controls
  const [chartType, setChartType] = useState<"Area" | "Line" | "Bar">("Line");
  const [chartPrimary, setChartPrimary] = useState("#10B981");

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const stories = [
    { id: "provider", label: "PrismProvider", desc: "Global design context" },
    { id: "dashboard", label: "PrismDashboard", desc: "Main white-label viewport" },
    { id: "kpi", label: "KPICard", desc: "Single value stat container" },
    { id: "chart", label: "AnalyticsChart", desc: "SVG vector analytics" }
  ];

  return (
    <div className="h-screen bg-bg-base text-text-primary flex flex-col relative font-sans overflow-hidden text-left">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 bg-grid opacity-20 pointer-events-none" />

      {/* Storybook Header */}
      <header className="h-16 border-b border-border-subtle bg-bg-surface/60 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 100 100" className="w-6 h-6 drop-shadow-[0_0_6px_rgba(99,102,241,0.4)]">
            <path d="M50 10 L15 75 L50 90 Z" fill="var(--prism-semantic-primary)" />
            <path d="M50 10 L50 90 L85 75 Z" fill="var(--prism-semantic-accent)" />
            <path d="M50 10 L50 90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
          </svg>
          <span className="font-semibold text-text-primary text-base tracking-tight flex items-center gap-2">
            Prism <span className="text-primary font-bold text-xs uppercase bg-primary/10 px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1"><BookOpen className="w-3 h-3 text-primary" /> Storybook v7.4</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
  <a
    href="http://localhost:6006"
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 rounded-lg bg-primary text-white font-medium shadow-glow-primary hover:scale-105 transition-all duration-300"
  >
    Open Full Storybook ↗
  </a>

  <a
    href="/admin"
    className="text-text-secondary hover:text-text-primary transition-colors"
  >
    ← Back to Admin Portal
  </a>
</div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden">
        
        {/* Storybook Navigation Sidebar - sticky, only content scrolls */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-surface/90 p-5 flex flex-col gap-1 shrink-0 lg:h-full lg:overflow-y-auto">
          <span className="text-[10px] uppercase font-bold text-text-muted px-3 mb-2 tracking-widest">Component Stories</span>
          
          {stories.map((story) => {
            const isActive = activeStory === story.id;
            return (
              <button
                key={story.id}
                onClick={() => {
                  setActiveStory(story.id as "provider" | "dashboard" | "kpi" | "chart");
                  setCopiedCode(false);
                }}
                className={`w-full flex flex-col gap-0.5 px-3 py-2 rounded-xl text-left transition-all border ${
                  isActive
                    ? "bg-primary/15 text-primary border-primary/20 shadow-[0_0_12px_var(--prism-primary-glow)]"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60 border-transparent"
                }`}
              >
                <span className="text-xs font-bold">{story.label}</span>
                <span className="text-[9px] opacity-75">{story.desc}</span>
              </button>
            );
          })}

          <div className="mt-8 pt-6 border-t border-border-subtle px-3 hidden lg:flex flex-col gap-2">
            <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest block mb-1">Canvas Environment</span>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Viewport:</span>
              <span className="text-text-primary font-mono font-semibold">Responsive</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Renderer:</span>
              <span className="text-text-primary font-mono font-semibold">SVG / Canvas</span>
            </div>
          </div>
        </aside>

        {/* Storybook Content Panel - only this scrolls */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto h-full max-w-7xl mx-auto w-full flex flex-col gap-8">
          
          {/* Header Description */}
          {activeStory === "provider" && (
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">PrismProvider</h1>
              <p className="text-sm text-text-secondary mt-1 max-w-3xl">
                The root context provider establishing design tokens. Injects Layer 1 Primitives (custom properties) dynamically into document scope, driving Layer 2 Semantics and Layer 3 Component tokens down the DOM tree.
              </p>
            </div>
          )}

          {activeStory === "dashboard" && (
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">PrismDashboard</h1>
              <p className="text-sm text-text-secondary mt-1 max-w-3xl">
                The flagship embeddable component. Responsive B2B analytics surface containing modular KPI stat cards, transactional records grid, visual analytics vector paths, and category progression donuts.
              </p>
            </div>
          )}

          {activeStory === "kpi" && (
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">KPICard</h1>
              <p className="text-sm text-text-secondary mt-1 max-w-3xl">
                Standalone metric block representing key data points. Automatically adjusts contrast colors and border radius to align with parent theme containers.
              </p>
            </div>
          )}

          {activeStory === "chart" && (
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">AnalyticsChart</h1>
              <p className="text-sm text-text-secondary mt-1 max-w-3xl">
                Vector graphics SVG canvas mapping analytical trend coordinates. Uses stroke highlights to communicate data statuses rather than static brand decorations.
              </p>
            </div>
          )}

          {/* Core Interactive Sandbox Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* LEFT Panel: Story Component Interactive Canvas */}
            <div className="xl:col-span-8 flex flex-col gap-3">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                Story Preview Canvas
              </span>
              
              <div 
                className="border border-border-subtle rounded-2xl p-6 h-auto min-h-[420px] flex flex-col items-center justify-center relative w-full"
                style={{
                  backgroundColor: provSurface,
                  "--prism-semantic-primary": provPrimary,
                  "--prism-site-surface": provSurface,
                  "--prism-card-radius": `${provRadius}px`,
                  "--prism-card-bg": provText === "#FAFAFA" ? "rgba(255, 255, 255, 0.07)" : "rgba(15, 23, 42, 0.06)",
                  "--prism-card-border": provBorder,
                  "--prism-dashboard-text": provText,
                  "--prism-dashboard-text-secondary": provTextSecondary,
                  "--prism-dashboard-border": provBorder,
                  "--prism-chart-primary": provPrimary,
                  "--prism-chart-accent": "#0ea5e9"
                } as React.CSSProperties}
              >
                {/* 1. PrismProvider Demo Preview */}
                {activeStory === "provider" && (
                  <div className="w-full flex flex-col gap-5">
                    {/* Header row */}
                    <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: provBorder }}>
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: provTextSecondary }}>PrismProvider — Token Cascade Demo</span>
                      <span className="text-[9px] px-2 py-0.5 rounded font-mono" style={{ color: provPrimary, background: `${provPrimary}18`, border: `1px solid ${provPrimary}30` }}>v2.4.1</span>
                    </div>

                    {/* Main demo card - uses an explicit opaque surface color */}
                    <div
                      className="w-full flex flex-col items-center gap-5 p-6"
                      style={{
                        background: provText === "#FAFAFA"
                          ? "rgba(255,255,255,0.10)"
                          : "rgba(255,255,255,0.92)",
                        border: `1.5px solid ${provBorder}`,
                        borderRadius: `${provRadius}px`,
                        boxShadow: provText === "#FAFAFA"
                          ? `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${provPrimary}18`
                          : `0 4px 16px rgba(0,0,0,0.08), 0 0 0 1px ${provPrimary}14`
                      }}
                    >
                      {/* Icon badge */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: provPrimary, boxShadow: `0 4px 16px ${provPrimary}50` }}
                      >
                        <Settings className="w-6 h-6" style={{ color: provText === "#FAFAFA" ? provSurface : "#FFFFFF" }} />
                      </div>

                      {/* Title + description */}
                      <div className="text-center">
                        <h3 className="text-sm font-bold tracking-tight" style={{ color: provText === "#FAFAFA" ? "#f8fafc" : "#0f172a" }}>Design Token Sandbox</h3>
                        <p className="text-[11px] mt-1.5 leading-relaxed max-w-xs" style={{ color: provText === "#FAFAFA" ? "#cbd5e1" : "#475569" }}>
                          This card renders inside the scoped parameters of the custom provider. Colors, radius, and borders all cascade from primitive token overrides.
                        </p>
                      </div>

                      {/* Token preview chips */}
                      <div className="grid grid-cols-3 gap-2 w-full">
                        {[
                          { label: "--primary", value: provPrimary, swatch: provPrimary },
                          { label: "--surface", value: provSurface, swatch: provSurface },
                          { label: "--radius", value: `${provRadius}px`, swatch: null },
                        ].map((token) => (
                          <div
                            key={token.label}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-lg"
                            style={{
                              background: provText === "#FAFAFA" ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)",
                              border: `1px solid ${provBorder}`
                            }}
                          >
                            {token.swatch ? (
                              <div className="w-5 h-5 rounded border" style={{ backgroundColor: token.swatch, borderColor: provBorder }} />
                            ) : (
                              <div className="w-5 h-5 rounded border flex items-center justify-center text-[7px] font-bold" style={{ borderColor: provBorder, color: provText === "#FAFAFA" ? "#94a3b8" : "#64748b" }}>{token.value}</div>
                            )}
                            <span className="text-[8px] font-mono text-center leading-tight" style={{ color: provText === "#FAFAFA" ? "#94a3b8" : "#64748b" }}>{token.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 w-full justify-center">
                        <button
                          className="px-5 py-2 text-xs font-semibold shadow-md"
                          style={{
                            backgroundColor: provPrimary,
                            color: provText === "#FAFAFA" ? provSurface : "#FFFFFF",
                            borderRadius: `${Math.max(provRadius / 2, 4)}px`,
                            boxShadow: `0 2px 10px ${provPrimary}40`
                          }}
                        >
                          Primary Action
                        </button>
                        <button
                          className="px-5 py-2 text-xs font-semibold"
                          style={{
                            color: provText === "#FAFAFA" ? "#cbd5e1" : "#475569",
                            borderRadius: `${Math.max(provRadius / 2, 4)}px`,
                            background: "transparent",
                            border: `1.5px solid ${provBorder}`
                          }}
                        >
                          Secondary
                        </button>
                      </div>
                    </div>

                    {/* Component signature */}
                    <div className="text-[9px] font-mono text-center" style={{ color: provTextSecondary, opacity: 0.6 }}>
                      &lt;PrismProvider primaryColor=&quot;{provPrimary}&quot; surfaceColor=&quot;{provSurface}&quot; radius=&#123;{provRadius}&#125; /&gt;
                    </div>
                  </div>
                )}

                {/* 2. PrismDashboard Demo Preview */}
                {activeStory === "dashboard" && (
                  <div className="w-full h-auto">
                    <PrismDashboard 
                      title={dashTitle}
                      chartType={dashChartType}
                      chartMetric={dashChartMetric}
                      hideSidebar={dashHideSidebar}
                      style={{
                        "--prism-semantic-primary": provPrimary,
                        "--prism-dashboard-bg": provSurface,
                        "--prism-card-radius": `${provRadius}px`,
                        "--prism-dashboard-text": provText,
                        "--prism-dashboard-text-secondary": provTextSecondary,
                        "--prism-dashboard-border": provBorder,
                        "--prism-sidebar-bg": provText === "#FAFAFA" ? "rgba(0,0,0,0.15)" : "rgba(15,23,42,0.03)",
                        "--prism-sidebar-border": provBorder,
                        "--prism-card-bg": provText === "#FAFAFA" ? "rgba(255, 255, 255, 0.07)" : "rgba(15, 23, 42, 0.06)",
                        "--prism-card-border": provBorder,
                        "--prism-chart-primary": provPrimary,
                        "--prism-chart-accent": "#0ea5e9"
                      } as React.CSSProperties}
                    />
                  </div>
                )}

                {/* 3. KPICard Demo Preview - Full showcase with multiple cards */}
                {activeStory === "kpi" && (
                  <div className="w-full flex flex-col gap-4">
                    {/* Mini header */}
                    <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: provBorder }}>
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: provTextSecondary }}>KPI Stat Block — Live Preview</span>
                      <span className="text-[9px] px-2 py-0.5 rounded font-mono" style={{ color: provPrimary, background: `${provPrimary}18`, border: `1px solid ${provPrimary}30` }}>v2.4.1</span>
                    </div>

                    {/* 4 KPI cards in a responsive grid */}
                    <div className="grid grid-cols-2 gap-3 w-full">
                      {[
                        { label: kpiLabel, value: kpiValue, trend: kpiTrend, isUp: kpiIsUp },
                        { label: "Monthly Revenue", value: "$84,320", trend: "+18.7% ↑", isUp: true },
                        { label: "Active Sessions", value: "12,480", trend: "+4.1% ↑", isUp: true },
                        { label: "Error Rate", value: "0.08%", trend: "+0.02% ↑", isUp: false },
                      ].map((kpi, idx) => (
                        <div
                          key={idx}
                          className="p-4 flex flex-col justify-between gap-3 shadow-sm"
                          style={{
                            background: provText === "#FAFAFA" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.85)",
                            border: `1px solid ${provBorder}`,
                            borderRadius: `${provRadius}px`,
                            boxShadow: `0 1px 8px ${provText === "#FAFAFA" ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.06)"}`
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest leading-tight" style={{ color: provTextSecondary }}>{kpi.label}</span>
                            <span
                              className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                              style={{
                                color: kpi.isUp ? "#10B981" : "#EF4444",
                                background: kpi.isUp ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)"
                              }}
                            >
                              {kpi.trend}
                            </span>
                          </div>
                          <span className="text-2xl font-bold leading-none" style={{ color: provText }}>{kpi.value}</span>
                          {/* Mini sparkline */}
                          <svg className="w-full h-6" viewBox="0 0 100 24" preserveAspectRatio="none">
                            <path
                              d={idx % 2 === 0 ? "M0 20 Q25 14 50 16 T100 4" : "M0 18 Q25 20 50 12 T100 8"}
                              fill="none"
                              stroke={kpi.isUp ? "#10B981" : "#EF4444"}
                              strokeWidth="1.5"
                              opacity="0.7"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>

                    {/* Component signature */}
                    <div className="text-[9px] font-mono text-center" style={{ color: provTextSecondary, opacity: 0.6 }}>
                      &lt;KPICard label=&quot;{kpiLabel}&quot; value=&quot;{kpiValue}&quot; trend=&quot;{kpiTrend}&quot; isUp={String(kpiIsUp)} /&gt;
                    </div>
                  </div>
                )}

                {/* 4. AnalyticsChart Demo Preview - Full width, generous height */}
                {activeStory === "chart" && (
                  <div className="w-full flex flex-col gap-3">
                    {/* Chart header */}
                    <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: provBorder }}>
                      <div>
                        <span className="text-xs font-bold" style={{ color: provText }}>Analytics Trend Chart</span>
                        <span className="block text-[10px] font-normal mt-0.5" style={{ color: provTextSecondary }}>SVG vector output — {chartType} variant</span>
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-1 rounded"
                        style={{ color: chartPrimary, background: `${chartPrimary}18`, border: `1px solid ${chartPrimary}30` }}
                      >
                        {chartType}
                      </span>
                    </div>

                    {/* Axis labels row */}
                    <div className="flex justify-between text-[8px] font-mono" style={{ color: provTextSecondary, opacity: 0.7 }}>
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    </div>

                    {/* Chart area - full width, 300px tall with top/bottom padding in SVG so lines never clip */}
                    <div
                      className="w-full"
                      style={{
                        height: "300px",
                        background: provText === "#FAFAFA" ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)",
                        border: `1px solid ${provBorder}`,
                        borderRadius: `${Math.min(provRadius, 10)}px`,
                        overflow: "hidden"
                      }}
                    >
                      {chartType === "Bar" ? (
                        <div className="w-full h-full flex items-end justify-between px-6 pb-4 gap-2">
                          {[65, 48, 80, 72, 91, 58, 85, 44, 76, 88, 55, 93].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                              <div
                                style={{
                                  height: `${height}%`,
                                  backgroundColor: i % 3 === 0 ? chartPrimary : `${chartPrimary}80`,
                                  borderRadius: "3px 3px 0 0",
                                  transition: "height 0.3s ease"
                                }}
                                className="w-full"
                              />
                            </div>
                          ))}
                        </div>
                      ) : chartType === "Line" ? (
                        // All data coords stay within y=45..210 inside 260-height viewBox, so no clipping with none
                        <svg className="w-full h-full" viewBox="0 0 500 260" preserveAspectRatio="none">
                          {/* Grid lines inside the padded area */}
                          {[70, 120, 170, 220].map(y => (
                            <line key={y} x1="20" y1={y} x2="480" y2={y} stroke={provBorder} strokeWidth="1" opacity="0.5" />
                          ))}
                          {/* The data line — stays within y=30..230 so it never clips */}
                          <path
                            d="M 20 200 Q 90 160, 150 175 T 250 120 T 330 130 T 400 75 T 480 45"
                            fill="none"
                            stroke={chartPrimary}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Data point circles */}
                          {[[20,200],[150,175],[250,120],[330,130],[400,75],[480,45]].map(([x, y], i) => (
                            <g key={i}>
                              <circle cx={x} cy={y} r="6" fill={chartPrimary} opacity="0.15" />
                              <circle cx={x} cy={y} r="3.5" fill={chartPrimary} opacity="1" />
                            </g>
                          ))}
                        </svg>
                      ) : (
                        <svg className="w-full h-full" viewBox="0 0 500 260" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="sb-chart-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={chartPrimary} stopOpacity="0.40" />
                              <stop offset="100%" stopColor={chartPrimary} stopOpacity="0.02" />
                            </linearGradient>
                          </defs>
                          {/* Grid lines */}
                          {[70, 120, 170, 220].map(y => (
                            <line key={y} x1="20" y1={y} x2="480" y2={y} stroke={provBorder} strokeWidth="1" opacity="0.5" />
                          ))}
                          {/* Area fill */}
                          <path
                            d="M 20 210 Q 90 170, 150 185 T 250 130 T 330 145 T 400 85 T 480 55 L 480 240 L 20 240 Z"
                            fill="url(#sb-chart-grad)"
                          />
                          {/* Line on top */}
                          <path
                            d="M 20 210 Q 90 170, 150 185 T 250 130 T 330 145 T 400 85 T 480 55"
                            fill="none"
                            stroke={chartPrimary}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Y-axis labels */}
                    <div className="flex justify-between text-[8px] font-mono" style={{ color: provTextSecondary, opacity: 0.7 }}>
                      <span>0</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
                    </div>

                    {/* Component signature */}
                    <div className="text-[9px] font-mono text-center" style={{ color: provTextSecondary, opacity: 0.6 }}>
                      &lt;AnalyticsChart type=&quot;{chartType}&quot; color=&quot;{chartPrimary}&quot; /&gt;
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT Panel: Story Controls (Args table) */}
            <div className="xl:col-span-4 flex flex-col gap-3">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                Storybook Controls (Args)
              </span>

              <div className="bg-bg-surface/50 border border-border-subtle rounded-2xl p-5 shadow-xl flex flex-col gap-4">
                
                {/* 1. Provider controls */}
                {activeStory === "provider" && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div>
                      <label className="block text-text-secondary font-bold mb-1">Primary Color (Primitive)</label>
                      <div className="flex items-center gap-2">
                        <input type="color" value={provPrimary} onChange={(e) => setProvPrimary(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border border-white/10" />
                        <span className="font-mono text-[10px] uppercase text-text-primary">{provPrimary}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-text-secondary font-bold mb-1">Surface background (Primitive)</label>
                      <div className="flex items-center gap-2">
                        <input type="color" value={provSurface} onChange={(e) => setProvSurface(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border border-white/10" />
                        <span className="font-mono text-[10px] uppercase text-text-primary">{provSurface}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-text-secondary font-bold mb-1">Border Radius: <span className="font-mono text-text-primary font-semibold">{provRadius}px</span></label>
                      <input type="range" min="0" max="24" value={provRadius} onChange={(e) => setProvRadius(Number(e.target.value))} className="w-full accent-primary bg-bg-elevated h-1.5 rounded-lg cursor-pointer" />
                    </div>
                  </div>
                )}
                
                {/* 2. Dashboard controls */}
                {activeStory === "dashboard" && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Title (prop: title)</label>
                      <input type="text" value={dashTitle} onChange={(e) => setDashTitle(e.target.value)} className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-lg text-text-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Chart Type (prop: chartType)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Area", "Line", "Bar"].map((t) => (
                          <button key={t} onClick={() => setDashChartType(t as "Area" | "Line" | "Bar")} className={`py-1.5 rounded-lg font-semibold border ${dashChartType === t ? "bg-primary/25 border-primary text-text-primary" : "bg-bg-elevated border-border-subtle text-text-secondary hover:text-text-primary"}`}>{t}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Focus Metric (prop: chartMetric)</label>
                      <input type="text" value={dashChartMetric} onChange={(e) => setDashChartMetric(e.target.value)} className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-lg text-text-primary font-semibold focus:outline-none" />
                    </div>
                    <div className="flex items-center justify-between border-t border-border-subtle pt-3">
                      <label className="text-text-secondary font-bold">Hide Sidebar (prop: hideSidebar)</label>
                      <input type="checkbox" checked={dashHideSidebar} onChange={(e) => setDashHideSidebar(e.target.checked)} className="w-4 h-4 rounded border-border-subtle text-primary accent-primary cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* 3. KPI Card controls */}
                {activeStory === "kpi" && (
                  <div className="flex flex-col gap-4 text-xs">
                    {/* Canvas environment mini-controls */}
                    <div className="bg-bg-elevated/60 border border-border-subtle rounded-xl p-3 flex flex-col gap-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Canvas Environment</span>
                      <div className="flex items-center justify-between">
                        <label className="text-text-secondary font-semibold">Surface BG</label>
                        <div className="flex items-center gap-1.5">
                          <input type="color" value={provSurface} onChange={(e) => setProvSurface(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border border-border-subtle" />
                          <span className="font-mono text-[9px] uppercase text-text-primary">{provSurface}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-text-secondary font-semibold">Primary Color</label>
                        <div className="flex items-center gap-1.5">
                          <input type="color" value={provPrimary} onChange={(e) => setProvPrimary(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border border-border-subtle" />
                          <span className="font-mono text-[9px] uppercase text-text-primary">{provPrimary}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-text-secondary font-semibold">Radius</label>
                          <span className="font-mono text-[9px] text-text-primary">{provRadius}px</span>
                        </div>
                        <input type="range" min="0" max="24" value={provRadius} onChange={(e) => setProvRadius(Number(e.target.value))} className="w-full accent-primary bg-bg-elevated h-1.5 rounded-lg cursor-pointer" />
                      </div>
                    </div>
                    <div className="border-t border-border-subtle pt-3 flex flex-col gap-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Component Props</span>
                      <div>
                        <label className="block text-text-secondary font-bold mb-1.5">Label (prop: label)</label>
                        <input type="text" value={kpiLabel} onChange={(e) => setKpiLabel(e.target.value)} className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-lg text-text-primary focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-text-secondary font-bold mb-1.5">Value (prop: value)</label>
                        <input type="text" value={kpiValue} onChange={(e) => setKpiValue(e.target.value)} className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-lg text-text-primary focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-text-secondary font-bold mb-1.5">Trend (prop: trend)</label>
                        <input type="text" value={kpiTrend} onChange={(e) => setKpiTrend(e.target.value)} className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-lg text-text-primary focus:outline-none" />
                      </div>
                      <div className="flex items-center justify-between border-t border-border-subtle pt-3">
                        <label className="text-text-secondary font-bold">Is Upwards Trend (prop: isUp)</label>
                        <input type="checkbox" checked={kpiIsUp} onChange={(e) => setKpiIsUp(e.target.checked)} className="w-4 h-4 rounded border-border-subtle text-primary accent-primary cursor-pointer" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Chart controls */}
                {activeStory === "chart" && (
                  <div className="flex flex-col gap-4 text-xs">
                    {/* Canvas environment mini-controls */}
                    <div className="bg-bg-elevated/60 border border-border-subtle rounded-xl p-3 flex flex-col gap-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Canvas Environment</span>
                      <div className="flex items-center justify-between">
                        <label className="text-text-secondary font-semibold">Surface BG</label>
                        <div className="flex items-center gap-1.5">
                          <input type="color" value={provSurface} onChange={(e) => setProvSurface(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border border-border-subtle" />
                          <span className="font-mono text-[9px] uppercase text-text-primary">{provSurface}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-text-secondary font-semibold">Radius</label>
                          <span className="font-mono text-[9px] text-text-primary">{provRadius}px</span>
                        </div>
                        <input type="range" min="0" max="24" value={provRadius} onChange={(e) => setProvRadius(Number(e.target.value))} className="w-full accent-primary bg-bg-elevated h-1.5 rounded-lg cursor-pointer" />
                      </div>
                    </div>
                    <div className="border-t border-border-subtle pt-3 flex flex-col gap-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Component Props</span>
                      <div>
                        <label className="block text-text-secondary font-bold mb-1.5">Chart Type</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["Area", "Line", "Bar"].map((t) => (
                            <button key={t} onClick={() => setChartType(t as "Area" | "Line" | "Bar")} className={`py-1.5 rounded-lg font-semibold border ${chartType === t ? "bg-primary/25 border-primary text-text-primary" : "bg-bg-elevated border-border-subtle text-text-secondary hover:text-text-primary"}`}>{t}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-text-secondary font-bold mb-1">Stroke Primary Color</label>
                        <div className="flex items-center gap-2">
                          <input type="color" value={chartPrimary} onChange={(e) => setChartPrimary(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border border-border-subtle" />
                          <span className="font-mono text-[10px] uppercase text-text-primary">{chartPrimary}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
          {/* Documentation & Code Snip Area */}
          <div className="bg-bg-surface/50 border border-border-subtle rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
              Component Integration Spec
            </span>

            {activeStory === "provider" && (
              <div className="flex flex-col gap-4">
                <div className="text-xs text-text-secondary leading-relaxed flex flex-col gap-2">
                  <span className="font-bold text-text-primary">Import Declaration:</span>
                  <code className="bg-slate-900 p-2.5 rounded border border-border-subtle text-[#86EFAC] self-start font-mono text-[10px]">import &#123; PrismProvider &#125; from &quot;@prism/sdk-react&quot;;</code>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-text-primary flex items-center gap-1"><Code2 className="w-4 h-4 text-primary" /> Usage Code block</span>
                    <button
                      onClick={() => copyToClipboard(`import { PrismProvider } from "@prism/sdk-react";\n\nexport default function App() {\n  return (\n    <PrismProvider \n      primaryColor="${provPrimary}"\n      surfaceColor="${provSurface}"\n      radius={${provRadius}}\n    >\n      {/* embedded components inherit variables here */}\n    </PrismProvider>\n  );\n}`)}
                      className="text-primary font-bold hover:text-text-primary flex items-center gap-1 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                      Copy integration snippet
                    </button>
                  </div>
                  <div className="bg-[#0A0A0A] p-4 rounded-xl border border-border-subtle font-mono text-[10px] text-[#86EFAC] overflow-x-auto leading-relaxed">
                    <pre>{`import { PrismProvider } from "@prism/sdk-react";
 
export default function App() {
  return (
    <PrismProvider 
      primaryColor="${provPrimary}"
      surfaceColor="${provSurface}"
      radius={${provRadius}}
    >
      {/* embedded components inherit variables here */}
    </PrismProvider>
  );
}`}</pre>
                  </div>
                </div>
              </div>
            )}

            {activeStory === "dashboard" && (
              <div className="flex flex-col gap-4">
                <div className="text-xs text-text-secondary leading-relaxed flex flex-col gap-2">
                  <span className="font-bold text-text-primary">Import Declaration:</span>
                  <code className="bg-slate-900 p-2.5 rounded border border-border-subtle text-[#86EFAC] self-start font-mono text-[10px]">import &#123; PrismDashboard &#125; from &quot;@prism/sdk-react&quot;;</code>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-text-primary flex items-center gap-1"><Code2 className="w-4 h-4 text-primary" /> Usage Code block</span>
                    <button
                      onClick={() => copyToClipboard(`<PrismDashboard\n  title="${dashTitle}"\n  chartType="${dashChartType}"\n  chartMetric="${dashChartMetric}"\n  hideSidebar={${dashHideSidebar}}\n/>`)}
                      className="text-primary font-bold hover:text-text-primary flex items-center gap-1 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                      Copy integration snippet
                    </button>
                  </div>
                  <div className="bg-[#0A0A0A] p-4 rounded-xl border border-border-subtle font-mono text-[10px] text-[#86EFAC] overflow-x-auto leading-relaxed">
                    <pre>{`<PrismDashboard
  title="${dashTitle}"
  chartType="${dashChartType}"
  chartMetric="${dashChartMetric}"
  hideSidebar={${dashHideSidebar}}
/>`}</pre>
                  </div>
                </div>
              </div>
            )}

            {activeStory === "kpi" && (
              <div className="flex flex-col gap-4">
                <div className="text-xs text-text-secondary leading-relaxed flex flex-col gap-2">
                  <span className="font-bold text-text-primary">Import Declaration:</span>
                  <code className="bg-slate-900 p-2.5 rounded border border-border-subtle text-[#86EFAC] self-start font-mono text-[10px]">import &#123; KPICard &#125; from &quot;@prism/sdk-react&quot;;</code>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-text-primary flex items-center gap-1"><Code2 className="w-4 h-4 text-primary" /> Usage Code block</span>
                    <button
                      onClick={() => copyToClipboard(`<KPICard\n  label="${kpiLabel}"\n  value="${kpiValue}"\n  trend="${kpiTrend}"\n  isUp={${kpiIsUp}}\n/>`)}
                      className="text-primary font-bold hover:text-text-primary flex items-center gap-1 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                      Copy integration snippet
                    </button>
                  </div>
                  <div className="bg-[#0A0A0A] p-4 rounded-xl border border-border-subtle font-mono text-[10px] text-[#86EFAC] overflow-x-auto leading-relaxed">
                    <pre>{`<KPICard
  label="${kpiLabel}"
  value="${kpiValue}"
  trend="${kpiTrend}"
  isUp={${kpiIsUp}}
/>`}</pre>
                  </div>
                </div>
              </div>
            )}

            {activeStory === "chart" && (
              <div className="flex flex-col gap-4">
                <div className="text-xs text-text-secondary leading-relaxed flex flex-col gap-2">
                  <span className="font-bold text-text-primary">Import Declaration:</span>
                  <code className="bg-slate-900 p-2.5 rounded border border-border-subtle text-[#86EFAC] self-start font-mono text-[10px]">import &#123; AnalyticsChart &#125; from &quot;@prism/sdk-react&quot;;</code>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-text-primary flex items-center gap-1"><Code2 className="w-4 h-4 text-primary" /> Usage Code block</span>
                    <button
                      onClick={() => copyToClipboard(`<AnalyticsChart\n  type="${chartType}"\n  color="${chartPrimary}"\n/>`)}
                      className="text-primary font-bold hover:text-text-primary flex items-center gap-1 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                      Copy integration snippet
                    </button>
                  </div>
                  <div className="bg-[#0A0A0A] p-4 rounded-xl border border-border-subtle font-mono text-[10px] text-[#86EFAC] overflow-x-auto leading-relaxed">
                    <pre>{`<AnalyticsChart
  type="${chartType}"
  color="${chartPrimary}"
/>`}</pre>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>

      </div>
    </div>
  );
}
