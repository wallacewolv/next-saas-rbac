import { api } from './api-client'

interface SigninWithPasswordRequest {
  email: string
  password: string
}

interface SigninWithPasswordResponse {
  token: string
}

export async function signinWithPassword({
  email,
  password,
}: SigninWithPasswordRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SigninWithPasswordResponse>()

  return result
}
