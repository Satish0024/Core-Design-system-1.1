import React from "react";
import { Preview, CodeBlock } from "../Preview";
import { Card, Badge } from "../../../../packages/core/src/components/Misc";
import { Table, DataTable, Avatar, AvatarGroup, Progress } from "../../../../packages/core/src/components/DataDisplay";
import { Item, AspectRatio, DescriptionList } from "../../../../packages/core/src/components/Primitives";
import { Button } from "../../../../packages/core/src/components/Button";

const manyRows = [
  { id: 1, date: "Sep 01, 2026", type: "Contribution", amount: 412.5, status: "success" as const },
  { id: 2, date: "Aug 15, 2026", type: "Dividend", amount: 18.2, status: "success" as const },
  { id: 3, date: "Aug 01, 2026", type: "Contribution", amount: 412.5, status: "warning" as const },
  { id: 4, date: "Jul 15, 2026", type: "Fee", amount: -4, status: "danger" as const },
  { id: 5, date: "Jul 01, 2026", type: "Contribution", amount: 400, status: "success" as const },
  { id: 6, date: "Jun 15, 2026", type: "Dividend", amount: 15.1, status: "success" as const },
  { id: 7, date: "Jun 01, 2026", type: "Contribution", amount: 400, status: "success" as const },
];

const rows = [
  { id: 1, date: "Sep 01, 2026", type: "Contribution", amount: "$412.50", status: "success" as const },
  { id: 2, date: "Aug 15, 2026", type: "Dividend", amount: "$18.20", status: "success" as const },
  { id: 3, date: "Aug 01, 2026", type: "Contribution", amount: "$412.50", status: "warning" as const },
  { id: 4, date: "Jul 15, 2026", type: "Fee", amount: "-$4.00", status: "danger" as const },
];

export default function DataDisplay() {
  return (
    <div>
      <h1 className="site-h1">Card, Badge, Table, Avatar &amp; Progress</h1>
      <p className="site-lede">The core containers and readouts for metrics, lists, and summaries across both portals.</p>

      <h2 className="site-section-title" id="card">Card</h2>
      <table className="spec-table" style={{ marginBottom: 20 }}>
        <thead><tr><th>Property</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Padding</td><td>20px</td></tr>
          <tr><td>Border radius</td><td><code>card.radius</code> — 8px on CORE</td></tr>
          <tr><td>Shadow</td><td><code>elevation.1</code> (default/outlined) — none on interactive until hover (<code>elevation.2</code>)</td></tr>
        </tbody>
      </table>
      <p className="site-section-sub">Three variants: default (elevated), outlined (flat border, for dense layouts), and interactive (clickable, hover/focus states).</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Card style={{ minWidth: 220 }}>
            <div style={{ fontSize: 13, color: "var(--core-color-text-secondary)" }}>Default</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>$84,213.05</div>
          </Card>
          <Card variant="outlined" style={{ minWidth: 220 }}>
            <div style={{ fontSize: 13, color: "var(--core-color-text-secondary)" }}>Outlined</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>Oct 15</div>
          </Card>
          <Card variant="interactive" style={{ minWidth: 220 }} onClick={() => {}}>
            <div style={{ fontSize: 13, color: "var(--core-color-text-secondary)" }}>Interactive — click me</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>Roth 401(k)</div>
          </Card>
        </Preview>
      </div>

      <h2 className="site-section-title" id="badge">Badge</h2>
      <table className="spec-table" style={{ marginBottom: 20 }}>
        <thead><tr><th>Property</th><th>Small</th><th>Medium (default)</th></tr></thead>
        <tbody>
          <tr><td>Padding</td><td>1px 7px</td><td>2px 10px</td></tr>
          <tr><td>Font size</td><td>10px</td><td>12px</td></tr>
          <tr><td>Radius</td><td colSpan={2}>Fully rounded (<code>badge.radius</code>)</td></tr>
        </tbody>
      </table>
      <p className="site-section-sub">5 tones × 3 styles (soft/outline/solid) × 2 sizes.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch", gap: 12 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["neutral", "success", "warning", "danger", "info"] as const).map((t) => <Badge key={t} tone={t} variant="soft">{t}</Badge>)}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["neutral", "success", "warning", "danger", "info"] as const).map((t) => <Badge key={t} tone={t} variant="outline">{t}</Badge>)}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["neutral", "success", "warning", "danger", "info"] as const).map((t) => <Badge key={t} tone={t} variant="solid">{t}</Badge>)}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Badge tone="info" size="md">Medium</Badge>
            <Badge tone="info" size="sm">Small</Badge>
          </div>
        </div>
      </div>

      <h2 className="site-section-title" id="table">Table</h2>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <Table
            columns={[
              { key: "date", header: "Date" },
              { key: "type", header: "Type" },
              { key: "amount", header: "Amount" },
              { key: "status", header: "Status", render: (r) => <Badge tone={r.status}>{r.status === "success" ? "Posted" : r.status === "warning" ? "Pending" : "Failed"}</Badge> },
            ]}
            rows={rows}
          />
        </div>
      </div>

      <h2 className="site-section-title" id="data-table">Data Table (sortable, filterable, paginated)</h2>
      <p className="site-section-sub">Click a column header to sort, type to search, or pick a status filter — all client-side, combined together.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <DataTable
            pageSize={4}
            searchable
            searchPlaceholder="Search transactions…"
            filters={[
              { key: "status", label: "Status", options: [
                { value: "success", label: "Posted" },
                { value: "warning", label: "Pending" },
                { value: "danger", label: "Failed" },
              ] },
              { key: "type", label: "Type", options: [
                { value: "Contribution", label: "Contribution" },
                { value: "Dividend", label: "Dividend" },
                { value: "Fee", label: "Fee" },
              ] },
            ]}
            columns={[
              { key: "date", header: "Date", sortable: true },
              { key: "type", header: "Type", sortable: true },
              { key: "amount", header: "Amount", sortable: true, render: (r) => `$${r.amount.toFixed(2)}` },
              { key: "status", header: "Status", render: (r) => <Badge tone={r.status}>{r.status === "success" ? "Posted" : r.status === "warning" ? "Pending" : "Failed"}</Badge> },
            ]}
            rows={manyRows}
          />
        </div>
      </div>

      <h2 className="site-section-title" id="item">Item (generic list row)</h2>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <Item title="Roth 401(k)" description="62% of portfolio" action={<Button variant="secondary" size="sm">Manage</Button>} />
          <Item title="Traditional 401(k)" description="38% of portfolio" action={<Button variant="secondary" size="sm">Manage</Button>} />
        </div>
      </div>

      <h2 className="site-section-title" id="description-list">Description List</h2>
      <p className="site-section-sub">Label/value pairs — profile details, plan summaries, review screens. Semantic <code>&lt;dl&gt;/&lt;dt&gt;/&lt;dd&gt;</code>, announced as a unit by screen readers.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <div style={{ width: "100%" }}>
            <div className="site-nav-title" style={{ padding: "0 0 8px" }}>Stacked, 2 columns</div>
            <DescriptionList
              columns={2}
              items={[
                { term: "Name", value: "Jordan Lee" },
                { term: "Marital status", value: "Married" },
                { term: "Date of birth", value: "Apr 8, 1994" },
                { term: "SSN", value: "XXX-XX-4182" },
              ]}
            />
          </div>
        </div>
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", borderTop: "1px solid var(--core-color-border-subtle)" }}>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <div className="site-nav-title" style={{ padding: "0 0 8px" }}>Inline (row-separated)</div>
            <DescriptionList
              orientation="inline"
              items={[
                { term: "Plan balance", value: "$12,840.00" },
                { term: "Vested balance", value: "$9,620.00" },
              ]}
            />
          </div>
        </div>
      </div>

      <h2 className="site-section-title" id="avatar">Avatar</h2>
      <table className="spec-table" style={{ marginBottom: 20 }}>
        <thead><tr><th>Property</th><th>Small</th><th>Medium (default)</th><th>Large</th></tr></thead>
        <tbody>
          <tr><td>Size</td><td>24×24px</td><td>36×36px</td><td>48×48px</td></tr>
          <tr><td>Font size</td><td>10px</td><td>13px</td><td>16px</td></tr>
          <tr><td>Status dot</td><td colSpan={3}>9×9px, 2px border matching surface color, bottom-right</td></tr>
        </tbody>
      </table>
      <p className="site-section-sub">Sizes, status indicator, and grouped/stacked avatars.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Avatar name="Jordan Lee" size="sm" />
          <Avatar name="Jordan Lee" size="md" />
          <Avatar name="Jordan Lee" size="lg" />
          <Avatar name="Jordan Lee" size="lg" status="online" />
          <Avatar name="Jordan Lee" size="lg" status="away" />
          <Avatar name="Jordan Lee" size="lg" status="offline" />
          <AvatarGroup avatars={[{ name: "Jordan Lee" }, { name: "Sam Park" }, { name: "Ada Osei" }, { name: "Lee Kim" }, { name: "Nia Brooks" }]} max={3} />
        </Preview>
      </div>

      <h2 className="site-section-title" id="progress">Progress</h2>
      <table className="spec-table" style={{ marginBottom: 20 }}>
        <thead><tr><th>Property</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Track height</td><td>8px, fully rounded</td></tr>
          <tr><td>Indeterminate segment</td><td>40% width, animates left to right over 1.2s</td></tr>
        </tbody>
      </table>
      <p className="site-section-sub">Determinate for a known percentage; indeterminate while duration is unknown (e.g. a submission in flight).</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 20 }}>
            <Progress value={68} label="Retirement readiness — 68%" />
            <Progress indeterminate label="Submitting your request…" />
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title" id="aspect-ratio">Aspect Ratio</h2>
      <p className="site-section-sub">Locks a media container to a ratio regardless of content size — for illustrations, video embeds, or document previews.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <div style={{ width: 240 }}>
            <AspectRatio ratio={16 / 9}>
              <div style={{ background: "var(--core-color-surface-sunken)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--core-color-text-tertiary)", borderRadius: "var(--core-radius-md)" }}>16:9</div>
            </AspectRatio>
          </div>
          <div style={{ width: 160 }}>
            <AspectRatio ratio={1}>
              <div style={{ background: "var(--core-color-surface-sunken)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--core-color-text-tertiary)", borderRadius: "var(--core-radius-md)" }}>1:1</div>
            </AspectRatio>
          </div>
        </div>
      </div>

      <h2 className="site-section-title">Accessibility</h2>
      <ul style={{ color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
        <li>Table uses semantic <code>&lt;table&gt;</code>/<code>&lt;th scope="col"&gt;</code> markup — screen readers announce row/column context correctly.</li>
        <li>Progress exposes <code>role="progressbar"</code> with <code>aria-valuenow/min/max</code>.</li>
        <li>Avatar falls back to initials with an <code>aria-label</code> of the full name when no image is available.</li>
      </ul>

      <h2 className="site-section-title">Code</h2>
      <CodeBlock>{`<Table columns={columns} rows={transactions} />
<Avatar name="Jordan Lee" size="md" />
<Progress value={68} label="Retirement readiness — 68%" />`}</CodeBlock>
    </div>
  );
}
