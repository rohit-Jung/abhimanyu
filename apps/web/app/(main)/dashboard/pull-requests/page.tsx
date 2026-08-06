import { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard-header"
import { PullRequestPanel } from "@/components/dashboard/pull-request-panel"
import { DASHBOARD_ROUTES, PageMetadata } from "@/lib/constants"

export const metadata: Metadata = PageMetadata[DASHBOARD_ROUTES.pullRequest]

export default async function Page() {
  return (
    <>
      <DashboardHeader
        title="Pull Requests"
        description="Reviews across every repo you connected"
      />

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <PullRequestPanel />
      </div>
    </>
  )
}
