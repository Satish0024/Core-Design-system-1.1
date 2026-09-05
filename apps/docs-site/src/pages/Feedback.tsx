import React from "react";
import { Preview, CodeBlock } from "../Preview";
import { Alert } from "../../../../packages/core/src/components/Misc";
import { Toast, Spinner } from "../../../../packages/core/src/components/Overlays";
import { Empty } from "../../../../packages/core/src/components/Primitives";
import { Button } from "../../../../packages/core/src/components/Button";
import { ToastProvider, useToast } from "../../../../packages/core/src/components/ToastManager";
import { AutoAnatomy, AutoAnatomyLegend } from "../AutoAnatomy";

function ToastManagerDemo() {
  const { push } = useToast();
  return (
    <Preview>
      <Button onClick={() => push({ tone: "success", title: "Changes saved", description: "Auto-dismisses in 4s." })}>Trigger success toast</Button>
      <Button variant="destructive" onClick={() => push({ tone: "danger", title: "Couldn't connect", description: "Retry in a moment." })}>Trigger error toast</Button>
    </Preview>
  );
}

export default function Feedback() {
  return (
    <div>
      <h1 className="site-h1">Alert, Toast &amp; Loading</h1>
      <p className="site-lede">Inline, persistent feedback for page-level state; toasts for transient confirmation; spinners for in-progress work.</p>

      <h2 className="site-section-title" id="alert">Alert (persistent, page-level)</h2>
      <p className="site-section-sub">Anatomy — tone icon, title, body; color is never the only signal.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Tone icon — distinct shape per tone, not color alone", anchor: "left" },
          { n: 2, label: "Title — 14px/600, body 14px/400 below", anchor: "top" },
          { n: 3, label: "Left accent bar — 4px, tone color", anchor: "bottom-left" },
        ]}>
          <div style={{ width: 340 }}>
            <Alert tone="warning" title="Beneficiary missing">Add a beneficiary to finish setting up your account.</Alert>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Tone icon: distinct shape per tone (check/warning/x/info) — never color alone", anchor: "left" },
          { n: 2, label: "Title 14px/600 semibold, body 14px/400 regular below it", anchor: "top" },
          { n: 3, label: "Left accent bar: 4px wide, tone color, radius matches container", anchor: "bottom-left" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <Alert tone="success" title="Enrollment complete">You're contributing 6% starting next pay cycle.</Alert>
          <Alert tone="warning" title="Beneficiary missing">Add a beneficiary to finish setting up your account.</Alert>
          <Alert tone="danger" title="Update failed">We couldn't save your contribution change. Try again.</Alert>
          <Alert tone="info" title="Scheduled maintenance">The portal will be unavailable Sunday 2–4am ET.</Alert>
        </div>
      </div>

      <h2 className="site-section-title" id="toast">Toast (transient, corner notification)</h2>
      <p className="site-section-sub">Anatomy — auto-dismisses after a few seconds. Same tone system as Alert, but for quick confirmations rather than page state.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Elevation — shadow.lg, floats above page content", anchor: "bottom" },
          { n: 2, label: "Max width — 360px, wraps long body text", anchor: "right" },
        ]}>
          <Toast tone="success" title="Changes saved">Your contribution rate was updated.</Toast>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Elevation: shadow.lg — floats above page content, corner-anchored", anchor: "bottom" },
          { n: 2, label: "Max width: 360px, body text wraps rather than truncating", anchor: "right" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <Toast tone="success" title="Changes saved">Your contribution rate was updated.</Toast>
          <Toast tone="danger" title="Couldn't connect">Check your internet connection and retry.</Toast>
        </div>
      </div>

      <h2 className="site-section-title" id="toast-manager">Toast manager (stacking + auto-dismiss)</h2>
      <p className="site-section-sub">Wrap the app once in <code>&lt;ToastProvider&gt;</code>, then call <code>useToast().push(...)</code> anywhere — toasts stack bottom-right and auto-dismiss.</p>
      <div className="site-panel site-panel--flush">
        <ToastProvider>
          <ToastManagerDemo />
        </ToastProvider>
      </div>

      <h2 className="site-section-title" id="empty">Empty state</h2>
      <p className="site-section-sub">Anatomy — illustration/icon, title, description, and an optional recovery action.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Title — 16px/600, centered", anchor: "top" },
          { n: 2, label: "Action — optional, secondary button, not primary", anchor: "bottom" },
        ]}>
          <Empty title="No transactions yet" description="Once you make your first contribution, it will show up here." action={<Button variant="secondary" size="sm">Learn how contributions work</Button>} />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Title: 16px/600, centered above the description", anchor: "top" },
          { n: 2, label: "Action: optional, always Secondary variant — never competes with page's Primary CTA", anchor: "bottom" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)" }}>
          <Empty
            title="No transactions yet"
            description="Once you make your first contribution, it will show up here."
            action={<Button variant="secondary" size="sm">Learn how contributions work</Button>}
          />
        </div>
      </div>

      <h2 className="site-section-title" id="spinner">Loading</h2>
      <p className="site-section-sub">Anatomy — indeterminate rotation, pairs with a text label rather than standing alone.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Size — 16/20/24px matching icon-size scale", anchor: "top" },
          { n: 2, label: "Stroke — 2px, brand color, indeterminate rotation", anchor: "bottom" },
        ]}>
          <Spinner />
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Size: 16/20/24px, matches the icon-size token scale", anchor: "top" },
          { n: 2, label: "Stroke: 2px, brand color, continuous rotation extended under reduced-motion", anchor: "bottom" },
        ]} />
      </div>
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
