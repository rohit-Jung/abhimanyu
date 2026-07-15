import { githubRouter } from "./github/routes"
import { healthRouter } from "./health/router"
import { router } from "./trpc"

export const appRouter = router({
  health: healthRouter,
  github: githubRouter,
})

export type AppRouter = typeof appRouter
