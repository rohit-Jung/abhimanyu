"use client"

import { cn } from "@abhimanyu/ui/lib/utils"

import { GithubSignInButton } from "../github/github-sign-in"

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <GithubSignInButton callbackUrl="/dashboard" className="h-11 text-base" />
      <p className="font-mono text-xs leading-relaxed text-muted-foreground">
        By continuing you agree to the{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}
