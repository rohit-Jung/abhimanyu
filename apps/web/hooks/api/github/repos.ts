"use client"

import { useInfiniteQuery } from "@tanstack/react-query"

import { useTRPC } from "@/lib/trpc/client"

export const useInfiniteRepos = ({
  limit,
  direction,
}: {
  limit: number
  direction: "forward" | "backward"
}) => {
  const trpc = useTRPC()

  return useInfiniteQuery(
    trpc.github.getInfiniteRepos.infiniteQueryOptions(
      {
        limit,
        direction,
        cursor: 1,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )
  )
}
