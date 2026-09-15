import React, { useMemo, useState } from "react";
import {
  BRAND_TOKEN_SECTIONS,
  type PrimitiveSwatch,
  type SemanticTokenRow,
  resolveCell,
} from "./brandTokenData";

function TokenIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.55 }}>
      <path d="M12 2L2 12l10 10 10-10L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 6l-6 6 6 6 6-6-6-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function CopyBtn({
  label,
  value,
  onCopied,
}: {
  label: string;
  value: string;
  onCopied: (v: string) => void;
}) {
  return (
    <button
      type="button"
      title={`Copy ${label}`}
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(value);
        onCopied(value);
      }}
      style={{
        border: "1px solid var(--theme-neutral-border-primary-default)",
        background: "var(--theme-colors-neutral-100)",
        borderRadius: "var(--core-radius-xs)",
        padding: "var(--core-space-1) var(--core-space-2)",
        fontSize: "var(--typography-font-size-xs)",
        fontWeight: 600,
        color: "var(--theme-neutral-text-subtle)",
        cursor: "pointer",
      }}
      className="brand-token-copy-btn"
    >
      Copy
    </button>
  );
}

function ColorValuePill({
  primitive,
  mode,
  cssVar,
  onCopied,
}: {
  primitive: PrimitiveSwatch;
  mode: "light" | "dark";
  cssVar: string;
  onCopied: (v: string) => void;
}) {
  const isLightSwatch = ["#FFFFFF", "#F5F7FA", "#E2E9F3", "#BACEE9", "#F7F7F9", "#EEEEF2"].includes(primitive.hex);
  return (
    <div
      className="brand-token-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--core-space-3)",
        padding: "var(--core-space-2) var(--core-space-3)",
        borderRadius: "var(--core-radius-lg)",
        border: "1px solid var(--core-color-neutral-200)",
        background: "var(--core-color-neutral-50)",
        minWidth: 200,
        transition: "border-color 0.12s ease, box-shadow 0.12s ease",
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "var(--core-radius-xs)",
          background: primitive.hex,
          border: isLightSwatch ? "1px solid var(--core-color-neutral-200)" : "1px solid transparent",
          flexShrink: 0,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-1)", minWidth: 0 }}>
        <span style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 500, color: "var(--core-color-text-primary)", lineHeight: 1.3, whiteSpace: "nowrap" }}>
          {primitive.path}
        </span>
        <span style={{ fontSize: "var(--core-font-size-xs)", fontFamily: "var(--site-mono)", color: "var(--core-color-text-secondary)", lineHeight: 1.3 }}>
          {primitive.hex}
        </span>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: "var(--core-space-1)" }}>
        <CopyBtn label="hex" value={primitive.hex} onCopied={onCopied} />
        <CopyBtn label="token" value={cssVar} onCopied={onCopied} />
      </div>
    </div>
  );
}

function TokenRow({
  row,
  previewMode,
  onCopied,
}: {
  row: SemanticTokenRow;
  previewMode: "light" | "dark" | "both";
  onCopied: (v: string) => void;
}) {
  const light = resolveCell(row.light);
  const dark = resolveCell(row.dark);

  return (
    <tr
      className="brand-token-row"
      style={{
        height: 60,
        borderBottom: "1px solid var(--core-color-neutral-100)",
        transition: "background 0.12s ease",
      }}
    >
      <td style={{ padding: "var(--core-space-3) var(--core-space-4)", verticalAlign: "middle", width: "32%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--core-space-3)" }}>
          <TokenIcon />
          <div>
            <div style={{ fontSize: "var(--core-font-size-sm)", fontWeight: 500, color: "var(--core-color-text-primary)", lineHeight: 1.35 }}>{row.name}</div>
            <code
              style={{
                fontSize: "var(--core-font-size-xs)",
                fontFamily: "var(--site-mono)",
                color: "var(--core-color-text-secondary)",
                cursor: "pointer",
              }}
              onClick={() => {
                navigator.clipboard.writeText(row.cssVar);
                onCopied(row.cssVar);
              }}
              title="Click to copy CSS variable"
            >
              {row.cssVar}
            </code>
          </div>
        </div>
      </td>
      <td
        style={{
          padding: "var(--core-space-3) var(--core-space-4)",
          verticalAlign: "middle",
          width: "34%",
          opacity: previewMode === "dark" ? 0.45 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <ColorValuePill primitive={light} mode="light" cssVar={row.cssVar} onCopied={onCopied} />
      </td>
      <td
        style={{
          padding: "var(--core-space-3) var(--core-space-4)",
          verticalAlign: "middle",
          width: "34%",
          opacity: previewMode === "light" ? 0.45 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <ColorValuePill primitive={dark} mode="dark" cssVar={row.cssVar} onCopied={onCopied} />
      </td>
    </tr>
  );
}

export function BrandTokenReference() {
  const [query, setQuery] = useState("");
  const [previewMode, setPreviewMode] = useState<"light" | "dark" | "both">("both");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopied = (value: string) => {
    setCopied(value);
    window.setTimeout(() => setCopied((c) => (c === value ? null : c)), 2000);
  };

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BRAND_TOKEN_SECTIONS;
    return BRAND_TOKEN_SECTIONS.map((section) => ({
      ...section,
      rows: section.rows.filter(
        (row) =>
          row.name.toLowerCase().includes(q) ||
          row.cssVar.toLowerCase().includes(q) ||
          resolveCell(row.light).label.toLowerCase().includes(q) ||
          resolveCell(row.dark).label.toLowerCase().includes(q)
      ),
    })).filter((s) => s.rows.length > 0);
  }, [query]);

  const highlightMode = previewMode === "both" ? "both" : previewMode;

  return (
    <div className="brand-token-reference" style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-8)" }}>
      <style>{`
        .brand-token-reference .brand-token-row:hover { background: var(--core-color-neutral-50); }
        .brand-token-reference .brand-token-pill:hover { border-color: var(--core-color-neutral-300); box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
        .brand-token-reference .brand-token-copy-btn:hover,
        .brand-token-reference .brand-token-copy-btn:focus-visible {
          color: var(--theme-primitive-color-primary-600);
          border-color: var(--brand-border-primary-default);
          background: var(--brand-background-primary-light);
          outline: none;
        }
        .brand-token-reference thead th { position: sticky; top: 0; z-index: 2; background: var(--core-color-neutral-0); }
        @media (max-width: 900px) {
          .brand-token-reference table { display: block; overflow-x: auto; }
        }
      `}</style>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--core-space-4)",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--core-space-4) var(--core-space-5)",
          background: "var(--core-color-neutral-0)",
          border: "1px solid var(--core-color-neutral-100)",
          borderRadius: "var(--core-radius-lg)",
        }}
      >
        <input
          type="search"
          placeholder="Search tokens, variables, or primitives…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: "1 1 220px",
            minWidth: 200,
            padding: "var(--core-space-3) var(--core-space-4)",
            borderRadius: "var(--core-radius-sm)",
            border: "1px solid var(--core-color-neutral-200)",
            fontSize: "var(--core-font-size-sm)",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", gap: "var(--core-space-2)", alignItems: "center" }}>
          <span style={{ fontSize: "var(--core-font-size-xs)", fontWeight: 600, color: "var(--core-color-text-secondary)", marginRight: 4 }}>Highlight:</span>
          {(["both", "light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPreviewMode(mode)}
              style={{
                padding: "var(--core-space-2) var(--core-space-4)",
                borderRadius: "var(--core-radius-sm)",
                border: previewMode === mode ? "1px solid var(--core-color-brand-500)" : "1px solid var(--core-color-neutral-200)",
                background: previewMode === mode ? "var(--core-color-brand-100)" : "var(--core-color-neutral-0)",
                color: previewMode === mode ? "var(--core-color-brand-500)" : "var(--core-color-neutral-600)",
                fontSize: "var(--core-font-size-xs)",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      {filteredSections.map((section) => (
        <section key={section.id} style={{ background: "var(--core-color-neutral-0)", border: "1px solid var(--core-color-neutral-100)", borderRadius: "var(--core-radius-lg)", overflow: "hidden" }}>
          <div style={{ padding: "var(--core-space-4) var(--core-space-5) var(--core-space-3)", borderBottom: "1px solid var(--core-color-neutral-100)" }}>
            <h3 style={{ margin: 0, fontSize: "var(--core-font-size-sm)", fontWeight: 700, color: "var(--core-color-text-primary)", letterSpacing: "-0.01em" }}>
              {section.title}
            </h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--core-color-neutral-100)", height: 44 }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "var(--core-space-3) var(--core-space-4)",
                      fontSize: "var(--core-font-size-xs)",
                      fontWeight: 600,
                      color: "var(--core-color-text-secondary)",
                      width: "32%",
                    }}
                  >
                    Token
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "var(--core-space-3) var(--core-space-4)",
                      fontSize: "var(--core-font-size-xs)",
                      fontWeight: 600,
                      color: "var(--core-color-text-secondary)",
                      width: "34%",
                    }}
                  >
                    Light
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "var(--core-space-3) var(--core-space-4)",
                      fontSize: "var(--core-font-size-xs)",
                      fontWeight: 600,
                      color: "var(--core-color-text-secondary)",
                      width: "34%",
                    }}
                  >
                    Dark
                  </th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <TokenRow key={row.cssVar} row={row} previewMode={highlightMode} onCopied={handleCopied} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {filteredSections.length === 0 && (
        <div style={{ padding: "var(--core-space-10)", textAlign: "center", color: "var(--core-color-text-secondary)", fontSize: "var(--core-font-size-sm)" }}>No tokens match your search.</div>
      )}

      {copied && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "var(--core-color-text-primary)",
            color: "var(--core-color-neutral-0)",
            padding: "var(--core-space-3) var(--core-space-5)",
            borderRadius: "var(--core-radius-lg)",
            fontSize: "var(--core-font-size-xs)",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            zIndex: 9999,
            fontFamily: "var(--site-mono)",
          }}
        >
          ✓ Copied {copied}
        </div>
      )}
    </div>
  );
}
