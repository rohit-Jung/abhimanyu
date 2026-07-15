import { installationStatusForUserSchema } from "@abhimanyu/contracts"
import { InstallationService } from "@abhimanyu/services"

import { protectedProcedure, router } from "../trpc"

const installationService = new InstallationService()

export const githubRouter = router({
  getInstallationStatusForUser: protectedProcedure
    .output(installationStatusForUserSchema)
    .query(async ({ ctx }) => {
      const installation =
        await installationService.getInstallationStatusForUser({
          userId: ctx.user.id,
        })

      if (!installation) {
        return {
          connected: false,
          accountLogin: null,
          installedAt: null,
        }
      }
      console.log("userID", ctx.user.id)
      console.log("installation", installation)

      return installation
    }),
})
