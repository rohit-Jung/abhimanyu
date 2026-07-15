import { type } from "arktype"

export const healthOutputSchema = type({
  message: "string",
  status: "string",
})
