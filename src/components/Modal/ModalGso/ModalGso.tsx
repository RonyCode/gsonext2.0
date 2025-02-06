import React, { type ReactElement } from 'react'

import { cn } from '@/lib/utils'
import { type ModalProps } from '../../../../types/index'
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import { Separator } from '../../ui/separator'

export function ModalGso({
  title,
  description,
  icon,
  className,
  classNameButton,
  children,
  childrenButton,
  disabled,
  ...props
}: ModalProps): ReactElement {
  return (
    <Dialog>
      <DialogTrigger disabled={disabled}>
        <div className={cn(' h-full w-full', classNameButton)}>
          {childrenButton}
        </div>
      </DialogTrigger>
      <DialogContent className={cn(' h-full w-full', className)} {...props}>
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2 ">
              {icon} {title}{' '}
            </span>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <Separator />
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
