import React, { useLayoutEffect, useRef, useState } from "react";

export type Anchor =
  | "top" | "bottom" | "left" | "right" | "center"
  | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface AutoPoint {
  n: number;
  label: string;
  anchor: Anchor;
  /** Extra px pushed outward from the anchor, toward where the chip sits. Default 40. */
  offset?: number;
}

const CHIP = "#D8437A";

function anchorXY(anchor: Anchor, rect: { w: number; h: number }) {
  const { w, h } = rect;
  switch (anchor) {
    case "top": return { x: w / 2, y: 0 };
    case "bottom": return { x: w / 2, y: h };
    case "left": return { x: 0, y: h / 2 };
    case "right": return { x: w, y: h / 2 };
    case "top-left": return { x: 0, y: 0 };
    case "top-right": return { x: w, y: 0 };
    case "bottom-left": return { x: 0, y: h };
    case "bottom-right": return { x: w, y: h };
    default: return { x: w / 2, y: h / 2 };
  }
}

function chipXY(anchor: Anchor, rect: { w: number; h: number }, offset: number) {
  const { w, h } = rect;
  switch (anchor) {
    case "top": return { x: w / 2, y: -offset };
    case "bottom": return { x: w / 2, y: h + offset };
    case "left": return { x: -offset, y: h / 2 };
    case "right": return { x: w + offset, y: h / 2 };
    case "top-left": return { x: -offset * 0.7, y: -offset * 0.7 };
    case "top-right": return { x: w + offset * 0.7, y: -offset * 0.7 };
    case "bottom-left": return { x: -offset * 0.7, y: h + offset * 0.7 };
    case "bottom-right": return { x: w + offset * 0.7, y: h + offset * 0.7 };
    default: return { x: w / 2, y: -offset }; // "center" — leader points at the middle, chip sits above
  }
}

/**
 * Measures the real rendered size of `children` and auto-places numbered callout
 * markers + leader lines relative to its actual edges — no hand-computed pixel
 * coordinates per component. Use `anchor` to say *where on the component* a callout
 * points (e.g. "left" for height, "bottom" for padding, "center" for the label).
 */
export function AutoAnatomy({ children, points, padding = 56 }: { children: React.ReactNode; points: AutoPoint[]; padding?: number }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const measure = () => {
      const r = innerRef.current!.getBoundingClientRect();
      setRect({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block", padding }}>
      <div ref={innerRef} style={{ position: "relative", display: "inline-block" }}>
        {children}
      </div>
      {rect && points.map((p) => {
        const anchorPt = anchorXY(p.anchor, rect);
        const chipPt = chipXY(p.anchor, rect, p.offset ?? 40);
        return (
          <React.Fragment key={p.n}>
            <svg
              width={Math.abs(chipPt.x - anchorPt.x) + 4}
              height={Math.abs(chipPt.y - anchorPt.y) + 4}
              style={{
                position: "absolute", overflow: "visible", pointerEvents: "none",
                left: padding + Math.min(anchorPt.x, chipPt.x),
                top: padding + Math.min(anchorPt.y, chipPt.y),
              }}
            >
              <line
                x1={anchorPt.x - Math.min(anchorPt.x, chipPt.x)} y1={anchorPt.y - Math.min(anchorPt.y, chipPt.y)}
                x2={chipPt.x - Math.min(anchorPt.x, chipPt.x)} y2={chipPt.y - Math.min(anchorPt.y, chipPt.y)}
                stroke={CHIP} strokeWidth={1.5}
              />
              <circle cx={anchorPt.x - Math.min(anchorPt.x, chipPt.x)} cy={anchorPt.y - Math.min(anchorPt.y, chipPt.y)} r={3} fill={CHIP} />
            </svg>
            <span
              style={{
                position: "absolute", left: padding + chipPt.x - 12, top: padding + chipPt.y - 12,
                width: 24, height: 24, borderRadius: 6, background: CHIP, color: "white",
                fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
              }}
            >
              {String(p.n).padStart(2, "0")}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function AutoAnatomyLegend({ points }: { points: AutoPoint[] }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      {points.map((p) => (
        <li key={p.n} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--site-text-dim)" }}>
          <span style={{ width: 20, height: 20, borderRadius: 5, background: CHIP, color: "white", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {String(p.n).padStart(2, "0")}
          </span>
          <strong style={{ color: "var(--site-text)" }}>{p.label}</strong>
        </li>
      ))}
    </ul>
  );
}
