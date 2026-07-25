import { Pinecone } from "@pinecone-database/pinecone"

export type PineconeIndex = ReturnType<Pinecone["index"]>
let index: PineconeIndex | null = null

export function getPineconeIndex() {
  if (!index) {
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    })

    return pc.index({ name: process.env.PINCONE_INDEX! })
  }

  return index
}
