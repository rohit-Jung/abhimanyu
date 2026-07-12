import z from "zod"

export const healthOutputSchema = z.object({
  status: z.string(),
  message: z.string(),
})
