"use client"

import { use } from "react"
import { trpc } from "@/lib/trpc/client"
import { ApiForm } from "./api-form"
import { Card, CardContent } from "@/components/ui/card"

interface ApiEditFormProps {
  params: Promise<{ id: string }>
}

export function ApiEditForm({ params }: ApiEditFormProps) {
  const { id } = use(params)
  const { data: api, isLoading } = trpc.api.getById.useQuery({ id })

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!api) {
    return (
      <Card>
        <CardContent className="py-12">
          <p className="text-center text-muted-foreground">API not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <ApiForm
      initialData={{
        id: api.id,
        name: api.name,
        url: api.url,
        method: api.method,
        headers: (api.headers as Record<string, string>) || {},
        checkInterval: api.checkInterval,
      }}
    />
  )
}
