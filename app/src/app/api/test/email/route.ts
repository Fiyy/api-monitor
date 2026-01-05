/**
 * Test Email Notification
 *
 * Manual test script to verify email sending works
 */

import { NextRequest, NextResponse } from "next/server"
import { sendNotifications } from "@/lib/notifications"
import { auth } from "@/lib/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized - please login first" },
        { status: 401 }
      )
    }

    // Send a test notification
    await sendNotifications(session.user.id, {
      apiName: "Test API",
      apiUrl: "https://api.example.com/test",
      severity: "HIGH",
      changes: [
        {
          path: "$.data.status",
          type: "field_type_changed",
          message: "Field type changed from string to number",
          oldValue: "string",
          newValue: "number",
        },
        {
          path: "$.data.email",
          type: "field_removed",
          message: "Required field 'email' was removed",
          oldValue: { type: "string" },
        },
      ],
      detectedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: "Test notification sent! Check your email (if notifications are configured)",
      userId: session.user.id,
      userEmail: session.user.email,
    })
  } catch (error) {
    console.error("Test notification error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
