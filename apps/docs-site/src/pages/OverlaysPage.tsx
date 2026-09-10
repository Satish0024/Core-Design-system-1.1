import React, { useState } from "react";
import { Preview } from "../Preview";
import { DocsSection, DocsSectionList } from "../DocsSection";
import { Button, IconButton } from "../../../../packages/core/src/components/Button";
import { Modal, ConfirmDialog, Drawer, Tooltip, DropdownMenu } from "../../../../packages/core/src/components/Overlays";
import { HoverCard } from "../../../../packages/core/src/components/HoverCard";
import { Field, Input } from "../../../../packages/core/src/components/Field";
import { Select } from "../../../../packages/core/src/components/FormControls";
import { ChevronIcon, DescriptionList, Icon } from "../../../../packages/core/src/components/Primitives";

export default function OverlaysPage({ embedded = false }: { embedded?: boolean }) {
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [slideover, setSlideover] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sections = (
    <DocsSectionList>
      <DocsSection anchorId="modal" title="Modal">
        <div className="site-panel site-panel--flush">
          <Preview>
            <Button onClick={() => setModal(true)}>Open modal</Button>
          </Preview>
        </div>
        <Modal open={modal} onClose={() => setModal(false)} title="Update beneficiary" actions={<><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button onClick={() => setModal(false)}>Save</Button></>}>
          This will replace your current primary beneficiary on file.
        </Modal>
      </DocsSection>

      <DocsSection anchorId="confirm-dialog" title="Confirmation dialog">
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
      </DocsSection>

      <DocsSection anchorId="drawer" title="Drawer">
        <div className="site-panel site-panel--flush">
          <Preview>
            <Button variant="secondary" onClick={() => setDrawer(true)}>Open filters</Button>
          </Preview>
        </div>
        <Drawer open={drawer} onClose={() => setDrawer(false)} title="Filter transactions">
          <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Filter controls would go here.</p>
        </Drawer>
      </DocsSection>

      <DocsSection anchorId="slideover" title="Slideover (form panel)">
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
      </DocsSection>

      <DocsSection anchorId="dropdown-menu" title="Dropdown menu">
        <div className="site-panel site-panel--flush">
          <Preview>
            <DropdownMenu
              trigger={<Button variant="secondary"><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Row actions <ChevronIcon size={12} /></span></Button>}
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
      </DocsSection>

      <DocsSection anchorId="tooltip" title="Tooltip">
        <div className="site-panel site-panel--flush">
          <Preview>
            <Tooltip label="Your vested balance after employer match">
              <Button variant="secondary" size="sm">Vested balance ⓘ</Button>
            </Tooltip>
          </Preview>
        </div>
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
      </DocsSection>

      <DocsSection anchorId="hover-card" title="Hover card">
        <div className="site-panel site-panel--flush">
          <Preview>
            <HoverCard trigger={<a href="#" style={{ color: "var(--core-color-action-tertiary-text)" }}>S&amp;P 500 Index Fund</a>} title="S&P 500 Index Fund (VFIAX)">
              Expense ratio 0.04% · 1-yr return +18.2% · $2.1B in this plan
            </HoverCard>
          </Preview>
        </div>
      </DocsSection>
    </DocsSectionList>
  );

  if (embedded) return sections;

  return (
    <div>
      <h1 className="site-h1">Modal, Drawer, Tooltip &amp; Confirmation</h1>
      <p className="site-lede">Overlays interrupt the current flow — used sparingly, always dismissible via Escape or an explicit action.</p>
      {sections}
    </div>
  );
}
