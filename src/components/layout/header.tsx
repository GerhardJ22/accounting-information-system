"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Select } from "@/components/ui/select";

const periods = [
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "this-quarter", label: "This Quarter" },
  { value: "this-year", label: "This Year" },
];

export function Header() {
  const [period, setPeriod] = useState("this-month");

  function exportReport() {
    const blob = new Blob(
      ["Accounting Dashboard export for " + period],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "accounting-report.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-7.5 py-3.5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-[22px] font-bold leading-[29.33px] text-foreground">
          Accounting Dashboard
        </h1>
        <p className="text-xs text-muted">Overview of your financial metrics</p>
      </div>

      <div className="flex items-center gap-3">
        <Select
          aria-label="Reporting period"
          icon="calendar"
          value={period}
          onChange={setPeriod}
          options={periods}
        />
        <Button variant="primary" onClick={exportReport}>
          <Icon name="download" className="size-3.5" />
          Export Report
        </Button>
        <Button variant="secondary" onClick={() => window.alert("New transaction")}>
          <Icon name="plus" className="size-3.5" />
          New Transaction
        </Button>
        <Avatar initials="A" name="Alex" role="Admin" />
      </div>
    </header>
  );
}
