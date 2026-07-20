/* utilities  */
export function frontendUrl(route: string) {
  return `${process.env.FRONTEND_URL}${route}`
}

export function backendUrl(route: string) {
  return `${process.env.BACKEND_URL}${route}`
}

export const getFrontendRedirectUrl = ({
  installationId,
}: {
  installationId?: string
}): string => {
  if (installationId) {
    const callback = encodeURIComponent(
      backendUrl(`/api/trpc/github/callback?installation_id=${installationId}`)
    )

    return frontendUrl("/signin/callbackUrl=" + callback)
  }

  return frontendUrl("/dashboard")
}
