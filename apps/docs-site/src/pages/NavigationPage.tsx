import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { Tabs, Breadcrumb, Pagination } from "../../../../packages/core/src/components/Navigation";

export default function NavigationPage() {
  const [page, setPage] = useState(3);
  return (
    <div>
      <h1 className="site-h1">Tabs, Breadcrumb &amp; Pagination</h1>
      <p className="site-lede">Wayfinding components — where you are, how you got here, how to move through a list.</p>

      <h2 className="site-section-title">Tabs</h2>
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

      <h2 className="site-section-title">Breadcrumb</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Accounts", href: "#" }, { label: "Transactions" }]} />
        </Preview>
      </div>

      <h2 className="site-section-title">Pagination</h2>
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
