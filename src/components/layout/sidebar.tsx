import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

const mainNav: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  { href: "/customers", label: "Customers", icon: "customers" },
  { href: "/suppliers", label: "Suppliers", icon: "suppliers" },
  { href: "/transactions", label: "Transactions", icon: "transactions" },
  { href: "/invoices", label: "Invoices", icon: "invoices" },
  { href: "/reports", label: "Reports", icon: "reports" },
];

const footerNav: { href: string; label: string; icon: IconName }[] = [
  { href: "/settings", label: "Settings", icon: "settings" },
  { href: "/logout", label: "Logout", icon: "logout" },
];

type SidebarProps = {
  active?: string;
};

export function Sidebar({ active = "/" }: SidebarProps) {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col bg-sidebar text-nav">
      <div className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand text-base font-bold text-white">
            $
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold leading-[17.14px] text-white">
              Accounts
            </span>
            <span className="text-[11px] leading-[14.67px] text-muted">Pro</span>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 pt-4">
        {mainNav.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={active === item.href}
            tone="nav"
          />
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-3 pb-4">
        {footerNav.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={active === item.href}
            tone="muted"
          />
        ))}
      </div>
    </aside>
  );
}

function NavLink({
  href,
  label,
  icon,
  active,
  tone,
}: {
  href: string;
  label: string;
  icon: IconName;
  active: boolean;
  tone: "nav" | "muted";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-sm border-l-[3px] py-2 pr-3 pl-3.75 text-xs font-medium transition-colors",
        tone === "muted" ? "border-transparent px-3 text-muted" : "border-transparent",
        active ? "text-white" : tone === "nav" ? "text-nav hover:text-white" : "hover:text-nav",
      )}
    >
      <Icon name={icon} className="size-3.5" />
      {label}
    </Link>
  );
}
