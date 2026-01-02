import { initTRPC, TRPCError } from "@trpc/server"
import { type NextRequest } from "next/server"
import superjson from "superjson"
import { ZodError } from "zod"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const createTRPCContext = async (opts: { req: NextRequest }) => {
  const session = await auth()

  return {
    session,
    prisma,
    req: opts.req,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory
export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})
