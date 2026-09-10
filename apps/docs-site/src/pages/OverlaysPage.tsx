import React, { useState } from "react";
import { Preview } from "../Preview";
import { Anatomy, AnatomyLegend } from "../Anatomy";
import { Button, IconButton } from "../../../../packages/core/src/components/Button";
import { Modal, ConfirmDialog, Drawer, Tooltip, Popover, DropdownMenu } from "../../../../packages/core/src/components/Overlays";
import { HoverCard } from "../../../../packages/core/src/components/HoverCard";
import { Field, Input } from "../../../../packages/core/src/components/Field";
import { Select } from "../../../../packages/core/src/components/FormControls";
import { DescriptionList, Icon } from "../../../../packages/core/src/components/Primitives";

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
      <p className="site-section-sub">Traps focus, dims the page behind an overlay, closes on Escape or the overlay click.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button onClick={() => setModal(true)}>Open modal</Button>
        </Preview>
      </div>
      <p className="site-section-sub">
        <strong style={{ color: "var(--site-text)" }}>Responsive:</strong> the dimmed scrim carries edge padding
        (<code>space.4</code>) at every width, so on a phone the modal never touches the screen edge — it just
        gets closer to full-width as the viewport shrinks, capped at <code>max-width: 480px</code> on anything
        wider. Try it below ~400px wide.
      </p>
      <Modal open={modal} onClose={() => setModal(false)} title="Update beneficiary" actions={<><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button onClick={() => setModal(false)}>Save</Button></>}>
        This will replace your current primary beneficiary on file.
      </Modal>



      <h2 className="site-section-title" id="confirm-dialog">Confirmation dialog</h2>
      <p className="site-section-sub">A specialized Modal for destructive or hard-to-reverse actions — always names the consequence, never just "Are you sure?"</p>
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
      <p className="site-section-sub">Slides in from the edge, full-height, for filters or supplementary panels that don't need a form's dedicated slideover layout.</p>
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
      <p className="site-section-sub">
        <strong style={{ color: "var(--site-text)" }}>Responsive:</strong> the drawer itself is already{" "}
        <code>width: 90vw</code> capped, so on a phone it's nearly full-screen. Below <code>breakpoint.sm</code>{" "}
        (576px) the <code>aside</code> summary panel stops sitting beside the form — a side-by-side split has no
        room left once the drawer itself is only ~330px wide — and stacks full-width below it instead. This was
        a real bug (the aside used to get squeezed into the same row) fixed on the Responsive &amp; Mobile page.
      </p>
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
      <p className="site-section-sub">Brief, single line, appears on hover and keyboard focus alike.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Tooltip label="Your vested balance after employer match">
            <Button variant="secondary" size="sm">Vested balance ⓘ</Button>
          </Tooltip>
        </Preview>
      </div>



      <p className="site-section-sub">
        From an icon — the most common trigger in a dense form or table: a bare info glyph next to a label,
        never relying on the icon's shape alone to communicate its meaning (that's what the tooltip text is for).
      </p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            Vested balance
            <Tooltip label="The portion of employer contributions you keep if you leave today.">
              <IconButton variant="tertiary" size="sm" shape="circle" aria-label="What is vested balance?">
                <Icon name="fa-solid fa-circle-info" size="sm" />
              </IconButton>
            </Tooltip>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            Federal tax withholding
            <Tooltip label="20% is the IRS-mandated minimum for most retirement plan distributions.">
              <IconButton variant="tertiary" size="sm" shape="circle" aria-label="What is federal tax withholding?">
                <Icon name="fa-solid fa-circle-info" size="sm" />
              </IconButton>
            </Tooltip>
          </span>
        </Preview>
      </div>
      <p className="site-section-sub">
        The trigger is a real <code>IconButton</code> with its own <code>aria-label</code> naming the question being
        answered (not just "info") — so it's independently meaningful to a screen reader even before the tooltip
        text is announced, and keyboard-focusable/-triggerable like every other Tooltip trigger.
      </p>

      <h2 className="site-section-title" id="popover">Popover</h2>
      <p className="site-section-sub">Richer than a Tooltip: can hold links, buttons, or a small form; dismisses on outside click or Escape.</p>
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
              <div style={{ fontSize: "var(--core-font-size-sm, 14px)", minWidth: 100 }}>Popover on {pl}</div>
            </Popover>
          ))}
        </div>
      </div>

      <h2 className="site-section-title" id="hover-card">Hover card</h2>
      <p className="site-section-sub">Richer than a Tooltip — for a preview of an entity (fund, account, person) without navigating away.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <HoverCard trigger={<a href="#" style={{ color: "var(--core-color-action-tertiary-text)" }}>S&amp;P 500 Index Fund</a>} title="S&P 500 Index Fund (VFIAX)">
            Expense ratio 0.04% · 1-yr return +18.2% · $2.1B in this plan
          </HoverCard>
        </Preview>
      </div>

    </div>
  );
}
