import React, { useRef } from "react";

export type DropzoneStatus = "default" | "success" | "error" | "warning";
export type AttachmentStatus = "default" | "success" | "error" | "warning" | "disabled";

export interface AttachmentFile {
  id: string;
  name: string;
  size: string;
  status?: AttachmentStatus;
  statusText?: string;
  disabled?: boolean;
}

export interface DropzoneProps {
  onFiles?: (files: FileList) => void;
  hint?: string;
  label?: React.ReactNode;
  status?: DropzoneStatus;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Dropzone({
  onFiles,
  hint,
  label,
  status = "default",
  disabled = false,
  icon,
  className = "",
  style,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const statusClass = status !== "default" ? `cds-dropzone--${status}` : "";
  const disabledClass = disabled ? "cds-dropzone--disabled" : "";

  const defaultHint =
    hint !== undefined
      ? hint
      : status === "success"
      ? "Upload complete. Drag more files to add."
      : status === "error"
      ? "File exceeds the 10MB limit. Please choose a smaller file."
      : status === "warning"
      ? "1 file remaining before reaching storage capacity."
      : disabled
      ? "File attachments are locked for this request."
      : "PDF, JPG, or PNG up to 10MB";

  const defaultLabel =
    label !== undefined ? (
      label
    ) : status === "success" ? (
      <span>
        File uploaded successfully, or <strong onClick={() => !disabled && inputRef.current?.click()}>browse more</strong>
      </span>
    ) : status === "error" ? (
      <span>
        Upload failed, or <strong onClick={() => !disabled && inputRef.current?.click()}>choose another</strong>
      </span>
    ) : status === "warning" ? (
      <span>
        Storage limit approaching, or <strong onClick={() => !disabled && inputRef.current?.click()}>browse</strong>
      </span>
    ) : disabled ? (
      <span>File uploads are disabled</span>
    ) : (
      <span>
        Drag a file here, or <strong onClick={() => !disabled && inputRef.current?.click()}>browse</strong>
      </span>
    );

  return (
    <div
      className={`cds-dropzone ${statusClass} ${disabledClass} ${className}`.trim()}
      onDrop={(e) => {
        e.preventDefault();
        if (disabled) return;
        if (e.dataTransfer.files.length && onFiles) onFiles(e.dataTransfer.files);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={style}
    >
      {icon && <div className="cds-dropzone-icon" style={{ marginBottom: 6 }}>{icon}</div>}
      <div className="cds-dropzone-title">{defaultLabel}</div>
      <div className="cds-dropzone-hint" style={{ marginTop: 4, fontSize: "var(--core-font-size-xs, 12px)" }}>{defaultHint}</div>
      <input
        ref={inputRef}
        type="file"
        hidden
        disabled={disabled}
        onChange={(e) => !disabled && e.target.files && onFiles && onFiles(e.target.files)}
      />
    </div>
  );
}

export interface AttachmentListProps {
  files: AttachmentFile[];
  onRemove?: (id: string) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AttachmentList({
  files,
  onRemove,
  disabled = false,
  className = "",
  style,
}: AttachmentListProps) {
  return (
    <div className={`cds-attachment-list ${className}`.trim()} style={style}>
      {files.map((f) => {
        const itemDisabled = disabled || f.disabled;
        const status = f.status || (itemDisabled ? "disabled" : "default");
        const statusClass = status !== "default" ? `cds-attachment--${status}` : "";
        const ext = f.name.split(".").pop()?.toUpperCase().slice(0, 3) || "FILE";

        return (
          <div className={`cds-attachment ${statusClass}`.trim()} key={f.id}>
            <span className="cds-attachment-icon" aria-hidden="true">
              {ext}
            </span>
            <div className="cds-attachment-body" style={{ minWidth: 0, flex: 1 }}>
              <div className="cds-attachment-name" title={f.name}>
                {f.name}
              </div>
              <div className="cds-attachment-meta">
                <span>{f.size}</span>
                {f.statusText && (
                  <>
                    <span className="cds-attachment-meta-sep">•</span>
                    <span className="cds-attachment-status">{f.statusText}</span>
                  </>
                )}
              </div>
            </div>
            {f.statusText && (
              <span className={`cds-attachment-badge cds-attachment-badge--${status}`}>
                {status === "success" && "✓ "}
                {status === "error" && "✕ "}
                {status === "warning" && "⚠ "}
                {f.statusText}
              </span>
            )}
            {!itemDisabled && onRemove && (
              <button
                type="button"
                className="cds-attachment-remove"
                onClick={() => onRemove(f.id)}
                aria-label={`Remove ${f.name}`}
              >
                ×
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
