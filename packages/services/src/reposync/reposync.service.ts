import { prisma } from "@abhimanyu/database/client"

class RepoSyncService {
  public async findSyncedRepo({ repoFullName }: { repoFullName: string }) {
    return prisma.repoSync.findUnique({
      where: {
        repoFullName,
      },
    })
  }
}

export const repoSyncService = new RepoSyncService()
