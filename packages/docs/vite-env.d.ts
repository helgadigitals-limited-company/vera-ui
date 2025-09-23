/// <reference types="vite/client" />

declare global {
  interface ImportMeta {
    glob<T = any>(
      pattern: string | string[],
      options?: {
        base?: string;
        query?: Record<string, string>;
        import?: string;
        eager?: boolean;
      }
    ): Record<string, () => Promise<T>>;
  }
}