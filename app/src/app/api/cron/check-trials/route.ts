import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// This endpoint should be called by a cron job (e.g., Vercel Cron)
// Add to vercel.json:
// {
//   "crons": [{
//     "path": "/api/cron/check-trials",
//     "schedule": "0 */6 * * *"
//   }]
// }

export async function GET(request: NextRequest) {
  try {
    // Initialize Resend here to avoid build-time errors
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const now = new Date()

    // Find all subscriptions with expired trials
    const expiredTrials = await prisma.subscription.findMany({
      where: {
        status: "TRIALING",
        trialEndsAt: {
          lte: now,
        },
      },
      include: {
        user: true,
      },
    })

    console.log(`Found ${expiredTrials.length} expired trials`)

    // Downgrade expired trials to FREE plan
    for (const subscription of expiredTrials) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          plan: "FREE",
          status: "ACTIVE",
        },
      })

      // Send trial ended email
      if (subscription.user.email) {
        try {
          await resend.emails.send({
            from: "APIShift <noreply@apishift.site>",
            to: subscription.user.email,
            subject: "Your Pro Trial Has Ended",
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>Trial Ended</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #2563eb;">Your Pro Trial Has Ended</h1>

                    <p>Hi ${subscription.user.name || "there"},</p>

                    <p>Your 14-day Pro trial has ended. We hope you enjoyed exploring the Pro features!</p>

                    <p><strong>What happens now?</strong></p>
                    <ul>
                      <li>Your account has been automatically downgraded to the Free plan</li>
                      <li>You can continue monitoring up to 5 APIs with hourly checks</li>
                      <li>Your data and settings have been preserved</li>
                    </ul>

                    <p><strong>Want to keep the Pro features?</strong></p>
                    <p>Upgrade to Pro for just $29/month and get:</p>
                    <ul>
                      <li>Up to 50 APIs monitored</li>
                      <li>Checks every 5 minutes</li>
                      <li>Advanced diff algorithm</li>
                      <li>90 days data retention</li>
                      <li>Priority email support</li>
                      <li>Slack & Discord webhooks</li>
                    </ul>

                    <div style="margin: 30px 0;">
                      <a href="https://www.apishift.site/pricing"
                         style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                        Upgrade to Pro
                      </a>
                    </div>

                    <p>Questions? Just reply to this email.</p>

                    <p>Thanks for using APIShift!<br>
                    The APIShift Team</p>

                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="font-size: 12px; color: #666;">
                      APIShift - Real-time API schema monitoring<br>
                      <a href="https://www.apishift.site">www.apishift.site</a>
                    </p>
                  </div>
                </body>
              </html>
            `,
          })
          console.log(`Sent trial ended email to ${subscription.user.email}`)
        } catch (emailError) {
          console.error(`Failed to send email to ${subscription.user.email}:`, emailError)
        }
      }
    }

    // Find trials ending in 3 days and send reminder
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

    const endingSoonTrials = await prisma.subscription.findMany({
      where: {
        status: "TRIALING",
        trialEndsAt: {
          lte: threeDaysFromNow,
          gt: now,
        },
        trialNotified: false,
      },
      include: {
        user: true,
      },
    })

    console.log(`Found ${endingSoonTrials.length} trials ending soon`)

    // Send reminder emails
    for (const subscription of endingSoonTrials) {
      if (subscription.user.email && subscription.trialEndsAt) {
        const daysRemaining = Math.ceil(
          (subscription.trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        )

        try {
          await resend.emails.send({
            from: "APIShift <noreply@apishift.site>",
            to: subscription.user.email,
            subject: `Your Pro Trial Ends in ${daysRemaining} Days`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>Trial Ending Soon</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #2563eb;">Your Pro Trial Ends in ${daysRemaining} Days</h1>

                    <p>Hi ${subscription.user.name || "there"},</p>

                    <p>This is a friendly reminder that your 14-day Pro trial will end in ${daysRemaining} days.</p>

                    <p><strong>What happens when my trial ends?</strong></p>
                    <ul>
                      <li>Your account will automatically downgrade to the Free plan</li>
                      <li>You'll be limited to 5 APIs with hourly checks</li>
                      <li>No charges will be made unless you upgrade</li>
                    </ul>

                    <p><strong>Want to keep your Pro features?</strong></p>
                    <p>Subscribe now for $29/month and continue enjoying:</p>
                    <ul>
                      <li>Up to 50 APIs monitored</li>
                      <li>Checks every 5 minutes</li>
                      <li>Advanced diff algorithm</li>
                      <li>90 days data retention</li>
                      <li>Priority support</li>
                    </ul>

                    <div style="margin: 30px 0;">
                      <a href="https://www.apishift.site/pricing"
                         style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                        Subscribe to Pro
                      </a>
                    </div>

                    <p>Have questions? Reply to this email anytime.</p>

                    <p>Best regards,<br>
                    The APIShift Team</p>

                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="font-size: 12px; color: #666;">
                      APIShift - Real-time API schema monitoring<br>
                      <a href="https://www.apishift.site">www.apishift.site</a>
                    </p>
                  </div>
                </body>
              </html>
            `,
          })

          // Mark as notified
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: { trialNotified: true },
          })

          console.log(`Sent trial reminder email to ${subscription.user.email}`)
        } catch (emailError) {
          console.error(`Failed to send reminder email to ${subscription.user.email}:`, emailError)
        }
      }
    }

    return NextResponse.json({
      success: true,
      expiredTrials: expiredTrials.length,
      reminders: endingSoonTrials.length,
      message: `Processed ${expiredTrials.length} expired trials and sent ${endingSoonTrials.length} reminders`,
    })
  } catch (error) {
    console.error("Error checking trials:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
