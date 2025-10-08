import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@helgadigitals/vera-ui";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vera UI - Modern React Component Library",
  description:
    "A modern, accessible React component library built with Radix UI and Tailwind CSS",
  icons: {
    icon: "/vera.png",
    shortcut: "/vera.png",
    apple: "/vera.png",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <NuqsAdapter>
          <RootProvider>{children}</RootProvider>
          <Toaster />

        </NuqsAdapter>
      </body>
    </html>
  );
}
