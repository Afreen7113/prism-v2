"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, Plus, Search, Filter, Copy, CheckCircle2, 
  MoreVertical, Shield, Globe 
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  environment: "Production" | "Development" | "Testing";
  created: string;
  lastUsed: string;
  scopes: string[];
  status: "Active" | "Revoked";
}

const MOCK_KEYS: ApiKey[] = [
  { id: "1", name: "Primary Production Key", key: "pk_live_8f7d6e5c4b3a2109", environment: "Production", created: "Oct 12, 2023", lastUsed: "2 mins ago", scopes: ["Full Access"], status: "Active" },
  { id: "2", name: "Staging Environment", key: "pk_test_a1b2c3d4e5f6g7h8", environment: "Testing", created: "Nov 05, 2023", lastUsed: "1 hour ago", scopes: ["Read Only"], status: "Active" },
  { id: "3", name: "Developer Local", key: "pk_dev_9h8g7f6e5d4c3b2a", environment: "Development", created: "Jan 22, 2024", lastUsed: "Never", scopes: ["Read Only", "Write"], status: "Active" },
  { id: "4", name: "Old Production Key", key: "pk_live_1a2b3c4d5e6f7g8h", environment: "Production", created: "Jan 10, 2023", lastUsed: "Oct 12, 2023", scopes: ["Full Access"], status: "Revoked" },
];

export default function ApiKeysPage() {
  const [keys] = useState<ApiKey[]>(MOCK_KEYS);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCopy = (id: string, keyStr: string) => {
    navigator.clipboard.writeText(keyStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredKeys = keys.filter(k => k.name.toLowerCase().includes(search.toLowerCase()) || k.key.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Key className="w-6 h-6 text-brand" />
            API Keys
          </h1>
          <p className="text-sm text-text-secondary mt-1">Manage authentication keys for your integrations.</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create API Key
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-bg-surface p-4 rounded-2xl border border-border-subtle shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keys..." 
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border-subtle bg-bg-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" /> Environment
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" /> Status
          </Button>
        </div>
      </div>

      {/* Keys Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-elevated text-text-muted font-semibold text-xs tracking-wider uppercase">
                <th className="px-6 py-4">Key Name</th>
                <th className="px-6 py-4">Environment</th>
                <th className="px-6 py-4">Secret Key</th>
                <th className="px-6 py-4">Created / Last Used</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredKeys.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-16 h-16 bg-bg-elevated rounded-2xl flex items-center justify-center border border-border-subtle mb-4">
                        <Key className="w-8 h-8 text-text-muted" />
                      </div>
                      <h3 className="text-base font-bold text-text-primary mb-1">No API keys available</h3>
                      <p className="text-sm text-text-secondary mb-6">Create a key to authenticate your applications and start using the Prism API.</p>
                      <Button onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create API Key
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
              {filteredKeys.map((item, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.id} 
                  className={`transition-colors group ${
                    item.status === "Revoked" 
                      ? "bg-[color-mix(in_srgb,var(--color-error)_4%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-error)_8%,transparent)]" 
                      : "hover:bg-bg-elevated/50"
                  }`}
                >
                  <td className={`px-6 py-4 w-[25%] border-l-[3px] ${
                    item.status === "Revoked" 
                      ? "border-[color-mix(in_srgb,var(--color-error)_50%,transparent)]" 
                      : "border-transparent"
                  }`}>
                    <div className="max-w-[140px] sm:max-w-[180px] lg:max-w-[240px]">
                      <p className="font-semibold text-text-primary truncate" title={item.name}>{item.name}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.scopes.map(s => {
                        const scopeColors: Record<string, string> = {
                          "Full Access": "bg-status-warning/10 text-status-warning border-status-warning/20",
                          "Read Only": "bg-info/10 text-info border-info/20",
                          "Write": "bg-status-success/10 text-status-success border-status-success/20",
                        };
                        const colorClass = scopeColors[s] || "bg-bg-base text-text-secondary border-border-subtle";
                        return (
                          <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full border ${colorClass}`}>{s}</span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                      item.environment === "Production" 
                        ? "bg-status-warning/10 text-status-warning border-status-warning/20"
                        : item.environment === "Testing"
                        ? "bg-info/10 text-info border-info/20"
                        : "bg-text-muted/10 text-text-secondary border-border-subtle"
                    }`}>
                      {item.environment === "Production" ? <Globe className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                      {item.environment}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-text-secondary text-xs whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{item.status === "Active" ? item.key.slice(0, 8) + "••••••••••••" : "••••••••••••••••"}</span>
                      {item.status === "Active" && (
                        <Button 
                          variant="ghost" size="icon" aria-label="Copy API Key"
                          onClick={() => handleCopy(item.id, item.key)}
                          className="h-6 w-6 p-1 rounded-md hover:bg-bg-base text-text-muted hover:text-brand transition-colors"
                        >
                          {copiedId === item.id ? <CheckCircle2 className="w-3.5 h-3.5 text-status-success" /> : <Copy className="w-3.5 h-3.5" />}
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs whitespace-nowrap">
                    <p className="text-text-primary">{item.created}</p>
                    <p className="text-text-muted mt-0.5">{item.lastUsed}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                      item.status === "Active" 
                        ? "bg-status-success/10 text-status-success border-status-success/20" 
                        : "bg-status-error/10 text-status-error border-status-error/20"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" aria-label="More Actions" className="h-8 w-8 text-text-muted hover:text-text-primary">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
              {filteredKeys.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    <Key className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p>No API keys found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm"
              onClick={() => setIsCreateModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-lg font-bold text-text-primary mb-1">Create API Key</h2>
              <p className="text-sm text-text-secondary mb-6">Generate a new key for authentication.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Key Name</label>
                  <input type="text" placeholder="e.g. Stripe Integration" className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Environment</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand appearance-none">
                    <option>Production</option>
                    <option>Development</option>
                    <option>Testing</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-8">
                <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsCreateModalOpen(false)}>Generate Key</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
