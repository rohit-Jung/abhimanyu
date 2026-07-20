import { githubPullRequestService } from "@abhimanyu/services"

import { inngestClient, prReceived } from "../client"

const reviewPullRequest = inngestClient.createFunction(
  {
    id: "review-pull-request",
    triggers: {
      event: prReceived,
    },
  },
  async ({ event, step }) => {
    const pullRequestId = event.data.pullRequestId

    const pullRequest = await step.run("mark-processing", async () => {
      const request = await githubPullRequestService.updateStatus({
        id: pullRequestId,
        status: "Processing",
      })

      return request
    })

    const chunks = await step.run("breakdown-code", async () => {})
    return { message: "hello" }
  }
)

export { reviewPullRequest }
