import React, { useState } from "react";
import { AppHeader, AppFooter, Grid, GridCol } from "../../../../packages/core/src/components/Layout";
import type { GridGap } from "../../../../packages/core/src/components/Layout";
import { IconButton } from "../../../../packages/core/src/components/Button";
import { Card } from "../../../../packages/core/src/components/Misc";
import { Avatar } from "../../../../packages/core/src/components/DataDisplay";
import { Icon } from "../../../../packages/core/src/components/Primitives";
import { AutoAnatomy, AutoAnatomyLegend } from "../AutoAnatomy";
import primitives from "../../../../packages/tokens/src/primitives.json";

const container = (primitives as any).container;
const layout = (primitives as any).layout;

/* ─── Shared styles for visual grid-demo blocks ─── */
const brandColors = [
  "var(--core-color-brand-200)",
  "var(--core-color-brand-400)",
  "var(--core-color-brand-300)",
  "var(--core-color-brand-500)",
  "var(--core-color-brand-100)",
  "var(--core-color-brand-600)",
];

function demoBlockStyle(colorIndex: number): React.CSSProperties {
  return {
    background: brandColors[colorIndex % brandColors.length],
    color: colorIndex % brandColors.length >= 3 ? "#fff" : "var(--core-color-brand-900)",
    textAlign: "center",
    fontSize: "var(--core-font-size-sm)",
    fontWeight: 500,
    borderRadius: "var(--core-radius-sm)",
    padding: "var(--core-space-3)",
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

const gapTokenMap: Record<string, string> = { "2": "8px", "3": "12px", "4": "16px", "6": "24px", "8": "32px" };

const columnOptions = [2, 3, 4, 6, 12] as const;
const gapOptions: GridGap[] = ["2", "3", "4", "6", "8"];

function GridPlayground() {
  const [cols, setCols] = useState<number>(3);
  const [gap, setGap] = useState<GridGap>("4");

  const spanPerCol = 12 / cols;

  return (
    <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
      <div style={{ display: "flex", gap: "var(--core-space-6)", flexWrap: "wrap", marginBottom: "var(--core-space-4)" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", fontWeight: 500 }}>
          Columns
          <select
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            style={{
              padding: "var(--core-space-1) var(--core-space-3)",
              borderRadius: "var(--core-radius-sm)",
              border: "1px solid var(--core-color-border-subtle)",
              fontSize: "var(--core-font-size-sm)",
              background: "var(--core-color-bg-surface)",
            }}
          >
            {columnOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", fontWeight: 500 }}>
          Gap
          <select
            value={gap}
            onChange={(e) => setGap(e.target.value as GridGap)}
            style={{
              padding: "var(--core-space-1) var(--core-space-3)",
              borderRadius: "var(--core-radius-sm)",
              border: "1px solid var(--core-color-border-subtle)",
              fontSize: "var(--core-font-size-sm)",
              background: "var(--core-color-bg-surface)",
            }}
          >
            {gapOptions.map((g) => (
              <option key={g} value={g}>gap="{g}" ({gapTokenMap[g]})</option>
            ))}
          </select>
        </label>
      </div>

      <Grid columns={12} gap={gap}>
        {Array.from({ length: cols }, (_, i) => (
          <GridCol key={i} span={spanPerCol}>
            <div style={demoBlockStyle(i)}>col-{spanPerCol}</div>
          </GridCol>
        ))}
      </Grid>
    </div>
  );
}

export default function LayoutGrid() {
  return (
    <div>
      <h1 className="site-h1">Layout &amp; Grid</h1>
      <p className="site-lede">
        The structural layer every screen is assembled from — <code>AppShell</code> (header/sidebar/main/footer),
        a 12-column <code>Grid</code>, and <code>Container</code>. Bootstrap-referenced end to end: the same
        breakpoint and container-width scale as{" "}
        <a href="#/foundations/responsive" style={{ color: "var(--site-accent)" }}>Responsive &amp; Mobile</a>.
      </p>

      <h2 className="site-section-title" id="header">App header</h2>
      <p className="site-section-sub">Anatomy — brand on the left, account/utility actions on the right; fixed height so it never reflows content below it.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Brand — left-aligned, min-width 0 (truncates before actions do)", anchor: "left" },
          { n: 2, label: "Actions — right-aligned, never shrinks", anchor: "right" },
          { n: 3, label: "Height — fixed, layout.header.height", anchor: "bottom" },
        ]}>
          <div style={{ width: 420, border: "1px solid var(--core-color-border-subtle)", borderRadius: "var(--core-card-radius)", overflow: "hidden" }}>
            <div className="cds-app-header">
              <AppHeader
                brand="Meridian"
                actions={<>
                  <IconButton variant="tertiary" size="sm" shape="circle" aria-label="Help"><Icon name="fa-solid fa-circle-question" size="sm" /></IconButton>
                  <Avatar name="Taylor Hale" size="sm" />
                </>}
              />
            </div>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Brand: left-aligned, min-width: 0 so it truncates before pushing actions off", anchor: "left" },
          { n: 2, label: "Actions: right-aligned, flex-shrink: 0 — help/theme/avatar never get squeezed", anchor: "right" },
          { n: 3, label: `Height: fixed at ${layout["header.height"]} (layout.header.height) so page content below never reflows when it re-renders`, anchor: "bottom" },
        ]} />
      </div>

      <h2 className="site-section-title" id="footer">App footer</h2>
      <p className="site-section-sub">Anatomy — copyright/legal text on the left, links on the right; wraps to stack rather than truncating either side on narrow screens.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Copyright — left, wraps first", anchor: "left" },
          { n: 2, label: "Links — right, wraps together as a group", anchor: "right" },
        ]}>
          <div style={{ width: 420, border: "1px solid var(--core-color-border-subtle)", borderRadius: "var(--core-card-radius)", overflow: "hidden" }}>
            <div className="cds-app-footer">
              <AppFooter copyright="© 2026 Meridian." links={<><a href="#">Privacy</a><a href="#">Terms</a></>} />
            </div>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Copyright: left-aligned, the first thing to wrap onto its own line if space runs out", anchor: "left" },
          { n: 2, label: "Links: right-aligned as one flex-wrap group, never interleaved with the copyright text", anchor: "right" },
        ]} />
      </div>

      <h2 className="site-section-title" id="sidebar-variants">Sidebar — responsive across all three variants</h2>
      <p className="site-section-sub">
        The <code>shell</code> variant (the one used inside <code>AppShell</code>) changes shape at every breakpoint —
        see it live on the <a href="#/components/navigation#sidebar" style={{ color: "var(--site-accent)" }}>Navigation</a> page by resizing your browser below ~768px.
      </p>
      <div className="site-panel site-panel--flush">
        <table className="spec-table">
          <thead><tr><th>Width</th><th>Shell sidebar becomes</th></tr></thead>
          <tbody>
            <tr><td>≥ 768px (desktop)</td><td>Full labeled column, {layout["sidebar.width"]} wide, icon + label side by side</td></tr>
            <tr><td>576–767px (tablet)</td><td>Icon-only rail, {layout["sidebar.railWidth"]} wide — labels stay in the DOM for screen readers, visually hidden</td></tr>
            <tr><td>&lt; 576px (phone)</td><td>Fixed bottom tab bar, full width — icon over a <em>visible</em> short label, matching the reference app's own mobile nav</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="site-section-title" id="grid">Grid &amp; Container</h2>
      <p className="site-section-sub">
        A 12-column grid inside a width-clamped Container, mobile-first
        (full width until a column's <code>spanMd</code> takes over).
      </p>
      <div className="site-panel site-panel--flush">
        <table className="spec-table">
          <thead><tr><th>Breakpoint</th><th>Container max-width</th></tr></thead>
          <tbody>
            <tr><td>xs (fluid)</td><td>100%</td></tr>
            <tr><td>sm</td><td>{container["maxWidth.sm"]}</td></tr>
            <tr><td>md</td><td>{container["maxWidth.md"]}</td></tr>
            <tr><td>lg</td><td>{container["maxWidth.lg"]}</td></tr>
            <tr><td>xl</td><td>{container["maxWidth.xl"]}</td></tr>
            <tr><td>xxl</td><td>{container["maxWidth.xxl"]}</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Basic grid ──────────────────────────────────────────── */}
      <h2 className="site-section-title" id="basic-grid">Basic grid</h2>
      <p className="site-section-sub">
        Common span combinations on a 12-column grid. Each label reads the column count that block spans.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
        {/* Row 1 — full width */}
        <Grid columns={12} gap="4">
          <GridCol span={12}><div style={demoBlockStyle(0)}>col-12</div></GridCol>
        </Grid>
        <div style={{ height: "var(--core-space-3)" }} />
        {/* Row 2 — halves */}
        <Grid columns={12} gap="4">
          <GridCol span={6}><div style={demoBlockStyle(0)}>col-6</div></GridCol>
          <GridCol span={6}><div style={demoBlockStyle(1)}>col-6</div></GridCol>
        </Grid>
        <div style={{ height: "var(--core-space-3)" }} />
        {/* Row 3 — thirds */}
        <Grid columns={12} gap="4">
          <GridCol span={4}><div style={demoBlockStyle(0)}>col-4</div></GridCol>
          <GridCol span={4}><div style={demoBlockStyle(1)}>col-4</div></GridCol>
          <GridCol span={4}><div style={demoBlockStyle(2)}>col-4</div></GridCol>
        </Grid>
        <div style={{ height: "var(--core-space-3)" }} />
        {/* Row 4 — quarters */}
        <Grid columns={12} gap="4">
          <GridCol span={3}><div style={demoBlockStyle(0)}>col-3</div></GridCol>
          <GridCol span={3}><div style={demoBlockStyle(1)}>col-3</div></GridCol>
          <GridCol span={3}><div style={demoBlockStyle(2)}>col-3</div></GridCol>
          <GridCol span={3}><div style={demoBlockStyle(3)}>col-3</div></GridCol>
        </Grid>
        <div style={{ height: "var(--core-space-3)" }} />
        {/* Row 5 — 2/3 + 1/3 */}
        <Grid columns={12} gap="4">
          <GridCol span={8}><div style={demoBlockStyle(0)}>col-8</div></GridCol>
          <GridCol span={4}><div style={demoBlockStyle(1)}>col-4</div></GridCol>
        </Grid>
        <div style={{ height: "var(--core-space-3)" }} />
        {/* Row 6 — equal thirds */}
        <Grid columns={12} gap="4">
          <GridCol span={4}><div style={demoBlockStyle(0)}>col-4</div></GridCol>
          <GridCol span={4}><div style={demoBlockStyle(1)}>col-4</div></GridCol>
          <GridCol span={4}><div style={demoBlockStyle(2)}>col-4</div></GridCol>
        </Grid>
      </div>

      {/* ── 2. Grid gutter ────────────────────────────────────────── */}
      <h2 className="site-section-title" id="grid-gutter">Grid gutter</h2>
      <p className="site-section-sub">
        The same 3-column layout rendered at every available gap token —
        notice how the gutter between blocks grows while columns share space equally.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", display: "flex", flexDirection: "column", gap: "var(--core-space-6)" }}>
        {(["2", "4", "6", "8"] as GridGap[]).map((g) => (
          <div key={g}>
            <p style={{ margin: 0, marginBottom: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", fontWeight: 600 }}>
              gap="{g}" <span style={{ fontWeight: 400, opacity: 0.7 }}>({gapTokenMap[g]})</span>
            </p>
            <Grid columns={12} gap={g}>
              <GridCol span={4}><div style={demoBlockStyle(0)}>col-4</div></GridCol>
              <GridCol span={4}><div style={demoBlockStyle(1)}>col-4</div></GridCol>
              <GridCol span={4}><div style={demoBlockStyle(2)}>col-4</div></GridCol>
            </Grid>
          </div>
        ))}
      </div>

      {/* ── 3. Column offset ──────────────────────────────────────── */}
      <h2 className="site-section-title" id="column-offset">Column offset</h2>
      <p className="site-section-sub">
        Offset is achieved by inserting an empty <code>GridCol</code> that occupies
        space without rendering visible content — functionally identical to
        Bootstrap's <code>offset-*</code> classes.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", display: "flex", flexDirection: "column", gap: "var(--core-space-4)" }}>
        {/* span 6, offset 6 */}
        <div>
          <p style={{ margin: 0, marginBottom: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", fontWeight: 600 }}>
            span 6, offset 6
          </p>
          <Grid columns={12} gap="4">
            <GridCol span={6}><div /></GridCol>
            <GridCol span={6}><div style={demoBlockStyle(1)}>col-6</div></GridCol>
          </Grid>
        </div>
        {/* span 4, offset 4 */}
        <div>
          <p style={{ margin: 0, marginBottom: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", fontWeight: 600 }}>
            span 4, offset 4
          </p>
          <Grid columns={12} gap="4">
            <GridCol span={4}><div /></GridCol>
            <GridCol span={4}><div style={demoBlockStyle(3)}>col-4</div></GridCol>
            <GridCol span={4}><div /></GridCol>
          </Grid>
        </div>
        {/* span 3, offset 3, span 3, offset 3 */}
        <div>
          <p style={{ margin: 0, marginBottom: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", fontWeight: 600 }}>
            span 3 offset 3 + span 3 offset 3
          </p>
          <Grid columns={12} gap="4">
            <GridCol span={3}><div /></GridCol>
            <GridCol span={3}><div style={demoBlockStyle(0)}>col-3</div></GridCol>
            <GridCol span={3}><div /></GridCol>
            <GridCol span={3}><div style={demoBlockStyle(2)}>col-3</div></GridCol>
          </Grid>
        </div>
      </div>

      {/* ── 4. Responsive behavior ────────────────────────────────── */}
      <h2 className="site-section-title" id="responsive-behavior">Responsive behavior</h2>
      <p className="site-section-sub">
        Columns stack full-width on mobile and reorganize at the <code>md</code> breakpoint
        (768 px). Resize your browser below 768 px to see the columns stack.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", display: "flex", flexDirection: "column", gap: "var(--core-space-4)" }}>
        <div>
          <p style={{ margin: 0, marginBottom: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", fontWeight: 600 }}>
            span=12 spanMd=6 — full-width → halves
          </p>
          <Grid columns={12} gap="4">
            <GridCol span={12} spanMd={6}><div style={demoBlockStyle(0)}>col-12 / md:col-6</div></GridCol>
            <GridCol span={12} spanMd={6}><div style={demoBlockStyle(1)}>col-12 / md:col-6</div></GridCol>
          </Grid>
        </div>
        <div>
          <p style={{ margin: 0, marginBottom: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", fontWeight: 600 }}>
            span=12 spanMd=4 — full-width → thirds
          </p>
          <Grid columns={12} gap="4">
            <GridCol span={12} spanMd={4}><div style={demoBlockStyle(0)}>col-12 / md:col-4</div></GridCol>
            <GridCol span={12} spanMd={4}><div style={demoBlockStyle(1)}>col-12 / md:col-4</div></GridCol>
            <GridCol span={12} spanMd={4}><div style={demoBlockStyle(2)}>col-12 / md:col-4</div></GridCol>
          </Grid>
        </div>
        <div>
          <p style={{ margin: 0, marginBottom: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", fontWeight: 600 }}>
            Mixed — sidebar/main flip at md
          </p>
          <Grid columns={12} gap="4">
            <GridCol span={12} spanMd={8}><div style={demoBlockStyle(0)}>col-12 / md:col-8</div></GridCol>
            <GridCol span={12} spanMd={4}><div style={demoBlockStyle(3)}>col-12 / md:col-4</div></GridCol>
          </Grid>
        </div>
      </div>

      {/* ── 5. Interactive playground ─────────────────────────────── */}
      <h2 className="site-section-title" id="interactive-playground">Interactive playground</h2>
      <p className="site-section-sub">
        Adjust the column count and gap token to see the grid reconfigure in real time.
      </p>
      <GridPlayground />

      <h2 className="site-section-title">Code</h2>
      <div className="site-panel site-panel--flush">
        <pre style={{ margin: 0, padding: 20, fontSize: 13, overflowX: "auto" }}>{`<AppShell
  header={<AppHeader brand="Meridian" actions={<Avatar name="Taylor Hale" size="sm" />} />}
  sidebar={<AppSidebar items={navItems} />}
  footer={<AppFooter copyright="© 2026 Meridian." links={<a href="/privacy">Privacy</a>} />}
>
  <Grid columns={12} gap="6">
    <GridCol span={12} spanMd={8}>...</GridCol>
    <GridCol span={12} spanMd={4}>...</GridCol>
  </Grid>
</AppShell>`}</pre>
      </div>
    </div>
  );
}
