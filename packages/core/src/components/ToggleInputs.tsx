import React, { useRef } from "react";

export function Toggle({ pressed, onPressedChange, children }: { pressed: boolean; onPressedChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <button type="button" className="cds-toggle" aria-pressed={pressed} onClick={() => onPressedChange(!pressed)}>
      {children}
    </button>
  );
}

export function ToggleGroup<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: Array<{ value: T; label: string }> }) {
  return (
    <div className="cds-toggle-group" role="group">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className="cds-toggle"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
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

export function InputOTP({ length = 6, value, onChange }: { length?: number; value: string; onChange: (v: string) => void }) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const setDigit = (i: number, d: string) => {
    const next = digits.slice();
    next[i] = d.replace(/[^0-9]/g, "").slice(-1);
    onChange(next.join(""));
    if (next[i] && i < length - 1) refs.current[i + 1]?.focus();
  };

  return (
    <div className="cds-otp" role="group" aria-label="Verification code">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="cds-otp-digit"
          inputMode="numeric"
          maxLength={1}
          value={d}
          aria-label={`Digit ${i + 1} of ${length}`}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => { if (e.key === "Backspace" && !d && i > 0) refs.current[i - 1]?.focus(); }}
        />
      ))}
    </div>
  );
}
