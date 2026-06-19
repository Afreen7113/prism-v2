import React from 'react';

export default function StorybookPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-brand p-8">
      <header className="mb-12 border-b border-border-subtle pb-6">
        <h1 className="text-3xl font-bold">Component Storybook</h1>
        <p className="text-text-muted mt-2">Core components demonstrating CSS root variable adaptations.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 border-b border-border-subtle pb-2">Buttons</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-brand text-text-on-primary rounded font-medium hover:opacity-90 transition">Primary Button</button>
          <button className="px-4 py-2 bg-bg-elevated border border-border-subtle text-text-brand rounded font-medium hover:bg-bg-surface transition">Secondary Button</button>
          <button className="px-4 py-2 bg-status-success text-text-brand rounded font-medium hover:opacity-90 transition">Success Button</button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 border-b border-border-subtle pb-2">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-bg-surface border border-border-subtle rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-2">Surface Card</h3>
            <p className="text-text-secondary text-sm">Uses bg-bg-surface and border-border-subtle.</p>
          </div>
          <div className="p-6 bg-bg-elevated border border-border-subtle rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Elevated Card</h3>
            <p className="text-text-secondary text-sm">Uses bg-bg-elevated for a slightly lifted appearance.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 border-b border-border-subtle pb-2">Chart Wrappers</h2>
        <div className="p-6 bg-bg-surface border border-border-subtle rounded-lg">
          <div className="h-48 border border-dashed border-border-subtle flex items-center justify-center bg-bg-base rounded">
            <span className="text-text-muted text-sm">Chart rendering area (Dynamic height/width)</span>
          </div>
          <div className="mt-4 flex justify-between items-center text-sm">
            <span className="text-text-secondary">X-Axis Label</span>
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 rounded-full bg-brand inline-block"></span>
              <span className="text-text-muted">Series 1</span>
              <span className="w-3 h-3 rounded-full bg-status-success inline-block ml-2"></span>
              <span className="text-text-muted">Series 2</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
