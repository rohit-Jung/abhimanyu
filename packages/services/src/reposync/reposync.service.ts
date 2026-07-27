import { GetInfiniteRepo, GitRepo } from "@abhimanyu/contracts"
import { prisma, RepoSyncStatus } from "@abhimanyu/database/client"

import { githubInstallationService } from "../github/installation.service"

class RepoSyncService {
  private readonly repoPerPage = 10

  public async findSyncedRepo({ repoFullName }: { repoFullName: string }) {
    return prisma.repoSync.findUnique({
      where: {
        repoFullName,
      },
    })
  }

  public async getRepos({
    limit = 1,
    userId,
    cursor = 1,
  }: GetInfiniteRepo & { userId: string }) {
    const installationId =
      await githubInstallationService.getInstallationIdByUserId({ userId })
    const app = githubInstallationService.githubApp

    if (!installationId || !app)
      return {
        repos: [],
        total: 0,
        hasMore: false,
      }

    // `getInstallationOctokit` exchanges the App JWT for an installation access token.
    const octokit = await app.getInstallationOctokit(installationId)

    const { data } = await octokit.rest.apps.listReposAccessibleToInstallation({
      per_page: limit || this.repoPerPage,
      page: cursor ?? 1,
    })

    const total = data.total_count
    const repoFullNames = data.repositories.map((repo) => {
      return repo.full_name
    })

    const repoSyncStatus = await prisma.repoSync.findMany({
      where: {
        repoFullName: { in: repoFullNames },
      },
      select: { repoFullName: true, status: true },
    })

    const statusmap: Record<string, RepoSyncStatus> = {}
    repoSyncStatus.map((r) => {
      statusmap[r.repoFullName] = r.status 
    })

    const repos = data.repositories.map((repo) => {
      return {
        id: String(repo.id),
        name: repo.name,
        fullName: repo.full_name,
        visibility: repo.private ? "private" : "public",
        defaultBranch: repo.default_branch ?? "main",
        updatedAt: repo.updated_at ?? new Date().toISOString(),
        language: repo.language ?? null,
        stars: repo.stargazers_count ?? 0,
        syncStatus: statusmap[repo.full_name] ?? null,
      } satisfies GitRepo
    })

    return {
      repos,
      total,
      hasMore: cursor
        ? cursor * this.repoPerPage < total
        : this.repoPerPage < total,
    }
  }
}

export const repoSyncService = new RepoSyncService()
