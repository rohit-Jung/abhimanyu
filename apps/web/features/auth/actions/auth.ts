"use server"

import { auth } from "@abhimanyu/services"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { AUTH_ROUTES } from "@/lib/constants"

export async function getUserSession(
  redirectRoute: AUTH_ROUTES = AUTH_ROUTES.signup
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect(redirectRoute)
  }

  return session
}
