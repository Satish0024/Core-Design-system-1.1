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
