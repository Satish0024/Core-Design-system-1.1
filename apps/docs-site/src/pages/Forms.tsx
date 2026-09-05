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
  return (
    <div>
      <h1 className="site-h1">Form Controls</h1>
      <p className="site-lede">Label, hint, and error are wired together via <code>aria-describedby</code> and <code>aria-invalid</code> automatically — no manual id plumbing.</p>

      <h2 className="site-section-title" id="input">Text input — default, hint, error, disabled</h2>
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
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 320 }}>
            <Field label="Note to account manager" hint="Optional — max 500 characters">{(p) => <Textarea {...p} rows={3} placeholder="Add context for this request…" />}</Field>
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title" id="select">Select</h2>
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

      <h2 className="site-section-title" id="checkbox-radio">Checkbox &amp; Radio Group</h2>
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

      <h2 className="site-section-title" id="switch">Switch</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Switch label="Enable auto-escalation" checked={on} onChange={setOn} />
        </Preview>
      </div>

      <h2 className="site-section-title" id="toggle">Toggle &amp; Toggle Group</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Toggle pressed={starred} onPressedChange={setStarred}>★ Favorite</Toggle>
          <ToggleGroup value={view} onChange={setView} options={[{ value: "list", label: "List" }, { value: "grid", label: "Grid" }]} />
        </Preview>
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

      <h2 className="site-section-title" id="input-otp">Input OTP (2FA / verification codes)</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <InputOTP value={otp} onChange={setOtp} length={6} />
        </Preview>
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

      <h2 className="site-section-title" id="date-picker">Date Picker</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 200 }}>
            <Field label="Date of birth">{() => <DatePicker value={dob} onChange={setDob} />}</Field>
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title" id="calendar">Calendar (inline)</h2>
      <p className="site-section-sub">The same component DatePicker uses in a Popover — usable directly for date-range pickers or an always-visible calendar.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <Calendar selected={dob} onSelect={setDob} maxDate={new Date()} />
        </div>
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

      <h2 className="site-section-title" id="attachment">Attachment / File upload</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 360 }}>
            <Dropzone onFiles={(fl) => setFiles((prev) => [...prev, { id: String(Date.now()), name: fl[0].name, size: `${Math.round(fl[0].size / 1024)} KB` }])} />
            <AttachmentList files={files} onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))} />
          </div>
        </Preview>
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
