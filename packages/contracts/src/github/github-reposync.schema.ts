import { type } from "arktype"

export const getInfiniteRepoSchema = type({
  limit: "number >= 1 & number <= 100",
  cursor: "number | null | undefined",
  direction: type("'forward' | 'backward'"),
})

export type GetInfiniteRepo = typeof getInfiniteRepoSchema.infer
