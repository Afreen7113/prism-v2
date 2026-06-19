"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, CreditCard, ShieldCheck, Palette, 
  Activity, ArrowUpRight, ArrowDownRight, Server, Clock, AlertTriangle, Zap
} from "lucide-react";
import { ResponsiveContainer, YAxis, Tooltip, Area, AreaChart } from "recharts";
import { Button } from "@/components/ui/Button";

const revenueData = Array.from({ length: 30 }, (_, i) => ({ day: i, value: 30000 + Math.random() * 10000 + i * 500 }));
const usageData = Array.from({ length: 30 }, (_, i) => ({ day: i, value: 1000000 + Math.random() * 200000 + (Math.sin(i / 3) * 300000) }));

export default function AdminOverview() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="dashboard"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-8 pb-12"
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-sm text-text-secondary mt-1">Real-time overview of your Prism deployment</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-bg-base border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <Button>
              Generate Report
            </Button>
          </div>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-bg-surface p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Revenue</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">$48,291</div>
            <div className="flex items-center text-status-success text-xs mt-1 font-semibold"><ArrowUpRight className="w-3 h-3 mr-0.5"/> 23% vs last month</div>
          </div>
          
          <div className="bg-bg-surface p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">API Requests</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">4.2M</div>
            <div className="flex items-center text-status-success text-xs mt-1 font-semibold"><ArrowUpRight className="w-3 h-3 mr-0.5"/> 12.5% vs yesterday</div>
          </div>

          <div className="bg-bg-surface p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Active Tenants</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">24</div>
            <div className="flex items-center text-status-success text-xs mt-1 font-semibold"><ArrowUpRight className="w-3 h-3 mr-0.5"/> 3 this month</div>
          </div>

          <div className="bg-bg-surface p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-status-warning" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Error Rate</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">0.12%</div>
            <div className="flex items-center text-status-success text-xs mt-1 font-semibold"><ArrowDownRight className="w-3 h-3 mr-0.5"/> 0.05% vs yesterday</div>
          </div>

          <div className="bg-bg-surface p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-status-success" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Uptime</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">99.99%</div>
            <div className="flex items-center text-status-success text-xs mt-1 font-semibold">All systems operational</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
            <h3 className="text-sm font-bold text-text-primary mb-6">Revenue Trend</h3>
            <div className="h-64 w-full min-w-0">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-subtle)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--color-text-primary)' }}
                      formatter={(value: unknown) => ['$' + (Number(value) || 0).toFixed(0), 'Revenue']}
                    />
                    <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Usage Trend */}
          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
            <h3 className="text-sm font-bold text-text-primary mb-6">API Usage Trend</h3>
            <div className="h-64 w-full min-w-0">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}>
                    <defs>
                      <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <YAxis hide domain={['dataMin', 'dataMax + 200000']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-subtle)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--color-text-primary)' }}
                      formatter={(value: unknown) => [((Number(value) || 0)/1000000).toFixed(2) + 'M', 'Requests']}
                    />
                    <Area type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorUsage)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row: Activity Feed & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Activity Feed */}
          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-text-primary">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-6">
              {[
                { icon: Users, color: "text-brand", bg: "bg-brand/10", title: "New tenant onboarded", desc: "Acme Corp completed integration.", time: "10 mins ago" },
                { icon: Zap, color: "text-status-warning", bg: "bg-status-warning/10", title: "API rate limit reached", desc: "Globex Inc hit 10k req/min limit.", time: "1 hour ago" },
                { icon: Server, color: "text-status-success", bg: "bg-status-success/10", title: "Database cluster scaled", desc: "Automatically added 2 read replicas.", time: "3 hours ago" },
                { icon: Palette, color: "text-accent", bg: "bg-accent/10", title: "Theme published", desc: "System theme updated by Admin.", time: "5 hours ago" },
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.bg} ${act.color}`}>
                    <act.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-text-primary">{act.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{act.desc}</p>
                  </div>
                  <div className="text-[10px] font-bold text-text-muted flex items-center gap-1 shrink-0 h-fit mt-1">
                    <Clock className="w-3 h-3" /> {act.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text-primary mb-2 px-1">Quick Actions</h3>
            
            <Link href="/admin/theme-playground" className="block bg-bg-surface p-4 rounded-2xl border border-border-subtle hover:border-brand/50 hover:bg-bg-elevated transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/10 text-brand rounded-lg"><Palette className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary group-hover:text-brand transition-colors">Customize Theme</h4>
                  <p className="text-xs text-text-secondary mt-0.5">White-label your dashboards</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/api-keys" className="block bg-bg-surface p-4 rounded-2xl border border-border-subtle hover:border-brand/50 hover:bg-bg-elevated transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/10 text-brand rounded-lg"><Zap className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary group-hover:text-brand transition-colors">Generate API Key</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Create keys for new integrations</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/tenant-manager" className="block bg-bg-surface p-4 rounded-2xl border border-border-subtle hover:border-brand/50 hover:bg-bg-elevated transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/10 text-brand rounded-lg"><Users className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary group-hover:text-brand transition-colors">Manage Tenants</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Add or review customer accounts</p>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
