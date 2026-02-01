'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signinWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.email({ message: 'Please, provide a valid email address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse({
    email: data.get('email'),
    password: data.get('password'),
  })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signinWithPassword({
      email,
      password,
    })

    console.log(token)
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

  return { success: true, message: null, errors: null }
}
