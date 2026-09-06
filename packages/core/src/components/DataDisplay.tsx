import React, { useMemo, useState } from "react";
import { Select } from "./FormControls";

export interface Column<T> { key: string; header: string; render?: (row: T) => React.ReactNode; }
export function Table<T extends { id: string | number }>({ columns, rows, density = "comfortable", zebra = true }: { columns: Column<T>[]; rows: T[]; density?: "comfortable" | "compact"; zebra?: boolean }) {
  return (
    <div className="cds-table-wrap">
      <table className="cds-table" data-density={density} data-zebra={zebra}>
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
export interface TableFilterDef { key: string; label: string; options: Array<{ value: string; label: string }> }

export function DataTable<T extends { id: string | number }>({
  columns, rows, pageSize = 5, searchable = false, searchPlaceholder = "Search…", filters, zebra = true,
}: {
  columns: SortableColumn<T>[]; rows: T[]; pageSize?: number;
  searchable?: boolean; searchPlaceholder?: string; filters?: TableFilterDef[]; zebra?: boolean;
}) {
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    let result = rows;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((row) =>
        columns.some((c) => String((row as any)[c.key] ?? "").toLowerCase().includes(q))
      );
    }
    for (const [key, value] of Object.entries(filterValues)) {
      if (!value) continue;
      result = result.filter((row) => String((row as any)[key]) === value);
    }
    return result;
  }, [rows, query, filterValues, columns]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return filtered;
    const getVal = col.sortValue ?? ((r: T) => (r as any)[col.key]);
    return [...filtered].sort((a, b) => {
      const av = getVal(a), bv = getVal(b);
      return av > bv ? sort.dir : av < bv ? -sort.dir : 0;
    });
  }, [filtered, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const page_ = Math.min(page, pageCount);
  const pageRows = sorted.slice((page_ - 1) * pageSize, page_ * pageSize);

  const toggleSort = (key: string) => {
    setSort((prev) => (prev?.key === key ? { key, dir: prev.dir === 1 ? -1 : 1 } : { key, dir: 1 }));
  };

  const hasToolbar = searchable || (filters && filters.length > 0);

  return (
    <div>
      {hasToolbar && (
        <div className="cds-table-toolbar">
          {searchable && (
            <input
              className="cds-input cds-table-search"
              type="search"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              aria-label="Search table"
            />
          )}
          {filters?.map((f) => (
            <Select
              key={f.key}
              style={{ width: "auto", minWidth: 140 }}
              aria-label={f.label}
              value={filterValues[f.key] ?? ""}
              options={[{ value: "", label: `${f.label}: All` }, ...f.options]}
              onChange={(e) => { setFilterValues((prev) => ({ ...prev, [f.key]: e.target.value })); setPage(1); }}
            />
          ))}
        </div>
      )}
      <div className="cds-table-wrap">
        <table className="cds-table" data-zebra={zebra}>
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
            {pageRows.length === 0 ? (
              <tr><td colSpan={columns.length} className="cds-table-empty">No results match your search or filters.</td></tr>
            ) : pageRows.map((row) => (
              <tr key={row.id}>
                {columns.map((c) => <td key={c.key}>{c.render ? c.render(row) : (row as any)[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, fontSize: 13, color: "var(--core-color-text-secondary)" }}>
        <span>Page {page_} of {pageCount} — {sorted.length} rows</span>
        <div className="cds-pagination">
          <button className="cds-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page_ <= 1}>‹ Prev</button>
          <button className="cds-page-btn" onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page_ >= pageCount}>Next ›</button>
        </div>
      </div>
    </div>
  );
}

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "away" | "offline";
export function Avatar({ name, src, size = "md", status }: { name: string; src?: string; size?: AvatarSize; status?: AvatarStatus }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span className="cds-avatar-wrap">
      <span className={`cds-avatar cds-avatar--${size}`} role="img" aria-label={name}>
        {src ? <img src={src} alt="" /> : initials}
      </span>
      {status && <span className={`cds-avatar-status cds-avatar-status--${status}`} aria-label={`Status: ${status}`} />}
    </span>
  );
}

export function AvatarGroup({ avatars, max = 4 }: { avatars: Array<{ name: string; src?: string }>; max?: number }) {
  const shown = avatars.slice(0, max);
  const overflow = avatars.length - shown.length;
  return (
    <span className="cds-avatar-group">
      {shown.map((a, i) => (
        <span className="cds-avatar-group-item" key={i}><Avatar name={a.name} src={a.src} size="sm" /></span>
      ))}
      {overflow > 0 && (
        <span className="cds-avatar-group-item cds-avatar cds-avatar--sm" aria-label={`${overflow} more`}>+{overflow}</span>
      )}
    </span>
  );
}

export function Progress({ value, label, indeterminate = false }: { value?: number; label?: string; indeterminate?: boolean }) {
  return (
    <div>
      {label && <div style={{ fontSize: 12, marginBottom: 4, color: "var(--core-color-text-secondary)" }}>{label}</div>}
      <div
        className={`cds-progress ${indeterminate ? "cds-progress--indeterminate" : ""}`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-busy={indeterminate || undefined}
      >
        <div className="cds-progress-bar" style={indeterminate ? undefined : { width: `${Math.min(100, Math.max(0, value ?? 0))}%` }} />
      </div>
    </div>
  );
}
