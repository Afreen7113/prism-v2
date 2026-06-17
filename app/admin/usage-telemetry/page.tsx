"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function UsageTelemetry() {
  const [selectedTier, setSelectedTier] = useState<"developer" | "growth" | "enterprise">("growth");
  const billingConfig = {
    developer: { price: "$0", limit: "50,000 requests/mo", features: ["Standard charts", "Standard support", "CSS Customization"], capPct: 25.8 },
    growth: { price: "$149/mo", limit: "1,000,000 requests/mo", features: ["Advanced visualizer", "Priority response support", "Multi-tenant white-label variables", "Interactive theme dashboard"], capPct: 83.7 },
    enterprise: { price: "Custom Pricing", limit: "Unlimited requests", features: ["Dedicated servers", "SLA guarantees", "Custom analytics pipelines", "24/7 Phone Support"], capPct: 42.1 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="billing"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
      >
        <div className="lg:col-span-12">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Usage Billing & API Telemetry</h1>
          <p className="text-sm text-text-secondary mt-1">
            Monitor tenant-wide request volumes, gateway query loads, active rates, and simulate billing configurations.
          </p>
        </div>

        {/* Billing Simulator Card */}
        <div className="lg:col-span-5 bg-bg-surface/50 border border-border-subtle p-6 rounded-[24px] shadow-xl flex flex-col gap-6">
          <div>
            <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">
              Interactive Billing Plan Configurator
            </span>
            <div className="flex gap-1.5 p-1 rounded-xl bg-bg-elevated border border-border-subtle">
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
          <div className="bg-bg-elevated/40 rounded-xl border border-border-subtle p-4 flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-text-secondary uppercase font-bold tracking-wide">Monthly Price</span>
              <span className="text-2xl font-bold text-primary">{billingConfig[selectedTier].price}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-border-subtle/50 pb-2">
              <span className="text-xs text-text-secondary uppercase font-bold tracking-wide">Usage Limit</span>
              <span className="text-sm font-semibold text-text-primary">{billingConfig[selectedTier].limit}</span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Plan Features Included:</span>
              {billingConfig[selectedTier].features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                  <span className="text-text-primary">{f}</span>
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
            <div className="w-full bg-bg-elevated border border-border-subtle h-2 rounded-full overflow-hidden">
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
        <div className="lg:col-span-7 bg-bg-surface/50 border border-border-subtle p-6 rounded-[24px] shadow-xl flex flex-col gap-6">
          <div>
            <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
              Aggregate API Gateway Requests
            </span>
            <span className="text-xs text-text-secondary">Telemetries for all active API Keys (Past 24h)</span>
          </div>

          {/* SVG Telemetry analytics */}
          <div className="h-56 relative w-full border border-border-subtle bg-bg-elevated/20 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex-1 w-full relative pt-2">
              <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="telemetry-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="37" x2="500" y2="37" stroke="var(--prism-site-border)" strokeWidth="0.5" opacity="0.15" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="var(--prism-site-border)" strokeWidth="0.5" opacity="0.15" />
                <line x1="0" y1="112" x2="500" y2="112" stroke="var(--prism-site-border)" strokeWidth="0.5" opacity="0.15" />

                {/* Request area fill */}
                <path
                  d="M 0 130 C 50 110, 100 80, 150 100 C 200 120, 250 50, 300 40 C 350 30, 400 90, 450 60 L 500 50 L 500 150 L 0 150 Z"
                  fill="url(#telemetry-grad)"
                />
                {/* Request line path */}
                <path
                  d="M 0 130 C 50 110, 100 80, 150 100 C 200 120, 250 50, 300 40 C 350 30, 400 90, 450 60 L 500 50"
                  fill="none"
                  stroke="var(--prism-semantic-primary)"
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
            <div className="bg-bg-elevated/40 rounded-xl border border-border-subtle p-3 text-center">
              <span className="block text-[8px] text-text-muted uppercase font-bold tracking-wider mb-1">Total Hits</span>
              <span className="text-base font-bold text-text-primary">1.68M</span>
            </div>
            <div className="bg-bg-elevated/40 rounded-xl border border-border-subtle p-3 text-center">
              <span className="block text-[8px] text-text-muted uppercase font-bold tracking-wider mb-1">Avg Latency</span>
              <span className="text-base font-bold text-text-primary">14.2ms</span>
            </div>
            <div className="bg-bg-elevated/40 rounded-xl border border-border-subtle p-3 text-center">
              <span className="block text-[8px] text-text-muted uppercase font-bold tracking-wider mb-1">Uptime</span>
              <span className="text-base font-bold text-success">99.98%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
