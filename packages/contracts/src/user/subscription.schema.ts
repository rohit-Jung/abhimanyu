import { type } from "arktype"

export const subscriptionStatus = type("'Active' | 'Canceled' | 'Trailing'")
export const subscriptionPlan = type("'Free' | 'Pro'")
export const userSubscriptionInfo = type({
  plan: subscriptionPlan,
  status: subscriptionStatus,
  renewsAt: "string | null",
})

export const usuageSummary = type({
  usuage: "number",
  limit: "number | null",
})

export type UsageSummary = typeof usuageSummary.infer
export type UserSubscription = typeof userSubscriptionInfo.infer
export type SubscriptionPlan = typeof subscriptionPlan.infer
