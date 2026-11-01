import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

type AppShellProps = {
  active: string;
  children: ReactNode;
  showHeader?: boolean;
};

export function AppShell({
  active,
  children,
  showHeader = false,
}: AppShellProps) {
  return (
    <div className="flex h-screen items-stretch overflow-hidden bg-background">
      <Sidebar active={active} />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {showHeader ? <Header /> : null}
        {children}
      </div>
    </div>
  );
}
