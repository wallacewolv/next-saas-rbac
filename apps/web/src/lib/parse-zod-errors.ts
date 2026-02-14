import { ZodError } from 'zod'

export function parseZodErrors(error: ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {}

  for (const issue of error.issues) {
    const path = issue.path[0] as string

    if (!errors[path]) {
      errors[path] = []
    }

    errors[path].push(issue.message)
  }

  return errors
}
