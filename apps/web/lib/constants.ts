import { SubscriptionPlan } from "@abhimanyu/contracts"
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

export const APP_NAME = "Abhimanyu"

export const LANDING_COPY = {
  eyebrow: "AI code review · RAG context engine",
  headline: [
    "Every codebase is a labyrinth.",
    "Abhimanyu finds the way through.",
  ],
  subhead:
    "Connect a repo and Abhimanyu indexes your entire codebase into a retrieval pipeline, so every pull request review arrives with the context a senior engineer would already have.",
  cta: "Connect a repo",
  gatesEyebrow: "Three gates in",
  tagline: "AI code review, grounded in your codebase.",
} as const

interface Gate {
  mark: string
  title: string
  description: string
}

/** The three setup steps, in the order a new user walks through them. */
export const LANDING_GATES: Gate[] = [
  {
    mark: "01",
    title: "Connect",
    description:
      "Install the GitHub app and choose which repos Abhimanyu should watch.",
  },
  {
    mark: "02",
    title: "Sync",
    description:
      "We index every file, commit, and history into a retrieval pipeline built for your codebase.",
  },
  {
    mark: "03",
    title: "Review",
    description:
      "Open a pull request and get review context grounded in how your code actually works.",
  },
]

interface Feature {
  title: string
  description: string
}

export const LANDING_FEATURES: Feature[] = [
  {
    title: "Context that remembers",
    description:
      "Reviews aren't scoped to the diff. Abhimanyu pulls in the surrounding code, past commits, and related files a senior engineer would already know.",
  },
  {
    title: "A full-repo index",
    description:
      "Every synced repo is chunked and embedded into a retrieval pipeline, kept up to date as your codebase changes.",
  },
  {
    title: "One dashboard, every PR",
    description:
      "See open pull requests across your repos in one place, with review context ready before you open the diff.",
  },
]

const authors = {
  name: "rokshh",
  url: "rohitjungkathet.com.np",
}

export const PageMetadata: Record<DASHBOARD_ROUTES, Metadata> = {
  [DASHBOARD_ROUTES.dashboard]: {
    title: "Dashboard",
    description: "Set up Abhimanyu and see where your reviews stand.",
    authors,
    applicationName: "abhimanyu",
  },
  [DASHBOARD_ROUTES.pullRequest]: {
    title: "Pull Requests",
    description: "Reviews across every repo you connected.",
    authors,
    applicationName: "abhimanyu",
  },
  [DASHBOARD_ROUTES.repos]: {
    title: "Repos",
    description: "Repositories information",
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

export const PLAN_DETAILS: Record<
  SubscriptionPlan,
  { label: string; features: string[] }
> = {
  Free: {
    label: "Free",
    features: [
      "Up to 5 AI reviews per month",
      "Public and private repositories only",
      "Community support",
    ],
  },
  Pro: {
    label: "Pro",
    features: [
      "Unlimited AI reviews on connected repos",
      "Public and private repository support",
      "Priority support",
    ],
  },
}
