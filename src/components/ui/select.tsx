"use client";

import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/icon";

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  icon?: IconName;
  className?: string;
  "aria-label"?: string;
};

export function Select({
  value,
  onChange,
  options,
  icon,
  className,
  "aria-label": ariaLabel,
}: SelectProps) {
  return (
    <label
      className={cn(
        "relative inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-[13px] py-[9px] text-xs text-muted-foreground",
        className,
      )}
    >
      {icon ? <Icon name={icon} className="size-3.5" /> : null}
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="cursor-pointer appearance-none bg-transparent pr-3 font-sans text-xs text-muted-foreground outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevronDown"
        className="pointer-events-none size-3.5 opacity-60"
      />
    </label>
  );
}
