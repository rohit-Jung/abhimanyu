import "dotenv/config"
import { auth } from "@abhimanyu/services"
import { appRouter, createExpressContext } from "@abhimanyu/trpc/server"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { toNodeHandler } from "better-auth/node"
import cors from "cors"
import express from "express"

import { handleGithubAppCallback } from "./handlers/github.handler"

const app = express()

// CORS
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : ["*"], // allow all  for now
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true, // cookies, authorization headers, etc
  })
)

// better auth for authentication
app.all("/api/auth/*splat", toNodeHandler(auth))
app.use(express.json())

app.route("/api/github/callback").get(handleGithubAppCallback)
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: createExpressContext,
  })
)

const port = process.env.PORT ?? 4000

app.listen(port, () => {
  console.log("app is listening at", 4000)
})
