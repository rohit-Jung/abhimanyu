"use server"

import { revalidatePath } from "next/cache"

import { createServerCaller } from "@/lib/trpc/server"

export async function disconnectAppAction() {
  const api = await createServerCaller()
  await api.github.deleteGithubInstallationByUserId()
  revalidatePath("/github") // revalidate the path
}
