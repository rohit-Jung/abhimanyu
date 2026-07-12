import { healthRouter } from "./health/router"
import { router } from "./trpc"

export const appRouter = router({
  health: healthRouter,
})

export type AppRouter = typeof appRouter
