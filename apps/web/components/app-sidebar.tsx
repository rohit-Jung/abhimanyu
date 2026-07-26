"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@abhimanyu/ui/components/sidebar"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import { authClient } from "@/lib/auth"
import { SIDEBAR_NAV_ITEMS } from "@/lib/constants"

import { NavUser } from "./user-nav"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const pathname = usePathname()
  const data = authClient.useSession()

  return (
    <Sidebar collapsible="icon" className="" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={item.route === pathname}
                    onClick={() => router.push(item.route)}
                  >
                    {<item.icon />}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-5">
        <NavUser
          user={{
            name: data.data?.user.name || "",
            email: data.data?.user.email || "",
            avatar: data.data?.user.image || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
