import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { Tabs, Breadcrumb, Pagination, NavigationMenu, AppSidebar, Stepper } from "../../../../packages/core/src/components/Navigation";
import { Icon } from "../../../../packages/core/src/components/Primitives";
import { Card } from "../../../../packages/core/src/components/Misc";
import { AutoAnatomy, AutoAnatomyLegend } from "../AutoAnatomy";

export default function NavigationPage() {
  const [page, setPage] = useState(3);
  return (
    <div>
      <h1 className="site-h1">Tabs, Breadcrumb &amp; Pagination</h1>
      <p className="site-lede">Wayfinding components — where you are, how you got here, how to move through a list.</p>

      <h2 className="site-section-title" id="navigation-menu">Navigation menu (top nav)</h2>
      <p className="site-section-sub">Anatomy — the current item is underlined, not just recolored, so it survives color-blindness and grayscale print.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Current item — underline + weight, not color alone", anchor: "bottom" },
          { n: 2, label: "Items — 16px horizontal gap", anchor: "top" },
        ]}>
          <NavigationMenu items={[{ label: "Dashboard", current: true }, { label: "Accounts" }, { label: "Documents" }]} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Current item: underline + bolder weight — never color alone", anchor: "bottom" },
          { n: 2, label: "Item spacing: 16px horizontal gap between labels", anchor: "top" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <NavigationMenu items={[{ label: "Dashboard", current: true }, { label: "Accounts" }, { label: "Documents" }, { label: "Support" }]} />
        </div>
      </div>

      <h2 className="site-section-title" id="sidebar">App sidebar</h2>
      <p className="site-section-sub">Anatomy — icon in its own badge, active item gets a tinted pill (not a solid fill) and its icon badge goes solid.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap", background: "var(--core-color-bg-page)", padding: "24px 32px" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Active item — tinted pill, full width", anchor: "left" },
          { n: 2, label: "Icon badge — solid-fills only when active", anchor: "top" },
          { n: 3, label: "Width — 220px fixed (desktop)", anchor: "right" },
        ]}>
          <AppSidebar items={[
            { label: "Dashboard", icon: <Icon name="fa-solid fa-grip" size="sm" />, current: true },
            { label: "Investment Portfolio", icon: <Icon name="fa-solid fa-wallet" size="sm" /> },
            { label: "Transactions", icon: <Icon name="fa-solid fa-right-left" size="sm" /> },
          ]} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Active item: tinted pill (sidebar.item.activeBg) spans the sidebar's full width — not a solid fill", anchor: "left" },
          { n: 2, label: "Icon badge: soft neutral at rest, solid primary-filled only on the active row", anchor: "top" },
          { n: 3, label: "Width: 220px fixed on desktop, collapses to icon-only under 1024px", anchor: "right" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", padding: 0 }}>
          <AppSidebar
            items={[
              { label: "Dashboard", icon: <Icon name="fa-solid fa-grip" size="sm" />, current: true },
              { label: "Investment Portfolio", icon: <Icon name="fa-solid fa-wallet" size="sm" /> },
              { label: "Transactions", icon: <Icon name="fa-solid fa-right-left" size="sm" /> },
              { label: "My Profile", icon: <Icon name="fa-solid fa-user" size="sm" /> },
              { label: "Document Center", icon: <Icon name="fa-solid fa-file-lines" size="sm" /> },
            ]}
          />
        </div>
      </div>

      <p className="site-section-sub"><code>variant="panel"</code> — the exact same nav list, restyled to sit inside a Card as a settings-style sub-nav (e.g. a Profile page's Personal/Bank/Employment list) instead of the app shell. One visual system, two places to use it.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <Card style={{ maxWidth: 220, padding: 8 }}>
            <AppSidebar
              variant="panel"
              aria-label="Profile sections"
              items={[
                { label: "Personal Details", icon: <Icon name="fa-solid fa-heart" size="sm" />, current: true },
                { label: "Bank Details", icon: <Icon name="fa-solid fa-building-columns" size="sm" /> },
                { label: "Employment Information", icon: <Icon name="fa-solid fa-briefcase" size="sm" /> },
                { label: "Beneficiary Details", icon: <Icon name="fa-solid fa-users" size="sm" /> },
              ]}
            />
          </Card>
        </div>
      </div>

      <p className="site-section-sub"><code>variant="rail"</code> — a compact icon-over-label rail. A left accent bar + tinted band mark the active item; icons are plain, no badge. Same tokens as the row layout above, so it's light/dark aware, not a fixed chrome.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap", background: "var(--core-color-bg-page)", padding: "24px 32px" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Active item — accent bar + tinted band", anchor: "left" },
          { n: 2, label: "Icon — plain, no badge, centered above label", anchor: "top" },
          { n: 3, label: "Border — right edge, matches app-shell divider", anchor: "right" },
        ]}>
          <AppSidebar
            variant="rail"
            items={[
              { label: "Dashboard", icon: <Icon name="fa-solid fa-grip" size="lg" />, current: true },
              { label: "Investment Portfolio", icon: <Icon name="fa-solid fa-wallet" size="lg" /> },
              { label: "Transactions", icon: <Icon name="fa-solid fa-right-left" size="lg" /> },
              { label: "My Profile", icon: <Icon name="fa-solid fa-user" size="lg" /> },
              { label: "Document Center", icon: <Icon name="fa-solid fa-file-lines" size="lg" /> },
            ]}
          />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Active item: sidebar.rail.accentBar left edge + the same sidebar.item.activeBg tint used by the row layout", anchor: "left" },
          { n: 2, label: "Icon: plain (currentColor), centered above a wrapping label — no badge container", anchor: "top" },
          { n: 3, label: "Border: color.border.subtle, same divider the app-shell header/footer use", anchor: "right" },
        ]} />
      </div>

      <h2 className="site-section-title" id="tabs">Tabs</h2>
      <p className="site-section-sub">Anatomy — active tab has an underline indicator; the whole strip is an ARIA <code>tablist</code>.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Active indicator — 2px underline, animates between tabs", anchor: "bottom" },
          { n: 2, label: "Tab — 40px min height touch target", anchor: "top" },
        ]}>
          <Tabs items={[
            { id: "overview", label: "Overview", content: <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Overview content.</p> },
            { id: "transactions", label: "Transactions", content: <p style={{ fontSize: 14 }}>Transactions content.</p> },
          ]} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Indicator: 2px underline, animated slide between tabs on change", anchor: "bottom" },
          { n: 2, label: "Tab: 40px min-height touch target, arrow-key navigable", anchor: "top" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <Tabs
            items={[
              { id: "overview", label: "Overview", content: <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Account overview content.</p> },
              { id: "transactions", label: "Transactions", content: <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Transaction history content.</p> },
              { id: "documents", label: "Documents", content: <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Statements & tax forms content.</p> },
            ]}
          />
        </div>
      </div>

      <p className="site-section-sub">Vertical orientation — for a settings/profile-style side nav (e.g. Personal / Bank / Employment details).</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <Tabs
            orientation="vertical"
            items={[
              { id: "personal", label: "Personal Details", content: <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)", margin: 0 }}>Personal details content.</p> },
              { id: "bank", label: "Bank Details", content: <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)", margin: 0 }}>Bank details content.</p> },
              { id: "employment", label: "Employment Information", content: <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)", margin: 0 }}>Employment info content.</p> },
              { id: "beneficiary", label: "Beneficiary Details", content: <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)", margin: 0 }}>Beneficiary details content.</p> },
            ]}
          />
        </div>
      </div>

      <h2 className="site-section-title" id="breadcrumb">Breadcrumb</h2>
      <p className="site-section-sub">Anatomy — the current page is plain text, not a link, and carries <code>aria-current="page"</code>.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Current page — plain text, not a link", anchor: "top" },
          { n: 2, label: "Separator — 8px gap each side", anchor: "bottom" },
        ]}>
          <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Accounts", href: "#" }, { label: "Transactions" }]} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Current page: plain text (no href), aria-current=\"page\"", anchor: "top" },
          { n: 2, label: "Separator: 8px gap each side, aria-hidden", anchor: "bottom" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Accounts", href: "#" }, { label: "Transactions" }]} />
        </Preview>
      </div>
      <p className="site-section-sub">Separator styles: slash (default), line, dot, none.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch", gap: 10 }}>
          {(["slash", "line", "dot", "none"] as const).map((sep) => (
            <Breadcrumb key={sep} separator={sep} items={[{ label: "Home", href: "#" }, { label: "Accounts", href: "#" }, { label: "Transactions" }]} />
          ))}
        </div>
      </div>

      <h2 className="site-section-title" id="stepper">Stepper</h2>
      <p className="site-section-sub">Anatomy — drives multi-step flows: complete / current / upcoming states, each visually distinct.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Complete — solid success-green circle + checkmark", anchor: "top-left" },
          { n: 2, label: "Current — solid primary circle, bold label", anchor: "top" },
          { n: 3, label: "Upcoming — soft filled circle, muted label", anchor: "top-right" },
          { n: 4, label: "Connector — fills success-green as steps complete", anchor: "bottom" },
        ]}>
          <Stepper currentIndex={1} steps={[{ label: "Personal info" }, { label: "Investment elections" }, { label: "Review" }]} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Complete: solid success-green circle + checkmark — its own color, not a primary-tinted twin of \"current\"", anchor: "top-left" },
          { n: 2, label: "Current: solid primary-filled circle, bold primary-colored label, aria-current=\"step\"", anchor: "top" },
          { n: 3, label: "Upcoming: soft filled circle (no heavy border), muted label — reads as \"not yet\"", anchor: "top-right" },
          { n: 4, label: "Connector: line between steps, turns success-green once that step completes", anchor: "bottom" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <Stepper
            currentIndex={1}
            steps={[
              { label: "Personal info" },
              { label: "Investment elections" },
              { label: "Beneficiaries" },
              { label: "Review & submit" },
            ]}
          />
        </div>
      </div>

      <p className="site-section-sub">Vertical orientation — for a multi-step request flow's left-side nav (e.g. a withdrawal request: Details → Allocation → Fees → Documents → Summary).</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <Stepper
            orientation="vertical"
            currentIndex={1}
            steps={[
              { label: "Withdrawal Details", description: "Specify the withdrawal type and amount." },
              { label: "Withdrawal Allocation", description: "Choose which sources to withdraw from.", status: "In progress" },
              { label: "Fee Details", description: "Review applicable fees and tax withholding." },
              { label: "Upload Documents", description: "Attach any required supporting forms." },
              { label: "Withdrawal Request Summary", description: "Review the request before submitting." },
            ]}
          />
        </div>
      </div>

      <h2 className="site-section-title" id="pagination">Pagination</h2>
      <p className="site-section-sub">Anatomy — active page number, disabled edges, 40×40px minimum touch targets.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Active page — filled background, aria-current", anchor: "top" },
          { n: 2, label: "Prev/Next — disabled at range edges", anchor: "left" },
        ]}>
          <Pagination page={page} pageCount={8} onChange={setPage} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Active page: filled background, aria-current=\"page\"", anchor: "top" },
          { n: 2, label: "Prev/Next: 40×40px targets, disabled + non-focusable at range edges", anchor: "left" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Pagination page={page} pageCount={8} onChange={setPage} />
        </Preview>
      </div>

      <h2 className="site-section-title">Accessibility</h2>
      <ul style={{ color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
        <li>Tabs implement the ARIA <code>tablist</code>/<code>tab</code>/<code>tabpanel</code> pattern with <code>aria-selected</code>.</li>
        <li>Breadcrumb marks the current page with <code>aria-current="page"</code>, wrapped in a <code>nav aria-label="Breadcrumb"</code>.</li>
        <li>Pagination's active page also carries <code>aria-current="page"</code>; Previous/Next disable correctly at range edges.</li>
      </ul>

      <h2 className="site-section-title">Code</h2>
      <CodeBlock>{`<Tabs items={[{ id: "overview", label: "Overview", content: <Overview /> }, ...]} />
<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Transactions" }]} />
<Pagination page={page} pageCount={8} onChange={setPage} />`}</CodeBlock>
    </div>
  );
}
