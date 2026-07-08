import { initTRPC } from "@trpc/server";

// trpc initialization
export const t = initTRPC.create();

// router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
