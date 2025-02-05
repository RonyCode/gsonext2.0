'use client'
import Link from 'next/link'
import React, { type ReactElement, useEffect, useState } from 'react'
import { LiaChevronRightSolid } from 'react-icons/lia'
import { LuHouse } from 'react-icons/lu'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import {usePathname} from "next/navigation";



const BreadcrumbGso = (): ReactElement => {
  const pathname = usePathname()
  const arrayPathname = pathname?.split('/')
  arrayPathname?.shift()
  let link =  ''
  const arrayLink: string[] = []

  return (
    <Breadcrumb>
      <BreadcrumbList
        >
        <BreadcrumbItem className="hover:text-foreground">
          <Link href="/">
            {' '}
            <LuHouse />
          </Link>
        </BreadcrumbItem>

        {arrayPathname?.map((path, index) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          index === 0 ? arrayLink.push('/' + path) : arrayLink.push(path)
          link = arrayLink.join('/')
          // setCurrentUrl(link)
          return (
            <BreadcrumbItem
              key={index}
              className={`hover:text-foreground ${
                arrayPathname[arrayPathname.length - 1] === path
                  ? 'text-foreground'
                  : ''
              }`}
            >
              <ol>
                <BreadcrumbSeparator
                  className={`${
                    arrayPathname[arrayPathname.length - 1] === path &&
                    'text-primary'
                  }`}
                >
                  <LiaChevronRightSolid />
                </BreadcrumbSeparator>
              </ol>
              <Link
                href={link}
                className="m-0 p-0 text-[.825rem] font-light md:font-medium"
              >
                {path.charAt(0).toUpperCase() +
                  decodeURI(
                    path
                      .slice(1)
                      .toLowerCase()
                      .replace(/#.*$/, '')
                      .replace(/\/&.*$/, '')
                      .replace(/\?.*$/, '')
                      .replace(/-.*$/, '')
                      .split('/')[0],
                  )}
              </Link>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default BreadcrumbGso
