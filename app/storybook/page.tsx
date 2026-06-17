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
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col relative font-sans overflow-x-hidden text-left">
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
            Prism <span className="text-pink-500 font-bold text-xs uppercase bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 flex items-center gap-1"><BookOpen className="w-3 h-3" /> Storybook v7.4</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-xs text-text-secondary hover:text-text-primary transition-all">
            ← Back to Admin Portal
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10">
        
        {/* Storybook Navigation Sidebar */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border-subtle bg-[#08090E]/90 p-5 flex flex-col gap-1 shrink-0">
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
                    ? "bg-pink-500/10 text-pink-500 border-pink-500/20 shadow-[0_0_12px_rgba(236,72,153,0.05)]"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5 border-transparent"
                }`}
              >
                <span className="text-xs font-bold">{story.label}</span>
                <span className="text-[9px] opacity-75">{story.desc}</span>
              </button>
            );
          })}

          <div className="mt-8 pt-6 border-t border-white/5 px-3 hidden lg:flex flex-col gap-2">
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

        {/* Storybook Content Panel */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full flex flex-col gap-8">
          
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
                className="bg-bg-surface/50 border border-white/5 rounded-2xl p-6 min-h-[360px] flex items-center justify-center relative overflow-hidden"
                style={{
                  "--prism-semantic-primary": provPrimary,
                  "--prism-site-surface": provSurface,
                  "--prism-card-radius": `${provRadius}px`
                } as React.CSSProperties}
              >
                {/* 1. PrismProvider Demo Preview */}
                {activeStory === "provider" && (
                  <div className="flex flex-col gap-4 max-w-md w-full text-center items-center justify-center p-6 bg-[var(--prism-site-surface)] border border-white/10" style={{ borderRadius: "var(--prism-card-radius)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: provPrimary }}>
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Design Token Sandbox</h3>
                      <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                        This block renders inside the scoped parameters of the custom provider. Its colors and border radii inherit values from custom primitive variables.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-xs font-semibold text-white bg-[var(--prism-semantic-primary)]" style={{ borderRadius: `${provRadius/2}px` }}>Primary Action</button>
                      <button className="px-4 py-2 text-xs font-semibold text-text-secondary border border-white/10" style={{ borderRadius: `${provRadius/2}px` }}>Cancel</button>
                    </div>
                  </div>
                )}

                {/* 2. PrismDashboard Demo Preview */}
                {activeStory === "dashboard" && (
                  <div className="w-full">
                    <PrismDashboard 
                      title={dashTitle}
                      chartType={dashChartType}
                      chartMetric={dashChartMetric}
                      hideSidebar={dashHideSidebar}
                    />
                  </div>
                )}

                {/* 3. KPICard Demo Preview */}
                {activeStory === "kpi" && (
                  <div 
                    className="border border-[var(--prism-card-border)] bg-[var(--prism-card-bg)] p-4 flex flex-col justify-between h-24 shadow-lg w-52"
                    style={{ borderRadius: "var(--prism-card-radius)", borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}
                  >
                    <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wide">{kpiLabel}</span>
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-lg font-bold leading-none text-white">{kpiValue}</span>
                      <span
                        style={{ color: kpiIsUp ? "#10B981" : "#EF4444" }}
                        className="text-[10px] font-bold"
                      >
                        {kpiTrend}
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. AnalyticsChart Demo Preview */}
                {activeStory === "chart" && (
                  <div 
                    className="border border-white/5 bg-white/[0.02] p-5 h-44 flex flex-col justify-between shadow-lg w-full max-w-md"
                    style={{ borderRadius: "12px" }}
                  >
                    <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wide block">
                      SVG Chart vector output
                    </span>
                    <div className="flex-1 w-full relative pt-4">
                      {chartType === "Bar" ? (
                        <div className="w-full h-full flex items-end justify-between px-2 gap-2">
                          {[40, 75, 55, 90, 65, 85].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                              <div
                                style={{
                                  height: `${height}%`,
                                  backgroundColor: chartPrimary,
                                  opacity: 0.9,
                                  borderRadius: "2px 2px 0 0",
                                }}
                                className="w-full min-h-[4px]"
                              />
                            </div>
                          ))}
                        </div>
                      ) : chartType === "Line" ? (
                        <svg className="w-full h-full" viewBox="0 0 500 130" preserveAspectRatio="none">
                          <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                          <line x1="0" y1="70" x2="500" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                          <line x1="0" y1="110" x2="500" y2="110" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                          <path
                            d="M 0 110 Q 70 80, 140 95 T 280 40 T 420 50 T 500 15"
                            fill="none"
                            stroke={chartPrimary}
                            strokeWidth="2.5"
                          />
                        </svg>
                      ) : (
                        <svg className="w-full h-full" viewBox="0 0 500 130" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="sb-chart-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={chartPrimary} stopOpacity="0.3" />
                              <stop offset="100%" stopColor={chartPrimary} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 110 Q 70 80, 140 95 T 280 40 T 420 50 T 500 15 L 500 130 L 0 130 Z"
                            fill="url(#sb-chart-grad)"
                          />
                          <path
                            d="M 0 110 Q 70 80, 140 95 T 280 40 T 420 50 T 500 15"
                            fill="none"
                            stroke={chartPrimary}
                            strokeWidth="2.5"
                          />
                        </svg>
                      )}
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

              <div className="bg-bg-surface/50 border border-white/5 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
                
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
                      <input type="range" min="0" max="24" value={provRadius} onChange={(e) => setProvRadius(Number(e.target.value))} className="w-full accent-pink-500 bg-white/10 h-1.5 rounded-lg cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* 2. Dashboard controls */}
                {activeStory === "dashboard" && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Title (prop: title)</label>
                      <input type="text" value={dashTitle} onChange={(e) => setDashTitle(e.target.value)} className="w-full bg-[#0D0F17] border border-white/10 p-2.5 rounded-lg text-white" />
                    </div>
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Chart Type (prop: chartType)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Area", "Line", "Bar"].map((t) => (
                          <button key={t} onClick={() => setDashChartType(t as "Area" | "Line" | "Bar")} className={`py-1.5 rounded-lg font-semibold border ${dashChartType === t ? "bg-pink-500/25 border-pink-500 text-white" : "bg-white/5 border-white/5 text-text-secondary"}`}>{t}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Focus Metric (prop: chartMetric)</label>
                      <input type="text" value={dashChartMetric} onChange={(e) => setDashChartMetric(e.target.value)} className="w-full bg-[#0D0F17] border border-white/10 p-2.5 rounded-lg text-white font-semibold" />
                    </div>
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <label className="text-text-secondary font-bold">Hide Sidebar (prop: hideSidebar)</label>
                      <input type="checkbox" checked={dashHideSidebar} onChange={(e) => setDashHideSidebar(e.target.checked)} className="w-4 h-4 rounded border-white/10 text-pink-500 accent-pink-500 cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* 3. KPI Card controls */}
                {activeStory === "kpi" && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Label (prop: label)</label>
                      <input type="text" value={kpiLabel} onChange={(e) => setKpiLabel(e.target.value)} className="w-full bg-[#0D0F17] border border-white/10 p-2.5 rounded-lg text-white" />
                    </div>
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Value (prop: value)</label>
                      <input type="text" value={kpiValue} onChange={(e) => setKpiValue(e.target.value)} className="w-full bg-[#0D0F17] border border-white/10 p-2.5 rounded-lg text-white" />
                    </div>
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Trend (prop: trend)</label>
                      <input type="text" value={kpiTrend} onChange={(e) => setKpiTrend(e.target.value)} className="w-full bg-[#0D0F17] border border-white/10 p-2.5 rounded-lg text-white" />
                    </div>
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <label className="text-text-secondary font-bold">Is Upwards Trend (prop: isUp)</label>
                      <input type="checkbox" checked={kpiIsUp} onChange={(e) => setKpiIsUp(e.target.checked)} className="w-4 h-4 rounded border-white/10 text-pink-500 accent-pink-500 cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* 4. Chart controls */}
                {activeStory === "chart" && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div>
                      <label className="block text-text-secondary font-bold mb-1.5">Chart Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Area", "Line", "Bar"].map((t) => (
                          <button key={t} onClick={() => setChartType(t as "Area" | "Line" | "Bar")} className={`py-1.5 rounded-lg font-semibold border ${chartType === t ? "bg-pink-500/25 border-pink-500 text-white" : "bg-white/5 border-white/5 text-text-secondary"}`}>{t}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-text-secondary font-bold mb-1">Stroke Primary Color</label>
                      <div className="flex items-center gap-2">
                        <input type="color" value={chartPrimary} onChange={(e) => setChartPrimary(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border border-white/10" />
                        <span className="font-mono text-[10px] uppercase text-text-primary">{chartPrimary}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Documentation & Code Snip Area */}
          <div className="bg-bg-surface/50 border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
              Component Integration Spec
            </span>

            {activeStory === "provider" && (
              <div className="flex flex-col gap-4">
                <div className="text-xs text-text-secondary leading-relaxed flex flex-col gap-2">
                  <span className="font-bold text-white">Import Declaration:</span>
                  <code className="bg-black/40 p-2.5 rounded border border-white/5 text-[#86EFAC] self-start font-mono text-[10px]">import &#123; PrismProvider &#125; from &quot;@prism/sdk-react&quot;;</code>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-white flex items-center gap-1"><Code2 className="w-4 h-4 text-pink-500" /> Usage Code block</span>
                    <button
                      onClick={() => copyToClipboard(`import { PrismProvider } from "@prism/sdk-react";\n\nexport default function App() {\n  return (\n    <PrismProvider \n      primaryColor="${provPrimary}"\n      surfaceColor="${provSurface}"\n      radius={${provRadius}}\n    >\n      {/* embedded components inherit variables here */}\n    </PrismProvider>\n  );\n}`)}
                      className="text-pink-500 font-bold hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                      Copy integration snippet
                    </button>
                  </div>
                  <div className="bg-black/90 p-4 rounded-xl border border-white/5 font-mono text-[10px] text-[#86EFAC] overflow-x-auto leading-relaxed">
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
                  <span className="font-bold text-white">Import Declaration:</span>
                  <code className="bg-black/40 p-2.5 rounded border border-white/5 text-[#86EFAC] self-start font-mono text-[10px]">import &#123; PrismDashboard &#125; from &quot;@prism/sdk-react&quot;;</code>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-white flex items-center gap-1"><Code2 className="w-4 h-4 text-pink-500" /> Usage Code block</span>
                    <button
                      onClick={() => copyToClipboard(`<PrismDashboard\n  title="${dashTitle}"\n  chartType="${dashChartType}"\n  chartMetric="${dashChartMetric}"\n  hideSidebar={${dashHideSidebar}}\n/>`)}
                      className="text-pink-500 font-bold hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                      Copy integration snippet
                    </button>
                  </div>
                  <div className="bg-black/90 p-4 rounded-xl border border-white/5 font-mono text-[10px] text-[#86EFAC] overflow-x-auto leading-relaxed">
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
                  <span className="font-bold text-white">Import Declaration:</span>
                  <code className="bg-black/40 p-2.5 rounded border border-white/5 text-[#86EFAC] self-start font-mono text-[10px]">import &#123; KPICard &#125; from &quot;@prism/sdk-react&quot;;</code>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-white flex items-center gap-1"><Code2 className="w-4 h-4 text-pink-500" /> Usage Code block</span>
                    <button
                      onClick={() => copyToClipboard(`<KPICard\n  label="${kpiLabel}"\n  value="${kpiValue}"\n  trend="${kpiTrend}"\n  isUp={${kpiIsUp}}\n/>`)}
                      className="text-pink-500 font-bold hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                      Copy integration snippet
                    </button>
                  </div>
                  <div className="bg-black/90 p-4 rounded-xl border border-white/5 font-mono text-[10px] text-[#86EFAC] overflow-x-auto leading-relaxed">
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
                  <span className="font-bold text-white">Import Declaration:</span>
                  <code className="bg-black/40 p-2.5 rounded border border-white/5 text-[#86EFAC] self-start font-mono text-[10px]">import &#123; AnalyticsChart &#125; from &quot;@prism/sdk-react&quot;;</code>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-white flex items-center gap-1"><Code2 className="w-4 h-4 text-pink-500" /> Usage Code block</span>
                    <button
                      onClick={() => copyToClipboard(`<AnalyticsChart\n  type="${chartType}"\n  color="${chartPrimary}"\n/>`)}
                      className="text-pink-500 font-bold hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                      Copy integration snippet
                    </button>
                  </div>
                  <div className="bg-black/90 p-4 rounded-xl border border-white/5 font-mono text-[10px] text-[#86EFAC] overflow-x-auto leading-relaxed">
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
