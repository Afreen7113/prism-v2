"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, Check, Clipboard, Search, AlertCircle, CheckCircle2, Info, X
} from "lucide-react";
import { Button } from "@/components/ui/Button";

function StorybookHeader() {
  return (
    <header className="h-16 border-b border-border-subtle bg-bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <Link href="/admin" className="flex items-center gap-2.5 group">
        <span className="font-semibold text-text-primary text-base tracking-tight flex items-center gap-2">
          Prism <span className="text-brand font-bold text-xs uppercase bg-brand/10 px-2 py-0.5 rounded border border-brand/20 flex items-center gap-1"><BookOpen className="w-3 h-3 text-brand" /> Storybook v7.4</span>
        </span>
      </Link>
      <Link href="/admin" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
        &larr; Back to Admin Portal
      </Link>
    </header>
  );
}

// Reusable Documentation Components
function DocumentationSection({ children }: { children: React.ReactNode }) {
  return <div className="mt-16 space-y-12 border-t border-border-subtle pt-10">{children}</div>;
}

function PropsTable({ props }: { props: Array<{ name: string; type: string; default: string; desc: string }> }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Component Props</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="pb-2 text-xs font-semibold text-text-secondary w-1/4">Name</th>
              <th className="pb-2 text-xs font-semibold text-text-secondary w-1/4">Type</th>
              <th className="pb-2 text-xs font-semibold text-text-secondary w-1/4">Default</th>
              <th className="pb-2 text-xs font-semibold text-text-secondary w-1/4">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p, i) => (
              <tr key={i} className="border-b border-border-subtle/50">
                <td className="py-3 text-sm font-mono text-brand">{p.name}</td>
                <td className="py-3 text-sm font-mono text-text-muted">{p.type}</td>
                <td className="py-3 text-sm font-mono text-text-muted">{p.default || "-"}</td>
                <td className="py-3 text-sm text-text-secondary">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IntegrationSpec({ importCode, usageCode, onCopy }: { importCode: string; usageCode: string; onCopy: (code: string) => void }) {
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);

  const copyImport = () => {
    onCopy(importCode);
    setCopiedImport(true);
    setTimeout(() => setCopiedImport(false), 2000);
  };

  const copyUsage = () => {
    onCopy(usageCode);
    setCopiedUsage(true);
    setTimeout(() => setCopiedUsage(false), 2000);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Component Integration Spec</h3>
      
      <div>
        <label className="block text-sm font-semibold text-text-secondary mb-2">Import Declaration:</label>
        <div className="bg-bg-elevated/40 border border-border-subtle rounded-lg p-4 font-mono text-xs text-status-success relative group flex items-center justify-between">
          <span>{importCode}</span>
          <button onClick={copyImport} className="text-text-muted hover:text-text-primary transition-colors">
            {copiedImport ? <Check className="w-4 h-4 text-status-success" /> : <Clipboard className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-text-secondary">&lt;/&gt; Usage Code block</label>
          <button onClick={copyUsage} className="text-xs font-semibold text-text-primary flex items-center gap-1.5 hover:text-brand transition-colors">
            {copiedUsage ? <Check className="w-4 h-4 text-status-success" /> : <Clipboard className="w-4 h-4" />} Copy integration snippet
          </button>
        </div>
        <div className="bg-black border border-border-subtle rounded-xl p-5 font-mono text-[13px] leading-relaxed text-status-success overflow-x-auto shadow-inner">
          <pre>{usageCode}</pre>
        </div>
      </div>
    </div>
  );
}

export default function StorybookPage() {
  const [activeStory, setActiveStory] = useState<"button" | "input" | "modal" | "toast">("button");

  type StoryType = "button" | "input" | "modal" | "toast";
  const stories: Array<{ id: StoryType; label: string; desc: string }> = [
    { id: "button", label: "Button", desc: "Interactive button states" },
    { id: "input", label: "Inputs", desc: "Text fields and controls" },
    { id: "modal", label: "Modals", desc: "Dialogs and overlays" },
    { id: "toast", label: "Toasts", desc: "Feedback notifications" }
  ];

  return (
    <div className="h-screen bg-bg-base text-text-primary flex flex-col font-sans overflow-hidden">
      <StorybookHeader />
      
      {/* KPIs Header */}
      <div className="bg-bg-elevated border-b border-border-subtle py-3 px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex gap-8">
          <div><div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Components</div><div className="text-lg font-bold text-text-primary">42</div></div>
          <div><div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Stories</div><div className="text-lg font-bold text-text-primary">128</div></div>
          <div><div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Tokens</div><div className="text-lg font-bold text-text-primary">315</div></div>
          <div><div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Coverage</div><div className="text-lg font-bold text-status-success">100%</div></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 border-r border-border-subtle bg-bg-surface p-5 flex flex-col gap-1 shrink-0 overflow-y-auto">
          <span className="text-[10px] uppercase font-bold text-text-muted px-3 mb-2 tracking-widest">UI Components</span>
          {stories.map((story) => {
            const isActive = activeStory === story.id;
            return (
              <button
                key={story.id}
                onClick={() => setActiveStory(story.id)}
                className={`w-full flex flex-col gap-0.5 px-3 py-2 rounded-xl text-left transition-all ${
                  isActive
                    ? "bg-brand/15 text-brand"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                }`}
              >
                <span className="text-xs font-bold">{story.label}</span>
                <span className="text-[9px] opacity-75">{story.desc}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-bg-base overflow-y-auto relative p-8">
          <div className="max-w-4xl mx-auto space-y-12 pb-24">
            
            {activeStory === "button" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">Button Component</h1>
                  <p className="text-sm text-text-secondary">Used for primary actions, secondary actions, and ghost states. Built with semantic tokens.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Variants */}
                  <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 space-y-6 shadow-sm">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Variants</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Primary</span>
                        <Button variant="primary">Primary Action</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Secondary</span>
                        <Button variant="secondary">Secondary Action</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Outline</span>
                        <Button variant="outline">Outline Action</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Ghost</span>
                        <Button variant="ghost">Ghost Action</Button>
                      </div>
                    </div>
                  </div>

                  {/* States & Sizes */}
                  <div className="space-y-8">
                    <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
                      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">States</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="primary" isLoading>Loading</Button>
                        <Button variant="primary" disabled>Disabled</Button>
                      </div>
                    </div>

                    <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
                      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Sizes</h3>
                      <div className="flex items-end gap-4">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <DocumentationSection>
                  <PropsTable props={[
                    { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost'", default: "'primary'", desc: "Visual style variant" },
                    { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", desc: "Button dimensions" },
                    { name: "isLoading", type: "boolean", default: "false", desc: "Displays loading spinner and disables interaction" },
                    { name: "disabled", type: "boolean", default: "false", desc: "Disables interaction" },
                    { name: "className", type: "string", default: "undefined", desc: "Additional CSS classes" }
                  ]} />
                  <IntegrationSpec 
                    importCode={`import { Button } from "@/components/ui/Button";`}
                    usageCode={`<Button\n  variant="primary"\n  size="md"\n  isLoading={false}\n  onClick={() => console.log('clicked')}\n>\n  Primary Action\n</Button>`}
                    onCopy={(code) => navigator.clipboard.writeText(code)}
                  />
                </DocumentationSection>
              </div>
            )}

            {activeStory === "input" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">Input Components</h1>
                  <p className="text-sm text-text-secondary">Text fields, textareas, and search inputs with state handling.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Default Inputs */}
                  <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 space-y-6 shadow-sm">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Default Fields</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Standard Input</label>
                        <input type="text" placeholder="Enter text..." className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand text-text-primary" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">With Icon</label>
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand text-text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* States */}
                  <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 space-y-6 shadow-sm">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">States</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-status-error mb-1.5 uppercase tracking-wider">Error State</label>
                        <input type="text" defaultValue="Invalid email format" className="w-full px-4 py-2.5 rounded-xl border border-status-error focus:ring-status-error bg-status-error/5 text-sm focus:outline-none focus:ring-2 text-text-primary" />
                        <p className="text-xs text-status-error mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Email is required</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wider">Disabled State</label>
                        <input type="text" disabled defaultValue="Cannot edit this" className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-elevated text-sm text-text-muted cursor-not-allowed opacity-70" />
                      </div>
                    </div>
                  </div>
                </div>

                <DocumentationSection>
                  <PropsTable props={[
                    { name: "type", type: "string", default: "'text'", desc: "HTML input type" },
                    { name: "placeholder", type: "string", default: "undefined", desc: "Placeholder text" },
                    { name: "disabled", type: "boolean", default: "false", desc: "Disables the input field" },
                    { name: "defaultValue", type: "string", default: "undefined", desc: "Initial value" },
                    { name: "className", type: "string", default: "undefined", desc: "Additional CSS classes" }
                  ]} />
                  <IntegrationSpec 
                    importCode={`import { Input } from "@/components/ui/Input";`}
                    usageCode={`<input \n  type="text" \n  placeholder="Enter text..." \n  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand text-text-primary" \n/>`}
                    onCopy={(code) => navigator.clipboard.writeText(code)}
                  />
                </DocumentationSection>
              </div>
            )}

            {activeStory === "modal" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">Modal Dialogs</h1>
                  <p className="text-sm text-text-secondary">Overlays for critical actions and complex forms.</p>
                </div>

                <div className="bg-bg-surface border border-border-subtle rounded-2xl p-8 shadow-sm flex items-center justify-center min-h-[400px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-bg-elevated/40 backdrop-blur-sm flex items-center justify-center p-4">
                    {/* Mock Modal */}
                    <div className="bg-bg-surface border border-border-subtle rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                      <div className="p-5 border-b border-border-subtle flex justify-between items-center bg-bg-elevated/50">
                        <h3 className="font-bold text-text-primary">Confirm Deletion</h3>
                        <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-text-secondary">Are you sure you want to delete this tenant? This action cannot be undone and will immediately revoke API access.</p>
                      </div>
                      <div className="p-5 border-t border-border-subtle bg-bg-elevated/50 flex justify-end gap-3">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-status-error hover:bg-status-error/90 text-white border-transparent">Delete Tenant</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <DocumentationSection>
                  <PropsTable props={[
                    { name: "isOpen", type: "boolean", default: "false", desc: "Controls modal visibility" },
                    { name: "onClose", type: "() => void", default: "undefined", desc: "Callback when modal requests to close" },
                    { name: "title", type: "string", default: "undefined", desc: "Modal header title" },
                    { name: "children", type: "ReactNode", default: "undefined", desc: "Modal body content" }
                  ]} />
                  <IntegrationSpec 
                    importCode={`import { Modal } from "@/components/ui/Modal";`}
                    usageCode={`<div className="fixed inset-0 bg-bg-elevated/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">\n  <div className="bg-bg-surface border border-border-subtle rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">\n    <div className="p-5 border-b border-border-subtle flex justify-between items-center bg-bg-elevated/50">\n      <h3 className="font-bold text-text-primary">Confirm Deletion</h3>\n      <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>\n    </div>\n    <div className="p-6">\n      <p className="text-sm text-text-secondary">Are you sure you want to delete this tenant?</p>\n    </div>\n    <div className="p-5 border-t border-border-subtle bg-bg-elevated/50 flex justify-end gap-3">\n      <Button variant="outline">Cancel</Button>\n      <Button className="bg-status-error text-white border-transparent">Delete Tenant</Button>\n    </div>\n  </div>\n</div>`}
                    onCopy={(code) => navigator.clipboard.writeText(code)}
                  />
                </DocumentationSection>
              </div>
            )}

            {activeStory === "toast" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">Toasts & Notifications</h1>
                  <p className="text-sm text-text-secondary">Feedback messages for user actions.</p>
                </div>

                <div className="bg-bg-surface border border-border-subtle rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px] gap-4">
                  {/* Success Toast */}
                  <div className="bg-bg-surface border-l-4 border-l-status-success border border-border-subtle shadow-lg rounded-xl p-4 w-full max-w-sm flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-text-primary">Settings Saved</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Your changes have been applied successfully.</p>
                    </div>
                    <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
                  </div>

                  {/* Error Toast */}
                  <div className="bg-bg-surface border-l-4 border-l-status-error border border-border-subtle shadow-lg rounded-xl p-4 w-full max-w-sm flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-status-error shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-text-primary">API Error</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Failed to sync tenant data. Please try again.</p>
                    </div>
                    <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
                  </div>

                  {/* Info Toast */}
                  <div className="bg-bg-surface border-l-4 border-l-info border border-border-subtle shadow-lg rounded-xl p-4 w-full max-w-sm flex gap-3 items-start">
                    <Info className="w-5 h-5 text-info shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-text-primary">New Feature Available</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Check out the new SDK integration panel.</p>
                    </div>
                    <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
                  </div>
                </div>

                <DocumentationSection>
                  <PropsTable props={[
                    { name: "type", type: "'success' | 'error' | 'info'", default: "'info'", desc: "Toast variant and icon" },
                    { name: "title", type: "string", default: "undefined", desc: "Toast heading" },
                    { name: "description", type: "string", default: "undefined", desc: "Toast sub-message text" },
                    { name: "duration", type: "number", default: "5000", desc: "Time in ms before auto-dismiss" }
                  ]} />
                  <IntegrationSpec 
                    importCode={`import { toast } from "@/components/ui/useToast";`}
                    usageCode={`toast({\n  title: "Settings Saved",\n  description: "Your changes have been applied successfully.",\n  type: "success",\n});`}
                    onCopy={(code) => navigator.clipboard.writeText(code)}
                  />
                </DocumentationSection>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
