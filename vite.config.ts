/// <reference types="vitest/config" />
import * as path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.{ts,tsx}', 'src/**/*.test.{ts,tsx}', 'src/main.tsx', 'src/App.tsx'],
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: path.resolve(dirname, "src/index.ts"),
      name: "VeraUI",
      formats: ["es", "cjs"],
      fileName: (format: string) => `vera-ui.${format}.js`
    },
    rollupOptions: {
      external: [
        "react", 
        "react-dom", 
        "react/jsx-runtime",
        // Add all your dependencies here
        "@radix-ui/react-accordion",
        "@radix-ui/react-alert-dialog",
        "@radix-ui/react-aspect-ratio",
        "@radix-ui/react-avatar",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-collapsible",
        "@radix-ui/react-context-menu",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-hover-card",
        "@radix-ui/react-label",
        "@radix-ui/react-menubar",
        "@radix-ui/react-navigation-menu",
        "@radix-ui/react-popover",
        "@radix-ui/react-progress",
        "@radix-ui/react-radio-group",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-select",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "@radix-ui/react-switch",
        "@radix-ui/react-tabs",
        "@radix-ui/react-toggle",
        "@radix-ui/react-toggle-group",
        "@radix-ui/react-tooltip",
        "@tailwindcss/vite",
        "@tanstack/react-table",
        "class-variance-authority",
        "clsx",
        "cmdk",
        "date-fns",
        "embla-carousel-react",
        "input-otp",
        "lucide-react",
        "next-themes",
        "nuqs",
        "react-day-picker",
        "react-hook-form",
        "react-resizable-panels",
        "recharts",
        "sonner",
        "tailwind-merge",
        "tailwindcss",
        "vaul",
        "zod"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'vera-ui.css';
          }
          return assetInfo.name || 'assets/[name][extname]';
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
});