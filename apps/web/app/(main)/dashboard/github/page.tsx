import { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard-header"
import GithubInstallationCard from "@/components/github-installation-card"
import { getUserSession } from "@/features/auth/actions/auth"
import { PageMetadata } from "@/lib/constants"

export const metadata: Metadata = PageMetadata["/dashboard/github"]

export default async function Page() {
  const session = await getUserSession()

  return (
    <>
      <DashboardHeader
        title={metadata.title as string}
        description={metadata.description as string}
      />
      <GithubInstallationCard userId={session.user.id} />
    </>
  )
}
