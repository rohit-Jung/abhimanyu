import { type } from "arktype"

export const pullRequestStatus = type(
  "'review' | 'pending' | 'processing' | 'reviewed' | 'ratelimited' "
)

export const verifySignature = type({
  eventPayload: "string",
  signature: "string",
})

export const pullRequestWebookPayload = type({
  action: "string",
  installation: { id: "number" },
  repository: { full_name: "string" },
  pull_request: {
    number: "number",
    title: "string",
    user: type({ login: "string" }).or("null"),
    head: { sha: "string" },
    base: { ref: "string" },
  },
})

export interface PrFile {
  filePath: string
  patch: string
}

export type PullRequestWebhookPayload = typeof pullRequestWebookPayload.infer
export type TVerifySignature = typeof verifySignature.infer
export type PullRequestStatus = typeof pullRequestStatus.infer
