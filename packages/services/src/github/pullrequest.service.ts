import { prisma, PullRequest, PullRequestStatus } from "@abhimanyu/database/client"

class GithubPullRequestService {
  public async updateStatus({
    status,
    id,
  }: {
    status: PullRequestStatus
    id: string
  }): Promise<PullRequest> {
    const pullRequest = await prisma.pullRequest.update({
      where: { id },
      data: { status },
    })

    return pullRequest
  }
}

export const githubPullRequestService = new GithubPullRequestService()
