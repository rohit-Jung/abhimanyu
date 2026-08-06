"use client"

import { ReviewActivityPoint } from "@abhimanyu/contracts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@abhimanyu/ui/components/chart"
import { format, parseISO } from "date-fns"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

import { ChartCard } from "./chart-card"

const config = {
  reviews: { label: "Reviews", color: "var(--chart-2)" },
}

const formatDay = (value: string | number) =>
  format(parseISO(String(value)), "MMM d")

export function ReviewActivityChart({
  data,
  days,
}: {
  data: ReviewActivityPoint[]
  days: number
}) {
  const total = data.reduce((sum, point) => sum + point.reviews, 0)

  return (
    <ChartCard
      eyebrow={`Reviews · last ${days} days`}
      title={total === 1 ? "1 review delivered" : `${total} reviews delivered`}
      empty={total === 0}
      emptyMessage="No reviews in this window yet. They appear here once Abhimanyu reviews a pull request."
    >
      <ChartContainer config={config} className="h-[220px]">
        <AreaChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
          <defs>
            <linearGradient
              id="review-activity-fill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="var(--color-reviews)"
                stopOpacity={0.28}
              />
              <stop
                offset="100%"
                stopColor="var(--color-reviews)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDay}
            tickLine={false}
            axisLine={false}
            minTickGap={32}
            tickMargin={10}
            fontSize={11}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            width={48}
            fontSize={11}
          />
          <Tooltip
            cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
            content={<ChartTooltipContent labelFormatter={formatDay} />}
          />
          <Area
            dataKey="reviews"
            type="monotone"
            stroke="var(--color-reviews)"
            strokeWidth={2}
            fill="url(#review-activity-fill)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  )
}
