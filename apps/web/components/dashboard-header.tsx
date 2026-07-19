"use client"

import { Separator } from "@abhimanyu/ui/components/separator"
import { SidebarTrigger } from "@abhimanyu/ui/components/sidebar"

type DashboardHeaderProps = {
  title: string
  description?: string
}

/**
 * Renders the sticky dashboard page header with sidebar trigger.
 */
export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
      />
      <div className="flex min-w-0 flex-col">
        <h1 className="truncate text-sm font-medium">{title}</h1>
        {description ? (
          <p className="truncate text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  )
}
