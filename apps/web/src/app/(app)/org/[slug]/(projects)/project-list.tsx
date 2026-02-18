import { ArrowRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Projeto 01</CardTitle>
          <CardDescription className="line-clamp-2 leading-relaxed">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
            deserunt, qui aliquam porro amet neque quae esse aperiam et possimus
            voluptatibus, repudiandae at? Sit, magnam neque? Nemo temporibus
            enim impedit.
          </CardDescription>
        </CardHeader>
        <CardFooter className="felx items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarImage src="https://github.com/wallacewolv.png" />
            <AvatarFallback />
          </Avatar>

          <span className=" text-xs text-muted-foreground">
            Created by{' '}
            <span className="font-medium text-foreground">Wallace Wesley</span>{' '}
            a day ago
          </span>

          <Button size="xs" variant="outline" className="ml-auto">
            View <ArrowRight className="size-3 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
