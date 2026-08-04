import { syncRepoDetails } from "@abhimanyu/contracts"
import { inngestClient, repoSyncRequestedEvent } from "@abhimanyu/inngest"
import { repoSyncService } from "@abhimanyu/services"
import { TRPCError } from "@trpc/server"

import { protectedProcedure, router } from "../trpc"

export const repoSyncRouter = router({
  createSync: protectedProcedure
    .input(syncRepoDetails)
    .mutation(async ({ input, ctx }) => {
      const syncedRepoId = await repoSyncService.syncRepo({
        ...input,
        userId: ctx.user.id,
      })

      if (!syncedRepoId) {
        throw new TRPCError({
          message: "Repo Sync failed",
          code: "INTERNAL_SERVER_ERROR",
        })
      }

      // trigger a workflow
      await inngestClient.send(
        repoSyncRequestedEvent.create({
          repoSyncId: syncedRepoId,
        })
      )

      return {
        success: true,
      }
    }),
})
