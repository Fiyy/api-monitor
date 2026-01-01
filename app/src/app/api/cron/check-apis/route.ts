/**
 * Cron Job API Route
 *
 * This endpoint is called by Vercel Cron to check all APIs that are due
 * Security: Protected by CRON_SECRET environment variable
 */

import { NextRequest, NextResponse } from "next/server"
import { checkAllDueApis } from "@/lib/monitoring-service"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 300 // 5 minutes max execution time

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
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

    console.log("Starting scheduled API check...")

    // Check all APIs that are due
    const summary = await checkAllDueApis()

    console.log("Scheduled check complete:", summary)

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        total: summary.total,
        successful: summary.successful,
        failed: summary.failed,
        changesDetected: summary.changesDetected,
      },
    })
  } catch (error) {
    console.error("Cron job error:", error)

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
