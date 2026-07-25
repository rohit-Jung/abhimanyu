import {
  PullRequestWebhookPayload,
  TVerifySignature,
} from "@abhimanyu/contracts"
import { PrFile } from "@abhimanyu/contracts"
import {
  prisma,
  PullRequest,
  PullRequestStatus,
} from "@abhimanyu/database/client"

import { githubInstallationService } from "./installation.service"

class GithubPullRequestService {
  private FILES_PER_PAGE = 100

  public async isValidSignature({
    eventPayload,
    signature,
  }: TVerifySignature): Promise<boolean> {
    const app = githubInstallationService.githubApp
    if (!app) return false

    return app.webhooks.verify(eventPayload, signature)
  }

  public async updateStatus({
    status,
    id,
  }: {
    status: PullRequestStatus
    id: string
  }): Promise<PullRequest> {
    return prisma.pullRequest.update({
      where: { id },
      data: { status },
    })
  }

  public async update({
    pullRequest,
    id,
  }: {
    pullRequest: Partial<PullRequest>
    id: string
  }): Promise<PullRequest> {
    return prisma.pullRequest.update({
      where: { id },
      data: { ...pullRequest },
    })
  }

  public async getPrFiles({
    installationId,
    owner,
    repo,
    prNumber,
  }: {
    installationId: number
    owner: string
    repo: string
    prNumber: number
  }): Promise<PrFile[]> {
    const app = githubInstallationService.githubApp
    if (!app) return []

    const octokit = await app.getInstallationOctokit(installationId)
    const { data } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber,
      per_page: this.FILES_PER_PAGE,
    })

    const files: PrFile[] = []
    for (const file of data) {
      if (!file.patch) continue

      files.push({
        filePath: file.filename,
        patch: file.patch,
      })
    }

    return files
  }

  public async savePullRequest(data: PullRequestWebhookPayload) {
    const prNumber = data.pull_request.number
    const installationId = data.installation.id

    return prisma.pullRequest.upsert({
      where: {
        installationId_prNumber: { installationId, prNumber },
      },
      create: {
        installationId,
        prNumber,
        title: data.pull_request.title,
        headSha: data.pull_request.head.sha,
        repoFullName: data.repository.full_name,
        baseBranch: data.pull_request.base.ref,
        status: "Pending",
        reviewComment: "",
      },
      update: {
        title: data.pull_request.title,
        headSha: data.pull_request.head.sha,
        status: "Pending",
      },
    })
  }

  public async postPrComment({
    installationId,
    repoFullName,
    prNumber,
    body,
  }: {
    installationId: number
    repoFullName: string
    prNumber: number
    body: string
  }) {
    const app = githubInstallationService.githubApp
    if (!app) return []

    const octokit = await app.getInstallationOctokit(installationId)
    const [owner, repo] = repoFullName.split("/")
    if (!owner || !repo) return

    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body,
    })
  }
}

export const githubPullRequestService = new GithubPullRequestService()
