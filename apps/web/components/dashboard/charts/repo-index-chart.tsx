"use client"

import { RepoIndexPoint } from "@abhimanyu/contracts"
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
  chunks: { label: "Chunks", color: "var(--chart-2)" },
}

const formatCount = (value: number | string) =>
  Number(value).toLocaleString("en-US")

/** Strips the owner so the axis shows the repo name, which is what varies. */
const repoLabel = (repoFullName: string) =>
  repoFullName.split("/").at(-1) ?? repoFullName

export function RepoIndexChart({ data }: { data: RepoIndexPoint[] }) {
  const rows = data.map((point) => ({
    repo: repoLabel(point.repoFullName),
    fullName: point.repoFullName,
    chunks: point.chunks,
  }))

  return (
    <ChartCard
      eyebrow="Index size · chunks per repo"
      title={
        rows.length === 1 ? "1 repo indexed" : `${rows.length} repos indexed`
      }
      empty={rows.length === 0}
      emptyMessage="Nothing indexed yet. Sync a repo and its embedded chunk count shows up here."
    >
      <ChartContainer config={config} className="h-[260px]">
        <BarChart
          data={rows}
          layout="vertical"
          margin={{ left: 8, right: 56, top: 4, bottom: 4 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="repo"
            tickLine={false}
            axisLine={false}
            width={120}
            fontSize={11}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)", fillOpacity: 0.4 }}
            content={
              <ChartTooltipContent
                labelFormatter={(label) =>
                  rows.find((row) => row.repo === label)?.fullName ??
                  String(label)
                }
                valueFormatter={formatCount}
              />
            }
          />
          <Bar
            dataKey="chunks"
            fill="var(--color-chunks)"
            radius={[0, 4, 4, 0]}
            barSize={16}
          >
            <LabelList
              dataKey="chunks"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={11}
              formatter={(value: React.ReactNode) => formatCount(Number(value))}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  )
}
