"use client"

import { AnalyticsRange } from "@abhimanyu/contracts"
import { Button } from "@abhimanyu/ui/components/button"
import { Skeleton } from "@abhimanyu/ui/components/skeleton"
import { useState } from "react"

import { useDashboardOverview } from "@/hooks/api/analytics/dashboard"

import { PrStatusChart } from "./charts/pr-status-chart"
import { RepoIndexChart } from "./charts/repo-index-chart"
import { ReviewActivityChart } from "./charts/review-activity-chart"
import { StatTile } from "./charts/stat-tile"

const RANGES: AnalyticsRange[] = [7, 30, 90]

export function DashboardOverview() {
  const [days, setDays] = useState<AnalyticsRange>(30)
  const { data, isPending, isError } = useDashboardOverview({ days })

  if (isError) {
    return (
      <p className="border border-dashed p-8 text-sm text-muted-foreground">
        Could not load your review stats. Reload the page to try again.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-1">
        {RANGES.map((range) => (
          <Button
            key={range}
            size="sm"
            variant={range === days ? "secondary" : "ghost"}
            onClick={() => setDays(range)}
            aria-pressed={range === days}
          >
            {range}d
          </Button>
        ))}
      </div>

      {isPending || !data ? (
        <OverviewSkeleton />
      ) : (
        <>
          <section className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Repos synced" value={data.totals.reposSynced} />
            <StatTile
              label="Reviews delivered"
              value={data.totals.prsReviewed}
            />
            <StatTile label="Awaiting review" value={data.totals.prsInFlight} />
            <StatTile
              label="Chunks indexed"
              value={data.totals.chunksIndexed}
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <ReviewActivityChart data={data.activity} days={days} />
            <PrStatusChart data={data.statusBreakdown} />
          </section>

          <RepoIndexChart data={data.topRepos} />
        </>
      )}
    </div>
  )
}

function OverviewSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[92px]" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-[318px]" />
        <Skeleton className="h-[318px]" />
      </div>
      <Skeleton className="h-[358px]" />
    </div>
  )
}
