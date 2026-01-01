import { createTRPCRouter, protectedProcedure } from "@/server/trpc"

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        subscription: true,
        _count: {
          select: {
            apis: true,
          },
        },
      },
    })

    return user
  }),
})
