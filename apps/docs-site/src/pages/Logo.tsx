import React from "react";
import { CoreLogo } from "../CoreLogo";

export default function LogoPage() {
  return (
    <div>
      <h1 className="site-h1">Logo</h1>
      <p className="site-lede">
        CORE's own mark identifies the design system itself — never the product. A client theme supplies its own
        logo (see LendGuard below) for use inside the actual application chrome.
      </p>

      <h2 className="site-section-title">CORE mark</h2>
      <p className="site-section-sub">Three overlapping tiles in the brand purple ramp — a deliberately simple, original mark (not derived from any client or reference asset), suggesting layered foundations: tokens → components → themes.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" style={{ background: "#0B0C10", gap: 40 }}>
          <div style={{ textAlign: "center" }}>
            <CoreLogo size={64} />
            <div style={{ fontSize: 11, color: "#9A9AAC", marginTop: 8 }}>On dark</div>
          </div>
        </div>
        <div className="preview-surface" style={{ background: "#FFFFFF", gap: 40, borderTop: "1px solid var(--site-border)" }}>
          <div style={{ textAlign: "center" }}>
            <CoreLogo size={64} />
            <div style={{ fontSize: 11, color: "#55566B", marginTop: 8 }}>On light</div>
          </div>
        </div>
      </div>

      <h2 className="site-section-title">Client logo — LendGuard (real, from the LendGuard app)</h2>
      <p className="site-section-sub">
        Sourced directly from LendGuard's own codebase (color and logo only, as instructed) — two lockups for
        light and dark application surfaces, swapped automatically by the client theme's <code>meta.logo</code> /
        <code>meta.logoOnDark</code> fields.
      </p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" style={{ background: "#FFFFFF" }}>
          <img src="/brand/lendguard/logo-lockup-light.svg" alt="LendGuard logo, light surface version" style={{ height: 36 }} />
        </div>
        <div className="preview-surface" style={{ background: "#0B0C10", borderTop: "1px solid var(--site-border)" }}>
          <img src="/brand/lendguard/logo-lockup-dark.svg" alt="LendGuard logo, dark surface version" style={{ height: 36 }} />
        </div>
      </div>

      <h2 className="site-section-title">Usage rules</h2>
      <ul style={{ color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
        <li>The CORE mark appears only on this documentation site — never inside a themed client application.</li>
        <li>Each client theme owns exactly two logo assets: a light-surface and a dark-surface lockup, referenced from theme <code>meta</code>, never hardcoded into a component.</li>
        <li>Minimum clear space around any logo: one logo-height on all sides.</li>
        <li>Never recolor, stretch, or rotate a client's logo — request an alternate lockup from the client instead.</li>
      </ul>
    </div>
  );
}
