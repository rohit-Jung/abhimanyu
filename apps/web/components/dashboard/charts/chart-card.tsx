import { cn } from "@abhimanyu/ui/lib/utils"

type ChartCardProps = {
  /** Mono eyebrow naming the measure — also names the single series. */
  eyebrow: string
  title: string
  /** Shown in place of the plot when there is nothing to draw yet. */
  empty?: boolean
  emptyMessage?: string
  className?: string
  children: React.ReactNode
}

export function ChartCard({
  eyebrow,
  title,
  empty,
  emptyMessage = "No data yet.",
  className,
  children,
}: ChartCardProps) {
  return (
    <figure className={cn("flex flex-col gap-4 border bg-card p-5", className)}>
      <figcaption className="flex flex-col gap-1">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {eyebrow}
        </span>
        <span className="font-heading text-base font-semibold tracking-tight">
          {title}
        </span>
      </figcaption>
      {empty ? (
        <p className="flex h-[220px] items-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        children
      )}
    </figure>
  )
}
