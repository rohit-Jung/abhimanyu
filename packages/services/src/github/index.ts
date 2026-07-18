import type { InstallationStatusForUser } from "@abhimanyu/contracts"
import { prisma } from "@abhimanyu/database/client"
import { App } from "octokit"

class GithubService {
  public githubApp: null | App = null

  constructor() {
    this.githubApp = this.getGithubApp()
  }

  private getGithubApp() {
    let app = new App({
      appId: process.env.GITHUB_APP_ID!,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      webhooks: {
        secret: process.env.GITHUB_WEBHOOK_SECRET!,
      },
    })

    return app
  }

  public async getGithubInstallationByInstallationId({
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

  public async getGithubInstallationByUserId({ userId }: { userId: string }) {
    return prisma.githubInstallation.findFirst({
      where: {
        userId,
      },
    })
  }

  public async createGithubInstallation({
    userId,
    installationId,
  }: {
    userId: string
    installationId: string
  }) {}

  public async getInstallationStatusForUser({
    userId,
  }: {
    userId: string
  }): Promise<InstallationStatusForUser> {
    const installation = await this.getGithubInstallationByUserId({ userId })

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

// use a singleton pattern as it's just a wrapper
export const githubService = new GithubService()
