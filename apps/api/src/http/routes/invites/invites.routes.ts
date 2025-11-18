import type { FastifyInstance } from 'fastify'

import { createInvite } from './create-invite'
import { getInvite } from './get-invite'

export function InvitesRoutes(app: FastifyInstance) {
  app.register(createInvite)
  app.register(getInvite)
}
