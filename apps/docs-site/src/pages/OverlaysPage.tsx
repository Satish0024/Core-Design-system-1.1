import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { Button } from "../../../../packages/core/src/components/Button";
import { Modal, ConfirmDialog, Drawer, Tooltip, Popover, DropdownMenu } from "../../../../packages/core/src/components/Overlays";
import { HoverCard } from "../../../../packages/core/src/components/HoverCard";
import { Field, Input } from "../../../../packages/core/src/components/Field";
import { Select } from "../../../../packages/core/src/components/FormControls";
import { DescriptionList } from "../../../../packages/core/src/components/Primitives";
import { AutoAnatomy, AutoAnatomyLegend } from "../AutoAnatomy";

export default function OverlaysPage() {
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [slideover, setSlideover] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  return (
    <div>
      <h1 className="site-h1">Modal, Drawer, Tooltip, Popover &amp; Confirmation</h1>
      <p className="site-lede">Overlays interrupt the current flow — used sparingly, always dismissible via Escape or an explicit action.</p>

      <h2 className="site-section-title" id="modal">Modal</h2>
      <p className="site-section-sub">Anatomy — traps focus, dims the page behind an overlay, closes on Escape or the overlay click.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Title — 18px/600, focus lands here on open", anchor: "top" },
          { n: 2, label: "Actions — right-aligned, Cancel before Save", anchor: "bottom" },
          { n: 3, label: "Elevation — shadow.xl above a dimmed overlay", anchor: "right" },
        ]}>
          <div style={{ width: 320, borderRadius: 12, background: "var(--core-color-bg-surface)", boxShadow: "var(--core-shadow-xl, 0 20px 40px rgba(0,0,0,0.2))", padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Update beneficiary</div>
            <div style={{ fontSize: 14, color: "var(--core-color-text-secondary)", marginBottom: 16 }}>This will replace your current primary beneficiary.</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="secondary" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </div>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Title: 18px/600, receives focus first (role=\"dialog\" aria-modal)", anchor: "top" },
          { n: 2, label: "Actions: right-aligned, Cancel/secondary before Save/primary", anchor: "bottom" },
          { n: 3, label: "Elevation: shadow.xl, sits above a dimmed page overlay", anchor: "right" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button onClick={() => setModal(true)}>Open modal</Button>
        </Preview>
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title="Update beneficiary" actions={<><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button onClick={() => setModal(false)}>Save</Button></>}>
        This will replace your current primary beneficiary on file.
      </Modal>

      <h2 className="site-section-title" id="confirm-dialog">Confirmation dialog</h2>
      <p className="site-section-sub">Anatomy — a specialized Modal for destructive or hard-to-reverse actions — always names the consequence, never just "Are you sure?"</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Description — names the exact consequence", anchor: "top" },
          { n: 2, label: "Confirm button — destructive tone, never labeled just \"OK\"", anchor: "bottom-right" },
        ]}>
          <div style={{ width: 300, borderRadius: 12, background: "var(--core-color-bg-surface)", boxShadow: "var(--core-shadow-xl, 0 20px 40px rgba(0,0,0,0.2))", padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Delete this account?</div>
            <div style={{ fontSize: 14, color: "var(--core-color-text-secondary)", marginBottom: 16 }}>This permanently removes the account and cannot be undone.</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="secondary" size="sm">Cancel</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Description: states the exact, irreversible consequence in plain language", anchor: "top" },
          { n: 2, label: "Confirm: destructive-tone button, labeled with the verb (\"Delete\"), never bare \"OK\"", anchor: "bottom-right" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button variant="destructive" onClick={() => setConfirm(true)}>Delete account</Button>
        </Preview>
      </div>
      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => setConfirm(false)}
        title="Delete this account?"
        description="This permanently removes the account and cannot be undone."
        danger
      />

      <h2 className="site-section-title" id="drawer">Drawer</h2>
      <p className="site-section-sub">Anatomy — slides in from the edge, full-height, for filters or supplementary panels that don't need a form's dedicated slideover layout.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Slide-in edge — right by default, full viewport height", anchor: "right" },
          { n: 2, label: "Header — title + close button, sticky while scrolling", anchor: "top" },
        ]}>
          <div style={{ width: 220, height: 260, borderRadius: "12px 0 0 12px", background: "var(--core-color-bg-surface)", boxShadow: "var(--core-shadow-xl, -12px 0 32px rgba(0,0,0,0.15))", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
              <span>Filter transactions</span><span aria-hidden="true">✕</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Filter controls go here.</div>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Slide-in edge: right by default (configurable), full viewport height", anchor: "right" },
          { n: 2, label: "Header: title + close button, sticky at top while body scrolls", anchor: "top" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button variant="secondary" onClick={() => setDrawer(true)}>Open filters</Button>
        </Preview>
      </div>
      <Drawer open={drawer} onClose={() => setDrawer(false)} title="Filter transactions">
        <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Filter controls would go here.</p>
      </Drawer>

      <h2 className="site-section-title" id="slideover">Slideover (form panel)</h2>
      <p className="site-section-sub">
        The same <code>Drawer</code> component with two extra slots: <code>actions</code> (Cancel/Save inline
        with the title) and <code>aside</code> (a summary panel alongside the form) — the pattern used for
        "Add Allocation"-style transaction forms.
      </p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button onClick={() => setSlideover(true)}>Open "Add Allocation"</Button>
        </Preview>
      </div>
      <Drawer
        open={slideover}
        onClose={() => setSlideover(false)}
        title="Add Allocation"
        width={520}
        actions={<>
          <Button variant="secondary" size="sm" onClick={() => setSlideover(false)}>Cancel</Button>
          <Button size="sm" onClick={() => setSlideover(false)}>Save</Button>
        </>}
        aside={
          <DescriptionList
            orientation="inline"
            items={[
              { term: "Requested amount", value: "$0.00" },
              { term: "Tax deduction", value: "$0.00" },
              { term: "Withdrawal fee", value: "0%" },
              { term: "Federal tax", value: "20%" },
              { term: "Gross amount", value: "$0.00" },
            ]}
          />
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Recipient name">{(p) => <Input {...p} placeholder="e.g. Taylor Hale" />}</Field>
          <Field label="Distribution mode">{(p) => <Select {...p} options={[{ value: "", label: "Select" }, { value: "lump", label: "Lump sum" }, { value: "installments", label: "Installments" }]} />}</Field>
          <Field label="Withdrawal amount">{(p) => <Input {...p} placeholder="$0.00" />}</Field>
        </div>
      </Drawer>

      <h2 className="site-section-title" id="dropdown-menu">Dropdown menu</h2>
      <p className="site-section-sub">Anatomy — a real trigger button; the menu itself is a mock here since it only renders while open.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Item — 36px min height, left-aligned label", anchor: "top" },
          { n: 2, label: "Danger item — separated, distinct color", anchor: "bottom" },
        ]}>
          <div style={{ width: 200, borderRadius: 8, background: "var(--core-color-bg-surface)", boxShadow: "var(--core-shadow-md, 0 8px 24px rgba(0,0,0,0.15))", padding: 6 }}>
            <div style={{ padding: "8px 10px", fontSize: 14, borderRadius: 6 }}>View details</div>
            <div style={{ padding: "8px 10px", fontSize: 14, borderRadius: 6 }}>Download statement</div>
            <div style={{ height: 1, background: "var(--core-color-border-subtle, #e5e7eb)", margin: "4px 0" }} />
            <div style={{ padding: "8px 10px", fontSize: 14, borderRadius: 6, color: "var(--core-color-action-destructive-bg)" }}>Close account</div>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Item: 36px min-height touch target, left-aligned, role=\"menuitem\"", anchor: "top" },
          { n: 2, label: "Danger item: separated by a divider, distinct destructive color", anchor: "bottom" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <DropdownMenu
            trigger={<Button variant="secondary">Row actions ▾</Button>}
            items={[
              { label: "View details" },
              { label: "Download statement", separatorAfter: true },
              { label: "Show balances", type: "checkbox", checked: showBalances, onCheckedChange: setShowBalances },
              {
                label: "Sort by",
                type: "submenu",
                items: [
                  { label: "Newest first", type: "radio", checked: sortOrder === "newest", onSelect: () => setSortOrder("newest") },
                  { label: "Oldest first", type: "radio", checked: sortOrder === "oldest", onSelect: () => setSortOrder("oldest") },
                ],
                separatorAfter: true,
              },
              { label: "Close account", danger: true },
            ]}
          />
        </Preview>
      </div>

      <h2 className="site-section-title" id="tooltip">Tooltip</h2>
      <p className="site-section-sub">Anatomy — brief, single line, appears on hover and keyboard focus alike.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Body — single short line, no interactive content", anchor: "top" },
          { n: 2, label: "Arrow — points to the trigger's center", anchor: "bottom" },
        ]}>
          <div style={{ borderRadius: 6, background: "var(--core-color-text-primary)", color: "var(--core-color-bg-surface)", fontSize: 12, padding: "6px 10px" }}>
            Your vested balance after employer match
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Body: brief single line, plain text only — no links or buttons inside", anchor: "top" },
          { n: 2, label: "Arrow: small triangle pointing to the trigger element's center", anchor: "bottom" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Tooltip label="Your vested balance after employer match">
            <Button variant="secondary" size="sm">Vested balance ⓘ</Button>
          </Tooltip>
        </Preview>
      </div>

      <h2 className="site-section-title" id="popover">Popover</h2>
      <p className="site-section-sub">Anatomy — richer than a Tooltip: can hold links, buttons, or a small form; dismisses on outside click or Escape.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Content — can hold links, buttons, small forms", anchor: "top" },
          { n: 2, label: "Placement — flips to whichever side fits the viewport", anchor: "right" },
        ]}>
          <div style={{ width: 200, borderRadius: 8, background: "var(--core-color-bg-surface)", boxShadow: "var(--core-shadow-md, 0 8px 24px rgba(0,0,0,0.15))", padding: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
            <a href="#" style={{ color: "var(--core-color-text-primary)", textDecoration: "none" }}>Download statement</a>
            <a href="#" style={{ color: "var(--core-color-action-destructive-bg)", textDecoration: "none" }}>Close account</a>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Content: can hold links, buttons, or a small form — unlike Tooltip", anchor: "top" },
          { n: 2, label: "Placement: auto-flips top/right/bottom/left to stay within the viewport", anchor: "right" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Popover trigger={<Button variant="secondary">Account actions</Button>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <a href="#" style={{ color: "var(--core-color-text-primary)", textDecoration: "none" }}>Download statement</a>
              <a href="#" style={{ color: "var(--core-color-text-primary)", textDecoration: "none" }}>Update contact info</a>
              <a href="#" style={{ color: "var(--core-color-action-destructive-bg)", textDecoration: "none" }}>Close account</a>
            </div>
          </Popover>
        </Preview>
      </div>
      <p className="site-section-sub">Placement — flips to whichever side fits (top/right/bottom/left):</p>
      <div className="site-panel site-panel--flush">
        <div className="preview-surface" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", padding: 60 }}>
          {(["top", "right", "bottom", "left"] as const).map((pl) => (
            <Popover key={pl} placement={pl} trigger={<Button variant="secondary" size="sm">{pl}</Button>}>
              <div style={{ fontSize: 13, minWidth: 100 }}>Popover on {pl}</div>
            </Popover>
          ))}
        </div>
      </div>

      <h2 className="site-section-title" id="hover-card">Hover card</h2>
      <p className="site-section-sub">Anatomy — richer than a Tooltip — for a preview of an entity (fund, account, person) without navigating away.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Title — entity name, bold, 14px", anchor: "top" },
          { n: 2, label: "Delayed open — ~400ms hover delay, unlike Tooltip", anchor: "bottom" },
        ]}>
          <div style={{ width: 240, borderRadius: 8, background: "var(--core-color-bg-surface)", boxShadow: "var(--core-shadow-md, 0 8px 24px rgba(0,0,0,0.15))", padding: 14 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>S&amp;P 500 Index Fund (VFIAX)</div>
            <div style={{ fontSize: 13, color: "var(--core-color-text-secondary)" }}>Expense ratio 0.04% · 1-yr return +18.2%</div>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Title: bold 14px entity name, always present unlike a plain Tooltip", anchor: "top" },
          { n: 2, label: "Open delay: ~400ms hover delay avoids flashing on incidental mouse pass-through", anchor: "bottom" },
        ]} />
      </div>
      <div className="site-panel site-panel--flush">
        <Preview>
          <HoverCard trigger={<a href="#" style={{ color: "var(--core-color-action-tertiary-text)" }}>S&amp;P 500 Index Fund</a>} title="S&P 500 Index Fund (VFIAX)">
            Expense ratio 0.04% · 1-yr return +18.2% · $2.1B in this plan
          </HoverCard>
        </Preview>
      </div>

      <h2 className="site-section-title">Accessibility</h2>
      <ul style={{ color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
        <li>Modal and Drawer use <code>role="dialog"</code> + <code>aria-modal="true"</code>, move focus in on open, and close on Escape.</li>
        <li>Confirmation dialogs always state the consequence in the title/description — never rely on button color alone.</li>
        <li>Tooltip content is also exposed on keyboard focus, not just mouse hover.</li>
      </ul>

      <h2 className="site-section-title">Code</h2>
      <CodeBlock>{`<ConfirmDialog
  open={open}
  onConfirm={onDelete}
  onClose={onClose}
  title="Delete this account?"
  description="This permanently removes the account and cannot be undone."
  danger
/>`}</CodeBlock>
    </div>
  );
}
