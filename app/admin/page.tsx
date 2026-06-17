"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Users, BarChart3, CreditCard, ShieldCheck, Palette } from "lucide-react";

export default function AdminOverview() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="dashboard"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-8"
      >
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-sm text-text-secondary mt-1">Real-time overview of your Prism deployment</p>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-bg-elevated border border-border-subtle rounded px-2.5 py-1 text-xs text-text-primary">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <button className="px-4 py-1.5 border border-primary/30 rounded-lg text-xs text-primary hover:bg-primary/10 transition-all font-semibold">
              Generate Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-bg-surface/50 p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Active Tenants</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">24</div>
            <div className="flex items-center text-green-500 text-xs mt-1 font-semibold">+3 this month</div>
          </div>
          <div className="bg-bg-surface/50 p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">API Calls Today</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">4.2M</div>
            <div className="flex items-center text-green-500 text-xs mt-1 font-semibold">+12.5% vs yesterday</div>
          </div>
          <div className="bg-bg-surface/50 p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Monthly Revenue</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">$48,291</div>
            <div className="flex items-center text-green-500 text-xs mt-1 font-semibold">+23% vs last month</div>
          </div>
          <div className="bg-bg-surface/50 p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">System Health</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">99.99%</div>
            <div className="flex items-center text-green-500 text-xs mt-1 font-semibold">All systems operational</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-bg-surface/50 p-5 rounded-2xl border border-border-subtle flex flex-col items-start gap-1">
            <Palette className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-bold text-text-primary">Customize Theme</h4>
            <p className="text-xs text-text-secondary mb-4">White‑label your dashboards in minutes</p>
            <Link href="/admin/theme-playground" className="mt-auto text-xs font-semibold text-primary hover:text-text-primary transition-colors flex items-center gap-1">
              Open Playground &rarr;
            </Link>
          </div>
          <div className="bg-bg-surface/50 p-5 rounded-2xl border border-border-subtle flex flex-col items-start gap-1">
            <Users className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-bold text-text-primary">Manage Tenants</h4>
            <p className="text-xs text-text-secondary mb-4">Add, remove, or update customer accounts</p>
            <Link href="/admin/tenant-manager" className="mt-auto text-xs font-semibold text-primary hover:text-text-primary transition-colors flex items-center gap-1">
              View Tenants &rarr;
            </Link>
          </div>
          <div className="bg-bg-surface/50 p-5 rounded-2xl border border-border-subtle flex flex-col items-start gap-1">
            <BarChart3 className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-bold text-text-primary">View Usage</h4>
            <p className="text-xs text-text-secondary mb-4">Drill into API consumption and billing</p>
            <Link href="/admin/usage-telemetry" className="mt-auto text-xs font-semibold text-primary hover:text-text-primary transition-colors flex items-center gap-1">
              Open Reports &rarr;
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
