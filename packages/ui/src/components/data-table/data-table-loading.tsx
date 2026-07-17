import type { ReactNode } from "react";
import { cn, splitStringByUnderscore } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Default loading component
export const DefaultLoadingComponent = () => (
  <div className="flex items-center justify-center py-16">
    <div className="flex items-center gap-2 text-muted-foreground">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
      <span>Loading...</span>
    </div>
  </div>
);

interface DataTableLoadingProps {
  className?: string;
  enableGlobalFilter: boolean;
  globalFilterPlaceholder: string;
  effectiveGlobalFilter: string;
  handleGlobalFilterChange: (value: string) => void;
  actionsPlacement: "start" | "end";
  showActionsColumn: boolean;
  actionsColumnHeader: ReactNode;
  expandable: boolean;
  expandColumnHeader?: ReactNode;
  selectable: boolean;
  selectionColumnHeader?: ReactNode;
  visibleDataColumns: string[];
  totalColumns: number;
  loadingComponent?: ReactNode;
}

export function DataTableLoading({
  className,
  enableGlobalFilter,
  globalFilterPlaceholder,
  effectiveGlobalFilter,
  handleGlobalFilterChange,
  actionsPlacement,
  showActionsColumn,
  actionsColumnHeader,
  expandable,
  expandColumnHeader,
  selectable,
  selectionColumnHeader,
  visibleDataColumns,
  totalColumns,
  loadingComponent,
}: DataTableLoadingProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {enableGlobalFilter && (
        <div className="mb-4">
          <Input
            placeholder={globalFilterPlaceholder}
            value={effectiveGlobalFilter}
            onChange={(e) => handleGlobalFilterChange(e.target.value)}
            className="max-w-sm"
            disabled
          />
        </div>
      )}

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              {actionsPlacement === "start" && showActionsColumn && (
                <TableHead className="whitespace-nowrap">
                  {actionsColumnHeader}
                </TableHead>
              )}

              {expandable && (
                <TableHead className="w-12 text-center">
                  {expandColumnHeader || ""}
                </TableHead>
              )}

              {selectable && (
                <TableHead className="w-8 text-center">
                  {selectionColumnHeader}
                </TableHead>
              )}

              {visibleDataColumns.map((col) => (
                <TableHead key={col} className="whitespace-nowrap first-letter:capitalize">
                  {splitStringByUnderscore(col)}
                </TableHead>
              ))}

              {actionsPlacement === "end" && showActionsColumn && (
                <TableHead className="whitespace-nowrap">
                  {actionsColumnHeader}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell colSpan={totalColumns} className="h-64">
                {loadingComponent || <DefaultLoadingComponent />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
