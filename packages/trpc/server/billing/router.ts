import { billingService } from "@abhimanyu/services"
import { TRPCError } from "@trpc/server"

import { protectedProcedure, router } from "../trpc"

export const billingRouter = router({
  upgrade: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await billingService.createProSubscription({
      userId: ctx.user.id,
    })

    if (res.error) {
      throw new TRPCError({
        message: res.error,
        code: "BAD_REQUEST",
        cause: res.error,
      })
    }

    return { success: true, subscription_id: res.subscriptionId }
  }),

  cancel: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await billingService.cancelSubscription({
      userId: ctx.user.id,
    })

    if (res.error) {
      throw new TRPCError({
        message: res.error,
        code: "BAD_REQUEST",
        cause: res.error,
      })
    }

    return { success: true }
  }),
})
