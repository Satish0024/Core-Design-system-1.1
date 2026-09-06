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

      {/* ═══════════════════════════════════════════════════════════════
           COMMON PAGE LAYOUTS — real-world patterns from the product
           ═══════════════════════════════════════════════════════════════ */}
      <h2 className="site-section-title" id="page-layouts">Common page layouts</h2>
      <p className="site-section-sub">
        Real-world layout patterns extracted from the product screens. Each pattern shows the
        grid split, what goes where, and when to use it. All layouts stack to full-width on mobile
        (&lt; 768 px).
      </p>

      {/* ── Pattern 1: Login / Onboarding — 50/50 ─── */}
      <h3 className="site-section-title" style={{ fontSize: 16 }} id="layout-login">Login / Onboarding — 50 · 50</h3>
      <p className="site-section-sub">
        Full-bleed split: brand hero panel on the left, authentication form on the right.
        No sidebar, no header — standalone page. On mobile, the brand panel sits above the form.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", padding: 0, overflow: "hidden", borderRadius: "var(--core-radius-md)" }}>
        <Grid columns={12} gap="0">
          <GridCol span={12} spanMd={6}>
            <div style={{
              background: "linear-gradient(135deg, var(--core-color-brand-700), var(--core-color-brand-900))",
              color: "#fff",
              padding: "var(--core-space-8)",
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "var(--core-space-2)",
            }}>
              <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.7 }}>span 6 · Brand hero</div>
              <div style={{ fontSize: "var(--core-font-size-lg)", fontWeight: 700 }}>Your Path To A Confident Retirement.</div>
              <div style={{ fontSize: "var(--core-font-size-sm)", opacity: 0.8 }}>Access your 401(k), deferrals, and retirement tools in one secure portal.</div>
            </div>
          </GridCol>
          <GridCol span={12} spanMd={6}>
            <div style={{
              background: "var(--core-color-surface-raised)",
              padding: "var(--core-space-8)",
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "var(--core-space-4)",
            }}>
              <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-tertiary)" }}>span 6 · Sign-in form</div>
              <div style={{ fontSize: "var(--core-font-size-lg)", fontWeight: 700, color: "var(--core-color-text-primary)" }}>Sign in</div>
              <div style={{ height: 36, borderRadius: "var(--core-radius-sm)", border: "1px solid var(--core-color-border-default)", background: "var(--core-color-surface-default)", padding: "0 var(--core-space-3)", display: "flex", alignItems: "center", color: "var(--core-color-text-tertiary)", fontSize: "var(--core-font-size-sm)" }}>you@email.com</div>
              <div style={{ height: 36, borderRadius: "var(--core-radius-sm)", border: "1px solid var(--core-color-border-default)", background: "var(--core-color-surface-default)", padding: "0 var(--core-space-3)", display: "flex", alignItems: "center", color: "var(--core-color-text-tertiary)", fontSize: "var(--core-font-size-sm)" }}>Enter password</div>
              <div style={{ height: 36, borderRadius: "var(--core-radius-sm)", background: "var(--core-color-action-primary-bg)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "var(--core-font-size-sm)" }}>Sign in</div>
            </div>
          </GridCol>
        </Grid>
      </div>
      <div className="site-panel site-panel--flush" style={{ marginTop: 8 }}>
        <table className="spec-table">
          <thead><tr><th>Column</th><th>Span</th><th>Content</th></tr></thead>
          <tbody>
            <tr><td>Left</td><td>span 6 (50%)</td><td>Brand hero — gradient background, logo, tagline, marketing copy</td></tr>
            <tr><td>Right</td><td>span 6 (50%)</td><td>Auth form — email, password, submit button, links</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Pattern 2: Dashboard — 8/4 main + sidebar ─── */}
      <h3 className="site-section-title" style={{ fontSize: 16 }} id="layout-dashboard-summary">Dashboard summary — 8 · 4</h3>
      <p className="site-section-sub">
        Primary content area (balance summary, key metrics) in 8 columns, with a promotional
        or contextual card in the remaining 4 columns. The dominant pattern for dashboard top sections.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
        <Grid columns={12} gap="4">
          <GridCol span={12} spanMd={8}>
            <div style={{
              background: "var(--core-color-surface-raised)",
              borderRadius: "var(--core-radius-md)",
              padding: "var(--core-space-6)",
              minHeight: 140,
              border: "1px solid var(--core-color-border-subtle)",
            }}>
              <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-tertiary)", marginBottom: "var(--core-space-3)" }}>span 8 · Summary card</div>
              <div style={{ display: "flex", gap: "var(--core-space-8)", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "var(--core-font-size-xs)", color: "var(--core-color-text-secondary)" }}>Account balance</div>
                  <div style={{ fontSize: "var(--core-font-size-xl)", fontWeight: 800, color: "var(--core-color-text-primary)" }}>$14,590.00</div>
                </div>
                <div>
                  <div style={{ fontSize: "var(--core-font-size-xs)", color: "var(--core-color-text-secondary)" }}>Vested balance</div>
                  <div style={{ fontSize: "var(--core-font-size-xl)", fontWeight: 800, color: "var(--core-color-text-primary)" }}>$13,870.00</div>
                </div>
              </div>
            </div>
          </GridCol>
          <GridCol span={12} spanMd={4}>
            <div style={{
              background: "var(--core-promoCard-bg, linear-gradient(135deg, var(--core-color-brand-600), var(--core-color-brand-800)))",
              borderRadius: "var(--core-radius-md)",
              padding: "var(--core-space-6)",
              minHeight: 140,
              color: "#fff",
            }}>
              <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.8 }}>span 4 · Promo card</div>
              <div style={{ fontSize: "var(--core-font-size-md)", fontWeight: 700, margin: "var(--core-space-2) 0" }}>Retirement Readiness</div>
              <div style={{ fontSize: "var(--core-font-size-sm)", opacity: 0.85 }}>See how your inputs affect your savings.</div>
            </div>
          </GridCol>
        </Grid>
      </div>
      <div className="site-panel site-panel--flush" style={{ marginTop: 8 }}>
        <table className="spec-table">
          <thead><tr><th>Column</th><th>Span</th><th>Content</th></tr></thead>
          <tbody>
            <tr><td>Main</td><td>span 8 (67%)</td><td>Account balance, vested balance, key metrics, "View summary" action</td></tr>
            <tr><td>Aside</td><td>span 4 (33%)</td><td>Promotional card — gradient background, CTA (e.g. Retirement Readiness)</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Pattern 3: Dashboard plans — 4/4/4 ─── */}
      <h3 className="site-section-title" style={{ fontSize: 16 }} id="layout-dashboard-plans">Dashboard plans — 4 · 4 · 4</h3>
      <p className="site-section-sub">
        Equal thirds for plan cards, learning modules, or feature tiles. Each card is self-contained
        with its own status badge, balance info, and actions.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
        <Grid columns={12} gap="4">
          {["401(k) Plan", "Roth 401(k) Plan", "Financial Wellness"].map((name, i) => (
            <GridCol key={name} span={12} spanMd={4}>
              <div style={{
                background: i === 2 ? "var(--core-promoCard-bg, linear-gradient(135deg, var(--core-color-brand-600), var(--core-color-brand-800)))" : "var(--core-color-surface-raised)",
                borderRadius: "var(--core-radius-md)",
                padding: "var(--core-space-5)",
                minHeight: 100,
                border: i === 2 ? "none" : "1px solid var(--core-color-border-subtle)",
                color: i === 2 ? "#fff" : "var(--core-color-text-primary)",
              }}>
                <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.6, marginBottom: "var(--core-space-2)" }}>span 4</div>
                <div style={{ fontSize: "var(--core-font-size-md)", fontWeight: 700 }}>{name}</div>
                <div style={{ fontSize: "var(--core-font-size-sm)", opacity: 0.7, marginTop: "var(--core-space-1)" }}>{i === 2 ? "Learning module" : "Plan card"}</div>
              </div>
            </GridCol>
          ))}
        </Grid>
      </div>

      {/* ── Pattern 4: Dashboard — 6/6 halves ─── */}
      <h3 className="site-section-title" style={{ fontSize: 16 }} id="layout-dashboard-halves">Dashboard cards — 6 · 6</h3>
      <p className="site-section-sub">
        Equal halves for content that's equally weighted — plan cards, comparison panels,
        or side-by-side info blocks.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
        <Grid columns={12} gap="4">
          {["Deferred Comp Plan", "Cash Balance Plan"].map((name) => (
            <GridCol key={name} span={12} spanMd={6}>
              <div style={{
                background: "var(--core-color-surface-raised)",
                borderRadius: "var(--core-radius-md)",
                padding: "var(--core-space-5)",
                minHeight: 80,
                border: "1px solid var(--core-color-border-subtle)",
              }}>
                <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-tertiary)", marginBottom: "var(--core-space-2)" }}>span 6</div>
                <div style={{ fontSize: "var(--core-font-size-md)", fontWeight: 700, color: "var(--core-color-text-primary)" }}>{name}</div>
                <div style={{ fontSize: "var(--core-font-size-sm)", color: "var(--core-color-text-secondary)", marginTop: "var(--core-space-1)" }}>Plan details, balance, status</div>
              </div>
            </GridCol>
          ))}
        </Grid>
      </div>

      {/* ── Pattern 5: Multi-step form — 3/9 ─── */}
      <h3 className="site-section-title" style={{ fontSize: 16 }} id="layout-form-stepper">Multi-step form — 3 · 9</h3>
      <p className="site-section-sub">
        A narrow stepper/navigation column on the left (3 cols), paired with the main form
        area (9 cols). Used for loan requests, enrollment flows, and any multi-step wizard.
        On mobile, the stepper moves above the form as a horizontal progress bar.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
        <Grid columns={12} gap="4">
          <GridCol span={12} spanMd={3}>
            <div style={{
              background: "var(--core-color-surface-raised)",
              borderRadius: "var(--core-radius-md)",
              padding: "var(--core-space-5)",
              minHeight: 200,
              border: "1px solid var(--core-color-border-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--core-space-3)",
            }}>
              <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-tertiary)" }}>span 3 · Stepper</div>
              {["Loan Details", "Payment & Fee", "Upload Docs", "Summary"].map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "var(--core-space-2)" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: i === 0 ? "var(--core-color-action-primary-bg)" : "var(--core-color-surface-sunken)",
                    color: i === 0 ? "#fff" : "var(--core-color-text-secondary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700,
                  }}>{i + 1}</div>
                  <span style={{ fontSize: "var(--core-font-size-sm)", fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "var(--core-color-action-primary-bg)" : "var(--core-color-text-secondary)" }}>{step}</span>
                </div>
              ))}
            </div>
          </GridCol>
          <GridCol span={12} spanMd={9}>
            <div style={{
              background: "var(--core-color-surface-raised)",
              borderRadius: "var(--core-radius-md)",
              padding: "var(--core-space-6)",
              minHeight: 200,
              border: "1px solid var(--core-color-border-subtle)",
            }}>
              <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-tertiary)", marginBottom: "var(--core-space-4)" }}>span 9 · Form content</div>
              <div style={{ fontSize: "var(--core-font-size-md)", fontWeight: 700, color: "var(--core-color-text-primary)", marginBottom: "var(--core-space-4)" }}>Loan Details</div>
              <Grid columns={12} gap="4">
                <GridCol span={12} spanMd={6}>
                  <div style={{ fontSize: "var(--core-font-size-sm)", fontWeight: 600, color: "var(--core-color-text-primary)", marginBottom: "var(--core-space-1)" }}>Select Loan type *</div>
                  <div style={{ height: 36, borderRadius: "var(--core-radius-sm)", border: "1px solid var(--core-color-border-default)", background: "var(--core-color-surface-default)", padding: "0 var(--core-space-3)", display: "flex", alignItems: "center", color: "var(--core-color-text-tertiary)", fontSize: "var(--core-font-size-sm)" }}>Select</div>
                </GridCol>
                <GridCol span={12} spanMd={6}>
                  <div style={{ fontSize: "var(--core-font-size-sm)", fontWeight: 600, color: "var(--core-color-text-primary)", marginBottom: "var(--core-space-1)" }}>Reason for loan</div>
                  <div style={{ height: 36, borderRadius: "var(--core-radius-sm)", border: "1px solid var(--core-color-border-default)", background: "var(--core-color-surface-default)", padding: "0 var(--core-space-3)", display: "flex", alignItems: "center", color: "var(--core-color-text-tertiary)", fontSize: "var(--core-font-size-sm)" }}>e.g. Educational purpose</div>
                </GridCol>
              </Grid>
            </div>
          </GridCol>
        </Grid>
      </div>
      <div className="site-panel site-panel--flush" style={{ marginTop: 8 }}>
        <table className="spec-table">
          <thead><tr><th>Column</th><th>Span</th><th>Content</th></tr></thead>
          <tbody>
            <tr><td>Left</td><td>span 3 (25%)</td><td>Step navigation — numbered steps, current step highlighted, progress state</td></tr>
            <tr><td>Right</td><td>span 9 (75%)</td><td>Form body — fields, validation, nested 6/6 grid for side-by-side inputs</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Pattern 6: Form fields — nested 6/6 ─── */}
      <h3 className="site-section-title" style={{ fontSize: 16 }} id="layout-form-fields">Form fields — 6 · 6 (nested)</h3>
      <p className="site-section-sub">
        Inside a form, fields that belong together are placed side by side in a 6/6 split.
        Labels like "Loan repayment method" and "Loan repayment frequency" pair naturally.
        On mobile, they stack to full-width.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
        <div style={{ background: "var(--core-color-surface-raised)", borderRadius: "var(--core-radius-md)", padding: "var(--core-space-6)", border: "1px solid var(--core-color-border-subtle)" }}>
          <Grid columns={12} gap="4">
            <GridCol span={12} spanMd={6}>
              <div style={{ fontSize: "var(--core-font-size-sm)", fontWeight: 600, color: "var(--core-color-text-primary)", marginBottom: "var(--core-space-1)" }}>Loan repayment method *</div>
              <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-tertiary)", marginBottom: "var(--core-space-2)" }}>span 6</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-2)" }}>
                {["Payroll deduction", "Direct payment", "Both"].map((opt, i) => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: "var(--core-space-2)", fontSize: "var(--core-font-size-sm)", color: "var(--core-color-text-primary)" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", border: i === 0 ? "5px solid var(--core-color-action-primary-bg)" : "2px solid var(--core-color-border-default)", background: "var(--core-color-surface-default)" }} />
                    {opt}
                  </label>
                ))}
              </div>
            </GridCol>
            <GridCol span={12} spanMd={6}>
              <div style={{ fontSize: "var(--core-font-size-sm)", fontWeight: 600, color: "var(--core-color-text-primary)", marginBottom: "var(--core-space-1)" }}>Loan repayment frequency *</div>
              <div style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-tertiary)", marginBottom: "var(--core-space-2)" }}>span 6</div>
              <div style={{ height: 36, borderRadius: "var(--core-radius-sm)", border: "1px solid var(--core-color-border-default)", background: "var(--core-color-surface-default)", padding: "0 var(--core-space-3)", display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--core-color-text-primary)", fontSize: "var(--core-font-size-sm)" }}>
                Monthly <span style={{ color: "var(--core-color-text-tertiary)" }}>▾</span>
              </div>
            </GridCol>
          </Grid>
        </div>
      </div>

      {/* ── Summary table ─── */}
      <h3 className="site-section-title" style={{ fontSize: 16 }} id="layout-summary">Layout cheat sheet</h3>
      <div className="site-panel site-panel--flush">
        <table className="spec-table">
          <thead><tr><th>Pattern</th><th>Grid split</th><th>When to use</th></tr></thead>
          <tbody>
            <tr><td><strong>Login / Onboarding</strong></td><td>6 · 6</td><td>Full-bleed auth pages — brand panel + form, no shell</td></tr>
            <tr><td><strong>Dashboard summary</strong></td><td>8 · 4</td><td>Primary content area + promotional/contextual sidebar card</td></tr>
            <tr><td><strong>Dashboard cards</strong></td><td>4 · 4 · 4</td><td>Equal-weight tiles — plans, modules, feature cards</td></tr>
            <tr><td><strong>Dashboard halves</strong></td><td>6 · 6</td><td>Two equally weighted content blocks — plan cards, comparisons</td></tr>
            <tr><td><strong>Multi-step form</strong></td><td>3 · 9</td><td>Stepper/nav sidebar + form body — wizards, enrollment, loan requests</td></tr>
            <tr><td><strong>Form fields</strong></td><td>6 · 6 (nested)</td><td>Side-by-side inputs inside a form — related field pairs</td></tr>
          </tbody>
        </table>
      </div>

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
