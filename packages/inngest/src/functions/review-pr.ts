import {
  githubPullRequestService,
  ragService,
  repoSyncService,
} from "@abhimanyu/services"

import { inngestClient, prReceivedEvent } from "../client"

const reviewPullRequest = inngestClient.createFunction(
  {
    id: "review-pull-request",
    timeouts: {
      start: "20m", // max time for each run
      finish: "2h",
    },
    triggers: {
      event: prReceivedEvent,
    },
  },
  async ({ event, step }) => {
    const pullRequestId = event.data.pullRequestId

    const { repoFullName, installationId, prNumber, title } = await step.run(
      "mark-processing",
      async () => {
        const request = await githubPullRequestService.updateStatus({
          id: pullRequestId,
          status: "Processing",
        })

        return request
      }
    )

    const chunks = await step.run("breakdown-code", async () => {
      const [owner, repo] = repoFullName.split("/")
      if (!owner || !repo) return

      const files = await githubPullRequestService.getPrFiles({
        repo,
        owner,
        installationId,
        prNumber,
      })

      return ragService.chunkPrFiles({
        prNumber,
        files,
      })
    })

    // if chunks are not there mark it as reveiwed
    if (!chunks || chunks.length == 0) {
      await step.run("mark-as-reviewed", async () => {
        await githubPullRequestService.updateStatus({
          id: pullRequestId,
          status: "Reviewed",
        })
      })

      return {
        pullRequestId,
        status: "reviewed",
        reason: "Code not provided to review",
      }
    }

    await step.run("save-chunks-to-db", async () => {
      await ragService.saveChunksToPinecone({
        prNumber,
        repoFullName,
        chunks,
      })
    })

    // pinecone needs a short delay before new vectors appear in search results
    await step.sleep("cooling-time-for-vector-index", "10s")

    // extra context from the on-demand codebase sync, when the repo was synced
    const codebaseContext = await step.run("get-repo-context", async () => {
      const syncedRepo = await repoSyncService.findSyncedRepo({
        repoFullName,
      })

      if (!syncedRepo || syncedRepo.status !== "Synced") {
        return []
      }

      return await ragService.searchPrContext({
        type: "repo",
        repoFullName,
        query: title,
      })
    })

    // generate a review from the model
    const generatedReview = await step.run("generate-review", async () => {
      const prContext = await ragService.searchPrContext({
        type: "pr",
        repoFullName,
        prNumber,
        query: title,
      })

      return ragService.generateReview({
        repoFullName,
        title,
        prContext,
        codebaseContext,
      })
    })

    await step.run("post-pr-comment", async () => {
      await githubPullRequestService.postPrComment({
        repoFullName,
        installationId,
        prNumber,
        body: generatedReview,
      })
    })

    await step.run("mark-as-reviewed", async () => {
      await githubPullRequestService.update({
        id: pullRequestId,
        pullRequest: {
          status: "Reviewed",
          reviewComment: generatedReview,
          reviewedAt: new Date(),
        },
      })
    })

    return {
      pullRequestId,
      status: "reviewed",
    }
  }
)

export { reviewPullRequest }
