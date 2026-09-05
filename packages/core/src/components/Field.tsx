import React, { useId } from "react";

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (fieldProps: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean; "aria-required"?: boolean }) => React.ReactNode;
}

export function Field({ label, hint, error, required, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="cds-field">
      <label className="cds-label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": !!error,
        "aria-required": required,
      })}
      {hint && !error && (
        <span id={hintId} className="cds-hint">{hint}</span>
      )}
      {error && (
        <span id={errorId} role="alert" className="cds-error-text">{error}</span>
      )}
    </div>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...rest }, ref) => (
    <input ref={ref} className={`cds-input ${className}`} {...rest} />
  )
);
Input.displayName = "Input";
