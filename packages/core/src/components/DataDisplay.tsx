import React, { useMemo, useState } from "react";

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

export interface SortableColumn<T> extends Column<T> { sortable?: boolean; sortValue?: (row: T) => string | number; }
export function DataTable<T extends { id: string | number }>({ columns, rows, pageSize = 5 }: { columns: SortableColumn<T>[]; rows: T[]; pageSize?: number }) {
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const getVal = col.sortValue ?? ((r: T) => (r as any)[col.key]);
    return [...rows].sort((a, b) => {
      const av = getVal(a), bv = getVal(b);
      return av > bv ? sort.dir : av < bv ? -sort.dir : 0;
    });
  }, [rows, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: string) => {
    setSort((prev) => (prev?.key === key ? { key, dir: prev.dir === 1 ? -1 : 1 } : { key, dir: 1 }));
  };

  return (
    <div>
      <div className="cds-table-wrap">
        <table className="cds-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} scope="col" aria-sort={sort?.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                  {c.sortable ? (
                    <button className="cds-th-sortable" onClick={() => toggleSort(c.key)}>
                      {c.header}
                      <span className="cds-sort-icon" data-active={sort?.key === c.key}>{sort?.key === c.key && sort.dir === -1 ? "▼" : "▲"}</span>
                    </button>
                  ) : c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.id}>
                {columns.map((c) => <td key={c.key}>{c.render ? c.render(row) : (row as any)[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, fontSize: 13, color: "var(--core-color-text-secondary)" }}>
        <span>Page {page} of {pageCount} — {sorted.length} rows</span>
        <div className="cds-pagination">
          <button className="cds-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>‹ Prev</button>
          <button className="cds-page-btn" onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page >= pageCount}>Next ›</button>
        </div>
      </div>
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
