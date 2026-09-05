import React, { useState } from "react";

export interface AccordionItem { id: string; title: string; content: React.ReactNode; }
export function Accordion({ items, allowMultiple = false, defaultOpenIds = [] }: { items: AccordionItem[]; allowMultiple?: boolean; defaultOpenIds?: string[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpenIds));
  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set<string>();
      if (prev.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  return (
    <div className="cds-accordion">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div className="cds-accordion-item" key={item.id}>
            <h3 style={{ margin: 0 }}>
              <button
                className="cds-accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                id={`trigger-${item.id}`}
                onClick={() => toggle(item.id)}
              >
                {item.title}
                <svg className="cds-accordion-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h3>
            {isOpen && (
              <div className="cds-accordion-panel" id={`panel-${item.id}`} role="region" aria-labelledby={`trigger-${item.id}`}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Separator({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  return <div role="separator" aria-orientation={orientation} className={orientation === "vertical" ? "cds-separator cds-separator--v" : "cds-separator cds-separator--h"} />;
}

export function Skeleton({ width = "100%", height = 16, radius }: { width?: number | string; height?: number | string; radius?: string }) {
  return <div className="cds-skeleton" style={{ width, height, borderRadius: radius }} aria-hidden="true" />;
}
