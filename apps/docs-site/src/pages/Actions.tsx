import React from "react";
import { Preview, CodeBlock } from "../Preview";
import { Button, IconButton, Link } from "../../../../packages/core/src/components/Button";
import { ButtonGroup } from "../../../../packages/core/src/components/Primitives";

export default function Actions() {
  return (
    <div>
      <h1 className="site-h1" id="button">Button</h1>
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

      <h2 className="site-section-title" id="icon-button">Icon Button</h2>
      <p className="site-section-sub">Square, icon-only — every instance requires an <code>aria-label</code> (enforced by the TypeScript prop, not just a convention).</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <IconButton variant="secondary" size="sm" aria-label="Close"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></IconButton>
          <IconButton variant="secondary" size="md" aria-label="Settings"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></IconButton>
          <IconButton variant="primary" size="lg" aria-label="Add"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></IconButton>
          <IconButton variant="destructive" size="md" aria-label="Delete"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4.5h10M6.5 4.5V3a1 1 0 011-1h1a1 1 0 011 1v1.5M4.5 4.5v8a1 1 0 001 1h5a1 1 0 001-1v-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></IconButton>
        </Preview>
      </div>

      <h2 className="site-section-title" id="link">Link</h2>
      <p className="site-section-sub">Inline text link — distinct from Tertiary button, which is used for a standalone action, not inline in a sentence.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <span style={{ fontSize: 14, color: "var(--core-color-text-primary)" }}>
            Read our <Link href="#">plan disclosure documents</Link> before enrolling.
          </span>
        </Preview>
      </div>

      <h2 className="site-section-title" id="button-group">Button Group</h2>
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
