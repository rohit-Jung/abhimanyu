import { Button } from "@abhimanyu/ui/components/button"
import { Metadata } from "next"
import Link from "next/link"

import { DashboardHeader } from "@/components/dashboard-header"
import { EmptyState } from "@/components/dashboard/empty-state"
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
        <EmptyState
          eyebrow="No open pull requests"
          title="Nothing to review yet."
          description="Once a connected repo has an open pull request, its review lands here with the context Abhimanyu gathered from your codebase."
          action={
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href={DASHBOARD_ROUTES.repos} />}
            >
              Connect a repo
            </Button>
          }
        />
      </div>
    </>
  )
}
