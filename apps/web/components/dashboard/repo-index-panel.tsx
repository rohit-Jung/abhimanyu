"use client"

import { Skeleton } from "@abhimanyu/ui/components/skeleton"

import { RepoIndexChart } from "@/components/dashboard/charts/repo-index-chart"
import { useDashboardOverview } from "@/hooks/api/analytics/dashboard"

export function RepoIndexPanel() {
  const { data, isPending, isError } = useDashboardOverview({ days: 30 })

  if (isError) return null
  if (isPending || !data) return <Skeleton className="h-[358px]" />

  return <RepoIndexChart data={data.topRepos} />
}
