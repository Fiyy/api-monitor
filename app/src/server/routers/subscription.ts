import { createTRPCRouter, protectedProcedure } from "@/server/trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { addDays } from "date-fns"

export const subscriptionRouter = createTRPCRouter({
  // Get current subscription
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const subscription = await ctx.prisma.subscription.findUnique({
      where: { userId: ctx.session.user.id },
    })

    // Create subscription if it doesn't exist
    if (!subscription) {
      return await ctx.prisma.subscription.create({
        data: {
          userId: ctx.session.user.id,
          plan: "FREE",
          status: "ACTIVE",
        },
      })
    }

    return subscription
  }),

  // Start Pro trial
  startProTrial: protectedProcedure.mutation(async ({ ctx }) => {
    const subscription = await ctx.prisma.subscription.findUnique({
      where: { userId: ctx.session.user.id },
    })

    // Check if user already has a subscription
    if (!subscription) {
      // Create new subscription with trial
      const trialStartsAt = new Date()
      const trialEndsAt = addDays(trialStartsAt, 14) // 14-day trial

      return await ctx.prisma.subscription.create({
        data: {
          userId: ctx.session.user.id,
          plan: "PRO",
          status: "TRIALING",
          trialStartsAt,
          trialEndsAt,
          trialNotified: false,
        },
      })
    }

    // Check if user already used a trial
    if (subscription.trialStartsAt || subscription.trialEndsAt) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You have already used your free trial",
      })
    }

    // Check if user is not on FREE plan
    if (subscription.plan !== "FREE") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Trial is only available for Free plan users",
      })
    }

    // Start trial
    const trialStartsAt = new Date()
    const trialEndsAt = addDays(trialStartsAt, 14) // 14-day trial

    return await ctx.prisma.subscription.update({
      where: { userId: ctx.session.user.id },
      data: {
        plan: "PRO",
        status: "TRIALING",
        trialStartsAt,
        trialEndsAt,
        trialNotified: false,
      },
    })
  }),

  // Cancel trial (downgrade to FREE)
  cancelTrial: protectedProcedure.mutation(async ({ ctx }) => {
    const subscription = await ctx.prisma.subscription.findUnique({
      where: { userId: ctx.session.user.id },
    })

    if (!subscription) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Subscription not found",
      })
    }

    if (subscription.status !== "TRIALING") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You are not currently on a trial",
      })
    }

    return await ctx.prisma.subscription.update({
      where: { userId: ctx.session.user.id },
      data: {
        plan: "FREE",
        status: "ACTIVE",
        // Keep trial dates for history
      },
    })
  }),

  // Convert trial to paid subscription
  convertTrialToPaid: protectedProcedure
    .input(
      z.object({
        stripeSubscriptionId: z.string(),
        stripeCustomerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const subscription = await ctx.prisma.subscription.findUnique({
        where: { userId: ctx.session.user.id },
      })

      if (!subscription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subscription not found",
        })
      }

      if (subscription.status !== "TRIALING") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are not currently on a trial",
        })
      }

      return await ctx.prisma.subscription.update({
        where: { userId: ctx.session.user.id },
        data: {
          status: "ACTIVE",
          stripeSubscriptionId: input.stripeSubscriptionId,
          stripeCustomerId: input.stripeCustomerId,
          currentPeriodStart: new Date(),
          currentPeriodEnd: addDays(new Date(), 30),
        },
      })
    }),

  // Get trial status
  getTrialStatus: protectedProcedure.query(async ({ ctx }) => {
    const subscription = await ctx.prisma.subscription.findUnique({
      where: { userId: ctx.session.user.id },
    })

    if (!subscription) {
      return {
        hasUsedTrial: false,
        isOnTrial: false,
        trialEndsAt: null,
        daysRemaining: null,
      }
    }

    const now = new Date()
    const isOnTrial = subscription.status === "TRIALING" &&
                      subscription.trialEndsAt &&
                      subscription.trialEndsAt > now

    const daysRemaining = isOnTrial && subscription.trialEndsAt
      ? Math.ceil((subscription.trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null

    return {
      hasUsedTrial: !!subscription.trialStartsAt,
      isOnTrial,
      trialEndsAt: subscription.trialEndsAt,
      daysRemaining,
    }
  }),
})
