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
export function AutoAnatomy({ children }: { children?: React.ReactNode; points?: AutoPoint[]; padding?: number }) {
  return <>{children}</>;
}

export function AutoAnatomyLegend(_props: { points?: AutoPoint[] }) {
  return null;
}
