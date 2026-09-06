import React, { useEffect, useRef, useState } from "react";
import primitives from "../../../../packages/tokens/src/primitives.json";
import { ContrastBadge } from "../ContrastBadge";
import { rgbStringToHex } from "../lib/contrast";
import { Collapsible } from "../../../../packages/core/src/components/Primitives";

const color = (primitives as any).color;
const gradient = (primitives as any).gradient;

// Every semantic color token that has a light/dark distinction, grouped the
// same way the rest of this page is — generated from real token keys
// (--core-<key with dots as dashes>), not a hand-picked handful. Add a token
// here and it appears in the table with zero other changes.
const MODE_SECTIONS: Array<{ title: string; tokens: Array<{ label: string; key: string }> }> = [
  {
    title: "Brand colors — Primary, Secondary, Tertiary",
    tokens: [
      { label: "Primary — default", key: "color.action.primary.bg" },
      { label: "Primary — hover", key: "color.action.primary.bgHover" },
      { label: "Primary — active", key: "color.action.primary.bgActive" },
      { label: "Secondary — solid", key: "color.palette.secondary.solidBg" },
      { label: "Secondary — solid hover", key: "color.palette.secondary.solidBgHover" },
      { label: "Secondary — tint background", key: "color.palette.secondary.tintBg" },
      { label: "Tertiary — solid", key: "color.palette.tertiary.solidBg" },
      { label: "Tertiary — solid hover", key: "color.palette.tertiary.solidBgHover" },
      { label: "Tertiary — tint background", key: "color.palette.tertiary.tintBg" },
    ],
  },
  {
    title: "Backgrounds & surfaces",
    tokens: [
      { label: "Page background", key: "color.bg.page" },
      { label: "Canvas background", key: "color.bg.canvas" },
      { label: "Surface — default", key: "color.surface.default" },
      { label: "Surface — raised (cards)", key: "color.surface.raised" },
      { label: "Surface — sunken", key: "color.surface.sunken" },
      { label: "Surface — overlay", key: "color.surface.overlay" },
    ],
  },
  {
    title: "Text",
    tokens: [
      { label: "Text — primary", key: "color.text.primary" },
      { label: "Text — secondary", key: "color.text.secondary" },
      { label: "Text — tertiary", key: "color.text.tertiary" },
      { label: "Text — disabled", key: "color.text.disabled" },
      { label: "Text — inverse", key: "color.text.inverse" },
      { label: "Text — on brand", key: "color.text.onBrand" },
    ],
  },
  {
    title: "Borders & focus",
    tokens: [
      { label: "Border — subtle", key: "color.border.subtle" },
      { label: "Border — default", key: "color.border.default" },
      { label: "Border — strong", key: "color.border.strong" },
      { label: "Border — focus", key: "color.border.focus" },
      { label: "Focus ring", key: "color.focus.ring" },
    ],
  },
  {
    title: "Primary action",
    tokens: [
      { label: "Background", key: "color.action.primary.bg" },
      { label: "Background — hover", key: "color.action.primary.bgHover" },
      { label: "Background — active", key: "color.action.primary.bgActive" },
      { label: "Text (on background)", key: "color.action.primary.text" },
      { label: "Tint background", key: "color.action.primary.tintBg" },
      { label: "Tint text", key: "color.action.primary.tintText" },
    ],
  },
  {
    title: "Secondary action",
    tokens: [
      { label: "Background", key: "color.action.secondary.bg" },
      { label: "Background — hover", key: "color.action.secondary.bgHover" },
      { label: "Border", key: "color.action.secondary.border" },
      { label: "Text", key: "color.action.secondary.text" },
    ],
  },
  {
    title: "Tertiary action",
    tokens: [
      { label: "Text", key: "color.action.tertiary.text" },
      { label: "Text — hover", key: "color.action.tertiary.textHover" },
    ],
  },
  {
    title: "Destructive action",
    tokens: [
      { label: "Background", key: "color.action.destructive.bg" },
      { label: "Background — hover", key: "color.action.destructive.bgHover" },
      { label: "Text", key: "color.action.destructive.text" },
    ],
  },
  {
    title: "Status — success",
    tokens: [
      { label: "Background (tint)", key: "color.status.success.bg" },
      { label: "Text", key: "color.status.success.text" },
      { label: "Border", key: "color.status.success.border" },
      { label: "Background (strong)", key: "color.status.success.bgStrong" },
      { label: "Text on strong", key: "color.status.success.textOnStrong" },
    ],
  },
  {
    title: "Status — warning",
    tokens: [
      { label: "Background (tint)", key: "color.status.warning.bg" },
      { label: "Text", key: "color.status.warning.text" },
      { label: "Border", key: "color.status.warning.border" },
    ],
  },
  {
    title: "Status — danger",
    tokens: [
      { label: "Background (tint)", key: "color.status.danger.bg" },
      { label: "Text", key: "color.status.danger.text" },
      { label: "Border", key: "color.status.danger.border" },
    ],
  },
  {
    title: "Status — info",
    tokens: [
      { label: "Background (tint)", key: "color.status.info.bg" },
      { label: "Text", key: "color.status.info.text" },
      { label: "Border", key: "color.status.info.border" },
    ],
  },
  {
    title: "Categorical (tags)",
    tokens: [1, 2, 3, 4, 5].map((n) => ({ label: `Tag color ${n}`, key: `color.categorical.${n}` })),
  },
  {
    title: "Secondary palette",
    tokens: [
      { label: "Solid background", key: "color.palette.secondary.solidBg" },
      { label: "Solid background — hover", key: "color.palette.secondary.solidBgHover" },
      { label: "Solid text", key: "color.palette.secondary.solidText" },
      { label: "Tint background", key: "color.palette.secondary.tintBg" },
      { label: "Text", key: "color.palette.secondary.text" },
      { label: "Border", key: "color.palette.secondary.border" },
    ],
  },
  {
    title: "Tertiary palette",
    tokens: [
      { label: "Solid background", key: "color.palette.tertiary.solidBg" },
      { label: "Solid background — hover", key: "color.palette.tertiary.solidBgHover" },
      { label: "Solid text", key: "color.palette.tertiary.solidText" },
      { label: "Tint background", key: "color.palette.tertiary.tintBg" },
      { label: "Text", key: "color.palette.tertiary.text" },
      { label: "Border", key: "color.palette.tertiary.border" },
    ],
  },
];

/* ── Baseline Color Tokens ──────────────────────────────────────────────── */

const BASELINE_GROUPS: Array<{
  title: string;
  tokens: Array<{ label: string; key: string }>;
}> = [
  {
    title: "Primary",
    tokens: [
      { label: "Primary", key: "color.action.primary.bg" },
      { label: "Primary Hover", key: "color.action.primary.bgHover" },
      { label: "On Primary", key: "color.action.primary.text" },
      { label: "Primary Tint", key: "color.action.primary.tintBg" },
      { label: "Primary Tint Text", key: "color.action.primary.tintText" },
    ],
  },
  {
    title: "Secondary",
    tokens: [
      { label: "Secondary", key: "color.palette.secondary.solidBg" },
      { label: "On Secondary", key: "color.palette.secondary.solidText" },
      { label: "Secondary Tint", key: "color.palette.secondary.tintBg" },
      { label: "Secondary Text", key: "color.palette.secondary.text" },
    ],
  },
  {
    title: "Tertiary",
    tokens: [
      { label: "Tertiary", key: "color.palette.tertiary.solidBg" },
      { label: "On Tertiary", key: "color.palette.tertiary.solidText" },
      { label: "Tertiary Tint", key: "color.palette.tertiary.tintBg" },
      { label: "Tertiary Text", key: "color.palette.tertiary.text" },
    ],
  },
  {
    title: "Destructive",
    tokens: [
      { label: "Destructive", key: "color.action.destructive.bg" },
      { label: "On Destructive", key: "color.action.destructive.text" },
    ],
  },
  {
    title: "Surfaces",
    tokens: [
      { label: "Page", key: "color.bg.page" },
      { label: "Canvas", key: "color.bg.canvas" },
      { label: "Surface", key: "color.surface.default" },
      { label: "Raised", key: "color.surface.raised" },
      { label: "Sunken", key: "color.surface.sunken" },
      { label: "Overlay", key: "color.surface.overlay" },
    ],
  },
  {
    title: "Text",
    tokens: [
      { label: "Primary", key: "color.text.primary" },
      { label: "Secondary", key: "color.text.secondary" },
      { label: "Tertiary", key: "color.text.tertiary" },
      { label: "Disabled", key: "color.text.disabled" },
      { label: "Inverse", key: "color.text.inverse" },
      { label: "On Brand", key: "color.text.onBrand" },
    ],
  },
  {
    title: "Borders",
    tokens: [
      { label: "Subtle", key: "color.border.subtle" },
      { label: "Default", key: "color.border.default" },
      { label: "Strong", key: "color.border.strong" },
      { label: "Focus", key: "color.border.focus" },
    ],
  },
  {
    title: "Status",
    tokens: [
      { label: "Success Bg", key: "color.status.success.bg" },
      { label: "Success Text", key: "color.status.success.text" },
      { label: "Success Border", key: "color.status.success.border" },
      { label: "Warning Bg", key: "color.status.warning.bg" },
      { label: "Warning Text", key: "color.status.warning.text" },
      { label: "Warning Border", key: "color.status.warning.border" },
      { label: "Danger Bg", key: "color.status.danger.bg" },
      { label: "Danger Text", key: "color.status.danger.text" },
      { label: "Danger Border", key: "color.status.danger.border" },
      { label: "Info Bg", key: "color.status.info.bg" },
      { label: "Info Text", key: "color.status.info.text" },
      { label: "Info Border", key: "color.status.info.border" },
    ],
  },
];

function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function parseRgb(raw: string): [number, number, number] | null {
  const m = raw.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

function BaselineSwatch({ tokenKey, label }: { tokenKey: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [textColor, setTextColor] = useState("#fff");
  const varName = `--core-${tokenKey.replace(/\./g, "-")}`;

  useEffect(() => {
    if (!ref.current) return;
    const bg = getComputedStyle(ref.current).backgroundColor;
    const rgb = parseRgb(bg);
    if (rgb) {
      const lum = luminance(...rgb);
      setTextColor(lum > 0.4 ? "#000" : "#fff");
    }
  }, [tokenKey]);

  return (
    <div
      ref={ref}
      style={{
        background: `var(${varName})`,
        color: textColor,
        padding: "14px 12px 10px",
        borderRadius: 8,
        minHeight: 68,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid rgba(128,128,128,0.15)",
        transition: "background-color 0.2s",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 10, fontFamily: "var(--site-mono)", opacity: 0.82, marginTop: 4 }}>{tokenKey}</span>
    </div>
  );
}

function BaselineModeColumn({ mode }: { mode: "light" | "dark" }) {
  return (
    <div
      data-theme="core"
      data-mode={mode}
      style={{
        flex: "1 1 0",
        minWidth: 280,
        background: "var(--core-color-bg-page)",
        borderRadius: 14,
        padding: "24px 20px",
        border: "1px solid var(--site-border)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase" as const,
          letterSpacing: "0.06em",
          marginBottom: 20,
          color: mode === "light" ? "#1D1C24" : "#F4F4F6",
        }}
      >
        {mode === "light" ? "☀ Light mode" : "☾ Dark mode"}
      </div>
      {BASELINE_GROUPS.map((group) => (
        <div key={group.title} style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "0.04em",
              color: mode === "light" ? "#5C5C6B" : "#9A9AAC",
              marginBottom: 8,
            }}
          >
            {group.title}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 6 }}>
            {group.tokens.map((t) => (
              <BaselineSwatch key={t.key} tokenKey={t.key} label={t.label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── end Baseline Color Tokens ─────────────────────────────────────────── */

/** One color chip, measured live under whichever [data-theme][data-mode]
 *  ancestor it renders in — this is what makes a single component correct
 *  for both the Light and Dark table columns without duplicating token math. */
function ModeSwatchCell({ tokenKey }: { tokenKey: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState<string | null>(null);
  const varName = `--core-${tokenKey.replace(/\./g, "-")}`;

  useEffect(() => {
    if (!ref.current) return;
    const bg = getComputedStyle(ref.current).backgroundColor;
    setHex(rgbStringToHex(bg));
  }, [tokenKey]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div ref={ref} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid var(--site-border)", background: `var(${varName})`, flexShrink: 0 }} />
      <span style={{ fontFamily: "var(--site-mono)", fontSize: 11, color: "var(--site-text-dim)", minWidth: 62 }}>{hex}</span>
      {hex && <ContrastBadge hex={hex} />}
    </div>
  );
}

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

function GradientSwatch({ name, css, token }: { name: string; css: string; token: string }) {
  return (
    <div className="token-swatch">
      <div className="chip" style={{ background: css }} />
      <div className="meta">
        <div className="name">{name}</div>
        <div className="value"><code>{token}</code></div>
      </div>
    </div>
  );
}

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
  "Gradients — promo/hero surfaces only, never text or buttons",
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

      {/* ── Baseline Color Tokens ── */}
      <h2 className="site-section-title">Baseline Color Tokens</h2>
      <p className="site-section-sub">
        Every semantic color role in the system, resolved side-by-side for light and dark mode.
        These colors update automatically when a client theme is applied — change the brand ramp
        in <code style={{ color: "var(--site-accent)" }}>primitives.json</code> and every role
        below re-derives.
      </p>
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <BaselineModeColumn mode="light" />
        <BaselineModeColumn mode="dark" />
      </div>
      {/* ── end Baseline Color Tokens ── */}

      <SectionTitle title="Primary — used throughout" />
      <p className="site-section-sub">
        One blue. It's the default for every primary button, active link, selected nav item, and focus outline.
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
        <Swatch name="Secondary button" hex="#FFFFFF" border note="Not the Secondary color (teal) above — a visual-weight level. White fill + gray border + dark text, one step down from Primary." />
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

      <SectionTitle title="Gradients — promo/hero surfaces only, never text or buttons" />
      <p className="site-section-sub">
        Two-stop scale-based gradients — each generated from the same brand/secondary/tertiary ramps above (a
        gradient token references <code>{"{color.brand.500}"}</code> etc. directly, so it re-colors automatically
        under a client theme, same as everything else). Reserved for promotional/feature cards and hero banners —
        a large, low-density surface where a subtle depth cue helps. <strong style={{ color: "var(--site-text)" }}>
        Never on buttons, badges, or text</strong> — those stay flat, token-driven solid colors so they read
        consistently at small sizes and pass contrast checks predictably.
      </p>
      <div className="site-panel site-grid cols-3">
        <GradientSwatch name="Brand / subtle" css={gradient["brand.subtle"]} token="gradient.brand.subtle" />
        <GradientSwatch name="Brand / vivid" css={gradient["brand.vivid"]} token="gradient.brand.vivid" />
        <GradientSwatch name="Secondary / subtle" css={gradient["secondary.subtle"]} token="gradient.secondary.subtle" />
        <GradientSwatch name="Tertiary / subtle" css={gradient["tertiary.subtle"]} token="gradient.tertiary.subtle" />
        <GradientSwatch name="Overlay scrim" css={gradient["overlay.scrim"]} token="gradient.overlay.scrim" />
      </div>
      <div className="site-panel site-panel--flush">
        <table className="spec-table">
          <thead><tr><th>Token</th><th>Use for</th></tr></thead>
          <tbody>
            <tr><td><code>gradient.brand.subtle</code></td><td>Feature/promo cards on a page — e.g. a "Retirement readiness" or upsell card, via the <code>promoCard.bg</code> component token</td></tr>
            <tr><td><code>gradient.brand.vivid</code></td><td>Larger hero banners where a bolder, three-stop version of the brand ramp reads better at scale</td></tr>
            <tr><td><code>gradient.secondary.subtle</code> / <code>tertiary.subtle</code></td><td>The same promo-card pattern when it needs to visually differ from a Primary-colored one nearby</td></tr>
            <tr><td><code>gradient.overlay.scrim</code></td><td>A dark bottom-fade over a photo/illustration so white text sitting on it stays legible — not a decorative gradient</td></tr>
          </tbody>
        </table>
      </div>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <div style={{ width: 260, borderRadius: "var(--core-promoCard-radius)", background: "var(--core-promoCard-bg)", color: "var(--core-promoCard-text)", padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.85 }}>Retirement readiness</div>
            <div style={{ fontSize: 16, fontWeight: 700, margin: "6px 0 10px" }}>See how your inputs affect your savings.</div>
            <div style={{ fontSize: 13, fontWeight: 600, textDecoration: "underline" }}>Get started →</div>
          </div>
        </div>
      </div>

      <SectionTitle title="Light & dark mode" />
      <p className="site-section-sub">
        Every semantic color role — backgrounds, text, borders, every action/status tone, tags, the secondary and
        tertiary palettes — has a dark-mode equivalent already built in. Flipping the mode only changes these CSS
        variables; no component code changes. Contrast (best of white/black text) is measured live against each
        mode's <em>actual</em> rendered color, not looked up from a static table.
      </p>
      <div className="site-panel site-panel--flush">
        <Collapsible
          trigger={(open, toggle) => (
            <button type="button" className="cds-btn cds-btn--secondary cds-btn--sm" onClick={toggle} style={{ margin: 20 }}>
              {open ? "Hide" : "Show"} the full light/dark table ({MODE_SECTIONS.reduce((n, s) => n + s.tokens.length, 0)} tokens) {open ? "▲" : "▼"}
            </button>
          )}
        >
          <div style={{ overflowX: "auto" }}>
            <table className="spec-table">
              <thead><tr><th>Role</th><th>Token</th><th>Light</th><th>Dark</th></tr></thead>
              <tbody>
                {MODE_SECTIONS.map((section) => (
                  <React.Fragment key={section.title}>
                    <tr>
                      <td colSpan={4} style={{ background: "var(--site-bg-elevated)", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--site-text-dim)" }}>
                        {section.title}
                      </td>
                    </tr>
                    {section.tokens.map((t) => (
                      <tr key={t.key}>
                        <td>{t.label}</td>
                        <td><code style={{ fontSize: 11 }}>{t.key}</code></td>
                        <td data-theme="core" data-mode="light"><ModeSwatchCell tokenKey={t.key} /></td>
                        <td data-theme="core" data-mode="dark"><ModeSwatchCell tokenKey={t.key} /></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Collapsible>
      </div>

      <h2 className="site-section-title">Full color scales (reference)</h2>
      <p className="site-section-sub">You shouldn't need to pick from these directly — they're what the roles above are built from. Closed by default — a lot of color to scroll past otherwise.</p>
      <div className="site-panel site-panel--flush">
        <Collapsible
          trigger={(open, toggle) => (
            <button type="button" className="cds-btn cds-btn--secondary cds-btn--sm" onClick={toggle} style={{ margin: 20 }}>
              {open ? "Hide" : "Show"} all 8 color scales {open ? "▲" : "▼"}
            </button>
          )}
        >
          <div style={{ padding: "0 20px 20px" }}>
            <Ramp name="brand (primary)" scale={color.brand} />
            <Ramp name="secondary" scale={color.secondary} />
            <Ramp name="tertiary" scale={color.tertiary} />
            <Ramp name="neutral" scale={color.neutral} />
            <Ramp name="success" scale={color.success} />
            <Ramp name="warning" scale={color.warning} />
            <Ramp name="danger" scale={color.danger} />
            <Ramp name="info" scale={color.info} />
          </div>
        </Collapsible>
      </div>

      <h2 className="site-section-title">Quick reference — what to use where</h2>
      <div className="site-panel site-panel--flush">
        <Collapsible
          trigger={(open, toggle) => (
            <button type="button" className="cds-btn cds-btn--secondary cds-btn--sm" onClick={toggle} style={{ margin: 20 }}>
              {open ? "Hide" : "Show"} the quick reference table ({quickRef.length} rows) {open ? "▲" : "▼"}
            </button>
          )}
        >
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
        </Collapsible>
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
