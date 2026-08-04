import {
  getInfiniteRepoSchema,
  installationStatusForUserSchema,
} from "@abhimanyu/contracts"
import { githubInstallationService, repoSyncService } from "@abhimanyu/services"

import { protectedProcedure, router } from "../trpc"

export const githubRouter = router({
  deleteGithubInstallationByUserId: protectedProcedure.mutation(
    async ({ ctx }) => {
      const userId = ctx.user.id
      await githubInstallationService.deleteInstallationByUserId({ userId })
    }
  ),
  getInfiniteRepos: protectedProcedure
    .input(getInfiniteRepoSchema)
    .query(async ({ input, ctx }) => {
      const userId = ctx.user.id

      const items = await repoSyncService.getRepos({
        ...input,
        userId,
      })

      const nextPage = items.hasMore ? (input.cursor ?? 0) + 1 : undefined
      return {
        items,
        nextPage,
      }
    }),
  getInstallationStatusForUser: protectedProcedure
    .output(installationStatusForUserSchema)
    .query(async ({ ctx }) => {
      const installation =
        await githubInstallationService.getInstallationStatusForUser({
          userId: ctx.user.id,
        })

      return installation
    }),
})
