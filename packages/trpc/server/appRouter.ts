import { githubRouter } from "./github/routes"
import { healthRouter } from "./health/router"
import { repoSyncRouter } from "./reposync/routes"
import { router } from "./trpc"

export const appRouter = router({
  health: healthRouter,
  github: githubRouter,
  repo: repoSyncRouter,
})

export type AppRouter = typeof appRouter
