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
        {required && <span className="cds-required-mark" aria-hidden="true"> *</span>}
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

export type FieldVisualStyle = "default" | "solid" | "flush";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { variant?: FieldVisualStyle }>(
  ({ className = "", variant = "default", ...rest }, ref) => (
    <input ref={ref} className={`cds-input cds-field-style--${variant} ${className}`} {...rest} />
  )
);
Input.displayName = "Input";

export interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}
/** Input with a first-class leading/trailing icon slot (e.g. a search or currency icon). */
export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className = "", leadingIcon, trailingIcon, ...rest }, ref) => (
    <div className="cds-input-affix-wrap">
      {leadingIcon && <span className="cds-input-icon cds-input-icon--leading" aria-hidden="true">{leadingIcon}</span>}
      <input
        ref={ref}
        className={`cds-input ${className}`}
        data-has-leading={!!leadingIcon}
        data-has-trailing={!!trailingIcon}
        {...rest}
      />
      {trailingIcon && <span className="cds-input-icon cds-input-icon--trailing" aria-hidden="true">{trailingIcon}</span>}
    </div>
  )
);
InputWithIcon.displayName = "InputWithIcon";
