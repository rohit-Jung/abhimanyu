import { SidebarProvider } from "@abhimanyu/ui/components/sidebar"

import { AppSidebar } from "@/components/app-sidebar"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  )
}
