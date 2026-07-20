import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { fromNodeHeaders } from "better-auth/node"

import { createContext } from "./context"

// create context for express
export async function createExpressContext({
  req,
}: CreateExpressContextOptions) {
  return createContext({ headers: fromNodeHeaders(req.headers) })
}
