import type { InstallationStatusForUser } from "@abhimanyu/contracts"
import { GithubInstallation, prisma } from "@abhimanyu/database/client"
import { App, Octokit } from "octokit"

class GithubInstallationService {
  private githubApp: null | App = null

  constructor() {
    this.githubApp = this.createGithubApp()
  }

  private createGithubApp(): App {
    const privateKey = Buffer.from(
      process.env.GITHUB_APP_PRIVATE_KEY!,
      "base64"
    ).toString("utf-8")

    const app = new App({
      appId: process.env.GITHUB_APP_ID!,
      privateKey,
      webhooks: {
        secret: process.env.GITHUB_WEBHOOK_SECRET!,
      },
      Octokit: Octokit.defaults({
        request: {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      }),
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
    const { data } = await app.octokit.rest.apps.getInstallation({
      installation_id: installationId,
    })

    const accountLogin = GithubInstallationService.getAccountLoginInfo(
      data.account
    )
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

  public async deleteInstallationByUserId({ userId }: { userId: string }) {
    const installation = await prisma.githubInstallation.findUnique({
      where: {
        userId,
      },
    })

    if (!installation) return

    const app = this.githubApp!
    try {
      await app.octokit.rest.apps.deleteInstallation({
        installation_id: installation.installationId,
      })
    } catch (error) {
      const status =
        error instanceof Error
          ? (error as { status?: number }).status
          : undefined

      console.error(
        "[server error] error caught while uninstalling from octokit",
        { status, error }
      )

      // if already uninstalled on github, still clean up the local record.
      if (status !== 404) return
    }

    const deleted = await prisma.githubInstallation.delete({
      where: {
        userId,
      },
    })

    return deleted
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
export const githubInstallationService = new GithubInstallationService()
