import React from "react";
import { Button } from "../../../../packages/core/src/components/Button";
import { Card, Badge } from "../../../../packages/core/src/components/Misc";
import { Field, Input } from "../../../../packages/core/src/components/Field";

const themes = [
  { id: "core", label: "CORE", note: "Reference theme — default brand, default radius, comfortable density.", logo: null },
  {
    id: "meridian",
    label: "Meridian",
    note: "Dummy client — its own brand blue, logo, and comfortable-but-softer radius scale, entirely independent of CORE's own default styling.",
    logo: "/brand/lendguard/logo-lockup-light.svg",
  },
  { id: "clientb", label: "Northbridge", note: "Dummy client — blue brand, sharp radius, IBM Plex typeface, compact density.", logo: null },
];

export default function Themes() {
  return (
    <div>
      <h1 className="site-h1">Themes</h1>
      <p className="site-lede">
        The same component code renders three brands below purely by switching a <code>data-theme</code> attribute
        at the application shell — no component forks, no duplicated logic.
      </p>

      {themes.map((t) => (
        <div key={t.id} style={{ marginBottom: 36 }}>
          <h2 className="site-section-title" style={{ margin: "0 0 4px" }}>{t.label}</h2>
          <p className="site-section-sub">{t.note}</p>
          <div className="site-panel site-panel--flush">
            <div className="preview-surface" data-theme={t.id} data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
              {t.logo && <img src={t.logo} alt={`${t.label} logo`} style={{ height: 28, marginRight: 8 }} />}
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary</Button>
              <Badge tone="success">Active</Badge>
              <Badge tone="info">Pending</Badge>
              <Card style={{ minWidth: 200 }}>
                <div style={{ fontSize: 13, color: "var(--core-color-text-secondary)" }}>Balance</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>$84,213</div>
              </Card>
              <Field label="Search">{(p) => <Input {...p} placeholder="Type to search" style={{ width: 180 }} />}</Field>
            </div>
          </div>
        </div>
      ))}

      <h2 className="site-section-title">What a theme may change</h2>
      <table className="spec-table">
        <thead><tr><th>Customizable</th><th>Owned by CORE</th></tr></thead>
        <tbody>
          <tr><td>Logo, brand colors, accent</td><td>Component anatomy &amp; behavior</td></tr>
          <tr><td>Font family</td><td>Accessibility &amp; interaction states</td></tr>
          <tr><td>Radius range, density</td><td>Spacing system, breakpoints</td></tr>
        </tbody>
      </table>
    </div>
  );
}
