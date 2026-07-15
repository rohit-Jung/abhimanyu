import { auth } from "@abhimanyu/services"
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { fromNodeHeaders } from "better-auth/node"

// created for each request
export async function createContext({ req }: CreateExpressContextOptions) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  return {
    session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
