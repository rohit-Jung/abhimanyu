"use client"

import { Button } from "@abhimanyu/ui/components/button"
import { Skeleton } from "@abhimanyu/ui/components/skeleton"
import Link from "next/link"

import { PrStatusChart } from "@/components/dashboard/charts/pr-status-chart"
import { ReviewActivityChart } from "@/components/dashboard/charts/review-activity-chart"
import { EmptyState } from "@/components/dashboard/empty-state"
import { useDashboardOverview } from "@/hooks/api/analytics/dashboard"
import { DASHBOARD_ROUTES } from "@/lib/constants"

const DAYS = 30

export function PullRequestPanel() {
  const { data, isPending, isError } = useDashboardOverview({ days: DAYS })

  if (isError) {
    return (
      <p className="border border-dashed p-8 text-sm text-muted-foreground">
        Could not load pull request stats. Reload the page to try again.
      </p>
    )
  }

  if (isPending || !data) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-[318px]" />
        <Skeleton className="h-[318px]" />
      </div>
    )
  }

  if (data.statusBreakdown.length === 0) {
    return (
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
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ReviewActivityChart data={data.activity} days={DAYS} />
      <PrStatusChart data={data.statusBreakdown} />
    </div>
  )
}
