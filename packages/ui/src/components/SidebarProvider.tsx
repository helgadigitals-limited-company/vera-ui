import { SidebarProvider } from "./ui/sidebar";


export  function SidebarProviders({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}
