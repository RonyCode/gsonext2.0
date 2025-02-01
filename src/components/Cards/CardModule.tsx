'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { type ReactElement } from 'react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { GetUserNotification } from '@/functions/GetNotificationUser'
import { cn } from '@/lib/utils'

type CardProps = {
  title?: string
  subtitle?: string
  link?: string
  icon?: React.ReactNode
} & React.ComponentProps<typeof Card>

export function CardModule({
  title,
  subtitle,
  icon,
  link,
  className,
  ...props
}: CardProps): ReactElement {
  const { data: session } = useSession()
  const handleGetMessage = (): void => {
    void GetUserNotification('auth', 'user_logged', session?.id_message)
  }

  return (
    <Card
      id="cardModule"
      className={cn('  h-28 w-full ', className)}
      {...props}
    >
      {link != null ? (
        <Link href={link ?? ''} onClick={handleGetMessage}>
          <CardHeader className=" h-full w-full cursor-pointer space-y-1.5 rounded-[5px]  border p-3  hover:border-primary/60 hover:bg-foreground/10 ">
            <div className="flex h-full w-full flex-col items-center justify-center p-0  xl:flex-row xl:justify-between">
              {/* <span className=" md h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span> */}
              <div>
                <CardTitle>{title}</CardTitle>
                <CardDescription className=" mt-1 hidden  flex-col lg:flex">
                  {subtitle}
                </CardDescription>
              </div>
              <span className="right-2 mt-2 fill-foreground/60 stroke-foreground/60 text-foreground/60 xl:mt-0">
                {icon}
              </span>
            </div>
          </CardHeader>
        </Link>
      ) : (
        <CardHeader className=" h-full w-full cursor-pointer space-y-1.5 rounded-[5px]  border p-3  hover:border-primary/60 hover:bg-foreground/10 ">
          <div className="flex h-full w-full flex-col items-center justify-center p-0  xl:flex-row xl:justify-between">
            {/* <span className=" md h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span> */}
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className=" mt-1 hidden  flex-col lg:flex">
                {subtitle}
              </CardDescription>
            </div>
            <span className="right-2 mt-2 fill-foreground/60 stroke-foreground/60 text-foreground/60 xl:mt-0">
              {icon}
            </span>
          </div>
        </CardHeader>
      )}
    </Card>
  )
}
