import { GitRepo } from "@abhimanyu/contracts"
import { TableRow, TableCell } from "@abhimanyu/ui/components/table"
import { formatDistanceToNow } from "date-fns"
import { LockIcon, LockKeyholeOpenIcon, StarIcon } from "lucide-react"

import { statusBadge } from "@/features/dashboard/lib/status-style"

import SyncRepoButton from "./sync-repo-button"

function RepoRow({ repo }: { repo: GitRepo }) {
  const tone = repo.visibility === "public" ? "info" : "warning"

  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{repo.name}</span>
          <span className="text-xs text-muted-foreground">{repo.fullName}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className={statusBadge(tone, "gap-1")}>
          {repo.visibility === "private" ? (
            <LockIcon className="size-3" />
          ) : (
            <LockKeyholeOpenIcon className="size-3" />
          )}
          {repo.visibility}
        </span>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {repo.defaultBranch}
      </TableCell>
      <TableCell>{repo.language ?? "—"}</TableCell>
      <TableCell className="text-right">
        <span className="inline-flex items-center justify-end gap-1 text-muted-foreground">
          <StarIcon className="size-3 text-amber-500" />
          {repo.stars}
        </span>
      </TableCell>
      <TableCell className="text-right text-muted-foreground">
        {formatDistanceToNow(new Date(repo.updatedAt), { addSuffix: true })}
      </TableCell>
      <TableCell className="text-right">
        <SyncRepoButton
          repoFullName={repo.fullName}
          branch={repo.defaultBranch}
          syncStatus={repo.syncStatus ?? null}
        />
      </TableCell>
    </TableRow>
  )
}

export function Repos({
  isLoading,
  isError,
  visibleRepos,
}: {
  isLoading: boolean
  isError: boolean
  visibleRepos: GitRepo[]
}) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center text-muted-foreground">
          Loading repositories…
        </TableCell>
      </TableRow>
    )
  } else if (isError) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center text-muted-foreground">
          Failed to load repositories.
        </TableCell>
      </TableRow>
    )
  } else if (visibleRepos && visibleRepos.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center text-muted-foreground">
          No repositories found.
        </TableCell>
      </TableRow>
    )
  } else {
    return visibleRepos?.map((repo) => <RepoRow key={repo.id} repo={repo} />)
  }
}
