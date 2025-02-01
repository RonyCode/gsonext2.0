import '../../../../globals.css'
import { type Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'GSO | Gestão',
  description: 'pãgina de gestão do usuário.',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div>{children}</div>
    </>
  )
}
