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

    const chunkedFiles = await step.run("chunk-and-store", async () => {
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
      await step.run("delete-old-vectors", async () => {
        await ragService.deleteNamespace(namespace)
      })
    }

    await step.run("save-chunks-to-db", async () => {
      await ragService.saveChunksToPinecone({
        namespace,
        chunks: chunkedFiles,
      })
    })

    await step.run("mark-as-synced", async () => {
      await repoSyncService.updateSyncStatus({
        status: "Synced",
        repoSyncId: syncedRepo.id,
      })
    })

    return {
      repoSyncId: syncedRepo.id,
      status: "synced",
      chunkCount: chunkedFiles.length,
    }
  }
)
