'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

// import { createProject } from '@/http/create-project'
import { parseZodErrors } from '@/lib/parse-zod-errors'

const projectSchema = z.object({
  name: z.string().min(4, { message: 'Please include at least 4 characters.' }),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse({
    name: data.get('name'),
    description: data.get('description'),
  })

  if (!result.success) {
    const errors = parseZodErrors(result.error)

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  try {
    // await createProject({
    //   name,
    //   domain,
    //   shouldAttachUsersByDomain,
    // })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the project.',
    errors: null,
  }
}
