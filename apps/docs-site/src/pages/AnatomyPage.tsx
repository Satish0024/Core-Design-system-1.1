import React from "react";
import { Anatomy, AnatomyLegend } from "../Anatomy";
import { Button, IconButton } from "../../../../packages/core/src/components/Button";
import { Input } from "../../../../packages/core/src/components/Field";
import { Switch, Card, Badge } from "../../../../packages/core/src/components/Misc";
import { Checkbox, RadioGroup } from "../../../../packages/core/src/components/FormControls";
import { Slider, ButtonGroup, Icon } from "../../../../packages/core/src/components/Primitives";
import { Avatar, Progress } from "../../../../packages/core/src/components/DataDisplay";
import { Modal, Drawer, Tooltip, Popover } from "../../../../packages/core/src/components/Overlays";

export default function AnatomyPage() {
  const sections = [
    {
      id: "button",
      anchorId: "button",
      title: "Button",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={200}
            rects={[
              { x: 0, y: 0, width: 16, height: 40 },
              { x: 74, y: 0, width: 16, height: 40 },
            ]}
            points={[
              { n: 1, label: "Height: 40px (Medium)", x: -40, y: 20, leaderTo: { x: 0, y: 20 } },
              { n: 2, label: "Horizontal padding: 16px", x: 8, y: -40, leaderTo: { x: 8, y: 0 } },
              { n: 3, label: "Border radius: 6px", x: 120, y: -40, leaderTo: { x: 90, y: 0 } },
            ]}
          >
            <Button style={{ width: 90 }}>Button</Button>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Height: 40px (Medium)", x: 0, y: 0 },
            { n: 2, label: "Horizontal padding: 16px", x: 0, y: 0 },
            { n: 3, label: "Border radius: 6px", x: 0, y: 0 },
          ]} />
        </div>
      ),
    },
    {
      id: "icon-button",
      anchorId: "icon-button",
      title: "Icon Button",
      content: (
        <div className="site-panel site-panel--flush">
          <Anatomy
            height={160}
            rects={[
              { x: 0, y: 0, width: 40, height: 40 }
            ]}
            points={[
              { n: 1, label: "Dimensions: 40x40px", x: -50, y: 20, leaderTo: { x: 0, y: 20 } },
              { n: 2, label: "Icon size: 18px", x: 20, y: -40, leaderTo: { x: 20, y: 10 } }
            ]}
          >
            <IconButton variant="secondary" aria-label="Edit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            </IconButton>
          </Anatomy>
          <div style={{ padding: "0 24px" }}>
            <AnatomyLegend points={[
              { n: 1, label: "Dimensions: 40x40px", x: 0, y: 0 },
              { n: 2, label: "Icon size: 18px (for 40px button)", x: 0, y: 0 },
            ]} />
          </div>
        </div>
      )
    },
    {
      id: "button-group",
      anchorId: "button-group",
      title: "Button Group",
      content: (
        <div className="site-panel site-panel--flush">
          <Anatomy
            height={160}
            rects={[
              { x: 49, y: 0, width: 2, height: 40 },
              { x: 100, y: 0, width: 2, height: 40 }
            ]}
            points={[
              { n: 1, label: "Negative margin: -1px overlap", x: 40, y: 80, leaderTo: { x: 50, y: 40 } },
              { n: 2, label: "Radius removed on inner edges", x: 50, y: -40, leaderTo: { x: 50, y: 0 } }
            ]}
          >
            <ButtonGroup>
              <Button variant="secondary">One</Button>
              <Button variant="secondary">Two</Button>
              <Button variant="secondary">Three</Button>
            </ButtonGroup>
          </Anatomy>
          <div style={{ padding: "0 24px" }}>
            <AnatomyLegend points={[
              { n: 1, label: "Negative margin: -1px overlap", x: 0, y: 0 },
              { n: 2, label: "Radius removed on inner edges", x: 0, y: 0 },
            ]} />
          </div>
        </div>
      )
    },
    {
      id: "input",
      anchorId: "input",
      title: "Input",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={160}
            rects={[
              { x: 0, y: 0, width: 12, height: 40 },
              { x: 188, y: 0, width: 12, height: 40 }
            ]}
            points={[
              { n: 1, label: "Height: 40px (Medium)", x: -40, y: 20, leaderTo: { x: 0, y: 20 } },
              { n: 2, label: "Padding: 12px", x: 6, y: -40, leaderTo: { x: 6, y: 0 } },
              { n: 3, label: "Border radius: 6px", x: 190, y: -40, leaderTo: { x: 190, y: 0 } }
            ]}
          >
            <Input placeholder="Input value" style={{ width: 200 }} />
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Height: 40px (Medium)", x: 0, y: 0 },
            { n: 2, label: "Padding: 12px", x: 0, y: 0 },
            { n: 3, label: "Border radius: 6px", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "checkbox",
      anchorId: "checkbox",
      title: "Checkbox & Radio",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={120}
            rects={[
              { x: 0, y: 0, width: 16, height: 16 },
              { x: 0, y: 32, width: 16, height: 16 }
            ]}
            points={[
              { n: 1, label: "Size: 16x16px", x: -40, y: 8, leaderTo: { x: 0, y: 8 } },
              { n: 2, label: "Border radius: 4px (Checkbox) / 50% (Radio)", x: 40, y: -40, leaderTo: { x: 16, y: 0 } },
              { n: 3, label: "Gap to label: 8px", x: 40, y: 80, leaderTo: { x: 20, y: 40 } }
            ]}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Checkbox label="Checkbox" checked={true} onChange={() => {}} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <RadioGroup name="anatomy-radio" value="1" onChange={() => {}} options={[{ value: "1", label: "Radio" }]} />
              </div>
            </div>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Size: 16x16px", x: 0, y: 0 },
            { n: 2, label: "Border radius: 4px (Checkbox) / 50% (Radio)", x: 0, y: 0 },
            { n: 3, label: "Gap to label: 8px", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "switch",
      anchorId: "switch",
      title: "Switch",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={120}
            rects={[
              { x: 0, y: 0, width: 36, height: 20 },
              { x: 18, y: 2, width: 16, height: 16 }
            ]}
            points={[
              { n: 1, label: "Track: 36x20px", x: -40, y: 10, leaderTo: { x: 0, y: 10 } },
              { n: 2, label: "Thumb: 16x16px (2px inset)", x: 40, y: -40, leaderTo: { x: 26, y: 2 } }
            ]}
          >
            <div style={{ width: 140 }}>
              <Switch label="Active Switch" checked={true} onChange={() => {}} />
            </div>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Track: 36x20px", x: 0, y: 0 },
            { n: 2, label: "Thumb: 16x16px (2px inset)", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "slider",
      anchorId: "slider",
      title: "Slider",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={120}
            rects={[
              { x: 0, y: 6, width: 200, height: 4 },
              { x: 90, y: -2, width: 20, height: 20 }
            ]}
            points={[
              { n: 1, label: "Track height: 4px", x: -40, y: 8, leaderTo: { x: 0, y: 8 } },
              { n: 2, label: "Thumb size: 20x20px", x: 125, y: -40, leaderTo: { x: 100, y: 0 } }
            ]}
          >
            <div style={{ width: 200 }}>
              <Slider min={0} max={100} value={50} onChange={() => {}} />
            </div>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Track height: 4px", x: 0, y: 0 },
            { n: 2, label: "Thumb size: 20x20px", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "card",
      anchorId: "card",
      title: "Card",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={160}
            rects={[
              { x: 0, y: 0, width: 24, height: 100 },
              { x: 24, y: 0, width: 200, height: 24 }
            ]}
            points={[
              { n: 1, label: "Padding: 24px (desktop)", x: -40, y: 20, leaderTo: { x: 12, y: 20 } },
              { n: 2, label: "Border radius: 12px", x: 140, y: -40, leaderTo: { x: 140, y: 0 } }
            ]}
          >
            <Card style={{ minWidth: 248, height: 100 }}>
              <div style={{ fontSize: "var(--core-font-size-sm, 14px)", color: "var(--core-color-text-secondary)" }}>Card Content</div>
            </Card>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Padding: 24px (desktop)", x: 0, y: 0 },
            { n: 2, label: "Border radius: 12px", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "badge",
      anchorId: "badge",
      title: "Badge",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={160}
            rects={[
              { x: 0, y: 0, width: 8, height: 24 },
              { x: 53, y: 0, width: 8, height: 24 }
            ]}
            points={[
              { n: 1, label: "Height: 24px (Medium)", x: -40, y: 12, leaderTo: { x: 0, y: 12 } },
              { n: 2, label: "Horizontal padding: 8px", x: 4, y: -40, leaderTo: { x: 4, y: 0 } },
              { n: 3, label: "Fully rounded borders", x: 120, y: -40, leaderTo: { x: 61, y: 0 } }
            ]}
          >
            <Badge tone="success">Active</Badge>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Height: 24px (Medium)", x: 0, y: 0 },
            { n: 2, label: "Horizontal padding: 8px", x: 0, y: 0 },
            { n: 3, label: "Fully rounded borders", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "avatar",
      anchorId: "avatar",
      title: "Avatar",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={160}
            rects={[
              { x: 0, y: 0, width: 36, height: 36 }
            ]}
            points={[
              { n: 1, label: "Size: 36x36px (Medium)", x: -40, y: 18, leaderTo: { x: 0, y: 18 } },
              { n: 2, label: "Border radius: 50% (Circle)", x: 76, y: -40, leaderTo: { x: 30, y: 5 } }
            ]}
          >
            <Avatar name="JL" />
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Size: 36x36px (Medium)", x: 0, y: 0 },
            { n: 2, label: "Border radius: 50% (Circle)", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "progress",
      anchorId: "progress",
      title: "Progress",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={160}
            rects={[
              { x: 0, y: 0, width: 320, height: 8 }
            ]}
            points={[
              { n: 1, label: "Track height: 8px", x: -40, y: 4, leaderTo: { x: 0, y: 4 } },
              { n: 2, label: "Border radius: 4px", x: 360, y: -40, leaderTo: { x: 320, y: 0 } }
            ]}
          >
            <div style={{ width: 320 }}>
              <Progress value={68} />
            </div>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Track height: 8px", x: 0, y: 0 },
            { n: 2, label: "Border radius: 4px", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "modal",
      anchorId: "modal",
      title: "Modal",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={240}
            rects={[
              { x: 0, y: 0, width: 400, height: 24 },
              { x: 0, y: 0, width: 24, height: 160 },
              { x: 376, y: 0, width: 24, height: 160 },
              { x: 0, y: 136, width: 400, height: 24 }
            ]}
            points={[
              { n: 1, label: "Padding: 24px", x: -40, y: 12, leaderTo: { x: 0, y: 12 } },
              { n: 2, label: "Border radius: 12px", x: 440, y: -40, leaderTo: { x: 388, y: 0 } },
              { n: 3, label: "Gap (title/body/actions): 16px", x: -40, y: 60, leaderTo: { x: 200, y: 60 } }
            ]}
          >
            <div className="cds-modal" style={{ position: "relative", width: 400, margin: 0, transform: "none", top: 0, left: 0 }}>
              <h2 className="cds-modal-title">Modal Title</h2>
              <div className="cds-modal-body">Modal body content goes here.</div>
              <div className="cds-modal-actions">
                <Button variant="secondary">Cancel</Button>
                <Button>Save</Button>
              </div>
            </div>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Padding: 24px", x: 0, y: 0 },
            { n: 2, label: "Border radius: 12px", x: 0, y: 0 },
            { n: 3, label: "Gap (title/body/actions): 16px", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "drawer",
      anchorId: "drawer",
      title: "Drawer",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={320}
            rects={[
              { x: 0, y: 0, width: 320, height: 24 },
              { x: 0, y: 0, width: 24, height: 300 },
              { x: 296, y: 0, width: 24, height: 300 }
            ]}
            points={[
              { n: 1, label: "Padding: 24px", x: -40, y: 12, leaderTo: { x: 0, y: 12 } },
              { n: 2, label: "Max-width: 480px (90vw on mobile)", x: 160, y: -40, leaderTo: { x: 160, y: 0 } }
            ]}
          >
            <div className="cds-drawer" style={{ position: "relative", width: 320, height: 300, transform: "none", right: 0, top: 0, border: "1px solid var(--core-color-border-subtle)" }}>
              <div className="cds-drawer-header">
                <h2 className="cds-drawer-title">Drawer Title</h2>
                <IconButton variant="tertiary" shape="circle" aria-label="Close" className="cds-drawer-close" style={{ position: "relative", right: 0, top: 0 }}>
                  <Icon name="fa-solid fa-xmark" />
                </IconButton>
              </div>
              <div className="cds-drawer-body">
                <p style={{ fontSize: 14, color: "var(--core-color-text-secondary)" }}>Drawer content.</p>
              </div>
            </div>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Padding: 24px", x: 0, y: 0 },
            { n: 2, label: "Max-width: 480px (90vw on mobile)", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "tooltip",
      anchorId: "tooltip",
      title: "Tooltip",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={120}
            rects={[
              { x: 0, y: 0, width: 8, height: 32 },
              { x: 104, y: 0, width: 8, height: 32 }
            ]}
            points={[
              { n: 1, label: "Padding: 4px 8px", x: -40, y: 16, leaderTo: { x: 0, y: 16 } },
              { n: 2, label: "Border radius: 4px", x: 150, y: -40, leaderTo: { x: 110, y: 0 } },
              { n: 3, label: "Arrow offset: 8px", x: 56, y: 80, leaderTo: { x: 56, y: 40 } }
            ]}
          >
            <div className="cds-tooltip" style={{ position: "relative", opacity: 1, transform: "none", zIndex: 1, width: 112, top: 0, left: 0 }}>
              Tooltip text
            </div>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Padding: 4px 8px", x: 0, y: 0 },
            { n: 2, label: "Border radius: 4px", x: 0, y: 0 },
            { n: 3, label: "Arrow offset: 8px", x: 0, y: 0 }
          ]} />
        </div>
      ),
    },
    {
      id: "popover",
      anchorId: "popover",
      title: "Popover",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Anatomy
            height={200}
            rects={[
              { x: 0, y: 0, width: 160, height: 16 },
              { x: 0, y: 0, width: 16, height: 100 },
              { x: 144, y: 0, width: 16, height: 100 }
            ]}
            points={[
              { n: 1, label: "Padding: 16px", x: -40, y: 16, leaderTo: { x: 0, y: 16 } },
              { n: 2, label: "Border radius: 8px", x: 200, y: -40, leaderTo: { x: 150, y: 0 } },
              { n: 3, label: "Shadow: elevation-md", x: 200, y: 100, leaderTo: { x: 160, y: 80 } }
            ]}
          >
            <div className="cds-popover" style={{ position: "relative", width: 160, opacity: 1, transform: "none", top: 0, left: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                <a href="#" style={{ color: "var(--core-color-text-primary)", textDecoration: "none" }}>Download</a>
                <a href="#" style={{ color: "var(--core-color-text-primary)", textDecoration: "none" }}>Update info</a>
              </div>
            </div>
          </Anatomy>
          <AnatomyLegend points={[
            { n: 1, label: "Padding: 16px", x: 0, y: 0 },
            { n: 2, label: "Border radius: 8px", x: 0, y: 0 },
            { n: 3, label: "Shadow: elevation-md", x: 0, y: 0 }
          ]} />
        </div>
      ),
    }
  ];

  return (
    <div>
      <h1 className="site-h1">Anatomy</h1>
      <p className="site-lede">
        Detailed spacing and padding visualizations for core components.
      </p>
      
      {sections.map((section) => (
        <React.Fragment key={section.id}>
          <h2 className="site-section-title" id={section.anchorId}>
            {section.title}
          </h2>
          {section.content}
        </React.Fragment>
      ))}
    </div>
  );
}
