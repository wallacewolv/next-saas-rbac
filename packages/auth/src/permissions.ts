import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './role'

type PermissionByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionByRole> = {
  // Admin can manage everything.
  // Admin is not allowed to transfer ownership or update Organization by default.
  // Admin may transfer ownership or update Organization if they are the owner.
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  // Members can read Users and create Projects.
  // Members can update and delete only their own Projects.
  MEMBER(user, { can }) {
    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  // Billing role can manage Billing.
  BILLING(_, { can }) {
    can('manage', 'Billing')
  },
}
