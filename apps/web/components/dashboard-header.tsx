"use client"

import { Separator } from "@abhimanyu/ui/components/separator"
import { SidebarTrigger } from "@abhimanyu/ui/components/sidebar"

type DashboardHeaderProps = {
  title: string
  description?: string
  /** Page-level actions, rendered at the trailing edge of the header. */
  actions?: React.ReactNode
}

/**
 * Renders the sticky dashboard page header with sidebar trigger.
 */
export function DashboardHeader({
  title,
  description,
  actions,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="data-vertical:h-4 data-vertical:self-auto"
      />
      <div className="flex min-w-0 flex-col">
        <h1 className="truncate font-heading text-sm font-semibold tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="truncate text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="ml-auto flex items-center gap-2">{actions}</div>
      ) : null}
    </header>
  )
}
