"use client"

import { useInfiniteQuery } from "@tanstack/react-query"

import { useTRPC } from "@/lib/trpc/client"

export const useInfiniteRepos = ({ limit }: { limit: number }) => {
  const trpc = useTRPC()

  return useInfiniteQuery(
    trpc.github.getInfiniteRepos.infiniteQueryOptions(
      {
        limit,
        cursor: 1,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )
  )
}
