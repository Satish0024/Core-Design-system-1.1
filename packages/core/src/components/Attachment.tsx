import React, { useRef } from "react";

export interface AttachmentFile { id: string; name: string; size: string; }

export function Dropzone({ onFiles, hint = "PDF, JPG, or PNG up to 10MB" }: { onFiles: (files: FileList) => void; hint?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="cds-dropzone"
      onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files); }}
      onDragOver={(e) => e.preventDefault()}
    >
      Drag a file here, or <strong onClick={() => inputRef.current?.click()}>browse</strong>
      <div style={{ marginTop: 4, fontSize: 12 }}>{hint}</div>
      <input ref={inputRef} type="file" hidden onChange={(e) => e.target.files && onFiles(e.target.files)} />
    </div>
  );
}

export function AttachmentList({ files, onRemove }: { files: AttachmentFile[]; onRemove: (id: string) => void }) {
  return (
    <div className="cds-attachment-list">
      {files.map((f) => (
        <div className="cds-attachment" key={f.id}>
          <span className="cds-attachment-icon" aria-hidden="true">{f.name.split(".").pop()?.toUpperCase().slice(0, 3)}</span>
          <span>
            <div className="cds-attachment-name">{f.name}</div>
            <div className="cds-attachment-meta">{f.size}</div>
          </span>
          <button className="cds-attachment-remove" onClick={() => onRemove(f.id)} aria-label={`Remove ${f.name}`}>×</button>
        </div>
      ))}
    </div>
  );
}
