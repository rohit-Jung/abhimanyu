import { type } from "arktype"

export const subscriptionStatus = type("'Active' | 'Canceled' | 'Trailing'")
export const subscriptionPlan = type("'Free' | 'Pro'")
export const userSubscriptionInfo = type({
  plan: subscriptionPlan,
  status: subscriptionStatus,
  renewsAt: "string | null",
})

export const usageSummary = type({
  usage: "number",
  limit: "number | null",
})

export type UsageSummary = typeof usageSummary.infer
export type UserSubscription = typeof userSubscriptionInfo.infer
export type SubscriptionPlan = typeof subscriptionPlan.infer
