import { CountCard } from "@/components/dashboard/count-card";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { StatCard } from "@/components/dashboard/stat-card";
import { AppShell } from "@/components/layout/app-shell";

export default function Home() {
  return (
    <AppShell active="/" showHeader>
      <main className="flex flex-col gap-3.75 px-7.5 py-4.25">
        <section className="flex gap-4">
          <StatCard
            label="Total Income"
            value="$84,254"
            delta="+12.5%"
            comparison="vs $74,896 last period"
            trend="up"
          />
          <StatCard
            label="Total Expenses"
            value="$12,340"
            delta="+3.2%"
            comparison="vs $11,960 last period"
            trend="down"
          />
          <StatCard
            label="Net Income"
            value="$71,914"
            delta="+18.7%"
            comparison="vs $62,936 last period"
            trend="up"
          />
          <StatCard
            label="Outstanding Invoices"
            value="$15,800"
            delta="-2.1%"
            comparison="vs $16,150 last period"
            trend="warn"
          />
        </section>

        <section className="flex gap-4">
          <CountCard
            label="Paid Invoices"
            value="24"
            iconSrc="/icons/paid-check.svg"
          />
          <CountCard
            label="Pending Invoices"
            value="12"
            icon="clock"
            iconClassName="text-warning"
          />
          <CountCard
            label="Overdue Invoices"
            value="3"
            icon="alert"
            iconClassName="text-danger"
          />
          <CountCard
            label="Active Customers"
            value="48"
            icon="users"
            iconClassName="text-info"
          />
        </section>

        <RecentTransactions />
        <RecentInvoices />
      </main>
    </AppShell>
  );
}
