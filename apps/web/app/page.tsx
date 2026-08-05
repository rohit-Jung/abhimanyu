import { FeaturesSection } from "@/components/marketing/features-section"
import { GatesSection } from "@/components/marketing/gates-section"
import { Hero } from "@/components/marketing/hero"
import { SiteFooter } from "@/components/marketing/site-footer"
import { SiteHeader } from "@/components/marketing/site-header"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <Hero />
        <GatesSection />
        <FeaturesSection />
      </main>

      <SiteFooter />
    </div>
  )
}
