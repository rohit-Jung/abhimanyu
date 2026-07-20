import { GITHUB_APP_URL } from "./constants"

export type GithubInstallationStatus = {
  connected: boolean
  accountLogin: string | null
  installedAt: string | null
}

const getGithubInstallationUrl = (userId: string): string => {
  const url = new URL(`${GITHUB_APP_URL}/installations/new`)
  // ok we need this to save the installation into db
  url.searchParams.set("state", userId)
  return url.toString()
}

export { getGithubInstallationUrl }
