import React from "react";
import { Preview, CodeBlock } from "../Preview";
import { Anatomy, AnatomyLegend } from "../Anatomy";
import { Button, IconButton, Link } from "../../../../packages/core/src/components/Button";
import { ButtonGroup } from "../../../../packages/core/src/components/Primitives";
import { ButtonMatrix } from "../ButtonMatrix";

export default function Actions() {
  const sections = [
    {
      id: "01",
      anchorId: "button",
      title: "Matrix & States",
      description:
        "Complete component matrix showcasing each variant across all interactive states (Default, Hover, Active, Focused, Disabled) directly wired to the Color Palette SCSS.",
      content: <ButtonMatrix />,
    },
    {
      id: "02",
      anchorId: "icon-button",
      title: "Sizes & Geometry",
      description:
        "Standard 8-pt control heights (32px, 40px, 48px) with 6px corner radius and minimum touch targets.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <table className="spec-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Small</th>
                <th>Medium (default)</th>
                <th>Large</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Height</td>
                <td>32px</td>
                <td>40px</td>
                <td>48px</td>
              </tr>
              <tr>
                <td>Horizontal padding</td>
                <td>12px</td>
                <td>16px</td>
                <td>20px</td>
              </tr>
              <tr>
                <td>Font size</td>
                <td>14px</td>
                <td>16px</td>
                <td>18px</td>
              </tr>
              <tr>
                <td>Minimum touch target</td>
                <td>32×32px</td>
                <td>40×40px</td>
                <td>48×48px</td>
              </tr>
            </tbody>
          </table>

        </div>
      ),
    },
    {
      id: "03",
      anchorId: "icon-button",
      title: "Icon Button",
      description:
        "Square and circular icon actions with required accessible names. Edit action shown across interactive states.",
      content: (
        <div className="site-panel site-panel--flush">
          <Preview>
            <div style={{ display: "flex", gap: 32, alignItems: "flex-end", flexWrap: "wrap" }}>
              {/* DEFAULT */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "var(--site-text-dim)" }}>DEFAULT</span>
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
                    color: "var(--theme-brand-text-primary-default, #1F4F8D)",
                    border: "1px solid var(--theme-brand-border-primary-default, #3275CD)",
                  }}
                  aria-label="Edit"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                </button>
              </div>

              {/* HOVER */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "var(--site-text-dim)" }}>HOVER</span>
                <button
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundColor: "var(--theme-brand-background-hover, #1B4479)",
                    color: "var(--theme-brand-text-primary-oncolor, #FFFFFF)",
                    border: "1px solid var(--theme-brand-border-hover, #1B4479)",
                  }}
                  aria-label="Edit Hover"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                </button>
              </div>

              {/* ACTIVE */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "var(--site-text-dim)" }}>ACTIVE</span>
                <button
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundColor: "var(--theme-brand-background-active, #17365E)",
                    color: "var(--theme-brand-text-primary-oncolor, #FFFFFF)",
                    border: "1px solid var(--theme-brand-border-active, #17365E)",
                    transform: "translateY(1px)",
                  }}
                  aria-label="Edit Active"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                </button>
              </div>

              {/* DISABLED */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "var(--site-text-dim)" }}>DISABLED</span>
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
                    color: "var(--theme-brand-text-primary-disabled, #86ADDF)",
                    border: "1px solid var(--theme-brand-border-primary-disabled, #BACEE9)",
                    opacity: 0.6,
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
      id: "05",
      anchorId: "button-group",
      title: "Button Group & Link",
      description:
        "Segmented controls that merge borders into one cohesive control, and inline text links distinct from standalone buttons.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="site-panel site-panel--flush">
            <Preview>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <div style={{ display: "flex", width: 400 }}>
                  <span style={{ flex: 1, textAlign: "center", fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.04em", color: "var(--site-text-dim)" }}>DEFAULT</span>
                  <span style={{ flex: 1, textAlign: "center", fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.04em", color: "var(--site-text-dim)" }}>HOVER</span>
                  <span style={{ flex: 1, textAlign: "center", fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.04em", color: "var(--site-text-dim)" }}>ACTIVE</span>
                  <span style={{ flex: 1, textAlign: "center", fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.04em", color: "var(--site-text-dim)" }}>FOCUSED</span>
                  <span style={{ flex: 1, textAlign: "center", fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.04em", color: "var(--site-text-dim)" }}>DISABLED</span>
                </div>
                <ButtonGroup>
                  {/* DEFAULT */}
                  <button className="cds-btn cds-btn--sm" style={{ width: 80, backgroundColor: "transparent", color: "var(--theme-brand-text-primary-default, #1F4F8D)", border: "1px solid var(--theme-brand-border-primary-default, #3275CD)", cursor: "pointer" }}>Day</button>
                  {/* HOVER (tinted hover background with blue text) */}
                  <button className="cds-btn cds-btn--sm" style={{ width: 80, backgroundColor: "rgba(31, 79, 141, 0.08)", color: "var(--theme-brand-text-primary-default, #1F4F8D)", border: "1px solid var(--theme-brand-border-hover, #1B4479)", cursor: "pointer" }}>Week</button>
                  {/* ACTIVE (solid filled brand state with white text) */}
                  <button className="cds-btn cds-btn--sm" style={{ width: 80, backgroundColor: "var(--theme-brand-background-primary-default, #1F4F8D)", color: "var(--theme-brand-text-primary-oncolor, #FFFFFF)", border: "1px solid var(--theme-brand-background-primary-default, #1F4F8D)", fontWeight: 600, cursor: "pointer", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.18)" }}>Month</button>
                  {/* FOCUSED */}
                  <button className="cds-btn cds-btn--sm" style={{ width: 80, backgroundColor: "transparent", color: "var(--theme-brand-text-primary-default, #1F4F8D)", border: "1px solid var(--theme-brand-border-primary-default, #3275CD)", outline: "2px solid var(--theme-brand-border-primary-default, #3275CD)", outlineOffset: "1px", zIndex: 1, cursor: "pointer" }}>Year</button>
                  {/* DISABLED */}
                  <button className="cds-btn cds-btn--sm" disabled style={{ width: 80, backgroundColor: "transparent", color: "var(--theme-brand-text-primary-disabled, #86ADDF)", border: "1px solid var(--theme-brand-border-primary-disabled, #BACEE9)", opacity: 0.5, cursor: "not-allowed" }}>All</button>
                </ButtonGroup>
              </div>
            </Preview>
          </div>

          <div className="site-panel site-panel--flush">
            <Preview>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
                  {/* DEFAULT */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "var(--site-text-dim)" }}>DEFAULT</span>
                    <span style={{ fontSize: 14, color: "var(--core-color-text-primary)", lineHeight: 1.6 }}>
                      Read our{" "}
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        style={{
                          color: "var(--theme-brand-text-primary-default, #1F4F8D)",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          textDecorationThickness: "1px"
                        }}
                      >
                        plan disclosure documents
                      </Link>{" "}
                      before enrolling.
                    </span>
                  </div>

                  {/* HOVER */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "var(--site-text-dim)" }}>HOVER</span>
                    <span style={{ fontSize: 14, color: "var(--core-color-text-primary)", lineHeight: 1.6 }}>
                      Read our{" "}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="cds-link"
                        style={{
                          color: "var(--theme-brand-background-hover, #0D3B73)",
                          textDecoration: "underline",
                          textDecorationThickness: "2px",
                          textUnderlineOffset: "4px",
                          fontWeight: 600,
                        }}
                      >
                        plan disclosure documents
                      </a>{" "}
                      before enrolling.
                    </span>
                  </div>

                  {/* ACTIVE */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "var(--site-text-dim)" }}>ACTIVE</span>
                    <span style={{ fontSize: 14, color: "var(--core-color-text-primary)", lineHeight: 1.6 }}>
                      Read our{" "}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="cds-link"
                        style={{
                          color: "var(--theme-brand-background-active, #0A2548)",
                          textDecoration: "underline",
                          textDecorationThickness: "2.5px",
                          textUnderlineOffset: "2px",
                          fontWeight: 700,
                        }}
                      >
                        plan disclosure documents
                      </a>{" "}
                      before enrolling.
                    </span>
                  </div>

                  {/* DISABLED */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "var(--site-text-dim)" }}>DISABLED</span>
                    <span style={{ fontSize: 14, color: "var(--core-color-text-primary)", lineHeight: 1.6 }}>
                      Read our{" "}
                      <Link
                        href="#"
                        disabled
                        onClick={(e) => e.preventDefault()}
                        style={{
                          color: "var(--theme-brand-text-primary-disabled, #86ADDF)",
                          textDecoration: "underline",
                          textDecorationColor: "var(--theme-brand-border-primary-disabled, #BACEE9)",
                          opacity: 0.5,
                          cursor: "not-allowed",
                        }}
                      >
                        plan disclosure documents
                      </Link>{" "}
                      before enrolling.
                    </span>
                  </div>
                </div>
              </div>
            </Preview>
          </div>
        </div>
      ),
    },

  ];

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: "20px" }}>
      {/* Centered Hero Header — matching Logo and Typography sections */}
      <div style={{ textAlign: "center", marginBottom: 60, marginTop: 40 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--core-color-brand-600)",
            marginBottom: 12,
          }}
        >
          Components
        </div>
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

      {/* Numbered Sections List — matching Logo and Typography sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
        {sections.map((s) => (
          <div key={s.id} id={s.anchorId} style={{ display: "flex", flexDirection: "column", gap: 32, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-12.5%",
                width: "125%",
                height: 1,
                backgroundColor: "var(--site-border)",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                paddingTop: 32,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--core-color-text-tertiary)",
                    marginBottom: 12,
                  }}
                >
                  {s.id}
                </div>
                <h2 style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
                  {s.title}
                </h2>
              </div>
              <div
                style={{
                  maxWidth: 420,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-end",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--core-color-text-secondary)",
                    textAlign: "right",
                    fontWeight: 400,
                  }}
                >
                  {s.description}
                </p>
              </div>
            </div>
            <div>{s.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
