import Link from "next/link"

import { APP_NAME, AUTH_ROUTES, LANDING_COPY } from "@/lib/constants"

export function SiteFooter() {
  return (
    <footer className="border-t px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-heading text-sm font-semibold tracking-tight">
            {APP_NAME}
          </span>
          <span className="text-sm text-muted-foreground">
            {LANDING_COPY.tagline}
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href={AUTH_ROUTES.signin} className="hover:text-foreground">
            Sign in
          </Link>
        </nav>
      </div>
      <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-2 border-t pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {APP_NAME}.
        </span>
        <span>
          Press <kbd>d</kbd> to toggle dark mode
        </span>
      </div>
    </footer>
  )
}
