'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'
import { parseZodErrors } from '@/lib/parse-zod-errors'

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required.' })
      .refine((value) => value.split(' ').length > 1, {
        message: 'Please, enter your full name.',
      }),
    email: z.email({ message: 'Please, provide a valid email address.' }),
    password: z.string().min(6, {
      message: 'Password should have at least 6 characters.',
    }),
    password_confirmation: z
      .string()
      .min(1, { message: 'Password confirmation is required.' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse({
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
    password_confirmation: data.get('password_confirmation'),
  })

  if (!result.success) {
    const errors = parseZodErrors(result.error)

    console.log('Validation errors:', errors)

    return { success: false, message: null, errors }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name,
      email,
      password,
    })
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
