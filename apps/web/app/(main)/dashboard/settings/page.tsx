import { SidebarInset } from "@abhimanyu/ui/components/sidebar"

import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsContent } from "@/components/settings/settings-content"
import { getUserSettings } from "@/features/auth/actions/auth"

export default async function SettingsPage() {
  const settings = await getUserSettings()
  return (
    <SidebarInset>
      <DashboardHeader title={"Settings"} />
      <SettingsContent {...settings} />
    </SidebarInset>
  )
}
