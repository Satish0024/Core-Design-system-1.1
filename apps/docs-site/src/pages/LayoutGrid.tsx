import React from "react";
import { AppHeader, AppFooter, Grid, GridCol } from "../../../../packages/core/src/components/Layout";
import { IconButton } from "../../../../packages/core/src/components/Button";
import { Card } from "../../../../packages/core/src/components/Misc";
import { Avatar } from "../../../../packages/core/src/components/DataDisplay";
import { Icon } from "../../../../packages/core/src/components/Primitives";
import { AutoAnatomy, AutoAnatomyLegend } from "../AutoAnatomy";
import primitives from "../../../../packages/tokens/src/primitives.json";

const container = (primitives as any).container;
const layout = (primitives as any).layout;

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
                brand="LendGuard"
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
              <AppFooter copyright="© 2026 LendGuard." links={<><a href="#">Privacy</a><a href="#">Terms</a></>} />
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
      <p className="site-section-sub">Anatomy — a 12-column grid inside a width-clamped Container, mobile-first (full width until a column's <code>spanMd</code> takes over).</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Column — spans a fraction of 12", anchor: "top" },
          { n: 2, label: "Gap — space.6 (24px) between columns", anchor: "bottom" },
        ]}>
          <div style={{ width: 480 }}>
            <Grid columns={12} gap="6">
              <GridCol span={8}><Card style={{ textAlign: "center", fontSize: 13 }}>span 8</Card></GridCol>
              <GridCol span={4}><Card style={{ textAlign: "center", fontSize: 13 }}>span 4</Card></GridCol>
              <GridCol span={4}><Card style={{ textAlign: "center", fontSize: 13 }}>span 4</Card></GridCol>
              <GridCol span={4}><Card style={{ textAlign: "center", fontSize: 13 }}>span 4</Card></GridCol>
              <GridCol span={4}><Card style={{ textAlign: "center", fontSize: 13 }}>span 4</Card></GridCol>
            </Grid>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Column: GridCol span={n} — a structural fraction of the 12-column track, not a pixel width", anchor: "top" },
          { n: 2, label: "Gap: space.6 (24px), same token as the app-shell's own internal spacing", anchor: "bottom" },
        ]} />
      </div>
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

      <h2 className="site-section-title">Code</h2>
      <div className="site-panel site-panel--flush">
        <pre style={{ margin: 0, padding: 20, fontSize: 13, overflowX: "auto" }}>{`<AppShell
  header={<AppHeader brand="LendGuard" actions={<Avatar name="Taylor Hale" size="sm" />} />}
  sidebar={<AppSidebar items={navItems} />}
  footer={<AppFooter copyright="© 2026 LendGuard." links={<a href="/privacy">Privacy</a>} />}
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
