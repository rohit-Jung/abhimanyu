import type { InstallationStatusForUser } from "@abhimanyu/contracts"
import { prisma } from "@abhimanyu/database/client"

export class InstallationService {
  public async getInstallationByInstallationId({
    installationId,
  }: {
    installationId: number
  }) {
    return prisma.githubInstallation.findFirst({
      where: {
        installationId,
      },
    })
  }

  public async getInstallationByUserId({ userId }: { userId: string }) {
    return prisma.githubInstallation.findFirst({
      where: {
        userId,
      },
    })
  }

  public async getInstallationStatusForUser({
    userId,
  }: {
    userId: string
  }): Promise<InstallationStatusForUser> {
    const installation = await this.getInstallationByUserId({ userId })

    if (!installation) {
      return {
        connected: false,
        accountLogin: null,
        installedAt: null,
      }
    }

    return {
      connected: true,
      accountLogin: installation.accountLogin,
      installedAt: installation.createdAt,
    }
  }
}
