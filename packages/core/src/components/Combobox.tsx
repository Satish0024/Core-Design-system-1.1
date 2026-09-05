import React, { useMemo, useState } from "react";

export interface ComboboxOption { value: string; label: string; }
export function Combobox({ options, value, onChange, placeholder }: { options: ComboboxOption[]; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  return (
    <div className="cds-combobox">
      <input
        className="cds-input"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        placeholder={placeholder}
        value={open ? query : selected?.label ?? ""}
        onFocus={() => { setOpen(true); setQuery(""); }}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
      />
      {open && (
        <div className="cds-combobox-list" role="listbox">
          {filtered.length === 0 && <div className="cds-combobox-empty">No matches</div>}
          {filtered.map((o) => (
            <div
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className="cds-combobox-option"
              onMouseDown={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
