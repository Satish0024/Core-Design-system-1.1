import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="hero" aria-labelledby="hero-heading">
        <img
          className="hero-art"
          src={`${import.meta.env.BASE_URL}hero-core.jpg`}
          alt=""
          aria-hidden="true"
          draggable="false"
        />
        <div className="hero-copy">
          <p className="hero-eyebrow">Our Digital Foundation</p>
          <h1 id="hero-heading">Built once. Used across everything.</h1>
          <p>
            A unified design system that gives our teams a shared foundation for
            creating and evolving digital products across the company.
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
        The LendGuard participant portal, built entirely from CORE components and tokens — not a mockup.
      </p>
      <div className="site-panel site-panel--flush" style={{ overflow: "hidden" }}>
        <video
          className="home-preview-video"
          src={`${import.meta.env.BASE_URL}video/dashboard-preview.mp4`}
          autoPlay
          loop
          muted
          playsInline
          controls
          style={{ display: "block", width: "100%", height: "auto" }}
        >
          Your browser doesn't support embedded video. <a href={`${import.meta.env.BASE_URL}video/dashboard-preview.mp4`}>Download the preview</a> instead.
        </video>
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
