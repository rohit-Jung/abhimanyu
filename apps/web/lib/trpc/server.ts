"use server"

import { appRouter, createContext } from "@abhimanyu/trpc/server"
import { headers } from "next/headers"
import { cache } from "react"

export const createServerCaller = cache(async () => {
  const ctx = await createContext({ headers: await headers() })
  return appRouter.createCaller(ctx)
})

// If your router is on a separate server, pass a client instead:
// createTRPCOptionsProxy({
//   client: createTRPCClient({ links: [httpLink({ url: '...' })] }),
//   queryClient: getQueryClient,
// });
