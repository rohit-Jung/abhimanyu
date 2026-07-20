import { getUserSession } from "@/features/auth/actions/auth"

import GithubInstallationCard from "./github-installation-card"

export async function GithubInstallationCardWrapper() {
  const session = await getUserSession()
  return <GithubInstallationCard userId={session.user.id} />
}
