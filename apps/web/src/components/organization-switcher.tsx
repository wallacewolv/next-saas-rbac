import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { getOrganizations } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function OrganizationSwitcher() {
  const { organizations } = await getOrganizations()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-42 items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span className="text-muted-foreground">Select organization</span>
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-50"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>

          {organizations.map(({ avatarUrl, id, name, slug }) => {
            return (
              <DropdownMenuItem key={id} asChild>
                <Link href={`/org/${slug}`}>
                  <Avatar className="mr-2 size-4">
                    {avatarUrl && <AvatarImage src={avatarUrl} />}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/create-organization">
              <PlusCircle className="mr-2 size-4" />
              Create new
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
