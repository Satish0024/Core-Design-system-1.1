import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { Field, Input } from "../../../../packages/core/src/components/Field";
import { Switch } from "../../../../packages/core/src/components/Misc";
import { Textarea, Select, Checkbox, Radio } from "../../../../packages/core/src/components/FormControls";
import { Toggle, ToggleGroup, InputGroup, InputOTP } from "../../../../packages/core/src/components/ToggleInputs";

export default function Forms() {
  const [on, setOn] = useState(true);
  const [plan, setPlan] = useState("roth");
  const [view, setView] = useState<"list" | "grid">("list");
  const [starred, setStarred] = useState(false);
  const [otp, setOtp] = useState("");
  return (
    <div>
      <h1 className="site-h1">Form Controls</h1>
      <p className="site-lede">Label, hint, and error are wired together via <code>aria-describedby</code> and <code>aria-invalid</code> automatically — no manual id plumbing.</p>

      <h2 className="site-section-title">Text input — default, hint, error, disabled</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 220px)", gap: 20 }}>
            <Field label="Full name">{(p) => <Input {...p} placeholder="Jordan Lee" />}</Field>
            <Field label="Employer ID" hint="Found on your enrollment letter">{(p) => <Input {...p} placeholder="e.g. 00214" />}</Field>
            <Field label="Contribution %" error="Must be between 1% and 100%">{(p) => <Input {...p} defaultValue="150" />}</Field>
            <Field label="Account number">{(p) => <Input {...p} disabled placeholder="Locked" />}</Field>
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title">Textarea</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: 320 }}>
            <Field label="Note to account manager" hint="Optional — max 500 characters">{(p) => <Textarea {...p} rows={3} placeholder="Add context for this request…" />}</Field>
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title">Select</h2>
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

      <h2 className="site-section-title">Checkbox &amp; Radio</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Checkbox label="I agree to the plan terms" defaultChecked />
            <Checkbox label="Send me email confirmations" />
            <Checkbox label="Disabled option" disabled />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginLeft: 32 }}>
            <Radio name="freq" label="Monthly" defaultChecked />
            <Radio name="freq" label="Quarterly" />
            <Radio name="freq" label="Annually" />
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title">Switch</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Switch label="Enable auto-escalation" checked={on} onChange={setOn} />
        </Preview>
      </div>

      <h2 className="site-section-title">Toggle &amp; Toggle Group</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Toggle pressed={starred} onPressedChange={setStarred}>★ Favorite</Toggle>
          <ToggleGroup value={view} onChange={setView} options={[{ value: "list", label: "List" }, { value: "grid", label: "Grid" }]} />
        </Preview>
      </div>

      <h2 className="site-section-title">Input group (prefix / suffix)</h2>
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

      <h2 className="site-section-title">Input OTP (2FA / verification codes)</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <InputOTP value={otp} onChange={setOtp} length={6} />
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
