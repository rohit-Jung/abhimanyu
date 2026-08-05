import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@abhimanyu/ui/components/card"

import { LANDING_FEATURES } from "@/lib/constants"

export function FeaturesSection() {
  return (
    <section className="border-t px-6 py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-4 sm:grid-cols-3">
        {LANDING_FEATURES.map((feature) => (
          <Card key={feature.title} className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-balance">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
