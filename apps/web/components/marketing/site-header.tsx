import { Button } from "@abhimanyu/ui/components/button"
import Link from "next/link"

import { APP_NAME, AUTH_ROUTES } from "@/lib/constants"

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-heading text-base font-semibold tracking-tight">
        {APP_NAME}
      </span>
      <nav className="flex items-center gap-2">
        <Button
          nativeButton={false}
          render={<Link href={AUTH_ROUTES.signin} />}
        >
          Sign in
        </Button>
      </nav>
    </header>
  )
}
