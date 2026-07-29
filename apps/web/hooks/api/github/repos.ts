"use client"

import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { useTRPC } from "@/lib/trpc/client"
import { getQueryClient } from "@/providers/trpcClientProvider"

export const useInfiniteRepos = ({ limit }: { limit: number }) => {
  const trpc = useTRPC()

  const options = trpc.github.getInfiniteRepos.infiniteQueryOptions(
    {
      limit,
      cursor: 1,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  return useInfiniteQuery(options)
}

export const useSyncRepo = () => {
  const trpc = useTRPC()
  const queryClient = getQueryClient()

  return useMutation(
    trpc.repo.createSync.mutationOptions({
      onSuccess: () => {
        toast.success("Repo synced successfully")
        queryClient.invalidateQueries({
          queryKey: trpc.github.getInfiniteRepos.queryKey(),
        })
      },
      onError: () => toast.error("Error syncing repo"),
    })
  )
}
