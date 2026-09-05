import React from "react";
import primitives from "../../../../packages/tokens/src/primitives.json";

export default function RadiusElevation() {
  const radius = (primitives as any).radius as Record<string, string>;
  const elevation = (primitives as any).elevation as Record<string, string>;
  return (
    <div>
      <h1 className="site-h1">Radius &amp; Elevation</h1>
      <p className="site-lede">
        Client themes may shift the permitted radius range (LendGuard runs soft/rounded, Northbridge runs sharp),
        but the token names and elevation scale stay fixed.
      </p>

      <h2 className="site-section-title">Radius</h2>
      <div className="site-panel site-grid cols-4">
        {Object.entries(radius).map(([step, val]) => (
          <div key={step} style={{ textAlign: "center" }}>
            <div style={{ height: 70, background: "var(--site-accent-soft)", border: "1px solid var(--site-accent)", borderRadius: val === "9999px" ? "9999px" : val }} />
            <div style={{ marginTop: 8, fontSize: 12, fontFamily: "var(--site-mono)" }}>radius.{step} · {val}</div>
          </div>
        ))}
      </div>

      <h2 className="site-section-title">Elevation</h2>
      <div className="site-panel site-grid cols-4" style={{ background: "#1b1c26" }}>
        {Object.entries(elevation).filter(([k]) => k !== "0").map(([step, val]) => (
          <div key={step} style={{ textAlign: "center" }}>
            <div style={{ height: 70, background: "#F4F4F6", borderRadius: 10, boxShadow: val }} />
            <div style={{ marginTop: 8, fontSize: 12, fontFamily: "var(--site-mono)", color: "var(--site-text-dim)" }}>elevation.{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
