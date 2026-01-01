import { createTRPCRouter } from "@/server/trpc"
import { apiRouter } from "./api"
import { userRouter } from "./user"

export const appRouter = createTRPCRouter({
  api: apiRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
