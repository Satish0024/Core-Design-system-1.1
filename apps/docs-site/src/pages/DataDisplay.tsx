import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { Anatomy, AnatomyLegend } from "../Anatomy";
import { Card, Badge, BadgeTone, BadgeSize } from "../../../../packages/core/src/components/Misc";
import { Table, DataTable, Avatar, AvatarGroup, Progress } from "../../../../packages/core/src/components/DataDisplay";
import { Item, DescriptionList } from "../../../../packages/core/src/components/Primitives";
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

function BadgeMatrixDemo() {
  const [size, setSize] = useState<BadgeSize>("md");
  const tones: BadgeTone[] = ["primary", "neutral", "success", "warning", "danger", "info"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Interactive Control Toolbar - Size Tabswitch */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "var(--site-bg-elevated, #FFFFFF)",
          border: "1px solid var(--site-border, rgba(128,128,128,0.18))",
          borderRadius: 12,
          padding: "12px 18px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
        }}
      >
        <span
          style={{
            fontSize: "var(--core-font-size-xs, 12px)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--site-text-dim, #787887)",
          }}
        >
          Size:
        </span>
        <div
          style={{
            display: "inline-flex",
            background: "var(--site-bg, rgba(128,128,128,0.08))",
            borderRadius: 8,
            padding: 3,
            border: "1px solid var(--site-border, rgba(128,128,128,0.15))",
          }}
        >
          {(["md", "sm"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              style={{
                border: "none",
                background: size === s ? "var(--theme-brand-background-primary-default, #1F4F8D)" : "transparent",
                color: size === s ? "#FFFFFF" : "var(--site-text, inherit)",
                borderRadius: 6,
                padding: "5px 14px",
                fontSize: "var(--core-font-size-xs, 12px)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 120ms ease",
              }}
            >
              {s === "md" ? "Medium (md)" : "Small (sm)"}
            </button>
          ))}
        </div>
      </div>

      {/* Complete All Tones Matrix Surface */}
      <div className="site-panel site-panel--flush">
        <div
          className="preview-surface"
          data-theme="core"
          data-mode="light"
          style={{
            background: "var(--core-color-bg-page)",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 16,
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              fontSize: "var(--core-font-size-xs, 12px)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--site-text-dim)",
              marginBottom: 4,
            }}
          >
            Complete Tone &amp; State Matrix (Soft Tinted Style)
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="cds-table" data-density="comfortable">
              <thead>
                <tr>
                  <th scope="col" style={{ width: 110, fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Tone</th>
                  <th scope="col" style={{ fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Default</th>
                  <th scope="col" style={{ fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Hover</th>
                  <th scope="col" style={{ fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>With Dot</th>
                  <th scope="col" style={{ fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Removable</th>
                  <th scope="col" style={{ fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Disable</th>
                </tr>
              </thead>
              <tbody>
                {tones.map((t) => (
                  <tr key={t}>
                    <td style={{ fontSize: "var(--core-font-size-sm, 14px)", fontWeight: 600, textTransform: "capitalize", color: "var(--core-color-text-primary)" }}>{t}</td>
                    <td>
                      <Badge tone={t} size={size} variant="soft">
                        {t}
                      </Badge>
                    </td>
                    <td>
                      <div className="force-hover" style={{ display: "inline-block" }}>
                        <Badge tone={t} size={size} variant="soft" interactive className={`cds-badge-state--hover cds-badge--${t}`}>
                          {t}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <Badge tone={t} size={size} variant="soft" dot>
                        with dot
                      </Badge>
                    </td>
                    <td>
                      <Badge tone={t} size={size} variant="soft" onRemove={() => {}}>
                        removable
                      </Badge>
                    </td>
                    <td>
                      <div className="force-disabled" style={{ display: "inline-block" }}>
                        <Badge tone={t} size={size} variant="soft" disabled>
                          {t}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const sampleAvatars = [
  { name: "Jordan Lee" },
  { name: "Sam Park" },
  { name: "Ada Osei" },
  { name: "Lee Kim" },
  { name: "Nia Brooks" },
];

function AvatarSizeDemo() {
  return (
    <div className="site-panel site-panel--flush">
      <div
        className="preview-surface"
        data-theme="core"
        data-mode="light"
        style={{
          background: "var(--core-color-bg-page)",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "24px 28px",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table className="cds-table" data-density="comfortable">
            <thead>
              <tr>
                <th scope="col" style={{ width: 140, fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Component</th>
                <th scope="col" style={{ fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Small (sm) — 24px</th>
                <th scope="col" style={{ fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Medium (md) — 36px</th>
                <th scope="col" style={{ fontSize: "var(--core-font-size-xs, 12px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Large (lg) — 48px</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontSize: "var(--core-font-size-sm, 14px)", fontWeight: 600, color: "var(--core-color-text-primary)" }}>Single Avatar</td>
                <td>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Avatar name="Jordan Lee" size="sm" />
                    <Avatar name="Sam Park" size="sm" />
                  </div>
                </td>
                <td>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Avatar name="Jordan Lee" size="md" />
                    <Avatar name="Sam Park" size="md" />
                  </div>
                </td>
                <td>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Avatar name="Jordan Lee" size="lg" />
                    <Avatar name="Sam Park" size="lg" />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ fontSize: "var(--core-font-size-sm, 14px)", fontWeight: 600, color: "var(--core-color-text-primary)" }}>Avatar Group</td>
                <td>
                  <AvatarGroup avatars={sampleAvatars} size="sm" max={3} />
                </td>
                <td>
                  <AvatarGroup avatars={sampleAvatars} size="md" max={3} />
                </td>
                <td>
                  <AvatarGroup avatars={sampleAvatars} size="lg" max={3} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function DataDisplay() {
  const sections = [
    {
      id: "01",
      anchorId: "card",
      title: "Card",
      description: "Default elevated, flat outlined, and interactive clickable card surfaces with elevation tokens.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <table className="spec-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Padding</td>
                <td>20px</td>
              </tr>
              <tr>
                <td>Border radius</td>
                <td>
                  <code>card.radius</code> — 8px on CORE
                </td>
              </tr>
              <tr>
                <td>Shadow</td>
                <td>
                  <code>elevation.1</code> (default/outlined) — none on interactive until hover (<code>elevation.2</code>)
                </td>
              </tr>
            </tbody>
          </table>

          <div className="site-panel site-panel--flush">
            <Preview>
              <Card style={{ minWidth: 220 }}>
                <div style={{ fontSize: "var(--core-font-size-sm, 14px)", color: "var(--core-color-text-secondary)" }}>Default</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4, color: "var(--core-color-text-primary)" }}>
                  $84,213.05
                </div>
              </Card>
              <Card variant="outlined" style={{ minWidth: 220 }}>
                <div style={{ fontSize: "var(--core-font-size-sm, 14px)", color: "var(--core-color-text-secondary)" }}>Outlined</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4, color: "var(--core-color-text-primary)" }}>
                  Oct 15
                </div>
              </Card>
              <Card variant="interactive" style={{ minWidth: 220 }} onClick={() => {}}>
                <div style={{ fontSize: "var(--core-font-size-sm, 14px)", color: "var(--core-color-text-secondary)" }}>Interactive — click me</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4, color: "var(--core-color-text-primary)" }}>
                  Roth 401(k)
                </div>
              </Card>
            </Preview>
          </div>


        </div>
      ),
    },
    {
      id: "02",
      anchorId: "badge",
      title: "Badge",
      description:
        "Soft tinted badge component matrix showcasing interactive states (Default, Hover, Variant, Disable) and size switches.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <table className="spec-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Small (sm)</th>
                <th>Medium (md - default)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Padding</td>
                <td>2px 8px</td>
                <td>4px 12px</td>
              </tr>
              <tr>
                <td>Font size</td>
                <td>12px (<code>font.size.xs</code>)</td>
                <td>14px (<code>font.size.sm</code>)</td>
              </tr>
              <tr>
                <td>Radius</td>
                <td colSpan={2}>
                  Fully rounded (<code>badge.radius</code>)
                </td>
              </tr>
            </tbody>
          </table>

          <BadgeMatrixDemo />


        </div>
      ),
    },
    {
      id: "03",
      anchorId: "data-table",
      title: "Table & Data Table",
      description: "Static and interactive data grids with sorting, filtering, and client-side pagination.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* 1. Basic Data Table */}
          <div id="table">
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--site-text-dim)",
                marginBottom: 8,
              }}
            >
              Basic Data Table
            </div>
            <div className="site-panel site-panel--flush">
              <div
                className="preview-surface"
                data-theme="core"
                data-mode="light"
                style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}
              >
                <Table
                  columns={[
                    { key: "date", header: "Date" },
                    { key: "type", header: "Type" },
                    { key: "amount", header: "Amount" },
                    {
                      key: "status",
                      header: "Status",
                      render: (r) => (
                        <Badge tone={r.status}>
                          {r.status === "success" ? "Posted" : r.status === "warning" ? "Pending" : "Failed"}
                        </Badge>
                      ),
                    },
                  ]}
                  rows={rows}
                />
              </div>
            </div>
          </div>

          {/* 2. Interactive Paginated & Searchable Table */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--site-text-dim)",
                marginBottom: 8,
              }}
            >
              Interactive Paginated &amp; Searchable Table
            </div>
            <div className="site-panel site-panel--flush">
              <div
                className="preview-surface"
                data-theme="core"
                data-mode="light"
                style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}
              >
                <DataTable
                  pageSize={4}
                  searchable
                  searchPlaceholder="Search transactions…"
                  filters={[
                    {
                      key: "status",
                      label: "Status",
                      options: [
                        { value: "success", label: "Posted" },
                        { value: "warning", label: "Pending" },
                        { value: "danger", label: "Failed" },
                      ],
                    },
                    {
                      key: "type",
                      label: "Type",
                      options: [
                        { value: "Contribution", label: "Contribution" },
                        { value: "Dividend", label: "Dividend" },
                        { value: "Fee", label: "Fee" },
                      ],
                    },
                  ]}
                  columns={[
                    { key: "date", header: "Date", sortable: true },
                    { key: "type", header: "Type", sortable: true },
                    {
                      key: "amount",
                      header: "Amount",
                      sortable: true,
                      render: (r) => `$${r.amount.toFixed(2)}`,
                    },
                    {
                      key: "status",
                      header: "Status",
                      render: (r) => (
                        <Badge tone={r.status}>
                          {r.status === "success" ? "Posted" : r.status === "warning" ? "Pending" : "Failed"}
                        </Badge>
                      ),
                    },
                  ]}
                  rows={manyRows}
                />
              </div>
            </div>
          </div>

          {/* 3. View Mode (Read-Only Table) */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--site-text-dim)",
                }}
              >
                View Mode (Read-Only Table)
              </div>
              <span className="cds-table-view-badge">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--core-color-brand-500, #3275CD)" }} />
                Read-Only View
              </span>
            </div>
            <div className="site-panel site-panel--flush">
              <div
                className="preview-surface"
                data-theme="core"
                data-mode="light"
                style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}
              >
                <DataTable
                  viewMode
                  pageSize={4}
                  searchable
                  searchPlaceholder="Filter records in view mode…"
                  columns={[
                    { key: "date", header: "Date", sortable: true },
                    { key: "type", header: "Type", sortable: true },
                    {
                      key: "amount",
                      header: "Amount",
                      sortable: true,
                      render: (r) => `$${r.amount.toFixed(2)}`,
                    },
                    {
                      key: "status",
                      header: "Status",
                      render: (r) => (
                        <Badge tone={r.status} variant="soft">
                          {r.status === "success" ? "Posted" : r.status === "warning" ? "Pending" : "Failed"}
                        </Badge>
                      ),
                    },
                  ]}
                  rows={manyRows}
                />
              </div>
            </div>
          </div>

          {/* 4. Disabled State (Locked Table) */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--core-color-neutral-500, #787887)",
                }}
              >
                Disabled State (Locked Table)
              </div>
              <span
                style={{
                  fontSize: "var(--core-font-size-xs, 12px)",
                  fontWeight: 600,
                  color: "var(--core-color-neutral-500, #787887)",
                  background: "var(--core-color-neutral-50, #F7F7F9)",
                  border: "1px solid var(--core-color-neutral-200, #DFDFE6)",
                  padding: "2px 8px",
                  borderRadius: 999,
                }}
              >
                Disabled / Locked
              </span>
            </div>
            <div className="site-panel site-panel--flush">
              <div
                className="preview-surface"
                data-theme="core"
                data-mode="light"
                style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}
              >
                <DataTable
                  disabled
                  pageSize={4}
                  searchable
                  searchPlaceholder="Search locked…"
                  filters={[
                    {
                      key: "status",
                      label: "Status",
                      options: [
                        { value: "success", label: "Posted" },
                        { value: "warning", label: "Pending" },
                        { value: "danger", label: "Failed" },
                      ],
                    },
                    {
                      key: "type",
                      label: "Type",
                      options: [
                        { value: "Contribution", label: "Contribution" },
                        { value: "Dividend", label: "Dividend" },
                        { value: "Fee", label: "Fee" },
                      ],
                    },
                  ]}
                  columns={[
                    { key: "date", header: "Date", sortable: true },
                    { key: "type", header: "Type", sortable: true },
                    {
                      key: "amount",
                      header: "Amount",
                      sortable: true,
                      render: (r) => typeof r.amount === "number" ? `$${r.amount.toFixed(2)}` : r.amount,
                    },
                    {
                      key: "status",
                      header: "Status",
                      render: (r) => (
                        <Badge tone={r.status} variant="soft" disabled>
                          {r.status === "success" ? "Posted" : r.status === "warning" ? "Pending" : "Failed"}
                        </Badge>
                      ),
                    },
                  ]}
                  rows={manyRows}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "04",
      anchorId: "item",
      title: "Item & Description List",
      description: "Standard row containers and semantic term/definition lists for account profiles and review flows.",
      content: (
        <div id="description-list" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="site-panel site-panel--flush">
            <div
              className="preview-surface"
              data-theme="core"
              data-mode="light"
              style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}
            >
              <Item
                title="Roth 401(k)"
                description="62% of portfolio"
                action={
                  <Button variant="secondary" size="sm">
                    Manage
                  </Button>
                }
              />
              <Item
                title="Traditional 401(k)"
                description="38% of portfolio"
                action={
                  <Button variant="secondary" size="sm">
                    Manage
                  </Button>
                }
              />
            </div>
          </div>

          <div className="site-panel site-panel--flush">
            <div
              className="preview-surface"
              data-theme="core"
              data-mode="light"
              style={{ background: "var(--core-color-bg-page)" }}
            >
              <div style={{ width: "100%" }}>
                <div className="site-nav-title" style={{ padding: "0 0 8px" }}>
                  Stacked, 2 columns
                </div>
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
            <div
              className="preview-surface"
              data-theme="core"
              data-mode="light"
              style={{ background: "var(--core-color-bg-page)", borderTop: "1px solid var(--core-color-border-subtle)" }}
            >
              <div style={{ width: "100%", maxWidth: 320 }}>
                <div className="site-nav-title" style={{ padding: "0 0 8px" }}>
                  Inline (row-separated)
                </div>
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
        </div>
      ),
    },
    {
      id: "05",
      anchorId: "avatar",
      title: "Avatar & Groups",
      description: "User profile initials and stacked avatar group counters across small, medium, and large sizes.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <table className="spec-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Small (sm)</th>
                <th>Medium (md)</th>
                <th>Large (lg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Size</td>
                <td>24×24px</td>
                <td>36×36px</td>
                <td>48×48px</td>
              </tr>
              <tr>
                <td>Font size</td>
                <td>12px</td>
                <td>14px</td>
                <td>16px</td>
              </tr>
              <tr>
                <td>Border radius</td>
                <td>Full (50%)</td>
                <td>Full (50%)</td>
                <td>Full (50%)</td>
              </tr>
            </tbody>
          </table>

          <AvatarSizeDemo />


        </div>
      ),
    },
    {
      id: "06",
      anchorId: "progress",
      title: "Progress",
      description: "Visual indicators for task completion percentages and indeterminate network loading.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="site-panel site-panel--flush">
            <Preview>
              <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 20 }}>
                <Progress value={68} label="Retirement readiness — 68%" />
                <Progress indeterminate label="Submitting your request…" />
              </div>
            </Preview>

          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: "20px" }}>
      {/* Centered Hero Header — matching Logo and Typography sections */}
      <div style={{ textAlign: "center", marginBottom: 60, marginTop: 40 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--core-color-brand-600)",
            marginBottom: 12,
          }}
        >
          Components
        </div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            margin: "0 0 16px 0",
            color: "var(--core-color-text-primary)",
            lineHeight: 1.1,
          }}
        >
          Data Display
        </h1>
        <p
          style={{
            maxWidth: 580,
            margin: "0 auto",
            color: "var(--core-color-text-tertiary)",
            fontSize: "var(--core-font-size-lg, 20px)",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Cards, Badges, Tables, Avatars, Progress meters, and description lists designed for metrics and data summaries.
        </p>
      </div>

      {/* Numbered Sections List — matching Logo and Typography sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
        {sections.map((s) => (
          <div key={s.id} id={s.anchorId} style={{ display: "flex", flexDirection: "column", gap: 32, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-12.5%",
                width: "125%",
                height: 1,
                backgroundColor: "var(--site-border)",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                paddingTop: 32,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--core-color-text-tertiary)",
                    marginBottom: 12,
                  }}
                >
                  {s.id}
                </div>
                <h2 style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
                  {s.title}
                </h2>
              </div>
              <div
                style={{
                  maxWidth: 420,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-end",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--core-font-size-sm, 14px)",
                    lineHeight: 1.6,
                    color: "var(--core-color-text-secondary)",
                    textAlign: "right",
                    fontWeight: 400,
                  }}
                >
                  {s.description}
                </p>
              </div>
            </div>
            <div>{s.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
