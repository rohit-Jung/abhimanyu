import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter, createContext } from "@abhimanyu/trpc/server";
import { auth } from "@abhimanyu/services";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

const app = express();

// CORS
app.use(
  cors({
    origin: ["*"], // allow all  for now
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true, // cookies, authorization headers, etc
  }),
);

// better auth for authentication
app.all("/api/auth/*splat", toNodeHandler(auth));

// after better auth
app.use(express.json());

// trpc for other routes
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log("app is listening at", 4000);
});
