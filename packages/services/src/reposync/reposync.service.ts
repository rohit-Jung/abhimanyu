import {
  GetInfiniteRepo,
  GitRepo,
  RepoFile,
  SyncRepoDetails,
  TreeEntry,
} from "@abhimanyu/contracts"
import { prisma, RepoSyncStatus } from "@abhimanyu/database/client"

import { githubInstallationService } from "../github/installation.service"
import * as constants from "./reposync.constants"

// why ?
// app.octokit → app management APIs (installations, app info, token exchange).
// app.getInstallationOctokit(...) → anything that operates on repositories owned by an installation (files, commits, issues, pull requests, branches, etc.).
class RepoSyncService {
  public async findSyncedRepo({ repoFullName }: { repoFullName: string }) {
    return prisma.repoSync.findUnique({
      where: {
        repoFullName,
      },
    })
  }

  private isIndexableFile(entry: TreeEntry): boolean {
    if (!entry.path || entry.type !== "blob" || !entry.sha) {
      return false
    }

    if (entry.size && entry.size > constants.maxFileSizeBytes) {
      return false
    }
    const filePath = entry.path
    if (constants.ignoredDirList.some((dir) => dir.includes(filePath))) {
      return false
    }
    return constants.indexableCodeExtensionsList.some((ext) =>
      filePath.endsWith(ext)
    )
  }

  public async updateSyncStatus({
    status,
    repoSyncId,
  }: {
    status: RepoSyncStatus
    repoSyncId: string
  }) {
    return prisma.repoSync.update({
      where: {
        id: repoSyncId,
      },
      data: {
        status,
      },
    })
  }

  public async syncRepo({
    userId,
    branch,
    repoFullName,
  }: SyncRepoDetails & { userId: string }): Promise<string | null> {
    const installationId =
      await githubInstallationService.getInstallationIdByUserId({ userId })

    if (!installationId) {
      return null
    }

    const syncedRepo = await prisma.repoSync.upsert({
      where: { repoFullName },
      create: {
        status: "Pending",
        installationId,
        repoFullName,
        branch,
      },
      update: {
        status: "Pending",
        installationId,
        branch,
      },
    })

    return syncedRepo.id
  }

  public async getRepoFiles({
    installationId,
    branch,
    repoFullName,
  }: {
    installationId: number
    branch: string
    repoFullName: string
  }): Promise<RepoFile[] | null> {
    const [owner, repo] = repoFullName.split("/")
    const app = githubInstallationService.githubApp
    if (!owner || !repo || !app) return null

    const octokit = await app.getInstallationOctokit(installationId)

    // get the tree
    const { data } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: branch,
      recursive: "1",
    })

    // TODO: instead of filter can we ask the ai (small model) if we should index
    const entries = data.tree
      .filter(this.isIndexableFile)
      .slice(0, constants.maxFiles)
    const files: RepoFile[] = []

    for (const entry of entries) {
      // returns content as base64 encoded string
      const { data: blob } = await octokit.rest.git.getBlob({
        owner,
        repo,
        file_sha: entry.sha,
      })

      const content = Buffer.from(blob.content, "base64").toString("utf-8")
      files.push({
        filePath: entry.path,
        content,
      })
    }

    return files
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
      per_page: limit || constants.repoPerPage,
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
        ? cursor * constants.repoPerPage < total
        : constants.repoPerPage < total,
    }
  }
}

export const repoSyncService = new RepoSyncService()
