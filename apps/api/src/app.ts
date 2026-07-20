import "dotenv/config"
import { inngest } from "@abhimanyu/inngest"
import { auth } from "@abhimanyu/services"
import { appRouter, createExpressContext } from "@abhimanyu/trpc/server"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { toNodeHandler } from "better-auth/node"
import cors from "cors"
import express, { Application } from "express"

import { handleGithubAppCallback } from "./handlers/github.handler"

const app: Application = express()

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : ["*"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
)

app.all("/api/auth/*splat", toNodeHandler(auth))
app.use(express.json())
app.use("/api/inngest", inngest)

app.route("/api/github/callback").get(handleGithubAppCallback)
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: createExpressContext,
  })
)

export { app }
