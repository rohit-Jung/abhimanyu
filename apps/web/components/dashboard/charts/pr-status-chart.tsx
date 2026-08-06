"use client"

import { PullRequestStatusCount } from "@abhimanyu/contracts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@abhimanyu/ui/components/chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartCard } from "./chart-card"

const config = {
  count: { label: "Pull requests", color: "var(--chart-2)" },
}

/** Workflow order, so the axis reads as a pipeline rather than by size. */
const STATUS_ORDER = [
  "Pending",
  "Processing",
  "Review",
  "Reviewed",
  "RateLimited",
] as const

const STATUS_LABEL: Record<string, string> = {
  Pending: "Pending",
  Processing: "Processing",
  Review: "In review",
  Reviewed: "Reviewed",
  RateLimited: "Rate limited",
}

export function PrStatusChart({ data }: { data: PullRequestStatusCount[] }) {
  const byStatus = new Map(data.map((entry) => [entry.status, entry.count]))
  const rows = STATUS_ORDER.filter((status) => byStatus.has(status)).map(
    (status) => ({
      status: STATUS_LABEL[status] ?? status,
      count: byStatus.get(status) ?? 0,
    })
  )

  const total = rows.reduce((sum, row) => sum + row.count, 0)

  return (
    <ChartCard
      eyebrow="Pull requests · by state"
      title={
        total === 1
          ? "1 pull request tracked"
          : `${total} pull requests tracked`
      }
      empty={rows.length === 0}
      emptyMessage="No pull requests tracked yet. Open one on a connected repo to see it here."
    >
      <ChartContainer config={config} className="h-[220px]">
        <BarChart
          data={rows}
          layout="vertical"
          margin={{ left: 8, right: 32, top: 4, bottom: 4 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" hide allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="status"
            tickLine={false}
            axisLine={false}
            width={96}
            fontSize={11}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)", fillOpacity: 0.4 }}
            content={<ChartTooltipContent />}
          />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={[0, 4, 4, 0]}
            barSize={18}
          >
            <LabelList
              dataKey="count"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={11}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  )
}
