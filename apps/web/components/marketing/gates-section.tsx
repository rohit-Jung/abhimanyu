import { LANDING_COPY, LANDING_GATES } from "@/lib/constants"

export function GatesSection() {
  return (
    <section className="border-t px-6 py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {LANDING_COPY.gatesEyebrow}
        </span>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {LANDING_GATES.map((gate) => (
            <div key={gate.mark} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-primary">
                  {gate.mark}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="font-heading text-xl font-semibold">
                {gate.title}
              </h3>
              <p className="text-sm text-balance text-muted-foreground">
                {gate.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
