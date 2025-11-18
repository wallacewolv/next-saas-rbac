import type { FastifyInstance } from 'fastify'

import { createInvite } from './create-invite'

export function InvitesRoutes(app: FastifyInstance) {
  app.register(createInvite)
}
