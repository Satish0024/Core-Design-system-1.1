import React, { useState } from "react";
import { AppShell, Container, Grid, GridCol } from "../../../../packages/core/src/components/Layout";
import { AppSidebar, Breadcrumb, Stepper } from "../../../../packages/core/src/components/Navigation";
import { Button, IconButton } from "../../../../packages/core/src/components/Button";
import { Card, Badge } from "../../../../packages/core/src/components/Misc";
import { Avatar, DataTable, Progress } from "../../../../packages/core/src/components/DataDisplay";
import { Field, Input } from "../../../../packages/core/src/components/Field";
import { Select } from "../../../../packages/core/src/components/FormControls";
import { Icon, DescriptionList } from "../../../../packages/core/src/components/Primitives";
import { Drawer } from "../../../../packages/core/src/components/Overlays";
import { AutoAnatomy, AutoAnatomyLegend } from "../AutoAnatomy";

const NAV_ITEMS = [
  { label: "Dashboard", icon: <Icon name="fa-solid fa-grip" size="sm" />, current: true },
  { label: "Investment Portfolio", icon: <Icon name="fa-solid fa-wallet" size="sm" /> },
  { label: "Transactions", icon: <Icon name="fa-solid fa-right-left" size="sm" /> },
  { label: "My Profile", icon: <Icon name="fa-solid fa-user" size="sm" /> },
  { label: "Document Center", icon: <Icon name="fa-solid fa-file-lines" size="sm" /> },
];

function ScreenHeader({ userName }: { userName: string }) {
  return (
    <>
      <div style={{ fontWeight: 700, fontSize: "var(--core-font-size-lg)" }}>LendGuard</div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--core-space-4)" }}>
        <IconButton variant="tertiary" size="sm" aria-label="Help"><Icon name="fa-solid fa-circle-question" size="sm" /></IconButton>
        <Avatar name={userName} size="sm" />
      </div>
    </>
  );
}

function ScreenFooter() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <span>© {new Date().getFullYear()} LendGuard. All rights reserved.</span>
      <span style={{ display: "flex", gap: "var(--core-space-4)" }}>
        <a href="#" style={{ color: "inherit" }}>Privacy</a>
        <a href="#" style={{ color: "inherit" }}>Terms</a>
        <a href="#" style={{ color: "inherit" }}>Support</a>
      </span>
    </div>
  );
}

interface Txn { id: string; date: string; description: string; type: string; amount: string; status: string; }
const TRANSACTIONS: Txn[] = [
  { id: "1", date: "Feb 28, 2026", description: "Employer Contribution", type: "Contribution", amount: "$208.00", status: "Posted" },
  { id: "2", date: "Feb 14, 2026", description: "My Deferral", type: "Contribution", amount: "$412.50", status: "Posted" },
  { id: "3", date: "Jan 31, 2026", description: "Loan Repayment", type: "Loan", amount: "$150.00", status: "Posted" },
  { id: "4", date: "Jan 15, 2026", description: "Rebalance — Target Date 2050", type: "Transfer", amount: "$0.00", status: "Pending" },
  { id: "5", date: "Dec 31, 2025", description: "Employer Match", type: "Contribution", amount: "$104.00", status: "Posted" },
];

export default function Screens() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(1);

  return (
    <div>
      <h1 className="site-h1">Screens</h1>
      <p className="site-lede">
        Full product screens assembled entirely from CORE components and tokens — the header, sidebar, footer and
        12-column grid are the same <code>AppShell</code>/<code>Grid</code> primitives on every screen, not
        hand-drawn per page. Anatomy pointers call out the structural regions.
      </p>

      {/* ============================= LOGIN ============================= */}
      <h2 className="site-section-title" id="login">Login</h2>
      <p className="site-section-sub">Anatomy — split layout: brand panel + a centered Card form, no app chrome (nothing to navigate yet).</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", overflowX: "auto" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Brand panel — tagline, 50% width on desktop", anchor: "left" },
          { n: 2, label: "Form card — centered, max-width column", anchor: "right" },
          { n: 3, label: "Primary action — full-width submit button", anchor: "bottom" },
        ]}>
          <Grid columns={2} gap="4" style={{ width: 720, minHeight: 380, borderRadius: "var(--core-card-radius)", overflow: "hidden", border: "1px solid var(--core-color-border-subtle)" }}>
            <div style={{ background: "var(--core-color-brand-600, var(--core-card-bg))", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--core-space-8)", gridColumn: "span 1" }}>
              <div style={{ fontWeight: 700, fontSize: "var(--core-font-size-xl)", marginBottom: "var(--core-space-3)" }}>LendGuard</div>
              <h2 style={{ fontSize: "var(--core-font-size-lg)", margin: 0 }}>Your retirement, on track.</h2>
              <p style={{ opacity: 0.85, fontSize: "var(--core-font-size-sm)" }}>Sign in to review your plans, contributions, and investment performance.</p>
            </div>
            <div style={{ background: "var(--core-card-bg)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--core-space-8)", gridColumn: "span 1" }}>
              <h2 style={{ marginTop: 0, fontSize: "var(--core-font-size-lg)" }}>Sign in</h2>
              <p style={{ fontSize: "var(--core-font-size-sm)", color: "var(--core-color-text-secondary)", marginBottom: "var(--core-space-4)" }}>Use your participant email to continue.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-4)" }}>
                <Field label="Email">{(p) => <Input {...p} type="email" placeholder="you@email.com" />}</Field>
                <Field label="Password">{(p) => <Input {...p} type="password" placeholder="Enter password" />}</Field>
                <Button style={{ width: "100%" }}>Sign in</Button>
              </div>
            </div>
          </Grid>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Brand panel: fills one Grid column, brand-600 background, tagline copy", anchor: "left" },
          { n: 2, label: "Form card: the other Grid column, vertically centered fields", anchor: "right" },
          { n: 3, label: "Primary action: full-width Button, the only Primary on the page", anchor: "bottom" },
        ]} />
      </div>

      {/* ============================= DASHBOARD ============================= */}
      <h2 className="site-section-title" id="dashboard">Dashboard</h2>
      <p className="site-section-sub">Anatomy — the standard AppShell: header, left AppSidebar, 12-column content Grid, footer.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", overflowX: "auto" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Header — brand + user, fixed height", anchor: "top" },
          { n: 2, label: "Sidebar — fixed width, primary navigation", anchor: "left" },
          { n: 3, label: "Content grid — 12 columns, gap.6 (24px)", anchor: "center", offset: 70 },
          { n: 4, label: "Footer — legal links, full width", anchor: "bottom" },
        ]}>
          <div style={{ width: 860 }}>
            <AppShell
              header={<ScreenHeader userName="Taylor Hale" />}
              sidebar={<AppSidebar items={NAV_ITEMS} />}
              footer={<ScreenFooter />}
            >
              <div style={{ fontSize: "var(--core-font-size-lg)", fontWeight: 700, marginBottom: "var(--core-space-4)" }}>Hi Taylor 👋</div>
              <Grid columns={12} gap="6">
                <GridCol span={12} spanMd={8}>
                  <Card style={{ marginBottom: "var(--core-space-6)" }}>
                    <div style={{ fontSize: "var(--core-font-size-sm)", color: "var(--core-color-text-secondary)" }}>Overall balance</div>
                    <div style={{ fontSize: "var(--core-font-size-xl)", fontWeight: 700 }}>$84,210.55</div>
                  </Card>
                  <Grid columns={2} gap="4">
                    <GridCol span={1}><Card><div style={{ fontWeight: 600 }}>401(k) Plan</div><div style={{ fontSize: "var(--core-font-size-sm)", color: "var(--core-color-text-secondary)" }}>$61,204.10</div></Card></GridCol>
                    <GridCol span={1}><Card><div style={{ fontWeight: 600 }}>Roth IRA</div><div style={{ fontSize: "var(--core-font-size-sm)", color: "var(--core-color-text-secondary)" }}>$23,006.45</div></Card></GridCol>
                  </Grid>
                </GridCol>
                <GridCol span={12} spanMd={4}>
                  <Card>
                    <div style={{ fontWeight: 600, marginBottom: "var(--core-space-2)" }}>Retirement readiness</div>
                    <Progress value={72} label="72% on track" />
                  </Card>
                </GridCol>
              </Grid>
            </AppShell>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Header: cds-app-header — brand left, account controls right", anchor: "top" },
          { n: 2, label: "Sidebar: cds-app-sidebar — fixed width, AppSidebar nav component", anchor: "left" },
          { n: 3, label: "Content: 12-column Grid, gap token space.6 (24px) between columns", anchor: "center" },
          { n: 4, label: "Footer: cds-app-footer — legal links, spans full width under the sidebar", anchor: "bottom" },
        ]} />
      </div>

      {/* ============================= TABLE SCREEN ============================= */}
      <h2 className="site-section-title" id="table-screen">Transactions (table screen)</h2>
      <p className="site-section-sub">Anatomy — same AppShell, main content is a searchable/filterable DataTable inside a Card.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", overflowX: "auto" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Breadcrumb — page location within the app", anchor: "top" },
          { n: 2, label: "Toolbar — search + filters, above the table", anchor: "left" },
          { n: 3, label: "Zebra rows — alternating background for scanability", anchor: "bottom" },
        ]}>
          <div style={{ width: 860 }}>
            <AppShell header={<ScreenHeader userName="Taylor Hale" />} sidebar={<AppSidebar items={[{ ...NAV_ITEMS[0], current: false }, NAV_ITEMS[1], { ...NAV_ITEMS[2], current: true }, NAV_ITEMS[3], NAV_ITEMS[4]]} />} footer={<ScreenFooter />}>
              <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Transactions" }]} />
              <div style={{ height: "var(--core-space-4)" }} />
              <Card>
                <DataTable<Txn>
                  columns={[
                    { key: "date", header: "Date", sortable: true },
                    { key: "description", header: "Description" },
                    { key: "type", header: "Type" },
                    { key: "amount", header: "Amount", sortable: true },
                    { key: "status", header: "Status", render: (r) => <Badge tone={r.status === "Posted" ? "success" : "warning"} size="sm">{r.status}</Badge> },
                  ]}
                  rows={TRANSACTIONS}
                  searchable
                  pageSize={5}
                />
              </Card>
            </AppShell>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Breadcrumb: nav aria-label=\"Breadcrumb\", marks current location", anchor: "top" },
          { n: 2, label: "Toolbar: search input + filter badges, sits above the table body", anchor: "left" },
          { n: 3, label: "Zebra: alternating row background — DataTable's `zebra` prop, on by default", anchor: "bottom" },
        ]} />
      </div>

      {/* ============================= STEPPER SCREEN ============================= */}
      <h2 className="site-section-title" id="stepper-screen">Withdrawal request (stepper screen)</h2>
      <p className="site-section-sub">Anatomy — multi-step flow: Stepper drives progress, form Fields fill the step body, actions sit bottom-right.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", overflowX: "auto" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Stepper — complete / current / upcoming states", anchor: "top" },
          { n: 2, label: "Step body — one Field group per step", anchor: "left" },
          { n: 3, label: "Step actions — Back / Continue, bottom-right", anchor: "bottom-right" },
        ]}>
          <div style={{ width: 860 }}>
            <AppShell header={<ScreenHeader userName="Taylor Hale" />} sidebar={<AppSidebar items={NAV_ITEMS} />} footer={<ScreenFooter />}>
              <Card>
                <Stepper
                  currentIndex={stepIndex}
                  steps={[{ label: "Withdrawal Details" }, { label: "Allocation" }, { label: "Review & Submit" }]}
                />
                <div style={{ margin: "var(--core-space-6) 0" }}>
                  {stepIndex === 0 && (
                    <Grid columns={2} gap="4">
                      <GridCol span={1}><Field label="Withdrawal type">{(p) => <Select {...p} options={[{ value: "hardship", label: "Hardship" }, { value: "inservice", label: "In-service" }]} />}</Field></GridCol>
                      <GridCol span={1}><Field label="Amount">{(p) => <Input {...p} placeholder="$0.00" />}</Field></GridCol>
                    </Grid>
                  )}
                  {stepIndex === 1 && (
                    <DescriptionList orientation="inline" items={[
                      { term: "Requested amount", value: "$5,000.00" },
                      { term: "Federal tax withholding", value: "20%" },
                      { term: "Net amount", value: "$4,000.00" },
                    ]} />
                  )}
                  {stepIndex === 2 && <p style={{ fontSize: "var(--core-font-size-sm)", color: "var(--core-color-text-secondary)" }}>Review your request above, then submit.</p>}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--core-space-2)" }}>
                  <Button variant="secondary" size="sm" onClick={() => setStepIndex((i) => Math.max(0, i - 1))} disabled={stepIndex === 0}>Back</Button>
                  <Button size="sm" onClick={() => setStepIndex((i) => Math.min(2, i + 1))} disabled={stepIndex === 2}>Continue</Button>
                </div>
              </Card>
            </AppShell>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Stepper: complete (check) / current (bold, aria-current) / upcoming (dim) states", anchor: "top" },
          { n: 2, label: "Step body: swaps per step, laid out with the same Grid/Field primitives", anchor: "left" },
          { n: 3, label: "Actions: Back (Secondary) / Continue (Primary), bottom-right of the card", anchor: "bottom-right" },
        ]} />
      </div>

      {/* ============================= SLIDEOVER SCREEN ============================= */}
      <h2 className="site-section-title" id="slideover-screen">Add allocation (slideover open)</h2>
      <p className="site-section-sub">Anatomy — the Drawer overlays the dimmed page, docked to the right edge, full viewport height.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", overflowX: "auto" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Dimmed page — background remains visible but inert", anchor: "left" },
          { n: 2, label: "Slideover — docked right, form + aside summary", anchor: "right" },
        ]}>
          <div style={{ width: 860, position: "relative" }}>
            <AppShell header={<ScreenHeader userName="Taylor Hale" />} sidebar={<AppSidebar items={NAV_ITEMS} />} footer={<ScreenFooter />}>
              <div style={{ fontSize: "var(--core-font-size-lg)", fontWeight: 700, marginBottom: "var(--core-space-4)" }}>Hi Taylor 👋</div>
              <Button onClick={() => setDrawerOpen(true)}>Open "Add Allocation"</Button>
            </AppShell>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 320, background: "var(--core-card-bg)", boxShadow: "var(--core-elevation-4)", padding: "var(--core-space-6)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--core-space-4)" }}>
                <div style={{ fontWeight: 600, fontSize: "var(--core-font-size-lg)" }}>Add Allocation</div>
                <IconButton variant="tertiary" size="sm" aria-label="Close"><Icon name="fa-solid fa-xmark" size="sm" /></IconButton>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--core-space-4)" }}>
                <Field label="Withdrawal amount">{(p) => <Input {...p} placeholder="$0.00" />}</Field>
                <DescriptionList items={[{ term: "Gross amount", value: "$0.00" }, { term: "Federal tax", value: "20%" }]} />
                <div style={{ display: "flex", gap: "var(--core-space-2)", justifyContent: "flex-end" }}>
                  <Button variant="secondary" size="sm">Cancel</Button>
                  <Button size="sm">Save</Button>
                </div>
              </div>
            </div>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Overlay: dims but doesn't remove the page — dismissible via Escape/outside click", anchor: "left" },
          { n: 2, label: "Slideover: docked right, elevation.4, form fields + a summary DescriptionList", anchor: "right" },
        ]} />
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Add Allocation" width={360}
        actions={<><Button variant="secondary" size="sm" onClick={() => setDrawerOpen(false)}>Cancel</Button><Button size="sm" onClick={() => setDrawerOpen(false)}>Save</Button></>}
        aside={<DescriptionList items={[{ term: "Gross amount", value: "$0.00" }, { term: "Federal tax", value: "20%" }]} />}
      >
        <Field label="Withdrawal amount">{(p) => <Input {...p} placeholder="$0.00" />}</Field>
      </Drawer>

      {/* ============================= BUTTON SCREEN ============================= */}
      <h2 className="site-section-title" id="buttons-screen">Account actions (buttons screen)</h2>
      <p className="site-section-sub">Anatomy — one Primary action per view, Secondary/Tertiary/Destructive used for everything else.</p>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ background: "var(--core-color-bg-page)", overflowX: "auto" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Primary — exactly one per screen, top action", anchor: "top" },
          { n: 2, label: "Secondary / Tertiary — supporting actions", anchor: "left" },
          { n: 3, label: "Destructive — isolated, confirms before acting", anchor: "bottom-right" },
        ]}>
          <div style={{ width: 860 }}>
            <AppShell header={<ScreenHeader userName="Taylor Hale" />} sidebar={<AppSidebar items={NAV_ITEMS} />} footer={<ScreenFooter />}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--core-space-6)" }}>
                  <div style={{ fontWeight: 700, fontSize: "var(--core-font-size-lg)" }}>My Profile</div>
                  <Button>Update contribution</Button>
                </div>
                <div style={{ display: "flex", gap: "var(--core-space-2)", flexWrap: "wrap" }}>
                  <Button variant="secondary">Download statement</Button>
                  <Button variant="tertiary">View plan documents</Button>
                  <Button variant="secondary" size="sm">Edit beneficiary</Button>
                  <Button variant="destructive" style={{ marginLeft: "auto" }}>Close account</Button>
                </div>
              </Card>
            </AppShell>
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Primary: exactly one per screen — the single most important action", anchor: "top" },
          { n: 2, label: "Secondary/Tertiary: supporting actions, never compete visually with Primary", anchor: "left" },
          { n: 3, label: "Destructive: visually isolated (often right-aligned), always confirms first", anchor: "bottom-right" },
        ]} />
      </div>

      <h2 className="site-section-title">Grid &amp; spacing reference</h2>
      <p className="site-section-sub">Every screen above uses the same tokens — nothing here is a one-off pixel value.</p>
      <table className="spec-table">
        <thead><tr><th>Token</th><th>Value</th><th>Used for</th></tr></thead>
        <tbody>
          <tr><td><code>space.6</code></td><td>24px</td><td>Grid column gap, main content padding</td></tr>
          <tr><td><code>space.4</code></td><td>16px</td><td>Field stack gap, header/footer vertical padding</td></tr>
          <tr><td><code>space.3</code></td><td>12px</td><td>Header vertical padding</td></tr>
          <tr><td><code>elevation.4</code></td><td>—</td><td>Slideover/Modal shadow, floats above the dimmed page</td></tr>
          <tr><td><code>color.border.subtle</code></td><td>—</td><td>Header/sidebar/footer dividers</td></tr>
          <tr><td>Grid columns</td><td>12</td><td>Base column count every screen's content area divides into</td></tr>
        </tbody>
      </table>
    </div>
  );
}
