import type { FastifyInstance } from 'fastify'

import { createInvite } from './create-invite'
import { getInvite } from './get-invite'
import { getInvites } from './get-invites'

export function InvitesRoutes(app: FastifyInstance) {
  app.register(createInvite)
  app.register(getInvite)
  app.register(getInvites)
}
