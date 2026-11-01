import { Badge, type Tone } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

type Trend = "up" | "down" | "warn";

const trendTone: Record<Trend, Tone> = {
  up: "success",
  down: "danger",
  warn: "warning",
};

const barTone: Record<Trend, string> = {
  up: "bg-success-soft",
  down: "bg-danger-soft",
  warn: "bg-warning-soft",
};

const fillTone: Record<Trend, string> = {
  up: "bg-success",
  down: "bg-danger",
  warn: "bg-warning",
};

type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  comparison: string;
  trend: Trend;
  fill?: number;
};

export function StatCard({
  label,
  value,
  delta,
  comparison,
  trend,
  fill = 65,
}: StatCardProps) {
  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-3 self-stretch">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-[0.55px] text-muted uppercase">
          {label}
        </p>
        <Badge tone={trendTone[trend]} className="gap-1 px-2 py-0">
          {trend === "up" ? (
            <Icon name="trendUp" className="size-3" />
          ) : trend === "down" ? (
            <Icon name="trendDown" className="size-3" />
          ) : (
            <span aria-hidden>⚠</span>
          )}
          {delta}
        </Badge>
      </div>
      <p className="text-[28px] leading-7 font-bold text-foreground">{value}</p>
      <div className={cn("h-1 w-full overflow-hidden rounded-full", barTone[trend])}>
        <div
          className={cn("h-full rounded-full", fillTone[trend])}
          style={{ width: `${fill}%` }}
        />
      </div>
      <p className="text-[11px] leading-[14.67px] text-muted">{comparison}</p>
    </Card>
  );
}
