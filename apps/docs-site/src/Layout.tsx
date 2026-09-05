import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const nav = [
  { group: "Get Started", links: [{ to: "/", label: "Overview" }] },
  {
    group: "Foundations",
    links: [
      { to: "/foundations/color", label: "Color" },
      { to: "/foundations/typography", label: "Typography" },
      { to: "/foundations/spacing", label: "Spacing & Sizing" },
      { to: "/foundations/radius-elevation", label: "Radius & Elevation" },
      { to: "/foundations/motion", label: "Motion" },
    ],
  },
  {
    group: "Components",
    links: [
      { to: "/components/actions", label: "Actions" },
      { to: "/components/forms", label: "Forms" },
      { to: "/components/data-display", label: "Data Display" },
      { to: "/components/disclosure", label: "Disclosure" },
      { to: "/components/navigation", label: "Navigation" },
      { to: "/components/feedback", label: "Feedback" },
      { to: "/components/overlays", label: "Overlays" },
    ],
  },
  {
    group: "System",
    links: [
      { to: "/patterns", label: "Patterns" },
      { to: "/themes", label: "Themes" },
      { to: "/accessibility", label: "Accessibility" },
    ],
  },
];

export default function Layout() {
  return (
    <div className="site-shell">
      <aside className="site-sidebar">
        <div className="site-logo"><span className="dot" /> CORE</div>
        {nav.map((g) => (
          <div className="site-nav-group" key={g.group}>
            <div className="site-nav-title">{g.group}</div>
            {g.links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => "site-nav-link" + (isActive ? " active" : "")}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        ))}
      </aside>
      <div className="site-main">
        <div className="site-topbar">
          <strong style={{ fontSize: 14 }}>CORE Design System</strong>
          <span style={{ fontSize: 12, color: "var(--site-text-faint)" }}>v0.1.0 · White-label foundation</span>
        </div>
        <div className="site-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
