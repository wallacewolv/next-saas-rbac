import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getInvite } from '@/http/get-invite'
import { formatRelativeTime } from '@/lib/utils'

interface InvitePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { id: inviteId } = await params

  const { invite } = await getInvite(inviteId)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6 gap-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar style={{ width: 64, height: 64 }}>
            {invite.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>

          <p className="text-balance text-center leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join
            <br />
            <span className="font-medium text-foreground">
              {invite.organization.name}
            </span>
            .{' '}
            <span className="text-xs">
              {formatRelativeTime(invite.createdAt)}
            </span>
          </p>
        </div>

        <Separator className="max-w-xs mx-auto" />
      </div>
    </div>
  )
}
