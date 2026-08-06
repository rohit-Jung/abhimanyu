import { analyticsRangeInput, dashboardOverview } from "@abhimanyu/contracts"
import { analyticsService } from "@abhimanyu/services"

import { protectedProcedure, router } from "../trpc"

export const analyticsRouter = router({
  getDashboardOverview: protectedProcedure
    .input(analyticsRangeInput)
    .output(dashboardOverview)
    .query(async ({ input, ctx }) => {
      return analyticsService.getDashboardOverview({
        userId: ctx.user.id,
        days: input.days,
      })
    }),
})
