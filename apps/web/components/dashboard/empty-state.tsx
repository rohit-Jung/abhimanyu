import { cn } from "@abhimanyu/ui/lib/utils"

type EmptyStateProps = {
  /** Short mono label describing the kind of thing that is missing. */
  eyebrow: string
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

/**
 * Placeholder shown when a dashboard surface has nothing to list yet.
 */
export function EmptyState({
  eyebrow,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 border border-dashed p-8 sm:p-12",
        className
      )}
    >
      <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {eyebrow}
      </span>
      <h2 className="font-heading text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="max-w-md text-sm text-balance text-muted-foreground">
        {description}
      </p>
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  )
}
