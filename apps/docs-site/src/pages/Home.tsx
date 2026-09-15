import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { componentLinks } from "../navConfig";

const sections = [
  {
    id: "01",
    anchorId: "whats-in-this-site",
    title: "What's in this site",
    content: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--core-space-4)" }}>
        {[
          {
            label: "Foundation",
            desc: "Visual language — brand logo, color tokens, and typography that every product inherits.",
            to: "/foundations/color",
            cta: "Start with Color",
          },
          {
            label: "Components",
            desc: "Ready-made UI for forms, actions, navigation, feedback, and data-heavy participant screens.",
            to: "/components",
            cta: "Browse Components",
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              borderRadius: "var(--core-radius-lg)",
              border: "1px solid var(--site-border)",
              background: "var(--core-color-surface-default)",
              padding: "var(--core-space-6) var(--core-space-8)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--core-space-3)",
            }}
          >
            <div
              style={{
                fontSize: "var(--core-font-size-xs)",
                fontWeight: "var(--typography-font-weight-bold)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--core-color-brand-600)",
              }}
            >
              {item.label}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "var(--typography-body-md-size)",
                lineHeight: 1.6,
                color: "var(--core-color-text-secondary)",
                flex: 1,
              }}
            >
              {item.desc}
            </p>
            <Link
              to={item.to}
              style={{
                fontSize: "var(--typography-body-md-size)",
                fontWeight: "var(--typography-font-weight-semibold)",
                color: "var(--theme-brand-text-primary-default)",
                textDecoration: "none",
              }}
            >
              {item.cta} →
            </Link>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "02",
    anchorId: "foundation",
    title: "Foundation",
    content: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--core-space-4)" }}>
        {[
          { title: "Logo", desc: "CORE mark usage rules and client white-label lockups.", to: "/foundations/logo" },
          { title: "Color", desc: "Semantic tokens, light/dark modes, and Figma variable mapping.", to: "/foundations/color" },
          { title: "Typography", desc: "Type scale, font families, and responsive text styles.", to: "/foundations/typography" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--core-space-2)",
              padding: "var(--core-space-5) var(--core-space-6)",
              borderRadius: "var(--core-radius-lg)",
              border: "1px solid var(--site-border)",
              background: "var(--core-color-surface-default)",
              textDecoration: "none",
              color: "inherit",
              transition: "border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--theme-brand-border-primary-default)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--site-border)";
            }}
          >
            <span
              style={{
                fontSize: "var(--core-font-size-lg)",
                fontWeight: "var(--typography-font-weight-medium)",
                letterSpacing: "-0.02em",
                color: "var(--core-color-text-primary)",
              }}
            >
              {item.title}
            </span>
            <span style={{ fontSize: "var(--typography-body-md-size)", lineHeight: 1.6, color: "var(--core-color-text-secondary)" }}>
              {item.desc}
            </span>
          </Link>
        ))}
      </div>
    ),
  },
  {
    id: "03",
    anchorId: "components",
    title: "Components",
    content: (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "var(--core-space-2)",
        }}
      >
        {componentLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              display: "block",
              padding: "var(--core-space-3) var(--core-space-4)",
              borderRadius: "var(--core-radius-sm)",
              border: "1px solid var(--site-border)",
              background: "var(--core-color-surface-default)",
              textDecoration: "none",
              fontSize: "var(--typography-body-md-size)",
              fontWeight: "var(--typography-font-weight-medium)",
              color: "var(--core-color-text-primary)",
              transition: "border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--theme-brand-border-primary-default)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--site-border)";
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    ),
  },
  {
    id: "04",
    anchorId: "suggested-path",
    title: "Suggested path",
    content: (
      <div
        style={{
          borderRadius: "var(--core-radius-lg)",
          border: "1px solid var(--site-border)",
          background: "var(--core-color-surface-hover)",
          padding: "var(--core-space-8)",
        }}
      >
        <ol style={{ margin: 0, paddingLeft: "var(--core-space-5)", display: "flex", flexDirection: "column", gap: "var(--core-space-4)" }}>
          <li style={{ fontSize: "var(--typography-body-md-size)", lineHeight: 1.6, color: "var(--core-color-text-secondary)" }}>
            Review{" "}
            <Link to="/foundations/color" style={{ color: "var(--theme-brand-text-primary-default)", fontWeight: "var(--typography-font-weight-semibold)", textDecoration: "none" }}>
              Color
            </Link>{" "}
            and{" "}
            <Link to="/foundations/typography" style={{ color: "var(--theme-brand-text-primary-default)", fontWeight: "var(--typography-font-weight-semibold)", textDecoration: "none" }}>
              Typography
            </Link>{" "}
            to understand tokens and naming.
          </li>
          <li style={{ fontSize: "var(--typography-body-md-size)", lineHeight: 1.6, color: "var(--core-color-text-secondary)" }}>
            Explore{" "}
            <Link to="/components/actions" style={{ color: "var(--theme-brand-text-primary-default)", fontWeight: "var(--typography-font-weight-semibold)", textDecoration: "none" }}>
              Actions
            </Link>{" "}
            and{" "}
            <Link to="/components/forms" style={{ color: "var(--theme-brand-text-primary-default)", fontWeight: "var(--typography-font-weight-semibold)", textDecoration: "none" }}>
              Forms
            </Link>{" "}
            for the most common UI patterns.
          </li>
        </ol>
      </div>
    ),
  },
];

export default function Home() {
  useEffect(() => {
    document.documentElement.setAttribute("data-site-mode", "light");
    try {
      localStorage.setItem("core-site-mode", "light");
    } catch {}
  }, []);

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: "var(--core-space-5)" }}>
      <div style={{ textAlign: "center", marginBottom: "var(--core-space-16)", marginTop: "var(--core-space-10)" }}>
        <h1
          style={{
            fontSize: 72 /* no token above 48px */,
            fontWeight: "var(--typography-font-weight-bold)",
            letterSpacing: "-0.06em",
            margin: "0 0 var(--core-space-4) 0",
            color: "var(--core-color-text-primary)",
            lineHeight: 1.1,
          }}
        >
          Overview
        </h1>
        <p
          style={{
            maxWidth: 560,
            margin: "0 auto",
            color: "var(--core-color-text-tertiary)",
            fontSize: "var(--core-font-size-lg)",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Documentation for the participant portal design system — a white-label foundation for retirement,
          benefits, and account experiences. Use the sidebar or the sections below to explore.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-24)" }}>
        {sections.map((s) => (
          <div key={s.id} id={s.anchorId} className="docs-section" style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-10)", position: "relative" }}>
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
            <div style={{ paddingTop: "var(--core-space-8)" }}>
              <div
                style={{
                  fontSize: "var(--core-font-size-xs)",
                  fontWeight: "var(--typography-font-weight-semibold)",
                  color: "var(--core-color-text-tertiary)",
                  marginBottom: "var(--core-space-3)",
                }}
              >
                {s.id}
              </div>
              <h2
                style={{
                  fontSize: "var(--core-font-size-5xl)",
                  fontWeight: "var(--typography-font-weight-medium)",
                  letterSpacing: "-0.04em",
                  margin: 0,
                  color: "var(--core-color-text-primary)",
                }}
              >
                {s.title}
              </h2>
            </div>
            <div>{s.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
