import type { InstallationStatusForUser } from "@abhimanyu/contracts"
import { GithubInstallation, prisma } from "@abhimanyu/database/client"
import { App } from "octokit"

class GithubService {
  private githubApp: null | App = null

  constructor() {
    this.githubApp = this.createGithubApp()
  }

  private createGithubApp(): App {
    const privateKey = Buffer.from(
      process.env.GITHUB_APP_PRIVATE_KEY!,
      "base64"
    ).toString("utf-8")

    console.log("github private key", privateKey)
    console.log("github app id", process.env.GITHUB_APP_ID)

    const app = new App({
      appId: process.env.GITHUB_APP_ID!,
      privateKey,
      webhooks: {
        secret: process.env.GITHUB_WEBHOOK_SECRET!,
      },
    })

    return app
  }

  private static getAccountLoginInfo(
    account: { login?: string; slug?: string } | null | undefined
  ): string | null {
    if (!account) return null
    return account.login ?? account.slug ?? null
  }

  public async createGithubInstallation({
    userId,
    installationId,
  }: {
    userId: string
    installationId: number
  }): Promise<GithubInstallation> {
    const app = this.githubApp!
    console.log(installationId)

    const { data } = await app.octokit.request(
      "GET /app/installations/{installation_id}",
      { installation_id: installationId }
    )

    const accountLogin = GithubService.getAccountLoginInfo(data.account)
    const accountType = data.target_type ?? null
    const installation = await prisma.githubInstallation.upsert({
      where: { userId },
      create: {
        userId,
        installationId,
        accountLogin,
        accountType,
      },
      update: {
        installationId,
        accountLogin,
        accountType,
      },
    })

    return installation
  }

  public async getInstallationStatusForUser({
    userId,
  }: {
    userId: string
  }): Promise<InstallationStatusForUser> {
    const installation = await prisma.githubInstallation.findFirst({
      where: {
        userId,
      },
    })

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
