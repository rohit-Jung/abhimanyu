import { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard-header"
import GithubRepos from "@/components/github/github-repos"
import { DASHBOARD_ROUTES, PageMetadata } from "@/lib/constants"

export const metadata: Metadata = PageMetadata[DASHBOARD_ROUTES.repos]

export default async function Page() {
  return (
    <>
      <DashboardHeader
        title="Repos"
        description="Repos Abhimanyu indexes and reviews"
      />
      <GithubRepos />
    </>
  )
}
