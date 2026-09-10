import React, { useState } from "react";
import { Preview } from "../Preview";
import { DocsSection, DocsSectionList } from "../DocsSection";
import {
  Accordion,
  Separator,
  Skeleton,
  Collapsible,
  type CollapsibleVariant,
} from "../../../../packages/core/src/components/Disclosure";
import { Badge } from "../../../../packages/core/src/components/Misc";

function CollapsibleVariantsDemo() {
  const [activeVariant, setActiveVariant] = useState<CollapsibleVariant>("card");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Variant Switcher Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "var(--site-bg-elevated, #FFFFFF)",
          border: "1px solid var(--site-border, rgba(128,128,128,0.18))",
          borderRadius: 12,
          padding: "12px 18px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
        }}
      >
        <span
          style={{
            fontSize: "var(--typography-font-size-xs)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--site-text-dim, #787887)",
          }}
        >
          Variant:
        </span>
        <div
          style={{
            display: "inline-flex",
            background: "var(--site-bg, rgba(128,128,128,0.08))",
            borderRadius: 8,
            padding: 3,
            border: "1px solid var(--site-border, rgba(128,128,128,0.15))",
          }}
        >
          {(["card", "button", "ghost"] as const).map((v) => {
            const labels = { card: "Card (Default)", button: "Button / Action", ghost: "Ghost / Inline" };
            return (
              <button
                key={v}
                type="button"
                onClick={() => setActiveVariant(v)}
                style={{
                  border: "none",
                  background: activeVariant === v ? "var(--theme-brand-background-primary-default)" : "transparent",
                  color: activeVariant === v ? "#FFFFFF" : "var(--site-text, inherit)",
                  borderRadius: 6,
                  padding: "5px 14px",
                  fontSize: "var(--typography-font-size-xs)",
                  fontWeight: 600,
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
            padding: "24px 28px",
            gap: 20,
          }}
        >
          {activeVariant === "card" && (
            <Collapsible
              variant="card"
              title="Catch-Up & Auxiliary Contribution Options"
              defaultOpen
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ margin: 0, fontSize: "var(--typography-body-md-size)", lineHeight: 1.6, color: "var(--core-color-text-secondary)" }}>
                  Participants age 50 or older at calendar year end may make catch-up contributions up to $7,500 beyond normal elective deferral limits.
                </p>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <Badge tone="primary" size="sm">Catch-Up Permitted</Badge>
                  <Badge tone="neutral" size="sm">Pre-tax &amp; Roth</Badge>
                </div>
              </div>
            </Collapsible>
          )}

          {activeVariant === "button" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 540 }}>
              <Collapsible
                variant="button"
                title="View Catch-Up Details"
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontWeight: 600, color: "var(--core-color-text-primary)", fontSize: "var(--typography-body-md-size)" }}>
                    Section 414(v) Provisions
                  </div>
                  <p style={{ margin: 0, fontSize: "var(--typography-body-md-size)", color: "var(--core-color-text-secondary)", lineHeight: 1.6 }}>
                    Elective catch-up deferrals are processed on each bi-weekly payroll cycle once base statutory limits ($23,000) are attained.
                  </p>
                </div>
              </Collapsible>
            </div>
          )}

          {activeVariant === "ghost" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 540 }}>
              <Collapsible
                variant="ghost"
                title="Plan sponsor disclaimer and tax disclosure"
              >
                <p style={{ margin: 0, fontSize: "var(--typography-body-md-size)", color: "var(--core-color-text-secondary)", lineHeight: 1.6 }}>
                  Investment values fluctuate daily with financial markets. Past performance does not guarantee future results. Consult a qualified tax advisor before requesting changes.
                </p>
              </Collapsible>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Variant Switcher Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "var(--site-bg-elevated, #FFFFFF)",
          border: "1px solid var(--site-border, rgba(128,128,128,0.18))",
          borderRadius: 12,
          padding: "12px 18px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
        }}
      >
        <span
          style={{
            fontSize: "var(--typography-font-size-xs)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--site-text-dim, #787887)",
          }}
        >
          Style:
        </span>
        <div
          style={{
            display: "inline-flex",
            background: "var(--site-bg, rgba(128,128,128,0.08))",
            borderRadius: 8,
            padding: 3,
            border: "1px solid var(--site-border, rgba(128,128,128,0.15))",
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
                  background: variant === v ? "var(--theme-brand-background-primary-default)" : "transparent",
                  color: variant === v ? "#FFFFFF" : "var(--site-text, inherit)",
                  borderRadius: 6,
                  padding: "5px 14px",
                  fontSize: "var(--typography-font-size-xs)",
                  fontWeight: 600,
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
            padding: "24px 28px",
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
      anchorId: "collapsible",
      title: "Collapsible",
      content: (
        <CollapsibleVariantsDemo />
      ),
    },
    {
      id: "02",
      anchorId: "accordion",
      title: "Accordion",
      content: (
        <AccordionVariantsDemo />
      ),
    },
    {
      id: "03",
      anchorId: "separator",
      title: "Separator",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="site-panel site-panel--flush">
            <div
              className="preview-surface"
              data-theme="core"
              data-mode="light"
              style={{
                background: "var(--core-color-bg-page)",
                flexDirection: "column",
                alignItems: "stretch",
                gap: 16,
                padding: "24px 28px",
              }}
            >
              <div
                style={{
                  background: "var(--core-color-surface-raised, #FFFFFF)",
                  border: "1px solid var(--core-color-border-default)",
                  borderRadius: 8,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: "var(--typography-body-md-size)", fontWeight: 600, color: "var(--core-color-text-primary)" }}>
                    Plan Overview
                  </div>
                  <div style={{ fontSize: "var(--typography-body-md-size)", color: "var(--core-color-text-secondary)", marginTop: 4 }}>
                    Primary account balance and portfolio asset allocations across equities and fixed income.
                  </div>
                </div>
                <Separator />
                <div>
                  <div style={{ fontSize: "var(--typography-body-md-size)", fontWeight: 600, color: "var(--core-color-text-primary)" }}>
                    Contribution History
                  </div>
                  <div style={{ fontSize: "var(--typography-body-md-size)", color: "var(--core-color-text-secondary)", marginTop: 4 }}>
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
      id: "04",
      anchorId: "skeleton",
      title: "Skeleton",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="site-panel site-panel--flush">
            <Preview>
              <div
                style={{
                  background: "var(--core-color-surface-raised, #FFFFFF)",
                  border: "1px solid var(--core-color-border-default)",
                  borderRadius: 8,
                  padding: 24,
                  width: 340,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Skeleton width={44} height={44} radius="50%" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                    <Skeleton height={14} width="70%" />
                    <Skeleton height={12} width="45%" />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Skeleton height={14} width="95%" />
                  <Skeleton height={14} width="85%" />
                  <Skeleton height={14} width="60%" />
                </div>
                <Skeleton height={36} width="100%" radius="6px" />
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
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: 60, marginTop: 40 }}>
        <h1 style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.06em", margin: "0 0 16px 0", color: "var(--core-color-text-primary)", lineHeight: 1.1 }}>Disclosure</h1>
        <p style={{ maxWidth: 580, margin: "0 auto", color: "var(--core-color-text-tertiary)", fontSize: "var(--core-font-size-lg, 20px)", lineHeight: 1.6, fontWeight: 400 }}>
          Progressive disclosure, collapsible views, accordions, separators, and loading skeleton placeholders.
        </p>
      </div>
      {sectionList}
    </div>
  );
}
