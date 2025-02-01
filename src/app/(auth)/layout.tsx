import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}){
  return (
    <>
      <section className=" flex h-full place-content-center place-items-center  ">
        {children}
      </section>
    </>
  )
}
