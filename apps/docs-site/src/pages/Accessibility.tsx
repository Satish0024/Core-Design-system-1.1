import React from "react";

const rows = [
  ["Keyboard navigation", "All interactive components operable via Tab/Shift+Tab, Enter, Space, and Arrow keys where applicable."],
  ["Focus visibility", "2px focus ring using :focus-visible, never removed or hidden."],
  ["Accessible names", "Every control has a programmatic label (native label, aria-label, or aria-labelledby)."],
  ["Semantic HTML", "Native elements first (button, input, table); ARIA only fills real gaps."],
  ["Color contrast", "Text and meaningful icons meet 4.5:1 (3:1 for large text) against their surface."],
  ["Touch targets", "Minimum 32px hit area, 40–48px for primary actions."],
  ["Screen reader behavior", "Status/error messaging uses live regions (role=status / role=alert)."],
  ["Reduced motion", "prefers-reduced-motion collapses non-essential transitions."],
];

export default function Accessibility() {
  return (
    <div>
      <h1 className="site-h1">Accessibility</h1>
      <p className="site-lede">Target: WCAG 2.2 AA. Accessibility is implemented inside each component, not layered on afterward.</p>
      <table className="spec-table">
        <thead><tr><th>Requirement</th><th>How CORE meets it</th></tr></thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a}><td style={{ whiteSpace: "nowrap", fontWeight: 600 }}>{a}</td><td style={{ color: "var(--site-text-dim)" }}>{b}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
