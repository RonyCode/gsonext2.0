import '../globals.css'
import React from 'react'

import FooterNormal from '../../../../teste/src/components/Footer/FooterNormal'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <FooterNormal />
    </>
  )
}
