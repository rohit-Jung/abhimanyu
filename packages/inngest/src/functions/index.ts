import type { InngestFunction } from "inngest"

import { processTask } from "./process-task"
import { reviewPullRequest } from "./review-pr"
import { repoSyncRequest } from "./sync-repo"

export const inngestFunctions: InngestFunction.Any[] = [
  processTask,
  reviewPullRequest,
  repoSyncRequest,
]
