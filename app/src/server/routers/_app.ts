import { createTRPCRouter } from "@/server/trpc"
import { apiRouter } from "./api"
import { userRouter } from "./user"
import { monitorRouter } from "./monitor"

export const appRouter = createTRPCRouter({
  api: apiRouter,
  user: userRouter,
  monitor: monitorRouter,
})

export type AppRouter = typeof appRouter
