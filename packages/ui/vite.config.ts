/// <reference types="vitest/config" />
import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

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
        "react-router-dom",
        "date-fns",
        "lucide-react",
        "motion",
        "nuqs",
        "react-hook-form",
        "react-resizable-panels",
        "vaul",
        "zod",
      ],
      output: {
        banner: '"use client";',
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