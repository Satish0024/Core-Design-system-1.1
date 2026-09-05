import React from "react";

export interface AnatomyPoint {
  n: number;
  label: string;
  /** Position of the numbered marker, in px, relative to the anatomy stage. */
  x: number;
  y: number;
  /** Direction the connecting line/leader travels from the marker. */
  leaderTo: { x: number; y: number };
}

/**
 * A numbered-callout diagram overlay — the reusable template for "Anatomy" sections
 * on every component page. Renders `children` (the real component) inside a stage,
 * then draws numbered markers + leader lines + a legend, matching the reference
 * annotation style (numbered chip, thin line, label).
 */
export function Anatomy({ children, points, height = 160 }: { children: React.ReactNode; points: AnatomyPoint[]; height?: number }) {
  return (
    <div style={{ position: "relative", height, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {points.map((p) => (
        <svg key={p.n} width="1" height="1" style={{ position: "absolute", overflow: "visible", left: p.x, top: p.y, pointerEvents: "none" }}>
          <line x1={0} y1={0} x2={p.leaderTo.x - p.x} y2={p.leaderTo.y - p.y} stroke="#D8437A" strokeWidth={1.5} />
          <circle cx={p.leaderTo.x - p.x} cy={p.leaderTo.y - p.y} r={3} fill="#D8437A" />
        </svg>
      ))}
      <div style={{ position: "relative" }}>{children}</div>
      {points.map((p) => (
        <span
          key={`chip-${p.n}`}
          style={{
            position: "absolute", left: p.x - 12, top: p.y - 12, width: 24, height: 24, borderRadius: 6,
            background: "#D8437A", color: "white", fontSize: 11, fontWeight: 700, display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 2,
          }}
        >
          {String(p.n).padStart(2, "0")}
        </span>
      ))}
    </div>
  );
}

export function AnatomyLegend({ points }: { points: AnatomyPoint[] }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      {points.map((p) => (
        <li key={p.n} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--site-text-dim)" }}>
          <span style={{ width: 20, height: 20, borderRadius: 5, background: "#D8437A", color: "white", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {String(p.n).padStart(2, "0")}
          </span>
          <strong style={{ color: "var(--site-text)" }}>{p.label}</strong>
        </li>
      ))}
    </ul>
  );
}
