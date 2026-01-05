"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { trpc } from "@/lib/trpc/client"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Bell, Mail, MessageSquare, Webhook, CheckCircle2 } from "lucide-react"

type NotificationConfig = {
  enabled: boolean
  severityFilter: ("LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[]
  webhookUrl?: string
}

export default function SettingsPageClient({ user }: { user: { name?: string | null; email?: string | null } }) {
  const { data: notifications, refetch } = trpc.notification.getAll.useQuery()

  // Email notification state
  const [emailConfig, setEmailConfig] = useState<NotificationConfig>({
    enabled: false,
    severityFilter: ["HIGH", "CRITICAL"],
  })

  // Slack notification state
  const [slackConfig, setSlackConfig] = useState<NotificationConfig>({
    enabled: false,
    severityFilter: ["HIGH", "CRITICAL"],
    webhookUrl: "",
  })

  // Discord notification state
  const [discordConfig, setDiscordConfig] = useState<NotificationConfig>({
    enabled: false,
    severityFilter: ["HIGH", "CRITICAL"],
    webhookUrl: "",
  })

  // Load existing configurations
  useEffect(() => {
    if (notifications) {
      notifications.forEach((notif) => {
        const config = notif.config as any
        const severityFilter = config?.severityFilter || ["HIGH", "CRITICAL"]

        if (notif.type === "EMAIL") {
          setEmailConfig({
            enabled: notif.enabled,
            severityFilter,
          })
        } else if (notif.type === "SLACK") {
          setSlackConfig({
            enabled: notif.enabled,
            severityFilter,
            webhookUrl: config?.webhookUrl || "",
          })
        } else if (notif.type === "DISCORD") {
          setDiscordConfig({
            enabled: notif.enabled,
            severityFilter,
            webhookUrl: config?.webhookUrl || "",
          })
        }
      })
    }
  }, [notifications])

  // Mutations
  const emailMutation = trpc.notification.upsertEmail.useMutation({
    onSuccess: () => {
      toast.success("Email notifications updated")
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const slackMutation = trpc.notification.upsertSlack.useMutation({
    onSuccess: () => {
      toast.success("Slack notifications updated")
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const discordMutation = trpc.notification.upsertDiscord.useMutation({
    onSuccess: () => {
      toast.success("Discord notifications updated")
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const toggleSeverity = (
    config: NotificationConfig,
    setter: (config: NotificationConfig) => void,
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  ) => {
    const newFilter = config.severityFilter.includes(severity)
      ? config.severityFilter.filter((s) => s !== severity)
      : [...config.severityFilter, severity]

    setter({ ...config, severityFilter: newFilter })
  }

  const severityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "destructive"
      case "HIGH":
        return "destructive"
      case "MEDIUM":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Your account information from your OAuth provider
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={user?.name || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled />
            </div>
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Receive alerts via email when API changes are detected
                  </CardDescription>
                </div>
              </div>
              <Switch
                checked={emailConfig.enabled}
                onCheckedChange={(checked) => {
                  const newConfig = { ...emailConfig, enabled: checked }
                  setEmailConfig(newConfig)
                  emailMutation.mutate(newConfig)
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={user?.email || ""} disabled />
              <p className="text-xs text-muted-foreground">
                Alerts will be sent to your account email
              </p>
            </div>

            <div className="space-y-2">
              <Label>Alert Severity Filter</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Select which severity levels should trigger email alerts
              </p>
              <div className="flex flex-wrap gap-2">
                {(["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((severity) => (
                  <Badge
                    key={severity}
                    variant={severityBadgeVariant(severity) as any}
                    className="cursor-pointer"
                    onClick={() => toggleSeverity(emailConfig, setEmailConfig, severity)}
                  >
                    {emailConfig.severityFilter.includes(severity) && (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    )}
                    {severity}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={() => emailMutation.mutate(emailConfig)}
              disabled={emailMutation.isPending || !emailConfig.enabled}
            >
              {emailMutation.isPending ? "Saving..." : "Save Email Settings"}
            </Button>
          </CardContent>
        </Card>

        {/* Slack Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Slack Notifications</CardTitle>
                  <CardDescription>
                    Send alerts to a Slack channel via webhook
                  </CardDescription>
                </div>
              </div>
              <Switch
                checked={slackConfig.enabled}
                onCheckedChange={(checked) =>
                  setSlackConfig({ ...slackConfig, enabled: checked })
                }
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Slack Webhook URL</Label>
              <Input
                placeholder="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
                value={slackConfig.webhookUrl || ""}
                onChange={(e) =>
                  setSlackConfig({ ...slackConfig, webhookUrl: e.target.value })
                }
                disabled={!slackConfig.enabled}
              />
              <p className="text-xs text-muted-foreground">
                Create a webhook in your Slack workspace settings.{" "}
                <a
                  href="https://api.slack.com/messaging/webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Learn how →
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <Label>Alert Severity Filter</Label>
              <div className="flex flex-wrap gap-2">
                {(["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((severity) => (
                  <Badge
                    key={severity}
                    variant={severityBadgeVariant(severity) as any}
                    className="cursor-pointer"
                    onClick={() => toggleSeverity(slackConfig, setSlackConfig, severity)}
                  >
                    {slackConfig.severityFilter.includes(severity) && (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    )}
                    {severity}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={() => {
                if (!slackConfig.webhookUrl) {
                  toast.error("Please enter a Slack webhook URL")
                  return
                }
                slackMutation.mutate({
                  enabled: slackConfig.enabled,
                  webhookUrl: slackConfig.webhookUrl,
                  severityFilter: slackConfig.severityFilter,
                })
              }}
              disabled={slackMutation.isPending || !slackConfig.enabled}
            >
              {slackMutation.isPending ? "Saving..." : "Save Slack Settings"}
            </Button>
          </CardContent>
        </Card>

        {/* Discord Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                  <Webhook className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Discord Notifications</CardTitle>
                  <CardDescription>
                    Send alerts to a Discord channel via webhook
                  </CardDescription>
                </div>
              </div>
              <Switch
                checked={discordConfig.enabled}
                onCheckedChange={(checked) =>
                  setDiscordConfig({ ...discordConfig, enabled: checked })
                }
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Discord Webhook URL</Label>
              <Input
                placeholder="https://discord.com/api/webhooks/YOUR/WEBHOOK/URL"
                value={discordConfig.webhookUrl || ""}
                onChange={(e) =>
                  setDiscordConfig({ ...discordConfig, webhookUrl: e.target.value })
                }
                disabled={!discordConfig.enabled}
              />
              <p className="text-xs text-muted-foreground">
                Create a webhook in your Discord server settings.{" "}
                <a
                  href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Learn how →
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <Label>Alert Severity Filter</Label>
              <div className="flex flex-wrap gap-2">
                {(["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((severity) => (
                  <Badge
                    key={severity}
                    variant={severityBadgeVariant(severity) as any}
                    className="cursor-pointer"
                    onClick={() => toggleSeverity(discordConfig, setDiscordConfig, severity)}
                  >
                    {discordConfig.severityFilter.includes(severity) && (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    )}
                    {severity}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={() => {
                if (!discordConfig.webhookUrl) {
                  toast.error("Please enter a Discord webhook URL")
                  return
                }
                discordMutation.mutate({
                  enabled: discordConfig.enabled,
                  webhookUrl: discordConfig.webhookUrl,
                  severityFilter: discordConfig.severityFilter,
                })
              }}
              disabled={discordMutation.isPending || !discordConfig.enabled}
            >
              {discordMutation.isPending ? "Saving..." : "Save Discord Settings"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
