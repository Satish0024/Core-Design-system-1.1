import React from "react";
import typography from "../../../../packages/tokens/src/typography.json";

const order = [
  "display", "h1", "h2", "h3", "h4", "h5", "h6",
  "lead", "bodyLarge", "bodyMedium", "bodySmall",
  "labelLarge", "labelMedium", "labelSmall",
  "caption", "numericData",
];

const roleName: Record<string, string> = {
  display: "Display", h1: "H1", h2: "H2", h3: "H3", h4: "H4", h5: "H5", h6: "H6",
  lead: "Lead", bodyLarge: "Body Large", bodyMedium: "Body Medium", bodySmall: "Body Small",
  labelLarge: "Label Large", labelMedium: "Label Medium", labelSmall: "Label Small",
  caption: "Caption", numericData: "Numeric / Data",
};

function px(v: string) { return parseFloat(v); }
function remLabel(v: string) {
  const n = px(v);
  if (!Number.isFinite(n)) return v;
  const r = n / 16;
  const remStr = Number.isInteger(r) ? `${r}rem` : `${parseFloat(r.toFixed(3))}rem`;
  return `${remStr} / ${n}px`;
}

/** WCAG "large text" (18px normal or 14px bold) only needs 3:1 contrast instead of 4.5:1. */
function isLargeText(sizePx: number, weight: string) {
  return sizePx >= 18 || (sizePx >= 14 && parseInt(weight, 10) >= 700);
}

export default function Typography() {
  return (
    <div>
      <h1 className="site-h1">Typography</h1>
      <p className="site-lede">
        Sixteen semantic roles aligned to Bootstrap 5's type scale (<code>h1</code>–<code>h6</code>,{" "}
        <code>lead</code>, body, small) — each with an explicit desktop and mobile size. Font family is
        themeable per client; size, weight, and line-height are CORE-owned and do not vary by brand.
      </p>

      <h2 className="site-section-title">Font family — Inclusive Sans</h2>
      <p className="site-section-sub">
        CORE's default typeface is <strong style={{ color: "var(--site-text)" }}>Inclusive Sans</strong>, the same
        typeface chosen for clear letterform distinction at small sizes (a real
        accessibility property: it visually separates I / l / 1 and O / 0, which many UI fonts don't). It's a
        free, open-source Google Font (SIL Open Font License 1.1) — no license to buy, no attribution required,
        safe to self-host or load from Google Fonts.
      </p>
      <div className="site-panel">
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <a className="btn-hero primary" href="https://fonts.google.com/specimen/Inclusive+Sans" target="_blank" rel="noreferrer">
            ⬇ Download on Google Fonts
          </a>
          <a className="btn-hero ghost" href="https://fonts.google.com/specimen/Inclusive+Sans/about" target="_blank" rel="noreferrer">
            View license (SIL OFL 1.1)
          </a>
        </div>
        <div style={{ fontFamily: "'Inclusive Sans', sans-serif", fontSize: 40, fontWeight: 400, lineHeight: 1.3, marginBottom: 8 }}>
          Aa Bb Cc Retirement
        </div>
        <div style={{ fontFamily: "'Inclusive Sans', sans-serif", fontSize: 18, fontWeight: 400, color: "var(--site-text-dim)", marginBottom: 4 }}>
          abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
        <div style={{ fontFamily: "'Inclusive Sans', sans-serif", fontSize: 18, fontWeight: 400, color: "var(--site-text-dim)", marginBottom: 20 }}>
          0123456789 Il1 O0 — the letterforms this font was chosen to keep distinct
        </div>
        <table className="spec-table">
          <thead><tr><th>Weight</th><th>Sample</th><th>Used for</th></tr></thead>
          <tbody>
            <tr><td>300 Light</td><td style={{ fontFamily: "'Inclusive Sans', sans-serif", fontWeight: 300 }}>Retirement savings, simplified.</td><td>Lead paragraphs (Bootstrap <code>.lead</code>)</td></tr>
            <tr><td>400 Regular</td><td style={{ fontFamily: "'Inclusive Sans', sans-serif", fontWeight: 400 }}>Retirement savings, simplified.</td><td>Body text, placeholder, helper</td></tr>
            <tr><td>500 Medium</td><td style={{ fontFamily: "'Inclusive Sans', sans-serif", fontWeight: 500 }}>Retirement savings, simplified.</td><td>Captions, secondary labels</td></tr>
            <tr><td>600 Semibold</td><td style={{ fontFamily: "'Inclusive Sans', sans-serif", fontWeight: 600 }}>Retirement savings, simplified.</td><td>Headings H3–H6, labels, buttons, links</td></tr>
            <tr><td>700 Bold</td><td style={{ fontFamily: "'Inclusive Sans', sans-serif", fontWeight: 700 }}>Retirement savings, simplified.</td><td>Display, H1–H2, emphasis</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="site-section-title">Is Display (48px / 3rem) used on dashboards?</h2>
      <div className="site-panel">
        <p style={{ margin: 0, fontSize: 14, color: "var(--site-text-dim)", lineHeight: 1.7 }}>
          Yes, with a rule: <strong style={{ color: "var(--site-text)" }}>Display is reserved for a single hero KPI
          number per view</strong> (e.g. current balance on the dashboard landing card) — never for page headings,
          never repeated more than once per screen, and it drops to 32px on mobile so it never forces horizontal
          scroll on a 375px viewport. Everything else uses H1 (40px / 2.5rem desktop) or smaller — matching
          Bootstrap's heading scale.
        </p>
      </div>

      <h2 className="site-section-title">Type scale tokens (Bootstrap-aligned)</h2>
      <p className="site-section-sub">
        Full token table — sizes match Bootstrap 5 (<code>$h1-font-size</code>…<code>$h6-font-size</code>,{" "}
        <code>$lead-font-size</code>, <code>$font-size-base</code>, <code>$font-size-sm</code>). Values are also
        emitted as CSS custom properties (<code>--core-typography-h1-size</code>, etc.) and SCSS bridge variables.
      </p>
      <div className="site-panel site-panel--flush" style={{ overflowX: "auto" }}>
        <table className="spec-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Token</th>
              <th>Desktop</th>
              <th>Mobile</th>
              <th>Weight</th>
              <th>Line height</th>
              <th>Letter spacing</th>
              <th>Bootstrap</th>
              <th>Use for</th>
            </tr>
          </thead>
          <tbody>
            {order.map((key) => {
              const t = (typography as any)[key];
              const d = t.desktop;
              return (
                <tr key={key}>
                  <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{roleName[key]}</td>
                  <td><code style={{ whiteSpace: "nowrap" }}>typography.{key}</code></td>
                  <td><code>{remLabel(d.size)}</code></td>
                  <td><code>{remLabel(t.mobile.size)}</code></td>
                  <td><code>{d.weight}</code></td>
                  <td><code>{d.lineHeight}</code></td>
                  <td><code>{d.letterSpacing}</code></td>
                  <td style={{ color: "var(--site-text-dim)", fontSize: 12, whiteSpace: "nowrap" }}>{t.bootstrap}</td>
                  <td style={{ color: "var(--site-text-dim)", fontSize: 13 }}>{t.usage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="site-section-title">Scale — desktop vs. mobile</h2>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 110px", gap: 12, padding: "0 0 10px", borderBottom: "1px solid var(--core-color-border-default)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--core-color-text-tertiary)" }}>
          <div>Role</div><div>Desktop</div><div>Mobile</div><div>WCAG size class</div>
        </div>
        {order.map((key) => {
          const t = (typography as any)[key];
          const d = t.desktop, m = t.mobile;
          const large = isLargeText(px(d.size), d.weight);
          return (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 110px", gap: 12, alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--core-color-border-subtle)" }}>
              <div style={{ fontFamily: "var(--core-font-family-mono)", fontSize: 12, color: "var(--core-color-text-tertiary)" }}>{roleName[key]}</div>
              <div style={{ fontSize: d.size, fontWeight: d.weight, lineHeight: d.lineHeight, letterSpacing: d.letterSpacing, color: "var(--core-color-text-primary)", fontFamily: key === "numericData" ? "var(--core-font-family-mono)" : "var(--core-font-family-base)" }}>
                Aa 84,213
              </div>
              <div style={{ fontSize: m.size, fontWeight: m.weight, lineHeight: m.lineHeight, letterSpacing: m.letterSpacing, color: "var(--core-color-text-primary)", fontFamily: key === "numericData" ? "var(--core-font-family-mono)" : "var(--core-font-family-base)" }}>
                Aa 84,213
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: large ? "#4ADE9C" : "#E89A1C", color: "#0B0C10" }}>
                  {large ? "Large (3:1)" : "Normal (4.5:1)"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="site-section-title">ADA / WCAG notes on sizing</h2>
      <div className="site-panel">
        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
          <li>WCAG does not set a minimum font size, but body text below 14px is a usability risk — <strong style={{ color: "var(--site-text)" }}>Caption / Label Small (12px) must never carry required or safety-critical information</strong> on their own.</li>
          <li>Text ≥18px normal weight, or ≥14px at 700 weight, only needs 3:1 contrast (WCAG "large text"); everything smaller needs 4.5:1 — see the size-class column above.</li>
          <li>Line length for Body Medium/Large / Lead should stay under ~80 characters; enforced by container max-widths in patterns, not by the type tokens themselves.</li>
          <li>All roles scale via <code>rem</code>-equivalent tokens (Bootstrap convention: root 16px) so they respect the user's browser zoom/OS text-size setting.</li>
        </ul>
      </div>

      <h2 className="site-section-title">Token anatomy</h2>
      <table className="spec-table">
        <thead><tr><th>Property</th><th>Token / CSS var</th><th>Themeable</th></tr></thead>
        <tbody>
          <tr><td>Font family</td><td><code>font.family.base</code> → <code>--core-font-family-base</code></td><td>Yes — per client</td></tr>
          <tr><td>Role size</td><td><code>typography.[role].size</code> → <code>--core-typography-h1-size</code></td><td>No — CORE-owned</td></tr>
          <tr><td>Role weight</td><td><code>typography.[role].weight</code> → <code>--core-typography-h1-weight</code></td><td>No — CORE-owned</td></tr>
          <tr><td>Line height</td><td><code>typography.[role].lineHeight</code></td><td>No — CORE-owned</td></tr>
          <tr><td>Letter spacing</td><td><code>typography.[role].letterSpacing</code></td><td>No — CORE-owned</td></tr>
          <tr><td>Bootstrap bridge</td><td><code>$h1-font-size</code>…<code>$h6-font-size</code>, <code>$lead-font-size</code>, <code>$font-size-base</code></td><td>Via <code>core.tokens.scss</code></td></tr>
        </tbody>
      </table>
    </div>
  );
}
