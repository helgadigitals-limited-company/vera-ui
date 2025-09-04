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


// Helper: derive group key and label from path’s first segment
export function getGroupKey(path: string) {
  const seg = path.replace(/^\//, "").split("/")[0] || "";
  return seg;
}
export function toTitleCase(slug: string) {
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}