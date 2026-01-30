import type { FastifyInstance } from 'fastify'

import { getOrganizationBilling } from './get-organization-billing'

export function BillingRoutes(app: FastifyInstance) {
  app.register(getOrganizationBilling)
}
