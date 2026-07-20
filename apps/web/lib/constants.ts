import { IconBrandGithub, TablerIcon } from "@tabler/icons-react"
import {
  FolderGit2,
  GitPullRequestIcon,
  LayoutDashboard,
  LucideIcon,
  Settings2,
} from "lucide-react"
import { Metadata } from "next"

export enum DASHBOARD_ROUTES {
  dashboard = "/dashboard",
  repos = "/dashboard/repos",
  pullRequest = "/dashboard/pull-requests",
  github = "/dashboard/github",
  settings = "/dashboard/settings",
}

export enum AUTH_ROUTES {
  signin = "/signin",
  signup = "/signup",
}

interface NavItem {
  label: string
  icon: LucideIcon | TablerIcon
  route: DASHBOARD_ROUTES
}

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    route: DASHBOARD_ROUTES.dashboard,
  },
  {
    label: "Repos",
    icon: FolderGit2,
    route: DASHBOARD_ROUTES.repos,
  },
  {
    label: "Pull Requests",
    icon: GitPullRequestIcon,
    route: DASHBOARD_ROUTES.pullRequest,
  },
  {
    label: "Github",
    icon: IconBrandGithub,
    route: DASHBOARD_ROUTES.github,
  },
  {
    label: "Settings",
    icon: Settings2,
    route: DASHBOARD_ROUTES.settings,
  },
]

export const GITHUB_APP_URL = "https://github.com/apps/abhimanyu-reviewer/"

const authors = {
  name: "rokshh",
  url: "rohitjungkathet.com.np",
}

export const PageMetadata: Record<DASHBOARD_ROUTES, Metadata> = {
  [DASHBOARD_ROUTES.dashboard]: {
    title: "Dashboard",
    description: "",
    authors,
    applicationName: "abhimanyu",
  },
  [DASHBOARD_ROUTES.repos]: {
    title: "Repos",
    description: "Repositories information",
    authors,
    applicationName: "abhimanyu",
  },
  [DASHBOARD_ROUTES.pullRequest]: {
    title: "Pull Requests",
    description: "Pull requests",
    authors,
    applicationName: "abhimanyu",
  },
  [DASHBOARD_ROUTES.github]: {
    title: "Github App",
    description:
      "Install or disconnect the reviewer app on your GitHub account.",
    authors,
    applicationName: "abhimanyu",
  },
  [DASHBOARD_ROUTES.settings]: {
    title: "Settings",
    description: "Settings  for the app",
    authors,
    applicationName: "abhimanyu",
  },
}
