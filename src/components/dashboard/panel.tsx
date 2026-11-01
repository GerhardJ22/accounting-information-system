import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type PanelProps = {
  title: string;
  href: string;
  children: ReactNode;
  className?: string;
};

export function Panel({ title, href, children, className }: PanelProps) {
  return (
    <section
      className={cn(
        "w-full overflow-hidden rounded-sm border border-border bg-surface shadow-(--shadow-panel)",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <h2 className="text-xs font-bold text-foreground">{title}</h2>
        <Link
          href={href}
          className="text-[11px] font-semibold text-brand hover:underline"
        >
          View All →
        </Link>
      </div>
      {children}
    </section>
  );
}
