import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "none" | "sm" | "md";
};

const paddings = {
  none: "",
  sm: "px-4 py-[11px]",
  md: "px-[21px] py-[17px]",
};

export function Card({
  className,
  padding = "md",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-border bg-surface shadow-[var(--shadow-card)]",
        paddings[padding],
        className,
      )}
      {...props}
    />
  );
}
