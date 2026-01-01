/**
 * Schema Diff
 *
 * Compares two schemas and identifies changes
 * Used to detect breaking changes in API responses
 */

import { SchemaNode, SchemaType } from "./schema-extractor"

export type ChangeType =
  | "field_added"
  | "field_removed"
  | "field_type_changed"
  | "field_required_added"
  | "field_required_removed"
  | "array_item_changed"
  | "nullable_changed"

export type ChangeSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export interface SchemaChange {
  type: ChangeType
  path: string
  severity: ChangeSeverity
  oldValue?: any
  newValue?: any
  message: string
}

/**
 * Compare two schemas and return list of changes
 */
export function compareSchemas(
  oldSchema: SchemaNode,
  newSchema: SchemaNode,
  path: string = "$"
): SchemaChange[] {
  const changes: SchemaChange[] = []

  // Type changed
  if (oldSchema.type !== newSchema.type) {
    changes.push({
      type: "field_type_changed",
      path,
      severity: "CRITICAL",
      oldValue: oldSchema.type,
      newValue: newSchema.type,
      message: `Type changed from ${oldSchema.type} to ${newSchema.type}`,
    })
    // Don't continue comparing if types are different
    return changes
  }

  // Nullable changed
  if (oldSchema.nullable !== newSchema.nullable) {
    changes.push({
      type: "nullable_changed",
      path,
      severity: newSchema.nullable ? "MEDIUM" : "HIGH",
      oldValue: oldSchema.nullable,
      newValue: newSchema.nullable,
      message: newSchema.nullable
        ? "Field became nullable"
        : "Field became non-nullable",
    })
  }

  // Array items changed
  if (oldSchema.type === "array" && newSchema.type === "array") {
    if (oldSchema.items && newSchema.items) {
      const itemChanges = compareSchemas(
        oldSchema.items,
        newSchema.items,
        `${path}[]`
      )
      changes.push(...itemChanges)
    }
  }

  // Object properties changed
  if (oldSchema.type === "object" && newSchema.type === "object") {
    const oldProps = oldSchema.properties || {}
    const newProps = newSchema.properties || {}
    const oldRequired = new Set(oldSchema.required || [])
    const newRequired = new Set(newSchema.required || [])

    const allKeys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)])

    for (const key of allKeys) {
      const oldProp = oldProps[key]
      const newProp = newProps[key]
      const propPath = `${path}.${key}`

      // Field removed
      if (oldProp && !newProp) {
        changes.push({
          type: "field_removed",
          path: propPath,
          severity: oldRequired.has(key) ? "CRITICAL" : "HIGH",
          oldValue: oldProp,
          message: oldRequired.has(key)
            ? `Required field "${key}" was removed`
            : `Field "${key}" was removed`,
        })
        continue
      }

      // Field added
      if (!oldProp && newProp) {
        changes.push({
          type: "field_added",
          path: propPath,
          severity: newRequired.has(key) ? "MEDIUM" : "LOW",
          newValue: newProp,
          message: newRequired.has(key)
            ? `New required field "${key}" was added`
            : `New field "${key}" was added`,
        })
        continue
      }

      // Field exists in both - compare recursively
      if (oldProp && newProp) {
        const propChanges = compareSchemas(oldProp, newProp, propPath)
        changes.push(...propChanges)

        // Check required status changes
        if (oldRequired.has(key) && !newRequired.has(key)) {
          changes.push({
            type: "field_required_removed",
            path: propPath,
            severity: "LOW",
            message: `Field "${key}" is no longer required`,
          })
        }

        if (!oldRequired.has(key) && newRequired.has(key)) {
          changes.push({
            type: "field_required_added",
            path: propPath,
            severity: "HIGH",
            message: `Field "${key}" became required`,
          })
        }
      }
    }
  }

  return changes
}

/**
 * Determine overall severity from a list of changes
 */
export function getOverallSeverity(changes: SchemaChange[]): ChangeSeverity {
  if (changes.length === 0) return "LOW"

  const severityOrder = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 }

  const maxSeverity = changes.reduce((max, change) => {
    return severityOrder[change.severity] > severityOrder[max]
      ? change.severity
      : max
  }, "LOW" as ChangeSeverity)

  return maxSeverity
}

/**
 * Group changes by severity
 */
export function groupChangesBySeverity(changes: SchemaChange[]): {
  critical: SchemaChange[]
  high: SchemaChange[]
  medium: SchemaChange[]
  low: SchemaChange[]
} {
  return {
    critical: changes.filter((c) => c.severity === "CRITICAL"),
    high: changes.filter((c) => c.severity === "HIGH"),
    medium: changes.filter((c) => c.severity === "MEDIUM"),
    low: changes.filter((c) => c.severity === "LOW"),
  }
}

/**
 * Format changes into a human-readable summary
 */
export function formatChangesSummary(changes: SchemaChange[]): string {
  if (changes.length === 0) {
    return "No changes detected"
  }

  const grouped = groupChangesBySeverity(changes)
  const parts: string[] = []

  if (grouped.critical.length > 0) {
    parts.push(`${grouped.critical.length} critical change(s)`)
  }
  if (grouped.high.length > 0) {
    parts.push(`${grouped.high.length} high severity change(s)`)
  }
  if (grouped.medium.length > 0) {
    parts.push(`${grouped.medium.length} medium severity change(s)`)
  }
  if (grouped.low.length > 0) {
    parts.push(`${grouped.low.length} low severity change(s)`)
  }

  return parts.join(", ")
}
