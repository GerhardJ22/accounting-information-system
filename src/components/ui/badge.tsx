import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Tone = "success" | "danger" | "warning" | "neutral";

const tones: Record<Tone, string> = {
  success: "bg-success-soft text-success",
  danger: "bg-danger-soft text-danger",
  warning: "bg-warning-soft text-warning",
  neutral: "bg-table-head text-muted",
};

type BadgeProps = {
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-[3.5px] text-[11px] font-semibold leading-[14.67px]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
