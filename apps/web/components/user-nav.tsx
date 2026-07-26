"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@abhimanyu/ui/components/avatar"
import { Button } from "@abhimanyu/ui/components/button"
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@abhimanyu/ui/components/sidebar"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { authClient } from "@/lib/auth"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const router = useRouter()
  const { state } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem
        className={`flex w-full items-center justify-between ${state == "expanded" ? "flex-row" : "flex-col gap-4"}`}
      >
        <div className="flex items-center justify-center gap-3">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
        <Button
          className="flex"
          variant="ghost"
          onClick={async () => {
            const data = await authClient.signOut()
            if (data.data?.success) {
              router.push("/signin")
            } else {
              toast.error("Error logging out")
            }
          }}
        >
          <LogOut className="size-4" />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
