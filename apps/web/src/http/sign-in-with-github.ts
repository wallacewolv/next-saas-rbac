import { api } from './api-client'

interface SigninWithGithubRequest {
  code: string
}

interface SigninWithGithubResponse {
  token: string
}

export async function signinWithGithub({ code }: SigninWithGithubRequest) {
  const result = await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<SigninWithGithubResponse>()

  return result
}
