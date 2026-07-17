/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import type { StringKeys } from "./types";

interface UseDataTableSortParams<T> {
  sortState?: Array<{ key: StringKeys<T>; direction: "asc" | "desc" }>;
  defaultSortState: Array<{ key: StringKeys<T>; direction: "asc" | "desc" }>;
  onSortChange?: (
    state: Array<{ key: StringKeys<T>; direction: "asc" | "desc" }>
  ) => void;
  sortableColumns: StringKeys<T>[];
  multiSort: boolean;
  sortFns: Partial<Record<StringKeys<T>, (a: any, b: any) => number>>;
}

export function useDataTableSort<T>({
  sortState,
  defaultSortState,
  onSortChange,
  sortableColumns,
  multiSort,
  sortFns,
}: UseDataTableSortParams<T>) {
  type SortRule = { key: StringKeys<T>; direction: "asc" | "desc" };
  const [internalSortState, setInternalSortState] =
    useState<SortRule[]>(defaultSortState);
  const effectiveSortState = sortState ?? internalSortState;

  const applySortChange = useCallback(
    (next: SortRule[]) => {
      if (onSortChange) onSortChange(next);
      if (!sortState) setInternalSortState(next);
    },
    [onSortChange, sortState]
  );

  const toggleSortForColumn = useCallback(
    (col: StringKeys<T>, additive: boolean) => {
      if (!sortableColumns.includes(col)) return;
      const existing = effectiveSortState.find((r) => r.key === col);
      let next: SortRule[] = [];
      if (additive && multiSort) {
        next = [...effectiveSortState];
        if (!existing) {
          next.push({ key: col, direction: "asc" });
        } else if (existing.direction === "asc") {
          next = next.map((r) => (r.key === col ? { ...r, direction: "desc" as const } : r));
        } else {
          next = next.filter((r) => r.key !== col);
        }
      } else {
        if (!existing) {
          next = [{ key: col, direction: "asc" }];
        } else if (existing.direction === "asc") {
          next = [{ key: col, direction: "desc" }];
        } else {
          next = [];
        }
      }
      applySortChange(next);
    },
    [effectiveSortState, sortableColumns, multiSort, applySortChange]
  );

  const setSortForColumn = useCallback(
    (col: StringKeys<T>, direction: "asc" | "desc" | null, additive: boolean) => {
      if (!sortableColumns.includes(col)) return;
      let next: SortRule[] = [];
      const multi = additive && multiSort;
      if (!multi) {
        if (direction == null) {
          next = [];
        } else {
          next = [{ key: col, direction }];
        }
      } else {
        next = [...effectiveSortState];
        const existing = next.find((r) => r.key === col);
        if (direction == null) {
          next = next.filter((r) => r.key !== col);
        } else if (!existing) {
          next.push({ key: col, direction });
        } else {
          next = next.map((r) => (r.key === col ? { ...r, direction } : r));
        }
      }
      applySortChange(next);
    },
    [effectiveSortState, sortableColumns, multiSort, applySortChange]
  );

  const compareValues = useCallback(
    (a: T, b: T, col: StringKeys<T>) => {
      const custom = sortFns[col];
      if (custom) return custom(a, b);
      // Cast to any so instanceof is allowed even if the inferred property type is primitive
      const av = a?.[col] as any;
      const bv = b?.[col] as any;
      if (av == null && bv == null) return 0;
      if (av == null) return -1;
      if (bv == null) return 1;
      if (typeof av === "number" && typeof bv === "number") return av - bv;
      if (av instanceof Date && bv instanceof Date) return av.getTime() - bv.getTime();
      const astr = String(av).toLowerCase();
      const bstr = String(bv).toLowerCase();
      if (astr < bstr) return -1;
      if (astr > bstr) return 1;
      return 0;
    },
    [sortFns]
  );

  return { effectiveSortState, toggleSortForColumn, setSortForColumn, compareValues };
}
