"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@abhimanyu/ui/components/breadcrumb"
import { Button } from "@abhimanyu/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@abhimanyu/ui/components/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@abhimanyu/ui/components/sidebar"
import {
  IconBell,
  IconMenu,
  IconHome,
  IconPalette,
  IconMessageQuestion,
  IconWorld,
  IconKeyboard,
  IconCheck,
  IconVideoPlus,
  IconLink,
  IconLock,
  IconSettings,
} from "@tabler/icons-react"
import * as React from "react"

const data = {
  nav: [
    {
      name: "Notifications",
      icon: <IconBell />,
    },
    {
      name: "Navigation",
      icon: <IconMenu />,
    },
    {
      name: "Home",
      icon: <IconHome />,
    },
    {
      name: "Appearance",
      icon: <IconPalette />,
    },
    {
      name: "Messages & media",
      icon: <IconMessageQuestion />,
    },
    {
      name: "Language & region",
      icon: <IconWorld />,
    },
    {
      name: "Accessibility",
      icon: <IconKeyboard />,
    },
    {
      name: "Mark as read",
      icon: <IconCheck />,
    },
    {
      name: "Audio & video",
      icon: <IconVideoPlus />,
    },
    {
      name: "Connected accounts",
      icon: <IconLink />,
    },
    {
      name: "Privacy & visibility",
      icon: <IconLock />,
    },
    {
      name: "Advanced",
      icon: <IconSettings />,
    },
  ],
}

export function SettingsDialog() {
  const [open, setOpen] = React.useState(true)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>Open Dialog</DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === "Messages & media"}
                          render={<a href="#" />}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Messages & media</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {Array.from({
                length: 10,
              }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video max-w-3xl rounded-xl bg-muted/50"
                />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
