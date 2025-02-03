'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { type ReactNode } from 'react'
import { LuList } from 'react-icons/lu'

import { GetFirstLettersNameUser } from '@/functions/GetFirstLettersNameUser'
import { GetWindowSize } from '@/functions/GetWindowSize'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button, buttonVariants } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<{
    titleGroup?: string
    group: Array<{
      title: string
      href: string
      icon: ReactNode
    }>
  }>
}

export function Sidebar({ className, items }: SidebarNavProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const image = session?.image
  const nameUser = GetFirstLettersNameUser()
  const windowDevice = GetWindowSize()
  return (
    <div className={cn('relative pb-12 text-foreground/70', className)}>
      <div className="  px-3 py-8">
        <div className="relative my-4 ml-auto mr-3 flex h-auto min-h-20 w-[86%] items-center overflow-hidden rounded-[8px]   border-r-[1px] border-primary   py-2  shadow-[3px_1px_8px_-4px_rgba(0,0,0,0.3)] shadow-foreground">
          <div>
            <h1 className="ml-20 text-xl font-semibold tracking-tighter ">
              {session?.name}
            </h1>
            <p className="ml-20 text-sm tracking-tighter text-muted-foreground ">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <Avatar className="absolute top-12 z-10 h-20 w-20 shadow shadow-foreground  ">
          <Dialog>
            <DialogTrigger asChild>
              <AvatarImage
                src={image !== null ? image : '/images/avatar.svg'}
                alt="@shadcn"
                className="cursor-pointer object-cover"
              />
            </DialogTrigger>
            <DialogContent className={cn('min-w-[50vw]', className)}>
              {
                <img
                  src={image ?? '/images/avatar.svg'}
                  alt="Selecione um arquivo"
                  className="m-auto h-[80vh] object-contain"
                />
              }
              <DialogClose className="float-end mt-4">
                <Button className="bg-primary">Fechar</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
          <AvatarFallback className="text-foreground">
            {nameUser}
          </AvatarFallback>
        </Avatar>
        <div className="absolute left-[5px] top-24 z-50"></div>
        <div className="space-2 flex flex-col items-center justify-center lg:space-x-0 lg:space-y-1">
          {items.map((item) => (
            <div
              className="my-4 grid w-full grid-cols-2 place-items-center md:flex md:flex-col md:items-center md:justify-start md:rounded-[8px] md:border md:border-foreground/30 md:py-4"
              key={item.titleGroup}
            >
              <h2 className="col-start-1 col-end-3 px-2 pb-6 text-lg font-semibold tracking-tight ">
                <span className="flex items-center gap-x-2">
                  <LuList />
                  {item.titleGroup}
                </span>
              </h2>

              {item.group.map((itemGroup) => (
                <div
                  className="rounded-2xl md:h-auto md:w-full md:justify-start  md:gap-0  md:rounded-none md:border-none md:px-3"
                  key={itemGroup.title}
                >
                  <Button
                    variant="ghost"
                    className="relative my-3 flex h-[100px] w-[150px] border border-foreground/30 md:m-0 md:h-full md:w-full md:justify-start md:border-none md:p-0"
                  >
                    <Link
                      key={itemGroup.href}
                      href={itemGroup.href}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        pathname === itemGroup.href
                          ? ' border-2 border-primary/40 text-primary/40 hover:text-primary/40 md:bg-secondary md:text-foreground'
                          : '',
                        'absolute h-full w-full hover:border-2  hover:border-primary/40   md:relative  md:h-full md:w-full md:justify-start ',
                      )}
                    >
                      {windowDevice.width > 768 ? (
                        <span
                          className={cn(
                            pathname === itemGroup.href
                              ? ' text-primary/70'
                              : '',
                            'mr-2',
                          )}
                        >
                          {itemGroup?.icon}
                        </span>
                      ) : (
                        <span className="scale-[180%]">{itemGroup?.icon}</span>
                      )}

                      {windowDevice.width > 768 ? itemGroup.title : ''}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
