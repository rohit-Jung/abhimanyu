import { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsContent } from "@/components/settings/settings-content"
import { getUserSettings } from "@/features/auth/actions/auth"
import { DASHBOARD_ROUTES, PageMetadata } from "@/lib/constants"

export const metadata: Metadata = PageMetadata[DASHBOARD_ROUTES.settings]

export default async function SettingsPage() {
  const settings = await getUserSettings()
  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Your profile and subscription"
      />
      <SettingsContent {...settings} />
    </>
  )
}
