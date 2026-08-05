import { Button } from "@abhimanyu/ui/components/button"
import { Metadata } from "next"
import Link from "next/link"

import { DashboardHeader } from "@/components/dashboard-header"
import { DASHBOARD_ROUTES, PageMetadata } from "@/lib/constants"

export const metadata: Metadata = PageMetadata[DASHBOARD_ROUTES.dashboard]

const SETUP_STEPS = [
  {
    title: "Connect GitHub",
    description:
      "Install the Abhimanyu app on the account or org that owns your repos.",
    href: DASHBOARD_ROUTES.github,
    action: "Open GitHub setup",
  },
  {
    title: "Choose repos",
    description:
      "Pick the repos Abhimanyu should index. Each one is chunked and embedded for retrieval.",
    href: DASHBOARD_ROUTES.repos,
    action: "Choose repos",
  },
  {
    title: "Read a review",
    description:
      "Open a pull request. Abhimanyu reviews it with context from the whole codebase, not just the diff.",
    href: DASHBOARD_ROUTES.pullRequest,
    action: "View pull requests",
  },
]

export default function Page() {
  return (
    <>
      <DashboardHeader title="Dashboard" description="Setup and overview" />

      <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6">
        <section className="flex flex-col gap-2">
          <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            Start here
          </span>
          <h2 className="max-w-lg font-heading text-2xl font-semibold tracking-tight text-balance">
            Three steps to your first review.
          </h2>
        </section>

        <section className="grid gap-px border bg-border md:grid-cols-3">
          {SETUP_STEPS.map((step) => (
            <div
              key={step.title}
              className="flex flex-col gap-3 bg-background p-6"
            >
              <h3 className="font-heading text-base font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="flex-1 text-sm text-balance text-muted-foreground">
                {step.description}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                nativeButton={false}
                render={<Link href={step.href} />}
              >
                {step.action}
              </Button>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
