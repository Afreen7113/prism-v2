"use client";

import { motion } from "framer-motion";
import { BarChart3, Table, Filter, Calendar, FileDown, Layers, Check } from "lucide-react";
import { useState } from "react";
import RevealText from "@/components/ui/RevealText";

const legoBlocks = [
  {
    icon: BarChart3,
    title: "Charts",
    description: "Line, bar, pie & more",
    color: "text-indigo-400",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Table,
    title: "Tables",
    description: "Sortable & filterable",
    color: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Filter,
    title: "Filters",
    description: "Advanced controls",
    color: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Calendar,
    title: "Date Picker",
    description: "Time range selector",
    color: "text-fuchsia-400",
    iconBg: "bg-fuchsia-500/10 border-fuchsia-500/20",
  },
  {
    icon: FileDown,
    title: "Exports",
    description: "CSV, PDF, API",
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Layers,
    title: "KPI Cards",
    description: "Metrics at a glance",
    color: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
];

const features = [
  "Real-time & historical data",
  "Custom reports & saved views",
  "Drill-down & segmentation",
  "Alerts & anomaly detection",
];

const countries = [
  { name: "United States", pct: "48%", color: "bg-blue-500" },
  { name: "Canada", pct: "12%", color: "bg-orange-500" },
  { name: "Germany", pct: "10%", color: "bg-indigo-600" },
  { name: "Australia", pct: "8%", color: "bg-teal-500" },
  { name: "Other", pct: "22%", color: "bg-slate-500" },
];

export default function LegoSection() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base text-text-primary relative z-10 border-y border-border-subtle font-sans overflow-hidden">
      
      {/* Subtle Indigo Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-20 relative z-10">
        
        {/* Top Header & Lego Tiles */}
        <div className="flex flex-col items-center">
          <div className="text-center max-w-xl mb-12 flex flex-col items-center">
            <RevealText
              text="Build analytics like LEGO"
              tag="h2"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary leading-tight text-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-text-secondary text-sm sm:text-base mt-2 font-medium"
            >
              Composable components. Drag, drop, and embed.
            </motion.p>
          </div>

          {/* Lego grid cards */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {legoBlocks.map((block, idx) => {
              const Icon = block.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(99,102,241,0.25)", boxShadow: "0 12px 30px rgba(99,102,241,0.1)" }}
                  className="bg-bg-elevated/20 backdrop-blur-sm rounded-2xl p-5 border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-bg-elevated/40 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 border ${block.iconBg} ${block.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-white transition-colors">
                    {block.title}
                  </h3>
                  <p className="text-xs text-text-secondary font-medium leading-relaxed">
                    {block.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Two-Column Dashboard Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-border-subtle">
          
          {/* Left Column: Text & Features list */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-start">
            <div className="max-w-md">
              <RevealText
                text="Powerful dashboards out of the box"
                tag="h3"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8"
              >
                Turn raw data into actionable insights with beautiful, interactive dashboards.
              </motion.p>

              <div className="flex flex-col gap-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-3 text-[14px] sm:text-base font-semibold text-slate-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-indigo-400" strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup container */}
          <div className="col-span-1 lg:col-span-7 w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full bg-[#08090E] border border-white/5 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col sm:flex-row aspect-none sm:aspect-[1.5] min-h-[380px]"
            >
              {/* Sidebar Mockup */}
              <div className="w-full sm:w-44 border-b sm:border-b-0 sm:border-r border-white/5 bg-[#0D0F17]/40 p-4 flex flex-row sm:flex-col justify-between sm:justify-start gap-4 sm:gap-6 shrink-0">
                <div className="flex flex-col w-full">
                  {/* Brand Logo */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-6">
                    <div className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/10">
                      <span className="text-[10px] font-bold text-white">P</span>
                    </div>
                    <span className="font-bold text-sm tracking-tight text-white">Prism</span>
                  </div>

                  {/* Sidebar Menu items */}
                  <div className="hidden sm:flex flex-col gap-1 w-full">
                    {["Overview", "Dashboards", "Reports", "Events", "Users", "Funnels", "Retention", "Flows", "Exports"].map((item) => {
                      const isActive = activeTab === item;
                      return (
                        <button
                          key={item}
                          onClick={() => setActiveTab(item)}
                          className={`text-left text-xs px-2.5 py-1.5 rounded-lg transition-all ${
                            isActive
                              ? "bg-indigo-500/10 text-indigo-400 font-semibold"
                              : "text-slate-500 hover:text-slate-300 hover:bg-white/5 font-medium"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* User Info (Mobile) */}
                <div className="flex sm:hidden items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                    AW
                  </div>
                </div>
              </div>

              {/* Main Content Area Mockup */}
              <div className="flex-1 p-5 flex flex-col justify-between min-w-0 bg-[#08090E]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-slate-100">{activeTab} Overview</h4>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Date picker Mockup */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/5 bg-slate-900/60 text-[10px] font-semibold text-slate-400 cursor-pointer hover:bg-slate-800 transition-colors">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>May 1 - May 31, 2026</span>
                    </div>

                    {/* Avatars */}
                    <div className="flex -space-x-1.5 items-center">
                      <div className="w-5 h-5 rounded-full border border-[#08090E] bg-slate-700 overflow-hidden flex items-center justify-center text-[6px] font-bold text-white">
                        <span>A</span>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-[#08090E] bg-indigo-500 overflow-hidden flex items-center justify-center text-[6px] font-bold text-white">
                        <span>B</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KPIs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {[
                    { label: "Clinix", val: "$48,650", trend: "+12.5%", isUp: true },
                    { label: "DevEngine", val: "1.58M", trend: "+18.4%", isUp: true },
                    { label: "ApexWealth", val: "128.4K", trend: "+12.4%", isUp: true },
                    { label: "ShopSync", val: "3.24%", trend: "-1.1%", isUp: false },
                  ].map((card, idx) => (
                    <div key={idx} className="p-2 border border-white/5 rounded-xl bg-[#0D0F17]/30 flex flex-col justify-between">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">{card.label}</span>
                      <div className="flex items-baseline justify-between mt-1 gap-1 flex-wrap">
                        <span className="text-xs font-bold text-slate-200">{card.val}</span>
                        <span className={`text-[8px] font-bold px-1 py-0.2 rounded-full ${
                          card.isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                        }`}>
                          {card.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content Split: Chart & Countries */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 min-h-0">
                  {/* Revenue Over Time Chart */}
                  <div className="md:col-span-8 p-3 border border-white/5 rounded-xl bg-[#0D0F17]/10 flex flex-col justify-between min-h-[160px]">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                      Revenue Over Time
                    </span>
                    <div className="flex-1 flex items-end relative min-h-[100px]">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
                        <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
                        <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
                      </div>
                      
                      {/* Smooth Area Chart SVG */}
                      <svg viewBox="0 0 300 120" className="w-full h-full z-10" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="mockupGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 90 Q 30 75 60 85 T 120 40 T 180 60 T 240 45 T 300 20 L 300 120 L 0 120 Z"
                          fill="url(#mockupGrad)"
                        />
                        <path
                          d="M 0 90 Q 30 75 60 85 T 120 40 T 180 60 T 240 45 T 300 20"
                          fill="none"
                          stroke="#6366F1"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    {/* Chart X-axis */}
                    <div className="flex justify-between items-center text-[7px] text-slate-500 font-semibold mt-1">
                      <span>May 1</span>
                      <span>May 8</span>
                      <span>May 15</span>
                      <span>May 22</span>
                      <span>May 29</span>
                    </div>
                  </div>

                  {/* Top Countries side list */}
                  <div className="md:col-span-4 p-3 border border-white/5 rounded-xl bg-[#0D0F17]/10 flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-2">
                      Top Countries
                    </span>
                    <div className="flex flex-col gap-2.5 flex-1 justify-center">
                      {countries.map((c, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-300">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${c.color}`} />
                              <span>{c.name}</span>
                            </div>
                            <span className="text-slate-500">{c.pct}</span>
                          </div>
                          {/* Mini Progress bar */}
                          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${c.color}`}
                              style={{ width: c.pct }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
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
