import React from "react";
import { Link } from "react-router-dom";
import { Preview } from "../Preview";
import { Button } from "../../../../packages/core/src/components/Button";
import { Card, Badge } from "../../../../packages/core/src/components/Misc";

export default function Home() {
  return (
    <div>
      <section className="hero" aria-labelledby="hero-heading">
        <img
          className="hero-art"
          src={`${import.meta.env.BASE_URL}hero-core.jpg`}
          alt=""
          aria-hidden="true"
        />
        <div className="hero-copy">
          <p className="hero-eyebrow">Build · Branded · Accessible</p>
          <h1 id="hero-heading">Design once. Scale everywhere.</h1>
          <p>
            A flexible, token-driven design system to help every client brand ship
            consistent, accessible and beautiful experiences.
          </p>
          <div className="hero-actions">
            <Link className="btn-hero primary" to="/components/actions">
              Explore Components →
            </Link>
            <Link className="btn-hero ghost" to="/foundations/color">
              View Foundations
            </Link>
          </div>
        </div>
      </section>

      <h2 className="site-section-title">Live preview</h2>
      <p className="site-lede" style={{ marginBottom: 20 }}>
        Every example on this site renders real CORE components, not screenshots.
      </p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
          <Badge tone="success">Active</Badge>
          <Badge tone="warning">Pending</Badge>
          <Card style={{ minWidth: 220 } as React.CSSProperties}>
            <strong>Contribution rate</strong>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--core-color-text-secondary)" }}>6% of salary</p>
          </Card>
        </Preview>
      </div>

      <h2 className="site-section-title">How the layers fit together</h2>
      <div className="site-panel">
        <pre className="code-block" style={{ background: "transparent", border: "none", padding: 0 }}>
{`Bootstrap (grid & breakpoints)
   └─ CORE Foundations (color, type, spacing, radius, elevation, motion)
        └─ Primitive Tokens → Semantic Tokens → Component Tokens
             └─ CORE Components (behavior + accessibility owned by CORE)
                  └─ CORE Patterns (forms, tables, dashboards, states)
                       └─ Client Theme (LendGuard, Northbridge, ...)
                            └─ Product Application (Participant / Admin Portal)`}
        </pre>
      </div>

      <h2 className="site-section-title">Principle</h2>
      <div className="dodont" style={{ gridTemplateColumns: "1fr" }}>
        <div className="box do">
          <span className="tag">Core principle</span>
          CORE defines the system. Themes define the brand. Applications define the product — the three layers are never mixed.
        </div>
      </div>
    </div>
  );
}
