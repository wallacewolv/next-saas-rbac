import type { FastifyInstance } from 'fastify'

import { authenticateWithGithub } from './authenticate-with-github'
import { authenticateWithPassword } from './authenticate-with-password'
import { createAccount } from './create-account'
import { getProfile } from './get-profile'
import { requestPasswordRecover } from './request-password-recover'
import { resetPassword } from './reset-password'

export function AuthRoutes(app: FastifyInstance) {
  app.register(createAccount)
  app.register(authenticateWithPassword)
  app.register(authenticateWithGithub)
  app.register(getProfile)
  app.register(requestPasswordRecover)
  app.register(resetPassword)
}
