import React from "react";

export default function LogoPage() {
  return (
    <div>
      <h1 className="site-h1">Logo</h1>
      <p className="site-lede">
        CORE's own mark identifies the design system itself — never the product. A client theme supplies its own
        logo (see Meridian below) for use inside the actual application chrome.
      </p>

      <h2 className="site-section-title">CORE mark</h2>
      <p className="site-section-sub">
        Two surface-matched variants — navy wordmark for light backgrounds, lavender for dark.
      </p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" style={{ background: "#0B0C10", gap: 40 }}>
          <div style={{ textAlign: "center" }}>
            <img src="/brand/core/core-logo-dark.svg" alt="CORE, dark-surface variant" height={64} />
            <div style={{ fontSize: 11, color: "#9A9AAC", marginTop: 8 }}>On dark</div>
          </div>
        </div>
        <div className="preview-surface" style={{ background: "#FFFFFF", gap: 40, borderTop: "1px solid var(--site-border)" }}>
          <div style={{ textAlign: "center" }}>
            <img src="/brand/core/core-logo-light.svg" alt="CORE, light-surface variant" height={64} />
            <div style={{ fontSize: 11, color: "#55566B", marginTop: 8 }}>On light</div>
          </div>
        </div>
      </div>

      <h2 className="site-section-title">Client logo — Meridian (dummy client)</h2>
      <p className="site-section-sub">
        A sample white-label client's own lockup — two versions for light and dark application surfaces, swapped
        automatically by the client theme's <code>meta.logo</code> / <code>meta.logoOnDark</code> fields.
      </p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" style={{ background: "#FFFFFF" }}>
          <img src="/brand/lendguard/logo-lockup-light.svg" alt="Meridian logo, light surface version" style={{ height: 36 }} />
        </div>
        <div className="preview-surface" style={{ background: "#0B0C10", borderTop: "1px solid var(--site-border)" }}>
          <img src="/brand/lendguard/logo-lockup-dark.svg" alt="Meridian logo, dark surface version" style={{ height: 36 }} />
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
