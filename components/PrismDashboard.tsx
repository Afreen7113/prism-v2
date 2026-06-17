"use client";

import React from "react";
import { LayoutDashboard, Users, CreditCard, Settings, Sparkles } from "lucide-react";

interface PrismDashboardProps {
  themeClass?: string;
  style?: React.CSSProperties;
  hideSidebar?: boolean;
  title?: string;
  chartType?: "Area" | "Line" | "Bar" | "Donut";
  chartMetric?: string;
  customData?: { label: string; value: string; trend: string; isUp: boolean }[];
}

export default function PrismDashboard({
  themeClass = "",
  style = {},
  hideSidebar = false,
  title = "Platform Analytics",
  chartType = "Area",
  chartMetric = "User Engagements",
  customData,
}: PrismDashboardProps) {
  const kpis = customData || [
    { label: "Revenue", value: "$24,580", trend: "+12.5% ↑", isUp: true },
    { label: "Active Users", value: "1,847", trend: "+8.2% ↑", isUp: true },
    { label: "Conversion", value: "3.4%", trend: "-0.5% ↓", isUp: false },
  ];

  return (
    <div
      className={`text-left flex flex-row flex-1 h-full min-h-[520px] bg-[var(--prism-dashboard-bg)] text-[var(--prism-dashboard-text)] transition-all duration-300 ${themeClass}`}
      style={{
        fontFamily: "var(--prism-semantic-font), var(--font-geist), sans-serif",
        borderRadius: "var(--prism-card-radius)",
        ...style,
      }}
    >
      {/* Dashboard Sidebar */}
      {!hideSidebar && (
        <div
          className="hidden md:flex flex-col gap-6 p-4 border-r border-[var(--prism-sidebar-border)] bg-[var(--prism-sidebar-bg)] w-44 shrink-0 text-[11px] transition-all duration-300"
          style={{
            borderTopLeftRadius: "var(--prism-card-radius)",
            borderBottomLeftRadius: "var(--prism-card-radius)",
          }}
        >
          <div className="flex items-center gap-2 font-bold mb-2">
            <svg viewBox="0 0 100 100" className="w-4 h-4 transition-colors duration-300">
              <path d="M50 15 L20 75 L50 85 Z" fill="var(--prism-chart-primary)" />
              <path d="M50 15 L50 85 L85 75 Z" fill="var(--prism-chart-accent)" />
            </svg>
            <span className="font-semibold tracking-tight">Prism Engine</span>
          </div>
          <div className="flex flex-col gap-1.5 opacity-90">
            <span
              style={{
                backgroundColor: "rgba(100,116,139,0.08)",
                color: "var(--prism-semantic-primary)",
              }}
              className="px-2.5 py-1.5 rounded font-semibold transition-colors duration-300 flex items-center gap-2"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Overview
            </span>
            <span className="px-2.5 py-1.5 rounded hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-2 opacity-60 hover:opacity-100">
              <Users className="w-3.5 h-3.5" />
              Tenants
            </span>
            <span className="px-2.5 py-1.5 rounded hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-2 opacity-60 hover:opacity-100">
              <CreditCard className="w-3.5 h-3.5" />
              Billing
            </span>
            <span className="px-2.5 py-1.5 rounded hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-2 opacity-60 hover:opacity-100">
              <Settings className="w-3.5 h-3.5" />
              Settings
            </span>
          </div>
          <div className="mt-auto opacity-40 text-[9px] font-mono flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[var(--prism-semantic-primary)]" />
            v2.5.0
          </div>
        </div>
      )}

      {/* Dashboard Main Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between overflow-hidden h-full gap-4">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            {hideSidebar && (
              <svg viewBox="0 0 100 100" className="w-4 h-4 transition-colors duration-300 mr-1">
                <path d="M50 15 L20 75 L50 85 Z" fill="var(--prism-chart-primary)" />
                <path d="M50 15 L50 85 L85 75 Z" fill="var(--prism-chart-accent)" />
              </svg>
            )}
            <span className="font-bold text-sm sm:text-base tracking-tight">{title}</span>
          </div>
          <span className="text-[9px] opacity-60 uppercase font-mono tracking-wider">Live Telemetry</span>
        </div>

        {/* 3 KPI cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
          {kpis.map((kpi, i) => (
            <div
              key={i}
              className="border border-[var(--prism-card-border)] bg-[var(--prism-card-bg)] p-3 flex flex-col justify-between h-20 shadow-sm transition-all duration-300"
              style={{ borderRadius: "var(--prism-card-radius)" }}
            >
              <span className="text-[9px] opacity-50 uppercase font-semibold tracking-wide">{kpi.label}</span>
              <div className="flex justify-between items-end mt-1">
                <span className="text-base sm:text-lg font-bold leading-none">{kpi.value}</span>
                <span
                  style={{ color: kpi.isUp ? "var(--prism-chart-primary)" : "var(--prism-chart-accent)" }}
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
          className="border border-[var(--prism-card-border)] bg-[var(--prism-card-bg)] p-4 h-[160px] sm:h-[180px] flex flex-col justify-between shadow-sm transition-all duration-300 flex-1 min-h-[140px]"
          style={{ borderRadius: "var(--prism-card-radius)" }}
        >
          <span className="text-[9px] opacity-50 uppercase font-semibold tracking-wide shrink-0">
            {chartMetric} (Monthly View)
          </span>

          {/* SVG Chart rendering based on type */}
          <div className="flex-1 w-full relative pt-2 min-h-0">
            {chartType === "Bar" ? (
              <div className="w-full h-full flex items-end justify-between px-2 pt-2 gap-2">
                {[40, 75, 55, 90, 65, 85, 100, 60, 80, 45, 95, 70].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      style={{
                        height: `${height}%`,
                        backgroundColor: i % 2 === 0 ? "var(--prism-chart-primary)" : "var(--prism-chart-accent)",
                        opacity: 0.85,
                        borderRadius: "2px 2px 0 0",
                      }}
                      className="w-full min-h-[4px] hover:opacity-100 transition-all duration-200"
                    />
                  </div>
                ))}
              </div>
            ) : chartType === "Line" ? (
              <svg className="w-full h-full" viewBox="0 0 500 130" preserveAspectRatio="none">
                <line x1="0" y1="30" x2="500" y2="30" stroke="var(--prism-dashboard-border)" strokeWidth="0.5" opacity="0.15" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="var(--prism-dashboard-border)" strokeWidth="0.5" opacity="0.15" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="var(--prism-dashboard-border)" strokeWidth="0.5" opacity="0.15" />
                <path
                  d="M 0 110 Q 70 80, 140 95 T 280 40 T 420 50 T 500 15"
                  fill="none"
                  stroke="var(--prism-chart-primary)"
                  strokeWidth="2.5"
                />
                <circle cx="280" cy="40" r="4" fill="var(--prism-chart-accent)" />
              </svg>
            ) : (
              // Default Area Chart
              <svg className="w-full h-full" viewBox="0 0 500 130" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="prism-dashboard-chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--prism-chart-primary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--prism-chart-primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="500" y2="30" stroke="var(--prism-dashboard-border)" strokeWidth="0.5" opacity="0.15" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="var(--prism-dashboard-border)" strokeWidth="0.5" opacity="0.15" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="var(--prism-dashboard-border)" strokeWidth="0.5" opacity="0.15" />
                
                {/* Area Fill */}
                <path
                  d="M 0 110 Q 70 80, 140 95 T 280 40 T 420 50 T 500 15 L 500 130 L 0 130 Z"
                  fill="url(#prism-dashboard-chart-grad)"
                />
                
                {/* Path Line */}
                <path
                  d="M 0 110 Q 70 80, 140 95 T 280 40 T 420 50 T 500 15"
                  fill="none"
                  stroke="var(--prism-chart-primary)"
                  strokeWidth="2.5"
                />
              </svg>
            )}
          </div>
          
          {/* Chart labels */}
          <div className="flex justify-between text-[8px] opacity-40 uppercase font-mono mt-1 shrink-0">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>
        </div>

        {/* Lower Grid: Table + Donut */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
          {/* Table */}
          <div className="overflow-hidden flex flex-col gap-2">
            <span className="text-[9px] opacity-50 uppercase font-semibold tracking-wide">Recent Inflow</span>
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-[var(--prism-card-bg)] text-[var(--prism-dashboard-text)] border-b border-[var(--prism-card-border)]">
                  <th className="py-1.5 px-2 font-semibold text-left opacity-75">Customer</th>
                  <th className="py-1.5 px-2 font-semibold text-left opacity-75">Volume</th>
                  <th className="py-1.5 px-2 text-right font-semibold opacity-75">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Acme Corp", vol: "$12,480", status: "Active" },
                  { name: "Vercel Inc", vol: "$9,204", status: "Active" },
                  { name: "Stripe", vol: "$8,492", status: "Pending" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[var(--prism-card-border)]/50 last:border-b-0">
                    <td className="py-1.5 px-2 font-medium opacity-85">{row.name}</td>
                    <td className="py-1.5 px-2 opacity-80 font-mono">{row.vol}</td>
                    <td className="py-1.5 px-2 text-right">
                      <span className="font-semibold text-[var(--prism-semantic-primary)]">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Traffic Source Donut */}
          <div
            className="border border-[var(--prism-card-border)] bg-[var(--prism-card-bg)] p-3 flex flex-col justify-between shadow-sm transition-all duration-300"
            style={{ borderRadius: "var(--prism-card-radius)" }}
          >
            <span className="text-[9px] opacity-50 uppercase font-semibold tracking-wide mb-1 block">Traffic Breakdown</span>
            <div className="flex items-center gap-4 flex-1 justify-center sm:justify-start">
              {/* Radial Progress Ring */}
              <div className="relative w-12 h-12 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-500/10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Direct Traffic (60%) */}
                  <path
                    stroke="var(--prism-chart-primary)"
                    strokeWidth="3.5"
                    strokeDasharray="60, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Referral Traffic (25%) */}
                  <path
                    stroke="var(--prism-chart-accent)"
                    strokeWidth="3.5"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-60"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
                  85%
                </div>
              </div>
              <div className="flex flex-col gap-0.5 text-[8.5px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--prism-chart-primary)" }} />
                  <span className="opacity-80">Direct: 60%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--prism-chart-accent)" }} />
                  <span className="opacity-80">Referral: 25%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500/25" />
                  <span className="opacity-60">Organic: 15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button Row */}
        <div className="flex gap-3 mt-1 shrink-0">
          <button
            style={{
              backgroundColor: "var(--prism-button-bg)",
              color: "var(--prism-button-text)",
              borderRadius: "var(--prism-button-radius)",
            }}
            className="flex-1 py-2 text-xs font-semibold shadow-md active:scale-[0.98] transition-all duration-150 focus:outline-none text-center justify-center flex items-center hover:brightness-110"
          >
            Export Report
          </button>
          <button
            style={{
              borderColor: "var(--prism-chart-primary)",
              color: "var(--prism-chart-primary)",
              borderRadius: "var(--prism-button-radius)",
            }}
            className="flex-1 py-2 text-xs font-semibold border bg-transparent active:scale-[0.98] transition-all duration-150 focus:outline-none text-center justify-center flex items-center hover:bg-[var(--prism-chart-primary)]/5"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
