import { type, Type } from "arktype"

export function validateData<T>(
  schema: Type<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const validatedData = schema(data)

  if (validatedData instanceof type.errors) {
    return { success: false, error: validatedData.summary }
  }

  return { success: true, data: validatedData as T }
}

export * from "./github/github-installation.schema"
export * from "./health/health.schema"
