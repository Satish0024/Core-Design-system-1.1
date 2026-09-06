import { useEffect, useRef, useState } from "react";
import primitives from "../../../../packages/tokens/src/primitives.json";
import { ContrastBadge } from "../ContrastBadge";
import { rgbStringToHex } from "../lib/contrast";
import { Collapsible } from "../../../../packages/core/src/components/Primitives";

const color = (primitives as any).color;
const gradient = (primitives as any).gradient;

/* (MODE_SECTIONS removed — replaced by the M3-style accordion in BaselineTokensSection) */

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
  const [hex, setHex] = useState("");
  const varName = `--core-${tokenKey.replace(/\./g, "-")}`;

  useEffect(() => {
    if (!ref.current) return;
    const bg = getComputedStyle(ref.current).backgroundColor;
    const rgb = parseRgb(bg);
    if (rgb) {
      const lum = luminance(...rgb);
      setTextColor(lum > 0.4 ? "#000" : "#fff");
      const toHex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
      setHex(`#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`);
    }
  }, [tokenKey]);

  return (
    <div
      ref={ref}
      style={{
        background: `var(${varName})`,
        color: textColor,
        padding: "16px 14px 12px",
        borderRadius: 10,
        minHeight: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid rgba(128,128,128,0.12)",
        flex: "1 1 140px",
        minWidth: 0,
      }}
    >
      <span style={{ fontSize: 12, fontFamily: "var(--site-mono)", opacity: 0.75 }}>{hex}</span>
      <span style={{ fontSize: 13, fontWeight: 600, marginTop: "auto", wordBreak: "break-word", lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}

function BaselineAccordionGroup({ group, mode }: { group: typeof BASELINE_GROUPS[number]; mode: "light" | "dark" }) {
  const [open, setOpen] = useState(group.title === "Primary");
  return (
    <div style={{ borderBottom: "1px solid var(--site-border)" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "14px 20px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 600,
          color: "inherit",
          fontFamily: "inherit",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, opacity: 0.5 }}>📁</span>
          {group.title} colors
        </span>
        <span style={{ fontSize: 18, opacity: 0.5, transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && (
        <div data-theme="core" data-mode={mode} style={{ padding: "0 20px 20px", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {group.tokens.map((t) => (
            <BaselineSwatch key={t.key} tokenKey={t.key} label={t.label} />
          ))}
        </div>
      )}
    </div>
  );
}

function BaselineTokensSection() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  return (
    <div className="site-panel" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "light" | "dark")}
          style={{
            padding: "6px 12px",
            borderRadius: 20,
            border: "1px solid var(--site-border)",
            background: "var(--site-bg-elevated)",
            fontSize: 13,
            fontWeight: 600,
            color: "inherit",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          <option value="light">Default, Light</option>
          <option value="dark">Default, Dark</option>
        </select>
      </div>
      {BASELINE_GROUPS.map((group) => (
        <BaselineAccordionGroup key={group.title} group={group} mode={mode} />
      ))}
    </div>
  );
}

/* ── end Baseline Color Tokens ─────────────────────────────────────────── */

/* (ModeSwatchCell removed — replaced by BaselineSwatch in the M3 accordion) */

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

/* ── Base Color Groups (M3-style light/dark panels) ─────────────────────── */

const BASE_COLOR_GROUPS: Array<{
  title: string;
  tokens: Array<{ label: string; key: string }>;
}> = [
  {
    title: "Primary — used throughout",
    tokens: [
      { label: "Primary / Default", key: "color.action.primary.bg" },
      { label: "Primary / Hover", key: "color.action.primary.bgHover" },
      { label: "On Primary", key: "color.action.primary.text" },
      { label: "Primary Tint", key: "color.action.primary.tintBg" },
      { label: "Primary Tint Text", key: "color.action.primary.tintText" },
    ],
  },
  {
    title: "Secondary — used in specific cases",
    tokens: [
      { label: "Secondary / Solid", key: "color.palette.secondary.solidBg" },
      { label: "Secondary / Hover", key: "color.palette.secondary.solidBgHover" },
      { label: "On Secondary", key: "color.palette.secondary.solidText" },
      { label: "Secondary Tint", key: "color.palette.secondary.tintBg" },
      { label: "Secondary Text", key: "color.palette.secondary.text" },
      { label: "Secondary Border", key: "color.palette.secondary.border" },
    ],
  },
  {
    title: "Tertiary — the rarest color",
    tokens: [
      { label: "Tertiary / Solid", key: "color.palette.tertiary.solidBg" },
      { label: "Tertiary / Hover", key: "color.palette.tertiary.solidBgHover" },
      { label: "On Tertiary", key: "color.palette.tertiary.solidText" },
      { label: "Tertiary Tint", key: "color.palette.tertiary.tintBg" },
      { label: "Tertiary Text", key: "color.palette.tertiary.text" },
      { label: "Tertiary Border", key: "color.palette.tertiary.border" },
    ],
  },
  {
    title: "Button emphasis levels",
    tokens: [
      { label: "Secondary Button", key: "color.action.secondary.bg" },
      { label: "Secondary Btn Hover", key: "color.action.secondary.bgHover" },
      { label: "Secondary Btn Border", key: "color.action.secondary.border" },
      { label: "Secondary Btn Text", key: "color.action.secondary.text" },
      { label: "Tertiary Btn Text", key: "color.action.tertiary.text" },
      { label: "Tertiary Btn Hover", key: "color.action.tertiary.textHover" },
    ],
  },
  {
    title: "Destructive",
    tokens: [
      { label: "Destructive", key: "color.action.destructive.bg" },
      { label: "Destructive Hover", key: "color.action.destructive.bgHover" },
      { label: "On Destructive", key: "color.action.destructive.text" },
    ],
  },
  {
    title: "Grays — text, backgrounds, borders",
    tokens: [
      { label: "Page Background", key: "color.bg.page" },
      { label: "Canvas", key: "color.bg.canvas" },
      { label: "Surface", key: "color.surface.default" },
      { label: "Raised", key: "color.surface.raised" },
      { label: "Sunken", key: "color.surface.sunken" },
      { label: "Border Subtle", key: "color.border.subtle" },
      { label: "Border Default", key: "color.border.default" },
      { label: "Border Strong", key: "color.border.strong" },
    ],
  },
  {
    title: "Text colors",
    tokens: [
      { label: "Primary Text", key: "color.text.primary" },
      { label: "Secondary Text", key: "color.text.secondary" },
      { label: "Tertiary Text", key: "color.text.tertiary" },
      { label: "Disabled Text", key: "color.text.disabled" },
      { label: "Inverse Text", key: "color.text.inverse" },
      { label: "On Brand Text", key: "color.text.onBrand" },
    ],
  },
  {
    title: "Status colors — messages only",
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

function BaseColorModeColumn({ mode }: { mode: "light" | "dark" }) {
  return (
    <div
      data-theme="core"
      data-mode={mode}
      style={{
        flex: "1 1 0",
        minWidth: 300,
        background: "var(--core-color-bg-page)",
        borderRadius: 14,
        padding: "28px 24px",
        border: "1px solid rgba(128,128,128,0.15)",
        color: "var(--core-color-text-primary)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          textTransform: "uppercase" as const,
          letterSpacing: "0.06em",
          marginBottom: 24,
          color: "var(--core-color-text-secondary)",
        }}
      >
        {mode === "light" ? "☀ Light mode" : "☾ Dark mode"}
      </div>
      {BASE_COLOR_GROUPS.map((group) => (
        <div key={group.title} style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "0.04em",
              color: "var(--core-color-text-tertiary)",
              marginBottom: 10,
            }}
          >
            {group.title}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 6 }}>
            {group.tokens.map((t) => (
              <BaselineSwatch key={t.key} tokenKey={t.key} label={t.label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Color() {
  return (
    <div>
      <h1 className="site-h1">Color</h1>
      <p className="site-lede">
        The complete color system — base colors that define what each hue is for, semantic tokens
        that resolve in light and dark mode, and the full primitive scales they're built from.
        When a new client is onboarded, update the brand ramp
        in <code style={{ color: "var(--site-accent)" }}>primitives.json</code> and every token
        across all three sections re-derives automatically.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 1 — Base colors (M3-style light/dark side-by-side)
           ═══════════════════════════════════════════════════════════════ */}
      <h2 className="site-section-title">Base colors</h2>
      <p className="site-section-sub">
        Every key color in the system, shown side-by-side for Light and Dark mode.
        Each swatch resolves live from CSS variables — when a new client is onboarded and their
        brand colors are applied, everything below updates automatically.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <BaseColorModeColumn mode="light" />
        <BaseColorModeColumn mode="dark" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 2 — Baseline color tokens (M3-style accordion)
           ═══════════════════════════════════════════════════════════════ */}
      <h2 className="site-section-title">Baseline color tokens</h2>
      <p className="site-section-sub">
        Every semantic color role in the system, resolved for both light and dark mode.
        Toggle the mode to see how tokens resolve. When a new client is onboarded and their
        brand colors are applied, every token below updates automatically — no manual overrides needed.
      </p>
      <BaselineTokensSection />

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 3 — Full color scales (reference)
           ═══════════════════════════════════════════════════════════════ */}
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
