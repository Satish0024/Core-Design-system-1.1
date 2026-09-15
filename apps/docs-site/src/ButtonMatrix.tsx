import React, { useState } from "react";
import { Button, ButtonVariant } from "../../../packages/core/src/components/Button";

export type MatrixSize = "sm" | "md" | "lg";
export type VariantCategory = "all" | "brand" | "semantics" | "neutral";

interface VariantConfig {
  id: ButtonVariant;
  name: string;
  category: "brand" | "semantics" | "neutral";
  stateTokens: Record<
    "default" | "hover" | "active" | "focused" | "disabled",
    {
      bgVar: string;
      bgFallback: string;
      textVar: string;
      textFallback: string;
      borderVar?: string;
      borderFallback?: string;
      extraStyles?: React.CSSProperties;
    }
  >;
}

const VARIANTS: VariantConfig[] = [
  // 1. BRAND PRIMARY (SOLID)
  {
    id: "primary",
    name: "Primary CTA",
    category: "brand",
    stateTokens: {
      default: {
        bgVar: "--theme-brand-background-primary-strong",
        bgFallback: "#1F4F8D",
        textVar: "--theme-brand-text-primary-oncolor",
        textFallback: "#FFFFFF",
        borderVar: "--theme-brand-border-primary-default",
        borderFallback: "#3275CD",
        extraStyles: { boxShadow: "0 1px 2px rgba(17,16,23,0.08)" },
      },
      hover: {
        bgVar: "--theme-brand-background-primary-hover",
        bgFallback: "#1B4479",
        textVar: "--theme-brand-text-primary-oncolor",
        textFallback: "#FFFFFF",
        borderVar: "--theme-brand-border-primary-hover",
        borderFallback: "#1B4479",
        extraStyles: { boxShadow: "0 2px 6px rgba(31,79,141,0.25)" },
      },
      active: {
        bgVar: "--theme-brand-background-primary-active",
        bgFallback: "#17365E",
        textVar: "--theme-brand-text-primary-oncolor",
        textFallback: "#FFFFFF",
        borderVar: "--theme-brand-background-primary-active",
        borderFallback: "#17365E",
        extraStyles: { transform: "translateY(1px)" },
      },
      focused: {
        bgVar: "--theme-brand-background-primary-strong",
        bgFallback: "#1F4F8D",
        textVar: "--theme-brand-text-primary-oncolor",
        textFallback: "#FFFFFF",
        borderVar: "--theme-brand-border-primary-default",
        borderFallback: "#3275CD",
        extraStyles: {
          outline: "2px solid var(--theme-brand-border-primary-default)",
          outlineOffset: "2px",
          boxShadow: "0 0 0 3px rgba(50,117,205,0.3)",
        },
      },
      disabled: {
        bgVar: "--theme-brand-background-primary-disabled",
        bgFallback: "#BACEE9",
        textVar: "--theme-brand-text-primary-disabled",
        textFallback: "#1B4479",
        borderVar: "--theme-brand-border-primary-disabled",
        borderFallback: "#1F4F8D",
        extraStyles: { boxShadow: "0 1px 2px rgba(17,16,23,0.06)" },
      },
    },
  },

  // 2. BRAND SECONDARY (OUTLINE)
  {
    id: "secondary",
    name: "Secondary CTA",
    category: "brand",
    stateTokens: {
      default: {
        bgVar: "transparent",
        bgFallback: "transparent",
        textVar: "--theme-primitive-color-primary-500",
        textFallback: "#1F4F8D",
        borderVar: "--theme-brand-border-primary-default",
        borderFallback: "#3275CD",
      },
      hover: {
        bgVar: "--theme-brand-background-primary-hover",
        bgFallback: "#1B4479",
        textVar: "--theme-primitive-color-primary-100",
        textFallback: "#E2E9F3",
        borderVar: "--theme-brand-border-primary-hover",
        borderFallback: "#1B4479",
      },
      active: {
        bgVar: "--theme-brand-background-primary-active",
        bgFallback: "#17365E",
        textVar: "--theme-primitive-color-primary-100",
        textFallback: "#E2E9F3",
        borderVar: "--theme-brand-background-primary-active",
        borderFallback: "#17365E",
        extraStyles: { transform: "translateY(1px)" },
      },
      focused: {
        bgVar: "transparent",
        bgFallback: "transparent",
        textVar: "--theme-primitive-color-primary-500",
        textFallback: "#1F4F8D",
        borderVar: "--theme-brand-border-primary-default",
        borderFallback: "#3275CD",
        extraStyles: {
          outline: "2px solid var(--theme-brand-border-primary-default)",
          outlineOffset: "2px",
        },
      },
      disabled: {
        bgVar: "transparent",
        bgFallback: "transparent",
        textVar: "--theme-brand-text-primary-disabled",
        textFallback: "#1B4479",
        borderVar: "--theme-brand-border-primary-disabled",
        borderFallback: "#1F4F8D",
        extraStyles: {},
      },
    },
  },

  // 3. BRAND TERTIARY (GHOST)
  {
    id: "tertiary",
    name: "Tertiary CTA",
    category: "brand",
    stateTokens: {
      default: {
        bgVar: "transparent",
        bgFallback: "transparent",
        textVar: "--theme-primitive-color-primary-500",
        textFallback: "#1F4F8D",
        borderVar: "transparent",
        borderFallback: "transparent",
        extraStyles: {},
      },
      hover: {
        bgVar: "transparent",
        bgFallback: "transparent",
        textVar: "--theme-brand-text-primary-hover",
        textFallback: "#1B4479",
        borderVar: "transparent",
        borderFallback: "transparent",
        extraStyles: {},
      },
      active: {
        bgVar: "transparent",
        bgFallback: "transparent",
        textVar: "--theme-brand-text-primary-active",
        textFallback: "#17365E",
        borderVar: "transparent",
        borderFallback: "transparent",
        extraStyles: { transform: "translateY(1px)" },
      },
      focused: {
        bgVar: "transparent",
        bgFallback: "transparent",
        textVar: "--theme-primitive-color-primary-500",
        textFallback: "#1F4F8D",
        borderVar: "transparent",
        borderFallback: "transparent",
        extraStyles: {
          outline: "2px solid var(--theme-brand-border-primary-default)",
          outlineOffset: "2px",
        },
      },
      disabled: {
        bgVar: "transparent",
        bgFallback: "transparent",
        textVar: "--theme-brand-text-primary-disabled",
        textFallback: "#1B4479",
        borderVar: "transparent",
        borderFallback: "transparent",
        extraStyles: {},
      },
    },
  },
];

export function ButtonMatrix() {
  const [size, setSize] = useState<MatrixSize>("md");
  const [canvasBg, setCanvasBg] = useState<"light" | "dark">("light");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const sizeLabels: Record<MatrixSize, string> = {
    sm: "Small",
    md: "Medium",
    lg: "Large",
  };
  const buttonText = sizeLabels[size];

  const handleCopy = (variantId: string, state: string) => {
    const stateProp = state === "disabled" ? " disabled" : "";
    const sizeProp = size === "md" ? "" : ` size="${size}"`;
    const code = `<Button variant="${variantId}"${sizeProp}${stateProp}>${buttonText}</Button>`;
    navigator.clipboard.writeText(code);
    setCopiedCode(`${variantId} (${state}) copied!`);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const sizeStyles = {
    sm: {
      padding: "0.375rem 0.625rem",
      fontSize: "var(--core-typography-text12SemiBold-size, 12px)",
      lineHeight: "var(--core-typography-text12SemiBold-lineHeight, 1.5)",
      radius: "0.375rem",
    },
    md: {
      padding: "0.5rem 0.75rem",
      fontSize: "var(--core-typography-text14SemiBold-size, 14px)",
      lineHeight: "var(--core-typography-text14SemiBold-lineHeight, 1.5)",
      radius: "0.375rem",
    },
    lg: {
      padding: "0.625rem 1rem",
      fontSize: "var(--core-typography-text16SemiBold-size, 16px)",
      lineHeight: "var(--core-typography-text16SemiBold-lineHeight, 1.5)",
      radius: "0.375rem",
    },
  }[size];

  const statesList: Array<{ key: "default" | "hover" | "active" | "focused" | "disabled"; label: string }> = [
    { key: "default", label: "Default" },
    { key: "hover", label: "Hover" },
    { key: "active", label: "Active" },
    { key: "focused", label: "Focused" },
    { key: "disabled", label: "Disabled" },
  ];

  const getButtonStyles = (variant: VariantConfig, stateKey: "default" | "hover" | "active" | "focused" | "disabled"): React.CSSProperties => {
    const tok = variant.stateTokens[stateKey];
    const bgVal = tok.bgVar.startsWith("--") ? `var(${tok.bgVar}, ${tok.bgFallback})` : tok.bgFallback;
    const useDarkPrimary50Text =
      canvasBg === "dark" &&
      stateKey !== "disabled" &&
      (tok.textVar === "--theme-brand-text-primary-oncolor" ||
        (variant.id === "secondary" && (stateKey === "default" || stateKey === "focused")));

    const tertiaryDarkText =
      canvasBg === "dark" && variant.id === "tertiary" && stateKey !== "disabled"
        ? { textVar: "--theme-primitive-color-primary-50", textFallback: "#F5F7FA" }
        : undefined;

    const textVar =
      tertiaryDarkText?.textVar ??
      (useDarkPrimary50Text ? "--theme-primitive-color-primary-50" : tok.textVar);
    const textFallback =
      tertiaryDarkText?.textFallback ??
      (useDarkPrimary50Text ? "var(--core-color-brand-50)" : tok.textFallback);
    const textVal = textVar.startsWith("--") ? `var(${textVar}, ${textFallback})` : textFallback;
    const borderVal = tok.borderVar && tok.borderVar !== "transparent" ? `var(${tok.borderVar}, ${tok.borderFallback || "transparent"})` : "transparent";

    const isTertiaryLinkState =
      variant.id === "tertiary" && (stateKey === "hover" || stateKey === "active");

    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: size === "sm" ? 110 : size === "md" ? 130 : 150,
      padding: sizeStyles.padding,
      fontSize: sizeStyles.fontSize,
      lineHeight: sizeStyles.lineHeight,
      fontWeight: 600,
      borderRadius: sizeStyles.radius,
      fontFamily: "var(--typography-font-family-sans, inherit)",
      cursor: stateKey === "disabled" ? "not-allowed" : "pointer",
      border: `1px solid ${borderVal}`,
      background: bgVal,
      color: textVal,
      boxSizing: "border-box",
      transition: "all 140ms ease",
      userSelect: "none",
      textDecoration: isTertiaryLinkState ? "underline" : "none",
      textUnderlineOffset: isTertiaryLinkState ? "4px" : undefined,
      textDecorationThickness: isTertiaryLinkState ? "1px" : undefined,
      textDecorationColor: isTertiaryLinkState ? "currentColor" : undefined,
      whiteSpace: "nowrap",
      ...tok.extraStyles,
    };
  };

  return (
    <div style={{ marginTop: 12, marginBottom: 32 }}>
      {/* Interactive Control Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--core-space-4)",
          background: "var(--site-bg-elevated)",
          border: "1px solid var(--site-border)",
          borderRadius: "var(--core-radius-lg)",
          padding: "var(--core-space-4) var(--core-space-5)",
          marginBottom: 18,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {/* Size Controls */}
          <span style={{ fontSize: "var(--typography-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--theme-neutral-text-subtle)" }}>
            Size:
          </span>
          <div style={{ display: "inline-flex", background: "var(--site-bg)", borderRadius: "var(--core-radius-sm)", padding: "var(--core-space-1)", border: "1px solid var(--site-border)" }}>
            {(["sm", "md", "lg"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                style={{
                  border: "none",
                  background: size === s ? "var(--theme-brand-background-primary-strong)" : "transparent",
                  color: size === s ? "var(--brand-text-primary-oncolor)" : "var(--site-text)",
                  borderRadius: "var(--core-radius-sm)",
                  padding: "var(--core-space-1) var(--core-space-3)",
                  fontSize: "var(--core-font-size-xs)",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 120ms ease",
                }}
              >
                {sizeLabels[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Theme Toggle Switch (Right Side) */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--core-space-3)" }}>
          <span style={{ fontSize: "var(--typography-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: canvasBg === "light" ? "var(--site-text)" : "var(--theme-neutral-text-subtle)", transition: "color 0.3s ease" }}>
            Light
          </span>
          <div
            onClick={() => setCanvasBg((prev) => (prev === "light" ? "dark" : "light"))}
            style={{
              width: 44,
              height: 24,
              background: canvasBg === "dark" ? "var(--theme-brand-background-primary-strong)" : "var(--theme-neutral-border-strong)",
              borderRadius: "var(--core-radius-lg)",
              position: "relative",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                background: "var(--theme-colors-neutral-0)",
                borderRadius: "50%",
                position: "absolute",
                top: 2,
                left: canvasBg === "dark" ? 22 : 2,
                transition: "left 0.3s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </div>
          <span style={{ fontSize: "var(--typography-font-size-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: canvasBg === "dark" ? "var(--site-text)" : "var(--theme-neutral-text-subtle)", transition: "color 0.3s ease" }}>
            Dark
          </span>
        </div>
      </div>

      {/* Copy Feedback Toast */}
      {copiedCode && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "var(--theme-semantics-success-strong-background)",
            color: "var(--core-color-text-inverse)",
            padding: "var(--core-space-3) var(--core-space-5)",
            borderRadius: "var(--core-radius-sm)",
            fontSize: "var(--core-font-size-xs)",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            zIndex: 9999,
          }}
        >
          ✓ {copiedCode}
        </div>
      )}

      {/* Main Complete Variant & State Matrix Canvas */}
      <div
        data-theme="core"
        data-mode={canvasBg}
        style={{
          background: canvasBg === "light" ? "var(--core-color-neutral-0)" : "var(--core-color-neutral-950)",
          color: canvasBg === "light" ? "var(--core-color-neutral-900)" : "var(--core-color-neutral-50)",
          borderRadius: "var(--core-radius-xl)",
          padding: "var(--core-space-10) var(--core-space-8)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          border: "1px solid var(--site-border)",
          overflowX: "auto",
          transition: "background 150ms ease",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${VARIANTS.length}, minmax(190px, 1fr))`,
            columnGap: 36,
            rowGap: 0,
          }}
        >
          {VARIANTS.map((variant) => (
            <div key={variant.id} style={{ display: "flex", flexDirection: "column" }}>
              {/* Column Header */}
              <div
                style={{
                  borderBottom: "1px solid var(--site-border)",
                  paddingBottom: 14,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontSize: "var(--core-font-size-md)",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    textTransform: "capitalize",
                    color: "inherit",
                  }}
                >
                  {variant.name}
                </div>
              </div>

              {/* Rows for each state */}
              {statesList.map((st) => {
                const tokenInfo = variant.stateTokens[st.key];
                return (
                  <div key={st.key} style={{ marginBottom: 26 }}>
                    {/* State Label */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--site-text-dim)",
                          fontSize: "var(--typography-font-size-xs)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {st.label}
                      </span>
                    </div>

                    {/* Exact Rendered Button for this State */}
                    <div style={{ marginBottom: 6 }}>
                      {st.key === "disabled" ? (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleCopy(variant.id, st.key)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") handleCopy(variant.id, st.key);
                          }}
                          title={`Click to copy JSX for ${variant.name} (${st.label})`}
                          style={{ display: "inline-block", cursor: "pointer" }}
                        >
                          <Button
                            variant={variant.id}
                            size={size}
                            disabled
                            style={{ minWidth: size === "sm" ? 110 : size === "md" ? 130 : 150, pointerEvents: "none" }}
                          >
                            {buttonText}
                          </Button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          style={getButtonStyles(variant, st.key)}
                          onClick={() => handleCopy(variant.id, st.key)}
                          title={`Click to copy JSX for ${variant.name} (${st.label})`}
                        >
                          {buttonText}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
