import React from "react";
import { Preview, CodeBlock } from "../Preview";
import { Button } from "../../../../packages/core/src/components/Button";
import { ButtonGroup } from "../../../../packages/core/src/components/Primitives";

export default function Actions() {
  return (
    <div>
      <h1 className="site-h1">Button</h1>
      <p className="site-lede">Primary / Secondary / Tertiary / Destructive hierarchy. Every variant shares focus, disabled, and loading behavior.</p>

      <h2 className="site-section-title">Variants</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
        </Preview>
      </div>

      <h2 className="site-section-title">Sizes</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Preview>
      </div>

      <h2 className="site-section-title">States</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </Preview>
      </div>

      <h2 className="site-section-title">Button Group</h2>
      <p className="site-section-sub">Segmented actions that belong together — buttons merge borders into one control.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <ButtonGroup>
            <Button variant="secondary" size="sm">Day</Button>
            <Button variant="secondary" size="sm">Week</Button>
            <Button variant="secondary" size="sm">Month</Button>
          </ButtonGroup>
        </Preview>
      </div>

      <h2 className="site-section-title">Accessibility</h2>
      <ul style={{ color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
        <li>Renders a native <code>&lt;button&gt;</code> — full keyboard operability (Enter / Space) for free.</li>
        <li>2px visible focus ring via <code>:focus-visible</code>, never suppressed.</li>
        <li>Loading state sets <code>aria-busy</code>; disabled state uses the native <code>disabled</code> attribute so it's removed from the tab order and announced correctly.</li>
        <li>Minimum 32px touch target at the <code>sm</code> size, 40–48px at <code>md</code>/<code>lg</code>.</li>
      </ul>

      <h2 className="site-section-title">Code</h2>
      <CodeBlock>{`<Button variant="primary" size="md">Save changes</Button>
<Button variant="destructive" onClick={onDelete}>Delete account</Button>`}</CodeBlock>

      <h2 className="site-section-title">Tokens</h2>
      <table className="spec-table">
        <thead><tr><th>Token</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>button.primary.bg</code></td><td>Primary background</td></tr>
          <tr><td><code>button.primary.bgHover</code></td><td>Hover state</td></tr>
          <tr><td><code>button.radius</code></td><td>Corner radius, themeable per client</td></tr>
          <tr><td><code>focusRing.color</code></td><td>Focus outline, shared across all interactive components</td></tr>
        </tbody>
      </table>
    </div>
  );
}
