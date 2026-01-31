'use server'

import { signinWithPassword } from '@/http/sign-in-with-password'

export async function signInWithEmailAndPassword(data: FormData) {
  const { email, password } = Object.fromEntries(data)

  const result = await signinWithPassword({
    email: String(email),
    password: String(password),
  })

  console.log(result)
}
