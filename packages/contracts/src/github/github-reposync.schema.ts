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

export const syncRepoDetails = type({
  repoFullName: "string",
  userId: "string",
  branch: "string",
})

export interface RepoFile {
  filePath: string
  content: string
}

export interface TreeEntry {
  path?: string
  type?: string
  sha?: string
  size?: number
}

export type GetInfiniteRepo = typeof getInfiniteRepoSchema.infer
export type SyncRepoDetails = typeof syncRepoDetails.infer
export type GitRepo = typeof gitRepo.infer
