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

export type CollapsibleVariant = "card" | "bordered" | "button" | "ghost";

export interface CollapsibleProps {
  title?: React.ReactNode;
  variant?: CollapsibleVariant;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: (open: boolean, toggle: () => void) => React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Collapsible({
  title,
  variant = "card",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  className = "",
  id,
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) {
      setUncontrolledOpen(next);
    }
    onOpenChange?.(next);
  };

  const panelId = id ? `${id}-panel` : undefined;
  const triggerId = id ? `${id}-trigger` : undefined;

  return (
    <div className={`cds-collapsible cds-collapsible--${variant} ${isOpen ? "cds-collapsible--open" : ""} ${className}`}>
      {trigger ? (
        trigger(isOpen, toggle)
      ) : (
        <button
          type="button"
          className="cds-collapsible-trigger"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={triggerId}
        >
          <span className="cds-collapsible-title">{title}</span>
          <svg
            className="cds-collapsible-chevron"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 5L7 9L11 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {isOpen && (
        <div className="cds-collapsible-content" id={panelId} role="region" aria-labelledby={triggerId}>
          {children}
        </div>
      )}
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
