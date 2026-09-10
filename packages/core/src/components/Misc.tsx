import React, { useId } from "react";

export type CardVariant = "default" | "outlined" | "interactive";
export interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: CardVariant;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
export function Card({ className = "", style, variant = "default", disabled, onClick, children }: CardProps) {
  const interactive = variant === "interactive" || !!onClick;
  const Tag = interactive ? "button" : "div";
  return (
    <Tag
      className={`cds-card cds-card--${variant} ${disabled ? "cds-card--disabled" : ""} ${className}`.trim()}
      style={style}
      onClick={disabled ? undefined : onClick}
      disabled={interactive ? disabled : undefined}
      aria-disabled={!interactive && disabled ? true : undefined}
      type={interactive ? "button" : undefined}
    >
      {children}
    </Tag>
  );
}

export type BadgeTone = "primary" | "neutral" | "success" | "warning" | "danger" | "info";
export type BadgeStyle = "soft" | "outline" | "solid";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: BadgeStyle;
  size?: BadgeSize;
  interactive?: boolean;
  disabled?: boolean;
  dot?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export function Badge({
  tone = "neutral",
  variant = "soft",
  size = "md",
  interactive = false,
  disabled = false,
  dot = false,
  onRemove,
  className = "",
  children,
  onClick,
  ...rest
}: BadgeProps) {
  const isInteractive = interactive || Boolean(onClick) || Boolean(onRemove);
  const classes = [
    "cds-badge",
    `cds-badge--${tone}`,
    `cds-badge-style--${variant}`,
    `cds-badge-size--${size}`,
    isInteractive ? "cds-badge--interactive" : "",
    disabled ? "cds-badge--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      aria-disabled={disabled ? "true" : undefined}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {dot && <span className="cds-badge-dot" aria-hidden="true" />}
      {children}
      {onRemove && !disabled && (
        <button
          type="button"
          className="cds-badge-remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
}

export type AlertTone = "success" | "warning" | "danger" | "info";
export function Alert({ tone = "info", title, children, onDismiss }: { tone?: AlertTone; title: string; children?: React.ReactNode; onDismiss?: () => void }) {
  return (
    <div className={`cds-alert cds-alert--${tone}`} role={tone === "danger" ? "alert" : "status"} style={{ position: "relative", paddingRight: onDismiss ? 40 : undefined }}>
      <div>
        <strong style={{ display: "block", marginBottom: children ? 2 : 0 }}>{title}</strong>
        {children}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 4,
            lineHeight: 1,
            color: "inherit",
            opacity: 0.6,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--core-radius-sm)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.6"; }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function Switch({ label, checked, disabled, onChange }: { label?: string; checked: boolean; disabled?: boolean; onChange: (v: boolean) => void }) {
  const id = useId();
  return (
    <label className={`cds-switch ${disabled ? "cds-switch--disabled" : ""}`} htmlFor={id}>
      <input id={id} type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span className="cds-switch-track" aria-hidden="true" />
      {label && <span>{label}</span>}
    </label>
  );
}
