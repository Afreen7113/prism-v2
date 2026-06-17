export default function StorybookPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Component Library Documentation</h1>
      <p className="text-text-secondary">Full Storybook documentation is available separately.</p>
      
      <div className="mt-8 p-6 bg-bg-surface border border-border-subtle rounded-xl">
        <h2 className="text-lg font-semibold">To Launch Storybook:</h2>
        <code className="block p-4 bg-bg-elevated rounded-lg mt-4 font-mono text-sm border border-border-subtle">
          npm run storybook
        </code>
        <p className="text-text-secondary mt-4 text-sm">
          Storybook will open at http://localhost:6006
        </p>
        
        <a
  href="http://localhost:6006"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-glow-primary hover:scale-[1.02] transition-all duration-300"
>
  Open Full Storybook
  <span>↗</span>
</a>
      </div>

<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="p-4 rounded-xl border border-border-subtle bg-bg-surface">
    <h3 className="font-semibold text-text-primary">Components</h3>
    <p className="text-sm text-text-secondary mt-1">
      Reusable UI building blocks
    </p>
  </div>

  <div className="p-4 rounded-xl border border-border-subtle bg-bg-surface">
    <h3 className="font-semibold text-text-primary">Interactive Controls</h3>
    <p className="text-sm text-text-secondary mt-1">
      Test component props and states live
    </p>
  </div>

  <div className="p-4 rounded-xl border border-border-subtle bg-bg-surface">
    <h3 className="font-semibold text-text-primary">Documentation</h3>
    <p className="text-sm text-text-secondary mt-1">
      Complete design system reference
    </p>
  </div>
</div>

{/* Show preview of available components */}
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ComponentPreview name="Button" path="/Prism/Button" />
        <ComponentPreview name="Card" path="/Prism/Card" />
        <ComponentPreview name="MetricCard" path="/Prism/MetricCard" />
        <ComponentPreview name="ChartWidget" path="/Prism/ChartWidget" />
        <ComponentPreview name="ThemeSelector" path="/Prism/ThemeSelector" />
      </div>
    </div>
  );
}

function ComponentPreview({ name, path }: { name: string; path: string }) {
  return (
    <a href={`http://localhost:6006/?path=/story${path}`} target="_blank" rel="noreferrer" className="block p-4 border border-border-subtle rounded-lg bg-bg-surface shadow-sm hover:border-primary transition-colors cursor-pointer">
      <h3 className="font-semibold text-text-primary">{name}</h3>
      <p className="text-xs text-text-secondary mt-1">Available in Storybook</p>
    </a>
  );
}
