import { installationStatusForUserSchema } from "@abhimanyu/contracts"
import { githubService } from "@abhimanyu/services"

import { protectedProcedure, router } from "../trpc"

export const githubRouter = router({
  deleteGithubInstallationByUserId: protectedProcedure.mutation(
    async ({ ctx }) => {
      const userId = ctx.user.id
      await githubService.deleteInstallationByUserId({ userId })
    }
  ),
  getInstallationStatusForUser: protectedProcedure
    .output(installationStatusForUserSchema)
    .query(async ({ ctx }) => {
      const installation = await githubService.getInstallationStatusForUser({
        userId: ctx.user.id,
      })

      return installation
    }),
})
