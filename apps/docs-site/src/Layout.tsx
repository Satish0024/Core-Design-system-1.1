import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CoreLogo } from "./CoreLogo";

const nav = [
  { group: "Get Started", links: [{ to: "/", label: "Overview" }] },
  {
    group: "Foundations",
    links: [
      { to: "/foundations/logo", label: "Logo" },
      { to: "/foundations/color", label: "Color" },
      { to: "/foundations/typography", label: "Typography" },
      { to: "/foundations/spacing", label: "Spacing & Sizing" },
      { to: "/foundations/radius-elevation", label: "Radius & Elevation" },
      { to: "/foundations/responsive", label: "Responsive & Mobile" },
      { to: "/foundations/icons", label: "Icons" },
      { to: "/foundations/motion", label: "Motion" },
    ],
  },
  {
    group: "Layout",
    links: [
      { to: "/foundations/layout-grid#header", label: "App Header" },
      { to: "/foundations/layout-grid#footer", label: "App Footer" },
      { to: "/foundations/layout-grid#sidebar-variants", label: "App Shell (Sidebar)" },
      { to: "/foundations/layout-grid#grid", label: "Grid & Container" },
    ],
  },
  {
    group: "Actions",
    links: [
      { to: "/components/actions#button", label: "Button" },
      { to: "/components/actions#icon-button", label: "Icon Button" },
      { to: "/components/actions#link", label: "Link" },
      { to: "/components/actions#button-group", label: "Button Group" },
    ],
  },
  {
    group: "Forms",
    links: [
      { to: "/components/forms#input", label: "Input" },
      { to: "/components/forms#textarea", label: "Textarea" },
      { to: "/components/forms#select", label: "Select" },
      { to: "/components/forms#checkbox-radio", label: "Checkbox / Radio" },
      { to: "/components/forms#switch", label: "Switch" },
      { to: "/components/forms#toggle", label: "Toggle / Toggle Group" },
      { to: "/components/forms#input-group", label: "Input Group" },
      { to: "/components/forms#input-otp", label: "Input OTP" },
      { to: "/components/forms#slider", label: "Slider" },
      { to: "/components/forms#combobox", label: "Combobox" },
      { to: "/components/forms#date-picker", label: "Date Picker" },
      { to: "/components/forms#calendar", label: "Calendar" },
      { to: "/components/forms#attachment", label: "Attachment" },
      { to: "/components/forms#input-icon", label: "Input (with icon)" },
      { to: "/components/forms#payment-bank-fields", label: "Payment & Bank Fields" },
    ],
  },
  {
    group: "Data Display",
    links: [
      { to: "/components/data-display#card", label: "Card" },
      { to: "/components/data-display#badge", label: "Badge" },
      { to: "/components/data-display#data-table", label: "Data Table" },
      { to: "/components/data-display#table", label: "Table" },
      { to: "/components/data-display#item", label: "Item" },
      { to: "/components/data-display#avatar", label: "Avatar" },
      { to: "/components/data-display#progress", label: "Progress" },
      { to: "/components/data-display#aspect-ratio", label: "Aspect Ratio" },
    ],
  },
  {
    group: "Charts",
    links: [
      { to: "/components/charts#line-chart", label: "Line Chart" },
      { to: "/components/charts#bar-chart", label: "Bar Chart" },
    ],
  },
  {
    group: "Disclosure",
    links: [
      { to: "/components/disclosure#collapsible", label: "Collapsible" },
      { to: "/components/disclosure#accordion", label: "Accordion" },
      { to: "/components/disclosure#separator", label: "Separator" },
      { to: "/components/disclosure#skeleton", label: "Skeleton" },
    ],
  },
  {
    group: "Navigation",
    links: [
      { to: "/components/navigation#navigation-menu", label: "Navigation Menu" },
      { to: "/components/navigation#sidebar", label: "Sidebar" },
      { to: "/components/navigation#tabs", label: "Tabs" },
      { to: "/components/data-display#description-list", label: "Description List" },
      { to: "/components/navigation#breadcrumb", label: "Breadcrumb" },
      { to: "/components/navigation#stepper", label: "Stepper" },
      { to: "/components/navigation#pagination", label: "Pagination" },
    ],
  },
  {
    group: "Feedback",
    links: [
      { to: "/components/feedback#alert", label: "Alert" },
      { to: "/components/feedback#toast", label: "Toast" },
      { to: "/components/feedback#toast-manager", label: "Toast Manager" },
      { to: "/components/feedback#empty", label: "Empty" },
      { to: "/components/feedback#spinner", label: "Spinner" },
    ],
  },
  {
    group: "Overlays",
    links: [
      { to: "/components/overlays#modal", label: "Modal" },
      { to: "/components/overlays#confirm-dialog", label: "Confirmation Dialog" },
      { to: "/components/overlays#drawer", label: "Drawer" },
      { to: "/components/overlays#slideover", label: "Slideover" },
      { to: "/components/overlays#dropdown-menu", label: "Dropdown Menu" },
      { to: "/components/overlays#tooltip", label: "Tooltip" },
      { to: "/components/overlays#popover", label: "Popover" },
      { to: "/components/overlays#hover-card", label: "Hover Card" },
    ],
  },
  {
    group: "System",
    links: [
      { to: "/patterns", label: "Patterns" },
      { to: "/components/questionnaire", label: "Questionnaire" },
      { to: "/screens", label: "Screens" },
      { to: "/tokens", label: "Tokens (SCSS)" },
      { to: "/accessibility", label: "Accessibility" },
    ],
  },
];

// Scrolls to the element matching the URL's fragment-after-fragment (HashRouter already
// owns the first #, so component anchors are the SECOND #, e.g. #/components/forms#input).
function useAnchorScroll() {
  const location = useLocation();
  React.useEffect(() => {
    const raw = window.location.href;
    const parts = raw.split("#");
    const anchor = parts.length > 2 ? parts[2] : undefined;
    const t = setTimeout(() => {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo(0, 0);
    }, 60);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);
}

function useSiteMode() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-site-mode");
      if (attr === "light" || attr === "dark") return attr;
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-site-mode", mode);
    try { localStorage.setItem("core-site-mode", mode); } catch {}
  }, [mode]);

  return { mode, toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")) };
}

// A link is only "active" when both its pathname AND its hash (when it has
// one) match the current location. Plain react-router `NavLink` only ever
// compares pathname — every `#anchor` link sharing a page (e.g. all of
// Overlays' Modal/Drawer/Popover/… links, which all point at
// /components/overlays with a different hash each) would light up together,
// since none of them differ by pathname. That was a real, reproduced bug.
function isNavLinkActive(to: string, pathname: string, hash: string) {
  const hashIndex = to.indexOf("#");
  const toPath = hashIndex === -1 ? to : to.slice(0, hashIndex);
  const toHash = hashIndex === -1 ? "" : to.slice(hashIndex);
  if (pathname !== toPath) return false;
  return toHash ? hash === toHash : true;
}

/** Flat, ordered list of unique pages derived from the sidebar `nav` array.
 *  Hash-anchored links (e.g. /components/forms#input) collapse into a single
 *  entry per pathname, labelled by the group name when a page hosts multiple
 *  sections, or by the link label when it's a standalone page. */
const pages: { path: string; label: string }[] = (() => {
  const seen = new Set<string>();
  const list: { path: string; label: string }[] = [];
  for (const group of nav) {
    for (const link of group.links) {
      const hashIdx = link.to.indexOf("#");
      const pathname = hashIdx === -1 ? link.to : link.to.slice(0, hashIdx);
      if (seen.has(pathname)) continue;
      seen.add(pathname);
      const linksForPath = group.links.filter((l) => {
        const hi = l.to.indexOf("#");
        return (hi === -1 ? l.to : l.to.slice(0, hi)) === pathname;
      });
      list.push({ path: pathname, label: linksForPath.length > 1 ? group.group : link.label });
    }
  }
  return list;
})();

function PageNavigation() {
  const location = useLocation();
  const currentIdx = pages.findIndex((p) => p.path === location.pathname);
  const prev = currentIdx > 0 ? pages[currentIdx - 1] : null;
  const next = currentIdx >= 0 && currentIdx < pages.length - 1 ? pages[currentIdx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="page-nav" aria-label="Page navigation">
      {prev ? (
        <Link to={prev.path} className="page-nav-link page-nav-prev">
          <span className="page-nav-dir">← Previous</span>
          <span className="page-nav-label">{prev.label}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link to={next.path} className="page-nav-link page-nav-next">
          <span className="page-nav-dir">Next →</span>
          <span className="page-nav-label">{next.label}</span>
        </Link>
      ) : <span />}
    </nav>
  );
}

export default function Layout() {
  useAnchorScroll();
  const { mode, toggle } = useSiteMode();
  const location = useLocation();
  return (
    // data-theme/data-mode here is what makes every CORE component actually
    // themed by default — --core-* custom properties only exist inside a
    // [data-theme][data-mode] scope, nothing falls back to a bare :root.
    // Individual demo boxes set their own data-theme/data-mode explicitly
    // (to force a specific mode for a side-by-side comparison, say), but any
    // *real* interactive component rendered outside one of those boxes — the
    // live Modal/Drawer/Toast a page's own "Open modal" button toggles, for
    // instance, not the static AutoAnatomy mockup above it — had no themed
    // ancestor at all and rendered with zero styling, plain browser defaults.
    // This is unrelated to the site's own light/dark chrome toggle
    // ([data-site-mode] on <html>, driven by useSiteMode() below) — that's a
    // separate --site-* variable system for the docs UI itself.
    <div className="site-shell" data-theme="core" data-mode="light">
      <aside className="site-sidebar">
        <div className="site-logo"><CoreLogo size={22} /></div>
        {nav.map((g) => (
          <div className="site-nav-group" key={g.group}>
            <div className="site-nav-title">{g.group}</div>
            {g.links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={"site-nav-link" + (isNavLinkActive(l.to, location.pathname, location.hash) ? " active" : "")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </aside>
      <div className="site-main">
        <div className="site-topbar">
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--site-text)" }}>Participant Portal</span>
          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 12, color: "var(--site-text-faint)" }}>v0.1.0 · White-label foundation</span>
            <button
              type="button"
              className="icon-toggle"
              onClick={toggle}
              aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mode === "dark" ? "☀" : "☾"}
            </button>
          </span>
        </div>
        <div className="site-content">
          <Outlet />
          <PageNavigation />
        </div>
        <footer className="site-footer">
          <div className="site-footer-inner">
            <div className="site-footer-left">
              <CoreLogo size={16} />
              <span>© {new Date().getFullYear()} CORE Design System</span>
            </div>
            <div className="site-footer-right">
              <span>v0.1.0</span>
              <span className="site-footer-sep">·</span>
              <span>White-label foundation</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
