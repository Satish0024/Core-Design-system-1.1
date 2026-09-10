import React, { useRef } from "react";

export function Toggle({
  pressed,
  onPressedChange,
  children,
  disabled,
}: {
  pressed: boolean;
  onPressedChange: (v: boolean) => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="cds-toggle"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={() => !disabled && onPressedChange(!pressed)}
    >
      {children}
    </button>
  );
}

export function ToggleGroup<T extends string>({
  value,
  onChange,
  options,
  disabled,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string; disabled?: boolean }>;
  disabled?: boolean;
}) {
  return (
    <div className={`cds-toggle-group ${disabled ? "cds-toggle-group--disabled" : ""}`} role="group">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className="cds-toggle"
          aria-pressed={value === o.value}
          disabled={disabled || o.disabled}
          onClick={() => !(disabled || o.disabled) && onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function InputGroup({ prefix, suffix, children }: { prefix?: string; suffix?: string; children: React.ReactElement }) {
  return (
    <div className="cds-input-group">
      {prefix && <span className="cds-input-group-addon">{prefix}</span>}
      {children}
      {suffix && <span className="cds-input-group-addon">{suffix}</span>}
    </div>
  );
}

export interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (v: string) => void;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
  "aria-label"?: string;
  "aria-required"?: boolean;
}

export function InputOTP({
  length = 6,
  value = "",
  onChange,
  error,
  disabled = false,
  readOnly = false,
  id,
  className = "",
  style,
  ...rest
}: InputOTPProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = (value || "").split("").concat(Array(length).fill("")).slice(0, length);
  const isError = Boolean(error || rest["aria-invalid"] === true || rest["aria-invalid"] === "true");

  const setDigit = (i: number, d: string) => {
    if (disabled || readOnly) return;
    const next = digits.slice();
    next[i] = d.replace(/[^0-9]/g, "").slice(-1);
    onChange?.(next.join(""));
    if (next[i] && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    if (e.key === "Backspace") {
      if (!digits[i] && i > 0) {
        refs.current[i - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      refs.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled || readOnly) return;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").replace(/[^0-9]/g, "").slice(0, length);
    if (pasted && onChange) {
      onChange(pasted);
      const focusIndex = Math.min(pasted.length, length - 1);
      refs.current[focusIndex]?.focus();
    }
  };

  return (
    <div
      className={`cds-otp ${isError ? "cds-otp--error" : ""} ${disabled ? "cds-otp--disabled" : ""} ${className}`.trim()}
      role="group"
      aria-label={rest["aria-label"] || "Verification code"}
      onPaste={handlePaste}
      style={style}
    >
      {digits.map((d, i) => (
        <input
          key={i}
          id={i === 0 ? id : undefined}
          ref={(el) => { refs.current[i] = el; }}
          className={`cds-otp-digit ${isError ? "cds-otp-digit--error" : ""}`.trim()}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={d}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={isError ? "true" : undefined}
          aria-describedby={rest["aria-describedby"]}
          aria-required={rest["aria-required"]}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}
