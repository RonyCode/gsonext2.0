'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'
import { type ReactElement } from 'react'

import FooterHomePage from './FooterHomePage'
import FooterNormal from './FooterNormal'

const FooterLayout = ({ className }: { className?: string }): ReactElement => {
  const pathName = usePathname()

  return <>{pathName === '/' ? <FooterHomePage /> : <FooterNormal />}</>
}
export default FooterLayout
