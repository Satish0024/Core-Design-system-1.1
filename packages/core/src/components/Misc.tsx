import React, { useId } from "react";

export type CardVariant = "default" | "outlined" | "interactive";
export interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: CardVariant;
  onClick?: () => void;
  children: React.ReactNode;
}
export function Card({ className = "", style, variant = "default", onClick, children }: CardProps) {
  const interactive = variant === "interactive" || !!onClick;
  const Tag = interactive ? "button" : "div";
  return (
    <Tag
      className={`cds-card cds-card--${variant} ${className}`}
      style={style}
      onClick={onClick}
      type={interactive ? "button" : undefined}
    >
      {children}
    </Tag>
  );
}

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";
export type BadgeStyle = "soft" | "outline" | "solid";
export type BadgeSize = "sm" | "md";
export function Badge({ tone = "neutral", variant = "soft", size = "md", children }: { tone?: BadgeTone; variant?: BadgeStyle; size?: BadgeSize; children: React.ReactNode }) {
  return <span className={`cds-badge cds-badge--${tone} cds-badge-style--${variant} cds-badge-size--${size}`}>{children}</span>;
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
