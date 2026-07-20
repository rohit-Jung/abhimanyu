import { serve } from "inngest/express"

import { inngestClient } from "./src/client"
import { inngestFunctions } from "./src/functions"

export const inngest = serve({
  client: inngestClient,
  functions: inngestFunctions,
})

export * from "./src/client"
