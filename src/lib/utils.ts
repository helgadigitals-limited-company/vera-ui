import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


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
