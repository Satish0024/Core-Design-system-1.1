import React from "react";
import { Preview } from "../Preview";
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
    </div>
  );
}
