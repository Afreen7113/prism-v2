"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function TenantManager() {
  const [tenants, setTenants] = useState([
    { id: "1", name: "Clinix Medical", clientId: "cli_health_84a7", apiKey: "pk_live_0a28bc94ef03", preset: "healthcare", status: "Active", tier: "Growth", requests: "142,840" },
    { id: "2", name: "Apex Wealth", clientId: "cli_fintech_71b9", apiKey: "pk_live_948fbd20adbc", preset: "fintech", status: "Active", tier: "Enterprise", requests: "942,030" },
    { id: "3", name: "ShopSync Retail", clientId: "cli_retail_38c2", apiKey: "pk_live_e92a40b90c01", preset: "consumer", status: "Active", tier: "Growth", requests: "582,310" },
    { id: "4", name: "DevEngine Metrics", clientId: "cli_devtools_90d5", apiKey: "pk_live_38bf8c02def9", preset: "developer", status: "Suspended", tier: "Developer", requests: "12,940" },
  ]);
  const [newTenantName, setNewTenantName] = useState("");
  const [newTenantPreset, setNewTenantPreset] = useState("default");
  const [newTenantTier, setNewTenantTier] = useState("Growth");
  const [showAddModal, setShowAddModal] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState<Record<string, boolean>>({});

  const toggleTenantStatus = (id: string) => {
    setTenants(tenants.map(t => t.id === id ? { ...t, status: t.status === "Active" ? "Suspended" : "Active" } : t));
  };

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantName) return;
    const randomHex = Math.floor(Math.random() * 65535).toString(16);
    const randomKey = Math.floor(Math.random() * 10000000000000).toString(16);
    const newT = {
      id: (tenants.length + 1).toString(),
      name: newTenantName,
      clientId: `cli_${newTenantPreset}_${randomHex}`,
      apiKey: `pk_live_${randomKey}`,
      preset: newTenantPreset,
      status: "Active",
      tier: newTenantTier,
      requests: "0"
    };
    setTenants([...tenants, newT]);
    setNewTenantName("");
    setShowAddModal(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="customers"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col gap-6 text-left"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Customer Tenant Registry</h1>
            <p className="text-sm text-text-secondary mt-1">
              Manage active B2B platform integrations, view client credentials, configure API scopes, and provision new workspaces.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-xl flex items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Tenant
          </button>
        </div>

        {/* Tenant List Table container */}
        <div className="bg-bg-surface/40 border border-border-subtle rounded-2xl p-6 shadow-xl relative overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-border-subtle text-xs font-bold text-text-secondary">
                <th className="pb-3.5 px-3">Tenant Name</th>
                <th className="pb-3.5 px-3">Client ID</th>
                <th className="pb-3.5 px-3">API Key (PK)</th>
                <th className="pb-3.5 px-3">Active Preset</th>
                <th className="pb-3.5 px-3">Pricing Tier</th>
                <th className="pb-3.5 px-3">Requests (mo)</th>
                <th className="pb-3.5 px-3">Status</th>
                <th className="pb-3.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {tenants.map((t) => (
                <tr key={t.id} className="border-b border-border-subtle last:border-b-0 hover:bg-bg-elevated/40 transition-all">
                  <td className="py-4 px-3 font-semibold text-text-primary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                      {t.name.substring(0, 2)}
                    </span>
                    {t.name}
                  </td>
                  <td className="py-4 px-3 font-mono text-text-secondary opacity-80">{t.clientId}</td>
                  <td className="py-4 px-3 font-mono text-text-secondary">
                    <div className="flex items-center gap-1.5">
                      <span>
                        {apiKeyVisible[t.id] ? t.apiKey : "pk_live_••••••••••••"}
                      </span>
                      <button
                        onClick={() => setApiKeyVisible({ ...apiKeyVisible, [t.id]: !apiKeyVisible[t.id] })}
                        className="text-[10px] text-primary hover:text-text-primary font-semibold"
                      >
                        {apiKeyVisible[t.id] ? "Hide" : "Reveal"}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className="px-2.5 py-1 rounded-full bg-bg-elevated border border-border-subtle font-semibold capitalize text-[10px]">
                      {t.preset}
                    </span>
                  </td>
                  <td className="py-4 px-3 font-semibold text-text-primary">
                    <span
                      className="px-2 py-0.5 rounded border text-[10px] font-bold"
                      style={{
                        background: t.tier === "Enterprise" ? "rgba(139,92,246,0.1)" : t.tier === "Growth" ? "rgba(59,130,246,0.1)" : "rgba(113,113,122,0.1)",
                        borderColor: t.tier === "Enterprise" ? "rgba(139,92,246,0.2)" : t.tier === "Growth" ? "rgba(59,130,246,0.2)" : "rgba(113,113,122,0.2)",
                        color: t.tier === "Enterprise" ? "#a855f7" : t.tier === "Growth" ? "#3b82f6" : "var(--prism-site-text-secondary)"
                      }}
                    >
                      {t.tier}
                    </span>
                  </td>
                  <td className="py-4 px-3 font-mono text-text-secondary">{t.requests}</td>
                  <td className="py-4 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === "Active"
                        ? "bg-success/10 text-success border border-success/15"
                        : "bg-red-500/10 text-red-400 border border-red-500/15"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <div className="flex justify-end gap-3.5">
                      <button
                        onClick={() => toggleTenantStatus(t.id)}
                        className={`text-[10px] font-bold ${
                          t.status === "Active" ? "text-amber-500 hover:text-amber-400" : "text-success hover:text-success/80"
                        }`}
                      >
                        {t.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                      <button
                        onClick={() => setTenants(tenants.filter(item => item.id !== t.id))}
                        className="text-red-500 hover:text-red-400 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD TENANT MODAL MOCK */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-bg-surface border border-border-subtle p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
              <h3 className="text-lg font-bold text-text-primary mb-1">Provision New Tenant Space</h3>
              <p className="text-xs text-text-secondary mb-4">Set customer credentials, pick theme environments, and assign billing limits.</p>
              
              <form onSubmit={handleAddTenant} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1">Company / Tenant Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Stripe Inc"
                    value={newTenantName}
                    onChange={(e) => setNewTenantName(e.target.value)}
                    className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">Visual Preset</label>
                    <select
                      value={newTenantPreset}
                      onChange={(e) => setNewTenantPreset(e.target.value)}
                      className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-xl text-xs text-text-primary focus:outline-none"
                    >
                      <option value="default">Default Dark</option>
                      <option value="healthcare">Clinical Light</option>
                      <option value="fintech">Fintech Amber</option>
                      <option value="consumer">Retail Pink</option>
                      <option value="developer">Developer Mono</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">Pricing Plan</label>
                    <select
                      value={newTenantTier}
                      onChange={(e) => setNewTenantTier(e.target.value)}
                      className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-xl text-xs text-text-primary focus:outline-none"
                    >
                      <option value="Developer">Developer</option>
                      <option value="Growth">Growth</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-bg-elevated hover:bg-bg-elevated/80 border border-border-subtle transition-all text-text-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:brightness-110 transition-all"
                  >
                    Create Space
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}



