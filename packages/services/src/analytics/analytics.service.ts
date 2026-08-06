import {
  AnalyticsRange,
  DashboardOverview,
  PullRequestStatusCount,
  RepoIndexPoint,
  ReviewActivityPoint,
} from "@abhimanyu/contracts"
import { prisma, PullRequestStatus } from "@abhimanyu/database/client"

import { githubInstallationService } from "../github/installation.service"

const TOP_REPO_COUNT = 8

const EMPTY_OVERVIEW: DashboardOverview = {
  totals: {
    reposSynced: 0,
    prsReviewed: 0,
    prsInFlight: 0,
    chunksIndexed: 0,
  },
  activity: [],
  statusBreakdown: [],
  topRepos: [],
}

/** Statuses that mean the review has not landed yet. */
const IN_FLIGHT_STATUSES: PullRequestStatus[] = [
  "Pending",
  "Processing",
  "Review",
]

class AnalyticsService {
  /** Midnight UTC `days` ago, so buckets line up with the `yyyy-mm-dd` keys. */
  private rangeStart(days: AnalyticsRange): Date {
    const start = new Date()
    start.setUTCHours(0, 0, 0, 0)
    start.setUTCDate(start.getUTCDate() - (days - 1))
    return start
  }

  private dayKey(date: Date): string {
    return date.toISOString().slice(0, 10)
  }

  /**
   * Buckets reviews by UTC day and fills the gaps, so the chart draws a
   * continuous axis instead of skipping days with no activity.
   */
  private toActivitySeries(
    reviewedAt: Date[],
    days: AnalyticsRange
  ): ReviewActivityPoint[] {
    const counts = new Map<string, number>()
    for (const date of reviewedAt) {
      const key = this.dayKey(date)
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }

    const start = this.rangeStart(days)
    const series: ReviewActivityPoint[] = []
    for (let i = 0; i < days; i++) {
      const day = new Date(start)
      day.setUTCDate(start.getUTCDate() + i)
      const key = this.dayKey(day)
      series.push({ date: key, reviews: counts.get(key) ?? 0 })
    }

    return series
  }

  public async getDashboardOverview({
    userId,
    days,
  }: {
    userId: string
    days: AnalyticsRange
  }): Promise<DashboardOverview> {
    const installationId =
      await githubInstallationService.getInstallationIdByUserId({ userId })

    if (!installationId) {
      return EMPTY_OVERVIEW
    }

    const since = this.rangeStart(days)

    const [reviewed, statusGroups, repoSyncs] = await Promise.all([
      prisma.pullRequest.findMany({
        where: {
          installationId,
          status: "Reviewed",
          reviewedAt: { gte: since },
        },
        select: { reviewedAt: true },
      }),
      prisma.pullRequest.groupBy({
        by: ["status"],
        where: { installationId },
        _count: { _all: true },
      }),
      prisma.repoSync.findMany({
        where: { installationId },
        select: { repoFullName: true, chunkCount: true, status: true },
      }),
    ])

    const activity = this.toActivitySeries(
      reviewed
        .map((pr) => pr.reviewedAt)
        .filter((date): date is Date => date !== null),
      days
    )

    const statusBreakdown: PullRequestStatusCount[] = statusGroups.map(
      (group) => ({
        status: group.status,
        count: group._count._all,
      })
    )

    const topRepos: RepoIndexPoint[] = repoSyncs
      .filter((repo) => repo.chunkCount > 0)
      .sort((a, b) => b.chunkCount - a.chunkCount)
      .slice(0, TOP_REPO_COUNT)
      .map((repo) => ({
        repoFullName: repo.repoFullName,
        chunks: repo.chunkCount,
      }))

    const countFor = (statuses: PullRequestStatus[]) =>
      statusBreakdown
        .filter((entry) => statuses.includes(entry.status))
        .reduce((total, entry) => total + entry.count, 0)

    return {
      totals: {
        reposSynced: repoSyncs.filter((repo) => repo.status === "Synced")
          .length,
        prsReviewed: countFor(["Reviewed"]),
        prsInFlight: countFor(IN_FLIGHT_STATUSES),
        chunksIndexed: repoSyncs.reduce(
          (total, repo) => total + repo.chunkCount,
          0
        ),
      },
      activity,
      statusBreakdown,
      topRepos,
    }
  }
}

export const analyticsService = new AnalyticsService()
