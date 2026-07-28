export const indexableCodeExtensionsList = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".py",
  ".go",
  ".rb",
  ".rs",
  ".java",
  ".kt",
  ".swift",
  ".c",
  ".h",
  ".cpp",
  ".cs",
  ".php",
  ".sql",
  ".prisma",
  ".css",
  ".md",
  ".yml",
  ".yaml",
] as const

export const ignoredDirList = [
  "node_modules/",
  "dist/",
  "build/",
  ".next/",
  "generated/",
  "vendor/",
] as const

export const repoPerPage = 10 as const
export const maxFileSizeBytes = 100_000 as const
export const maxFiles = 200 as const
export const maxChunkLines = 80 as const
export const upsertBatchSize = 90 as const
