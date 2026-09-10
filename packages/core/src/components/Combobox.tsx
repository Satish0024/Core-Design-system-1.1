import React, { useMemo, useState } from "react";

export interface ComboboxOption { value: string; label: string; }
export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Combobox({
  options,
  value = "",
  onChange,
  placeholder,
  disabled,
  id,
  className = "",
  style,
}: ComboboxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value || o.label === value);
  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  return (
    <div className={`cds-combobox ${className}`}>
      <input
        id={id}
        className="cds-input"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        disabled={disabled}
        placeholder={placeholder}
        style={style}
        value={open ? query : (selected?.label ?? value ?? "")}
        onFocus={() => {
          if (!disabled) {
            setOpen(true);
            setQuery("");
          }
        }}
        onChange={(e) => {
          if (!disabled) setQuery(e.target.value);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
      />
      {open && !disabled && (
        <div className="cds-combobox-list" role="listbox">
          {filtered.length === 0 && <div className="cds-combobox-empty">No matches</div>}
          {filtered.map((o) => (
            <div
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className="cds-combobox-option"
              onMouseDown={() => {
                onChange?.(o.value);
                setOpen(false);
              }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
