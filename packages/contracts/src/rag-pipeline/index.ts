import { type } from "arktype"

const codeChunkSchema = type({
  id: "string",
  filePath: "string",
  text: "string",
})

export const searchRecordHitsFieldSchema = codeChunkSchema.pick(
  "text",
  "filePath"
)

export const reviewInputSchema = type({
  repoFullName: "string",
  title: "string",
  prContext: "string[]",
  codebaseContext: "string[]",
})

export type ReviewInput = typeof reviewInputSchema.infer
export type CodeChunk = typeof codeChunkSchema.infer
