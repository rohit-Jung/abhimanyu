import { ragService, repoSyncService } from "@abhimanyu/services"
import { NonRetriableError } from "inngest"

import { inngestClient, repoSyncRequestedEvent } from "../client"

export const repoSyncRequest = inngestClient.createFunction(
  {
    id: "sync-request",
    triggers: {
      event: repoSyncRequestedEvent,
    },
    onFailure: async ({ event }) => {
      await repoSyncService.updateSyncStatus({
        status: "Failed",
        repoSyncId: event.data.event.data.repoSyncId,
      })
    },
  },
  async ({ event, step }) => {
    const syncId = event.data.repoSyncId

    const syncedRepo = await step.run("mark-as-syncing", async () => {
      return await repoSyncService.updateSyncStatus({
        repoSyncId: syncId,
        status: "Syncing",
      })
    })

    const chunkedFiles = step.run("chunk-and-store", async () => {
      const files = await repoSyncService.getRepoFiles({
        repoFullName: syncedRepo.repoFullName,
        installationId: syncedRepo.installationId,
        branch: syncedRepo.branch,
      })

      if (!files) throw new NonRetriableError("Failed to getRepoFiles")

      return ragService.chunkFiles({
        type: "repo",
        repoFullName: syncedRepo.repoFullName,
        files,
      })
    })

    const namespace = ragService.getNamespace({
      type: "repo",
      repoFullName: syncedRepo.repoFullName,
    })

    // if we have old vectors delete em
    if (syncedRepo.syncedAt) {
      step.run("delete-old-vectors", async () => {
        await ragService.deleteNamespace(namespace)
      })
    }

    step.run("save-vectors-to-db", async () => {})
  }
)
