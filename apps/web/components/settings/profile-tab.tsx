import { UserProfileInfo } from "@abhimanyu/contracts"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@abhimanyu/ui/components/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@abhimanyu/ui/components/card"
import { Input } from "@abhimanyu/ui/components/input"
import { Label } from "@abhimanyu/ui/components/label"
import { Separator } from "@abhimanyu/ui/components/separator"
import { format } from "date-fns"

export function getInitials(user: UserProfileInfo) {
  const source = user.name?.trim() || user.email || "U"
  const parts = source.split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return source.slice(0, 2).toUpperCase()
}

export function getDisplayName(profile: UserProfileInfo) {
  return "rokshh"
}

export function ProfileTab({ profile }: { profile: UserProfileInfo }) {
  const displayName = getDisplayName(profile)
  const initials = getInitials(profile)
  const memberSince = format(new Date(profile.memberSince), "MMMM d, yyyy")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Account information from your GitHub sign-in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar size="lg">
            {profile.image ? (
              <AvatarImage src={profile.image} alt={displayName} />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground">{profile.email}</p>
            <p className="text-xs text-muted-foreground">
              Member since {memberSince}
            </p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" defaultValue={profile.name} readOnly />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={profile.email}
              readOnly
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Profile details are managed by GitHub. Update them in your GitHub
          account settings.
        </p>
      </CardFooter>
    </Card>
  )
}
