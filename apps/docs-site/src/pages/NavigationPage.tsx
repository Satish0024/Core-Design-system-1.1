import React, { useState } from "react";
import { Preview } from "../Preview";
import { Tabs, Breadcrumb, Pagination, NavigationMenu, AppSidebar, Stepper } from "../../../../packages/core/src/components/Navigation";
import { Icon } from "../../../../packages/core/src/components/Primitives";

export default function NavigationPage() {
  const [page, setPage] = useState(3);
  return (
    <div>
      <h1 className="site-h1">Tabs, Breadcrumb &amp; Pagination</h1>
      <p className="site-lede">Wayfinding components — where you are, how you got here, how to move through a list.</p>

      <h2 className="site-section-title" id="navigation-menu">Navigation menu (top nav)</h2>
      <p className="site-section-sub">The current item is underlined, not just recolored, so it survives color-blindness and grayscale print.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <NavigationMenu items={[{ label: "Dashboard", current: true }, { label: "Accounts" }, { label: "Documents" }, { label: "Support" }]} />
        </div>
      </div>

      <p className="site-section-sub"><code>variant="rail"</code> — a compact icon-over-label rail. A left accent bar + tinted band mark the active item; icons are plain, no badge. Same tokens as the row layout above, so it's light/dark aware, not a fixed chrome.</p>
      <div id="sidebar" className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", padding: "24px 32px" }}>
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
        </div>
      </div>

      <h2 className="site-section-title" id="tabs">Tabs</h2>
      <p className="site-section-sub">Active tab has an underline indicator; the whole strip is an ARIA <code>tablist</code>.</p>
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
      <p className="site-section-sub">The current page is plain text, not a link, and carries <code>aria-current="page"</code>.</p>
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
      <p className="site-section-sub">Drives multi-step flows: complete / current / upcoming states, each visually distinct.</p>
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
      <p className="site-section-sub">Active page number, disabled edges, 40×40px minimum touch targets.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Pagination page={page} pageCount={8} onChange={setPage} />
        </Preview>
      </div>

    </div>
  );
}
