// WCAG 2.x contrast ratio utilities.
function srgbToLin(c: number) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}

export function contrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

export type WcagLevel = "fail" | "aa-large" | "aa" | "aaa";

export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return "aaa";
  if (ratio >= 4.5) return "aa";
  if (ratio >= 3) return "aa-large";
  return "fail";
}

export function rgbStringToHex(rgb: string): string {
  const m = rgb.match(/\d+/g);
  if (!m) return "#000000";
  const [r, g, b] = m.map(Number);
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}

export function contrastAgainst(hex: string) {
  const onWhite = contrastRatio(hex, "#FFFFFF");
  const onBlack = contrastRatio(hex, "#000000");
  return {
    onWhite: { ratio: onWhite, level: wcagLevel(onWhite) },
    onBlack: { ratio: onBlack, level: wcagLevel(onBlack) },
  };
}
