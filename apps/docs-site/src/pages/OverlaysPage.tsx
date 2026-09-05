import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { Button } from "../../../../packages/core/src/components/Button";
import { Modal, ConfirmDialog, Drawer, Tooltip, Popover, DropdownMenu } from "../../../../packages/core/src/components/Overlays";
import { HoverCard } from "../../../../packages/core/src/components/HoverCard";

export default function OverlaysPage() {
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  return (
    <div>
      <h1 className="site-h1">Modal, Drawer, Tooltip, Popover &amp; Confirmation</h1>
      <p className="site-lede">Overlays interrupt the current flow — used sparingly, always dismissible via Escape or an explicit action.</p>

      <h2 className="site-section-title" id="modal">Modal</h2>
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button onClick={() => setModal(true)}>Open modal</Button>
        </Preview>
      </div>
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
      <div className="site-panel site-panel--flush">
        <Preview>
          <Button variant="secondary" onClick={() => setDrawer(true)}>Open filters</Button>
        </Preview>
      </div>
      <Drawer open={drawer} onClose={() => setDrawer(false)} title="Filter transactions">
        <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Filter controls would go here.</p>
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
      <div className="site-panel site-panel--flush">
        <Preview>
          <Tooltip label="Your vested balance after employer match">
            <Button variant="secondary" size="sm">Vested balance ⓘ</Button>
          </Tooltip>
        </Preview>
      </div>

      <h2 className="site-section-title" id="popover">Popover</h2>
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
      <p className="site-section-sub">Richer than a Tooltip — for a preview of an entity (fund, account, person) without navigating away.</p>
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
