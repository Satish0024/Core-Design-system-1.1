import React from "react";
import { Preview, CodeBlock } from "../Preview";
import { Alert } from "../../../../packages/core/src/components/Misc";
import { Toast, Spinner } from "../../../../packages/core/src/components/Overlays";

export default function Feedback() {
  return (
    <div>
      <h1 className="site-h1">Alert, Toast &amp; Loading</h1>
      <p className="site-lede">Inline, persistent feedback for page-level state; toasts for transient confirmation; spinners for in-progress work.</p>

      <h2 className="site-section-title">Alert (persistent, page-level)</h2>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <Alert tone="success" title="Enrollment complete">You're contributing 6% starting next pay cycle.</Alert>
          <Alert tone="warning" title="Beneficiary missing">Add a beneficiary to finish setting up your account.</Alert>
          <Alert tone="danger" title="Update failed">We couldn't save your contribution change. Try again.</Alert>
          <Alert tone="info" title="Scheduled maintenance">The portal will be unavailable Sunday 2–4am ET.</Alert>
        </div>
      </div>

      <h2 className="site-section-title">Toast (transient, corner notification)</h2>
      <p className="site-section-sub">Auto-dismisses after a few seconds. Same tone system as Alert, but for quick confirmations rather than page state.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <Toast tone="success" title="Changes saved">Your contribution rate was updated.</Toast>
          <Toast tone="danger" title="Couldn't connect">Check your internet connection and retry.</Toast>
        </div>
      </div>

      <h2 className="site-section-title">Loading</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Spinner />
          <span style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Saving your changes…</span>
        </Preview>
      </div>

      <h2 className="site-section-title">Accessibility</h2>
      <ul style={{ color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
        <li>Danger alerts use <code>role="alert"</code> (assertive live region); others use <code>role="status"</code> (polite).</li>
        <li>Color is never the only signal — each tone pairs with distinct copy and, in product, an icon.</li>
        <li>Spinner exposes <code>role="status"</code> with an <code>aria-label</code>; its animation duration extends under <code>prefers-reduced-motion</code> rather than looping fast and silent.</li>
      </ul>

      <h2 className="site-section-title">Code</h2>
      <CodeBlock>{`<Alert tone="danger" title="Update failed">We couldn't save your change. Try again.</Alert>
<Toast tone="success" title="Changes saved">Your contribution rate was updated.</Toast>
<Spinner label="Saving" />`}</CodeBlock>
    </div>
  );
}
