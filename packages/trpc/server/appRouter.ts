import { analyticsRouter } from "./analytics/router"
import { billingRouter } from "./billing/router"
import { githubRouter } from "./github/router"
import { healthRouter } from "./health/router"
import { repoSyncRouter } from "./reposync/router"
import { router } from "./trpc"
import { userRouter } from "./user/router"

export const appRouter = router({
  analytics: analyticsRouter,
  health: healthRouter,
  github: githubRouter,
  repo: repoSyncRouter,
  user: userRouter,
  billing: billingRouter,
})

export type AppRouter = typeof appRouter
