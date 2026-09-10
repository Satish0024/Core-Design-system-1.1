import React from "react";
import { sectionIdForAnchor } from "./navConfig";

export function ComponentSectionNumber({ anchorId }: { anchorId: string }) {
  const id = sectionIdForAnchor(anchorId);
  if (!id) return null;

  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: "var(--core-color-text-tertiary)",
        marginBottom: 12,
      }}
    >
      {id}
    </div>
  );
}
