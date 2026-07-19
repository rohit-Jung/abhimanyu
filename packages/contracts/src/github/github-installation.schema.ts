import { type } from "arktype"

export const installationStatusForUserSchema = type({
  connected: "boolean",
  accountLogin: "string | null",
  installedAt: "Date | null",
})

export const githubCallbackInput = type({
  installation_id: "string",
  setup_action: "string",
  state: "string", // this we will use as user id
})

export type InstallationStatusForUser =
  typeof installationStatusForUserSchema.infer
export type GithubCallbackInput = typeof githubCallbackInput.infer
