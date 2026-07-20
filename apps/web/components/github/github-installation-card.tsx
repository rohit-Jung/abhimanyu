import { Button } from "@abhimanyu/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@abhimanyu/ui/components/card"
import { IconBrandGithub } from "@tabler/icons-react"
import { ArrowUpRightIcon, Plug2 } from "lucide-react"

import { disconnectAppAction } from "@/features/dashboard/actions/github"
import {
  statusBadge,
  statusButtonClass,
} from "@/features/dashboard/lib/status-style"
import {
  getGithubInstallationUrl,
  GithubInstallationStatus,
} from "@/lib/github"
import { createServerCaller } from "@/lib/trpc/server"
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

export default async function GithubInstallationCard({
  userId,
}: {
  userId: string
}) {
  const api = await createServerCaller()
  const { connected, accountLogin } =
    await api.github.getInstallationStatusForUser()

  const installationUrl = getGithubInstallationUrl(userId)

  let cardBorderClass = "border-border"
  let iconWrapperClass = "bg-transparent"
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
      <Card className={cn("max-w-3xl transition-colors", cardBorderClass)}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "transparent flex size-10 items-center justify-center rounded-none border-0",
                  iconWrapperClass
                )}
              >
                <IconBrandGithub className="size-10" />
              </span>
              <div>
                <CardTitle>GitHub App</CardTitle>
                <CardDescription>
                  Install the reviewer app on your GitHub account or
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
          {connected ? (
            <form action={disconnectAppAction}>
              <Button
                type="submit"
                variant="outline"
                className={statusButtonClass.danger}
              >
                <Plug2 />
                Disconnect GitHub App
              </Button>
            </form>
          ) : (
            <Button
              nativeButton={false}
              render={<a href={installationUrl} />}
              className={statusButtonClass.success}
            >
              <IconBrandGithub />
              Install GitHub App
              <ArrowUpRightIcon className="size-3 opacity-80" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
