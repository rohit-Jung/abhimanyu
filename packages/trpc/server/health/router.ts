import { healthOutputSchema } from "@abhimanyu/contracts"

import { publicProcedure, router } from "../trpc"

export const healthRouter = router({
  get: publicProcedure.output(healthOutputSchema).query(() => {
    return {
      message: "Server is up and running",
      status: "200",
    }
  }),
})
