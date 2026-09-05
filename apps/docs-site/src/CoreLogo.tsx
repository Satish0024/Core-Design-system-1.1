import React from "react";

/**
 * CORE's own logomark — three overlapping rounded tiles suggesting layered
 * foundations (tokens → components → themes), in the brand purple ramp.
 * Original mark, not derived from any client or reference asset.
 */
export function CoreLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="12" width="14" height="14" rx="4" fill="#432CAA" />
      <rect x="11" y="6" width="14" height="14" rx="4" fill="#6952E2" />
      <rect x="15" y="14" width="14" height="14" rx="4" fill="#A095F5" />
    </svg>
  );
}
