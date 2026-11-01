import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand/90 focus-visible:outline-brand",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-background focus-visible:outline-brand",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
