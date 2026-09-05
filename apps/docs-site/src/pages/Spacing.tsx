import React from "react";
import primitives from "../../../../packages/tokens/src/primitives.json";

export default function Spacing() {
  const space = (primitives as any).space as Record<string, string>;
  const controls = [
    { label: "Small", h: "32px" }, { label: "Medium", h: "40px" }, { label: "Large", h: "48px" },
  ];
  return (
    <div>
      <h1 className="site-h1">Spacing &amp; Sizing</h1>
      <p className="site-lede">
        A single 4px-based scale drives all layout spacing. No arbitrary values are permitted inside components.
      </p>

      <h2 className="site-section-title">Spacing scale</h2>
      <div className="site-panel">
        {Object.entries(space).filter(([k]) => k !== "0").map(([step, val]) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0", borderBottom: "1px solid var(--site-border)" }}>
            <div style={{ width: 60, fontFamily: "var(--site-mono)", fontSize: 12, color: "var(--site-text-faint)" }}>space.{step}</div>
            <div style={{ width: 50, fontFamily: "var(--site-mono)", fontSize: 12 }}>{val}</div>
            <div style={{ height: 10, width: val, background: "var(--site-accent)", borderRadius: 3 }} />
          </div>
        ))}
      </div>

      <h2 className="site-section-title">Control sizes</h2>
      <p className="site-section-sub">Applied consistently to inputs, buttons, and icon buttons across the system.</p>
      <div className="site-panel" style={{ display: "flex", gap: 24 }}>
        {controls.map((c) => (
          <div key={c.label} style={{ textAlign: "center" }}>
            <div style={{ height: c.h, width: 120, background: "var(--core-color-action-primary-bg, #6952E2)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 600 }}>
              {c.label}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--site-text-faint)", fontFamily: "var(--site-mono)" }}>{c.h}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
