import { type } from "arktype"

export const installationStatusForUserSchema = type({
  connected: "boolean",
  accountLogin: "string | null",
  installedAt: "Date | null",
})

export const githubCallbackInput = type({
  installation_id: "string | null",
  setup_action: "string | null",
})

export type InstallationStatusForUser =
  typeof installationStatusForUserSchema.infer
