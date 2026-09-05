import React, { useId } from "react";

export function Card({ className = "", style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return <div className={`cds-card ${className}`} style={style}>{children}</div>;
}

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";
export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: React.ReactNode }) {
  return <span className={`cds-badge cds-badge--${tone}`}>{children}</span>;
}

export type AlertTone = "success" | "warning" | "danger" | "info";
export function Alert({ tone = "info", title, children }: { tone?: AlertTone; title: string; children?: React.ReactNode }) {
  return (
    <div className={`cds-alert cds-alert--${tone}`} role={tone === "danger" ? "alert" : "status"}>
      <div>
        <strong style={{ display: "block", marginBottom: children ? 2 : 0 }}>{title}</strong>
        {children}
      </div>
    </div>
  );
}

export function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  const id = useId();
  return (
    <label className="cds-switch" htmlFor={id}>
      <input id={id} type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="cds-switch-track" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}
