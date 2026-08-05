import { type } from "arktype"

import { userSubscriptionInfo, usageSummary } from "./subscription.schema"

export const userPersonalInfo = type({
  name: "string",
  email: "string",
  image: "string| null",
  memberSince: "string",
})

export const userInfo = type({
  profile: userPersonalInfo,
  subscription: userSubscriptionInfo,
  usage: usageSummary,
})

export type UserProfileInfo = typeof userPersonalInfo.infer
export type UserInfo = typeof userInfo.infer
