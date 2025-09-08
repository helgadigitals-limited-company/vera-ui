import { isGroup, type Group, type MixedSidebarItem, type SidebarItem } from "@/components/Sidebar";
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
  return (
    typeof firstItem === 'object' &&
    firstItem !== null &&
    'key' in firstItem &&
    'label' in firstItem &&
    'items' in firstItem &&
    Array.isArray((firstItem as Group).items)
  );
}

// utility functions for mixed array handling

export function isMixedArray(items: SidebarItem[] | Group[] | MixedSidebarItem[]): items is MixedSidebarItem[] {
  if (!items || items.length === 0) return false;
  
  // Check if we have both types in the array
  let hasGroups = false;
  let hasItems = false;
  
  for (const item of items) {
    if (isGroup(item)) {
      hasGroups = true;
    } else {
      hasItems = true;
    }
    
    // If we found both types, it's a mixed array
    if (hasGroups && hasItems) {
      return true;
    }
  }
  
  return false;
}