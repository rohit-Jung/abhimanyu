import { GITHUB_APP_URL } from "./constants"

export type GithubInstallationStatus = {
  connected: boolean
  accountLogin: string | null
  installedAt: string | null
}

const getGithubInstallationUrl = (userId: string) => {
  const url = new URL(GITHUB_APP_URL)
  url.searchParams.set("state", userId)
  return url
}

export { getGithubInstallationUrl }
