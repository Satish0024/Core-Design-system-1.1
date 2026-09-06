import React from "react";
import { Preview, CodeBlock } from "../Preview";
import { LineChartCard, BarChartCard } from "../../../../packages/core/src/components/Chart";

const contributionGrowth = [
  { month: "Mar", balance: 78400, contributions: 82000 },
  { month: "Apr", balance: 81200, contributions: 84500 },
  { month: "May", balance: 83950, contributions: 87000 },
  { month: "Jun", balance: 87100, contributions: 89500 },
  { month: "Jul", balance: 89800, contributions: 92000 },
  { month: "Aug", balance: 92400, contributions: 94500 },
];

const allocationBySource = [
  { source: "Pre-tax", amount: 48200 },
  { source: "Roth", amount: 22100 },
  { source: "Employer match", amount: 16400 },
  { source: "Rollover", amount: 5700 },
];

export default function Charts() {
  return (
    <div>
      <h1 className="site-h1">Charts &amp; Graphs</h1>
      <p className="site-lede">
        Built on <a href="https://recharts.org/" target="_blank" rel="noreferrer" style={{ color: "var(--site-accent)" }}>Recharts</a>{" "}
        (recharts.org) — an SVG-based, composable React charting library, MIT-licensed. CORE doesn't build charting
        from scratch; it wraps Recharts' primitives and owns two things: the visual layer (every color, font, and
        stroke below is a CORE token, never a Recharts default) and accessibility (see the note below).
      </p>

      <h2 className="site-section-title">Accessibility</h2>
      <p className="site-section-sub">
        A chart is <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html" target="_blank" rel="noreferrer" style={{ color: "var(--site-accent)" }}>non-text content</a>{" "}
        (WCAG 1.1.1) — an <code>aria-label</code> like "line chart, 6 points" describes that a chart exists, not
        what it says. Every <code>LineChartCard</code>/<code>BarChartCard</code> instead renders the exact same
        data as a real <code>&lt;table&gt;</code>, visually hidden but fully available to screen readers (a
        <code>cds-visually-hidden</code> utility — clipped, not <code>display:none</code>, so it's still in the
        accessibility tree). The rendered SVG itself is marked <code>aria-hidden="true"</code>, since the table is
        the actual accessible equivalent, not a redundant announcement alongside it. This satisfies WCAG 1.1.1 and
        4.1.2 (Name, Role, Value) without relying on a screen reader correctly narrating an SVG's internals.
      </p>
      <div className="site-panel site-panel--flush">
        <table className="spec-table">
          <thead><tr><th>Requirement</th><th>How it's met</th></tr></thead>
          <tbody>
            <tr><td>1.1.1 Non-text content</td><td>Real data table alternative, not just an aria-label summary</td></tr>
            <tr><td>1.4.1 Use of color</td><td>Legend always shows a series name next to its color swatch — never color alone</td></tr>
            <tr><td>1.4.3 Contrast</td><td>Axis/legend text uses <code>color.text.tertiary</code>, ≥ 4.5:1 on the chart background</td></tr>
            <tr><td>4.1.2 Name, Role, Value</td><td>The <code>title</code> prop is a real, visible <code>&lt;figcaption&gt;</code> and the table's <code>&lt;caption&gt;</code></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="site-section-title" id="line-chart">Line chart</h2>
      <p className="site-section-sub">For a value over time — account balance, contribution growth.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: "100%", padding: 20 }}>
            <LineChartCard
              title="Balance vs. contributions, last 6 months"
              description="Account balance has tracked closely with total contributions, with a small gain from investment growth."
              data={contributionGrowth}
              xKey="month"
              series={[
                { key: "balance", label: "Account balance" },
                { key: "contributions", label: "Total contributions" },
              ]}
            />
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title" id="bar-chart">Bar chart</h2>
      <p className="site-section-sub">For comparing discrete categories — balance by contribution source.</p>
      <div className="site-panel site-panel--flush">
        <Preview>
          <div style={{ width: "100%", padding: 20 }}>
            <BarChartCard
              title="Balance by source"
              description="Pre-tax deferrals make up the largest share of the account balance."
              data={allocationBySource}
              xKey="source"
              series={[{ key: "amount", label: "Amount" }]}
            />
          </div>
        </Preview>
      </div>

      <h2 className="site-section-title">Code</h2>
      <div className="site-panel site-panel--flush">
        <CodeBlock>{`<LineChartCard
  title="Balance vs. contributions, last 6 months"
  data={monthlyData}
  xKey="month"
  series={[
    { key: "balance", label: "Account balance" },
    { key: "contributions", label: "Total contributions" },
  ]}
/>`}</CodeBlock>
      </div>
    </div>
  );
}
