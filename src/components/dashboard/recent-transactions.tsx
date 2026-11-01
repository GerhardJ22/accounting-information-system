import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Panel } from "@/components/dashboard/panel";
import { cn } from "@/lib/cn";

type Transaction = {
  date: string;
  description: string;
  type: "Income" | "Expense";
  account: string;
  amount: string;
};

const rows: Transaction[] = [
  {
    date: "Jan 15, 2024",
    description: "Invoice #INV-001 Payment",
    type: "Income",
    account: "Bank Acct. 001",
    amount: "+$1,200.00",
  },
  {
    date: "Jan 14, 2024",
    description: "Office Supplies Purchase",
    type: "Expense",
    account: "Credit Card",
    amount: "-$240.50",
  },
  {
    date: "Jan 12, 2024",
    description: "Service Contract Payment",
    type: "Income",
    account: "Bank Acct. 002",
    amount: "+$3,500.00",
  },
  {
    date: "Jan 10, 2024",
    description: "Utility Bill",
    type: "Expense",
    account: "Bank Acct. 001",
    amount: "-$320.75",
  },
  {
    date: "Jan 08, 2024",
    description: "Invoice #INV-002 Payment",
    type: "Income",
    account: "Bank Acct. 001",
    amount: "+$850.00",
  },
];

const columns: Column<Transaction>[] = [
  {
    key: "date",
    header: "Date",
    cell: (row) => <span className="text-muted-foreground">{row.date}</span>,
  },
  {
    key: "description",
    header: "Description",
    cell: (row) => (
      <span className="font-medium text-foreground">{row.description}</span>
    ),
  },
  {
    key: "type",
    header: "Type",
    cell: (row) => (
      <Badge tone={row.type === "Income" ? "success" : "danger"}>{row.type}</Badge>
    ),
  },
  {
    key: "account",
    header: "Account",
    cell: (row) => <span className="text-muted-foreground">{row.account}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    cell: (row) => (
      <span
        className={cn(
          "font-semibold",
          row.type === "Income" ? "text-success" : "text-danger",
        )}
      >
        {row.amount}
      </span>
    ),
  },
];

export function RecentTransactions() {
  return (
    <Panel title="Recent Transactions" href="/transactions">
      <DataTable
        columns={columns}
        rows={rows}
        gridClassName="grid-cols-[1.15fr_1.9fr_0.95fr_1.3fr_1fr]"
      />
    </Panel>
  );
}
