import React, { useState } from "react";
import { Preview } from "../Preview";
import { DocsSection, DocsSectionList, StateLabel } from "../DocsSection";
import { Tabs, Breadcrumb, Pagination, AppSidebar, Stepper, type SidebarItem, type StepState } from "../../../../packages/core/src/components/Navigation";
import { Icon } from "../../../../packages/core/src/components/Primitives";

type SidebarRailState = "DEFAULT" | "HOVER" | "SELECTED" | "FOCUS" | "DISABLED";

function railSidebarItems(state: SidebarRailState): SidebarItem[] {
  const items: SidebarItem[] = [
    { label: "Dashboard", icon: <Icon name="fa-solid fa-grip" size="lg" /> },
    { label: "Portfolio", icon: <Icon name="fa-solid fa-wallet" size="lg" /> },
    { label: "Transactions", icon: <Icon name="fa-solid fa-right-left" size="lg" /> },
    { label: "Profile", icon: <Icon name="fa-solid fa-user" size="lg" /> },
    { label: "Documents", icon: <Icon name="fa-solid fa-file-lines" size="lg" /> },
  ];

  if (state === "SELECTED") {
    items[0] = { ...items[0], current: true };
  }

  if (state === "DISABLED") {
    items[3] = { ...items[3], disabled: true };
  }

  return items;
}

function StepperStatePreview({
  state,
  eyebrow,
  title,
  description,
  status,
  stepNumber = 2,
}: {
  state: StepState;
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  stepNumber?: number;
}) {
  const marker = state === "completed" ? "✓" : state === "warning" || state === "error" ? "!" : stepNumber;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-3, 12px)", minWidth: 0 }}>
      <StateLabel>{eyebrow}</StateLabel>
      <ol className="cds-stepper cds-stepper--vertical" aria-label={`Stepper ${eyebrow}`} style={{ width: "auto", minWidth: 0 }}>
        <li className={`cds-step cds-step--${state} cds-step--vertical`} style={{ paddingBottom: 0 }}>
          <span className="cds-step-marker" aria-hidden="true">{marker}</span>
          <span className="cds-step-label">
            <span className="cds-step-title">{title}</span>
            <span className="cds-step-desc">{description}</span>
            {(state === "in-progress" || state === "warning" || state === "error") && status && (
              <span className="cds-step-status">
                <span className="cds-step-status-dot" aria-hidden="true" />
                {status}
              </span>
            )}
          </span>
        </li>
      </ol>
    </div>
  );
}

function StepperStatesDemo() {
  return (
    <div className="site-panel site-panel--flush">
      <div
        className="preview-surface"
        data-theme="core"
        data-mode="light"
        style={{
          background: "var(--theme-colors-neutral-50)",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "var(--core-space-5, 20px)",
          gap: "var(--core-space-4, 16px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "var(--core-space-4, 16px)",
          }}
        >
          <StepperStatePreview
            eyebrow="DEFAULT"
            state="default"
            title="Fees"
            description="Review fees."
            stepNumber={3}
          />
          <StepperStatePreview
            eyebrow="IN PROGRESS"
            state="in-progress"
            title="Allocation"
            description="Pick sources."
            status="In progress"
            stepNumber={2}
          />
          <StepperStatePreview
            eyebrow="COMPLETED"
            state="completed"
            title="Withdrawal"
            description="Set amount."
          />
          <StepperStatePreview
            eyebrow="WARNING"
            state="warning"
            title="Fees"
            description="Review fees."
            status="Review needed"
            stepNumber={3}
          />
          <StepperStatePreview
            eyebrow="ERROR"
            state="error"
            title="Documents"
            description="Attach forms."
            status="Required"
            stepNumber={4}
          />
        </div>
      </div>
    </div>
  );
}

function SidebarRailStatesDemo() {
  const states = [
    { label: "DEFAULT", className: "sidebar-state-default" },
    { label: "HOVER", className: "sidebar-state-hover" },
    { label: "SELECTED", className: "sidebar-state-selected" },
    { label: "FOCUS", className: "sidebar-state-focus" },
    { label: "DISABLED", className: "sidebar-state-disabled" },
  ] as const;

  return (
    <div className="site-panel site-panel--flush">
      <div
        className="preview-surface"
        data-theme="core"
        data-mode="light"
        style={{
          background: "var(--theme-colors-neutral-50)",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "var(--core-space-5, 20px)",
          gap: "var(--core-space-4, 16px)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--typography-font-family-sans)",
            fontSize: "var(--typography-label-size)",
            lineHeight: "var(--typography-label-line-height)",
            fontWeight: "var(--typography-label-weight)",
            color: "var(--theme-neutral-text-primary-default)",
          }}
        >
          Sidebar · <code style={{ fontWeight: 400, color: "var(--theme-neutral-text-subtle)" }}>variant=&quot;rail&quot;</code>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "var(--core-space-4, 16px)",
          }}
        >
          {states.map(({ label, className }) => (
            <div
              key={label}
              className={className}
              style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-3, 12px)", minWidth: 96 }}
            >
              <StateLabel>{label}</StateLabel>
              <AppSidebar
                variant="rail"
                aria-label={`Sidebar ${label}`}
                items={railSidebarItems(label)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NavigationPage({ embedded = false }: { embedded?: boolean }) {
  const [page, setPage] = useState(3);

  const sections = (
    <DocsSectionList>
      <DocsSection anchorId="sidebar" title="Sidebar">
        <SidebarRailStatesDemo />
      </DocsSection>

      <DocsSection anchorId="tabs" title="Tabs">
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
      </DocsSection>

      <DocsSection anchorId="breadcrumb" title="Breadcrumb">
        <div className="site-panel site-panel--flush">
          <Preview>
            <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Accounts", href: "#" }, { label: "Transactions" }]} />
          </Preview>
        </div>
        <div className="site-panel site-panel--flush">
          <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch", gap: 10 }}>
            {(["slash", "line", "dot", "none"] as const).map((sep) => (
              <Breadcrumb key={sep} separator={sep} items={[{ label: "Home", href: "#" }, { label: "Accounts", href: "#" }, { label: "Transactions" }]} />
            ))}
          </div>
        </div>
      </DocsSection>

      <DocsSection anchorId="stepper" title="Stepper">
        <StepperStatesDemo />
        <div className="site-panel site-panel--flush">
          <div
            className="preview-surface"
            data-theme="core"
            data-mode="light"
            style={{ background: "var(--theme-colors-neutral-50)", padding: "var(--core-space-5, 20px)" }}
          >
            <Stepper
              currentIndex={1}
              steps={[
                { label: "Personal" },
                { label: "Investments" },
                { label: "Beneficiaries" },
                { label: "Review" },
              ]}
            />
          </div>
        </div>
        <div className="site-panel site-panel--flush">
          <div
            className="preview-surface"
            data-theme="core"
            data-mode="light"
            style={{ background: "var(--theme-colors-neutral-50)", padding: "var(--core-space-5, 20px)" }}
          >
            <Stepper
              orientation="vertical"
              currentIndex={1}
              steps={[
                { label: "Withdrawal", description: "Set type and amount." },
                { label: "Allocation", description: "Pick sources.", status: "In progress" },
                { label: "Fees", description: "Review fees." },
                { label: "Documents", description: "Attach forms." },
                { label: "Summary", description: "Review and submit." },
              ]}
            />
          </div>
        </div>
      </DocsSection>

      <DocsSection anchorId="pagination" title="Pagination">
        <div className="site-panel site-panel--flush">
          <Preview>
            <Pagination page={page} pageCount={8} onChange={setPage} />
          </Preview>
        </div>
      </DocsSection>

      <style>{`
        .sidebar-state-hover .cds-app-sidebar--rail .cds-app-sidebar-link:nth-child(3):not([aria-current="page"]) {
          color: var(--theme-primitive-color-primary-500) !important;
          background: var(--theme-brand-background-primary-subtle) !important;
          box-shadow: inset 3px 0 0 0 var(--theme-primitive-color-primary-500) !important;
        }
        .sidebar-state-focus .cds-app-sidebar--rail .cds-app-sidebar-link:nth-child(3):not([aria-current="page"]) {
          outline: var(--core-focusRing-width, 2px) solid var(--theme-primitive-color-primary-400) !important;
          outline-offset: -2px;
        }
      `}</style>
    </DocsSectionList>
  );

  if (embedded) return sections;

  return (
    <div>
      <h1 className="site-h1">Tabs, Breadcrumb &amp; Pagination</h1>
      <p className="site-lede">Wayfinding components — where you are, how you got here, how to move through a list.</p>
      {sections}
    </div>
  );
}
