"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers, TrendingUp, TrendingDown, Users, DollarSign,
  Activity, Zap, Eye, BarChart3, RefreshCw, Settings,
  ArrowUpRight, ArrowDownRight, Globe, ShoppingCart, Star
} from "lucide-react";
import Link from "next/link";

type Timeframe = "1h" | "24h" | "7d" | "30d" | "90d";

interface KPI {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  sparkline: number[];
  prefix?: string;
  suffix?: string;
}

const TIMEFRAMES: Timeframe[] = ["1h", "24h", "7d", "30d", "90d"];

const buildSparkline = (base: number, volatility: number, len = 12) =>
  Array.from({ length: len }, (_, i) => {
    const trend = i / len;
    return Math.max(0, base + trend * base * 0.3 + (Math.random() - 0.5) * volatility);
  });

const generateKPIs = (tf: Timeframe): KPI[] => {
  const mult = tf === "1h" ? 0.04 : tf === "24h" ? 1 : tf === "7d" ? 7 : tf === "30d" ? 30 : 90;
  return [
    {
      id: "mrr",
      label: "Monthly Recurring Revenue",
      value: `$${(124_500 * (1 + (mult - 1) * 0.002)).toLocaleString("en", { maximumFractionDigits: 0 })}`,
      change: 12.4,
      changeLabel: `vs prev ${tf}`,
      icon: DollarSign,
      iconColor: "text-success",
      iconBg: "bg-success/10 border-success/20",
      sparkline: buildSparkline(100, 20),
      prefix: "$",
    },
    {
      id: "users",
      label: "Active Users",
      value: `${Math.round(48_291 * (1 + (mult - 1) * 0.001)).toLocaleString()}`,
      change: 8.1,
      changeLabel: `vs prev ${tf}`,
      icon: Users,
      iconColor: "text-primary",
      iconBg: "bg-primary/10 border-primary/20",
      sparkline: buildSparkline(80, 15),
    },
    {
      id: "churn",
      label: "Churn Rate",
      value: "2.3%",
      change: -0.4,
      changeLabel: `vs prev ${tf}`,
      icon: TrendingDown,
      iconColor: "text-warning",
      iconBg: "bg-warning/10 border-warning/20",
      sparkline: buildSparkline(50, 10),
      suffix: "%",
    },
    {
      id: "nps",
      label: "Net Promoter Score",
      value: "72",
      change: 5.0,
      changeLabel: `vs prev ${tf}`,
      icon: Star,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/20",
      sparkline: buildSparkline(60, 12),
    },
    {
      id: "api",
      label: "API Calls",
      value: `${Math.round(2.4 * mult).toLocaleString()}M`,
      change: 22.7,
      changeLabel: `vs prev ${tf}`,
      icon: Zap,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      sparkline: buildSparkline(90, 25),
    },
    {
      id: "ltv",
      label: "Customer LTV",
      value: "$2,847",
      change: 6.3,
      changeLabel: `vs prev ${tf}`,
      icon: ShoppingCart,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10 border-purple-500/20",
      sparkline: buildSparkline(70, 18),
      prefix: "$",
    },
    {
      id: "uptime",
      label: "System Uptime",
      value: "99.98%",
      change: 0.02,
      changeLabel: `vs prev ${tf}`,
      icon: Activity,
      iconColor: "text-success",
      iconBg: "bg-success/10 border-success/20",
      sparkline: buildSparkline(98, 2),
      suffix: "%",
    },
    {
      id: "pageviews",
      label: "Page Views",
      value: `${Math.round(1.82 * mult * 10) / 10}M`,
      change: 15.2,
      changeLabel: `vs prev ${tf}`,
      icon: Eye,
      iconColor: "text-fuchsia-400",
      iconBg: "bg-fuchsia-500/10 border-fuchsia-500/20",
      sparkline: buildSparkline(75, 20),
    },
    {
      id: "revenue_per_user",
      label: "Revenue / User",
      value: "$2.58",
      change: 3.9,
      changeLabel: `vs prev ${tf}`,
      icon: BarChart3,
      iconColor: "text-info",
      iconBg: "bg-info/10 border-info/20",
      sparkline: buildSparkline(55, 14),
      prefix: "$",
    },
    {
      id: "global_reach",
      label: "Countries Served",
      value: "127",
      change: 4,
      changeLabel: `vs prev ${tf}`,
      icon: Globe,
      iconColor: "text-teal-400",
      iconBg: "bg-teal-500/10 border-teal-500/20",
      sparkline: buildSparkline(65, 5),
    },
    {
      id: "sessions",
      label: "Avg Session Duration",
      value: "4m 32s",
      change: 1.8,
      changeLabel: `vs prev ${tf}`,
      icon: TrendingUp,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
      sparkline: buildSparkline(60, 8),
    },
    {
      id: "integrations",
      label: "Active Integrations",
      value: "843",
      change: 11.4,
      changeLabel: `vs prev ${tf}`,
      icon: Settings,
      iconColor: "text-slate-400",
      iconBg: "bg-bg-elevated border-border-subtle",
      sparkline: buildSparkline(50, 15),
    },
  ];
};

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 80, H = 32;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 4) - 2}`).join(" ");
  return (
    <svg width={W} height={H} className="opacity-70">
      <polyline fill="none" stroke={positive ? "var(--color-success)" : "var(--color-error)"} strokeWidth="1.5" points={pts} />
    </svg>
  );
}

type LayoutMode = "grid" | "list";

export default function KPICardsPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("30d");
  const [layout, setLayout] = useState<LayoutMode>("grid");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const kpis = generateKPIs(timeframe);
  const filtered = kpis.filter(k => k.label.toLowerCase().includes(search.toLowerCase()));

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-sans">
      {/* Header */}
      <header className="border-b border-border-subtle bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-text-muted hover:text-text-primary text-sm transition-colors">← Back</Link>
            <div className="w-px h-4 bg-border-subtle" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Layers className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-text-primary">KPI Cards</h1>
                <p className="text-[10px] text-text-muted">Metrics at a glance</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Timeframe Tabs */}
            <div className="flex items-center bg-bg-elevated border border-border-subtle rounded-xl p-0.5">
              {TIMEFRAMES.map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${timeframe === tf ? "bg-bg-surface shadow-sm text-text-primary" : "text-text-muted hover:text-text-primary"}`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Summary Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
          <div>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-0.5">Business Health Score</p>
            <p className="text-3xl font-bold text-text-primary">87<span className="text-lg text-text-muted">/100</span></p>
          </div>
          <div className="flex-1 min-w-[120px]">
            <div className="w-full bg-bg-elevated rounded-full h-2">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-success"
                initial={{ width: 0 }}
                animate={{ width: "87%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <p className="text-[10px] text-text-muted mt-1">Based on {kpis.length} KPIs across all departments</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-success font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" /> {kpis.filter(k => k.change > 0).length} improving
            </div>
            <div className="flex items-center gap-1 text-error font-semibold">
              <ArrowDownRight className="w-3.5 h-3.5" /> {kpis.filter(k => k.change < 0).length} declining
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search KPIs..."
              className="w-full pl-3 pr-3 py-2 text-xs bg-bg-surface border border-border-subtle rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex gap-1 bg-bg-elevated border border-border-subtle rounded-xl p-0.5">
            <button onClick={() => setLayout("grid")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${layout === "grid" ? "bg-bg-surface shadow-sm text-text-primary" : "text-text-muted hover:text-text-primary"}`}>Grid</button>
            <button onClick={() => setLayout("list")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${layout === "list" ? "bg-bg-surface shadow-sm text-text-primary" : "text-text-muted hover:text-text-primary"}`}>List</button>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border bg-bg-surface border-border-subtle text-text-secondary hover:text-text-primary transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-primary" : ""}`} /> Refresh
          </button>
          <span className="text-[10px] text-text-muted ml-auto">{filtered.length} metrics</span>
        </div>

        {/* KPI Grid / List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${layout}-${timeframe}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={layout === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
            }
          >
            {filtered.map((kpi, i) => {
              const Icon = kpi.icon;
              const isPositive = kpi.change >= 0;
              const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

              if (layout === "list") {
                return (
                  <motion.div
                    key={kpi.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-bg-surface border border-border-subtle rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-primary/30 hover:bg-bg-elevated/20 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${kpi.iconBg}`}>
                      <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-muted truncate">{kpi.label}</p>
                      <p className="text-xl font-bold text-text-primary">{kpi.value}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Sparkline data={kpi.sparkline} positive={isPositive} />
                      <div className={`flex items-center gap-0.5 text-xs font-bold ${isPositive ? "text-success" : "text-error"}`}>
                        <ChangeIcon className="w-3.5 h-3.5" />
                        {Math.abs(kpi.change)}%
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={kpi.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-bg-surface border border-border-subtle rounded-2xl p-5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${kpi.iconBg}`}>
                      <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
                    </div>
                    <div className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${isPositive ? "text-success bg-success/10 border-success/20" : "text-error bg-error/10 border-error/20"}`}>
                      <ChangeIcon className="w-3 h-3" />
                      {Math.abs(kpi.change)}%
                    </div>
                  </div>

                  <p className="text-[10px] text-text-muted mb-1 group-hover:text-text-secondary transition-colors">{kpi.label}</p>
                  <p className="text-2xl font-bold text-text-primary mb-3 tracking-tight">{kpi.value}</p>

                  <div className="flex items-end justify-between">
                    <p className="text-[9px] text-text-muted">{kpi.changeLabel}</p>
                    <Sparkline data={kpi.sparkline} positive={isPositive} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold text-sm">No KPIs match &quot;{search}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
