import React, { useEffect, useRef, useState } from "react";
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
  const varName = `--core-${tokenKey.replace(/\./g, "-")}`;

  useEffect(() => {
    if (!ref.current) return;
    const bg = getComputedStyle(ref.current).backgroundColor;
    const rgb = parseRgb(bg);
    if (rgb) {
      const lum = luminance(...rgb);
      setTextColor(lum > 0.179 ? "#000" : "#fff");
    }
  }, [tokenKey]);

  return (
    <div
      ref={ref}
      title="Click to copy token"
      onClick={() => navigator.clipboard.writeText(`var(${varName})`)}
      style={{
        background: `var(${varName})`,
        color: textColor,
        padding: "16px 14px 12px",
        borderRadius: 10,
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid rgba(128,128,128,0.12)",
        flex: "1 1 140px",
        minWidth: 0,
        cursor: "pointer",
        transition: "transform 0.1s ease",
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)", opacity: 0.85, wordBreak: "break-all", lineHeight: 1.4 }}>{varName}</span>
      <span style={{ fontSize: "var(--core-font-size-sm, 14px)", fontWeight: 600, marginTop: "12px", wordBreak: "break-word", lineHeight: 1.3 }}>{label}</span>
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
            fontSize: "var(--core-font-size-xs, 12px)",
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
  { use: "Primary button (Save, Submit, Continue) — the default for almost everything", token: "--core-color-action-primary-bg" },
  { use: "Button / link on hover", token: "--core-color-action-primary-bgHover" },
  { use: "Secondary emphasis — a highlighted stat, an alternate metric, a \"new\" indicator", token: "--core-color-palette-secondary-solidBg" },
  { use: "Tertiary emphasis — rare accents, a supporting badge, a subtle callout", token: "--core-color-palette-tertiary-solidBg" },
  { use: "Delete / remove button", token: "--core-color-action-destructive-bg" },
  { use: "Main body text, headings", token: "--core-color-text-primary" },
  { use: "Helper text, timestamps, secondary labels", token: "--core-color-text-secondary" },
  { use: "Page background", token: "--core-color-bg-page" },
  { use: "Card / panel background", token: "--core-color-surface-default" },
  { use: "Borders, dividers, input outlines", token: "--core-color-border-default" },
  { use: "\"Saved\" / \"Active\" / success messages", token: "--core-color-status-success-bg" },
  { use: "Warnings, \"needs attention\"", token: "--core-color-status-warning-bg" },
  { use: "Informational notices", token: "--core-color-status-info-bg" },
];

function GradientSwatch({ name, css, token }: { name: string; css: string; token: string }) {
  return (
    <div className="token-swatch" onClick={() => navigator.clipboard.writeText(`var(${token})`)} style={{ cursor: "pointer" }} title="Click to copy token">
      <div className="chip" style={{ background: css }} />
      <div className="meta">
        <div className="name">{name}</div>
        <div className="value"><code>{token}</code></div>
      </div>
    </div>
  );
}

function Swatch({ name, hex, token, note, border }: { name: string; hex: string; token: string; note?: string; border?: boolean }) {
  return (
    <div className="token-swatch" onClick={() => navigator.clipboard.writeText(`var(${token})`)} style={{ cursor: "pointer" }} title="Click to copy token">
      <div className="chip" style={{ background: hex, border: border ? "1px solid var(--site-border)" : undefined }} />
      <div className="meta">
        <div className="name">{name}</div>
        <div className="value" style={{ fontFamily: "var(--site-mono)", fontSize: "var(--core-font-size-xs, 12px)", marginBottom: 4 }}>{token}</div>
        <div style={{ marginTop: 6, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <ContrastBadge hex={hex} />
        </div>
        {note && <div className="value" style={{ marginTop: 4 }}>{note}</div>}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleaned = hex.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned.split("").map((c) => c + c).join("");
  }
  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function hexToCmyk(hex: string): { c: number; m: number; y: number; k: number } {
  const { r, g, b } = hexToRgb(hex);
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k >= 0.999) return { c: 0, m: 0, y: 0, k: 100 };
  const c = Math.round(((1 - rNorm - k) / (1 - k)) * 100);
  const m = Math.round(((1 - gNorm - k) / (1 - k)) * 100);
  const y = Math.round(((1 - bNorm - k) / (1 - k)) * 100);
  return { c, m, y, k: Math.round(k * 100) };
}

function getContrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const lum = luminance(r, g, b);
  // WCAG threshold where black and white give equal contrast ratio is ~0.179
  return lum > 0.179 ? "#000000" : "#FFFFFF";
}

function RampRow({ name, prefix, scale, isLast }: { name: string; prefix: string; scale: Record<string, string>; isLast?: boolean }) {
  const entries = Object.entries(scale);
  return (
    <div style={{ display: "flex", padding: "32px 0", borderBottom: isLast ? "none" : "1px solid var(--site-border)" }}>
      <div style={{ width: "25%", minWidth: 150, fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, textTransform: "uppercase", color: "var(--core-color-text-primary)", paddingTop: 16 }}>
        {name}
      </div>
      <div style={{ width: "75%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", width: "100%", height: 80, borderRadius: 6, overflow: "hidden", border: "1px solid rgba(128,128,128,0.15)" }}>
          {entries.map(([step, hex]) => {
            const textColor = getContrastColor(hex);
            return (
              <div
                key={step}
                style={{
                  flex: 1,
                  background: hex,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: textColor,
                  transition: "opacity 0.2s"
                }}
                title={`Click to copy var(--core-color-${prefix}-${step})`}
                onClick={() => navigator.clipboard.writeText(`var(--core-color-${prefix}-${step})`)}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <div style={{ fontSize: 12, fontWeight: 700 }}>{step}</div>
                <div style={{ fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)", marginTop: 4 }}>{hex}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Figma Aligned Base Color Variables & Redesigned Section ─────────────── */

export interface FigmaTokenItem {
  id: string;
  name: string; // e.g. "primary-default"
  displayName: string; // e.g. "Primary Default"
  group: string; // e.g. "Brand / Text"
  subgroup: string; // e.g. "Text", "Background", "Borders", "Critical", etc.
  path: string; // e.g. "Brand / Text / primary-default"
  cssVar: string; // e.g. "--theme-brand-text-primary-default"
  aliasCssVar?: string; // e.g. "--brand-text-primary-default"
  coreRef: string; // e.g. "--core-color-action-primary-bg"
  category: "primary" | "secondary" | "tertiary" | "neutral" | "critical" | "warning" | "success" | "info" | "brand" | "semantics";
  type: "text" | "background" | "borders";
  lightHex: string;
  darkHex: string;
  paletteNameLight: string; // e.g. "Brand 500"
  paletteNameDark: string;  // e.g. "Brand 300"
  description: string;
}

const FIGMA_BASE_TOKENS: FigmaTokenItem[] = [
  // ── 1. PRIMARY COLORS (BRAND) ──
  // Primary / Text
  {
    id: "primary-text-oncolor",
    name: "primary-oncolor",
    displayName: "Primary On Color",
    group: "Primary / Text",
    subgroup: "Text",
    path: "Primary / Text / primary-oncolor",
    cssVar: "--theme-brand-text-primary-oncolor",
    aliasCssVar: "--brand-text-primary-oncolor",
    coreRef: "--core-color-action-primary-text",
    category: "primary",
    type: "text",
    lightHex: "#FFFFFF",
    darkHex: "#FFFFFF",
    paletteNameLight: "Neutral 0",
    paletteNameDark: "Neutral 0",
    description: "High-contrast text placed on top of solid primary brand backgrounds.",
  },
  {
    id: "primary-text-disabled",
    name: "primary-disabled",
    displayName: "Primary Disabled",
    group: "Primary / Text",
    subgroup: "Text",
    path: "Primary / Text / primary-disabled",
    cssVar: "--theme-brand-text-primary-disabled",
    aliasCssVar: "--brand-text-primary-disabled",
    coreRef: "--core-color-brand-300",
    category: "primary",
    type: "text",
    lightHex: "#86ADDF",
    darkHex: "#5C5C6B",
    paletteNameLight: "Brand 300",
    paletteNameDark: "Neutral 600",
    description: "Disabled state for primary brand typography and interactive labels.",
  },
  {
    id: "primary-text-default",
    name: "primary-default",
    displayName: "Primary Default",
    group: "Primary / Text",
    subgroup: "Text",
    path: "Primary / Text / primary-default",
    cssVar: "--theme-brand-text-primary-default",
    aliasCssVar: "--brand-text-primary-default",
    coreRef: "--core-color-action-primary-bg",
    category: "primary",
    type: "text",
    lightHex: "#1F4F8D",
    darkHex: "#86ADDF",
    paletteNameLight: "Brand 500",
    paletteNameDark: "Brand 300",
    description: "Default primary brand text color for headings, brand links, and prominent labels.",
  },
  {
    id: "primary-text-hover",
    name: "primaryhover",
    displayName: "Primary Hover",
    group: "Primary / Text",
    subgroup: "Text",
    path: "Primary / Text / primaryhover",
    cssVar: "--theme-brand-text-primary-hover",
    aliasCssVar: "--brand-text-primaryhover",
    coreRef: "--core-color-action-primary-bgHover",
    category: "primary",
    type: "text",
    lightHex: "#1B4479",
    darkHex: "#3275CD",
    paletteNameLight: "Brand 600",
    paletteNameDark: "Brand 400",
    description: "Hover text color for primary brand text links and clickable text elements.",
  },
  {
    id: "primary-text-active",
    name: "primary-active",
    displayName: "Primary Active",
    group: "Primary / Text",
    subgroup: "Text",
    path: "Primary / Text / primary-active",
    cssVar: "--theme-brand-text-primary-active",
    aliasCssVar: "--brand-text-primary-active",
    coreRef: "--core-color-action-primary-bgActive",
    category: "primary",
    type: "text",
    lightHex: "#17365E",
    darkHex: "#BACEE9",
    paletteNameLight: "Brand 700",
    paletteNameDark: "Brand 200",
    description: "Active/pressed text color for brand links and primary interactive elements.",
  },

  // Primary / Background
  {
    id: "primary-bg-light",
    name: "primary-light",
    displayName: "Primary Light",
    group: "Primary / Background",
    subgroup: "Background",
    path: "Primary / Background / primary-light",
    cssVar: "--theme-brand-background-primary-light",
    aliasCssVar: "--brand-background-primary-light",
    coreRef: "--core-color-action-primary-tintBg",
    category: "primary",
    type: "background",
    lightHex: "#F5F7FA",
    darkHex: "#102137",
    paletteNameLight: "Brand 50",
    paletteNameDark: "Brand 900",
    description: "Soft tinted container background for badges, chips, and subtle alert cards.",
  },
  {
    id: "primary-bg-subtle",
    name: "primary-subtle",
    displayName: "Primary Subtle",
    group: "Primary / Background",
    subgroup: "Background",
    path: "Primary / Background / primary-subtle",
    cssVar: "--theme-brand-background-primary-subtle",
    aliasCssVar: "--brand-background-primary-subtle",
    coreRef: "--core-color-brand-100",
    category: "primary",
    type: "background",
    lightHex: "#E2E9F3",
    darkHex: "#132A49",
    paletteNameLight: "Brand 100",
    paletteNameDark: "Brand 800",
    description: "Gentle brand tint for selected row highlights and tertiary card backgrounds.",
  },
  {
    id: "primary-bg-disabled-light",
    name: "disabled-light",
    displayName: "Disabled Light",
    group: "Primary / Background",
    subgroup: "Background",
    path: "Primary / Background / disabled-light",
    cssVar: "--theme-brand-background-disabled-light",
    aliasCssVar: "--brand-background-disabled-light",
    coreRef: "--core-color-neutral-100",
    category: "primary",
    type: "background",
    lightHex: "#EEEEF2",
    darkHex: "#2E2D38",
    paletteNameLight: "Neutral 100",
    paletteNameDark: "Neutral 800",
    description: "Light disabled container fill for inactive buttons and controls.",
  },
  {
    id: "primary-bg-disabled-strong",
    name: "disabled-strong",
    displayName: "Disabled Strong",
    group: "Primary / Background",
    subgroup: "Background",
    path: "Primary / Background / disabled-strong",
    cssVar: "--theme-brand-background-disabled-strong",
    aliasCssVar: "--brand-background-disabled-strong",
    coreRef: "--core-color-brand-200",
    category: "primary",
    type: "background",
    lightHex: "#BACEE9",
    darkHex: "#17365E",
    paletteNameLight: "Brand 200",
    paletteNameDark: "Brand 800",
    description: "Muted solid background for disabled primary actions.",
  },
  {
    id: "primary-bg-strong",
    name: "strong",
    displayName: "Strong Background",
    group: "Primary / Background",
    subgroup: "Background",
    path: "Primary / Background / strong",
    cssVar: "--theme-brand-background-strong",
    aliasCssVar: "--brand-background-strong",
    coreRef: "--core-color-action-primary-bg",
    category: "primary",
    type: "background",
    lightHex: "#1F4F8D",
    darkHex: "#3275CD",
    paletteNameLight: "Brand 500",
    paletteNameDark: "Brand 500",
    description: "Solid primary brand fill for primary buttons, active badges, and key banners.",
  },
  {
    id: "primary-bg-hover",
    name: "hover",
    displayName: "Hover",
    group: "Primary / Background",
    subgroup: "Background",
    path: "Primary / Background / hover",
    cssVar: "--theme-brand-background-hover",
    aliasCssVar: "--brand-background-hover",
    coreRef: "--core-color-action-primary-bgHover",
    category: "primary",
    type: "background",
    lightHex: "#1B4479",
    darkHex: "#1B4479",
    paletteNameLight: "Brand 600",
    paletteNameDark: "Brand 400",
    description: "Hover state background for solid brand buttons and active controls.",
  },
  {
    id: "primary-bg-active",
    name: "active",
    displayName: "Active",
    group: "Primary / Background",
    subgroup: "Background",
    path: "Primary / Background / active",
    cssVar: "--theme-brand-background-active",
    aliasCssVar: "--brand-background-active",
    coreRef: "--core-color-action-primary-bgActive",
    category: "primary",
    type: "background",
    lightHex: "#17365E",
    darkHex: "#1F4F8D",
    paletteNameLight: "Brand 700",
    paletteNameDark: "Brand 300",
    description: "Pressed/active state background for brand interactive controls.",
  },

  // Primary / Borders
  {
    id: "primary-borders-disabled",
    name: "primary-disabled",
    displayName: "Primary Disabled",
    group: "Primary / Borders",
    subgroup: "Borders",
    path: "Primary / Borders / primary-disabled",
    cssVar: "--theme-brand-borders-primary-disabled",
    aliasCssVar: "--brand-borders-primary-disabled",
    coreRef: "--core-color-brand-200",
    category: "primary",
    type: "borders",
    lightHex: "#BACEE9",
    darkHex: "#17365E",
    paletteNameLight: "Brand 200",
    paletteNameDark: "Brand 700",
    description: "Border color for disabled outlined brand controls.",
  },
  {
    id: "primary-borders-default",
    name: "primary-default",
    displayName: "Primary Default",
    group: "Primary / Borders",
    subgroup: "Borders",
    path: "Primary / Borders / primary-default",
    cssVar: "--theme-brand-borders-primary-default",
    aliasCssVar: "--brand-borders-primary-default",
    coreRef: "--core-color-brand-400",
    category: "primary",
    type: "borders",
    lightHex: "#3275CD",
    darkHex: "#3275CD",
    paletteNameLight: "Brand 400",
    paletteNameDark: "Brand 400",
    description: "Default brand border for outline buttons, active tab indicators, and focus rings.",
  },
  {
    id: "primary-borders-hover",
    name: "hover",
    displayName: "Hover",
    group: "Primary / Borders",
    subgroup: "Borders",
    path: "Primary / Borders / hover",
    cssVar: "--theme-brand-borders-hover",
    aliasCssVar: "--brand-borders-hover",
    coreRef: "--core-color-brand-600",
    category: "primary",
    type: "borders",
    lightHex: "#1B4479",
    darkHex: "#86ADDF",
    paletteNameLight: "Brand 600",
    paletteNameDark: "Brand 300",
    description: "Hover state outline border for brand elements and cards.",
  },

  // ── 2. SECONDARY COLORS (SAME STRUCTURE AS PRIMARY) ──
  // Secondary / Text
  {
    id: "secondary-text-oncolor",
    name: "secondary-oncolor",
    displayName: "Secondary On Color",
    group: "Secondary / Text",
    subgroup: "Text",
    path: "Secondary / Text / secondary-oncolor",
    cssVar: "--theme-secondary-text-primary-oncolor",
    coreRef: "--core-color-neutral-0",
    category: "secondary",
    type: "text",
    lightHex: "#FFFFFF",
    darkHex: "#FFFFFF",
    paletteNameLight: "Neutral 0",
    paletteNameDark: "Neutral 0",
    description: "High-contrast text placed on top of solid secondary backgrounds.",
  },
  {
    id: "secondary-text-disabled",
    name: "secondary-disabled",
    displayName: "Secondary Disabled",
    group: "Secondary / Text",
    subgroup: "Text",
    path: "Secondary / Text / secondary-disabled",
    cssVar: "--theme-secondary-text-primary-disabled",
    coreRef: "--core-color-secondary-300",
    category: "secondary",
    type: "text",
    lightHex: "#71CAF4",
    darkHex: "#5C5C6B",
    paletteNameLight: "Secondary 300",
    paletteNameDark: "Neutral 600",
    description: "Disabled state for secondary typography and interactive labels.",
  },
  {
    id: "secondary-text-default",
    name: "secondary-default",
    displayName: "Secondary Default",
    group: "Secondary / Text",
    subgroup: "Text",
    path: "Secondary / Text / secondary-default",
    cssVar: "--theme-secondary-text-primary-default",
    coreRef: "--core-color-secondary-500",
    category: "secondary",
    type: "text",
    lightHex: "#39BCF9",
    darkHex: "#71CAF4",
    paletteNameLight: "Secondary 500",
    paletteNameDark: "Secondary 300",
    description: "Default secondary text color for subheadings, category links, and emphasis tags.",
  },
  {
    id: "secondary-text-hover",
    name: "secondaryhover",
    displayName: "Secondary Hover",
    group: "Secondary / Text",
    subgroup: "Text",
    path: "Secondary / Text / secondaryhover",
    cssVar: "--theme-secondary-text-primary-hover",
    coreRef: "--core-color-secondary-600",
    category: "secondary",
    type: "text",
    lightHex: "#07A8F2",
    darkHex: "#56C3F5",
    paletteNameLight: "Secondary 600",
    paletteNameDark: "Secondary 400",
    description: "Hover text color for secondary links and clickable labels.",
  },
  {
    id: "secondary-text-active",
    name: "secondary-active",
    displayName: "Secondary Active",
    group: "Secondary / Text",
    subgroup: "Text",
    path: "Secondary / Text / secondary-active",
    cssVar: "--theme-secondary-text-primary-active",
    coreRef: "--core-color-secondary-700",
    category: "secondary",
    type: "text",
    lightHex: "#0B81B7",
    darkHex: "#AFDEF4",
    paletteNameLight: "Secondary 700",
    paletteNameDark: "Secondary 200",
    description: "Active/pressed text color for secondary elements.",
  },

  // Secondary / Background
  {
    id: "secondary-bg-light",
    name: "secondary-light",
    displayName: "Secondary Light",
    group: "Secondary / Background",
    subgroup: "Background",
    path: "Secondary / Background / secondary-light",
    cssVar: "--theme-secondary-background-primary-light",
    coreRef: "--core-color-secondary-50",
    category: "secondary",
    type: "background",
    lightHex: "#F4F9FB",
    darkHex: "#0A3F57",
    paletteNameLight: "Secondary 50",
    paletteNameDark: "Secondary 900",
    description: "Soft tinted container background for secondary cards and chips.",
  },
  {
    id: "secondary-bg-subtle",
    name: "secondary-subtle",
    displayName: "Secondary Subtle",
    group: "Secondary / Background",
    subgroup: "Background",
    path: "Secondary / Background / secondary-subtle",
    cssVar: "--theme-secondary-background-primary-subtle",
    coreRef: "--core-color-secondary-100",
    category: "secondary",
    type: "background",
    lightHex: "#DEEFF7",
    darkHex: "#0B5E84",
    paletteNameLight: "Secondary 100",
    paletteNameDark: "Secondary 800",
    description: "Gentle secondary tint for secondary row highlights.",
  },
  {
    id: "secondary-bg-disabled-light",
    name: "disabled-light",
    displayName: "Disabled Light",
    group: "Secondary / Background",
    subgroup: "Background",
    path: "Secondary / Background / disabled-light",
    cssVar: "--theme-secondary-background-disabled-light",
    coreRef: "--core-color-neutral-100",
    category: "secondary",
    type: "background",
    lightHex: "#EEEEF2",
    darkHex: "#2E2D38",
    paletteNameLight: "Neutral 100",
    paletteNameDark: "Neutral 800",
    description: "Light disabled container fill for inactive secondary controls.",
  },
  {
    id: "secondary-bg-disabled-strong",
    name: "disabled-strong",
    displayName: "Disabled Strong",
    group: "Secondary / Background",
    subgroup: "Background",
    path: "Secondary / Background / disabled-strong",
    cssVar: "--theme-secondary-background-disabled-strong",
    coreRef: "--core-color-secondary-200",
    category: "secondary",
    type: "background",
    lightHex: "#AFDEF4",
    darkHex: "#0B5E84",
    paletteNameLight: "Secondary 200",
    paletteNameDark: "Secondary 800",
    description: "Muted solid background for disabled secondary actions.",
  },
  {
    id: "secondary-bg-strong",
    name: "strong",
    displayName: "Strong Background",
    group: "Secondary / Background",
    subgroup: "Background",
    path: "Secondary / Background / strong",
    cssVar: "--theme-secondary-background-strong",
    coreRef: "--core-color-secondary-500",
    category: "secondary",
    type: "background",
    lightHex: "#39BCF9",
    darkHex: "#39BCF9",
    paletteNameLight: "Secondary 500",
    paletteNameDark: "Secondary 500",
    description: "Solid secondary fill for secondary buttons and active category badges.",
  },
  {
    id: "secondary-bg-hover",
    name: "hover",
    displayName: "Hover",
    group: "Secondary / Background",
    subgroup: "Background",
    path: "Secondary / Background / hover",
    cssVar: "--theme-secondary-background-hover",
    coreRef: "--core-color-secondary-600",
    category: "secondary",
    type: "background",
    lightHex: "#07A8F2",
    darkHex: "#56C3F5",
    paletteNameLight: "Secondary 600",
    paletteNameDark: "Secondary 400",
    description: "Hover state background for secondary controls.",
  },
  {
    id: "secondary-bg-active",
    name: "active",
    displayName: "Active",
    group: "Secondary / Background",
    subgroup: "Background",
    path: "Secondary / Background / active",
    cssVar: "--theme-secondary-background-active",
    coreRef: "--core-color-secondary-700",
    category: "secondary",
    type: "background",
    lightHex: "#0B81B7",
    darkHex: "#71CAF4",
    paletteNameLight: "Secondary 700",
    paletteNameDark: "Secondary 300",
    description: "Pressed state background for secondary controls.",
  },

  // Secondary / Borders
  {
    id: "secondary-borders-disabled",
    name: "secondary-disabled",
    displayName: "Secondary Disabled",
    group: "Secondary / Borders",
    subgroup: "Borders",
    path: "Secondary / Borders / secondary-disabled",
    cssVar: "--theme-secondary-borders-primary-disabled",
    coreRef: "--core-color-secondary-200",
    category: "secondary",
    type: "borders",
    lightHex: "#AFDEF4",
    darkHex: "#0B81B7",
    paletteNameLight: "Secondary 200",
    paletteNameDark: "Secondary 700",
    description: "Border color for disabled outlined secondary controls.",
  },
  {
    id: "secondary-borders-default",
    name: "secondary-default",
    displayName: "Secondary Default",
    group: "Secondary / Borders",
    subgroup: "Borders",
    path: "Secondary / Borders / secondary-default",
    cssVar: "--theme-secondary-borders-primary-default",
    coreRef: "--core-color-secondary-400",
    category: "secondary",
    type: "borders",
    lightHex: "#56C3F5",
    darkHex: "#56C3F5",
    paletteNameLight: "Secondary 400",
    paletteNameDark: "Secondary 400",
    description: "Default outline border for secondary buttons and cards.",
  },
  {
    id: "secondary-borders-hover",
    name: "hover",
    displayName: "Hover",
    group: "Secondary / Borders",
    subgroup: "Borders",
    path: "Secondary / Borders / hover",
    cssVar: "--theme-secondary-borders-hover",
    coreRef: "--core-color-secondary-600",
    category: "secondary",
    type: "borders",
    lightHex: "#07A8F2",
    darkHex: "#71CAF4",
    paletteNameLight: "Secondary 600",
    paletteNameDark: "Secondary 300",
    description: "Hover state outline border for secondary elements.",
  },

  // ── 3. TERTIARY COLORS (SAME STRUCTURE AS PRIMARY) ──
  // Tertiary / Text
  {
    id: "tertiary-text-oncolor",
    name: "tertiary-oncolor",
    displayName: "Tertiary On Color",
    group: "Tertiary / Text",
    subgroup: "Text",
    path: "Tertiary / Text / tertiary-oncolor",
    cssVar: "--theme-tertiary-text-primary-oncolor",
    coreRef: "--core-color-neutral-0",
    category: "tertiary",
    type: "text",
    lightHex: "#FFFFFF",
    darkHex: "#FFFFFF",
    paletteNameLight: "Neutral 0",
    paletteNameDark: "Neutral 0",
    description: "High-contrast text placed on top of solid tertiary backgrounds.",
  },
  {
    id: "tertiary-text-disabled",
    name: "tertiary-disabled",
    displayName: "Tertiary Disabled",
    group: "Tertiary / Text",
    subgroup: "Text",
    path: "Tertiary / Text / tertiary-disabled",
    cssVar: "--theme-tertiary-text-primary-disabled",
    coreRef: "--core-color-tertiary-300",
    category: "tertiary",
    type: "text",
    lightHex: "#FBCB6B",
    darkHex: "#5C5C6B",
    paletteNameLight: "Tertiary 300",
    paletteNameDark: "Neutral 600",
    description: "Disabled state for tertiary typography.",
  },
  {
    id: "tertiary-text-default",
    name: "tertiary-default",
    displayName: "Tertiary Default",
    group: "Tertiary / Text",
    subgroup: "Text",
    path: "Tertiary / Text / tertiary-default",
    cssVar: "--theme-tertiary-text-primary-default",
    coreRef: "--core-color-tertiary-500",
    category: "tertiary",
    type: "text",
    lightHex: "#E89A1C",
    darkHex: "#FBCB6B",
    paletteNameLight: "Tertiary 500",
    paletteNameDark: "Tertiary 300",
    description: "Default tertiary accent text color for hints, tags, and annotations.",
  },
  {
    id: "tertiary-text-hover",
    name: "tertiaryhover",
    displayName: "Tertiary Hover",
    group: "Tertiary / Text",
    subgroup: "Text",
    path: "Tertiary / Text / tertiaryhover",
    cssVar: "--theme-tertiary-text-primary-hover",
    coreRef: "--core-color-tertiary-600",
    category: "tertiary",
    type: "text",
    lightHex: "#C27A10",
    darkHex: "#F2B244",
    paletteNameLight: "Tertiary 600",
    paletteNameDark: "Tertiary 400",
    description: "Hover text color for tertiary links and items.",
  },
  {
    id: "tertiary-text-active",
    name: "tertiary-active",
    displayName: "Tertiary Active",
    group: "Tertiary / Text",
    subgroup: "Text",
    path: "Tertiary / Text / tertiary-active",
    cssVar: "--theme-tertiary-text-primary-active",
    coreRef: "--core-color-tertiary-700",
    category: "tertiary",
    type: "text",
    lightHex: "#95590A",
    darkHex: "#FCDB94",
    paletteNameLight: "Tertiary 700",
    paletteNameDark: "Tertiary 200",
    description: "Active/pressed text color for tertiary items.",
  },

  // Tertiary / Background
  {
    id: "tertiary-bg-light",
    name: "tertiary-light",
    displayName: "Tertiary Light",
    group: "Tertiary / Background",
    subgroup: "Background",
    path: "Tertiary / Background / tertiary-light",
    cssVar: "--theme-tertiary-background-primary-light",
    coreRef: "--core-color-tertiary-50",
    category: "tertiary",
    type: "background",
    lightHex: "#FFF8EA",
    darkHex: "#5C3505",
    paletteNameLight: "Tertiary 50",
    paletteNameDark: "Tertiary 900",
    description: "Soft tinted container background for tertiary alert callouts.",
  },
  {
    id: "tertiary-bg-subtle",
    name: "tertiary-subtle",
    displayName: "Tertiary Subtle",
    group: "Tertiary / Background",
    subgroup: "Background",
    path: "Tertiary / Background / tertiary-subtle",
    cssVar: "--theme-tertiary-background-primary-subtle",
    coreRef: "--core-color-tertiary-100",
    category: "tertiary",
    type: "background",
    lightHex: "#FEEBBE",
    darkHex: "#784708",
    paletteNameLight: "Tertiary 100",
    paletteNameDark: "Tertiary 800",
    description: "Gentle tertiary tint for warm card callouts.",
  },
  {
    id: "tertiary-bg-disabled-light",
    name: "disabled-light",
    displayName: "Disabled Light",
    group: "Tertiary / Background",
    subgroup: "Background",
    path: "Tertiary / Background / disabled-light",
    cssVar: "--theme-tertiary-background-disabled-light",
    coreRef: "--core-color-neutral-100",
    category: "tertiary",
    type: "background",
    lightHex: "#EEEEF2",
    darkHex: "#2E2D38",
    paletteNameLight: "Neutral 100",
    paletteNameDark: "Neutral 800",
    description: "Light disabled container fill for inactive tertiary controls.",
  },
  {
    id: "tertiary-bg-disabled-strong",
    name: "disabled-strong",
    displayName: "Disabled Strong",
    group: "Tertiary / Background",
    subgroup: "Background",
    path: "Tertiary / Background / disabled-strong",
    cssVar: "--theme-tertiary-background-disabled-strong",
    coreRef: "--core-color-tertiary-200",
    category: "tertiary",
    type: "background",
    lightHex: "#FCDB94",
    darkHex: "#784708",
    paletteNameLight: "Tertiary 200",
    paletteNameDark: "Tertiary 800",
    description: "Muted solid background for disabled tertiary actions.",
  },
  {
    id: "tertiary-bg-strong",
    name: "strong",
    displayName: "Strong Background",
    group: "Tertiary / Background",
    subgroup: "Background",
    path: "Tertiary / Background / strong",
    cssVar: "--theme-tertiary-background-strong",
    coreRef: "--core-color-tertiary-500",
    category: "tertiary",
    type: "background",
    lightHex: "#E89A1C",
    darkHex: "#E89A1C",
    paletteNameLight: "Tertiary 500",
    paletteNameDark: "Tertiary 500",
    description: "Solid tertiary fill for warm amber badges and accents.",
  },
  {
    id: "tertiary-bg-hover",
    name: "hover",
    displayName: "Hover",
    group: "Tertiary / Background",
    subgroup: "Background",
    path: "Tertiary / Background / hover",
    cssVar: "--theme-tertiary-background-hover",
    coreRef: "--core-color-tertiary-600",
    category: "tertiary",
    type: "background",
    lightHex: "#C27A10",
    darkHex: "#F2B244",
    paletteNameLight: "Tertiary 600",
    paletteNameDark: "Tertiary 400",
    description: "Hover state background for tertiary controls.",
  },
  {
    id: "tertiary-bg-active",
    name: "active",
    displayName: "Active",
    group: "Tertiary / Background",
    subgroup: "Background",
    path: "Tertiary / Background / active",
    cssVar: "--theme-tertiary-background-active",
    coreRef: "--core-color-tertiary-700",
    category: "tertiary",
    type: "background",
    lightHex: "#95590A",
    darkHex: "#FBCB6B",
    paletteNameLight: "Tertiary 700",
    paletteNameDark: "Tertiary 300",
    description: "Pressed state background for tertiary controls.",
  },

  // Tertiary / Borders
  {
    id: "tertiary-borders-disabled",
    name: "tertiary-disabled",
    displayName: "Tertiary Disabled",
    group: "Tertiary / Borders",
    subgroup: "Borders",
    path: "Tertiary / Borders / tertiary-disabled",
    cssVar: "--theme-tertiary-borders-primary-disabled",
    coreRef: "--core-color-tertiary-200",
    category: "tertiary",
    type: "borders",
    lightHex: "#FCDB94",
    darkHex: "#95590A",
    paletteNameLight: "Tertiary 200",
    paletteNameDark: "Tertiary 700",
    description: "Border color for disabled outlined tertiary controls.",
  },
  {
    id: "tertiary-borders-default",
    name: "tertiary-default",
    displayName: "Tertiary Default",
    group: "Tertiary / Borders",
    subgroup: "Borders",
    path: "Tertiary / Borders / tertiary-default",
    cssVar: "--theme-tertiary-borders-primary-default",
    coreRef: "--core-color-tertiary-400",
    category: "tertiary",
    type: "borders",
    lightHex: "#F2B244",
    darkHex: "#F2B244",
    paletteNameLight: "Tertiary 400",
    paletteNameDark: "Tertiary 400",
    description: "Default outline border for tertiary tags and accent cards.",
  },
  {
    id: "tertiary-borders-hover",
    name: "hover",
    displayName: "Hover",
    group: "Tertiary / Borders",
    subgroup: "Borders",
    path: "Tertiary / Borders / hover",
    cssVar: "--theme-tertiary-borders-hover",
    coreRef: "--core-color-tertiary-600",
    category: "tertiary",
    type: "borders",
    lightHex: "#C27A10",
    darkHex: "#FBCB6B",
    paletteNameLight: "Tertiary 600",
    paletteNameDark: "Tertiary 300",
    description: "Hover state outline border for tertiary elements.",
  },

  // ── 4. NEUTRAL COLORS ──
  // Neutral / Text
  {
    id: "neutral-text-on-color",
    name: "text-on-color",
    displayName: "Text On Color",
    group: "Neutral / Text",
    subgroup: "Text",
    path: "Neutral / Text / text-on-color",
    cssVar: "--theme-neutral-text-on-color",
    aliasCssVar: "--theme-neutral-text-oncolor",
    coreRef: "--core-color-text-inverse",
    category: "neutral",
    type: "text",
    lightHex: "#FFFFFF",
    darkHex: "#FFFFFF",
    paletteNameLight: "Neutral 0",
    paletteNameDark: "Neutral 0",
    description: "High-contrast text on solid dark or colored backgrounds.",
  },
  {
    id: "neutral-text-subtleleast",
    name: "subtleleast",
    displayName: "Subtle Least",
    group: "Neutral / Text",
    subgroup: "Text",
    path: "Neutral / Text / subtleleast",
    cssVar: "--theme-neutral-text-subtleleast",
    aliasCssVar: "--theme-neutral-text-subtle-least",
    coreRef: "--core-color-text-tertiary",
    category: "neutral",
    type: "text",
    lightHex: "#787887",
    darkHex: "#9E9EAD",
    paletteNameLight: "Neutral 500",
    paletteNameDark: "Neutral 400",
    description: "Tertiary placeholder hints and faint annotations.",
  },
  {
    id: "neutral-text-subtle",
    name: "subtle",
    displayName: "Subtle",
    group: "Neutral / Text",
    subgroup: "Text",
    path: "Neutral / Text / subtle",
    cssVar: "--theme-neutral-text-subtle",
    coreRef: "--core-color-text-secondary",
    category: "neutral",
    type: "text",
    lightHex: "#5C5C6B",
    darkHex: "#C4C4CF",
    paletteNameLight: "Neutral 600",
    paletteNameDark: "Neutral 300",
    description: "Secondary helper text and subtitles.",
  },
  {
    id: "neutral-text-text",
    name: "text",
    displayName: "Primary Text",
    group: "Neutral / Text",
    subgroup: "Text",
    path: "Neutral / Text / text",
    cssVar: "--theme-neutral-text-primary-default",
    aliasCssVar: "--theme-neutral-text",
    coreRef: "--core-color-text-primary",
    category: "neutral",
    type: "text",
    lightHex: "#1D1C24",
    darkHex: "#F7F7F9",
    paletteNameLight: "Neutral 900",
    paletteNameDark: "Neutral 50",
    description: "Default body text and heading color.",
  },

  // Neutral / Border
  {
    id: "neutral-border-inverse",
    name: "inverse",
    displayName: "Inverse",
    group: "Neutral / Border",
    subgroup: "Border",
    path: "Neutral / Border / inverse",
    cssVar: "--theme-neutral-border-inverse",
    coreRef: "--core-color-neutral-0",
    category: "neutral",
    type: "borders",
    lightHex: "#FFFFFF",
    darkHex: "#1D1C24",
    paletteNameLight: "Neutral 0",
    paletteNameDark: "Neutral 900",
    description: "Inverted border on dark/colored surfaces.",
  },
  {
    id: "neutral-border-subtle",
    name: "border-subtle",
    displayName: "Border Subtle",
    group: "Neutral / Border",
    subgroup: "Border",
    path: "Neutral / Border / border-subtle",
    cssVar: "--theme-neutral-border-subtle",
    coreRef: "--core-color-border-subtle",
    category: "neutral",
    type: "borders",
    lightHex: "#EEEEF2",
    darkHex: "#2E2D38",
    paletteNameLight: "Neutral 100",
    paletteNameDark: "Neutral 800",
    description: "Subtle dividers and faint card borders.",
  },
  {
    id: "neutral-border-light",
    name: "border-light",
    displayName: "Border Light",
    group: "Neutral / Border",
    subgroup: "Border",
    path: "Neutral / Border / border-light",
    cssVar: "--theme-neutral-border-primary-default",
    aliasCssVar: "--theme-neutral-border-light",
    coreRef: "--core-color-border-default",
    category: "neutral",
    type: "borders",
    lightHex: "#DFDFE6",
    darkHex: "#454452",
    paletteNameLight: "Neutral 200",
    paletteNameDark: "Neutral 700",
    description: "Standard input, card, and panel borders.",
  },
  {
    id: "neutral-border-strong",
    name: "border-strong",
    displayName: "Border Strong",
    group: "Neutral / Border",
    subgroup: "Border",
    path: "Neutral / Border / border-strong",
    cssVar: "--theme-neutral-border-strong",
    coreRef: "--core-color-border-strong",
    category: "neutral",
    type: "borders",
    lightHex: "#9E9EAD",
    darkHex: "#787887",
    paletteNameLight: "Neutral 400",
    paletteNameDark: "Neutral 500",
    description: "High-contrast border for selected elements.",
  },

  // ── 5. CRITICAL COLORS ──
  {
    id: "critical-light-background",
    name: "light-background",
    displayName: "Light Background",
    group: "Critical",
    subgroup: "Critical",
    path: "Critical / light-background",
    cssVar: "--theme-semantics-critical-light-background",
    aliasCssVar: "--theme-semantics-critical-background-light",
    coreRef: "--core-color-status-danger-bg",
    category: "critical",
    type: "background",
    lightHex: "#FDEFEF",
    darkHex: "#3B0B11",
    paletteNameLight: "Danger 50",
    paletteNameDark: "Danger 900",
    description: "Soft tinted container fill for error banners.",
  },
  {
    id: "critical-border",
    name: "border",
    displayName: "Border",
    group: "Critical",
    subgroup: "Critical",
    path: "Critical / border",
    cssVar: "--theme-semantics-critical-border",
    coreRef: "--core-color-status-danger-border",
    category: "critical",
    type: "borders",
    lightHex: "#F4B1B1",
    darkHex: "#8F212A",
    paletteNameLight: "Danger 300",
    paletteNameDark: "Danger 700",
    description: "Critical error border for invalid inputs and alert boxes.",
  },
  {
    id: "critical-strong-background",
    name: "strong-background",
    displayName: "Strong Background",
    group: "Critical",
    subgroup: "Critical",
    path: "Critical / strong-background",
    cssVar: "--theme-semantics-critical-strong-background",
    aliasCssVar: "--theme-semantics-critical-background-strong",
    coreRef: "--core-color-danger-500",
    category: "critical",
    type: "background",
    lightHex: "#D8434A",
    darkHex: "#D8434A",
    paletteNameLight: "Danger 500",
    paletteNameDark: "Danger 500",
    description: "Solid critical red fill for destructive actions and badges.",
  },
  {
    id: "critical-text",
    name: "text",
    displayName: "Text",
    group: "Critical",
    subgroup: "Critical",
    path: "Critical / text",
    cssVar: "--theme-semantics-critical-text",
    coreRef: "--core-color-status-danger-text",
    category: "critical",
    type: "text",
    lightHex: "#8F212A",
    darkHex: "#EF8E8E",
    paletteNameLight: "Danger 700",
    paletteNameDark: "Danger 300",
    description: "Critical error text for validation messages.",
  },

  // ── 6. WARNING COLORS ──
  {
    id: "warning-light-background",
    name: "light-background",
    displayName: "Light Background",
    group: "Warning",
    subgroup: "Warning",
    path: "Warning / light-background",
    cssVar: "--theme-semantics-warning-light-background",
    aliasCssVar: "--theme-semantics-warning-background-light",
    coreRef: "--core-color-status-warning-bg",
    category: "warning",
    type: "background",
    lightHex: "#FFF8EA",
    darkHex: "#382002",
    paletteNameLight: "Warning 50",
    paletteNameDark: "Warning 900",
    description: "Soft tinted amber container fill for warning banners.",
  },
  {
    id: "warning-border",
    name: "border",
    displayName: "Border",
    group: "Warning",
    subgroup: "Warning",
    path: "Warning / border",
    cssVar: "--theme-semantics-warning-border",
    coreRef: "--core-color-status-warning-border",
    category: "warning",
    type: "borders",
    lightHex: "#FCDB94",
    darkHex: "#95590A",
    paletteNameLight: "Warning 300",
    paletteNameDark: "Warning 700",
    description: "Warning border for attention-required panels.",
  },
  {
    id: "warning-strong-background",
    name: "strong-background",
    displayName: "Strong Background",
    group: "Warning",
    subgroup: "Warning",
    path: "Warning / strong-background",
    cssVar: "--theme-semantics-warning-strong-background",
    aliasCssVar: "--theme-semantics-warning-background-strong",
    coreRef: "--core-color-warning-500",
    category: "warning",
    type: "background",
    lightHex: "#E89A1C",
    darkHex: "#E89A1C",
    paletteNameLight: "Warning 500",
    paletteNameDark: "Warning 500",
    description: "Solid amber fill for warning badges and alerts.",
  },
  {
    id: "warning-text",
    name: "text",
    displayName: "Text",
    group: "Warning",
    subgroup: "Warning",
    path: "Warning / text",
    cssVar: "--theme-semantics-warning-text",
    coreRef: "--core-color-status-warning-text",
    category: "warning",
    type: "text",
    lightHex: "#95590A",
    darkHex: "#FBCB6B",
    paletteNameLight: "Warning 700",
    paletteNameDark: "Warning 300",
    description: "Warning text for caution notices.",
  },

  // ── 7. SUCCESS COLORS ──
  {
    id: "success-light-background",
    name: "light-background",
    displayName: "Light Background",
    group: "Success",
    subgroup: "Success",
    path: "Success / light-background",
    cssVar: "--theme-semantics-success-light-background",
    aliasCssVar: "--theme-semantics-success-background-light",
    coreRef: "--core-color-status-success-bg",
    category: "success",
    type: "background",
    lightHex: "#EDFAF2",
    darkHex: "#052014",
    paletteNameLight: "Success 50",
    paletteNameDark: "Success 900",
    description: "Soft tinted green container background.",
  },
  {
    id: "success-border",
    name: "border",
    displayName: "Border",
    group: "Success",
    subgroup: "Success",
    path: "Success / border",
    cssVar: "--theme-semantics-success-border",
    coreRef: "--core-color-status-success-border",
    category: "success",
    type: "borders",
    lightHex: "#A8E7C6",
    darkHex: "#116840",
    paletteNameLight: "Success 300",
    paletteNameDark: "Success 700",
    description: "Success border for confirmed cards and inputs.",
  },
  {
    id: "success-strong-background",
    name: "strong-background",
    displayName: "Strong Background",
    group: "Success",
    subgroup: "Success",
    path: "Success / strong-background",
    cssVar: "--theme-semantics-success-strong-background",
    aliasCssVar: "--theme-semantics-success-background-strong",
    coreRef: "--core-color-success-500",
    category: "success",
    type: "background",
    lightHex: "#22A369",
    darkHex: "#22A369",
    paletteNameLight: "Success 500",
    paletteNameDark: "Success 500",
    description: "Solid success green fill for positive confirmation.",
  },
  {
    id: "success-text",
    name: "text",
    displayName: "Text",
    group: "Success",
    subgroup: "Success",
    path: "Success / text",
    cssVar: "--theme-semantics-success-text",
    coreRef: "--core-color-status-success-text",
    category: "success",
    type: "text",
    lightHex: "#116840",
    darkHex: "#7EDCAC",
    paletteNameLight: "Success 700",
    paletteNameDark: "Success 300",
    description: "Success text for confirmed state labels.",
  },

  // ── 8. INFO COLORS ──
  {
    id: "info-light-background",
    name: "light-background",
    displayName: "Light Background",
    group: "Info",
    subgroup: "Info",
    path: "Info / light-background",
    cssVar: "--theme-semantics-highlight-light-background",
    aliasCssVar: "--theme-semantics-highlight-background-light",
    coreRef: "--core-color-status-info-bg",
    category: "info",
    type: "background",
    lightHex: "#EBF6FD",
    darkHex: "#061C30",
    paletteNameLight: "Info 50",
    paletteNameDark: "Info 900",
    description: "Soft tinted blue background for guidance panels.",
  },
  {
    id: "info-border",
    name: "border",
    displayName: "Border",
    group: "Info",
    subgroup: "Info",
    path: "Info / border",
    cssVar: "--theme-semantics-highlight-border",
    coreRef: "--core-color-status-info-border",
    category: "info",
    type: "borders",
    lightHex: "#A9D8F6",
    darkHex: "#155187",
    paletteNameLight: "Info 300",
    paletteNameDark: "Info 700",
    description: "Highlight / info border for tips and guidance callouts.",
  },
  {
    id: "info-strong-background",
    name: "strong-background",
    displayName: "Strong Background",
    group: "Info",
    subgroup: "Info",
    path: "Info / strong-background",
    cssVar: "--theme-semantics-highlight-strong-background",
    aliasCssVar: "--theme-semantics-highlight-background-strong",
    coreRef: "--core-color-info-500",
    category: "info",
    type: "background",
    lightHex: "#2E8CD6",
    darkHex: "#2E8CD6",
    paletteNameLight: "Info 500",
    paletteNameDark: "Info 500",
    description: "Solid blue highlight fill for neutral system actions.",
  },
  {
    id: "info-text",
    name: "text",
    displayName: "Text",
    group: "Info",
    subgroup: "Info",
    path: "Info / text",
    cssVar: "--theme-semantics-highlight-text",
    coreRef: "--core-color-status-info-text",
    category: "info",
    type: "text",
    lightHex: "#155187",
    darkHex: "#84C7F1",
    paletteNameLight: "Info 700",
    paletteNameDark: "Info 300",
    description: "Informational guidance text.",
  },
];

/* Figma Library Icon matching the reference screenshot */
function FigmaLibraryIcon({ size = 15, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
      <path d="M12 6l-6 6 6 6 6-6-6-6z" />
    </svg>
  );
}

/* Vertical Pillar Segment displaying Token Name on line 1 and Color Palette Name on line 2 (NO COLOR CODES) */
function BaseColorPillarSegment({
  token,
  mode,
  isCopied,
  onCopy,
}: {
  token: FigmaTokenItem;
  mode: "light" | "dark";
  isCopied: boolean;
  onCopy: (cssVar: string, id: string) => void;
}) {
  const currentHex = mode === "light" ? token.lightHex : token.darkHex;
  const paletteName = mode === "light" ? token.paletteNameLight : token.paletteNameDark;
  const rgb = hexToRgb(currentHex);
  const lum = luminance(rgb.r, rgb.g, rgb.b);
  const isLight = lum > 0.42;
  const textColor = isLight ? "#1A1A22" : "#FFFFFF";
  const subtextColor = isLight ? "rgba(26, 26, 34, 0.78)" : "rgba(255, 255, 255, 0.88)";

  return (
    <div
      onClick={() => onCopy(`var(${token.cssVar})`, token.id)}
      title={`Click to copy var(${token.cssVar})`}
      style={{
        background: currentHex,
        color: textColor,
        padding: "16px 16px 14px",
        minHeight: 76,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 3,
        cursor: "pointer",
        position: "relative",
        userSelect: "none",
        transition: "filter 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = "brightness(1.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
      }}
    >
      {/* Line 1: Token Name */}
      <div
        style={{
          fontSize: "var(--core-font-size-sm, 14px)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
          color: textColor,
        }}
      >
        {token.displayName || token.name}
      </div>

      {/* Line 2: Color Palette Name (NO COLOR CODES) */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.01em",
          color: subtextColor,
          fontFamily: "var(--site-mono)",
        }}
      >
        {paletteName}
      </div>

      {/* Copied Toast Overlay */}
      {isCopied && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isLight ? "rgba(255,255,255,0.96)" : "rgba(18,18,24,0.96)",
            color: isLight ? "#111" : "#FFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontWeight: 700,
            fontSize: 12,
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>✓</span>
          <span>Copied!</span>
        </div>
      )}
    </div>
  );
}

/* Vertical Pillar Card Container */
function BaseColorPillar({
  title,
  tokens,
  mode,
  copiedKey,
  onCopy,
}: {
  title?: string;
  tokens: FigmaTokenItem[];
  mode: "light" | "dark";
  copiedKey: string | null;
  onCopy: (cssVar: string, id: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 145px",
        minWidth: 140,
        maxWidth: 180,
      }}
    >
      {title && (
        <div
          style={{
            fontSize: "var(--core-font-size-sm, 14px)",
            fontWeight: 700,
            color: "var(--site-text)",
            marginBottom: 8,
            paddingLeft: 4,
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(128,128,128,0.15)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {tokens.map((token) => (
          <BaseColorPillarSegment
            key={token.id}
            token={token}
            mode={mode}
            isCopied={copiedKey === token.id}
            onCopy={onCopy}
          />
        ))}
      </div>
    </div>
  );
}

interface EditorialColorGroup {
  id: string;
  eyebrow: string;
  title: string;
  category: "primary" | "secondary" | "tertiary" | "neutral" | "critical" | "warning" | "success" | "info";
  description: string;
  actionLabel: string;
  pillars: Array<{
    subgroup: string;
    tokens: FigmaTokenItem[];
  }>;
}

function BaseColorsRedesignedSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeMode, setActiveMode] = useState<"light" | "dark">("light");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedVarName, setCopiedVarName] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setCopiedVarName(text);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === id ? null : curr));
      setCopiedVarName((curr) => (curr === text ? null : curr));
    }, 2200);
  };

  // 1. Primary Pillars (Text, Background, Borders)
  const primaryPillars = ["Text", "Background", "Borders"].map((subgroup) => ({
    subgroup,
    tokens: FIGMA_BASE_TOKENS.filter((t) => t.category === "primary" && t.subgroup === subgroup),
  }));

  // 2. Secondary Pillars (Text, Background, Borders)
  const secondaryPillars = ["Text", "Background", "Borders"].map((subgroup) => ({
    subgroup,
    tokens: FIGMA_BASE_TOKENS.filter((t) => t.category === "secondary" && t.subgroup === subgroup),
  }));

  // 3. Tertiary Pillars (Text, Background, Borders)
  const tertiaryPillars = ["Text", "Background", "Borders"].map((subgroup) => ({
    subgroup,
    tokens: FIGMA_BASE_TOKENS.filter((t) => t.category === "tertiary" && t.subgroup === subgroup),
  }));

  // 4. Neutral Pillars (Text, Border)
  const neutralPillars = ["Text", "Border"].map((subgroup) => ({
    subgroup,
    tokens: FIGMA_BASE_TOKENS.filter((t) => t.category === "neutral" && t.subgroup === subgroup),
  }));

  // 5. Critical Pillars (Light Background, Border, Strong Background, Text)
  const criticalPillars = [
    {
      subgroup: "Critical Tokens",
      tokens: FIGMA_BASE_TOKENS.filter((t) => t.category === "critical"),
    },
  ];

  // 6. Warning Pillars (Light Background, Border, Strong Background, Text)
  const warningPillars = [
    {
      subgroup: "Warning Tokens",
      tokens: FIGMA_BASE_TOKENS.filter((t) => t.category === "warning"),
    },
  ];

  // 7. Success Pillars (Light Background, Border, Strong Background, Text)
  const successPillars = [
    {
      subgroup: "Success Tokens",
      tokens: FIGMA_BASE_TOKENS.filter((t) => t.category === "success"),
    },
  ];

  // 8. Info Pillars (Light Background, Border, Strong Background, Text)
  const infoPillars = [
    {
      subgroup: "Info Tokens",
      tokens: FIGMA_BASE_TOKENS.filter((t) => t.category === "info"),
    },
  ];

  const editorialGroups: EditorialColorGroup[] = [
    {
      id: "primary",
      eyebrow: "Colors",
      title: "Primary Colors",
      category: "primary",
      description:
        "The Primary palette establishes the fundamental identity of the interface, guiding typographic emphasis, interactive fills, and structured borders across themes.",
      actionLabel: "Library - Primary",
      pillars: primaryPillars,
    },
    {
      id: "secondary",
      eyebrow: "Colors",
      title: "Secondary Colors",
      category: "secondary",
      description:
        "The Secondary palette complements the primary brand hue with refined purple tones for supportive UI elements, contextual badges, and secondary actions.",
      actionLabel: "Library - Secondary",
      pillars: secondaryPillars,
    },
    {
      id: "tertiary",
      eyebrow: "Colors",
      title: "Tertiary Colors",
      category: "tertiary",
      description:
        "The Tertiary palette introduces warm amber accents for third-tier emphasis, feature discoveries, notifications, and subtle highlights.",
      actionLabel: "Library - Tertiary",
      pillars: tertiaryPillars,
    },
    {
      id: "neutral",
      eyebrow: "Colors",
      title: "Neutral Colors",
      category: "neutral",
      description:
        "The Neutral palette provides achromatic typography, subtle surface dividers, and high-contrast boundary definitions across both themes.",
      actionLabel: "Library - Neutral",
      pillars: neutralPillars,
    },
    {
      id: "critical",
      eyebrow: "Colors",
      title: "Critical Colors",
      category: "critical",
      description:
        "The Critical palette signals urgent warnings, error dialogues, destructive actions, and validation failures requiring immediate attention.",
      actionLabel: "Library - Critical",
      pillars: criticalPillars,
    },
    {
      id: "warning",
      eyebrow: "Colors",
      title: "Warning Colors",
      category: "warning",
      description:
        "The Warning palette communicates non-blocking alerts, system cautions, and threshold notifications before an action is executed.",
      actionLabel: "Library - Warning",
      pillars: warningPillars,
    },
    {
      id: "success",
      eyebrow: "Colors",
      title: "Success Colors",
      category: "success",
      description:
        "The Success palette confirms positive outcomes, completed transactions, verified states, and healthy system status indicators.",
      actionLabel: "Library - Success",
      pillars: successPillars,
    },
    {
      id: "info",
      eyebrow: "Colors",
      title: "Info Colors",
      category: "info",
      description:
        "The Info palette provides clear guidance, informative callouts, helpful hints, and instructional context across user flows.",
      actionLabel: "Library - Info",
      pillars: infoPillars,
    },
  ];

  // Filter groups
  const filteredGroups = editorialGroups
    .filter((g) => {
      if (activeCategory === "all") return true;
      return activeCategory === g.category;
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Control header: Filters, Search, and Light/Dark Mode Switcher */}
      <div
        style={{
          background: "var(--site-bg-elevated)",
          borderRadius: 16,
          border: "1px solid var(--site-border)",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--site-text-faint)", marginRight: 4 }}>
            Filter:
          </span>
          {[
            { id: "all", label: "All Groups" },
            { id: "primary", label: "Primary" },
            { id: "secondary", label: "Secondary" },
            { id: "tertiary", label: "Tertiary" },
            { id: "neutral", label: "Neutral" },
            { id: "critical", label: "Critical" },
            { id: "warning", label: "Warning" },
            { id: "success", label: "Success" },
            { id: "info", label: "Info" },
          ].map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: "var(--core-font-size-xs, 12px)",
                  fontWeight: active ? 600 : 500,
                  border: active ? "1px solid var(--site-accent, #0270A9)" : "1px solid var(--site-border)",
                  background: active ? "var(--site-accent-soft, rgba(2,112,169,0.12))" : "transparent",
                  color: active ? "var(--site-accent, #0270A9)" : "var(--site-text-dim)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Light / Dark Mode Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--site-bg)", padding: "4px 10px", borderRadius: 24, border: "1px solid var(--site-border)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: activeMode === "light" ? "var(--site-text)" : "var(--site-text-faint)" }}>Light</span>
            <button
              type="button"
              onClick={() => setActiveMode(activeMode === "light" ? "dark" : "light")}
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: activeMode === "light" ? "rgba(128,128,128,0.25)" : "var(--core-color-action-primary-bg, #1F4F8D)",
                border: "none",
                position: "relative",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.25s",
              }}
              aria-label="Toggle preview mode"
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: "#fff",
                  position: "absolute",
                  top: 2,
                  left: activeMode === "light" ? 2 : 20,
                  transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }}
              />
            </button>
            <span style={{ fontSize: 12, fontWeight: 600, color: activeMode === "dark" ? "var(--site-text)" : "var(--site-text-faint)" }}>Dark</span>
          </div>
        </div>
      </div>

      {/* Editorial Group Cards matching the inspiration screenshot */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            style={{
              background: "var(--site-bg-elevated, #FFFFFF)",
              borderRadius: 24,
              padding: "40px 40px 36px",
              border: "1px solid var(--site-border)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 40,
            }}
          >
            {/* Left column: Eyebrow + Title + Narrative + Action pill button */}
            <div style={{ flex: "0 0 270px", minWidth: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                {/* Eyebrow */}
                <div
                  style={{
                    fontSize: "var(--core-font-size-xs, 12px)",
                    fontWeight: 600,
                    color: "var(--site-text-dim)",
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {group.eyebrow}
                </div>

                {/* Section Title */}
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.15,
                    color: "var(--site-text, #111)",
                    margin: "0 0 18px 0",
                  }}
                >
                  {group.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "var(--core-font-size-sm, 14px)",
                    lineHeight: 1.6,
                    color: "var(--site-text-dim, #555)",
                    margin: "0 0 16px 0",
                  }}
                >
                  {group.description}
                </p>

                <p
                  style={{
                    fontSize: "var(--core-font-size-xs, 12px)",
                    lineHeight: 1.55,
                    color: "var(--site-text-faint, #888)",
                    margin: "0 0 22px 0",
                  }}
                >
                  For more tints and information about the design system color variables, visit
                </p>

                {/* Action Button Pill */}
                <button
                  type="button"
                  onClick={() => {
                    const sampleVar = group.pillars[0]?.tokens[0]?.cssVar;
                    if (sampleVar) copyText(`var(${sampleVar})`, `btn-${group.id}`);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 16px",
                    borderRadius: 12,
                    background: "var(--site-bg)",
                    border: "1px solid var(--site-border)",
                    fontSize: "var(--core-font-size-sm, 14px)",
                    fontWeight: 600,
                    color: "var(--site-text)",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--site-accent, #0270A9)";
                    e.currentTarget.style.color = "var(--site-accent, #0270A9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--site-border)";
                    e.currentTarget.style.color = "var(--site-text)";
                  }}
                >
                  <FigmaLibraryIcon size={14} />
                  <span>{group.actionLabel}</span>
                </button>
              </div>

              {/* Mode indicator footer */}
              <div style={{ marginTop: 28 }}>
                <span
                  style={{
                    fontSize: "var(--core-font-size-xs, 12px)",
                    fontFamily: "var(--site-mono)",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 8,
                    background: "rgba(128,128,128,0.08)",
                    color: "var(--site-text-dim)",
                  }}
                >
                  {group.pillars.reduce((acc, p) => acc + p.tokens.length, 0)} tokens · {activeMode.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Right column: Vertical Pillar Cards side-by-side */}
            <div
              style={{
                flex: "1 1 500px",
                minWidth: 320,
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              {group.pillars.map((pillar) => (
                <BaseColorPillar
                  key={pillar.subgroup}
                  title={pillar.subgroup}
                  tokens={pillar.tokens}
                  mode={activeMode}
                  copiedKey={copiedKey}
                  onCopy={copyText}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Copied Notification */}
      {copiedVarName && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "#1E1E24",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: 12,
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            fontSize: "var(--core-font-size-xs, 12px)",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 9999,
          }}
        >
          <span style={{ color: "#34D399", fontSize: 16 }}>✓</span>
          <span>Copied to clipboard:</span>
          <span style={{ fontFamily: "var(--site-mono)", color: "#93C5FD" }}>{copiedVarName}</span>
        </div>
      )}
    </div>
  );
}

/* ── end Figma Aligned Base Color Variables ─────────────────────────────── */

export default function Color() {
  const sections = [
    {
      id: "01",
      title: "Full color scales",
      description: "You shouldn't need to pick from these directly — they're what the roles below are built from.",
      content: (
        <div style={{ background: "var(--core-color-surface-default)", borderRadius: 14, padding: "32px", border: "1px solid rgba(128,128,128,0.15)" }}>
          <div style={{ display: "flex", paddingBottom: 16, borderBottom: "1px solid var(--site-border)", fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 600, color: "var(--core-color-text-secondary)" }}>
            <div style={{ width: "25%", minWidth: 150 }}>Name</div>
            <div style={{ width: "75%" }}>Swatches</div>
          </div>
          <RampRow name="brand (primary)" prefix="brand" scale={color.brand} />
          <RampRow name="secondary" prefix="secondary" scale={color.secondary} />
          <RampRow name="tertiary" prefix="tertiary" scale={color.tertiary} />
          <RampRow name="neutral" prefix="neutral" scale={color.neutral} />
          <RampRow name="success" prefix="success" scale={color.success} />
          <RampRow name="warning" prefix="warning" scale={color.warning} />
          <RampRow name="danger" prefix="danger" scale={color.danger} />
          <RampRow name="info" prefix="info" scale={color.info} isLast />
        </div>
      ),
    },
    {
      id: "02",
      title: "Base colors",
      description: "Figma Variable ↔ Code 1:1 mapping with dual-mode light/dark resolution, unified naming convention, and live preview.",
      content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <BaseColorsRedesignedSection />
        </div>
      )
    },
    {
      id: "03",
      title: "Quick reference",
      description: "What to use where — a handy table mapping common UI elements to their corresponding tokens.",
      content: (
        <div style={{ background: "var(--core-color-bg-page)", borderRadius: 14, padding: "32px", border: "1px solid rgba(128,128,128,0.15)" }}>
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ paddingBottom: 16, borderBottom: "1px solid var(--site-border)", fontSize: "var(--core-font-size-xs, 12px)", color: "var(--core-color-text-secondary)" }}>If you're building this…</th>
                <th style={{ paddingBottom: 16, borderBottom: "1px solid var(--site-border)", fontSize: "var(--core-font-size-xs, 12px)", color: "var(--core-color-text-secondary)" }}>…use this token</th>
              </tr>
            </thead>
            <tbody>
              {quickRef.map((r) => (
                <tr key={r.use}>
                  <td style={{ padding: "16px 0", borderBottom: "1px solid var(--site-border)", fontSize: 14, color: "var(--core-color-text-primary)" }}>{r.use}</td>
                  <td style={{ padding: "16px 0", borderBottom: "1px solid var(--site-border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ background: `var(${r.token})`, display: "inline-block", width: 24, height: 24, borderRadius: 6, border: "1px solid rgba(128,128,128,0.2)" }} />
                      <code style={{ cursor: "pointer", color: "var(--core-color-brand-600)", fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)" }} onClick={() => navigator.clipboard.writeText(`var(${r.token})`)} title="Copy token">
                        {r.token}
                      </code>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  ];

  function generateSiteScssPalette(): string {
    const brand = color?.brand || {};
    const secondary = color?.secondary || {};
    const tertiary = color?.tertiary || {};
    const neutral = color?.neutral || {};
    const success = color?.success || {};
    const danger = color?.danger || {};
    const info = color?.info || {};
    const warning = color?.warning || {};

    const sortScale = (obj: any) =>
      Object.entries(obj).sort(([a], [b]) => parseInt(a, 10) - parseInt(b, 10));

    const brandLines = sortScale(brand).map(([k, v]) => `  --theme-primitive-color-primary-${k}: ${v};`).join("\n");
    const secLines = sortScale(secondary).map(([k, v]) => `  --theme-primitive-color-secondary-${k}: ${v};`).join("\n");
    const tertLines = sortScale(tertiary).map(([k, v]) => `  --theme-primitive-color-tertiary-${k}: ${v};`).join("\n");
    const succLines = sortScale(success).map(([k, v]) => `  --theme-colors-success-${k}: ${v};`).join("\n");
    const neutralLines = [
      `  --theme-colors-neutral-white: #FFFFFF;`,
      `  --theme-colors-neutral-grey-black: #000000;`,
      `  --theme-colors-neutral-0: #FFFFFF;`,
      ...sortScale(neutral).map(([k, v]) => `  --theme-colors-neutral-${k}: ${v};`)
    ].join("\n");
    const redLines = sortScale(danger).map(([k, v]) => `  --theme-colors-red-${k}: ${v};`).join("\n");
    const infoLines = sortScale(info).map(([k, v]) => `  --theme-colors-info-${k}: ${v};`).join("\n");
    const warnLines = sortScale(warning).map(([k, v]) => `  --theme-colors-warning-${k}: ${v};`).join("\n");

    const getTokensByMode = (isDark: boolean) => {
      const grouped = FIGMA_BASE_TOKENS.reduce((acc, token) => {
        if (!acc[token.group]) acc[token.group] = [];
        acc[token.group].push(token);
        return acc;
      }, {} as Record<string, typeof FIGMA_BASE_TOKENS>);

      return Object.entries(grouped).map(([groupName, tokens]) => {
        const lines = tokens.map(t => {
          const val = isDark ? t.darkHex : t.lightHex;
          let css = `  ${t.cssVar}: ${val};`;
          if (t.aliasCssVar) {
            css += `\n  ${t.aliasCssVar}: ${val};`;
          }
          return css;
        });
        return `  /* ${groupName} ---------------------------------------------------------------------*/\n${lines.join("\n")}`;
      }).join("\n\n");
    };

    const lightSemanticLines = getTokensByMode(false);
    const darkSemanticLines = getTokensByMode(true);

    return `/**
 * CORE DESIGN SYSTEM — THEME COLOR & FIGMA BASE VARIABLES
 *
 * Generated with 1:1 Figma Variable parity.
 * Includes both Light and Dark mode mappings, plus the full primitive ramps.
 * Use these semantic variables across styles and components.
 */

:root {
  /* ---------------------------------------------------------------------------------- */
  /* Primitive Scale Colors */
  /* ---------------------------------------------------------------------------------- */

  /* Primary (Brand) colors ----------------------------------------------------------*/
${brandLines}

  /* Secondary colors ----------------------------------------------------------------*/
${secLines}

  /* Tertiary colors -----------------------------------------------------------------*/
${tertLines}

  /* Success -------------------------------------------------------------------------*/
${succLines}

  /* Neutral (Grey) colors -----------------------------------------------------------*/
${neutralLines}

  /* Red (Danger) --------------------------------------------------------------------*/
${redLines}

  /* Info ----------------------------------------------------------------------------*/
${infoLines}

  /* Warning -------------------------------------------------------------------------*/
${warnLines}
}

/* ---------------------------------------------------------------------------------- */
/* Figma Aligned Semantic Base Variables (Light Mode) */
/* ---------------------------------------------------------------------------------- */
:root,
html[data-site-mode="light"],
[data-mode="light"] {
${lightSemanticLines}
}

/* ---------------------------------------------------------------------------------- */
/* Figma Aligned Semantic Base Variables (Dark Mode) */
/* ---------------------------------------------------------------------------------- */
html[data-site-mode="dark"],
[data-mode="dark"] {
${darkSemanticLines}
}
`;
  }

  const handleDownloadPalette = (e: React.MouseEvent) => {
    e.preventDefault();
    const scssText = generateSiteScssPalette();
    const dataUri = `data:text/x-scss;charset=utf-8,${encodeURIComponent(scssText)}`;
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = "Core-Color-Palette.scss";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 500);
  };

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: 60, marginTop: 40 }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--core-color-brand-600)", marginBottom: 12 }}>Foundation</div>
        <h1 style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.06em", margin: "0 0 16px 0", color: "var(--core-color-text-primary)", lineHeight: 1.1 }}>
          Colors
        </h1>
        <p style={{ maxWidth: 560, margin: "0 auto", color: "var(--core-color-text-tertiary)", fontSize: 18, lineHeight: 1.6, fontWeight: 400 }}>
          The complete color system — base colors that define what each hue is for, semantic tokens that resolve in light and dark mode, and the full primitive scales they're built from.
        </p>
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            onClick={handleDownloadPalette}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              background: "var(--core-color-action-primary-bg)",
              color: "var(--core-color-action-primary-text)",
              fontWeight: 600,
              borderRadius: 30,
              border: "none",
              cursor: "pointer",
              fontSize: "var(--core-font-size-sm, 14px)",
              transition: "transform 0.2s, opacity 0.2s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
          >
            <span style={{ fontSize: 18 }}>⬇</span> Download SCSS Palette
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
        {sections.map((s) => (
          <div key={s.id} style={{ display: "flex", flexDirection: "column", gap: 40, position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: "-12.5%", width: "125%", height: 1, backgroundColor: "var(--site-border)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingTop: 32 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--core-color-text-tertiary)", marginBottom: 12 }}>{s.id}</div>
                <h2 style={{ fontSize: 48, fontWeight: 500, letterSpacing: "-0.04em", margin: 0, textTransform: "lowercase" }}>{s.title}</h2>
              </div>
              <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end" }}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--core-color-text-secondary)", textAlign: "right", fontWeight: 400 }}>{s.description}</p>
              </div>
            </div>
            <div>
              {s.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
