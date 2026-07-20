import { eventType, Inngest, staticSchema } from "inngest"

export const prReceived = eventType("github/pr.received", {
  schema: staticSchema<{ pullRequestId: string }>(),
})

export const inngestClient: Inngest = new Inngest({
  id: "abhimanyu-app",
})
