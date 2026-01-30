import { fastifyCors } from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '@saas/env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { AuthRoutes } from './routes/auth/auth.routes'
import { BillingRoutes } from './routes/billing/billing.routes'
import { InvitesRoutes } from './routes/invites/invites.routes'
import { MembersRoutes } from './routes/members/members.routes'
import { OrgsRoutes } from './routes/orgs/orgs.routes'
import { ProjectsRoutes } from './routes/projects/projects.routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack Saas app with multi-tenant & RBAC',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT obtained from authentication route.',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

AuthRoutes(app)
OrgsRoutes(app)
ProjectsRoutes(app)
MembersRoutes(app)
InvitesRoutes(app)
BillingRoutes(app)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log(`HTTP server running!`)
})
