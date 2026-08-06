"use client"

import { Button } from "@abhimanyu/ui/components/button"
import * as React from "react"

import { useSyncRepo } from "@/hooks/api/github/repos"

interface RepoSyncButtonProps {
  repoFullName: string
  branch: string
  syncStatus: string
}

export default function SyncRepoButton({
  repoFullName,
  branch,
  syncStatus,
}: RepoSyncButtonProps) {
  const { mutate, isPending } = useSyncRepo()
  const isAlreadySynced = syncStatus === "Synced"

  return (
    <Button
      disabled={isPending || isAlreadySynced}
      onClick={async () => {
        mutate({
          repoFullName,
          branch,
        })
      }}
    >
      {!isAlreadySynced ? (isPending ? "Syncing" : "Sync") : "Synced"}
    </Button>
  )
}
