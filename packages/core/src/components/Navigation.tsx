import React, { useState } from "react";

export interface TabItem { id: string; label: string; content?: React.ReactNode; }
export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  return (
    <div>
      <div className="cds-tabs" role="tablist">
        {items.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            className="cds-tab"
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={{ paddingTop: 16 }}>
        {items.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}

export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="cds-breadcrumb">
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && <span aria-hidden="true">/</span>}
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
