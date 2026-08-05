import { Button } from "@abhimanyu/ui/components/button"
import Link from "next/link"

import { AUTH_ROUTES, LANDING_COPY } from "@/lib/constants"

import { Labyrinth } from "./labyrinth"

export function Hero() {
  const [firstLine, secondLine] = LANDING_COPY.headline

  return (
    <section className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
      <div className="flex max-w-xl flex-col gap-6">
        <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
          {LANDING_COPY.eyebrow}
        </span>
        <h1 className="font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
          {firstLine}
          <br />
          {secondLine}
        </h1>
        <p className="text-lg text-balance text-muted-foreground">
          {LANDING_COPY.subhead}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={AUTH_ROUTES.signin} />}
          >
            {LANDING_COPY.cta}
          </Button>
        </div>
      </div>

      <Labyrinth className="mx-auto w-full max-w-sm md:max-w-none" />
    </section>
  )
}
