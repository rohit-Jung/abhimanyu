import {
  IconBrandGithub,
  IconBrandGithubCopilot,
  TablerIcon,
} from "@tabler/icons-react"
import {
  FolderGit2,
  GitPullRequestIcon,
  LayoutDashboard,
  LucideIcon,
  Settings2,
} from "lucide-react"

export enum DASHBOARD_ROUTES {
  dashboard = "/dashboard",
  repos = "/dashboard/repos",
  pullRequest = "/dashboard/pull-requests",
  github = "/dashboard/github",
  settings = "/dashboard/settings",
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

export const GITHUB_APP_URL = ""
