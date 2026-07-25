import { installationStatusForUserSchema } from "@abhimanyu/contracts"
import { githubInstallationService } from "@abhimanyu/services"

import { protectedProcedure, router } from "../trpc"

export const githubRouter = router({
  deleteGithubInstallationByUserId: protectedProcedure.mutation(
    async ({ ctx }) => {
      const userId = ctx.user.id
      await githubInstallationService.deleteInstallationByUserId({ userId })
    }
  ),
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
