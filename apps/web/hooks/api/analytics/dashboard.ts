"use client"

import { AnalyticsRange } from "@abhimanyu/contracts"
import { useQuery } from "@tanstack/react-query"

import { useTRPC } from "@/lib/trpc/client"

export const useDashboardOverview = ({ days }: { days: AnalyticsRange }) => {
  const trpc = useTRPC()

  return useQuery(trpc.analytics.getDashboardOverview.queryOptions({ days }))
}
