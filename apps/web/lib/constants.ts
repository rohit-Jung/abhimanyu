export const DASHBOARD_ROUTES = {
  dashboard: "/dashboard",
  repos: "/dashboard/repos",
  pullRequest: "/dashboard/pull-requests",
  github: "/dashboard/github",
  settings: "/dashboard/settings",
} as const

export const SIDEBAR_NAV_ITEMS = {
  changes: [
    {
      file: "DASHBOARD.md",
      state: "M",
      route: DASHBOARD_ROUTES.dashboard,
    },
    {
      file: "src/repos",
      state: "M",
      route: DASHBOARD_ROUTES.repos,
    },
    {
      file: "utils/pullRequests",
      state: "U",
      route: DASHBOARD_ROUTES.pullRequest,
    },
    {
      file: "utils/settings",
      state: "M",
      route: DASHBOARD_ROUTES.settings,
    },
  ],
  tree: [
    ["app", ["api", ["hello", ["route.ts"]], "page.tsx", "layout.tsx"]],
    "package.json",
    "README.md",
  ],
}
