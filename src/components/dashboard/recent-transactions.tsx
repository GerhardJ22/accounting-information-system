"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Panel } from "@/components/dashboard/panel";
import { cn } from "@/lib/cn";

type Transaction = {
  id: number;
  date: string;
  description: string | null;
  type: "Income" | "Expense";
  account: string;
  amount: string;
};

type ApiResponse = {
  success: boolean;
  data?: Transaction[];
  message?: string;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

const formatAmount = (amount: string, type: Transaction["type"]) => {
  const value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(Number(amount)));

  return type === "Income" ? `+${value}` : `-${value}`;
};

const columns: Column<Transaction>[] = [
  {
    key: "date",
    header: "Date",
    cell: (row) => (
      <span className="text-muted-foreground">
        {formatDate(row.date)}
      </span>
    ),
  },
  {
    key: "description",
    header: "Description",
    cell: (row) => (
      <span className="font-medium text-foreground">
        {row.description || "No description"}
      </span>
    ),
  },
  {
    key: "type",
    header: "Type",
    cell: (row) => (
      <Badge tone={row.type === "Income" ? "success" : "danger"}>
        {row.type}
      </Badge>
    ),
  },
  {
    key: "account",
    header: "Account",
    cell: (row) => (
      <span className="text-muted-foreground">{row.account}</span>
    ),
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
        {formatAmount(row.amount, row.type)}
      </span>
    ),
  },
];

export function RecentTransactions() {
  const [rows, setRows] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");

        if (!response.ok) {
          throw new Error("Failed to fetch transactions.");
        }

        const result: ApiResponse = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Something went wrong.");
        }

        setRows(result.data ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load transactions.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <Panel title="Recent Transactions" href="/transactions">
      {loading ? (
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          Loading transactions...
        </div>
      ) : error ? (
        <div className="px-6 py-8 text-center text-sm text-danger">
          {error}
        </div>
      ) : rows.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          No transactions found.
        </div>
      ) : (
        <DataTable
          columns={columns}
          rows={rows}
          gridClassName="grid-cols-[1.15fr_1.9fr_0.95fr_1.3fr_1fr]"
        />
      )}
    </Panel>
  );
}
