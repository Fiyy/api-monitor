/**
 * Daily Report Cron Job
 *
 * Runs every day at 9 AM to:
 * 1. Generate yesterday's statistics
 * 2. Send email report to admin
 */

import { NextRequest, NextResponse } from "next/server"
import { generateYesterdayStats, getDailySummary } from "@/lib/daily-stats"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60 // 1 minute max

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
      console.warn("CRON_SECRET not set - cron job is not protected!")
    }

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    console.log("Starting daily report generation...")

    // 1. Generate yesterday's stats
    await generateYesterdayStats()

    // 2. Get admin email
    const adminEmail = process.env.ADMIN_EMAIL

    if (!adminEmail) {
      console.warn("ADMIN_EMAIL not set - skipping email report")
      return NextResponse.json({
        success: true,
        message: "Stats generated, email skipped (no ADMIN_EMAIL)",
      })
    }

    // 3. Get summary data
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const summary = await getDailySummary(yesterday)

    if (!summary) {
      return NextResponse.json({
        success: false,
        error: "Failed to generate summary",
      })
    }

    // 4. Send email
    const resend = new Resend(process.env.RESEND_API_KEY)

    const dateStr = yesterday.toISOString().split('T')[0]

    // Format new users table
    const newUsersHtml = summary.newUsers.length > 0
      ? summary.newUsers.map((user, index) => {
          const location = user.activities[0]
            ? `${user.activities[0].city || 'Unknown'}, ${user.activities[0].country || 'Unknown'}`
            : 'Unknown'
          const plan = user.subscription?.plan || 'FREE'
          const trialStatus = user.subscription?.status === 'TRIALING' ? ' (Trial)' : ''

          return `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 8px;">${index + 1}</td>
              <td style="padding: 12px 8px;">
                <div style="font-weight: 500;">${user.name || 'Unknown'}</div>
                <div style="font-size: 13px; color: #6b7280;">${user.email}</div>
              </td>
              <td style="padding: 12px 8px;">${location}</td>
              <td style="padding: 12px 8px;">${plan}${trialStatus}</td>
              <td style="padding: 12px 8px;">${user._count.apis}</td>
              <td style="padding: 12px 8px; font-size: 13px; color: #6b7280;">
                ${user.createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </td>
            </tr>
          `
        }).join('')
      : '<tr><td colspan="6" style="padding: 20px; text-align: center; color: #9ca3af;">No new users</td></tr>'

    // Format country stats
    const topCountries = summary.stats.topCountries as { country: string; count: number }[] | null
    const countriesHtml = topCountries && topCountries.length > 0
      ? topCountries.map((item, index) => `
          <tr>
            <td style="padding: 8px;">${index + 1}. ${item.country}</td>
            <td style="padding: 8px; text-align: right; font-weight: 500;">${item.count}</td>
          </tr>
        `).join('')
      : '<tr><td colspan="2" style="padding: 12px; text-align: center; color: #9ca3af;">No data</td></tr>'

    await resend.emails.send({
      from: "APIShift Reports <reports@apishift.site>",
      to: adminEmail,
      subject: `📊 Daily Report - ${dateStr}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Daily Report</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">📊 Daily Report</h1>
              <p style="color: #e0e7ff; margin: 8px 0 0; font-size: 16px;">${dateStr}</p>
            </div>

            <!-- Stats Cards -->
            <div style="background-color: white; padding: 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
                <!-- New Users -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; color: white;">
                  <div style="font-size: 14px; opacity: 0.9;">New Users</div>
                  <div style="font-size: 32px; font-weight: bold; margin: 8px 0;">${summary.stats.newUsers}</div>
                  <div style="font-size: 13px; opacity: 0.8;">Total: ${summary.stats.totalUsers}</div>
                </div>

                <!-- New APIs -->
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 8px; color: white;">
                  <div style="font-size: 14px; opacity: 0.9;">New APIs</div>
                  <div style="font-size: 32px; font-weight: bold; margin: 8px 0;">${summary.stats.newApis}</div>
                  <div style="font-size: 13px; opacity: 0.8;">Total: ${summary.stats.totalApis}</div>
                </div>

                <!-- API Checks -->
                <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; border-radius: 8px; color: white;">
                  <div style="font-size: 14px; opacity: 0.9;">API Checks</div>
                  <div style="font-size: 32px; font-weight: bold; margin: 8px 0;">${summary.stats.checksRun}</div>
                  <div style="font-size: 13px; opacity: 0.8;">Automated checks</div>
                </div>

                <!-- Alerts -->
                <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 20px; border-radius: 8px; color: white;">
                  <div style="font-size: 14px; opacity: 0.9;">Alerts Created</div>
                  <div style="font-size: 32px; font-weight: bold; margin: 8px 0;">${summary.stats.alertsCreated}</div>
                  <div style="font-size: 13px; opacity: 0.8;">Schema changes detected</div>
                </div>
              </div>

              <!-- New Users Table -->
              <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 16px;">👥 New Users (${summary.newUsers.length})</h2>
              <div style="overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f9fafb;">
                      <th style="padding: 12px 8px; text-align: left; font-weight: 600; color: #6b7280; font-size: 13px; text-transform: uppercase;">#</th>
                      <th style="padding: 12px 8px; text-align: left; font-weight: 600; color: #6b7280; font-size: 13px; text-transform: uppercase;">User</th>
                      <th style="padding: 12px 8px; text-align: left; font-weight: 600; color: #6b7280; font-size: 13px; text-transform: uppercase;">Location</th>
                      <th style="padding: 12px 8px; text-align: left; font-weight: 600; color: #6b7280; font-size: 13px; text-transform: uppercase;">Plan</th>
                      <th style="padding: 12px 8px; text-align: left; font-weight: 600; color: #6b7280; font-size: 13px; text-transform: uppercase;">APIs</th>
                      <th style="padding: 12px 8px; text-align: left; font-weight: 600; color: #6b7280; font-size: 13px; text-transform: uppercase;">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${newUsersHtml}
                  </tbody>
                </table>
              </div>

              <!-- Geographic Distribution -->
              <h2 style="color: #1f2937; font-size: 20px; margin: 30px 0 16px;">🌍 Geographic Distribution</h2>
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
                <table style="width: 100%;">
                  ${countriesHtml}
                </table>
              </div>

              <!-- Actions -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <a href="https://www.apishift.site/dashboard/admin"
                   style="display: inline-block; background-color: #667eea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 16px;">
                  View Full Dashboard
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; text-align: center; color: #6b7280; font-size: 13px;">
              <p style="margin: 0;">APIShift - Automated Daily Report</p>
              <p style="margin: 8px 0 0;">This email was automatically generated at ${new Date().toLocaleString()}</p>
            </div>
          </body>
        </html>
      `,
    })

    console.log(`Daily report sent to ${adminEmail}`)

    return NextResponse.json({
      success: true,
      date: dateStr,
      stats: {
        newUsers: summary.stats.newUsers,
        newApis: summary.stats.newApis,
        checksRun: summary.stats.checksRun,
        alertsCreated: summary.stats.alertsCreated,
      },
      emailSent: true,
    })
  } catch (error) {
    console.error("Daily report error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

// Also support POST for manual triggering
export async function POST(request: NextRequest) {
  return GET(request)
}
