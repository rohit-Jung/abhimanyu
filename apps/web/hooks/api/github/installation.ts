import { useQuery } from "@tanstack/react-query"

import { useTRPC } from "@/lib/trpc/client"

export const useGetGithubApp = () => {
  const trpc = useTRPC()

  const {
    data: appStatus,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  } = useQuery(trpc.github.getInstallationStatusForUser.queryOptions())

  return {
    appStatus,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  }
}
