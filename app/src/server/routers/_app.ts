import { createTRPCRouter } from "@/server/trpc"
import { apiRouter } from "./api"
import { userRouter } from "./user"
import { monitorRouter } from "./monitor"
import { subscriptionRouter } from "./subscription"
import { notificationRouter } from "./notification"
import { adminRouter } from "./admin"

export const appRouter = createTRPCRouter({
  api: apiRouter,
  user: userRouter,
  monitor: monitorRouter,
  subscription: subscriptionRouter,
  notification: notificationRouter,
  admin: adminRouter,
})

export type AppRouter = typeof appRouter
