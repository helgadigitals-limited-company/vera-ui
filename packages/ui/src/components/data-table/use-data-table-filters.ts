/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from "react";
import type { StringKeys } from "./types";

interface UseDataTableFiltersParams<T> {
  rowsWithId: Array<{ row: T; id: string | number }>;
  visibleDataColumns: StringKeys<T>[];
  enableGlobalFilter: boolean;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  globalFilterFn?: (row: T, searchTerm: string) => boolean;
  columnFilters?: Partial<Record<StringKeys<T>, string>>;
  onColumnFiltersChange?: (filters: Partial<Record<StringKeys<T>, string>>) => void;
  columnFilterFns: Partial<Record<StringKeys<T>, (cellValue: any, filterValue: string) => boolean>>;
  effectiveSortState: Array<{ key: StringKeys<T>; direction: "asc" | "desc" }>;
  compareValues: (a: T, b: T, col: StringKeys<T>) => number;
}

export function useDataTableFilters<T>({
  rowsWithId,
  visibleDataColumns,
  enableGlobalFilter,
  globalFilter,
  onGlobalFilterChange,
  globalFilterFn,
  columnFilters,
  onColumnFiltersChange,
  columnFilterFns,
  effectiveSortState,
  compareValues,
}: UseDataTableFiltersParams<T>) {
  // Internal filter states
  const [internalGlobalFilter, setInternalGlobalFilter] = useState("");
  const [internalColumnFilters, setInternalColumnFilters] = useState<Partial<Record<StringKeys<T>, string>>>({});

  const effectiveGlobalFilter = globalFilter ?? internalGlobalFilter;
  const effectiveColumnFilters = columnFilters ?? internalColumnFilters;

  const defaultGlobalFilterFn = useCallback(
    (row: T, searchTerm: string): boolean => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();

      return visibleDataColumns.some((col) => {
        const value = row[col];
        if (value == null) return false;

        // Handle arrays (like skills) by joining them
        if (Array.isArray(value)) {
          return value.join(", ").toLowerCase().includes(term);
        }

        // Convert to string and search
        return String(value).toLowerCase().includes(term);
      });
    },
    [visibleDataColumns]
  );

  const defaultColumnFilterFn = useCallback(
    (cellValue: any, filterValue: string): boolean => {
      if (!filterValue.trim()) return true;
      if (cellValue == null) return false;

      const term = filterValue.toLowerCase();

      // Handle arrays by joining
      if (Array.isArray(cellValue)) {
        return cellValue.join(", ").toLowerCase().includes(term);
      }

      return String(cellValue).toLowerCase().includes(term);
    },
    []
  );

  // Apply filters and sort
  const processedRows = useMemo(() => {
    let filtered = [...rowsWithId];

    // Apply global filter
    if (enableGlobalFilter && effectiveGlobalFilter.trim()) {
      const filterFn = globalFilterFn || defaultGlobalFilterFn;
      filtered = filtered.filter(({ row }) => filterFn(row, effectiveGlobalFilter));
    }

    // Apply column filters
    const activeColumnFilters = Object.entries(effectiveColumnFilters).filter(
      ([, value]) => value && String(value).trim()
    );

    if (activeColumnFilters.length > 0) {
      filtered = filtered.filter(({ row }) => {
        return activeColumnFilters.every(([col, filterValue]) => {
          const customFn = columnFilterFns[col as StringKeys<T>];
          if (customFn) {
            return customFn(row[col as StringKeys<T>], String(filterValue));
          }
          return defaultColumnFilterFn(row[col as StringKeys<T>], String(filterValue));
        });
      });
    }

    // Apply sorting
    if (!effectiveSortState.length) return filtered;

    const sorted = [...filtered].sort((a, b) => {
      for (const rule of effectiveSortState) {
        const cmp = compareValues(a.row, b.row, rule.key);
        if (cmp !== 0) {
          return rule.direction === "asc" ? cmp : -cmp;
        }
      }
      return 0;
    });
    return sorted;
  }, [
    rowsWithId,
    enableGlobalFilter,
    effectiveGlobalFilter,
    globalFilterFn,
    defaultGlobalFilterFn,
    effectiveColumnFilters,
    columnFilterFns,
    defaultColumnFilterFn,
    effectiveSortState,
    compareValues
  ]);

  // Update selection logic to work with filtered data
  const filteredRowIds = useMemo(
    () => processedRows.map((r) => r.id),
    [processedRows]
  );

  // Filter change handlers
  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      if (onGlobalFilterChange) {
        onGlobalFilterChange(value);
      } else {
        setInternalGlobalFilter(value);
      }
    },
    [onGlobalFilterChange]
  );

  const handleColumnFilterChange = useCallback(
    (col: StringKeys<T>, value: string) => {
      const next = { ...effectiveColumnFilters, [col]: value };
      if (onColumnFiltersChange) {
        onColumnFiltersChange(next);
      } else {
        setInternalColumnFilters(next);
      }
    },
    [effectiveColumnFilters, onColumnFiltersChange]
  );

  return {
    effectiveGlobalFilter,
    effectiveColumnFilters,
    processedRows,
    filteredRowIds,
    handleGlobalFilterChange,
    handleColumnFilterChange,
  };
}
