import {
  CodeChunk,
  RepoFile,
  ReviewInput,
  searchRecordHitsFieldSchema,
  validateData,
} from "@abhimanyu/contracts"
import { PrFile } from "@abhimanyu/contracts"
import { getPineconeIndex } from "@abhimanyu/database/pinecone"

import { aiService } from "./ai.service"

type GetNamespace =
  | { type: "repo"; repoFullName: string }
  | { type: "pr"; repoFullName: string; prNumber: number }

type GetChunkId =
  | { type: "repo"; path: string; part: number }
  | { type: "pr"; path: string; part: number; prNumber: number }

type ChunkFiles =
  | { type: "repo"; repoFullName: string; files: RepoFile[] }
  | { type: "pr"; files: PrFile[]; prNumber: number }

type GetPrContextParams = GetNamespace & {
  query: string
}

class RagService {
  private readonly maxChunkLines = 80
  private readonly topResultCount = 10
  private readonly pineconeIndex = getPineconeIndex()
  private readonly upsertBatchSize = 90

  private buildChunkId(params: GetChunkId): string {
    if (params.type == "pr") {
      const { prNumber, path, part } = params
      return `pr-${prNumber}-${path}-part-${part}`
    }

    const { path, part } = params
    return `repo--${path}--part-${part}`
  }

  private buildPrNameSpace({
    repoFullName,
    prNumber,
  }: {
    repoFullName: string
    prNumber: number
  }): string {
    return `${repoFullName.replace("/", "-")}-pr-${prNumber}`
  }

  private buildRepoNameSpace({ repoFullName }: { repoFullName: string }) {
    return `${repoFullName.replace("/", "-")}--codebase`
  }

  public getNamespace(params: GetNamespace) {
    if (params.type === "repo") {
      return this.buildRepoNameSpace({
        repoFullName: params.repoFullName,
      })
    }

    return this.buildPrNameSpace({
      repoFullName: params.repoFullName,
      prNumber: params.prNumber,
    })
  }

  public chunkFiles(params: ChunkFiles) {
    const chunks: CodeChunk[] = []

    for (const file of params.files) {
      const text = "content" in file ? file.content : file.patch
      const lines = text.split("\n")

      // slide a fixed-size window across the diff; large files produce many chunks
      for (let start = 0; start < lines.length; start += this.maxChunkLines) {
        const part = start / this.maxChunkLines
        const text = lines.slice(start, start + this.maxChunkLines).join("\n")

        const id =
          params.type === "pr"
            ? this.buildChunkId({
                type: "pr",
                path: file.filePath,
                part,
                prNumber: params.prNumber,
              })
            : this.buildChunkId({
                type: "repo",
                path: file.filePath,
                part,
              })

        chunks.push({
          id,
          filePath: file.filePath,
          text,
        })
      }
    }

    return chunks
  }

  public async deleteNamespace(namespace: string) {
    this.pineconeIndex.deleteNamespace(namespace)
  }

  public async saveChunksToPinecone({
    namespace,
    chunks,
  }: {
    namespace: string
    chunks: CodeChunk[]
  }) {
    for (let i = 0; i < chunks.length; i += this.upsertBatchSize) {
      const batch = chunks.slice(i, i + this.upsertBatchSize)
      await this.pineconeIndex
        .namespace(namespace)
        .upsertRecords({ records: batch })
    }
  }

  public async searchPrContext(params: GetPrContextParams): Promise<string[]> {
    let namespace: string = this.getNamespace(params)
    const response = await this.pineconeIndex
      .namespace(namespace)
      .searchRecords({
        query: { topK: this.topResultCount, inputs: { text: params.query } },
      })

    const snippets: string[] = []

    for (const hits of response.result.hits) {
      const fields = validateData(searchRecordHitsFieldSchema, hits.fields)
      if (!fields.success) continue

      snippets.push(`File: ${fields.data.filePath}\n${fields.data.text}`)
    }

    return snippets
  }

  public async generateReview(input: ReviewInput) {
    return aiService.generateReview(input)
  }
}

export const ragService = new RagService()
