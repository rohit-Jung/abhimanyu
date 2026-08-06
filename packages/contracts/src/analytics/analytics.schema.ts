import { type } from "arktype"

/** How far back the dashboard charts look. */
export const analyticsRange = type("7 | 30 | 90")

export const analyticsRangeInput = type({
  days: analyticsRange,
})

/** One day in the review activity series. Dates are ISO `yyyy-mm-dd`. */
export const reviewActivityPoint = type({
  date: "string",
  reviews: "number >= 0",
})

export const pullRequestStatusCount = type({
  status: type(
    "'Pending' | 'Processing' | 'Reviewed' | 'Review' | 'RateLimited'"
  ),
  count: "number >= 0",
})

export const repoIndexPoint = type({
  repoFullName: "string",
  chunks: "number >= 0",
})

export const dashboardTotals = type({
  reposSynced: "number >= 0",
  prsReviewed: "number >= 0",
  prsInFlight: "number >= 0",
  chunksIndexed: "number >= 0",
})

export const dashboardOverview = type({
  totals: dashboardTotals,
  activity: reviewActivityPoint.array(),
  statusBreakdown: pullRequestStatusCount.array(),
  topRepos: repoIndexPoint.array(),
})

export type AnalyticsRange = typeof analyticsRange.infer
export type AnalyticsRangeInput = typeof analyticsRangeInput.infer
export type ReviewActivityPoint = typeof reviewActivityPoint.infer
export type PullRequestStatusCount = typeof pullRequestStatusCount.infer
export type RepoIndexPoint = typeof repoIndexPoint.infer
export type DashboardTotals = typeof dashboardTotals.infer
export type DashboardOverview = typeof dashboardOverview.infer
