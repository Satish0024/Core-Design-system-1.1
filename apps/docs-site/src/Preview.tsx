import React from "react";

export function Preview({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      data-theme="core"
      data-mode={dark ? "dark" : "light"}
      className="preview-surface"
      style={{ background: "var(--core-color-bg-page)", color: "var(--core-color-text-primary)" }}
    >
      {children}
    </div>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return <pre className="code-block">{children}</pre>;
}
