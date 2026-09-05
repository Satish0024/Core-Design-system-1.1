import React, { useId, useEffect, useRef } from "react";
import type { FieldVisualStyle } from "./Field";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { variant?: FieldVisualStyle }>(
  ({ className = "", variant = "default", ...rest }, ref) => <textarea ref={ref} className={`cds-textarea cds-field-style--${variant} ${className}`} {...rest} />
);
Textarea.displayName = "Textarea";

export interface SelectOption { value: string; label: string; }
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { options: SelectOption[]; variant?: FieldVisualStyle }>(
  ({ className = "", options, variant = "default", ...rest }, ref) => (
    <div className="cds-select-wrap">
      <select ref={ref} className={`cds-select cds-field-style--${variant} ${className}`} {...rest}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span className="cds-select-caret" aria-hidden="true">▾</span>
    </div>
  )
);
Select.displayName = "Select";

export type CheckboxTone = "brand" | "success" | "danger" | "warning";
export type CheckboxSize = "sm" | "md" | "lg";

export function Checkbox({ label, indeterminate, tone = "brand", size = "md", ...rest }: { label: string; indeterminate?: boolean; tone?: CheckboxTone; size?: CheckboxSize } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <label className="cds-checkbox" htmlFor={id}>
      <input ref={ref} id={id} type="checkbox" aria-checked={indeterminate ? "mixed" : undefined} {...rest} />
      <span className={`cds-checkbox-box cds-checkbox-box--${tone} cds-checkbox-box--${size} ${indeterminate ? "cds-checkbox-box--indeterminate" : ""}`} aria-hidden="true">
        {indeterminate ? (
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><rect width="10" height="2" rx="1" fill="white" /></svg>
        ) : (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
      </span>
      {label}
    </label>
  );
}

export function Radio({ label, size = "md", ...rest }: { label: string; size?: CheckboxSize } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">) {
  const id = useId();
  return (
    <label className="cds-radio" htmlFor={id}>
      <input id={id} type="radio" {...rest} />
      <span className={`cds-radio-box cds-radio-box--${size}`} aria-hidden="true"><span className="dot" /></span>
      {label}
    </label>
  );
}

export interface RadioGroupOption { value: string; label: string; disabled?: boolean; }
export function RadioGroup({ name, value, onChange, options, orientation = "vertical" }: { name: string; value: string; onChange: (v: string) => void; options: RadioGroupOption[]; orientation?: "vertical" | "horizontal" }) {
  const groupId = useId();
  return (
    <div role="radiogroup" aria-labelledby={groupId} style={{ display: "flex", flexDirection: orientation === "vertical" ? "column" : "row", gap: orientation === "vertical" ? 12 : 20 }}>
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          label={o.label}
          value={o.value}
          checked={value === o.value}
          disabled={o.disabled}
          onChange={() => onChange(o.value)}
        />
      ))}
    </div>
  );
}
