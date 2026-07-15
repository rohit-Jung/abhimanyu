import { type } from "arktype"

export const installationStatusForUserSchema = type({
  connected: "boolean",
  accountLogin: "string | null",
  installedAt: "Date | null",
})

export type InstallationStatusForUser =
  typeof installationStatusForUserSchema.infer
