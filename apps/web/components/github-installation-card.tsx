"use client"

import { Button } from "@abhimanyu/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@abhimanyu/ui/components/card"
import { GitCommitIcon, Plug2 } from "lucide-react"

import {
  statusBadge,
  statusButtonClass,
} from "@/features/dashboard/lib/status-style"
import { useGetGithubApp } from "@/hooks/api/github/installation"
import { GithubInstallationStatus } from "@/lib/github"
import { cn } from "@/lib/utils"

function ConnectionDetails({
  connected,
  accountLogin,
}: Omit<GithubInstallationStatus, "installedAt">) {
  if (connected) {
    return (
      <p className="text-xs text-muted-foreground">
        Installed for{" "}
        <span className="font-medium text-green-700 dark:text-green-400">
          @{accountLogin}
        </span>
        . The app can read repository metadata and post review comments on pull
        requests.
      </p>
    )
  }

  return (
    <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
      <li>Access public and private repositories you select</li>
      <li>Receive webhooks for pull request events</li>
      <li>Post AI-generated review comments on PRs</li>
    </ul>
  )
}

export default function GithubInstallationCard() {
  const { appStatus, isLoading, error } = useGetGithubApp()

  let connected = false
  let accountLogin = null

  if (appStatus && !isLoading && !error) {
    connected = appStatus.connected
    accountLogin = appStatus.accountLogin
  }

  let cardBorderClass = "border-border"
  let iconWrapperClass = "border-border bg-muted"
  let statusTone: "success" | "neutral" = "neutral"
  let statusLabel = "Not connected"

  if (connected) {
    cardBorderClass = "border-green-500/30"
    iconWrapperClass =
      "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-400"
    statusTone = "success"
    statusLabel = "Connected"
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Card className={cn("max-w-2xl transition-colors", cardBorderClass)}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-none border",
                  iconWrapperClass
                )}
              >
                <GitCommitIcon className="size-5" />
              </span>
              <div>
                <CardTitle>GitHub App</CardTitle>
                <CardDescription>
                  Install the Chai reviewer app on your GitHub account or
                  organization to access public and private repositories.
                </CardDescription>
              </div>
            </div>
            <span className={statusBadge(statusTone)}>{statusLabel}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConnectionDetails
            connected={connected}
            accountLogin={accountLogin}
          />
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <form action={""}>
            <Button
              type="submit"
              variant="outline"
              className={statusButtonClass.danger}
            >
              <Plug2 />
              Disconnect GitHub App
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
