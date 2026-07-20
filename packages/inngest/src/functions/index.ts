import type { InngestFunction } from "inngest"

import { processTask } from "./process-task"
import { reviewPullRequest } from "./review-pr"

export const inngestFunctions: InngestFunction.Any[] = [
  processTask,
  reviewPullRequest,
]
