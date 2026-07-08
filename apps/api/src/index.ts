import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter, createContext } from "@abhimanyu/trpc/server";

const app = express();

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log("app is listening at", 3000);
});
