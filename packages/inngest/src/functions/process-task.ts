import type { InngestFunction } from "inngest"

import { inngestClient } from "../client"

export const processTask: InngestFunction.Any = inngestClient.createFunction(
  {
    id: "process-task",
    triggers: { event: "app/task.created" },
  },
  async ({ event, step }) => {
    const { id } = event.data

    const result = await step.run("handle-task", async () => {
      return { processed: true, id }
    })

    await step.sleep("pause", "1s")
    return { message: `Task ${id ?? "unknown"} complete`, result }
  }
)
