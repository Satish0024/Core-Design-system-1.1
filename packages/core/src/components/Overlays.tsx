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

export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children?: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="cds-overlay-scrim" onClick={onClose} style={{ display: "flex", justifyContent: "flex-end" }}>
      <div className="cds-drawer" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <h2 className="cds-modal-title">{title}</h2>
        {children}
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

export function Popover({ trigger, children }: { trigger: React.ReactElement; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(trigger, { onClick: () => setOpen((o) => !o) })}
      {open && (
        <div className="cds-popover" style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 30 }}>
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
export function Toast({ tone = "info", title, children }: { tone?: ToastTone; title: string; children?: React.ReactNode }) {
  return (
    <div className={`cds-toast cds-toast--${tone}`} role="status">
      <div>
        <strong style={{ display: "block" }}>{title}</strong>
        {children}
      </div>
    </div>
  );
}
