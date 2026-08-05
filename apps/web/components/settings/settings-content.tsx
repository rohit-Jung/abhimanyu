"use client"

import { UserInfo } from "@abhimanyu/contracts"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@abhimanyu/ui/components/tabs"

import { ProfileTab } from "./profile-tab"
import { SubscriptionTab } from "./subscription-tab"

export function SettingsContent({ profile, subscription, usage }: UserInfo) {
  return (
    <div className="flex flex-1 flex-col p-6">
      <Tabs defaultValue="profile" className="w-full max-w-2xl">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <ProfileTab profile={profile} />
        </TabsContent>

        <TabsContent value="subscription" className="mt-6 space-y-6">
          <SubscriptionTab subscription={subscription} usage={usage} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
