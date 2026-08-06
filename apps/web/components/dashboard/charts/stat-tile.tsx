import { cn } from "@abhimanyu/ui/lib/utils"

type StatTileProps = {
  label: string
  value: number
  /** Unit shown next to the value, e.g. "repos". Keep it short. */
  unit?: string
  className?: string
}

export function StatTile({ label, value, unit, className }: StatTileProps) {
  return (
    <div className={cn("flex flex-col gap-1 bg-background p-5", className)}>
      <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="font-heading text-3xl font-semibold tracking-tight">
        {value.toLocaleString("en-US")}
        {unit ? (
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </span>
    </div>
  )
}
