import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { Tabs, Breadcrumb, Pagination, NavigationMenu, AppSidebar, Stepper } from "../../../../packages/core/src/components/Navigation";

export default function NavigationPage() {
  const [page, setPage] = useState(3);
  return (
    <div>
      <h1 className="site-h1">Tabs, Breadcrumb &amp; Pagination</h1>
      <p className="site-lede">Wayfinding components — where you are, how you got here, how to move through a list.</p>

      <h2 className="site-section-title" id="navigation-menu">Navigation menu (top nav)</h2>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <NavigationMenu items={[{ label: "Dashboard", current: true }, { label: "Accounts" }, { label: "Documents" }, { label: "Support" }]} />
        </div>
      </div>

      <h2 className="site-section-title" id="sidebar">App sidebar</h2>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", padding: 0 }}>
          <AppSidebar items={[{ label: "Dashboard", current: true }, { label: "Transactions" }, { label: "Statements" }, { label: "Settings" }]} />
        </div>
      </div>

      <h2 className="site-section-title" id="tabs">Tabs</h2>
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
      <p className="site-section-sub">Drives multi-step flows — enrollment, transaction requests. Complete / current / upcoming states.</p>
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

      <h2 className="site-section-title" id="pagination">Pagination</h2>
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
