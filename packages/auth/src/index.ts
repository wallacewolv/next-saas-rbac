import {
  AbilityBuilder,
  type CreateAbility,
  createMongoAbility,
  type MongoAbility,
} from '@casl/ability'

import type { User } from './models/user'
import { permissions } from './permissions'
import type { ProjectSubject } from './subjects/project'
import type { UserSubject } from './subjects/user'

type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(use: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[use.role] !== 'function') {
    throw new Error(`Permission for role ${use.role} not found.`)
  }

  permissions[use.role](use, builder)

  const ability = builder.build()

  return ability
}
