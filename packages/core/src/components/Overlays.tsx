import React, { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

export function Modal({ open, onClose, title, children, actions }: { open: boolean; onClose: () => void; title: string; children?: React.ReactNode; actions?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);
  if (!open) return null;
  return (
    <div className="cds-overlay-scrim" onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        ref={ref}
        className="cds-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cds-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      >
        <h2 id="cds-modal-title" className="cds-modal-title">{title}</h2>
        <div className="cds-modal-body">{children}</div>
        <div className="cds-modal-actions">{actions}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title, description, danger }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; description: string; danger?: boolean }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant={danger ? "destructive" : "primary"} onClick={onConfirm}>{danger ? "Delete" : "Confirm"}</Button>
        </>
      }
    >
      {description}
    </Modal>
  );
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  side?: "left" | "right";
  width?: number;
  /** Header action buttons (e.g. Cancel + Save) — renders inline with the title, before the close button. */
  actions?: React.ReactNode;
  /** Optional side panel (e.g. a fee/summary breakdown) rendered alongside the main content, like a Slideover. */
  aside?: React.ReactNode;
}

/**
 * Drawer / Slideover — a right- (or left-) anchored panel. The same component covers both the
 * simple "Drawer" case (title + body) and the richer "Slideover" pattern (title + header actions +
 * close button + an optional side-by-side summary panel) via the `actions`/`aside` props.
 */
export function Drawer({ open, onClose, title, children, side = "right", width = 360, actions, aside }: DrawerProps) {
  if (!open) return null;
  return (
    <div className="cds-overlay-scrim" onClick={onClose} style={{ display: "flex", justifyContent: side === "right" ? "flex-end" : "flex-start" }}>
      <div className="cds-drawer" role="dialog" aria-modal="true" aria-label={title} style={{ width, maxWidth: "90vw" }} onClick={(e) => e.stopPropagation()}>
        <div className="cds-drawer-header">
          <h2 className="cds-modal-title" style={{ margin: 0 }}>{title}</h2>
          <div className="cds-drawer-header-actions">
            {actions}
            <button type="button" className="cds-drawer-close" aria-label="Close" onClick={onClose}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <div className={aside ? "cds-drawer-body cds-drawer-body--split" : "cds-drawer-body"}>
          <div className="cds-drawer-main">{children}</div>
          {aside && <div className="cds-drawer-aside">{aside}</div>}
        </div>
      </div>
    </div>
  );
}

export function Tooltip({ label, children }: { label: string; children: React.ReactElement }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      {show && (
        <span className="cds-tooltip" role="tooltip" style={{ bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" }}>
          {label}
        </span>
      )}
    </span>
  );
}

export interface MenuItemDef {
  label: string;
  onSelect?: () => void;
  danger?: boolean;
  separatorAfter?: boolean;
  type?: "item" | "checkbox" | "radio" | "submenu";
  checked?: boolean;
  onCheckedChange?: (v: boolean) => void;
  items?: MenuItemDef[]; // for type "submenu"
}

function MenuItems({ items, onDone }: { items: MenuItemDef[]; onDone: () => void }) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  return (
    <>
      {items.map((item) => (
        <React.Fragment key={item.label}>
          {item.type === "submenu" ? (
            <div
              className="cds-menu-submenu-trigger"
              onMouseEnter={() => setOpenSubmenu(item.label)}
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              <button role="menuitem" aria-haspopup="menu" className="cds-menu-item">
                {item.label} <span aria-hidden="true">›</span>
              </button>
              {openSubmenu === item.label && item.items && (
                <div className="cds-menu cds-menu-submenu" role="menu">
                  <MenuItems items={item.items} onDone={onDone} />
                </div>
              )}
            </div>
          ) : item.type === "checkbox" ? (
            <button
              role="menuitemcheckbox"
              aria-checked={item.checked}
              className="cds-menu-item cds-menu-item--check"
              onClick={() => item.onCheckedChange?.(!item.checked)}
            >
              {item.label} <span className="cds-menu-item-check-mark" data-checked={item.checked}>✓</span>
            </button>
          ) : item.type === "radio" ? (
            <button
              role="menuitemradio"
              aria-checked={item.checked}
              className="cds-menu-item cds-menu-item--radio"
              onClick={() => { item.onSelect?.(); onDone(); }}
            >
              {item.label} <span className="cds-menu-item-check-mark" data-checked={item.checked}>●</span>
            </button>
          ) : (
            <button
              role="menuitem"
              className={`cds-menu-item ${item.danger ? "cds-menu-item--danger" : ""}`}
              onClick={() => { item.onSelect?.(); onDone(); }}
            >
              {item.label}
            </button>
          )}
          {item.separatorAfter && <hr className="cds-menu-separator" />}
        </React.Fragment>
      ))}
    </>
  );
}

export function DropdownMenu({ trigger, items }: { trigger: React.ReactElement; items: MenuItemDef[] }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(trigger, { onClick: () => setOpen((o) => !o), "aria-haspopup": "menu", "aria-expanded": open })}
      {open && (
        <div className="cds-menu" role="menu" style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 30 }} onMouseLeave={() => setOpen(false)}>
          <MenuItems items={items} onDone={() => setOpen(false)} />
        </div>
      )}
    </span>
  );
}

export type PopoverPlacement = "top" | "right" | "bottom" | "left";
const popoverPlacementStyle: Record<PopoverPlacement, React.CSSProperties> = {
  bottom: { top: "calc(100% + 8px)", left: 0 },
  top: { bottom: "calc(100% + 8px)", left: 0 },
  right: { left: "calc(100% + 8px)", top: 0 },
  left: { right: "calc(100% + 8px)", top: 0 },
};

export function Popover({ trigger, children, placement = "bottom" }: { trigger: React.ReactElement; children: React.ReactNode; placement?: PopoverPlacement }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(trigger, { onClick: () => setOpen((o) => !o) })}
      {open && (
        <div className="cds-popover" style={{ position: "absolute", zIndex: 30, ...popoverPlacementStyle[placement] }}>
          {children}
        </div>
      )}
    </span>
  );
}

export function Spinner({ label = "Loading" }: { label?: string }) {
  return <span className="cds-spinner" role="status" aria-label={label} />;
}

export type ToastTone = "success" | "danger" | "warning" | "info";
export function Toast({ tone = "info", title, timestamp, onClose, children }: { tone?: ToastTone; title: string; timestamp?: string; onClose?: () => void; children?: React.ReactNode }) {
  return (
    <div className={`cds-toast cds-toast--${tone}`} role={tone === "danger" ? "alert" : "status"}>
      <div className="cds-toast-header">
        <strong className="cds-toast-title">{title}</strong>
        {timestamp && <span className="cds-toast-timestamp">{timestamp}</span>}
        {onClose && (
          <button type="button" className="cds-toast-close" aria-label="Dismiss notification" onClick={onClose}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        )}
      </div>
      {children && <div className="cds-toast-body">{children}</div>}
    </div>
  );
}
