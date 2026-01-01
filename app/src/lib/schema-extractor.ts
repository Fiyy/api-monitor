/**
 * Schema Extractor
 *
 * Extracts the structure/schema from JSON responses
 * This is used to detect changes in API structure over time
 */

export type SchemaType =
  | "null"
  | "boolean"
  | "number"
  | "string"
  | "array"
  | "object"

export interface SchemaNode {
  type: SchemaType
  nullable?: boolean
  items?: SchemaNode // For arrays
  properties?: Record<string, SchemaNode> // For objects
  required?: string[] // For objects
  enum?: any[] // For enum values
}

/**
 * Extract schema structure from any value
 */
export function extractSchema(value: any): SchemaNode {
  // Handle null
  if (value === null) {
    return { type: "null", nullable: true }
  }

  // Handle primitives
  if (typeof value === "boolean") {
    return { type: "boolean" }
  }

  if (typeof value === "number") {
    return { type: "number" }
  }

  if (typeof value === "string") {
    return { type: "string" }
  }

  // Handle arrays
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return {
        type: "array",
        items: { type: "null" },
      }
    }

    // Merge schemas from all array items to get the complete structure
    const mergedItemSchema = value.reduce((acc, item) => {
      const itemSchema = extractSchema(item)
      return mergeSchemas(acc, itemSchema)
    }, extractSchema(value[0]))

    return {
      type: "array",
      items: mergedItemSchema,
    }
  }

  // Handle objects
  if (typeof value === "object") {
    const properties: Record<string, SchemaNode> = {}
    const required: string[] = []

    for (const key in value) {
      properties[key] = extractSchema(value[key])

      // Mark as required if not null/undefined
      if (value[key] !== null && value[key] !== undefined) {
        required.push(key)
      }
    }

    return {
      type: "object",
      properties,
      required: required.length > 0 ? required : undefined,
    }
  }

  // Fallback
  return { type: "null" }
}

/**
 * Merge two schemas to create a union schema
 * Used when analyzing array items or multiple responses
 */
export function mergeSchemas(schema1: SchemaNode, schema2: SchemaNode): SchemaNode {
  // If types are different, mark as nullable
  if (schema1.type !== schema2.type) {
    return {
      type: schema1.type,
      nullable: true,
    }
  }

  // Handle arrays
  if (schema1.type === "array" && schema2.type === "array") {
    return {
      type: "array",
      items: schema1.items && schema2.items
        ? mergeSchemas(schema1.items, schema2.items)
        : schema1.items || schema2.items,
    }
  }

  // Handle objects
  if (schema1.type === "object" && schema2.type === "object") {
    const allKeys = new Set([
      ...Object.keys(schema1.properties || {}),
      ...Object.keys(schema2.properties || {}),
    ])

    const properties: Record<string, SchemaNode> = {}
    const required: string[] = []

    for (const key of allKeys) {
      const prop1 = schema1.properties?.[key]
      const prop2 = schema2.properties?.[key]

      if (prop1 && prop2) {
        properties[key] = mergeSchemas(prop1, prop2)

        // Only required if in both
        if (
          schema1.required?.includes(key) &&
          schema2.required?.includes(key)
        ) {
          required.push(key)
        }
      } else {
        // Property exists in only one schema
        properties[key] = prop1 || prop2!
        properties[key].nullable = true
      }
    }

    return {
      type: "object",
      properties,
      required: required.length > 0 ? required : undefined,
    }
  }

  // For primitives, just return the first schema
  return schema1
}

/**
 * Fetch an API and extract its schema
 */
export async function fetchAndExtractSchema(
  url: string,
  method: string = "GET",
  headers: Record<string, string> = {}
): Promise<{
  schema: SchemaNode
  statusCode: number
  latencyMs: number
  responseHash: string
}> {
  const startTime = Date.now()

  const response = await fetch(url, {
    method,
    headers: {
      "User-Agent": "APIShift-Monitor/1.0",
      ...headers,
    },
  })

  const latencyMs = Date.now() - startTime
  const statusCode = response.status

  let data: any
  const contentType = response.headers.get("content-type")

  if (contentType?.includes("application/json")) {
    data = await response.json()
  } else {
    // For non-JSON responses, treat as string
    data = await response.text()
  }

  const schema = extractSchema(data)

  // Create a hash of the response for quick comparison
  const responseHash = await hashObject(data)

  return {
    schema,
    statusCode,
    latencyMs,
    responseHash,
  }
}

/**
 * Create a simple hash of an object for comparison
 */
async function hashObject(obj: any): Promise<string> {
  const str = JSON.stringify(obj, Object.keys(obj).sort())

  // Use Web Crypto API for hashing
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  return hashHex
}
