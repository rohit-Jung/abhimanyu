import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { healthOutputSchema } from "./schema";

export const healthRouter = router({
  get: publicProcedure
    .input(z.undefined())
    .output(healthOutputSchema)
    .query(() => {
      return {
        message: "Server is up and running",
        status: "200",
      };
    }),
});
