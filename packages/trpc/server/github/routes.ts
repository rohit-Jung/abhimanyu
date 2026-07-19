import { installationStatusForUserSchema } from "@abhimanyu/contracts"
import { githubService } from "@abhimanyu/services"

import { protectedProcedure, router } from "../trpc"

export const githubRouter = router({
  getInstallationStatusForUser: protectedProcedure
    .output(installationStatusForUserSchema)
    .query(async ({ ctx }) => {
      const installation = await githubService.getInstallationStatusForUser({
        userId: ctx.user.id,
      })

      if (!installation) {
        return {
          connected: false,
          accountLogin: null,
          installedAt: null,
        }
      }

      return installation
    }),
})
