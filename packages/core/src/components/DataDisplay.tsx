import React from "react";

export interface Column<T> { key: string; header: string; render?: (row: T) => React.ReactNode; }
export function Table<T extends { id: string | number }>({ columns, rows, density = "comfortable" }: { columns: Column<T>[]; rows: T[]; density?: "comfortable" | "compact" }) {
  return (
    <div className="cds-table-wrap">
      <table className="cds-table" data-density={density}>
        <thead>
          <tr>{columns.map((c) => <th key={c.key} scope="col">{c.header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => <td key={c.key}>{c.render ? c.render(row) : (row as any)[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type AvatarSize = "sm" | "md" | "lg";
export function Avatar({ name, src, size = "md" }: { name: string; src?: string; size?: AvatarSize }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span className={`cds-avatar cds-avatar--${size}`} role="img" aria-label={name}>
      {src ? <img src={src} alt="" /> : initials}
    </span>
  );
}

export function Progress({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && <div style={{ fontSize: 12, marginBottom: 4, color: "var(--core-color-text-secondary)" }}>{label}</div>}
      <div className="cds-progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div className="cds-progress-bar" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}
