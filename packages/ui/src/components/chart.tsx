"use client"

import { cn } from "@abhimanyu/ui/lib/utils"
import * as React from "react"
import { ResponsiveContainer } from "recharts"

/**
 * Wraps a recharts tree in a responsive box and exposes each series' color as
 * a CSS custom property (`--color-<key>`), so marks are styled by role rather
 * than by hard-coded hex.
 */
export type ChartConfig = Record<string, { label: string; color?: string }>

const ChartContext = React.createContext<ChartConfig>({})

export function useChartConfig() {
  return React.useContext(ChartContext)
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<typeof ResponsiveContainer>["children"]
}) {
  const colorVars = Object.entries(config).reduce<Record<string, string>>(
    (vars, [key, item]) => {
      if (item.color) vars[`--color-${key}`] = item.color
      return vars
    },
    {}
  )

  return (
    <ChartContext.Provider value={config}>
      <div
        className={cn(
          "w-full text-muted-foreground [&_.recharts-cartesian-axis-tick_text]:fill-current [&_.recharts-cartesian-grid_line]:stroke-border/60 [&_.recharts-surface]:overflow-visible",
          className
        )}
        style={colorVars as React.CSSProperties}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

type TooltipPayloadItem = {
  dataKey?: string | number
  name?: string | number
  value?: number | string
  color?: string
}

/**
 * Tooltip body for recharts' `content` slot. Values stay in text ink; the
 * series color rides a swatch beside them.
 */
export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
}: {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string | number
  labelFormatter?: (label: string | number) => string
  valueFormatter?: (value: number | string) => string
}) {
  const config = useChartConfig()

  if (!active || !payload?.length) return null

  return (
    <div className="grid min-w-36 gap-1.5 border bg-popover p-2.5 text-xs text-popover-foreground shadow-md">
      {label !== undefined ? (
        <span className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase opacity-70">
          {labelFormatter ? labelFormatter(label) : label}
        </span>
      ) : null}
      {payload.map((item, index) => {
        const key = String(item.dataKey ?? item.name ?? index)
        const itemConfig = config[key]
        return (
          <div key={key} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-2 shrink-0"
                style={{ backgroundColor: item.color ?? itemConfig?.color }}
              />
              {itemConfig?.label ?? key}
            </span>
            <span className="font-medium text-foreground tabular-nums">
              {item.value !== undefined && valueFormatter
                ? valueFormatter(item.value)
                : item.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}
