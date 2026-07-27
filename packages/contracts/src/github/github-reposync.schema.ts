import { type } from "arktype"

export const getInfiniteRepoSchema = type({
  limit: "number >= 1 & number <= 100",
  cursor: "number | null | undefined",
})

export const gitRepo = type({
  id: "string",
  name: "string",
  fullName: "string",
  visibility: type("'private' | 'public'"),
  defaultBranch: "string",
  updatedAt: "string | Date",
  language: "string | null",
  stars: "number >= 0",
  syncStatus: type("'Pending' | 'Synced' | 'Failed' | 'Syncing' | null"),
})

export type GetInfiniteRepo = typeof getInfiniteRepoSchema.infer
export type GitRepo = typeof gitRepo.infer
