import {
  CodeChunk,
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

type GetPrContextParams = GetNamespace & {
  query: string
}

class RagService {
  private readonly maxChunkLines = 80
  private readonly topResultCount = 10
  private readonly pineconeIndex = getPineconeIndex()

  private buildChunkId({
    prNumber,
    path,
    part,
  }: {
    prNumber: number
    path: string
    part: number
  }): string {
    return `pr-${prNumber}-${path}-part-${part}`
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

  private getNamespace(params: GetNamespace) {
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

  public chunkPrFiles({
    prNumber,
    files,
  }: {
    prNumber: number
    files: PrFile[]
  }): CodeChunk[] {
    const chunks: CodeChunk[] = []

    for (const file of files) {
      const lines = file.patch.split("\n")

      // slide a fixed-size window across the diff; large files produce many chunks
      for (let start = 0; start < lines.length; start += this.maxChunkLines) {
        const part = start / this.maxChunkLines
        const text = lines.slice(start, start + this.maxChunkLines).join("\n")

        chunks.push({
          id: this.buildChunkId({
            prNumber,
            path: file.filePath,
            part,
          }),

          filePath: file.filePath,
          text,
        })
      }
    }

    return chunks
  }

  public async saveChunksToPinecone({
    repoFullName,
    prNumber,
    chunks,
  }: {
    repoFullName: string
    prNumber: number
    chunks: CodeChunk[]
  }) {
    const namespace = this.buildPrNameSpace({
      repoFullName,
      prNumber,
    })

    const records = chunks.map((chunk) => ({
      id: chunk.id,
      text: chunk.text,
      filePath: chunk.filePath,
    }))

    await this.pineconeIndex.namespace(namespace).upsertRecords({
      records,
    })
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
