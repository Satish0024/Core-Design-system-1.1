import React from "react";
import { Preview, CodeBlock } from "../Preview";
import { Accordion, Separator, Skeleton } from "../../../../packages/core/src/components/Disclosure";
import { Collapsible } from "../../../../packages/core/src/components/Primitives";
import { Button } from "../../../../packages/core/src/components/Button";

export default function DisclosurePage() {
  return (
    <div>
      <h1 className="site-h1">Accordion, Collapsible, Separator &amp; Skeleton</h1>
      <p className="site-lede">Progressive disclosure and loading placeholders — used for FAQ-style content and long lists of optional details.</p>

      <h2 className="site-section-title" id="collapsible">Collapsible</h2>
      <p className="site-section-sub">The generic single-panel primitive Accordion is built on — use it directly for a one-off show/hide section.</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <Collapsible trigger={(open, toggle) => <Button variant="tertiary" size="sm" onClick={toggle}>{open ? "Hide" : "Show"} advanced options {open ? "▲" : "▼"}</Button>}>
            <div style={{ padding: "12px 0", fontSize: 14, color: "var(--core-color-text-secondary)" }}>
              Advanced contribution options: catch-up contributions, after-tax contributions, in-plan Roth conversions.
            </div>
          </Collapsible>
        </div>
      </div>

      <h2 className="site-section-title" id="accordion">Accordion</h2>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <div style={{ maxWidth: 480 }}>
            <Accordion
              defaultOpenIds={["vesting"]}
              items={[
                { id: "vesting", title: "What is vesting?", content: "Vesting is the schedule by which you gain full ownership of employer contributions to your account." },
                { id: "loans", title: "Can I take a loan against my balance?", content: "Yes, subject to your plan's rules — typically up to 50% of your vested balance." },
                { id: "rollover", title: "How do I roll over a previous 401(k)?", content: "Start a rollover from Accounts → Add Account → Rollover an existing plan." },
              ]}
            />
          </div>
        </div>
      </div>

      <h2 className="site-section-title" id="separator">Separator</h2>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", flexDirection: "column", alignItems: "stretch" }}>
          <span style={{ fontSize: 14, color: "var(--core-color-text-primary)" }}>Section above</span>
          <Separator />
          <span style={{ fontSize: 14, color: "var(--core-color-text-primary)" }}>Section below</span>
        </div>
      </div>

      <h2 className="site-section-title" id="skeleton">Skeleton (loading placeholder)</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 240 }}>
            <Skeleton height={14} width="60%" />
            <Skeleton height={28} width="90%" />
            <Skeleton height={14} width="40%" />
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title">Accessibility</h2>
      <ul style={{ color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
        <li>Accordion triggers are real <code>&lt;button&gt;</code>s with <code>aria-expanded</code> and <code>aria-controls</code>; panels are <code>role="region"</code> labeled by their trigger.</li>
        <li>Separator carries <code>role="separator"</code> so it's announced as structure, not skipped as decoration.</li>
        <li>Skeleton is <code>aria-hidden</code> — pair it with a visually-hidden "Loading…" live region if the wait is long.</li>
      </ul>

      <h2 className="site-section-title">Code</h2>
      <CodeBlock>{`<Accordion items={faqItems} defaultOpenIds={["vesting"]} allowMultiple />
<Separator />
<Skeleton height={28} width="90%" />`}</CodeBlock>
    </div>
  );
}
