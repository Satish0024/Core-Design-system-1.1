import React from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, disabled, className = "", children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`cds-btn cds-btn--${variant} cds-btn--${size} ${className}`}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? "…" : children}
      </button>
    );
  }
);
Button.displayName = "Button";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** "square" (default) uses button.radius, same as every other control. "circle"
   *  is fully round — the header/toolbar ghost-icon treatment (ties to
   *  iconButton.ghost.radius/hoverBg), typically paired with variant="tertiary". */
  shape?: "square" | "circle";
  "aria-label": string; // required — icon buttons must always have an accessible name
  children: React.ReactNode; // the icon itself
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "secondary", size = "md", shape = "square", className = "", children, ...rest }, ref) => (
    <button ref={ref} className={`cds-icon-btn cds-icon-btn--${variant} cds-icon-btn--${size} cds-icon-btn--${shape} ${className}`} {...rest}>
      {children}
    </button>
  )
);
IconButton.displayName = "IconButton";

export function Link({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className="cds-link" {...rest}>
      {children}
    </a>
  );
}
