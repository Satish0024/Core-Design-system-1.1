import React from "react";
import primitives from "../../../../packages/tokens/src/primitives.json";
import { ContrastBadge } from "../ContrastBadge";
import { RoleSwatch } from "../RoleSwatch";

const color = (primitives as any).color;

const roleVars: Array<{ label: string; var: string }> = [
  { label: "Page background", var: "--core-color-bg-page" },
  { label: "Card background", var: "--core-color-surface-raised" },
  { label: "Main text", var: "--core-color-text-primary" },
  { label: "Secondary / helper text", var: "--core-color-text-secondary" },
  { label: "Borders / dividers", var: "--core-color-border-default" },
  { label: "Primary button", var: "--core-color-action-primary-bg" },
  { label: "Success message background", var: "--core-color-status-success-bg" },
  { label: "Error message background", var: "--core-color-status-danger-bg" },
];

const quickRef = [
  { use: "Primary button (Save, Submit, Continue)", hex: color.brand["600"], token: "Primary" },
  { use: "Secondary button (Cancel, Back)", hex: "#FFFFFF", token: "Secondary (white + gray border)" },
  { use: "Tertiary button / text link (Learn more)", hex: color.brand["700"], token: "Tertiary (text only, no fill)" },
  { use: "Delete / remove button", hex: color.danger["600"], token: "Destructive" },
  { use: "Button / link on hover", hex: color.brand["700"], token: "Primary (hover)" },
  { use: "Main body text, headings", hex: color.neutral["900"], token: "Main text" },
  { use: "Helper text, timestamps, secondary labels", hex: color.neutral["600"], token: "Secondary text" },
  { use: "Page background", hex: color.neutral["50"], token: "Page background" },
  { use: "Card / panel background", hex: "#FFFFFF", token: "Card background" },
  { use: "Borders, dividers, input outlines", hex: color.neutral["200"], token: "Border" },
  { use: "\"Saved\" / \"Active\" / success messages", hex: color.success["600"], token: "Success" },
  { use: "Warnings, \"needs attention\"", hex: color.warning["600"], token: "Warning" },
  { use: "Informational notices", hex: color.info["600"], token: "Info" },
  { use: "Category tags, chart series (never a button)", hex: color.accent.slate["500"], token: "Tag color 1 of 5" },
];

function Swatch({ name, hex, note, border }: { name: string; hex: string; note?: string; border?: boolean }) {
  return (
    <div className="token-swatch">
      <div className="chip" style={{ background: hex, border: border ? "1px solid var(--site-border)" : undefined }} />
      <div className="meta">
        <div className="name">{name}</div>
        <div className="value">{hex}</div>
        <div style={{ marginTop: 6, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <ContrastBadge hex={hex} />
        </div>
        {note && <div className="value" style={{ marginTop: 4 }}>{note}</div>}
      </div>
    </div>
  );
}

function Ramp({ name, scale }: { name: string; scale: Record<string, string> }) {
  return (
    <div>
      <div className="site-nav-title" style={{ padding: "0 0 8px", textTransform: "capitalize" }}>{name}</div>
      <div className="site-grid" style={{ gridTemplateColumns: `repeat(${Object.keys(scale).length}, 1fr)`, gap: 6, marginBottom: 28 }}>
        {Object.entries(scale).map(([step, hex]) => (
          <Swatch key={step} name={step} hex={hex as string} />
        ))}
      </div>
    </div>
  );
}

export default function Color() {
  return (
    <div>
      <h1 className="site-h1">Color</h1>
      <p className="site-lede">
        Use the <strong style={{ color: "var(--site-text)" }}>one purple</strong> for every primary button and link,
        the grays for text and layout, and the status colors only for success/warning/error/info messages. The table
        below covers 95% of cases — the numbered sections after it explain the reasoning.
      </p>

      <h2 className="site-section-title">Quick reference — what to use where</h2>
      <div className="site-panel site-panel--flush">
        <table className="quickref-table">
          <thead><tr><th>If you're building this…</th><th>…use this color</th></tr></thead>
          <tbody>
            {quickRef.map((r) => (
              <tr key={r.use}>
                <td>{r.use}</td>
                <td><span className="quickref-swatch" style={{ background: r.hex }} />{r.token} <span style={{ color: "var(--site-text-faint)", fontFamily: "var(--site-mono)", fontSize: 11 }}>{r.hex}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="site-section-title">1 · Primary — every default button and link</h2>
      <p className="site-section-sub">
        One purple. It's the only color allowed on a primary button, an active link, a selected nav item, or a
        focus outline. If you're not sure which color a button should be, it's this one.
      </p>
      <div className="site-panel site-grid cols-3">
        <Swatch name="Primary / Default" hex={color.brand["600"]} note="Default button color" />
        <Swatch name="Primary / Hover" hex={color.brand["700"]} note="Mouse-over / pressed state" />
        <Swatch name="Primary / Text on light backgrounds" hex={color.brand["950"]} note="Rarely used — tinted headings only" />
      </div>

      <h2 className="site-section-title">2 · Secondary &amp; Tertiary — lower-emphasis actions</h2>
      <p className="site-section-sub">
        These don't get their own hue on purpose. A screen with a purple Save button, an orange Cancel button, and
        a green "Learn more" link would look like a slot machine and give every action equal visual weight — the
        opposite of a hierarchy. Instead, CORE uses <strong style={{ color: "var(--site-text)" }}>less fill and
        less contrast</strong> to step down emphasis, reusing the same two colors (gray and primary purple) that
        already exist. This is standard practice in Atlassian, Material, and most mature design systems — hierarchy
        comes from weight, not from inventing new colors per button.
      </p>
      <div className="site-panel site-grid cols-3">
        <Swatch name="Secondary button" hex="#FFFFFF" border note="White fill + gray border + dark text — same visual family as Primary, one step down" />
        <Swatch name="Secondary button border" hex={color.neutral["300"]} note="The border that gives Secondary its outline" />
        <Swatch name="Tertiary button / link" hex={color.brand["700"]} note="No fill, no border — text only, in Primary's own color" />
      </div>

      <h2 className="site-section-title">3 · Tag colors — for labeling only, never for buttons</h2>
      <p className="site-section-sub">
        "Categorical" just means <em>used to tell categories apart</em> — like color-coding tabs in a filing
        cabinet. Use these five only for things like category tags, filter chips, or chart legend colors, so
        different groups are visually distinct. <strong style={{ color: "var(--site-text)" }}>Never use them for a
        button</strong> — buttons are always Primary, Secondary, Tertiary, or Destructive (above/below), never a tag color.
      </p>
      <div className="site-panel site-grid cols-4">
        <Swatch name="Tag color 1" hex={color.accent.slate["500"]} note='e.g. "General" tag' />
        <Swatch name="Tag color 2" hex={color.accent.plum["500"]} note='e.g. "Beneficiary" tag' />
        <Swatch name="Tag color 3" hex={color.accent.ocean["500"]} note='e.g. "Contribution" tag' />
        <Swatch name="Tag color 4" hex={color.accent.teal["500"]} note='e.g. "Investment" tag' />
        <Swatch name="Tag color 5" hex={color.accent.amber["500"]} note='e.g. "Loan" tag' />
      </div>

      <h2 className="site-section-title">4 · Grays — text, backgrounds, borders</h2>
      <div className="site-panel site-grid cols-4">
        <Swatch name="Page background" hex={color.neutral["50"]} note="Behind every screen" />
        <Swatch name="Border / divider" hex={color.neutral["200"]} note="Lines between things" />
        <Swatch name="Secondary text" hex={color.neutral["600"]} note="Helper text, timestamps" />
        <Swatch name="Main text" hex={color.neutral["900"]} note="Headings, body copy" />
      </div>

      <h2 className="site-section-title">5 · Status colors — messages only</h2>
      <p className="site-section-sub">One color per meaning: green = success, orange = warning, red = error/danger, blue = neutral info.</p>
      <div className="site-panel site-grid cols-4">
        {(["success", "warning", "danger", "info"] as const).map((s) => (
          <Swatch key={s} name={s[0].toUpperCase() + s.slice(1)} hex={color[s]["600"]} note={s === "danger" ? "Also used for the Delete/destructive button" : "Message text/icon color"} />
        ))}
      </div>

      <h2 className="site-section-title">6 · Light &amp; dark mode</h2>
      <p className="site-section-sub">
        Every role above has a dark-mode equivalent already built in — flipping the mode only changes these CSS
        variables, no component code changes. Contrast is measured live against each mode's real background.
      </p>
      <div className="site-grid cols-2">
        <div>
          <div className="site-nav-title" style={{ padding: "0 0 8px" }}>Light</div>
          <div className="site-panel site-panel--flush">
            <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
              <div className="site-grid cols-2" style={{ width: "100%" }}>
                {roleVars.map((r) => <RoleSwatch key={r.var} name={r.label} varName={r.var} />)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="site-nav-title" style={{ padding: "0 0 8px" }}>Dark</div>
          <div className="site-panel site-panel--flush">
            <div className="preview-surface" data-theme="core" data-mode="dark" style={{ background: "var(--core-color-bg-page)" }}>
              <div className="site-grid cols-2" style={{ width: "100%" }}>
                {roleVars.map((r) => <RoleSwatch key={r.var} name={r.label} varName={r.var} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="site-section-title">Full color scales (reference)</h2>
      <p className="site-section-sub">You shouldn't need to pick from these directly — they're what the roles above are built from.</p>
      <div className="site-panel">
        <Ramp name="brand" scale={color.brand} />
        <Ramp name="neutral" scale={color.neutral} />
        <Ramp name="success" scale={color.success} />
        <Ramp name="warning" scale={color.warning} />
        <Ramp name="danger" scale={color.danger} />
        <Ramp name="info" scale={color.info} />
      </div>

      <h2 className="site-section-title">Why white-label clients don't need their own secondary/tertiary hue</h2>
      <p className="site-section-sub">
        A client theme (see <a href="/themes" style={{ color: "var(--site-accent)" }}>Themes</a>) only overrides the
        Primary brand ramp, radius, and font. Secondary and Tertiary automatically stay in gray/Primary-text form —
        so LendGuard's green Primary button gets a matching green Tertiary link for free, with zero extra tokens
        the client has to define.
      </p>

      <h2 className="site-section-title">Do / Don't</h2>
      <div className="dodont">
        <div className="box do">
          <span className="tag">Do</span>
          Use Primary for the one main action on a screen, Secondary/Tertiary for lower-emphasis actions next to it.
        </div>
        <div className="box dont">
          <span className="tag">Don't</span>
          Invent a new color for "less important" buttons — step down with less fill, not a different hue.
        </div>
      </div>
    </div>
  );
}
