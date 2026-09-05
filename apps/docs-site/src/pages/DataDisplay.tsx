import React from "react";
import { Preview, CodeBlock } from "../Preview";
import { Card, Badge } from "../../../../packages/core/src/components/Misc";
import { Table, DataTable, Avatar, Progress } from "../../../../packages/core/src/components/DataDisplay";
import { Item } from "../../../../packages/core/src/components/Primitives";
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

      <h2 className="site-section-title">Card</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Card style={{ minWidth: 240 }}>
            <div style={{ fontSize: 13, color: "var(--core-color-text-secondary)" }}>Current balance</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>$84,213.05</div>
            <Badge tone="success">+2.4% this quarter</Badge>
          </Card>
          <Card style={{ minWidth: 240 }}>
            <div style={{ fontSize: 13, color: "var(--core-color-text-secondary)" }}>Next contribution</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>Oct 15</div>
            <Badge tone="info">Scheduled</Badge>
          </Card>
        </Preview>
      </div>

      <h2 className="site-section-title">Badge tones</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <Badge tone="info">Info</Badge>
        </Preview>
      </div>

      <h2 className="site-section-title">Table</h2>
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

      <h2 className="site-section-title">Data Table (sortable, paginated)</h2>
      <p className="site-section-sub">Click a column header to sort. Extends Table with client-side sort + pagination for larger lists.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <DataTable
            pageSize={4}
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

      <h2 className="site-section-title">Item (generic list row)</h2>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <Item title="Roth 401(k)" description="62% of portfolio" action={<Button variant="secondary" size="sm">Manage</Button>} />
          <Item title="Traditional 401(k)" description="38% of portfolio" action={<Button variant="secondary" size="sm">Manage</Button>} />
        </div>
      </div>

      <h2 className="site-section-title">Avatar</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Avatar name="Jordan Lee" size="sm" />
          <Avatar name="Jordan Lee" size="md" />
          <Avatar name="Jordan Lee" size="lg" />
        </Preview>
      </div>

      <h2 className="site-section-title">Progress</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 280 }}>
            <Progress value={68} label="Retirement readiness — 68%" />
          </div>
        </Preview>
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
