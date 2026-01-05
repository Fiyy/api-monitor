import { createTRPCRouter } from "@/server/trpc"
import { apiRouter } from "./api"
import { userRouter } from "./user"
import { monitorRouter } from "./monitor"
import { subscriptionRouter } from "./subscription"

export const appRouter = createTRPCRouter({
  api: apiRouter,
  user: userRouter,
  monitor: monitorRouter,
  subscription: subscriptionRouter,
})

export type AppRouter = typeof appRouter
