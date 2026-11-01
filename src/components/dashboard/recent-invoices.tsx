import { Badge, type Tone } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Panel } from "@/components/dashboard/panel";

type InvoiceStatus = "Paid" | "Pending" | "Overdue";

type Invoice = {
  id: string;
  customer: string;
  issued: string;
  due: string;
  status: InvoiceStatus;
  amount: string;
};

const statusTone: Record<InvoiceStatus, Tone> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
};

const rows: Invoice[] = [
  {
    id: "INV-2401-001",
    customer: "Acme Corporation",
    issued: "Jan 10, 2024",
    due: "Jan 25, 2024",
    status: "Paid",
    amount: "$2,400.00",
  },
  {
    id: "INV-2401-002",
    customer: "Global Tech Solutions",
    issued: "Jan 12, 2024",
    due: "Jan 27, 2024",
    status: "Pending",
    amount: "$1,850.00",
  },
  {
    id: "INV-2401-003",
    customer: "Creative Agency Inc",
    issued: "Jan 05, 2024",
    due: "Jan 20, 2024",
    status: "Overdue",
    amount: "$3,200.00",
  },
  {
    id: "INV-2401-004",
    customer: "Digital Marketing Pro",
    issued: "Jan 14, 2024",
    due: "Jan 29, 2024",
    status: "Paid",
    amount: "$1,600.00",
  },
  {
    id: "INV-2401-005",
    customer: "StartUp Ventures LLC",
    issued: "Jan 15, 2024",
    due: "Jan 30, 2024",
    status: "Pending",
    amount: "$950.00",
  },
];

const columns: Column<Invoice>[] = [
  {
    key: "id",
    header: "Invoice",
    cell: (row) => (
      <a href="/invoices" className="font-semibold text-brand hover:underline">
        {row.id}
      </a>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    cell: (row) => (
      <span className="font-medium text-foreground">{row.customer}</span>
    ),
  },
  {
    key: "issued",
    header: "Issued",
    cell: (row) => <span className="text-muted-foreground">{row.issued}</span>,
  },
  {
    key: "due",
    header: "Due",
    cell: (row) => <span className="text-muted-foreground">{row.due}</span>,
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <Badge tone={statusTone[row.status]}>{row.status}</Badge>,
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    cell: (row) => (
      <span className="font-semibold text-foreground">{row.amount}</span>
    ),
  },
];

export function RecentInvoices() {
  return (
    <Panel title="Recent Invoices" href="/invoices" className="pb-0">
      <DataTable
        columns={columns}
        rows={rows}
        gridClassName="grid-cols-[1.2fr_1.8fr_1.2fr_1.2fr_1fr_1fr]"
      />
    </Panel>
  );
}
