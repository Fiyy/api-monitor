import { Resend } from "resend"
import { prisma } from "./prisma"
import type { Severity } from "@prisma/client"

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null
function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

type SchemaChange = {
  path: string
  type: string
  message: string
  oldValue?: any
  newValue?: any
}

type NotificationPayload = {
  apiName: string
  apiUrl: string
  severity: Severity
  changes: SchemaChange[]
  detectedAt: Date
}

export async function sendNotifications(userId: string, payload: NotificationPayload) {
  // Get user's notification configurations
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      notifications: {
        where: { enabled: true },
      },
    },
  })

  if (!user) {
    console.error(`User ${userId} not found`)
    return
  }

  // Send notifications based on user's configurations
  const promises = user.notifications.map(async (notif) => {
    const config = notif.config as any
    const severityFilter = config?.severityFilter || ["HIGH", "CRITICAL"]

    // Check if this severity should trigger a notification
    if (!severityFilter.includes(payload.severity)) {
      return
    }

    try {
      switch (notif.type) {
        case "EMAIL":
          await sendEmailNotification(user.email!, payload)
          break
        case "SLACK":
          await sendSlackNotification(config.webhookUrl, payload)
          break
        case "DISCORD":
          await sendDiscordNotification(config.webhookUrl, payload)
          break
        case "WEBHOOK":
          await sendWebhookNotification(config.webhookUrl, payload)
          break
      }
      console.log(`Sent ${notif.type} notification to user ${userId}`)
    } catch (error) {
      console.error(`Failed to send ${notif.type} notification:`, error)
    }
  })

  await Promise.allSettled(promises)
}

async function sendEmailNotification(email: string, payload: NotificationPayload) {
  const severityColor = {
    LOW: "#10b981",
    MEDIUM: "#f59e0b",
    HIGH: "#f97316",
    CRITICAL: "#ef4444",
  }[payload.severity]

  const severityEmoji = {
    LOW: "ℹ️",
    MEDIUM: "⚠️",
    HIGH: "🔶",
    CRITICAL: "🚨",
  }[payload.severity]

  const changesHtml = payload.changes
    .map(
      (change) => `
      <div style="background-color: #f8fafc; border-left: 4px solid ${severityColor}; padding: 12px; margin-bottom: 12px; border-radius: 4px;">
        <div style="font-family: monospace; font-size: 14px; color: #1e293b; margin-bottom: 4px;">
          <strong>${change.path}</strong>
        </div>
        <div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">
          ${change.message}
        </div>
        ${
          change.oldValue
            ? `<div style="color: #dc2626; font-size: 12px;">Old: ${JSON.stringify(change.oldValue)}</div>`
            : ""
        }
        ${
          change.newValue
            ? `<div style="color: #16a34a; font-size: 12px;">New: ${JSON.stringify(change.newValue)}</div>`
            : ""
        }
      </div>
    `
    )
    .join("")

  const resend = getResend()
  await resend.emails.send({
    from: "APIShift Alerts <alerts@apishift.site>",
    to: email,
    subject: `${severityEmoji} ${payload.severity} Alert: ${payload.apiName} Schema Changed`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>API Change Alert</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">
              ${severityEmoji} API Schema Change Detected
            </h1>
          </div>

          <div style="background-color: white; padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <div style="background-color: ${severityColor}15; border-left: 4px solid ${severityColor}; padding: 16px; margin-bottom: 20px; border-radius: 4px;">
              <div style="color: ${severityColor}; font-weight: bold; font-size: 18px; margin-bottom: 8px;">
                ${payload.severity} SEVERITY
              </div>
              <div style="color: #475569; font-size: 14px;">
                Detected: ${payload.detectedAt.toLocaleString()}
              </div>
            </div>

            <h2 style="color: #1e293b; font-size: 20px; margin-bottom: 8px;">
              ${payload.apiName}
            </h2>
            <div style="color: #64748b; font-size: 14px; margin-bottom: 20px; word-break: break-all;">
              ${payload.apiUrl}
            </div>

            <h3 style="color: #1e293b; font-size: 16px; margin-bottom: 12px;">
              Detected Changes (${payload.changes.length})
            </h3>

            ${changesHtml}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <a href="https://www.apishift.site/dashboard/alerts"
                 style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                View in Dashboard
              </a>
            </div>

            <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 6px;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                <strong>What should I do?</strong><br>
                Review the changes and update your code if necessary. Test thoroughly before deploying.
              </p>
            </div>
          </div>

          <div style="margin-top: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
            <p>
              APIShift - Real-time API schema monitoring<br>
              <a href="https://www.apishift.site/dashboard/settings" style="color: #2563eb;">Manage notification settings</a>
            </p>
          </div>
        </body>
      </html>
    `,
  })
}

async function sendSlackNotification(webhookUrl: string, payload: NotificationPayload) {
  const severityColor = {
    LOW: "#10b981",
    MEDIUM: "#f59e0b",
    HIGH: "#f97316",
    CRITICAL: "#ef4444",
  }[payload.severity]

  const severityEmoji = {
    LOW: ":information_source:",
    MEDIUM: ":warning:",
    HIGH: ":large_orange_diamond:",
    CRITICAL: ":rotating_light:",
  }[payload.severity]

  const changesText = payload.changes
    .map((change) => {
      let text = `• \`${change.path}\`: ${change.message}`
      if (change.oldValue) text += `\n  Old: \`${JSON.stringify(change.oldValue)}\``
      if (change.newValue) text += `\n  New: \`${JSON.stringify(change.newValue)}\``
      return text
    })
    .join("\n")

  const slackMessage = {
    text: `${severityEmoji} API Schema Change Detected: ${payload.apiName}`,
    attachments: [
      {
        color: severityColor,
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: `${severityEmoji} ${payload.severity} Alert: Schema Change`,
              emoji: true,
            },
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*API Name:*\n${payload.apiName}`,
              },
              {
                type: "mrkdwn",
                text: `*Severity:*\n${payload.severity}`,
              },
              {
                type: "mrkdwn",
                text: `*URL:*\n${payload.apiUrl}`,
              },
              {
                type: "mrkdwn",
                text: `*Detected:*\n${payload.detectedAt.toLocaleString()}`,
              },
            ],
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Changes Detected (${payload.changes.length}):*\n${changesText}`,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "View in Dashboard",
                  emoji: true,
                },
                url: "https://www.apishift.site/dashboard/alerts",
                style: "primary",
              },
            ],
          },
        ],
      },
    ],
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slackMessage),
  })

  if (!response.ok) {
    throw new Error(`Slack webhook failed: ${response.statusText}`)
  }
}

async function sendDiscordNotification(webhookUrl: string, payload: NotificationPayload) {
  const severityColor = {
    LOW: 0x10b981,
    MEDIUM: 0xf59e0b,
    HIGH: 0xf97316,
    CRITICAL: 0xef4444,
  }[payload.severity]

  const severityEmoji = {
    LOW: "ℹ️",
    MEDIUM: "⚠️",
    HIGH: "🔶",
    CRITICAL: "🚨",
  }[payload.severity]

  const changesText = payload.changes
    .map((change) => {
      let text = `**${change.path}**: ${change.message}`
      if (change.oldValue) text += `\nOld: \`${JSON.stringify(change.oldValue)}\``
      if (change.newValue) text += `\nNew: \`${JSON.stringify(change.newValue)}\``
      return text
    })
    .join("\n\n")

  const discordMessage = {
    content: `${severityEmoji} **${payload.severity} Alert**: API Schema Change Detected`,
    embeds: [
      {
        title: payload.apiName,
        description: payload.apiUrl,
        color: severityColor,
        fields: [
          {
            name: "Severity",
            value: payload.severity,
            inline: true,
          },
          {
            name: "Changes",
            value: String(payload.changes.length),
            inline: true,
          },
          {
            name: "Detected At",
            value: payload.detectedAt.toLocaleString(),
            inline: false,
          },
          {
            name: "Changes Detected",
            value: changesText.slice(0, 1024), // Discord field limit
            inline: false,
          },
        ],
        footer: {
          text: "APIShift - Real-time API monitoring",
        },
        timestamp: payload.detectedAt.toISOString(),
      },
    ],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            label: "View in Dashboard",
            url: "https://www.apishift.site/dashboard/alerts",
          },
        ],
      },
    ],
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(discordMessage),
  })

  if (!response.ok) {
    throw new Error(`Discord webhook failed: ${response.statusText}`)
  }
}

async function sendWebhookNotification(webhookUrl: string, payload: NotificationPayload) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "api.schema.changed",
      severity: payload.severity,
      api: {
        name: payload.apiName,
        url: payload.apiUrl,
      },
      changes: payload.changes,
      detectedAt: payload.detectedAt.toISOString(),
    }),
  })

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.statusText}`)
  }
}
