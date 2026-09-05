import React, { useState } from "react";
import { CodeBlock } from "../Preview";
// Imported as raw text at build time — this is the exact file the tokens
// package generates from primitives.json/semantic.json/component.json,
// never a hand-copied snapshot. If a token value changes upstream, this
// page changes with it automatically on the next build.
// @ts-ignore — Vite's `?raw` query import, typed via vite-env below.
import scssSource from "@tokens/core.tokens.scss?raw";

export default function Tokens() {
  const [copied, setCopied] = useState(false);

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(scssSource);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div>
      <h1 className="site-h1">Tokens (SCSS)</h1>
      <p className="site-lede">
        Every color, spacing, elevation and font-size value in CORE, exported as Sass variables in one file —
        generated straight from <code>packages/tokens/src/*.json</code> at build time, the same source the CSS
        custom properties come from. Nothing on this page is typed in by hand; if a primitive changes, this file
        changes with it.
      </p>

      <h2 className="site-section-title">Why a second format</h2>
      <p className="site-section-sub" style={{ marginBottom: 24 }}>
        CSS custom properties (<code>var(--core-color-text-primary)</code>) are how CORE themes itself at
        runtime — light/dark, white-label brand swaps — and remain the source of truth there. This SCSS export is
        for teams whose build already compiles Sass (Bootstrap included): compile-time math, mixins, conditional
        imports, and a direct bridge into Bootstrap's own <code>$primary</code> / <code>$spacer</code> /
        <code>$font-size-base</code> variables so an existing Bootstrap project can adopt CORE's palette without
        rewriting its component overrides.
      </p>

      <h2 className="site-section-title">Structure</h2>
      <table className="spec-table">
        <thead><tr><th>Section</th><th>Naming</th><th>Source</th></tr></thead>
        <tbody>
          <tr><td>Brand</td><td><code>$core-brand-{"{"}property{"}"}-primary-{"{"}state{"}"}</code></td><td>Brand color primitives + the <code>action.primary.*</code> semantic tokens</td></tr>
          <tr><td>Neutral</td><td><code>$core-neutral-{"{"}property{"}"}-{"{"}variant{"}"}</code></td><td>Neutral scale + <code>surface</code>/<code>text</code>/<code>border</code> semantic tokens</td></tr>
          <tr><td>Semantics</td><td><code>$core-semantics-{"{"}critical|success|warning|highlight{"}"}-{"{"}property{"}"}</code></td><td>Status semantic tokens (danger/success/warning/info)</td></tr>
          <tr><td>Elevation</td><td><code>$core-elevation-01..04</code></td><td>Shadow primitives</td></tr>
          <tr><td>Font size</td><td><code>$core-font-size-{"{"}xs..5xl{"}"}</code></td><td>Type scale primitives, converted px → rem</td></tr>
          <tr><td>Spacing</td><td><code>$core-spacing-{"{"}0..24{"}"}</code>, <code>$core-spacer</code></td><td>Space scale primitives, converted px → rem (4px steps, Bootstrap-compatible)</td></tr>
          <tr><td>All resolved tokens</td><td><code>$core-{"{"}dot.path.as-dashes{"}"}</code></td><td>Every semantic + component token, 1:1 with its CSS custom property</td></tr>
          <tr><td>Bootstrap bridge</td><td>Bootstrap's own names (<code>$primary</code>, <code>$spacer</code>, …)</td><td>Points at the CORE aliases above — <code>@import</code> this file before Bootstrap's <code>variables</code></td></tr>
        </tbody>
      </table>

      <h2 className="site-section-title">Using it</h2>
      <div className="site-panel site-panel--flush">
        <CodeBlock>{`// In a Sass-based project (Bootstrap or otherwise):
@import "@core-ds/tokens/dist/core.tokens.scss";
@import "bootstrap/scss/bootstrap"; // now compiles with CORE's palette/spacing/type scale

// Or use the aliases directly, without touching Bootstrap at all:
.callout {
  background: $core-semantics-highlight-background-light;
  border: 1px solid $core-semantics-highlight-border;
  border-radius: $core-radius-md;
  padding: $core-spacing-4;
}`}</CodeBlock>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "40px 0 12px" }}>
        <h2 className="site-section-title" style={{ margin: 0 }}>Full file</h2>
        <button type="button" className="cds-btn cds-btn--secondary cds-btn--sm" onClick={copyAll}>
          {copied ? "Copied ✓" : "Copy all"}
        </button>
      </div>
      <p className="site-section-sub">Generated at build time — Brand, Neutral, Semantics, Elevation, Font size, Spacing, Radius, every resolved token, then the Bootstrap bridge, in that order.</p>
      <div className="site-panel site-panel--flush">
        <CodeBlock>{scssSource}</CodeBlock>
      </div>
    </div>
  );
}
