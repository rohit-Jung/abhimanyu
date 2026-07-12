import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@abhimanyu/ui/components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
