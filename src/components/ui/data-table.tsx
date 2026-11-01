import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Align = "left" | "right";

export type Column<T> = {
  key: string;
  header: string;
  align?: Align;
  className?: string;
  cell: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  gridClassName: string;
};

export function DataTable<T>({
  columns,
  rows,
  gridClassName,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <div
        className={cn(
          "grid min-w-180 border-b border-border bg-table-head",
          gridClassName,
        )}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            className={cn(
              "px-6 py-2.5 text-[11px] font-bold tracking-[0.55px] text-muted uppercase",
              column.align === "right" && "text-right",
              column.className,
            )}
          >
            {column.header}
          </div>
        ))}
      </div>
      {rows.map((row, index) => (
        <div
          key={index}
          className={cn(
            "grid min-w-180 border-b border-border",
            gridClassName,
            index % 2 === 1 && "bg-background",
          )}
        >
          {columns.map((column) => (
            <div
              key={column.key}
              className={cn(
                "flex items-center px-6 py-3 text-xs",
                column.align === "right" && "justify-end text-right",
                column.className,
              )}
            >
              {column.cell(row)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
