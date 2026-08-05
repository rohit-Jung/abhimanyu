import { UsageSummary, UserSubscription } from "@abhimanyu/contracts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@abhimanyu/ui/components/card"
import { format } from "date-fns"

import { statusBadge } from "@/features/dashboard/lib/status-style"
import { PLAN_DETAILS } from "@/lib/constants"
import { cn } from "@/lib/utils"

import { CancelSubscriptionButton } from "./cancel-subscription"
import { UpgradeButton } from "./updgrade-subscription"

function formatDate(date: string | null): string | null {
  if (!date) return null

  return format(new Date(date), "MMMM d, yyyy")
}

function getUsageText(usage: UsageSummary): string {
  if (usage.limit === null) {
    return `${usage.usage} reviews used this month (unlimited)`
  }

  return `${usage.usage} / ${usage.limit} reviews used this month`
}

export function SubscriptionTab({
  subscription,
  usage,
}: {
  subscription: UserSubscription
  usage: UsageSummary
}) {
  const planDetails = PLAN_DETAILS[subscription.plan]
  const renewalDate = formatDate(subscription.renewsAt)
  const statusLabel = subscription.status

  const isActive =
    subscription.status === "Active" || subscription.status === "Trailing"

  // Visual styling reflects active vs inactive subscription
  let cardBorderClass = "border-border"
  let planTextClass = "text-foreground"
  let statusTextClass = "text-muted-foreground"
  let badgeTone: "success" | "neutral" | "warning" = "neutral"

  if (isActive) {
    cardBorderClass = "border-green-500/25"
    planTextClass = "text-green-800 dark:text-green-300"
    statusTextClass = "text-green-700 dark:text-green-400"
    badgeTone = "success"
  }

  if (subscription.status === "Canceled") {
    badgeTone = "warning"
  }

  return (
    <Card className={cardBorderClass}>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>
          Manage your plan and billing for AI code reviews.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 rounded-none border p-4",
            isActive
              ? "border-green-500/30 bg-green-500/5"
              : "border-border bg-muted/30"
          )}
        >
          <div>
            <p className={cn("font-medium", planTextClass)}>
              {planDetails.label} plan
            </p>
            <p className="text-xs text-muted-foreground">
              Status: <span className={statusTextClass}>{statusLabel}</span>
            </p>
            {renewalDate ? (
              <p className="text-xs text-muted-foreground">
                Renews {renewalDate}
              </p>
            ) : null}
          </div>
          <span className={statusBadge(badgeTone)}>{planDetails.label}</span>
        </div>
        <p className="text-xs text-muted-foreground">{getUsageText(usage)}</p>
        <ul className="space-y-2 text-xs text-muted-foreground">
          {planDetails.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {subscription.plan === "Free" ? <UpgradeButton /> : null}
        {subscription.plan === "Pro" ? (
          <CancelSubscriptionButton
            disabled={subscription.status === "Canceled"}
          />
        ) : null}
      </CardFooter>
    </Card>
  )
}
