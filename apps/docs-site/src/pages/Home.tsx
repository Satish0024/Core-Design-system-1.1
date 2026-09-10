import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Preset Color Palettes for Dynamic Theming in the Card Cover
const COLOR_PRESETS = [
  {
    name: "CORE Blue",
    deep: "#0c1827",
    mid: "#1D4477",
    primary: "#1F4F8D",
    bright: "#2A6BC0",
    highlight: "#39BCF9",
    glow: "rgba(31, 79, 141, 0.35)",
    bg: "#08101a",
  },
  {
    name: "Emerald",
    deep: "#021c15",
    mid: "#065F46",
    primary: "#059669",
    bright: "#10B981",
    highlight: "#34D399",
    glow: "rgba(16, 185, 129, 0.35)",
    bg: "#030806",
  },
  {
    name: "Teal Cyan",
    deep: "#042628",
    mid: "#0D9488",
    primary: "#14B8A6",
    bright: "#2DD4BF",
    highlight: "#5EEAD4",
    glow: "rgba(45, 212, 191, 0.35)",
    bg: "#020c0e",
  },
  {
    name: "Royal Indigo",
    deep: "#15123d",
    mid: "#312E81",
    primary: "#4338CA",
    bright: "#6366F1",
    highlight: "#818CF8",
    glow: "rgba(99, 102, 241, 0.35)",
    bg: "#080614",
  },
  {
    name: "Velvet Purple",
    deep: "#21094d",
    mid: "#581C87",
    primary: "#7C3AED",
    bright: "#8B5CF6",
    highlight: "#A78BFA",
    glow: "rgba(139, 92, 246, 0.35)",
    bg: "#0d041c",
  },
  {
    name: "Amber Gold",
    deep: "#241402",
    mid: "#684106",
    primary: "#B06E0A",
    bright: "#E89A1C",
    highlight: "#FBB94D",
    glow: "rgba(232, 154, 28, 0.35)",
    bg: "#0f0701",
  },
  {
    name: "Crimson",
    deep: "#2e0505",
    mid: "#881337",
    primary: "#BE123C",
    bright: "#E11D48",
    highlight: "#FB7185",
    glow: "rgba(225, 29, 72, 0.35)",
    bg: "#100204",
  },
];

// Pure Code Fluted/Reeded Glass Component
function FlutedReededGlass({
  colors,
  fluteWidth = 8,
}: {
  colors: typeof COLOR_PRESETS[0];
  fluteWidth?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "58%",
        overflow: "hidden",
        backgroundColor: colors.bg,
        transition: "background-color 0.5s ease",
      }}
    >
      {/* 1. Underlying Radial Glow Spotlight centered in the left fluted section */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 65% 85% at 48% 50%, 
              ${colors.highlight} 0%, 
              ${colors.bright} 24%, 
              ${colors.primary} 46%, 
              ${colors.mid} 66%, 
              ${colors.deep} 84%, 
              transparent 98%
            )
          `,
          transition: "background 0.5s ease",
        }}
      />

      {/* 2. Secondary Intense Center Highlight Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle 280px at 48% 50%, ${colors.highlight} 0%, transparent 68%)
          `,
          opacity: 0.55,
          mixBlendMode: "screen",
          transition: "all 0.5s ease",
        }}
      />

      {/* 3. Pure Code 3D Cylindrical Fluted Glass Ridges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.88) 0px,
              rgba(0, 0, 0, 0.35) ${fluteWidth * 0.22}px,
              rgba(255, 255, 255, 0.65) ${fluteWidth * 0.42}px,
              rgba(255, 255, 255, 0.25) ${fluteWidth * 0.6}px,
              rgba(0, 0, 0, 0.3) ${fluteWidth * 0.78}px,
              rgba(0, 0, 0, 0.88) ${fluteWidth}px
            )
          `,
          mixBlendMode: "overlay",
          opacity: 0.96,
        }}
      />

      {/* 4. Fine Secondary Specular Highlight Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent ${fluteWidth - 2}px,
              rgba(255, 255, 255, 0.45) ${fluteWidth - 1}px,
              rgba(0, 0, 0, 0.95) ${fluteWidth}px
            )
          `,
          mixBlendMode: "color-dodge",
          opacity: 0.5,
        }}
      />

      {/* 5. Top & Bottom Dark Vignette Fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(180deg, 
              rgba(0, 0, 0, 0.96) 0%, 
              rgba(0, 0, 0, 0.65) 12%, 
              rgba(0, 0, 0, 0) 32%, 
              rgba(0, 0, 0, 0) 68%, 
              rgba(0, 0, 0, 0.65) 88%, 
              rgba(0, 0, 0, 0.96) 100%
            )
          `,
          pointerEvents: "none",
        }}
      />

      {/* 6. Left Edge Subtle Dark Shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(90deg, 
              rgba(0, 0, 0, 0.85) 0%, 
              rgba(0, 0, 0, 0) 14%
            )
          `,
          pointerEvents: "none",
        }}
      />

      {/* 7. Right Fade to Solid Black */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(90deg, 
              rgba(0, 0, 0, 0) 0%, 
              rgba(0, 0, 0, 0) 60%, 
              rgba(0, 0, 0, 0.5) 78%, 
              rgba(0, 0, 0, 0.92) 92%, 
              rgba(0, 0, 0, 1) 100%
            )
          `,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState(COLOR_PRESETS[0]);
  const [fluteWidth, setFluteWidth] = useState(8);
  const [btnCount, setBtnCount] = useState(0);

  // Ensure the page document mode is set to light
  useEffect(() => {
    document.documentElement.setAttribute("data-site-mode", "light");
    try {
      localStorage.setItem("core-site-mode", "light");
    } catch {}
  }, []);

  // Gradient definitions showcasing rich aesthetics
  const gradients = [
    {
      name: "Primary Horizon",
      role: "Brand Call-to-Action & Headers",
      css: "linear-gradient(135deg, #1F4F8D 0%, #3275CD 50%, #86ADDF 100%)",
      tokens: "--theme-brand-background-primary-default → #3275CD → #86ADDF",
    },
    {
      name: "Midnight Depth",
      role: "Dark Surface Overlays & Glow",
      css: "linear-gradient(135deg, #0c1827 0%, #17365E 55%, #1F4F8D 100%)",
      tokens: "--theme-brand-background-primary-subtle → #17365E",
    },
    {
      name: "Success Emerald",
      role: "Positive Wealth Returns & Status",
      css: "linear-gradient(135deg, #052014 0%, #116840 50%, #22A369 100%)",
      tokens: "--theme-semantics-success-background-strong",
    },
    {
      name: "Amber Warmth",
      role: "Advisory Notices & Caution",
      css: "linear-gradient(135deg, #382002 0%, #95590A 50%, #E89A1C 100%)",
      tokens: "--theme-semantics-warning-background-strong",
    },
  ];

  // Primary color swatches
  const primarySwatches = [
    { label: "50", hex: "#F5F7FA", text: "#1D1C24" },
    { label: "100", hex: "#E2E9F3", text: "#1D1C24" },
    { label: "200", hex: "#BACEE9", text: "#1D1C24" },
    { label: "300", hex: "#86ADDF", text: "#FFFFFF" },
    { label: "400", hex: "#3275CD", text: "#FFFFFF" },
    { label: "500", hex: "#1F4F8D", text: "#FFFFFF", isKey: true },
    { label: "600", hex: "#1B4479", text: "#FFFFFF" },
    { label: "700", hex: "#17365E", text: "#FFFFFF" },
    { label: "800", hex: "#132A49", text: "#FFFFFF" },
    { label: "900", hex: "#102137", text: "#FFFFFF" },
  ];

  // Neutral color swatches
  const neutralSwatches = [
    { label: "0", hex: "#FFFFFF", text: "#1D1C24" },
    { label: "100", hex: "#EEEEF2", text: "#1D1C24" },
    { label: "200", hex: "#DFDFE6", text: "#1D1C24" },
    { label: "400", hex: "#9E9EAD", text: "#FFFFFF" },
    { label: "600", hex: "#5C5C6B", text: "#FFFFFF" },
    { label: "800", hex: "#2E2D38", text: "#FFFFFF" },
    { label: "900", hex: "#1D1C24", text: "#FFFFFF", isKey: true },
    { label: "1000", hex: "#000000", text: "#FFFFFF" },
  ];

  // Foundation & Component Directory links
  const exploreCards = [
    {
      title: "Brand Logo",
      subtitle: "Foundations",
      desc: "CORE mark and client theme white-label lockups for light and dark contexts.",
      link: "/foundations/logo",
      badge: "Foundation",
    },
    {
      title: "Color System",
      subtitle: "Foundations",
      desc: "Dual-mode semantic tokens, Figma variables 1:1 mapping, and SCSS palette generator.",
      link: "/foundations/color",
      badge: "Foundation",
    },
    {
      title: "Typography",
      subtitle: "Foundations",
      desc: "Inclusive Sans typographic hierarchy, proportional line heights, and tabular figures.",
      link: "/foundations/typography",
      badge: "Foundation",
    },
    {
      title: "Buttons & Actions",
      subtitle: "Components",
      desc: "Primary, secondary outline, ghost tertiary, neutral, and semantic button states.",
      link: "/components/actions",
      badge: "Components",
    },
    {
      title: "Form Elements",
      subtitle: "Components",
      desc: "Accessible inputs, selects, switches, comboboxes, and date pickers with validation states.",
      link: "/components/forms",
      badge: "Components",
    },
    {
      title: "Data Display & Cards",
      subtitle: "Components",
      desc: "Participant balance cards, tone-matched badges, data tables, and avatars.",
      link: "/components/data-display",
      badge: "Components",
    },
    {
      title: "Feedback & Alerts",
      subtitle: "Components",
      desc: "Toasts, inline banners, empty states, and dismissible alerts across semantic tones.",
      link: "/components/feedback",
      badge: "Components",
    },
    {
      title: "Layout & Grid",
      subtitle: "Foundations",
      desc: "App headers, sidebars, responsive 12-column containers, and screen layouts.",
      link: "/foundations/layout-grid",
      badge: "Layout",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        color: "#111827",
        paddingBottom: 80,
      }}
    >
      {/* =========================================================================
          TOP HERO: CARD COVER WITH GRADIENTS & PURE CODE FLUTED GLASS
         ========================================================================= */}
      <section
        style={{
          width: "100%",
          padding: "36px 24px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Dynamic Theme & Flute Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
            background: "#FFFFFF",
            padding: "8px 20px",
            borderRadius: 30,
            border: "1px solid #E5E7EB",
            flexWrap: "wrap",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "#6B7280", textTransform: "uppercase" }}>
              Theme:
            </span>
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setSelectedPreset(preset)}
                title={preset.name}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  border: selectedPreset.name === preset.name ? `2px solid ${preset.bright}` : "1px solid #E5E7EB",
                  background: selectedPreset.name === preset.name ? "rgba(31, 79, 141, 0.08)" : "transparent",
                  borderRadius: 20,
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: selectedPreset.name === preset.name ? 700 : 500,
                  color: "#111827",
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: preset.bright,
                    boxShadow: `0 0 6px ${preset.glow}`,
                    display: "inline-block",
                  }}
                />
                {preset.name}
              </button>
            ))}
          </div>

          <div style={{ height: 16, width: 1, background: "#E5E7EB" }} />

          {/* Flute Density Control */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, letterSpacing: "0.06em", color: "#6B7280", textTransform: "uppercase" }}>
              Flute:
            </span>
            {[6, 8, 10, 14].map((width) => (
              <button
                key={width}
                type="button"
                onClick={() => setFluteWidth(width)}
                style={{
                  border: fluteWidth === width ? `2px solid ${selectedPreset.bright}` : "1px solid #E5E7EB",
                  background: fluteWidth === width ? "rgba(31, 79, 141, 0.08)" : "transparent",
                  borderRadius: 14,
                  padding: "2px 8px",
                  fontSize: "var(--core-font-size-xs, 12px)",
                  cursor: "pointer",
                  fontWeight: fluteWidth === width ? 700 : 500,
                  color: "#111827",
                }}
              >
                {width}px
              </button>
            ))}
          </div>
        </div>

        {/* Panoramic Fluted Glass Cover Banner Card */}
        <div
          style={{
            width: "100%",
            maxWidth: 1160,
            aspectRatio: "3.6 / 1",
            minHeight: 300,
            maxHeight: 400,
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "#000000",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: `0 20px 50px ${selectedPreset.glow}, 0 4px 16px rgba(0,0,0,0.08)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* Dynamic Pure Code Fluted / Reeded Glass Shader */}
          <FlutedReededGlass colors={selectedPreset} fluteWidth={fluteWidth} />

          {/* Content Section on the Right */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              paddingRight: "clamp(32px, 6vw, 72px)",
              paddingLeft: 32,
              maxWidth: 480,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Main Title */}
            <div
              style={{
                fontSize: "clamp(34px, 4.5vw, 56px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#ffffff",
                fontFamily: "var(--core-font-family-base, 'Inclusive Sans', sans-serif)",
              }}
            >
              CORE
            </div>

            {/* Hairline Accent Divider */}
            <div
              style={{
                width: "100%",
                maxWidth: 320,
                height: 1,
                background: `linear-gradient(90deg, ${selectedPreset.highlight} 0%, rgba(255, 255, 255, 0.18) 100%)`,
                margin: "10px 0 12px 0",
                transition: "background 0.5s ease",
              }}
            />

            {/* Subtitle */}
            <div
              style={{
                fontSize: "clamp(14px, 1.5vw, 18px)",
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.88)",
                letterSpacing: "0.02em",
                lineHeight: 1.4,
                fontFamily: "var(--core-font-family-base, 'Inclusive Sans', sans-serif)",
              }}
            >
              Participant Portal
            </div>

            {/* Quick Action Navigation Links */}
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <Link
                to="/components/actions"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 18px",
                  borderRadius: 20,
                  background: "rgba(255, 255, 255, 0.14)",
                  backdropFilter: "blur(12px)",
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid rgba(255, 255, 255, 0.28)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.24)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.14)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Explore Components →
              </Link>

              <Link
                to="/foundations/color"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 18px",
                  borderRadius: 20,
                  background: "transparent",
                  color: "rgba(255, 255, 255, 0.82)",
                  fontSize: 12,
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = selectedPreset.highlight;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.82)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Color Tokens
              </Link>

              <Link
                to="/foundations/typography"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 18px",
                  borderRadius: 20,
                  background: "transparent",
                  color: "rgba(255, 255, 255, 0.82)",
                  fontSize: 12,
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = selectedPreset.highlight;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.82)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Typography
              </Link>
            </div>

            {/* Bottom Right Reference Detail */}
            <div
              style={{
                position: "absolute",
                bottom: "clamp(14px, 2.5vw, 24px)",
                right: "clamp(32px, 6vw, 72px)",
                fontSize: "var(--core-font-size-xs, 12px)",
                fontFamily: "var(--site-mono, monospace)",
                color: "rgba(255, 255, 255, 0.5)",
                letterSpacing: "0.06em",
                pointerEvents: "none",
              }}
            >
              v0.1.0 · White-label Foundation
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT CONTAINER (WHITE CANVAS)
         ========================================================================= */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 72 }}>
        {/* -----------------------------------------------------------------------
            SECTION 01: COLOR & GRADIENTS
           ----------------------------------------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, position: "relative", paddingTop: 40, borderTop: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#6B7280", textTransform: "uppercase", marginBottom: 8 }}>
                01 / Foundation
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: 0, color: "#111827" }}>
                Color & Gradients
              </h2>
            </div>
            <div style={{ maxWidth: 460 }}>
              <p style={{ margin: "0 0 12px 0", fontSize: 16, lineHeight: 1.6, color: "#4B5563" }}>
                A multi-tiered, accessible color architecture built from mathematical primitive ramps and 1:1 Figma semantic variables that resolve seamlessly in both light and dark mode.
              </p>
              <Link to="/foundations/color" style={{ fontSize: "var(--core-font-size-sm, 14px)", fontWeight: 600, color: "var(--theme-brand-text-primary-default, #1F4F8D)", textDecoration: "none" }}>
                Explore full color system & SCSS export →
              </Link>
            </div>
          </div>

          {/* Gradients Showcase Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 18 }}>
            {gradients.map((grad) => (
              <div
                key={grad.name}
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                  background: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ height: 96, background: grad.css, position: "relative" }} />
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                    {grad.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.4 }}>
                    {grad.role}
                  </div>
                  <code style={{ display: "block", marginTop: 8, fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)", color: "#6B7280", background: "#F9FAFB", padding: "4px 8px", borderRadius: 6, wordBreak: "break-all" }}>
                    {grad.tokens}
                  </code>
                </div>
              </div>
            ))}
          </div>

          {/* Primary & Neutral Swatch Ramps */}
          <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "24px 28px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Primary Ramp */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: "var(--core-font-size-sm, 14px)", fontWeight: 700, color: "#111827" }}>Primary Brand Ramp (50 - 900)</span>
                <span style={{ fontSize: 12, fontFamily: "var(--site-mono)", color: "#6B7280" }}>--theme-brand-*</span>
              </div>
              <div style={{ display: "flex", height: 52, borderRadius: 10, overflow: "hidden", border: "1px solid #E5E7EB" }}>
                {primarySwatches.map((sw) => (
                  <div
                    key={sw.label}
                    title={`Brand ${sw.label}: ${sw.hex}`}
                    style={{
                      flex: 1,
                      background: sw.hex,
                      color: sw.text,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "6px",
                      fontSize: "var(--core-font-size-xs, 12px)",
                      fontWeight: 700,
                      fontFamily: "var(--site-mono)",
                      position: "relative",
                    }}
                  >
                    {sw.isKey && (
                      <span style={{ position: "absolute", top: 4, left: 4, width: 6, height: 6, borderRadius: "50%", background: "#FFFFFF" }} />
                    )}
                    <span>{sw.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutral Ramp */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: "var(--core-font-size-sm, 14px)", fontWeight: 700, color: "#111827" }}>Neutral Achromatic Ramp (0 - 1000)</span>
                <span style={{ fontSize: 12, fontFamily: "var(--site-mono)", color: "#6B7280" }}>--theme-neutral-*</span>
              </div>
              <div style={{ display: "flex", height: 52, borderRadius: 10, overflow: "hidden", border: "1px solid #E5E7EB" }}>
                {neutralSwatches.map((sw) => (
                  <div
                    key={sw.label}
                    title={`Neutral ${sw.label}: ${sw.hex}`}
                    style={{
                      flex: 1,
                      background: sw.hex,
                      color: sw.text,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "6px",
                      fontSize: "var(--core-font-size-xs, 12px)",
                      fontWeight: 700,
                      fontFamily: "var(--site-mono)",
                      position: "relative",
                    }}
                  >
                    {sw.isKey && (
                      <span style={{ position: "absolute", top: 4, left: 4, width: 6, height: 6, borderRadius: "50%", background: "#FFFFFF" }} />
                    )}
                    <span>{sw.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            SECTION 02: TYPOGRAPHY
           ----------------------------------------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, position: "relative", paddingTop: 40, borderTop: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#6B7280", textTransform: "uppercase", marginBottom: 8 }}>
                02 / Foundation
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: 0, color: "#111827" }}>
                Typography Scale
              </h2>
            </div>
            <div style={{ maxWidth: 460 }}>
              <p style={{ margin: "0 0 12px 0", fontSize: 16, lineHeight: 1.6, color: "#4B5563" }}>
                Engineered with <strong>Inclusive Sans</strong> for maximum legible clarity in dense wealth dashboards, combined with <strong>JetBrains Mono</strong> for precision financial figures.
              </p>
              <Link to="/foundations/typography" style={{ fontSize: "var(--core-font-size-sm, 14px)", fontWeight: 600, color: "var(--theme-brand-text-primary-default, #1F4F8D)", textDecoration: "none" }}>
                View complete typography spec & tokens →
              </Link>
            </div>
          </div>

          {/* Typography Preview Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {/* Display & Headings */}
            <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "28px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Display & Headings
              </div>
              <div style={{ borderBottom: "1px solid #E5E7EB", paddingBottom: 14 }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  Retirement Readiness
                </div>
                <div style={{ fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)", color: "#6B7280", marginTop: 4 }}>
                  Display · 36px / Bold (700)
                </div>
              </div>
              <div style={{ borderBottom: "1px solid #E5E7EB", paddingBottom: 14 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#111827", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  Asset Allocation Strategy
                </div>
                <div style={{ fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)", color: "#6B7280", marginTop: 4 }}>
                  Heading 1 · 26px / Bold (700)
                </div>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 600, color: "#111827", lineHeight: 1.25 }}>
                  Employer Sponsored 401(k) Plan
                </div>
                <div style={{ fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)", color: "#6B7280", marginTop: 4 }}>
                  Heading 2 · 20px / Semi-Bold (600)
                </div>
              </div>
            </div>

            {/* Body Copy & Financial Mono Figures */}
            <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "28px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Body Copy & Tabular Numbers
              </div>
              <div style={{ borderBottom: "1px solid #E5E7EB", paddingBottom: 14 }}>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "#374151", margin: 0 }}>
                  Empowering millions of plan participants to make confident retirement decisions through clear visual communication and accessible component structures.
                </p>
                <div style={{ fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)", color: "#6B7280", marginTop: 6 }}>
                  Body Large · 16px / Regular (400)
                </div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "var(--site-mono)", color: "var(--theme-brand-text-primary-default, #1F4F8D)" }}>
                  $1,248,590.42
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--theme-semantics-success-strong-background, #22A369)" }}>
                    ▲ +14.82% YTD
                  </span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>(+$160,840.00)</span>
                </div>
                <div style={{ fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)", color: "#6B7280", marginTop: 6 }}>
                  Numeric Data · Tabular Figures (JetBrains Mono)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            SECTION 03: LIVE COMPONENTS SHOWCASE
           ----------------------------------------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, position: "relative", paddingTop: 40, borderTop: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#6B7280", textTransform: "uppercase", marginBottom: 8 }}>
                03 / Components
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: 0, color: "#111827" }}>
                Component Showcase
              </h2>
            </div>
            <div style={{ maxWidth: 460 }}>
              <p style={{ margin: "0 0 12px 0", fontSize: 16, lineHeight: 1.6, color: "#4B5563" }}>
                Core UI components styled purely with semantic variables. All button variants, badge styles, inputs, and participant cards support live interactive states.
              </p>
              <Link to="/components/actions" style={{ fontSize: "var(--core-font-size-sm, 14px)", fontWeight: 600, color: "var(--theme-brand-text-primary-default, #1F4F8D)", textDecoration: "none" }}>
                Explore actions, buttons & matrices →
              </Link>
            </div>
          </div>

          {/* Live Component Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {/* 1. Button Variants & States */}
            <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "28px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Button Hierarchy & States</span>
                <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontFamily: "var(--site-mono)", color: "#6B7280" }}>Clicks: {btnCount}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                <button
                  type="button"
                  className="cds-btn cds-btn--primary cds-btn--md"
                  onClick={() => setBtnCount((c) => c + 1)}
                >
                  Primary Solid
                </button>
                <button
                  type="button"
                  className="cds-btn cds-btn--secondary cds-btn--md"
                  onClick={() => setBtnCount((c) => c + 1)}
                >
                  Secondary Outline
                </button>
                <button
                  type="button"
                  className="cds-btn cds-btn--tertiary cds-btn--md"
                  onClick={() => setBtnCount((c) => c + 1)}
                >
                  Tertiary Ghost
                </button>
                <button
                  type="button"
                  className="cds-btn cds-btn--neutral cds-btn--md"
                  onClick={() => setBtnCount((c) => c + 1)}
                >
                  Neutral
                </button>
                <button
                  type="button"
                  className="cds-btn cds-btn--success cds-btn--md"
                  onClick={() => setBtnCount((c) => c + 1)}
                >
                  Success
                </button>
                <button
                  type="button"
                  className="cds-btn cds-btn--critical cds-btn--md"
                  onClick={() => setBtnCount((c) => c + 1)}
                >
                  Critical
                </button>
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4, marginTop: 4 }}>
                Buttons consume <code>--theme-brand-*</code>, <code>--theme-neutral-*</code>, and semantic status variables with hover and active transitions.
              </div>
            </div>

            {/* 2. Badges & Tags */}
            <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "28px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Status Badges & Indicators</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <span className="cds-badge cds-badge--primary cds-badge-style--solid cds-badge--md">
                  Solid Primary
                </span>
                <span className="cds-badge cds-badge--primary cds-badge-style--soft cds-badge--md">
                  Soft Primary
                </span>
                <span className="cds-badge cds-badge--success cds-badge-style--soft cds-badge--md">
                  ● Verified
                </span>
                <span className="cds-badge cds-badge--warning cds-badge-style--soft cds-badge--md">
                  ▲ In Progress
                </span>
                <span className="cds-badge cds-badge--critical cds-badge-style--soft cds-badge--md">
                  ✖ Attention
                </span>
                <span className="cds-badge cds-badge--neutral cds-badge-style--outline cds-badge--md">
                  Neutral Outline
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4, marginTop: 4 }}>
                Available across 8 semantic and brand tones in soft, outline, and solid styles.
              </div>
            </div>

            {/* 3. Participant Portal Live Dashboard Widget */}
            <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "28px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 18, gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Participant Portal Account Preview
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginTop: 2 }}>
                    Comprehensive 401(k) Retirement Portfolio
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="cds-badge cds-badge--success cds-badge-style--soft cds-badge--md">
                    ● Fully Vested
                  </span>
                  <span className="cds-badge cds-badge--primary cds-badge-style--outline cds-badge--md">
                    Pre-Tax & Roth
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, background: "#F8FAFC", padding: "20px 24px", borderRadius: 12, border: "1px solid #E2E8F0" }}>
                <div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>Total Vested Balance</div>
                  <div style={{ fontSize: 34, fontWeight: 800, fontFamily: "var(--site-mono)", color: "#111827", letterSpacing: "-0.02em" }}>
                    $482,910.80
                  </div>
                  <div style={{ fontSize: "var(--core-font-size-sm, 14px)", color: "var(--theme-semantics-success-strong-background, #22A369)", fontWeight: 600, marginTop: 4 }}>
                    ▲ +12.4% Annualized Return (+$53,200.00)
                  </div>
                </div>

                {/* Progress Indicator */}
                <div style={{ flex: "1 1 240px", maxWidth: 360 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
                    <span>Annual Contribution Limit</span>
                    <span style={{ fontWeight: 600, color: "#111827" }}>$18,500 / $23,000 (80%)</span>
                  </div>
                  <div style={{ width: "100%", height: 8, background: "#E2E8F0", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: "80%", height: "100%", background: "linear-gradient(90deg, #1F4F8D 0%, #3275CD 100%)", borderRadius: 4 }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" className="cds-btn cds-btn--primary cds-btn--md">
                    Manage Contributions
                  </button>
                  <button type="button" className="cds-btn cds-btn--neutral cds-btn--md">
                    Statements
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            SECTION 04: DESIGN SYSTEM DIRECTORY
           ----------------------------------------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, position: "relative", paddingTop: 40, borderTop: "1px solid #E5E7EB" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#6B7280", textTransform: "uppercase", marginBottom: 8 }}>
              04 / Directory
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: 0, color: "#111827" }}>
              Explore Foundations & Components
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {exploreCards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                style={{
                  textDecoration: "none",
                  background: "#FFFFFF",
                  borderRadius: 14,
                  padding: "22px",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 140,
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "var(--theme-brand-border-primary-default, #3275CD)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(31,79,141,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.02)";
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: "var(--core-font-size-xs, 12px)", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {card.subtitle}
                    </span>
                    <span style={{ fontSize: "var(--core-font-size-xs, 12px)", color: "var(--theme-brand-text-primary-default, #1F4F8D)", fontWeight: 600 }}>
                      →
                    </span>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
                    {card.title}
                  </div>
                  <p style={{ fontSize: "var(--core-font-size-sm, 14px)", lineHeight: 1.5, color: "#4B5563", margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
