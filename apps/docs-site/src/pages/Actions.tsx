import React from "react";
import { Preview } from "../Preview";
import { Anatomy, AnatomyLegend } from "../Anatomy";
import { Button, IconButton, Link } from "../../../../packages/core/src/components/Button";
import { ButtonMatrix } from "../ButtonMatrix";
import { DocsSection, DocsSectionList, StateLabel } from "../DocsSection";

export default function Actions({ embedded = false }: { embedded?: boolean }) {
  const sections = [
    {
      anchorId: "button",
      title: "Buttons",
      content: <ButtonMatrix />,
    },
    {
      anchorId: "icon-button",
      title: "Icon Button",
      content: (
        <div className="site-panel site-panel--flush">
          <Preview>
            <div style={{ display: "flex", gap: 32, alignItems: "flex-end", flexWrap: "wrap" }}>
              {/* DEFAULT */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <StateLabel variant="site">DEFAULT</StateLabel>
                <button
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "var(--theme-brand-text-primary-default)",
                    border: "1px solid var(--theme-brand-borders-primary-default)",
                  }}
                  aria-label="Edit"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                </button>
              </div>

              {/* HOVER */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <StateLabel variant="site">HOVER</StateLabel>
                <button
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundColor: "var(--theme-brand-background-hover)",
                    color: "var(--theme-brand-text-primary-oncolor)",
                    border: "1px solid var(--theme-brand-borders-hover)",
                  }}
                  aria-label="Edit Hover"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                </button>
              </div>

              {/* ACTIVE */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <StateLabel variant="site">ACTIVE</StateLabel>
                <button
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundColor: "var(--theme-brand-background-active)",
                    color: "var(--theme-brand-text-primary-oncolor)",
                    border: "1px solid var(--theme-brand-background-active)",
                    transform: "translateY(1px)",
                  }}
                  aria-label="Edit Active"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                </button>
              </div>

              {/* DISABLED */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <StateLabel variant="site">DISABLED</StateLabel>
                <button
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "not-allowed",
                    backgroundColor: "transparent",
                    color: "var(--theme-brand-text-primary-default)",
                    border: "1px solid var(--theme-brand-borders-primary-disabled)",
                  }}
                  disabled
                  aria-label="Edit Disabled"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                </button>
              </div>
            </div>
          </Preview>
        </div>
      ),
    },

    {
      anchorId: "link",
      title: "Link",
      content: (
        <div className="site-panel site-panel--flush">
            <Preview>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
                  {/* DEFAULT */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <StateLabel variant="site">DEFAULT</StateLabel>
                    <span style={{ fontSize: 14, color: "var(--core-color-text-primary)", lineHeight: 1.6 }}>
                      Read our{" "}
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        style={{
                          color: "var(--theme-brand-text-primary-default)",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          textDecorationThickness: "1px"
                        }}
                      >
                        documents
                      </Link>{" "}
                      before enrolling.
                    </span>
                  </div>

                  {/* HOVER */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <StateLabel variant="site">HOVER</StateLabel>
                    <span style={{ fontSize: 14, color: "var(--core-color-text-primary)", lineHeight: 1.6 }}>
                      Read our{" "}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="cds-link"
                        style={{
                          color: "var(--theme-brand-text-primary-hover)",
                          textDecoration: "underline",
                          textDecorationThickness: "1px",
                          textUnderlineOffset: "3px",
                        }}
                      >
                        documents
                      </a>{" "}
                      before enrolling.
                    </span>
                  </div>

                  {/* ACTIVE */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <StateLabel variant="site">ACTIVE</StateLabel>
                    <span style={{ fontSize: 14, color: "var(--core-color-text-primary)", lineHeight: 1.6 }}>
                      Read our{" "}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="cds-link"
                        style={{
                          color: "var(--theme-brand-text-primary-active)",
                          textDecoration: "underline",
                          textDecorationThickness: "1px",
                          textUnderlineOffset: "3px",
                        }}
                      >
                        documents
                      </a>{" "}
                      before enrolling.
                    </span>
                  </div>

                  {/* FOCUSED */}
                  <div className="force-focus" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <StateLabel variant="site">FOCUSED</StateLabel>
                    <span style={{ fontSize: 14, color: "var(--core-color-text-primary)", lineHeight: 1.6 }}>
                      Read our{" "}
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        style={{
                          color: "var(--theme-brand-text-primary-default)",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          textDecorationThickness: "1px",
                        }}
                      >
                        documents
                      </Link>{" "}
                      before enrolling.
                    </span>
                  </div>

                  {/* DISABLED */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <StateLabel variant="site">DISABLED</StateLabel>
                    <span style={{ fontSize: 14, color: "var(--core-color-text-primary)", lineHeight: 1.6 }}>
                      Read our{" "}
                      <Link
                        href="#"
                        disabled
                        onClick={(e) => e.preventDefault()}
                        style={{
                          color: "var(--theme-brand-text-primary-default)",
                          textDecoration: "underline",
                          textDecorationColor: "var(--theme-brand-borders-primary-disabled)",
                          cursor: "not-allowed",
                        }}
                      >
                        documents
                      </Link>{" "}
                      before enrolling.
                    </span>
                  </div>
                </div>
              </div>
            </Preview>
            <style>{`
              .force-focus .cds-link {
                outline: var(--core-focusRing-width) solid var(--theme-primitive-color-primary-400) !important;
                outline-offset: 2px !important;
                border-radius: 2px !important;
              }
            `}</style>
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
      {/* Centered Hero Header — matching Logo and Typography sections */}
      <div style={{ textAlign: "center", marginBottom: 60, marginTop: 40 }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            margin: "0 0 16px 0",
            color: "var(--core-color-text-primary)",
            lineHeight: 1.1,
          }}
        >
          Button
        </h1>
        <p
          style={{
            maxWidth: 580,
            margin: "0 auto",
            color: "var(--core-color-text-tertiary)",
            fontSize: 18,
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Primary, Secondary, Tertiary, Outlines, and Semantic hierarchy. Direct Color Palette SCSS tokens across all interactive states.
        </p>
      </div>

      {sectionList}
    </div>
  );
}
