"use client"

import { Input } from "@abhimanyu/ui/components/input"
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@abhimanyu/ui/components/table"
import { Tabs, TabsList, TabsTrigger } from "@abhimanyu/ui/components/tabs"
import { useEffect, useMemo, useRef, useState } from "react"

import { useInfiniteRepos } from "@/hooks/api/github/repos"

import { Repos } from "./repos-table"

type Filter = "all" | "public" | "private"
const GithubRepos = () => {
  const [filter, setFilter] = useState<Filter>("all")
  const [search, setSearch] = useState("")
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRepos({ limit: 30 })

  const repos = useMemo(() => {
    if (!data) return []
    const loaded = data.pages.flatMap((page) => page.items.repos)
    return loaded.sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    )
  }, [data])

  const visibleRepos = useMemo(() => {
    const query = search.toLowerCase()

    return repos.filter((repo) => {
      if (filter !== "all" && repo.visibility !== filter) {
        return false
      }

      if (query && !repo.fullName.toLowerCase().includes(query)) {
        return false
      }

      return true
    })
  }, [repos, search, filter])

  const totalCount = data?.pages[0]?.items.total ?? 0
  const counts = {
    all: totalCount,
    public: repos.filter((repo) => repo.visibility == "public").length,
    private: repos.filter((repo) => repo.visibility == "private").length,
  }

  let footer: string | null = null
  if (isFetchingNextPage) {
    footer = "Loading more repositories…"
  } else if (hasNextPage) {
    footer = `Showing ${repos.length} of ${totalCount}`
  } else if (repos.length > 0) {
    footer = `All ${repos.length} repositories loaded`
  }

  useEffect(() => {
    const element = loadMoreRef.current

    if (!element || !hasNextPage || isFetchingNextPage) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage()
        }
      },
      {
        rootMargin: "200px", // invisible space like thing
      }
    )

    observer.observe(element) // when this eleme comes to 200px area which is below viewport
    // cleanup
    return () => observer.disconnect()
  }, [fetchNextPage, isFetchingNextPage, hasNextPage])

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as Filter)}
        >
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="public">Public ({counts.public})</TabsTrigger>
            <TabsTrigger value="private">
              Private ({counts.private})
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          placeholder="Search repositories…"
          className="max-w-xs"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="rounded-none border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Repository</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="text-right">Stars</TableHead>
              <TableHead className="text-right">Updated</TableHead>
              <TableHead className="text-right">Codebase</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Repos
              visibleRepos={visibleRepos || []}
              isLoading={isLoading}
              isError={isError}
            />
          </TableBody>
        </Table>
      </div>

      <div
        ref={loadMoreRef}
        className="py-2 text-center text-sm text-muted-foreground"
      >
        {footer}
      </div>
    </div>
  )
}

export default GithubRepos
