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
import type { StringKeys } from "./types";

// Default empty state component
export const DefaultEmptyStateComponent = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="text-muted-foreground mb-2">
      <svg
        className="w-12 h-12 mx-auto mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <p className="text-lg font-medium text-gray-900 mb-1">No data found</p>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

interface DataTableEmptyProps<T> {
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
  visibleDataColumns: StringKeys<T>[];
  showFilterRow: boolean;
  filterableColumns: StringKeys<T>[];
  effectiveColumnFilters: Partial<Record<StringKeys<T>, string>>;
  handleColumnFilterChange: (col: StringKeys<T>, value: string) => void;
  totalColumns: number;
  emptyStateComponent?: ReactNode;
  emptyMessage: string;
}

export function DataTableEmpty<T>({
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
  showFilterRow,
  filterableColumns,
  effectiveColumnFilters,
  handleColumnFilterChange,
  totalColumns,
  emptyStateComponent,
  emptyMessage,
}: DataTableEmptyProps<T>) {
  return (
    <div className={cn("relative w-full", className)}>
      {enableGlobalFilter && (
        <div className="mb-4">
          <Input
            placeholder={globalFilterPlaceholder}
            value={effectiveGlobalFilter}
            onChange={(e) => handleGlobalFilterChange(e.target.value)}
            className="max-w-sm"
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

            {showFilterRow && (
              <TableRow>
                {actionsPlacement === "start" && showActionsColumn && (
                  <TableHead className="py-2">
                    <div className="h-8"></div>
                  </TableHead>
                )}

                {expandable && (
                  <TableHead className="py-2">
                    <div className="h-8"></div>
                  </TableHead>
                )}

                {selectable && (
                  <TableHead className="py-2">
                    <div className="h-8"></div>
                  </TableHead>
                )}

                {visibleDataColumns.map((col) => {
                  const filterable = filterableColumns.includes(col);
                  return (
                    <TableHead key={col} className="py-2">
                      {filterable ? (
                        <Input
                          placeholder={`Filter ${splitStringByUnderscore(col)}...`}
                          value={effectiveColumnFilters[col] || ""}
                          onChange={(e) => handleColumnFilterChange(col, e.target.value)}
                          className="h-8 text-xs"
                        />
                      ) : (
                        <div className="h-8"></div>
                      )}
                    </TableHead>
                  );
                })}

                {actionsPlacement === "end" && showActionsColumn && (
                  <TableHead className="py-2">
                    <div className="h-8"></div>
                  </TableHead>
                )}
              </TableRow>
            )}
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell colSpan={totalColumns} className="h-64">
                {emptyStateComponent || <DefaultEmptyStateComponent message={emptyMessage} />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
