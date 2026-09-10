import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { DocsSection, DocsSectionList, StateLabel } from "../DocsSection";
import { Anatomy, AnatomyLegend } from "../Anatomy";
import { Card, Badge, BadgeTone, BadgeSize } from "../../../../packages/core/src/components/Misc";
import { Table, DataTable, Avatar, AvatarGroup, Progress } from "../../../../packages/core/src/components/DataDisplay";
import { Icon, Item, DescriptionList } from "../../../../packages/core/src/components/Primitives";
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

function CardQuickLink({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="cds-card__quick-link">
      <span className="cds-card__quick-link-icon" aria-hidden="true">
        <Icon name={icon} size="md" />
      </span>
      <span className="cds-card__quick-link-label">{label}</span>
    </div>
  );
}

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "var(--typography-label-size)",
  lineHeight: "var(--typography-label-line-height)",
  fontWeight: "var(--typography-label-weight)",
  letterSpacing: "var(--typography-label-letter-spacing)",
  color: "var(--theme-neutral-text-subtle)",
  marginBottom: "var(--core-space-3, 12px)",
};

const badgeMatrixHeaderStyle: React.CSSProperties = {
  fontSize: "var(--typography-eyebrow-size)",
  lineHeight: "var(--typography-eyebrow-line-height)",
  fontWeight: "var(--typography-eyebrow-weight)",
  letterSpacing: "var(--typography-eyebrow-letter-spacing)",
  color: "var(--theme-neutral-text-subtle)",
  textTransform: "uppercase",
};

function BadgeMatrixDemo() {
  const [size, setSize] = useState<BadgeSize>("md");
  const tones: BadgeTone[] = ["primary", "neutral", "success", "warning", "danger", "info"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-4, 16px)" }}>
      <div style={{ display: "inline-flex", gap: "var(--core-space-1, 4px)", padding: 3, borderRadius: "var(--core-radius-sm)", border: "1px solid var(--theme-neutral-border-primary-default)", background: "var(--theme-colors-neutral-50)" }}>
        {(["md", "sm"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            style={{
              border: "none",
              background: size === s ? "var(--theme-brand-background-strong)" : "transparent",
              color: size === s ? "var(--theme-brand-text-primary-oncolor)" : "var(--theme-neutral-text-primary-default)",
              borderRadius: "var(--core-radius-sm)",
              padding: "5px 14px",
              fontFamily: "var(--typography-font-family-sans)",
              fontSize: "var(--typography-body-xs-size)",
              lineHeight: "var(--typography-body-xs-line-height)",
              fontWeight: "var(--typography-font-weight-semibold)",
              cursor: "pointer",
              transition: "background-color 120ms ease, color 120ms ease",
            }}
          >
            {s === "md" ? "Medium" : "Small"}
          </button>
        ))}
      </div>

      <div className="site-panel site-panel--flush">
        <div
          className="preview-surface"
          data-theme="core"
          data-mode="light"
          style={{
            background: "var(--theme-colors-neutral-0)",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "var(--core-space-4, 16px)",
            padding: "var(--core-space-6, 24px) var(--core-space-6, 28px)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table className="cds-table" data-density="comfortable">
              <thead>
                <tr>
                  <th scope="col" style={{ ...badgeMatrixHeaderStyle, width: 110 }}>Tone</th>
                  <th scope="col" style={badgeMatrixHeaderStyle}>Default</th>
                  <th scope="col" style={badgeMatrixHeaderStyle}>Hover</th>
                  <th scope="col" style={badgeMatrixHeaderStyle}>With Dot</th>
                  <th scope="col" style={badgeMatrixHeaderStyle}>Removable</th>
                  <th scope="col" style={badgeMatrixHeaderStyle}>Disable</th>
                </tr>
              </thead>
              <tbody>
                {tones.map((t) => (
                  <tr key={t}>
                    <td style={{ fontSize: "var(--typography-body-md-size)", lineHeight: "var(--typography-body-md-line-height)", fontWeight: "var(--typography-font-weight-semibold)", textTransform: "capitalize", color: "var(--theme-neutral-text-primary-default)" }}>{t}</td>
                    <td>
                      <Badge tone={t} size={size} variant="soft">{t}</Badge>
                    </td>
                    <td>
                      <div className="force-hover" style={{ display: "inline-block" }}>
                        <Badge tone={t} size={size} variant="soft" interactive className={`cds-badge-state--hover cds-badge--${t}`}>{t}</Badge>
                      </div>
                    </td>
                    <td>
                      <Badge tone={t} size={size} variant="soft" dot>{t}</Badge>
                    </td>
                    <td>
                      <Badge tone={t} size={size} variant="soft" onRemove={() => {}}>{t}</Badge>
                    </td>
                    <td>
                      <Badge tone={t} size={size} variant="soft" disabled>{t}</Badge>
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
                <th scope="col" style={{ width: 140, fontSize: "var(--typography-font-size-xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Component</th>
                <th scope="col" style={{ fontSize: "var(--typography-font-size-xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Small (sm) — 24px</th>
                <th scope="col" style={{ fontSize: "var(--typography-font-size-xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Medium (md) — 36px</th>
                <th scope="col" style={{ fontSize: "var(--typography-font-size-xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--core-color-text-secondary)" }}>Large (lg) — 48px</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontSize: "var(--typography-body-md-size)", fontWeight: 600, color: "var(--core-color-text-primary)" }}>Single Avatar</td>
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
                <td style={{ fontSize: "var(--typography-body-md-size)", fontWeight: 600, color: "var(--core-color-text-primary)" }}>Avatar Group</td>
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

export default function DataDisplay({ embedded = false }: { embedded?: boolean }) {
  const sections = [
    {
      id: "01",
      anchorId: "quick-links",
      title: "Quick links",
      content: (
        <div className="site-panel site-panel--flush">
          <Preview>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-8, 32px)", width: "100%", padding: "var(--core-space-2, 8px) 0" }}>
              <div>
                <div style={sectionLabelStyle}>Variants</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--core-space-4, 16px)" }}>
                  <Card style={{ minWidth: 200, maxWidth: 260 }}>
                    <CardQuickLink icon="fa-solid fa-user-plus" label="Add beneficiary" />
                  </Card>
                  <Card variant="outlined" style={{ minWidth: 200, maxWidth: 260 }}>
                    <CardQuickLink icon="fa-solid fa-file-lines" label="My documents" />
                  </Card>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--theme-neutral-border-primary-default)", paddingTop: "var(--core-space-6, 24px)" }}>
                <div style={sectionLabelStyle}>Interactive states</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(160px, 1fr))", gap: "var(--core-space-4, 16px)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-3, 12px)" }}>
                    <StateLabel>DEFAULT</StateLabel>
                    <Card variant="interactive" style={{ minWidth: 0 }} onClick={() => {}}>
                      <CardQuickLink icon="fa-solid fa-chart-line" label="Links" />
                    </Card>
                  </div>
                  <div className="force-hover" style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-3, 12px)" }}>
                    <StateLabel>HOVER</StateLabel>
                    <Card variant="interactive" style={{ minWidth: 0 }} onClick={() => {}}>
                      <CardQuickLink icon="fa-solid fa-chart-line" label="Links" />
                    </Card>
                  </div>
                  <div className="force-focus" style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-3, 12px)" }}>
                    <StateLabel>FOCUS</StateLabel>
                    <Card variant="interactive" style={{ minWidth: 0 }} onClick={() => {}}>
                      <CardQuickLink icon="fa-solid fa-chart-line" label="Links" />
                    </Card>
                  </div>
                  <div className="force-active" style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-3, 12px)" }}>
                    <StateLabel>CLICKED</StateLabel>
                    <Card variant="interactive" style={{ minWidth: 0 }} onClick={() => {}}>
                      <CardQuickLink icon="fa-solid fa-chart-line" label="Links" />
                    </Card>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-3, 12px)" }}>
                    <StateLabel>DISABLED</StateLabel>
                    <Card variant="interactive" disabled style={{ minWidth: 0 }} onClick={() => {}}>
                      <CardQuickLink icon="fa-solid fa-chart-line" label="Links" />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Preview>
        </div>
      ),
    },
    {
      id: "02",
      anchorId: "badge",
      title: "Badge",
      content: <BadgeMatrixDemo />,
    },
    {
      id: "03",
      anchorId: "data-table",
      title: "Table & Data Table",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* 1. Basic Data Table */}
          <div id="table">
            <div style={{ ...sectionLabelStyle, marginBottom: "var(--core-space-2, 8px)" }}>
              Basic Data Table
            </div>
            <div className="site-panel site-panel--flush">
              <div
                className="preview-surface"
                data-theme="core"
                data-mode="light"
                style={{ background: "var(--theme-colors-neutral-0)", flexDirection: "column", alignItems: "stretch" }}
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
            <div style={{ ...sectionLabelStyle, marginBottom: "var(--core-space-2, 8px)" }}>
              Interactive Paginated &amp; Searchable Table
            </div>
            <div className="site-panel site-panel--flush">
              <div
                className="preview-surface"
                data-theme="core"
                data-mode="light"
                style={{ background: "var(--theme-colors-neutral-0)", flexDirection: "column", alignItems: "stretch" }}
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
              <div style={sectionLabelStyle}>
                View Mode (Read-Only Table)
              </div>
              <span className="cds-table-view-badge">
                <span className="cds-table-view-badge__dot" aria-hidden="true" />
                Read-Only View
              </span>
            </div>
            <div className="site-panel site-panel--flush">
              <div
                className="preview-surface"
                data-theme="core"
                data-mode="light"
                style={{ background: "var(--theme-colors-neutral-0)", flexDirection: "column", alignItems: "stretch" }}
              >
                <DataTable
                  viewMode
                  zebra={false}
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
                  fontSize: "var(--typography-font-size-xs)",
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
      content: (
        <AvatarSizeDemo />
      ),
    },
    {
      id: "06",
      anchorId: "progress",
      title: "Progress",
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

  const sectionList = (
    <DocsSectionList>
      {sections.map((s) => (
        <DocsSection key={s.anchorId} anchorId={s.anchorId} title={s.title}>
          {s.content}
        </DocsSection>
      ))}
    </DocsSectionList>
  );

  const cardStateStyles = (
    <style>{`
      .force-hover .cds-card--interactive:not(:disabled) {
        box-shadow: var(--core-elevation-2) !important;
        border-color: var(--theme-neutral-border-strong) !important;
        background: var(--theme-colors-neutral-0) !important;
        transform: none !important;
      }
      .force-hover .cds-card--interactive:not(:disabled) .cds-card__quick-link-icon {
        background: var(--theme-brand-background-primary-subtle) !important;
        color: var(--theme-brand-text-primary-hover) !important;
      }
      .force-focus .cds-card--interactive:not(:disabled) {
        outline: none !important;
        border-color: var(--theme-primitive-color-primary-400) !important;
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-primitive-color-primary-400) 25%, transparent) !important;
      }
      .force-active .cds-card--interactive:not(:disabled) {
        transform: translateY(1px) !important;
        box-shadow: none !important;
        border-color: var(--theme-brand-borders-primary-default) !important;
        background: var(--theme-brand-background-primary-subtle) !important;
      }
      .force-active .cds-card--interactive:not(:disabled) .cds-card__quick-link-icon {
        background: var(--theme-brand-background-primary-light) !important;
        color: var(--theme-brand-text-primary-active) !important;
      }
    `}</style>
  );

  if (embedded) {
    return (
      <>
        {cardStateStyles}
        {sectionList}
      </>
    );
  }

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: "20px" }}>
      {cardStateStyles}
      <div style={{ textAlign: "center", marginBottom: 60, marginTop: 40 }}>
        <h1 style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.06em", margin: "0 0 16px 0", color: "var(--core-color-text-primary)", lineHeight: 1.1 }}>Data Display</h1>
        <p style={{ maxWidth: 580, margin: "0 auto", color: "var(--core-color-text-tertiary)", fontSize: "var(--core-font-size-lg, 20px)", lineHeight: 1.6, fontWeight: 400 }}>
          Quick links, Badges, Tables, Avatars, Progress meters, and description lists designed for metrics and data summaries.
        </p>
      </div>
      {sectionList}
    </div>
  );
}
