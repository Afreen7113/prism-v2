"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sliders,
  BarChart3,
  Users,
  CreditCard,
  BookOpen
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { id: "dashboard", label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { id: "playground", label: "Theme Playground", href: "/admin/theme-playground", icon: Sliders },
    { id: "builder", label: "Chart Builder", href: "/admin/chart-builder", icon: BarChart3 },
    { id: "customers", label: "Tenant Manager", href: "/admin/tenant-manager", icon: Users },
    { id: "billing", label: "Usage & Telemetry", href: "/admin/usage-telemetry", icon: CreditCard },
  ];

  return (
    <div className="h-screen bg-bg-base text-text-primary flex flex-col relative font-sans overflow-hidden">
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
      <div className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden">
        {/* Sidebar Controls */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-surface/85 p-5 flex flex-col gap-1 shrink-0 lg:overflow-y-auto lg:h-full">
          <span className="text-[10px] uppercase font-bold text-text-muted px-3 mb-2 tracking-widest">Navigation</span>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/admin" 
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
              
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all duration-300 ${
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/20 shadow-[0_0_12px_rgba(99,102,241,0.1)]"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/storybook"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60 border border-transparent transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Storybook Docs</span>
          </Link>

          <div className="mt-8 pt-6 border-t border-border-subtle px-3 hidden lg:flex flex-col gap-2">
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
          {children}
        </main>
      </div>
    </div>
  );
}
