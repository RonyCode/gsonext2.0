import '../globals.css'
import React from 'react'

import FooterLayout from '@/components/Footer/FooterLayout'
import {NavbarMain} from "@/components/Nav/NavbarMain";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavbarMain />
      <div className="flex min-h-screen w-full  flex-col bg-gradient-to-t from-background to-secondary pt-[68px]">
        <div className="h-[calc(100vh_-_68px)] w-full">{children}</div>
      </div>
      <FooterLayout className="z-100" />
    </>
  )
}
