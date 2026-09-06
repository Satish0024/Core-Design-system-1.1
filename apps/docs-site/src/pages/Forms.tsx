import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { Field, Input, InputWithIcon } from "../../../../packages/core/src/components/Field";
import { Icon } from "../../../../packages/core/src/components/Primitives";
import { Switch } from "../../../../packages/core/src/components/Misc";
import { Textarea, Select, Checkbox, RadioGroup } from "../../../../packages/core/src/components/FormControls";
import { Toggle, ToggleGroup, InputGroup, InputOTP } from "../../../../packages/core/src/components/ToggleInputs";
import { Slider } from "../../../../packages/core/src/components/Primitives";
import { Combobox } from "../../../../packages/core/src/components/Combobox";
import { Calendar, DatePicker } from "../../../../packages/core/src/components/Calendar";
import { Dropzone, AttachmentList, AttachmentFile } from "../../../../packages/core/src/components/Attachment";
import { AutoAnatomy, AutoAnatomyLegend } from "../AutoAnatomy";

const employers = [
  { value: "acme", label: "Acme Corporation" },
  { value: "globex", label: "Globex Industries" },
  { value: "initech", label: "Initech" },
  { value: "umbrella", label: "Umbrella Health" },
];

export default function Forms() {
  const [on, setOn] = useState(true);
  const [plan, setPlan] = useState("roth");
  const [view, setView] = useState<"list" | "grid">("list");
  const [starred, setStarred] = useState(false);
  const [otp, setOtp] = useState("");
  const [contribPct, setContribPct] = useState(6);
  const [employer, setEmployer] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [files, setFiles] = useState<AttachmentFile[]>([{ id: "1", name: "beneficiary-form.pdf", size: "212 KB" }]);
  const [freq, setFreq] = useState("monthly");
  const [cardNumber, setCardNumber] = useState("");
  const [routing, setRouting] = useState("");
  const [account, setAccount] = useState("");

  // Groups digits as "1234 5678 9012 3456" — formatting logic lives with the
  // usage, not baked into Input itself, so any masked-number field (card,
  // routing, SSN, ...) composes the same way.
  const formatCardNumber = (raw: string) => raw.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  return (
    <div>
      <h1 className="site-h1">Form Controls</h1>
      <p className="site-lede">Label, hint, and error are wired together via <code>aria-describedby</code> and <code>aria-invalid</code> automatically — no manual id plumbing.</p>

      <h2 className="site-section-title" id="input">Input</h2>
      <p className="site-section-sub">Anatomy</p>
      <table className="spec-table" style={{ marginBottom: 20 }}>
        <thead><tr><th>Property</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Height</td><td>40px (single fixed size — no sm/lg variant yet)</td></tr>
          <tr><td>Horizontal padding</td><td>12px</td></tr>
          <tr><td>Font size</td><td>16px (matches control-md text scale)</td></tr>
          <tr><td>Border</td><td>1px, radius <code>input.radius</code> (6px on CORE)</td></tr>
          <tr><td>Focus ring</td><td>3px, 25% opacity, offset 0 (box-shadow, not outline)</td></tr>
          <tr><td>Icon slot (InputWithIcon)</td><td>Icon at 12px from edge, input padding extends to 34px on that side</td></tr>
        </tbody>
      </table>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Placeholder text", anchor: "center", offset: 50 },
          { n: 2, label: "Height — 40px", anchor: "left" },
          { n: 3, label: "Padding — 12px", anchor: "bottom" },
        ]}>
          <Input placeholder="e.g. 00214" style={{ width: 200 }} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Placeholder: input.placeholder color, never used as a label replacement", anchor: "center" },
          { n: 2, label: "Height: 40px fixed", anchor: "left" },
          { n: 3, label: "Horizontal padding: 12px each side", anchor: "bottom" },
        ]} />
      </div>
      <p className="site-section-sub" style={{ marginTop: 0 }}>Default, hint, error, disabled:</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 220px)", gap: 20 }}>
            <Field label="Full name" required>{(p) => <Input {...p} placeholder="Jordan Lee" />}</Field>
            <Field label="Employer ID" hint="Found on your enrollment letter">{(p) => <Input {...p} placeholder="e.g. 00214" />}</Field>
            <Field label="Contribution %" error="Must be between 1% and 100%">{(p) => <Input {...p} defaultValue="150" />}</Field>
            <Field label="Account number">{(p) => <Input {...p} disabled placeholder="Locked" />}</Field>
          </div>
        </Preview>
      </div>

      <p className="site-section-sub">Background style — default (bordered), solid (filled), flush (underline only, no box):</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Input variant="default" placeholder="Default" style={{ width: 140 }} />
          <Input variant="solid" placeholder="Solid" style={{ width: 140 }} />
          <Input variant="flush" placeholder="Flush" style={{ width: 140 }} />
        </Preview>
      </div>

      <h2 className="site-section-title" id="textarea">Textarea</h2>
      <table className="spec-table" style={{ marginBottom: 20 }}>
        <thead><tr><th>Property</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Min height</td><td>88px (grows with content, resizable vertically)</td></tr>
          <tr><td>Padding</td><td>10px vertical, 12px horizontal</td></tr>
          <tr><td>Font size</td><td>16px</td></tr>
        </tbody>
      </table>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 320 }}>
            <Field label="Note to account manager" hint="Optional — max 500 characters">{(p) => <Textarea {...p} rows={3} placeholder="Add context for this request…" />}</Field>
          </div>
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Resize handle — bottom-right, vertical only", anchor: "bottom-right" },
          { n: 2, label: "Min-height — 88px", anchor: "left" }
        ]}>
          <Textarea placeholder="Add context…" rows={3} style={{ width: 220 }} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Resize handle: vertical-only drag, bottom-right corner", anchor: "bottom-right" },
          { n: 2, label: "Min-height: 88px, grows with content", anchor: "left" }
        ]} />
      </div>

      <h2 className="site-section-title" id="select">Select</h2>
      <table className="spec-table" style={{ marginBottom: 20 }}>
        <thead><tr><th>Property</th><th>Small</th><th>Medium (default)</th></tr></thead>
        <tbody>
          <tr><td>Height</td><td>32px</td><td>40px</td></tr>
          <tr><td>Padding</td><td>0 32px 0 10px</td><td>0 36px 0 12px</td></tr>
          <tr><td>Font size</td><td>14px</td><td>16px</td></tr>
          <tr><td>Listbox popup</td><td colSpan={2}>Max height 260px, 4px padding, options 8px/10px padding, 6px radius</td></tr>
        </tbody>
      </table>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 220 }}>
            <Field label="Investment plan">{(p) => (
              <Select
                {...p}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                options={[
                  { value: "roth", label: "Roth 401(k)" },
                  { value: "traditional", label: "Traditional 401(k)" },
                  { value: "brokerage", label: "Self-directed brokerage" },
                ]}
              />
            )}</Field>
          </div>
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Caret — fixed, indicates a popup listbox", anchor: "right" },
          { n: 2, label: "Height — 40px (md)", anchor: "left" }
        ]}>
          <Select options={[{ value: "a", label: "Roth 401(k)" }]} value="a" placeholder="Select…" style={{ width: 200 }} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Caret: static (no rotation), signals a listbox popup will open below", anchor: "right" },
          { n: 2, label: "Height: 32px (sm) / 40px (md)", anchor: "left" }
        ]} />
      </div>

      <h2 className="site-section-title" id="checkbox-radio">Checkbox &amp; Radio Group</h2>
      <table className="spec-table" style={{ marginBottom: 20 }}>
        <thead><tr><th>Property</th><th>Small</th><th>Medium (default)</th><th>Large</th></tr></thead>
        <tbody>
          <tr><td>Box size</td><td>14×14px</td><td>18×18px</td><td>22×22px</td></tr>
          <tr><td>Border</td><td colSpan={3}>1.5px, radius 5px (checkbox) / 50% (radio)</td></tr>
          <tr><td>Label gap</td><td colSpan={3}>8px between box and label text</td></tr>
        </tbody>
      </table>
      <p className="site-section-sub">Checkbox includes an indeterminate state (e.g. "select all" when some but not all rows are checked). Radio Group manages a single selected value with <code>role="radiogroup"</code>.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Checkbox label="I agree to the plan terms" defaultChecked />
            <Checkbox label="Send me email confirmations" />
            <Checkbox label="Select all (some selected)" indeterminate />
            <Checkbox label="Disabled option" disabled />
          </div>
          <div style={{ marginLeft: 32 }}>
            <RadioGroup
              name="freq"
              value={freq}
              onChange={setFreq}
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "quarterly", label: "Quarterly" },
                { value: "annually", label: "Annually" },
              ]}
            />
          </div>
        </Preview>
      </div>

      <p className="site-section-sub">Sizes and tone (checked-state color, for status-representing checkboxes):</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Checkbox label="Small" size="sm" defaultChecked />
          <Checkbox label="Medium" size="md" defaultChecked />
          <Checkbox label="Large" size="lg" defaultChecked />
          <Checkbox label="Flagged" tone="danger" defaultChecked />
          <Checkbox label="Needs review" tone="warning" defaultChecked />
          <Checkbox label="Verified" tone="success" defaultChecked />
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Box — 18×18px (md)", anchor: "left" },
          { n: 2, label: "Label gap — 8px", anchor: "right" }
        ]}>
          <Checkbox label="Verified" defaultChecked />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Box: 14/18/22px per size, checked-state uses tone color", anchor: "left" },
          { n: 2, label: "Label gap: 8px between box and text", anchor: "right" }
        ]} />
      </div>

      <h2 className="site-section-title" id="switch">Switch</h2>
      <table className="spec-table" style={{ marginBottom: 20 }}>
        <thead><tr><th>Property</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Track</td><td>36×20px, fully rounded</td></tr>
          <tr><td>Thumb</td><td>16×16px, 2px inset, travels 16px on toggle</td></tr>
        </tbody>
      </table>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Switch label="Enable auto-escalation" checked={on} onChange={setOn} />
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Track — 36×20px", anchor: "left" },
          { n: 2, label: "Thumb travel — 16px", anchor: "bottom" }
        ]}>
          <Switch label="Enable auto-escalation" checked={on} onChange={setOn} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Track: 36×20px, fully rounded", anchor: "left" },
          { n: 2, label: "Thumb: 16×16px, travels 16px, 2px inset from track edge", anchor: "bottom" }
        ]} />
      </div>

      <h2 className="site-section-title" id="toggle">Toggle &amp; Toggle Group</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Toggle pressed={starred} onPressedChange={setStarred}>★ Favorite</Toggle>
          <ToggleGroup value={view} onChange={setView} options={[{ value: "list", label: "List" }, { value: "grid", label: "Grid" }]} />
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Group padding — 2px around segments", anchor: "top" },
          { n: 2, label: "Active segment — raised, subtle shadow", anchor: "bottom" }
        ]}>
          <ToggleGroup value={view} onChange={setView} options={[{ value: "list", label: "List" }, { value: "grid", label: "Grid" }]} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Group container: 2px padding, surface-sunken background", anchor: "top" },
          { n: 2, label: "Active segment: surface-raised background + 1px shadow, no color change", anchor: "bottom" }
        ]} />
      </div>

      <h2 className="site-section-title" id="input-group">Input group (prefix / suffix)</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 200 }}>
            <Field label="Contribution amount">{(p) => (
              <InputGroup prefix="$"><Input {...p} defaultValue="250" /></InputGroup>
            )}</Field>
          </div>
          <div style={{ width: 160 }}>
            <Field label="Contribution %">{(p) => (
              <InputGroup suffix="%"><Input {...p} defaultValue="6" /></InputGroup>
            )}</Field>
          </div>
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Addon — same height as input, no gap", anchor: "left" },
          { n: 2, label: "Shared border, no double line", anchor: "bottom" }
        ]}>
          <InputGroup prefix="$"><Input defaultValue="250" style={{ width: 140 }} /></InputGroup>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Addon: matches input height exactly, surface-sunken background", anchor: "left" },
          { n: 2, label: "Border: addon and input share one continuous border, radius only on outer corners", anchor: "bottom" }
        ]} />
      </div>

      <h2 className="site-section-title" id="input-otp">Input OTP (2FA / verification codes)</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <InputOTP value={otp} onChange={setOtp} length={6} />
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Digit box — 40×44px", anchor: "left" },
          { n: 2, label: "Gap between boxes — 8px", anchor: "bottom" }
        ]}>
          <InputOTP value="12" onChange={() => {}} length={6} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Digit box: 40×44px, auto-advances focus on entry", anchor: "left" },
          { n: 2, label: "Gap: 8px between boxes", anchor: "bottom" }
        ]} />
      </div>

      <h2 className="site-section-title" id="slider">Slider</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 260 }}>
            <Field label="Contribution rate">{() => (
              <Slider value={contribPct} min={0} max={25} onChange={setContribPct} formatValue={(v) => `${v}%`} />
            )}</Field>
          </div>
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Thumb — 18px, draggable + arrow-key steppable", anchor: "top" },
          { n: 2, label: "Track — 4px, fully rounded", anchor: "bottom" }
        ]}>
          <div style={{ width: 220 }}><Slider value={12} min={0} max={25} onChange={() => {}} formatValue={(v) => `${v}%`} /></div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Thumb: 18×18px circle, keyboard-operable via arrow keys", anchor: "top" },
          { n: 2, label: "Track: 4px height, fully rounded, filled portion uses Primary", anchor: "bottom" }
        ]} />
      </div>

      <h2 className="site-section-title" id="combobox">Combobox (searchable select)</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 240 }}>
            <Field label="Employer">{() => (
              <Combobox options={employers} value={employer} onChange={setEmployer} placeholder="Search employer…" />
            )}</Field>
          </div>
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Input — same box style as Input", anchor: "top" },
          { n: 2, label: "Popup listbox — opens below, 4px gap", anchor: "bottom" }
        ]}>
          <Combobox options={employers} value="" onChange={() => {}} placeholder="Search employer…" />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Input: identical visual style to a plain Input, so it doesn't look like a different control", anchor: "top" },
          { n: 2, label: "Popup: 4px gap, elevation.3 shadow, max-height 220px", anchor: "bottom" }
        ]} />
      </div>

      <h2 className="site-section-title" id="date-picker">Date Picker</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 200 }}>
            <Field label="Date of birth">{() => <DatePicker value={dob} onChange={setDob} />}</Field>
          </div>
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Read-only display field — opens Calendar in a Popover", anchor: "top" },
          { n: 2, label: "Calendar icon — decorative, click target is the whole field", anchor: "right" }
        ]}>
          <DatePicker value={undefined} onChange={() => {}} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Field: read-only, click anywhere on it to open", anchor: "top" },
          { n: 2, label: "Whole field is the click target, not just the calendar icon", anchor: "right" }
        ]} />
      </div>

      <h2 className="site-section-title" id="calendar">Calendar (inline)</h2>
      <p className="site-section-sub">The same component DatePicker uses in a Popover — usable directly for date-range pickers or an always-visible calendar.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <Calendar selected={dob} onSelect={setDob} maxDate={new Date()} />
        </div>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Day cell — 32×32px", anchor: "left" },
          { n: 2, label: "Selected day — filled Primary circle", anchor: "bottom" }
        ]}>
          <Calendar selected={undefined} onSelect={() => {}} maxDate={new Date()} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Day cell: 32×32px, 7-column grid", anchor: "left" },
          { n: 2, label: "Selected: Primary fill; disabled days use text.disabled", anchor: "bottom" }
        ]} />
      </div>

      <h2 className="site-section-title" id="input-icon">Input with icon</h2>
      <p className="site-section-sub">First-class leading/trailing icon slot — no manual absolute-positioning needed per usage.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 200 }}>
            <Field label="Search transactions">{(p) => <InputWithIcon {...p} leadingIcon={<Icon name="fa-solid fa-magnifying-glass" size="sm" />} placeholder="Search…" />}</Field>
          </div>
          <div style={{ width: 160 }}>
            <Field label="Amount">{(p) => <InputWithIcon {...p} leadingIcon={<Icon name="fa-solid fa-dollar-sign" size="sm" />} defaultValue="250" />}</Field>
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title" id="payment-bank-fields">Payment &amp; bank detail fields</h2>
      <p className="site-section-sub">
        The recurring sensitive-number pattern (card number, bank routing/account number, SSN) — a masked/
        formatted <code>Input</code> composed with <code>Field</code>, never a new component. Formatting logic
        (grouping digits, masking all but the last 4) lives in the usage, not in <code>Input</code> itself.
      </p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Trailing icon — card brand, decorative", anchor: "right" },
          { n: 2, label: "Digit grouping — formatted as you type", anchor: "top" },
          { n: 3, label: "Hint — states exactly what's masked and why", anchor: "bottom" },
        ]}>
          <div style={{ width: 260 }}>
            <Field label="Card number" hint="Stored securely — only the last 4 digits are ever shown again.">
              {(p) => (
                <InputWithIcon
                  {...p}
                  trailingIcon={<Icon name="fa-solid fa-credit-card" size="sm" />}
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                />
              )}
            </Field>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Trailing icon: card-brand glyph, aria-hidden — decorative only, never the only cue", anchor: "right" },
          { n: 2, label: "Grouping: 4-digit blocks inserted on input, not a browser autofill artifact", anchor: "top" },
          { n: 3, label: "Hint: explicit about what's masked/stored — a sensitive field always says why", anchor: "bottom" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 220 }}>
            <Field label="Expiration date">{(p) => <Input {...p} placeholder="MM / YY" inputMode="numeric" />}</Field>
          </div>
          <div style={{ width: 120 }}>
            <Field label="CVC" hint="3 digits, back of card">{(p) => <Input {...p} placeholder="123" inputMode="numeric" maxLength={4} />}</Field>
          </div>
        </Preview>
      </div>
      <p className="site-section-sub" style={{ marginTop: 24 }}>Bank details — routing and account number, each with its own format hint since a mis-keyed digit here fails silently until settlement.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 200 }}>
            <Field label="Routing number" hint="9 digits, bottom-left of a check">
              {(p) => <Input {...p} inputMode="numeric" maxLength={9} placeholder="021000021" value={routing} onChange={(e) => setRouting(e.target.value.replace(/\D/g, "").slice(0, 9))} />}
            </Field>
          </div>
          <div style={{ width: 220 }}>
            <Field label="Account number" hint="Re-enter to confirm on submit">
              {(p) => <Input {...p} inputMode="numeric" placeholder="000123456789" value={account} onChange={(e) => setAccount(e.target.value.replace(/\D/g, ""))} />}
            </Field>
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title" id="attachment">Attachment / File upload</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 360 }}>
            <Dropzone onFiles={(fl) => setFiles((prev) => [...prev, { id: String(Date.now()), name: fl[0].name, size: `${Math.round(fl[0].size / 1024)} KB` }])} />
            <AttachmentList files={files} onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))} />
          </div>
        </Preview>
      </div>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Dashed border — 1.5px, drop target", anchor: "top" },
          { n: 2, label: "Padding — 28px", anchor: "bottom" }
        ]}>
          <div style={{ width: 280 }}><Dropzone onFiles={() => {}} /></div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Border: 1.5px dashed, indicates a drop target visually", anchor: "top" },
          { n: 2, label: "Padding: 28px, surface-sunken background", anchor: "bottom" }
        ]} />
      </div>

      <h2 className="site-section-title">Accessibility</h2>
      <ul style={{ color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
        <li>Every input has a programmatically associated <code>&lt;label&gt;</code> — never placeholder-only labeling.</li>
        <li>Error text is exposed with <code>role="alert"</code> so screen readers announce it immediately on submit.</li>
        <li>Checkbox/Radio use real native inputs (visually hidden), so keyboard and screen-reader behavior come for free.</li>
        <li>Select uses the native <code>&lt;select&gt;</code> — full OS-level keyboard and accessibility support, no custom listbox to maintain.</li>
      </ul>

      <h2 className="site-section-title">Code</h2>
      <CodeBlock>{`<Field label="Contribution %" error={errors.contribution}>
  {(fieldProps) => <Input {...fieldProps} value={value} onChange={onChange} />}
</Field>

<Select options={planOptions} value={plan} onChange={onPlanChange} />
<Checkbox label="I agree to the plan terms" checked={agreed} onChange={setAgreed} />`}</CodeBlock>
    </div>
  );
}
