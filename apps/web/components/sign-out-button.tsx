"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@abhimanyu/ui/components/button"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export default function DashboardPage() {
  function signOut() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast("Signout successful")
          redirect("/signin")
        },
      },
    })
  }

  return <Button onClick={signOut}>Signout</Button>
}
