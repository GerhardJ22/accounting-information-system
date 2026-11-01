import { cn } from "@/lib/cn";

type AvatarProps = {
  initials: string;
  name: string;
  role: string;
  className?: string;
};

export function Avatar({ initials, name, role, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-sm border border-border bg-surface px-[13px] py-[9px]",
        className,
      )}
    >
      <span
        className="flex size-8 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--avatar-from) 0%, var(--avatar-to) 100%)",
        }}
      >
        {initials}
      </span>
      <span className="flex flex-col leading-[14.67px]">
        <span className="text-[11px] font-semibold text-foreground">{name}</span>
        <span className="text-[11px] text-muted">{role}</span>
      </span>
    </div>
  );
}
