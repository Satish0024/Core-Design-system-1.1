import React, { useState } from "react";

export interface TabItem { id: string; label: string; content?: React.ReactNode; }
export function Tabs({ items, defaultId, orientation = "horizontal" }: { items: TabItem[]; defaultId?: string; orientation?: "horizontal" | "vertical" }) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const vertical = orientation === "vertical";
  return (
    <div className={vertical ? "cds-tabs-layout--vertical" : undefined}>
      <div className={`cds-tabs ${vertical ? "cds-tabs--vertical" : ""}`} role="tablist" aria-orientation={orientation}>
        {items.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            className={`cds-tab ${vertical ? "cds-tab--vertical" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={vertical ? { flex: 1, minWidth: 0 } : { paddingTop: 16 }}>
        {items.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}

export type BreadcrumbSeparator = "slash" | "line" | "dot" | "none";
const separatorGlyph: Record<BreadcrumbSeparator, string> = { slash: "/", line: "|", dot: "•", none: "" };

export function Breadcrumb({ items, separator = "slash" }: { items: Array<{ label: string; href?: string }>; separator?: BreadcrumbSeparator }) {
  return (
    <nav aria-label="Breadcrumb" className={`cds-breadcrumb cds-breadcrumb--${separator}`}>
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && separator !== "none" && <span className="cds-breadcrumb-sep" aria-hidden="true">{separatorGlyph[separator]}</span>}
          {item.href && i < items.length - 1 ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span className="current" aria-current="page">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export interface NavMenuItem { label: string; href?: string; current?: boolean; onClick?: () => void; }
export function NavigationMenu({ items }: { items: NavMenuItem[] }) {
  return (
    <nav className="cds-navmenu" aria-label="Main">
      {items.map((item) =>
        item.href ? (
          <a key={item.label} href={item.href} className="cds-navmenu-link" aria-current={item.current ? "page" : undefined}>{item.label}</a>
        ) : (
          <button key={item.label} className="cds-navmenu-link" aria-current={item.current ? "page" : undefined} onClick={item.onClick}>{item.label}</button>
        )
      )}
    </nav>
  );
}

export interface SidebarItem { label: string; icon?: React.ReactNode; current?: boolean; onClick?: () => void; }
export function AppSidebar({ items }: { items: SidebarItem[] }) {
  return (
    <nav className="cds-app-sidebar" aria-label="Sidebar">
      {items.map((item) => (
        <button key={item.label} className="cds-app-sidebar-link" aria-current={item.current ? "page" : undefined} onClick={item.onClick}>
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export interface StepDef { label: string; description?: string; }
export function Stepper({ steps, currentIndex }: { steps: StepDef[]; currentIndex: number }) {
  return (
    <ol className="cds-stepper" aria-label="Progress">
      {steps.map((step, i) => {
        const state = i < currentIndex ? "complete" : i === currentIndex ? "current" : "upcoming";
        return (
          <li key={step.label} className={`cds-step cds-step--${state}`} aria-current={state === "current" ? "step" : undefined}>
            <span className="cds-step-marker" aria-hidden="true">
              {state === "complete" ? "✓" : i + 1}
            </span>
            <span className="cds-step-label">
              <span className="cds-step-title">{step.label}</span>
              {step.description && <span className="cds-step-desc">{step.description}</span>}
            </span>
            {i < steps.length - 1 && <span className="cds-step-connector" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

export function Pagination({ page, pageCount, onChange }: { page: number; pageCount: number; onChange: (p: number) => void }) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <nav aria-label="Pagination" className="cds-pagination">
      <button className="cds-page-btn" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page">‹</button>
      {pages.map((p) => (
        <button
          key={p}
          className="cds-page-btn"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button className="cds-page-btn" onClick={() => onChange(page + 1)} disabled={page >= pageCount} aria-label="Next page">›</button>
    </nav>
  );
}
