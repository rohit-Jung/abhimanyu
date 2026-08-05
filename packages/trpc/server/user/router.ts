import { userInfo } from "@abhimanyu/contracts"
import { userService } from "@abhimanyu/services"
import { TRPCError } from "@trpc/server"

import { protectedProcedure, router } from "../trpc"

export const userRouter = router({
  getUserSettings: protectedProcedure
    .output(userInfo)
    .query(async ({ ctx }) => {
      const userInfo = await userService.getUser({ userId: ctx.user.id })
      if (!userInfo) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        })
      }

      return {
        profile: {
          name: userInfo.name,
          email: userInfo.email,
          image: userInfo.image,
          memberSince: userInfo.createdAt.toISOString(),
        },
        subscription: {
          plan: userInfo.subscriptionPlan,
          status: userInfo?.subscriptionStatus ?? "Trailing",
          renewsAt: userInfo.subscriptionRenewsAt?.toISOString() ?? null,
        },
        usage: {
          usage: 0,
          limit: 0,
        },
      }
    }),
})
