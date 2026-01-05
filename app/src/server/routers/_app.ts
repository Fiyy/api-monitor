import { createTRPCRouter } from "@/server/trpc"
import { apiRouter } from "./api"
import { userRouter } from "./user"
import { monitorRouter } from "./monitor"
import { subscriptionRouter } from "./subscription"
import { notificationRouter } from "./notification"

export const appRouter = createTRPCRouter({
  api: apiRouter,
  user: userRouter,
  monitor: monitorRouter,
  subscription: subscriptionRouter,
  notification: notificationRouter,
})

export type AppRouter = typeof appRouter
