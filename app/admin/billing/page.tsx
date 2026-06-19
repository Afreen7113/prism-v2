import React from 'react';

export default function BillingPage() {
  return (
    <div className="flex min-h-screen bg-bg-base text-text-brand">
      {/* Sidebar */}
      <div className="w-64 border-r border-border-subtle bg-bg-surface p-4">
        <h1 className="text-xl font-bold mb-8">Admin Portal</h1>
        <nav className="flex flex-col gap-2">
          <a href="/admin/tenant-manager" className="p-2 rounded text-text-secondary hover:bg-bg-elevated hover:text-text-brand">Customers</a>
          <a href="/admin/billing" className="p-2 rounded bg-bg-elevated text-brand font-semibold">Billing</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold">Usage & Billing</h2>
          <p className="text-text-muted text-sm mt-1">Monitor API usage, dashboards, and billing tiers.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 border border-border-subtle rounded-lg bg-bg-surface">
            <h3 className="text-text-secondary text-sm font-medium mb-2">Current Tier</h3>
            <p className="text-2xl font-bold text-brand">Enterprise</p>
          </div>
          <div className="p-6 border border-border-subtle rounded-lg bg-bg-surface">
            <h3 className="text-text-secondary text-sm font-medium mb-2">API Usage</h3>
            <p className="text-2xl font-bold">1.2M / 2.0M</p>
            <p className="text-text-muted text-xs mt-1">Requests this month</p>
          </div>
          <div className="p-6 border border-border-subtle rounded-lg bg-bg-surface">
            <h3 className="text-text-secondary text-sm font-medium mb-2">Active Dashboards</h3>
            <p className="text-2xl font-bold">14 / 20</p>
          </div>
        </div>

        {/* Chart Mockup */}
        <div className="p-6 border border-border-subtle rounded-lg bg-bg-surface">
          <h3 className="font-medium mb-4">API Usage Over Time</h3>
          <div className="h-64 flex items-end gap-2 border-b border-l border-border-subtle p-4 pb-0 pt-8">
            <div className="w-full bg-brand bg-opacity-80 rounded-t" style={{ height: '40%' }}></div>
            <div className="w-full bg-brand bg-opacity-80 rounded-t" style={{ height: '60%' }}></div>
            <div className="w-full bg-brand bg-opacity-80 rounded-t" style={{ height: '35%' }}></div>
            <div className="w-full bg-brand bg-opacity-80 rounded-t" style={{ height: '80%' }}></div>
            <div className="w-full bg-brand bg-opacity-80 rounded-t" style={{ height: '50%' }}></div>
            <div className="w-full bg-brand bg-opacity-80 rounded-t" style={{ height: '90%' }}></div>
            <div className="w-full bg-brand bg-opacity-80 rounded-t" style={{ height: '70%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-text-muted mt-2">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
}
