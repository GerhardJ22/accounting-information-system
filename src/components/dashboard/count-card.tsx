import { Card } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

type CountCardProps = {
  label: string;
  value: string;
  icon?: IconName;
  iconSrc?: string;
  iconClassName?: string;
};

export function CountCard({
  label,
  value,
  icon,
  iconSrc,
  iconClassName,
}: CountCardProps) {
  return (
    <Card
      padding="sm"
      className="flex min-w-0 flex-1 items-center gap-4.5 self-stretch"
    >
      <div className="flex h-10 w-9 shrink-0 items-center justify-center">
        {iconSrc ? (
          // Figma asset keeps its own 36×40 root size.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={iconSrc} alt="" width={36} height={40} />
        ) : icon ? (
          <Icon name={icon} className={cn("size-5", iconClassName)} />
        ) : null}
      </div>
      <div className="flex flex-col">
        <p className="text-[11px] font-semibold leading-[14.67px] text-muted">
          {label}
        </p>
        <p className="text-[22px] font-bold leading-[29.33px] text-foreground">
          {value}
        </p>
      </div>
    </Card>
  );
}
