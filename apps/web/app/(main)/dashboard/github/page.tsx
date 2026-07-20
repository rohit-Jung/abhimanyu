import { Metadata } from "next"
import { Suspense } from "react"

import { DashboardHeader } from "@/components/dashboard-header"
import { GithubInstallationCardWrapper } from "@/components/github/github-installation-card-wrapper"
import { PageMetadata } from "@/lib/constants"

export const metadata: Metadata = PageMetadata["/dashboard/github"]

export default function Page() {
  return (
    <>
      <DashboardHeader
        title={metadata.title as string}
        description={metadata.description as string}
      />
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <GithubInstallationCardWrapper />
      </Suspense>
    </>
  )
}
