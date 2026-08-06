import { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { DASHBOARD_ROUTES, PageMetadata } from "@/lib/constants"

export const metadata: Metadata = PageMetadata[DASHBOARD_ROUTES.dashboard]

export default function Page() {
  return (
    <>
      <DashboardHeader title="Dashboard" description="Setup and overview" />

      <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6">
        <section className="flex flex-col gap-2">
          <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            Start here
          </span>
          {/* <h2 className="max-w-lg font-heading text-2xl font-semibold tracking-tight text-balance"> */}
          {/*   Three steps to your first review. */}
          {/* </h2> */}
        </section>

        {/* <section className="grid gap-px border bg-border md:grid-cols-3"> */}
        {/*   {SETUP_STEPS.map((step) => ( */}
        {/*     <div */}
        {/*       key={step.title} */}
        {/*       className="flex flex-col gap-3 bg-background p-6" */}
        {/*     > */}
        {/*       <h3 className="font-heading text-base font-semibold tracking-tight"> */}
        {/*         {step.title} */}
        {/*       </h3> */}
        {/*       <p className="flex-1 text-sm text-balance text-muted-foreground"> */}
        {/*         {step.description} */}
        {/*       </p> */}
        {/*       <Button */}
        {/*         variant="outline" */}
        {/*         size="sm" */}
        {/*         className="w-fit" */}
        {/*         nativeButton={false} */}
        {/*         render={<Link href={step.href} />} */}
        {/*       > */}
        {/*         {step.action} */}
        {/*       </Button> */}
        {/*     </div> */}
        {/*   ))} */}
        {/* </section> */}
        <DashboardOverview />
      </div>
    </>
  )
}
