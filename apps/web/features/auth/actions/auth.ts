"use server"

import { auth } from "@abhimanyu/services"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

import { AUTH_ROUTES } from "@/lib/constants"
import { createServerCaller } from "@/lib/trpc/server"

export const getUserSession = cache(
  async (redirectRoute: AUTH_ROUTES = AUTH_ROUTES.signin) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      redirect(redirectRoute)
    }

    return session
  }
)

export const getUserSettings = async () => {
  const api = await createServerCaller()
  const settings = await api.user.getUserSettings()
  return settings
}
