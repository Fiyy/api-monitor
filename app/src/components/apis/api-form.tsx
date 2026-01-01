"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"

interface ApiFormProps {
  initialData?: {
    id: string
    name: string
    url: string
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    headers?: Record<string, string>
    checkInterval: number
  }
}

export function ApiForm({ initialData }: ApiFormProps) {
  const router = useRouter()
  const [name, setName] = useState(initialData?.name || "")
  const [url, setUrl] = useState(initialData?.url || "")
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">(
    initialData?.method || "GET"
  )
  const [checkInterval, setCheckInterval] = useState(
    initialData?.checkInterval || 1440
  )
  const [headersJson, setHeadersJson] = useState(
    JSON.stringify(initialData?.headers || {}, null, 2)
  )
  const [error, setError] = useState("")

  const createMutation = trpc.api.create.useMutation({
    onSuccess: () => {
      router.push("/dashboard/apis")
    },
    onError: (err) => {
      setError(err.message)
    },
  })

  const updateMutation = trpc.api.update.useMutation({
    onSuccess: () => {
      router.push("/dashboard/apis")
    },
    onError: (err) => {
      setError(err.message)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate headers JSON
    let headers: Record<string, string> = {}
    try {
      if (headersJson.trim()) {
        headers = JSON.parse(headersJson)
      }
    } catch {
      setError("Invalid JSON in headers field")
      return
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      setError("Please enter a valid URL")
      return
    }

    if (initialData) {
      updateMutation.mutate({
        id: initialData.id,
        name,
        url,
        method,
        headers,
        checkInterval,
      })
    } else {
      createMutation.mutate({
        name,
        url,
        method,
        headers,
        checkInterval,
      })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>API Details</CardTitle>
          <CardDescription>
            Enter the details of the API endpoint you want to monitor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="My API"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              A friendly name to identify this API
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://api.example.com/endpoint"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              The full URL of the API endpoint to monitor
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="method">HTTP Method</Label>
              <Select value={method} onValueChange={(v: any) => setMethod(v)}>
                <SelectTrigger id="method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interval">Check Interval</Label>
              <Select
                value={checkInterval.toString()}
                onValueChange={(v) => setCheckInterval(parseInt(v))}
              >
                <SelectTrigger id="interval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">Every hour</SelectItem>
                  <SelectItem value="360">Every 6 hours</SelectItem>
                  <SelectItem value="720">Every 12 hours</SelectItem>
                  <SelectItem value="1440">Daily</SelectItem>
                  <SelectItem value="10080">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headers">Headers (JSON)</Label>
            <textarea
              id="headers"
              className="w-full min-h-32 p-3 rounded-md border border-input bg-background text-sm font-mono"
              placeholder='{\n  "Authorization": "Bearer token",\n  "Content-Type": "application/json"\n}'
              value={headersJson}
              onChange={(e) => setHeadersJson(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Optional: Add custom headers as JSON (leave empty for none)
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Update API" : "Add API"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
