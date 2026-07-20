"use client"

import { redirect } from "next/navigation"

import { getUserSession } from "@/features/auth/actions/auth"

export async function AuthGate({ children }: { children: React.ReactNode }) {
  const session = await getUserSession()
  if (!session) redirect("/signup")
  return <>{children}</>
}
