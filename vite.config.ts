import * as path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from 'vite-plugin-dts'

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
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VeraUI",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `vera-ui.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@radix-ui/react-slot",
        "class-variance-authority",
        "clsx",
        "lucide-react",
        "tailwind-merge",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
          "@radix-ui/react-slot": "RadixUIReactSlot",
          "class-variance-authority": "classVarianceAuthority",
          "clsx": "clsx",
          "lucide-react": "lucideReact",
          "tailwind-merge": "tailwindMerge",
        },
        // Ensure CSS is named correctly
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'vera-ui.css'
          }
          return assetInfo.name || 'assets/[name][extname]'
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
    chunkSizeWarningLimit: 1000,
  },
})