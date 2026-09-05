import React, { useState } from "react";

export function Slider({ value, min = 0, max = 100, step = 1, onChange, formatValue }: { value: number; min?: number; max?: number; step?: number; onChange: (v: number) => void; formatValue?: (v: number) => string }) {
  return (
    <div className="cds-slider">
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ flex: 1 }} aria-valuetext={formatValue ? formatValue(value) : String(value)} />
      <span className="cds-slider-value">{formatValue ? formatValue(value) : value}</span>
    </div>
  );
}

export function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className="cds-btn-group" role="group">{children}</div>;
}

export function Empty({ title, description, action, icon }: { title: string; description?: string; action?: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="cds-empty">
      <div className="cds-empty-icon" aria-hidden="true">{icon ?? "—"}</div>
      <div className="cds-empty-title">{title}</div>
      {description && <div className="cds-empty-desc">{description}</div>}
      {action && <div className="cds-empty-action">{action}</div>}
    </div>
  );
}

export function Item({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="cds-item">
      <div className="cds-item-content">
        <div className="cds-item-title">{title}</div>
        {description && <div className="cds-item-desc">{description}</div>}
      </div>
      {action && <div className="cds-item-action">{action}</div>}
    </div>
  );
}

export function Collapsible({ trigger, children, defaultOpen = false }: { trigger: (open: boolean, toggle: () => void) => React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      {trigger(open, () => setOpen((o) => !o))}
      {open && <div>{children}</div>}
    </div>
  );
}

export type IconSize = "sm" | "md" | "lg";
/**
 * Wraps a Font Awesome class name (e.g. "fa-solid fa-user") with CORE's icon
 * sizing tokens and, optionally, interactive hover/focus affordance for a
 * bare clickable icon (prefer IconButton when it needs a click handler).
 */
export function Icon({ name, size = "md", label, interactive = false, className = "", ...rest }: { name: string; size?: IconSize; label?: string; interactive?: boolean; className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`cds-icon cds-icon--${size} ${interactive ? "cds-icon--interactive" : ""} ${className}`}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    >
      <i className={name} aria-hidden="true" />
    </span>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="cds-kbd">{children}</kbd>;
}

export function AspectRatio({ ratio = 16 / 9, children }: { ratio?: number; children: React.ReactNode }) {
  return (
    <div className="cds-aspect-ratio" style={{ paddingBottom: `${100 / ratio}%` }}>
      {children}
    </div>
  );
}

export interface DescriptionItem { term: string; value: React.ReactNode; }
/**
 * Label/value pairs — profile details, plan summaries, review screens.
 * Semantic <dl>/<dt>/<dd>, so a screen reader announces each pair as a unit.
 */
export function DescriptionList({ items, orientation = "stacked", columns = 1 }: { items: DescriptionItem[]; orientation?: "stacked" | "inline"; columns?: 1 | 2 | 3 }) {
  return (
    <dl className={`cds-description-list cds-description-list--${orientation}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {items.map((item, i) => (
        <div className="cds-description-item" key={i}>
          <dt className="cds-description-term">{item.term}</dt>
          <dd className="cds-description-value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
