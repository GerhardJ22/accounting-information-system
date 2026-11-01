import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";
import {
  ArrowDownTrayIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ClockIcon,
  Cog6ToothIcon,
  CubeIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  PlusIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export type IconName =
  | "dashboard" | "customers" | "suppliers" | "transactions"
  | "invoices" | "reports" | "settings" | "logout"
  | "calendar" | "chevronDown" | "download" | "plus"
  | "clock" | "alert" | "users" | "trendUp" | "trendDown";

type IconProps = { name: IconName; className?: string };

const icons: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  dashboard: Squares2X2Icon,
  customers: UsersIcon,
  suppliers: CubeIcon,
  transactions: ArrowsRightLeftIcon,
  invoices: DocumentTextIcon,
  reports: ChartBarIcon,
  settings: Cog6ToothIcon,
  logout: ArrowLeftEndOnRectangleIcon,
  calendar: CalendarDaysIcon,
  chevronDown: ChevronDownIcon,
  download: ArrowDownTrayIcon,
  plus: PlusIcon,
  clock: ClockIcon,
  alert: ExclamationCircleIcon,
  users: UsersIcon,
  trendUp: ArrowTrendingUpIcon,
  trendDown: ArrowTrendingDownIcon,
};

export function Icon({ name, className }: IconProps) {
  const Glyph = icons[name];
  return <Glyph className={cn("size-4 shrink-0", className)} aria-hidden="true" />;
}