import type { Group, SidebarItem } from "@/components/Sidebar";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformToSelectOptions<T extends Record<string, any>>(
  data: T[],
  labelField: keyof T,
  valueField: keyof T = 'id' as keyof T
): { value: string; label: string }[] {
  return data
    .filter((item) => item[valueField] !== undefined)
    .map((item) => ({
      value: String(item[valueField]),
      label: String(item[labelField] ?? ''),
    }));
}


export function splitStringByUnderscore(str: string) {
  return str.split("_").join(" ");
}


// Helper function to check if items are Groups or SidebarItems
export function isGroupArray(items: SidebarItem[] | Group[]): items is Group[] {
  if (!items || items.length === 0) return false;
  const firstItem = items[0];
  // Check if it has all the required Group properties
  return (
    typeof firstItem === 'object' &&
    firstItem !== null &&
    'key' in firstItem &&
    'label' in firstItem &&
    'items' in firstItem &&
    Array.isArray((firstItem as Group).items)
  );
}