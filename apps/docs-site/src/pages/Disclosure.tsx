import React, { useState } from "react";
import { Preview } from "../Preview";
import { DocsSection, DocsSectionList } from "../DocsSection";
import {
  Accordion,
  Separator,
  Skeleton,
} from "../../../../packages/core/src/components/Disclosure";

function AccordionVariantsDemo() {
  const [variant, setVariant] = useState<"bordered" | "separated" | "flush">("bordered");

  const faqItems = [
    {
      id: "vesting",
      title: "What is vesting?",
      content: "Vesting is the schedule by which you gain full ownership of employer contributions to your account over a 3-year cliff or graded period.",
    },
    {
      id: "loans",
      title: "Can I take a loan against my balance?",
      content: "Yes, subject to your plan rules — typically up to 50% of your vested balance, up to a statutory maximum of $50,000.",
    },
    {
      id: "rollover",
      title: "How do I roll over a previous 401(k)?",
      content: "Initiate a direct rollover under Accounts → Add Account → Rollover to maintain tax-deferred compounding without withholding.",
    },
    {
      id: "locked",
      title: "Plan-specific executive deferrals (not eligible)",
      content: "",
      disabled: true,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-4)" }}>
      {/* Variant Switcher Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--core-space-3)",
          background: "var(--site-bg-elevated)",
          border: "1px solid var(--site-border)",
          borderRadius: "var(--core-radius-lg)",
          padding: "var(--core-space-3) var(--core-space-5)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
        }}
      >
        <span
          style={{
            fontSize: "var(--typography-font-size-xs)",
            fontWeight: "var(--typography-font-weight-bold)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--site-text-dim)",
          }}
        >
          Style:
        </span>
        <div
          style={{
            display: "inline-flex",
            background: "var(--site-bg, rgba(128,128,128,0.08))",
            borderRadius: "var(--core-radius-sm)",
            padding: "var(--core-space-1)",
            border: "1px solid var(--site-border)",
          }}
        >
          {(["bordered", "separated", "flush"] as const).map((v) => {
            const labels = { bordered: "Bordered (Default)", separated: "Separated (Card)", flush: "Flush (Minimal)" };
            return (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                style={{
                  border: "none",
                  background: variant === v ? "var(--theme-brand-background-primary-strong)" : "transparent",
                  color: variant === v ? "var(--brand-text-primary-oncolor)" : "var(--site-text)",
                  borderRadius: "var(--core-radius-sm)",
                  padding: "var(--core-space-1) var(--core-space-4)",
                  fontSize: "var(--typography-font-size-xs)",
                  fontWeight: "var(--typography-font-weight-semibold)",
                  cursor: "pointer",
                  transition: "all 120ms ease",
                }}
              >
                {labels[v]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Surface */}
      <div className="site-panel site-panel--flush">
        <div
          className="preview-surface"
          data-theme="core"
          data-mode="light"
          style={{
            background: "var(--core-color-bg-page)",
            flexDirection: "column",
            alignItems: "stretch",
            padding: "var(--core-space-6) var(--core-space-8)",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
            <Accordion
              variant={variant}
              defaultOpenIds={["vesting"]}
              items={faqItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DisclosurePage({ embedded = false }: { embedded?: boolean }) {
  const sections = [
    {
      id: "01",
      anchorId: "accordion",
      title: "Accordion",
      content: (
        <AccordionVariantsDemo />
      ),
    },
    {
      id: "02",
      anchorId: "separator",
      title: "Separator",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-5)" }}>
          <div className="site-panel site-panel--flush">
            <div
              className="preview-surface"
              data-theme="core"
              data-mode="light"
              style={{
                background: "var(--core-color-bg-page)",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "var(--core-space-4)",
                padding: "var(--core-space-6) var(--core-space-8)",
              }}
            >
              <div
                style={{
                  background: "var(--core-color-surface-raised)",
                  border: "1px solid var(--core-color-border-default)",
                  borderRadius: "var(--core-radius-sm)",
                  padding: "var(--core-space-5)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--core-space-3)",
                }}
              >
                <div>
                  <div style={{ fontSize: "var(--typography-body-md-size)", fontWeight: "var(--typography-font-weight-semibold)", color: "var(--core-color-text-primary)" }}>
                    Plan Overview
                  </div>
                  <div style={{ fontSize: "var(--typography-body-md-size)", color: "var(--core-color-text-secondary)", marginTop: "var(--core-space-1)" }}>
                    Primary account balance and portfolio asset allocations across equities and fixed income.
                  </div>
                </div>
                <Separator />
                <div>
                  <div style={{ fontSize: "var(--typography-body-md-size)", fontWeight: "var(--typography-font-weight-semibold)", color: "var(--core-color-text-primary)" }}>
                    Contribution History
                  </div>
                  <div style={{ fontSize: "var(--typography-body-md-size)", color: "var(--core-color-text-secondary)", marginTop: "var(--core-space-1)" }}>
                    Recent bi-weekly payroll deferrals and employer matching contributions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "03",
      anchorId: "skeleton",
      title: "Skeleton",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-5)" }}>
          <div className="site-panel site-panel--flush">
            <Preview>
              <div
                style={{
                  background: "var(--core-color-surface-raised)",
                  border: "1px solid var(--core-color-border-default)",
                  borderRadius: "var(--core-radius-sm)",
                  padding: "var(--core-space-6)",
                  width: 340,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--core-space-4)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--core-space-4)" }}>
                  <Skeleton width={44} height={44} radius="50%" />
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-2)", flex: 1 }}>
                    <Skeleton height={14} width="70%" />
                    <Skeleton height={12} width="45%" />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-2)" }}>
                  <Skeleton height={14} width="95%" />
                  <Skeleton height={14} width="85%" />
                  <Skeleton height={14} width="60%" />
                </div>
                <Skeleton height={36} width="100%" radius="var(--core-radius-sm)" />
              </div>
            </Preview>
          </div>
        </div>
      ),
    },
  ];

  const sectionList = (
    <DocsSectionList>
      {sections.map((s) => (
        <DocsSection key={s.anchorId} anchorId={s.anchorId} title={s.title}>
          {s.content}
        </DocsSection>
      ))}
    </DocsSectionList>
  );

  if (embedded) return sectionList;

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: "var(--core-space-5)" }}>
      <div style={{ textAlign: "center", marginBottom: "var(--core-space-16)", marginTop: "var(--core-space-10)" }}>
        <h1 style={{ fontSize: 72 /* no token above 48px */, fontWeight: "var(--typography-font-weight-bold)", letterSpacing: "-0.06em", margin: "0 0 var(--core-space-4) 0", color: "var(--core-color-text-primary)", lineHeight: 1.1 }}>Disclosure</h1>
        <p style={{ maxWidth: 580, margin: "0 auto", color: "var(--core-color-text-tertiary)", fontSize: "var(--core-font-size-lg)", lineHeight: 1.6, fontWeight: 400 }}>
          Progressive disclosure with accordions, separators, and loading skeleton placeholders.
        </p>
      </div>
      {sectionList}
    </div>
  );
}
