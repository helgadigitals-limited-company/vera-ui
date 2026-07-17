/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { DataTableProps, StringKeys } from "./types";

interface DataTableRowProps<T> {
  row: T;
  id: string | number;
  rowClassName: string | ((row: T) => string);

  expandable: boolean;
  expandOnRowClick: boolean;
  isRowExpanded: (id: string | number) => boolean;
  toggleRowExpansion: (id: string | number) => void;
  collapseIcon: ReactNode;
  expandIcon: ReactNode;
  expandedContent?: (row: T) => ReactNode;

  selectable: boolean;
  selectionMode: "single" | "multiple";
  isRowSelected: (id: string | number) => boolean;
  toggleRowSelection: (id: string | number) => void;
  maxSelections?: number;
  selectedRowIds: Array<string | number>;

  handleRowClick: (row: T, id: string | number) => void;

  actionsPlacement: "start" | "end";
  showActionsColumn: boolean;
  actionsRender?: (row: T) => ReactNode;
  actions?: DataTableProps<T>["actions"];

  visibleDataColumns: StringKeys<T>[];
  customBodyRender?: DataTableProps<T>["customBodyRender"];
  totalColumns: number;
}

export function DataTableRow<T>({
  row,
  id,
  rowClassName,
  expandable,
  expandOnRowClick,
  isRowExpanded,
  toggleRowExpansion,
  collapseIcon,
  expandIcon,
  expandedContent,
  selectable,
  selectionMode,
  isRowSelected,
  toggleRowSelection,
  maxSelections,
  selectedRowIds,
  handleRowClick,
  actionsPlacement,
  showActionsColumn,
  actionsRender,
  actions,
  visibleDataColumns,
  customBodyRender,
  totalColumns,
}: DataTableRowProps<T>) {
  const renderBodyCell = (row: T, col: StringKeys<T>) => {
    const renderedContent = customBodyRender ? customBodyRender(row, col) : null;
    return renderedContent ?? (row[col] as ReactNode);
  };

  const renderActionsCell = (row: T) => {
    if (actionsRender) return actionsRender(row);
    if (!actions || actions.length === 0) return null;

    const visibleActions = actions.filter((a) => !(a.hidden && a.hidden(row)));

    if (visibleActions.length === 0) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {visibleActions.map((a) => {
            const disabled = a.disabled ? a.disabled(row) : false;
            return (
              <DropdownMenuItem
                key={a.id}
                disabled={disabled}
                variant={a.variant as any}
                onClick={(e) => {
                  e.stopPropagation();
                  a.onClick(row);
                }}
                className="cursor-pointer"
              >
                {a.icon && (
                  <span className="mr-2 flex items-center">
                    {a.icon}
                  </span>
                )}
                {a.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const rowSelected = selectable && isRowSelected(id);
  const rowExpanded = expandable && isRowExpanded(id);

  return (
    <Fragment>
      {/* Main row */}
      <TableRow
        data-row-id={id}
        // NEW: expose selection state for styling and a11y
        data-state={rowSelected ? "selected" : undefined}
        aria-selected={rowSelected ? true : undefined}
        className={cn(
          // removed hardcoded bg; rely on attributes-based styling
          expandOnRowClick && expandable && "cursor-pointer hover:bg-muted/50",
          typeof rowClassName === "function" ? rowClassName(row) : rowClassName
        )}
        onClick={() => handleRowClick(row, id)}
      >
        {actionsPlacement === "start" && showActionsColumn && (
          <TableCell onClick={(e) => e.stopPropagation()}>
            {renderActionsCell(row)}
          </TableCell>
        )}

        {expandable && (
          <TableCell
            className="w-12 text-center"
            onClick={(e) => {
              if (!expandOnRowClick) {
                e.stopPropagation();
                toggleRowExpansion(id);
              }
            }}
          >
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded text-sm"
              aria-label={rowExpanded ? "Collapse row" : "Expand row"}
            >
              {rowExpanded ? collapseIcon : expandIcon}
            </button>
          </TableCell>
        )}

        {/* UPDATED: Selection cell with radio for single mode */}
        {selectable && (
          <TableCell
            className="w-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type={selectionMode === "single" ? "radio" : "checkbox"}
              name={selectionMode === "single" ? "table-selection" : undefined}
              aria-label={selectionMode === "single" ? "Select row" : "Select row"}
              checked={rowSelected}
              onChange={() => toggleRowSelection(id)}
              disabled={
                selectionMode === "multiple" &&
                maxSelections !== undefined &&
                selectedRowIds.length >= maxSelections &&
                !rowSelected
              }
            />
          </TableCell>
        )}

        {visibleDataColumns.map((col) => (
          <TableCell key={col} className="whitespace-nowrap">
            {renderBodyCell(row, col)}
          </TableCell>
        ))}

        {actionsPlacement === "end" && showActionsColumn && (
          <TableCell onClick={(e) => e.stopPropagation()}>
            {renderActionsCell(row)}
          </TableCell>
        )}
      </TableRow>

      {/* Expanded content row */}
      {expandable && rowExpanded && expandedContent && (
        <TableRow key={`${id}-expanded`}>
          <TableCell
            colSpan={totalColumns}
            className="bg-gray-50 border-t-0 py-4"
          >
            {expandedContent(row)}
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}
