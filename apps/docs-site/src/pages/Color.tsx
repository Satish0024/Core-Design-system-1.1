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
  { use: "Primary button (Save, Submit, Continue) — the default for almost everything", hex: color.brand["600"], token: "Primary" },
  { use: "Button / link on hover", hex: color.brand["700"], token: "Primary (hover)" },
  { use: "Secondary emphasis — a highlighted stat, an alternate metric, a \"new\" indicator", hex: color.secondary["600"], token: "Secondary" },
  { use: "Tertiary emphasis — rare accents, a supporting badge, a subtle callout", hex: color.tertiary["600"], token: "Tertiary" },
  { use: "Delete / remove button", hex: color.danger["600"], token: "Destructive" },
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

// Single source of truth for numbered-section order — the number shown is always
// this array's position (1-based), computed via indexOf, never a typed literal.
// Reorder this array to renumber the page; nothing else needs to change.
const SECTION_ORDER = [
  "Primary — used throughout",
  "Secondary — used in specific cases",
  "Tertiary — the rarest color",
  "Button emphasis levels — a separate system from the colors above",
  "Tag colors — for labeling only, never for buttons",
  "Grays — text, backgrounds, borders",
  "Text colors — exactly which text uses which color",
  "Status colors — messages only",
  "Light & dark mode",
];

function SectionTitle({ title }: { title: string }) {
  const n = SECTION_ORDER.indexOf(title);
  if (n === -1) throw new Error(`SectionTitle "${title}" is missing from SECTION_ORDER`);
  return <h2 className="site-section-title">{n + 1} · {title}</h2>;
}

export default function Color() {
  return (
    <div>
      <h1 className="site-h1">Color</h1>
      <p className="site-lede">
        <strong style={{ color: "var(--site-text)" }}>Primary is used throughout</strong> the product — every
        default button, link, and focus state. Secondary and Tertiary are real, distinct colors too, but used
        sparingly, only in the specific cases below. The sections that follow build up the reasoning; the quick
        reference table after the full color scales covers 95% of cases in one lookup.
      </p>

      <SectionTitle title="Primary — used throughout" />
      <p className="site-section-sub">
        One purple. It's the default for every primary button, active link, selected nav item, and focus outline.
        When in doubt, this is the color — Primary should be what the product reaches for first, everywhere.
      </p>
      <div className="site-panel site-grid cols-3">
        <Swatch name="Primary / Default" hex={color.brand["600"]} note="Default button color" />
        <Swatch name="Primary / Hover" hex={color.brand["700"]} note="Mouse-over / pressed state" />
        <Swatch name="Primary / Text on light backgrounds" hex={color.brand["950"]} note="Rarely used — tinted headings only" />
      </div>

      <SectionTitle title="Secondary — used in specific cases" />
      <p className="site-section-sub">
        A genuine second hue (teal), not just a lighter Primary. Reach for it when something needs to stand apart
        from the main action flow but still carry real emphasis — a highlighted secondary stat next to the
        headline number, a "new" or "beta" indicator, an alternate call-to-action that must visually differ from
        Primary because both appear together (e.g. "Compare plans" next to "Enroll now").
        <strong style={{ color: "var(--site-text)" }}> It is not a lower-emphasis version of Primary</strong> —
        for that, see the button-weight system below — it's a different color for a different meaning.
      </p>
      <div className="site-panel site-grid cols-3">
        <Swatch name="Secondary / Solid" hex={color.secondary["600"]} note='Secondary-emphasis fills, e.g. a "Compare" button next to a Primary "Enroll"' />
        <Swatch name="Secondary / Hover" hex={color.secondary["700"]} />
        <Swatch name="Secondary / Tint background" hex={color.secondary["50"]} border note="Callout/badge background — pair with Secondary / Text below" />
      </div>

      <SectionTitle title="Tertiary — the rarest color" />
      <p className="site-section-sub">
        A third hue (amber/gold), used even less often than Secondary — reserved for the least common, most
        supporting-role emphasis: a small "featured" badge, a subtle decorative accent, a tertiary data series
        that must be visually distinguishable from both Primary and Secondary on the same screen.
      </p>
      <div className="site-panel site-grid cols-3">
        <Swatch name="Tertiary / Solid" hex={color.tertiary["600"]} note="Rare — a featured/highlight badge" />
        <Swatch name="Tertiary / Hover" hex={color.tertiary["700"]} />
        <Swatch name="Tertiary / Tint background" hex={color.tertiary["50"]} border note="Callout/badge background — pair with Tertiary / Text" />
      </div>

      <SectionTitle title="Button emphasis levels — a separate system from the colors above" />
      <p className="site-section-sub">
        Don't confuse this with Secondary/Tertiary the *colors* above. A "Secondary button" and a "Tertiary
        button" are about <strong style={{ color: "var(--site-text)" }}>visual weight</strong> (how loud an
        action looks), not a different hue — both stay in Primary's own color family, just with less fill. This
        keeps every screen's primary/secondary/tertiary *actions* calm even when Secondary/Tertiary *colors* are
        also on screen for an unrelated reason (e.g. a teal "new" badge next to a plain gray Secondary button).
      </p>
      <div className="site-panel site-grid cols-3">
        <Swatch name="Secondary button" hex="#FFFFFF" border note="White fill + gray border + dark text — one step down from Primary" />
        <Swatch name="Secondary button border" hex={color.neutral["300"]} note="The border that gives Secondary its outline" />
        <Swatch name="Tertiary button / link" hex={color.brand["700"]} note="No fill, no border — text only, in Primary's own color" />
      </div>

      <SectionTitle title="Tag colors — for labeling only, never for buttons" />
      <p className="site-section-sub">
        "Categorical" just means <em>used to tell categories apart</em> — like color-coding tabs in a filing
        cabinet. Use these five only for things like category tags, filter chips, or chart legend colors, so
        different groups are visually distinct. <strong style={{ color: "var(--site-text)" }}>Never use them for a
        button</strong> — buttons are always Primary, Secondary, Tertiary, or Destructive, never a tag color.
      </p>
      <div className="site-panel site-grid cols-4">
        <Swatch name="Tag color 1" hex={color.accent.slate["500"]} note='e.g. "General" tag' />
        <Swatch name="Tag color 2" hex={color.accent.plum["500"]} note='e.g. "Beneficiary" tag' />
        <Swatch name="Tag color 3" hex={color.accent.ocean["500"]} note='e.g. "Contribution" tag' />
        <Swatch name="Tag color 4" hex={color.accent.teal["500"]} note='e.g. "Investment" tag' />
        <Swatch name="Tag color 5" hex={color.accent.amber["500"]} note='e.g. "Loan" tag' />
      </div>

      <SectionTitle title="Grays — text, backgrounds, borders" />
      <div className="site-panel site-grid cols-4">
        <Swatch name="Page background" hex={color.neutral["50"]} note="Behind every screen" />
        <Swatch name="Border / divider" hex={color.neutral["200"]} note="Lines between things" />
        <Swatch name="Secondary text" hex={color.neutral["600"]} note="Helper text, timestamps" />
        <Swatch name="Main text" hex={color.neutral["900"]} note="Headings, body copy" />
      </div>

      <SectionTitle title="Text colors — exactly which text uses which color" />
      <p className="site-section-sub">Four text roles, each with one fixed color — never pick a text color outside this table.</p>
      <div className="site-panel site-panel--flush">
        <table className="spec-table">
          <thead><tr><th>Text role</th><th>Color</th><th>Token</th><th>Use for</th></tr></thead>
          <tbody>
            <tr>
              <td><span className="quickref-swatch" style={{ background: color.neutral["900"] }} />Primary text</td>
              <td>{color.neutral["900"]}</td>
              <td><code>color.text.primary</code></td>
              <td>Headings, body copy, input values — the default for anything meant to be read carefully.</td>
            </tr>
            <tr>
              <td><span className="quickref-swatch" style={{ background: color.neutral["600"] }} />Secondary text</td>
              <td>{color.neutral["600"]}</td>
              <td><code>color.text.secondary</code></td>
              <td>Helper text, field hints, table sub-labels, de-emphasized descriptions.</td>
            </tr>
            <tr>
              <td><span className="quickref-swatch" style={{ background: color.neutral["500"] }} />Tertiary text</td>
              <td>{color.neutral["500"]}</td>
              <td><code>color.text.tertiary</code></td>
              <td>Placeholder text, timestamps, disabled-adjacent labels, icon-only tooltips.</td>
            </tr>
            <tr>
              <td><span className="quickref-swatch" style={{ background: color.neutral["400"] }} />Disabled text</td>
              <td>{color.neutral["400"]}</td>
              <td><code>color.text.disabled</code></td>
              <td>Text inside a disabled control only — never for text a user should still read.</td>
            </tr>
            <tr>
              <td><span className="quickref-swatch" style={{ background: color.brand["700"] }} />Link / interactive text</td>
              <td>{color.brand["700"]}</td>
              <td><code>color.action.tertiary.text</code></td>
              <td>Inline text links and Tertiary buttons — see <a href="/components/actions#link" style={{ color: "var(--site-accent)" }}>Link</a>.</td>
            </tr>
            <tr>
              <td><span className="quickref-swatch" style={{ background: "#FFFFFF" }} />Text on a filled Primary surface</td>
              <td>#FFFFFF</td>
              <td><code>color.action.primary.text</code></td>
              <td>Text/icons sitting directly on a solid Primary button or badge.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionTitle title="Status colors — messages only" />
      <p className="site-section-sub">One color per meaning: green = success, orange = warning, red = error/danger, blue = neutral info.</p>
      <div className="site-panel site-grid cols-4">
        {(["success", "warning", "danger", "info"] as const).map((s) => (
          <Swatch key={s} name={s[0].toUpperCase() + s.slice(1)} hex={color[s]["600"]} note={s === "danger" ? "Also used for the Delete/destructive button" : "Message text/icon color"} />
        ))}
      </div>

      <SectionTitle title="Light & dark mode" />
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
        <Ramp name="brand (primary)" scale={color.brand} />
        <Ramp name="secondary" scale={color.secondary} />
        <Ramp name="tertiary" scale={color.tertiary} />
        <Ramp name="neutral" scale={color.neutral} />
        <Ramp name="success" scale={color.success} />
        <Ramp name="warning" scale={color.warning} />
        <Ramp name="danger" scale={color.danger} />
        <Ramp name="info" scale={color.info} />
      </div>

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

      <h2 className="site-section-title">How this survives a client theme swap</h2>
      <p className="site-section-sub">
        A client theme (see <a href="/themes" style={{ color: "var(--site-accent)" }}>Themes</a>) overrides the
        Primary brand ramp, radius, and font. Secondary and Tertiary are CORE-owned and generally stay fixed
        across clients (they're a system-wide meaning, not a brand identity color) — a client only overrides them
        if their brand guidelines specifically require it.
      </p>

      <h2 className="site-section-title">Do / Don't</h2>
      <div className="dodont">
        <div className="box do">
          <span className="tag">Do</span>
          Use Primary for almost everything. Reach for Secondary/Tertiary only for the specific cases above —
          never as a substitute for a lower-emphasis button.
        </div>
        <div className="box dont">
          <span className="tag">Don't</span>
          Use Secondary or Tertiary color as a general "less important" button style — that's the button-weight
          system's job, not a color's.
        </div>
      </div>
    </div>
  );
}
