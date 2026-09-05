import React, { useId } from "react";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...rest }, ref) => <textarea ref={ref} className={`cds-textarea ${className}`} {...rest} />
);
Textarea.displayName = "Textarea";

export interface SelectOption { value: string; label: string; }
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { options: SelectOption[] }>(
  ({ className = "", options, ...rest }, ref) => (
    <div className="cds-select-wrap">
      <select ref={ref} className={`cds-select ${className}`} {...rest}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span className="cds-select-caret" aria-hidden="true">▾</span>
    </div>
  )
);
Select.displayName = "Select";

export function Checkbox({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <label className="cds-checkbox" htmlFor={id}>
      <input id={id} type="checkbox" {...rest} />
      <span className="cds-checkbox-box" aria-hidden="true">
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      {label}
    </label>
  );
}

export function Radio({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <label className="cds-radio" htmlFor={id}>
      <input id={id} type="radio" {...rest} />
      <span className="cds-radio-box" aria-hidden="true"><span className="dot" /></span>
      {label}
    </label>
  );
}
